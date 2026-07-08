# MEMORY.md

Projektweite Fakten und Entscheidungen für "Eisernes Log" — als Kontext-Referenz, ergänzend zu `CLAUDE.md` (Arbeitsanweisungen) und `PROJEKTLOG.md` (chronologischer Verlauf).

## Fakten

- Repo: https://github.com/speedfreed079/3erSplit.git, Branch `main`.
- Live-URL: https://speedfreed079.github.io/3erSplit/ (GitHub Pages, direkt aus `main`, kein Build-Step). Stand 2026-07-08 (Teil 4) live: Satzpausen-Timer + KI-Übungstausch.
- Kein Backend, keine Datenbank: alle Trainingsdaten liegen nur im `localStorage` des jeweiligen Browsers (Key `eisernes-log-v1`). Einziger Backup-Weg ist der Export/Import-Button (JSON-Datei).
- Kein Package-Manager, keine Dependencies außer Google Fonts (CDN-Link in `index.html`).
- Gemini-Proxy: Cloudflare Worker `eisernes-log-proxy`, live unter https://eisernes-log-proxy.speedfreed.workers.dev, Modell `gemini-2.5-flash-lite`. Deploy separat via `wrangler deploy` aus `worker/`, nicht Teil des GitHub-Pages-Deploys. API-Key liegt als Cloudflare-Secret `GEMINI_API_KEY` (serverseitig, nie im Client-Code).
- Multi-User/Freunde: bewusst kein Sync/Backend — jede Person nutzt ihren eigenen Browser-`localStorage` (Entscheidung vom 2026-07-08, keine offene Baustelle).

## Entscheidungen

- **Deploy nur auf Zuruf**: Änderungen werden lokal committet, aber erst auf explizite Aufforderung nach `main` gepusht (= live), da GitHub Pages ohne Staging direkt aus `main` served.
- **Ein-Datei-Architektur bleibt bestehen**: `index.html` enthält Style + Script inline. Kein Umbau auf Framework/Build-Tooling ohne ausdrücklichen Wunsch.
- **Secrets nie über den Chat**: `wrangler secret put` wird immer vom Nutzer selbst im eigenen Terminal ausgeführt, nie über einen von Claude relayten Shell-Befehl (Hintergrund: ein Vorfall am 2026-07-08, siehe Projektlog Teil 3).

## Offene Punkte / Ideen

- (noch keine)
