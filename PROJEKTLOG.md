# Projektlog

Chronologischer Log der Entwicklungs- und Setup-Schritte an "Eisernes Log". Neue Einträge oben anfügen.

## 2026-07-08 (Teil 3): Worker deployed und live getestet

- Cloudflare Worker `eisernes-log-proxy` erfolgreich deployed: https://eisernes-log-proxy.speedfreed.workers.dev (Subdomain `speedfreed.workers.dev`).
- **Sicherheitsvorfall behoben**: beim ersten `wrangler secret put` wurde der Gemini-Key versehentlich als Secret-**Name** übergeben statt als Wert (Name landete im Klartext, sichtbar via `wrangler secret list`). Secret gelöscht, Key in Google AI Studio widerrufen und neu erzeugt, danach korrekt mit `wrangler secret put GEMINI_API_KEY` (Key erst am interaktiven Prompt eingegeben) gesetzt und verifiziert.
- **Modellwechsel nötig**: `gemini-2.0-flash` ist zum 1.6.2026 abgeschaltet worden (Quota-Fehler `limit: 0`). Auf `gemini-2.5-flash-lite` gewechselt (aktuell Free-Tier-fähig, ~10s Antwortzeit; `gemini-2.5-flash` wäre auch gegangen, aber ~18s).
- Client-Timeout für den KI-Vorschlag-Fetch von 8s auf 25s erhöht, da reale Gemini-Antwortzeiten (~10-18s) den alten Wert deutlich überschritten.
- `PROXY_URL` in `index.html` auf die echte Worker-URL gesetzt.
- Voller End-to-End-Flow (Panel öffnen → KI-Vorschläge laden → echte Gemini-Antwort → Übung übernehmen) per Playwright gegen den echten Worker verifiziert, danach CORS-Origin des Workers wieder auf `https://speedfreed079.github.io` (nur testweise auf `localhost` gelockert gewesen) zurückgesetzt und erneut deployed.
- `worker/.wrangler/` und `worker/node_modules/` zu `.gitignore` hinzugefügt.

## 2026-07-08 (Teil 2)

- Satzpausen-Timer eingebaut: startet automatisch beim Abhaken eines Satzes, feste Bottom-Bar mit Countdown, ±15s-Buttons, Überspringen, Ton (Web Audio) + Vibration am Ende. Rein im Speicher, kein neues `state`/`localStorage`-Feld. Per Playwright im Browser getestet (Start, Anpassen, Überspringen) — fehlerfrei.
- Cloudflare Worker (`worker/`) als Gemini-Proxy angelegt: hält den API-Key serverseitig, liefert 2-3 wissenschaftlich begründete Alternativübungen als JSON. Lokal mit gemockter Gemini-Antwort getestet (Preflight, Validierung, Happy Path, fehlender Key) — alle Fälle korrekt.
- Client-Integration im Swap-Panel: neuer "✨ KI-Vorschläge"-Button, Ladezustand/Fehlerzustand, Vorschläge landen im bestehenden `swap-select`-Mechanismus. Per Playwright mit gemocktem Worker-Response getestet — Laden, Anzeige, Auswahl funktionieren.
- Offen: `PROXY_URL` in `index.html` ist noch leer (Platzhalter) — muss nach `wrangler deploy` durch die echte Worker-URL ersetzt werden, sobald Cloudflare-Konto + Secret eingerichtet sind.

## 2026-07-08

- Lokales Repo in `I:\Meine Ablage\Trainigs-App` eingerichtet und mit `origin` (https://github.com/speedfreed079/3erSplit.git, Branch `main`) verbunden. Lokaler Stand war inhaltlich identisch zum Remote (nur CRLF/LF-Unterschied).
- `.gitignore` angelegt (`.claude/`, `files.zip`, OS-Junk).
- Deploy-Weg bestätigt: GitHub Pages served direkt aus `main`, kein Build-Step, live unter https://speedfreed079.github.io/3erSplit/. Verabredet: Push nach `main` nur auf ausdrückliche Aufforderung.
- `CLAUDE.md` und `MEMORY.md` angelegt.
