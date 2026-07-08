# MEMORY.md

Projektweite Fakten und Entscheidungen für "Eisernes Log" — als Kontext-Referenz, ergänzend zu `CLAUDE.md` (Arbeitsanweisungen) und `PROJEKTLOG.md` (chronologischer Verlauf).

## Fakten

- Repo: https://github.com/speedfreed079/3erSplit.git, Branch `main`.
- Live-URL: https://speedfreed079.github.io/3erSplit/ (GitHub Pages, direkt aus `main`, kein Build-Step).
- Kein Backend, keine Datenbank: alle Trainingsdaten liegen nur im `localStorage` des jeweiligen Browsers (Key `eisernes-log-v1`). Einziger Backup-Weg ist der Export/Import-Button (JSON-Datei).
- Kein Package-Manager, keine Dependencies außer Google Fonts (CDN-Link in `index.html`).

## Entscheidungen

- **Deploy nur auf Zuruf**: Änderungen werden lokal committet, aber erst auf explizite Aufforderung nach `main` gepusht (= live), da GitHub Pages ohne Staging direkt aus `main` served.
- **Ein-Datei-Architektur bleibt bestehen**: `index.html` enthält Style + Script inline. Kein Umbau auf Framework/Build-Tooling ohne ausdrücklichen Wunsch.

## Offene Punkte / Ideen

- (noch keine)
