# MEMORY.md

Projektweite Fakten und Entscheidungen für "Fretze pumpt" (bis 2026-07-08 "Eisernes Log") — als Kontext-Referenz, ergänzend zu `CLAUDE.md` (Arbeitsanweisungen) und `PROJEKTLOG.md` (chronologischer Verlauf).

## Fakten

- Repo: https://github.com/speedfreed079/3erSplit.git, Branch `main`.
- Live-URL: https://speedfreed079.github.io/3erSplit/ (GitHub Pages, direkt aus `main`, kein Build-Step). Aktuelle Version: siehe `APP_VERSION` in `index.html` bzw. Anzeige unten am Header in der App selbst.
- Interne Bezeichner (`STORAGE_KEY` = `eisernes-log-v1`, Worker-Name `eisernes-log-proxy`, Repo-Name `3erSplit`) bleiben bewusst beim alten Namen — Umbenennen würde entweder Nutzerdaten löschen (`STORAGE_KEY`) oder unnötigen Infra-Aufwand ohne Nutzen bedeuten.
- Kein Backend, keine Datenbank: alle Trainingsdaten liegen nur im `localStorage` des jeweiligen Browsers (Key `eisernes-log-v1`). Einziger Backup-Weg ist der Export/Import-Button (JSON-Datei).
- Kein Package-Manager, keine Dependencies außer Google Fonts (CDN-Link in `index.html`).
- Gemini-Proxy: Cloudflare Worker `eisernes-log-proxy`, live unter https://eisernes-log-proxy.speedfreed.workers.dev, Modell `gemini-2.5-flash-lite`. Deploy separat via `wrangler deploy` aus `worker/`, nicht Teil des GitHub-Pages-Deploys. API-Key liegt als Cloudflare-Secret `GEMINI_API_KEY` (serverseitig, nie im Client-Code).
- Multi-User/Freunde: aktuell bewusst kein Sync/Backend — jede Person nutzt ihren eigenen Browser-`localStorage` (Entscheidung vom 2026-07-08). Geplanter Wechsel auf Firebase, siehe "Offene Punkte" unten.

## Entscheidungen

- **Deploy nur auf Zuruf**: Änderungen werden lokal committet, aber erst auf explizite Aufforderung nach `main` gepusht (= live), da GitHub Pages ohne Staging direkt aus `main` served.
- **Ein-Datei-Architektur bleibt bestehen**: `index.html` enthält Style + Script inline. Kein Umbau auf Framework/Build-Tooling ohne ausdrücklichen Wunsch.
- **Secrets nie über den Chat**: `wrangler secret put` wird immer vom Nutzer selbst im eigenen Terminal ausgeführt, nie über einen von Claude relayten Shell-Befehl (Hintergrund: ein Vorfall am 2026-07-08, siehe Projektlog Teil 3).
- **Immer versioniert + geloggt** (seit v1.1.0, 2026-07-08): jede Änderung bekommt eine Versionsnummer (`APP_VERSION` in `index.html`, `CACHE_NAME` in `sw.js` synchron mitziehen) und einen Eintrag in `PROJEKTLOG.md` — explizite Nutzeranforderung, keine Ausnahmen.

## Offene Punkte / Ideen

- **Firebase-Migration geplant** (besprochen 2026-07-08): Umstieg von `localStorage` auf Firestore + Firebase Auth, sobald der erste Freund die App tatsächlich mitnutzt — nicht vorher, da es bis dahin keinen Mehrwert bringt. Nutzer hat bereits ein Firebase-Konto/-Projekt (aus anderem Kontext), das senkt die Einstiegshürde. Kernpunkt bei der Umsetzung: Firestore Security Rules sauber aufsetzen, damit Nutzer sich nicht gegenseitig Daten lesen/schreiben können — das ist der eigentliche Sorgfalts-Teil, nicht die SDK-Anbindung selbst (die geht per CDN-Script ohne Build-Step, Single-File-Architektur bleibt erhalten).
