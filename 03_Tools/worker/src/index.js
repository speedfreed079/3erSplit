const ALLOWED_ORIGIN = "https://speedfreed079.github.io";
const GEMINI_MODEL = "gemini-3.1-flash-lite";

// Admin-Panel (seit v1.45.0). ADMIN_EMAIL/FIREBASE_WEB_API_KEY sind bewusst hier hartcodiert wie
// ALLOWED_ORIGIN/GEMINI_MODEL - beides ist nicht geheim (der Web-API-Key steht schon oeffentlich
// in index.html, die Sicherheit kommt aus der serverseitigen Tokenpruefung unten, nicht aus dem
// Verstecken dieser Werte). FIREBASE_SA_CLIENT_EMAIL/FIREBASE_SA_PRIVATE_KEY sind dagegen echte
// Secrets (per `wrangler secret put`, nie hier im Code).
const ADMIN_EMAIL = "frederik.ruehmann@gmail.com";
const FIREBASE_WEB_API_KEY = "AIzaSyAlfxzDTi18iGPIR4xzo_2-XpCo7tHYw0Y";
const FIREBASE_PROJECT_ID = "fretze-pumpt";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

function buildPrompt({ exercise, muscleFocus, existingAlts }) {
  const excludeList = (existingAlts && existingAlts.length ? existingAlts : []).concat([exercise]);
  return `Du bist ein erfahrener Kraftsport-Coach mit Hintergrund in Trainingswissenschaft.
Schlage 2-3 wissenschaftlich sinnvolle Alternativübungen zu "${exercise}" (Fokus: ${muscleFocus}) vor.
Die Alternativen müssen dieselbe primäre Zielmuskulatur bzw. dasselbe Bewegungsmuster ansprechen und einen vergleichbaren Trainingsreiz (Hypertrophie) liefern.
Schlage KEINE der folgenden bereits bekannten Übungen vor: ${excludeList.join(", ")}.
Antworte AUSSCHLIESSLICH als valides JSON-Array in diesem Format, ohne weiteren Text:
[{"name": "Übungsname", "reason": "kurze Begründung auf Deutsch, max. 15 Wörter"}]`;
}

// 503 von Gemini heisst laut Google-Doku "UNAVAILABLE - model overloaded, spikes are usually
// temporary" - genau dafuer lohnt sich ein einzelner automatischer Retry. 429 bewusst NICHT
// hier drin: das kann auch eine echte Fehlkonfiguration (falsche/veraltete Modell-ID, Kontingent
// 0) sein, siehe CLAUDE.md - da soll der Fehler sofort sichtbar werden, nicht verzoegert.
function isRetryableStatus(status) {
  return status === 503;
}

function friendlyGeminiError(status, rawText) {
  if (isRetryableStatus(status)) {
    return `Gemini ist gerade überlastet (${status}) – bitte in ein paar Sekunden erneut versuchen.`;
  }
  let message = rawText.slice(0, 300) || `HTTP ${status}`;
  try {
    const parsed = JSON.parse(rawText);
    if (parsed?.error?.message) message = parsed.error.message;
  } catch (e) { /* rawText war kein JSON, beim rohen Ausschnitt bleiben */ }
  return `Gemini-API-Fehler (${status}): ${message}`;
}

async function callGeminiOnce(apiKey, promptText) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: { responseMimeType: "application/json" },
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    const err = new Error(friendlyGeminiError(res.status, errText));
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini-Antwort enthielt keinen Text");

  let suggestions;
  try {
    suggestions = JSON.parse(text);
  } catch (e) {
    throw new Error("Gemini-Antwort war kein valides JSON");
  }
  if (!Array.isArray(suggestions)) throw new Error("Gemini-Antwort war kein Array");

  return suggestions
    .filter((s) => s && typeof s.name === "string")
    .slice(0, 3)
    .map((s) => ({ name: s.name, reason: typeof s.reason === "string" ? s.reason : "" }));
}

async function callGemini(apiKey, promptText) {
  try {
    return await callGeminiOnce(apiKey, promptText);
  } catch (e) {
    if (!isRetryableStatus(e.status)) throw e;
    await new Promise((resolve) => setTimeout(resolve, 800));
    return await callGeminiOnce(apiKey, promptText);
  }
}

// ---------- ADMIN ----------
// Nutzer sperren/entsperren/loeschen braucht das Firebase Admin SDK, das NIE im Client-JS laufen
// darf. Das firebase-admin-NPM-Paket laeuft aber selbst serverseitig nicht in Cloudflare Workers
// (Node-spezifische APIs: fs, gRPC-Transport) - deshalb hier alles ueber reine REST-Aufrufe +
// die native Web Crypto API, ohne jede externe Abhaengigkeit (dieser Worker hat bewusst kein
// package.json, gleicher Zero-Deps-Stil wie der Gemini-Teil oben).
//
// Zwei getrennte Vertrauensstufen:
// 1) verifyCallerIsAdmin() beweist, dass die Anfrage wirklich vom eingeloggten Admin kommt -
//    ueber Googles OEFFENTLICHEN accounts:lookup-Endpunkt (nur der nicht-geheime Web-API-Key
//    noetig), der den vom Client mitgeschickten Firebase-ID-Token serverseitig verifiziert und
//    die echte E-Mail zurueckgibt. Das ist die tatsaechliche Sicherheitsgrenze - die
//    client-seitige ADMIN_EMAIL-Pruefung in index.html ist nur ein UI-Gate, keine Absicherung.
// 2) getServiceAccountAccessToken() beschafft danach ein privilegiertes OAuth2-Token (Googles
//    "Service Account JWT-Bearer"-Flow, manuell signiert), um die eigentliche Aktion (Liste
//    abrufen, sperren, loeschen) im Namen der App statt des Endnutzers auszufuehren.

function base64UrlFromString(str) {
  return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlFromBuffer(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function importServiceAccountKey(pem) {
  const cleaned = pem
    .replace(/\\n/g, "\n")
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return crypto.subtle.importKey(
    "pkcs8",
    bytes.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function getServiceAccountAccessToken(env) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: env.FIREBASE_SA_CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/identitytoolkit https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${base64UrlFromString(JSON.stringify(header))}.${base64UrlFromString(JSON.stringify(claims))}`;
  const key = await importServiceAccountKey(env.FIREBASE_SA_PRIVATE_KEY);
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned));
  const jwt = `${unsigned}.${base64UrlFromBuffer(signature)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=${encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer")}&assertion=${jwt}`,
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Service-Account-Token-Tausch fehlgeschlagen: ${errText.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function verifyCallerIsAdmin(idToken) {
  if (!idToken) return false;
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_WEB_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );
  if (!res.ok) return false;
  const data = await res.json().catch(() => ({}));
  const user = data.users && data.users[0];
  return !!user && user.email === ADMIN_EMAIL;
}

async function identityToolkitList(env) {
  const accessToken = await getServiceAccountAccessToken(env);
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/accounts:batchGet?maxResults=1000`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message || `Identity Toolkit Fehler (${res.status})`);
  // DownloadAccountResponse (v1 API) nennt das Feld "users", nicht "userInfo" (das war die
  // aeltere relyingparty-API-Version) - per Google-Doku verifiziert, nicht nur aus dem
  // Gedaechtnis uebernommen, nachdem das erste Deployment eine leere Liste lieferte.
  return (data.users || []).map((u) => ({
    uid: u.localId,
    email: u.email || "",
    displayName: u.displayName || "",
    disabled: !!u.disabled,
    createdAt: u.createdAt || null,
    lastLoginAt: u.lastLoginAt || null,
  }));
}

async function identityToolkitPost(env, action, body) {
  const accessToken = await getServiceAccountAccessToken(env);
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/accounts:${action}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message || `Identity Toolkit Fehler (${res.status})`);
  return data;
}

// Kein Fehler-Wurf bei einem 404/Fehler hier - falls der Nutzer nie synchronisiert hat, existiert
// kein Firestore-Dokument, das darf die Konto-Loeschung selbst nicht scheitern lassen.
async function deleteFirestoreUserDoc(env, uid) {
  const accessToken = await getServiceAccountAccessToken(env);
  await fetch(
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${uid}`,
    { method: "DELETE", headers: { Authorization: `Bearer ${accessToken}` } }
  ).catch(() => {});
}

async function handleAdminRequest(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return jsonResponse({ error: "Ungültiges JSON im Request-Body" }, 400);
  }

  const authHeader = request.headers.get("Authorization") || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!(await verifyCallerIsAdmin(idToken))) {
    return jsonResponse({ error: "Nicht autorisiert" }, 403);
  }
  if (!env.FIREBASE_SA_CLIENT_EMAIL || !env.FIREBASE_SA_PRIVATE_KEY) {
    return jsonResponse({ error: "Server ist nicht korrekt konfiguriert (kein Service-Account)" }, 500);
  }

  const { action, uid, disabled } = payload || {};
  try {
    if (action === "list") {
      const users = await identityToolkitList(env);
      return jsonResponse({ users });
    }
    if (action === "setDisabled") {
      if (!uid) return jsonResponse({ error: "Feld 'uid' fehlt" }, 400);
      await identityToolkitPost(env, "update", { localId: uid, disableUser: !!disabled });
      return jsonResponse({ ok: true });
    }
    if (action === "delete") {
      if (!uid) return jsonResponse({ error: "Feld 'uid' fehlt" }, 400);
      await identityToolkitPost(env, "delete", { localId: uid });
      await deleteFirestoreUserDoc(env, uid);
      return jsonResponse({ ok: true });
    }
    return jsonResponse({ error: "Unbekannte action" }, 400);
  } catch (e) {
    return jsonResponse({ error: e.message || "Unbekannter Fehler" }, 502);
  }
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }
    if (request.method !== "POST") {
      return jsonResponse({ error: "Nur POST erlaubt" }, 405);
    }

    const url = new URL(request.url);
    if (url.pathname === "/admin") {
      return handleAdminRequest(request, env);
    }

    let payload;
    try {
      payload = await request.json();
    } catch (e) {
      return jsonResponse({ error: "Ungültiges JSON im Request-Body" }, 400);
    }

    const { exercise, muscleFocus, existingAlts } = payload || {};
    if (!exercise || typeof exercise !== "string") {
      return jsonResponse({ error: "Feld 'exercise' fehlt oder ist ungültig" }, 400);
    }

    if (!env.GEMINI_API_KEY) {
      return jsonResponse({ error: "Server ist nicht korrekt konfiguriert (kein API-Key)" }, 500);
    }

    try {
      const prompt = buildPrompt({ exercise, muscleFocus: muscleFocus || "", existingAlts: existingAlts || [] });
      const suggestions = await callGemini(env.GEMINI_API_KEY, prompt);
      return jsonResponse({ suggestions });
    } catch (e) {
      return jsonResponse({ error: e.message || "Unbekannter Fehler" }, 502);
    }
  },
};
