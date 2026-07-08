const ALLOWED_ORIGIN = "https://speedfreed079.github.io";
const GEMINI_MODEL = "gemini-2.0-flash";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
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

async function callGemini(apiKey, promptText) {
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
    throw new Error(`Gemini-API-Fehler (${res.status}): ${errText.slice(0, 300)}`);
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

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }
    if (request.method !== "POST") {
      return jsonResponse({ error: "Nur POST erlaubt" }, 405);
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
