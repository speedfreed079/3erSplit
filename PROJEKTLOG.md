# Projektlog

Chronologischer Log der Entwicklungs- und Setup-Schritte an "Fretze pumpt" (bis 2026-07-08 "Eisernes Log"). Neue Einträge oben anfügen. Seit v1.1.0 wird jede Änderung mit Versionsnummer eingetragen (Nutzeranforderung); der Stand direkt davor (Teil 1-4 unten) gilt rückwirkend als v1.0.0-Baseline.

## v1.2.2 — 2026-07-08 (Teil 8): Sepia als Standard-Theme

- Nutzer gefällt Sepia besser als das ursprüngliche dunkle Theme; Default für neue/leere `localStorage`-Stände (erster Start, neues Gerät, Inkognito) von `"dark"` auf `"sepia"` geändert (beide Stellen in `loadState()`).
- Wirkt nur, wo noch kein `theme`-Wert gespeichert ist — bestehende Installationen, bei denen bereits ein Theme persistiert wurde (z.B. durch Antippen des Toggles), bleiben unverändert bei ihrer aktuellen Wahl. Der Toggle-Button wechselt weiterhin frei zwischen beiden Modi.

## v1.2.1 — 2026-07-08 (Teil 7): Header-Subzeile ohne Umbruch

- Nutzer meldete per Screenshot (Sepia-Theme auf dem Handy): die Subzeile "Push · Pull · Legs — Fortschritt eintragen · v1.2.0" brach auf 3 Zeilen um, weil die Header-Actions (Theme-Toggle/Export/Import) den Titelblock zu stark einengten.
- `.header-sub` auf `white-space: nowrap` + `text-overflow: ellipsis` umgestellt; der umschließende Titel-Container hat jetzt `min-width:0; flex:1`, damit er im Flex-Layout tatsächlich schrumpfen darf (sonst hätte `overflow:hidden` keine Wirkung gehabt). Bei sehr schmalen Screens wird die Zeile jetzt sauber mit "…" abgeschnitten statt hässlich umzubrechen.

## v1.2.0 — 2026-07-08 (Teil 6): Zweites Theme (Sepia/hell)

- Zweiter Anzeigemodus neben dem bisherigen dunklen Theme: helles Sepia-Theme (warme Papier-/Beige-Töne statt Schwarz) für Nutzung bei hellem Umgebungslicht/Sonne.
- Umsetzung: alle Farben liegen bereits als CSS-Custom-Properties auf `:root` — neuer Block `:root[data-theme="sepia"]` überschreibt sie. `render()` setzt `data-theme` auf `<html>` sowie die `theme-color`-Meta passend zum aktuellen Theme.
- Toggle-Button (☀ Sepia / 🌙 Dunkel) in der Kopfzeile neben Export/Import. Wahl wird in `state.theme` gespeichert (neues Feld, Default `"dark"`) und damit wie der Rest des States in `localStorage` persistiert — kein automatischer Wechsel nach Tageslicht/Sensor, bewusst einfach gehalten.

- App umbenannt von "Eisernes Log" zu **"Fretze pumpt"**: Titel, `<h1>`, `manifest.json` (`name`/`short_name`), Export-Dateiname (`fretze-pumpt-backup-*.json`) und Export-Metadatenfeld (`app: "fretze-pumpt"`) angepasst.
- Bewusst NICHT umbenannt (Datenverlust- bzw. Aufwandsrisiko ohne Nutzen): `STORAGE_KEY` (`eisernes-log-v1`, würde bestehende `localStorage`-Daten verwerfen), Cloudflare-Worker-Name `eisernes-log-proxy`, GitHub-Repo-Name `3erSplit`.
- Versionsnummer eingeführt: `APP_VERSION` (`index.html`) sichtbar im Header (`... · v1.1.0`). Ab jetzt: jede Änderung bekommt einen Versions-Bump + Projektlog-Eintrag.
- PWA-Auto-Update-Fix: `CACHE_NAME` in `sw.js` enthält jetzt die Versionsnummer (`fretze-pumpt-v1.1.0`). Vorher hätte eine bereits installierte App (Cache-first-Strategie, `sw.js` selbst änderte sich nie) neue Releases nie automatisch bekommen — jetzt erzwingt der geänderte `CACHE_NAME`-String bei jedem Release, dass der Browser die neue `sw.js` erkennt, den alten Cache verwirft und die App-Shell-Dateien frisch lädt.
- Rebrand + Versionsanzeige per Playwright im Browser verifiziert (Titel, `<h1>`, Header-Text, Timer weiterhin funktionsfähig) — fehlerfrei.

## 2026-07-08 (Teil 4): Live-Deploy

- Auf Zuruf des Nutzers 5 lokale Commits (Satzpausen-Timer, KI-Übungstausch, Worker-Anbindung, Dokumentation) nach `origin/main` gepusht.
- GitHub Pages hat neu gebaut; nach ca. 90s (6 Polling-Versuche à 15s) lieferte https://speedfreed079.github.io/3erSplit/ nachweislich den neuen Stand (`rest-timer-bar` im HTML gefunden) aus.
- Damit sind Satzpausen-Timer und KI-gestützter Übungstausch (via Cloudflare Worker + Gemini) jetzt live nutzbar.

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
