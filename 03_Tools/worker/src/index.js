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

// ---------- AUTH ----------
// Seit v1.48.0: beide KI-Funktionen (Uebungsvorschlaege + Trainingsplan-Chat) sind nur fuer
// eingeloggte Nutzer verfuegbar - kostet echtes Geld pro Gemini-Aufruf, soll nicht von jedem
// anonymen Besucher der oeffentlichen GitHub-Pages-Seite nutzbar sein. Gleicher Verifikations-
// Mechanismus wie das Admin-Panel (v1.45.0): der Client schickt seinen Firebase-ID-Token, dieser
// wird hier serverseitig ueber Googles OEFFENTLICHEN accounts:lookup-Endpunkt geprueft (nur der
// nicht-geheime Web-API-Key noetig) - das ist die tatsaechliche Sicherheitsgrenze, nicht irgendein
// Client-seitiges UI-Gate. Liefert bei gueltigem Token das Nutzerprofil (fuer die
// Trainingsplan-Chat-Personalisierung mit dem echten, verifizierten Anzeigenamen statt eines vom
// Client behaupteten Namens), bei ungueltigem/fehlendem Token null.
async function verifyCallerAndGetProfile(idToken) {
  if (!idToken) return null;
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_WEB_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );
  if (!res.ok) return null;
  const data = await res.json().catch(() => ({}));
  const user = data.users && data.users[0];
  if (!user) return null;
  return { email: user.email || "", displayName: user.displayName || "" };
}

function bearerTokenFromRequest(request) {
  const authHeader = request.headers.get("Authorization") || "";
  return authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
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

// ---------- KI-TRAININGSPLAN-CHAT ----------
// Seit v1.47.0: ein Chat, der wie ein Fitnesstrainer ein kurzes Interview fuehrt und daraus
// einen Trainingsplan erstellt. Der Gesprächsverlauf bleibt bewusst komplett im Client (wird bei
// jeder Anfrage komplett mitgeschickt) statt in einem neuen Server-Speicher - der Worker bleibt
// dadurch weiterhin ein zustandsloser Relay, kein Cloudflare KV/Durable Object noetig.
function buildPlanChatSystemInstruction(exerciseNames, userName) {
  const namesList = exerciseNames.length ? exerciseNames.join(", ") : "(keine Liste verfügbar)";
  const nameLine = userName
    ? `Der Nutzer heißt ${userName}. Sprich ihn an ein paar passenden Stellen im Gespräch (z.B. Begrüßung) mit diesem Namen an, aber nicht in jeder einzelnen Nachricht - das wirkt sonst unnatürlich.`
    : "";
  return `Du bist ein erfahrener, freundlicher Fitness-Trainer, der über einen Chat ein kurzes Interview führt, um einen passenden Trainingsplan zu erstellen.
${nameLine}

Stelle EINE Frage nach der anderen (nicht mehrere auf einmal). Frage nach: Trainingsziel (Kraftaufbau/Muskelaufbau/Abnehmen/Ausdauer), Erfahrungslevel, verfügbare Tage pro Woche, verfügbares Equipment (Gym/Zuhause/Bänder/nur Körpergewicht), Zeit pro Einheit, und eventuellen Einschränkungen/Verletzungen. Halte die Fragen kurz und locker, auf Deutsch.

Sobald du genug Informationen hast (nach etwa 4-6 Fragen, oder wenn der Nutzer "Plan erstellen"/"fertig" sagt oder danach fragt), erstelle einen konkreten Trainingsplan statt einer weiteren Frage.

Bevorzuge bei der Übungsauswahl exakt diese Namen aus der App-eigenen Übungsdatenbank (Schreibweise 1:1 übernehmen, wenn eine passt): ${namesList}. Wenn keine passende Übung in der Liste existiert, ist ein eigener, sinnvoller Übungsname auch in Ordnung.

Antworte IMMER ausschließlich als valides JSON, ohne weiteren Text, in genau einem der folgenden zwei Formate:

Für eine Rückfrage:
{"type": "question", "text": "deine Frage hier"}

Für den fertigen Plan:
{"type": "plan", "label": "Name des Plans", "days": [{"label": "Tag-Name (z.B. Push, Pull, Ganzkörper A)", "exercises": [{"name": "Übungsname", "sets": 3, "reps": "8-10"}]}]}

sets ist eine Zahl, reps ein String wie "8-10" oder "12". Erstelle einen realistischen Plan mit 1-6 Trainingstagen je nach Angaben des Nutzers, pro Tag 4-8 Übungen.`;
}

async function callGeminiChatOnce(apiKey, systemInstruction, contents) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents,
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

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    throw new Error("Gemini-Antwort war kein valides JSON");
  }
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Gemini-Antwort war kein JSON-Objekt");
  }
  return parsed;
}

async function callGeminiChat(apiKey, systemInstruction, contents) {
  try {
    return await callGeminiChatOnce(apiKey, systemInstruction, contents);
  } catch (e) {
    if (!isRetryableStatus(e.status)) throw e;
    await new Promise((resolve) => setTimeout(resolve, 800));
    return await callGeminiChatOnce(apiKey, systemInstruction, contents);
  }
}

async function handlePlanChatRequest(request, env) {
  const profile = await verifyCallerAndGetProfile(bearerTokenFromRequest(request));
  if (!profile) {
    return jsonResponse({ error: "Bitte einloggen, um den KI-Trainingsplan-Chat zu nutzen." }, 401);
  }

  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return jsonResponse({ error: "Ungültiges JSON im Request-Body" }, 400);
  }

  const { messages, exerciseNames } = payload || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonResponse({ error: "Feld 'messages' fehlt oder ist leer" }, 400);
  }
  if (!env.GEMINI_API_KEY) {
    return jsonResponse({ error: "Server ist nicht korrekt konfiguriert (kein API-Key)" }, 500);
  }

  // Anzeigename kommt aus dem verifizierten Profil, nicht vom Client behauptet - falls kein
  // Anzeigename gesetzt ist (sollte bei dieser App praktisch nie vorkommen, signUpEmail verlangt
  // einen), faellt es auf den lokalen Teil der E-Mail-Adresse zurueck.
  const userName = profile.displayName || (profile.email ? profile.email.split("@")[0] : "");
  const systemInstruction = buildPlanChatSystemInstruction(Array.isArray(exerciseNames) ? exerciseNames : [], userName);
  const contents = messages
    .filter((m) => m && typeof m.text === "string" && (m.role === "user" || m.role === "model"))
    .map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
  if (contents.length === 0) {
    return jsonResponse({ error: "Feld 'messages' enthielt keine gültigen Einträge" }, 400);
  }

  try {
    const reply = await callGeminiChat(env.GEMINI_API_KEY, systemInstruction, contents);
    if (reply.type !== "question" && reply.type !== "plan") {
      throw new Error("Gemini-Antwort hatte kein erwartetes Format (type: question/plan)");
    }
    return jsonResponse(reply);
  } catch (e) {
    return jsonResponse({ error: e.message || "Unbekannter Fehler" }, 502);
  }
}

// ---------- KI-UEBUNGSTAUSCH-CHAT ----------
// Seit v1.49.0: der bisherige Einweg-Uebungsvorschlag (ein Prompt rein, eine feste Liste raus)
// wird zu einem echten Mehrfach-Runden-Dialog - der Nutzer kann Kontext geben (z.B. "Knie zwickt
// bei Kniebeugen"), die KI reagiert gezielt darauf statt nur generische Alternativen zu listen.
// Nutzt dieselbe callGeminiChat/contents-Infrastruktur wie der Trainingsplan-Chat oben - die
// Uebung/der Muskelfokus/die auszuschliessenden Alternativen sind fixer Kontext in der
// System-Instruction (aendern sich waehrend eines Dialogs nicht), nur der eigentliche
// Gespraechsverlauf wandert durch "contents".
function buildSwapChatSystemInstruction(exercise, muscleFocus, existingAlts, userName) {
  const excludeList = (existingAlts && existingAlts.length ? existingAlts : []).concat([exercise]);
  const nameLine = userName ? `Der Nutzer heißt ${userName}. Du darfst ihn gelegentlich mit Namen ansprechen, aber nicht in jeder Nachricht.` : "";
  return `Du bist ein erfahrener Kraftsport-Coach mit Hintergrund in Trainingswissenschaft. Der Nutzer trainiert aktuell "${exercise}" (Fokus: ${muscleFocus}) und sucht im Dialog mit dir nach einer Alternative dazu.
${nameLine}

Wenn der Nutzer noch keinen konkreten Grund nennt (z.B. nur "Vorschläge bitte" schreibt), gib trotzdem sofort 2-3 sinnvolle Alternativen - frag nicht erst unnötig nach. Nennt der Nutzer einen Grund (z.B. Schmerzen, Langeweile, fehlendes Equipment), geh gezielt darauf ein; stelle bei Bedarf eine kurze Rückfrage (z.B. "wo genau tut es weh?"), bevor du Vorschläge machst, statt zu raten - in dem Fall darf "suggestions" auch leer sein.

Die Alternativen müssen dieselbe primäre Zielmuskulatur bzw. dasselbe Bewegungsmuster ansprechen und einen vergleichbaren Trainingsreiz liefern. Schlage NIE folgende bereits bekannte Übungen vor: ${excludeList.join(", ")}.

Antworte IMMER ausschließlich als valides JSON, ohne weiteren Text, in genau diesem Format:
{"reply": "kurze Antwort/Erklärung auf Deutsch", "suggestions": [{"name": "Übungsname", "reason": "kurze Begründung auf Deutsch, max. 15 Wörter"}]}
"suggestions" ist ein Array mit 0-3 Einträgen.`;
}

async function handleSwapChatRequest(request, env) {
  const profile = await verifyCallerAndGetProfile(bearerTokenFromRequest(request));
  if (!profile) {
    return jsonResponse({ error: "Bitte einloggen, um KI-Vorschläge zu nutzen." }, 401);
  }

  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return jsonResponse({ error: "Ungültiges JSON im Request-Body" }, 400);
  }

  const { messages, exercise, muscleFocus, existingAlts } = payload || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonResponse({ error: "Feld 'messages' fehlt oder ist leer" }, 400);
  }
  if (!exercise || typeof exercise !== "string") {
    return jsonResponse({ error: "Feld 'exercise' fehlt oder ist ungültig" }, 400);
  }
  if (!env.GEMINI_API_KEY) {
    return jsonResponse({ error: "Server ist nicht korrekt konfiguriert (kein API-Key)" }, 500);
  }

  const userName = profile.displayName || (profile.email ? profile.email.split("@")[0] : "");
  const systemInstruction = buildSwapChatSystemInstruction(
    exercise,
    typeof muscleFocus === "string" ? muscleFocus : "",
    Array.isArray(existingAlts) ? existingAlts : [],
    userName
  );
  const contents = messages
    .filter((m) => m && typeof m.text === "string" && (m.role === "user" || m.role === "model"))
    .map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
  if (contents.length === 0) {
    return jsonResponse({ error: "Feld 'messages' enthielt keine gültigen Einträge" }, 400);
  }

  try {
    const reply = await callGeminiChat(env.GEMINI_API_KEY, systemInstruction, contents);
    if (typeof reply.reply !== "string") {
      throw new Error("Gemini-Antwort hatte kein erwartetes Format (Feld 'reply' fehlt)");
    }
    const suggestions = (Array.isArray(reply.suggestions) ? reply.suggestions : [])
      .filter((s) => s && typeof s.name === "string")
      .slice(0, 3)
      .map((s) => ({ name: s.name, reason: typeof s.reason === "string" ? s.reason : "" }));
    return jsonResponse({ reply: reply.reply, suggestions });
  } catch (e) {
    return jsonResponse({ error: e.message || "Unbekannter Fehler" }, 502);
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
  const profile = await verifyCallerAndGetProfile(idToken);
  return !!profile && profile.email === ADMIN_EMAIL;
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

  if (!(await verifyCallerIsAdmin(bearerTokenFromRequest(request)))) {
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

    // Seit v1.49.0: explizite Routing-Tabelle statt implizitem Default-Pfad - der bisherige
    // Uebungsvorschlag-Einweg-Endpunkt (bare PROXY_URL) ist mit dem Umbau auf einen Dialog
    // komplett durch /swap-chat ersetzt, kein Client ruft den bare Pfad mehr auf.
    const url = new URL(request.url);
    if (url.pathname === "/admin") {
      return handleAdminRequest(request, env);
    }
    if (url.pathname === "/plan-chat") {
      return handlePlanChatRequest(request, env);
    }
    if (url.pathname === "/swap-chat") {
      return handleSwapChatRequest(request, env);
    }
    return jsonResponse({ error: "Unbekannter Pfad" }, 404);
  },
};
