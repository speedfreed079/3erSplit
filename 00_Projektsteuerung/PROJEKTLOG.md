# Projektlog

Chronologischer Log der Entwicklungs- und Setup-Schritte an "Fretze pumpt" (bis 2026-07-08 "Eisernes Log"). Neue Einträge oben anfügen. Seit v1.1.0 wird jede Änderung mit Versionsnummer eingetragen (Nutzeranforderung); der Stand direkt davor (Teil 1-4 unten) gilt rückwirkend als v1.0.0-Baseline.

## 2026-07-08 (Teil 15): Alle 4 Gemini-Deep-Research-Ergebnisse eingetroffen

- Nutzer hat die Ergebnisse aller 4 Deep-Research-Prompts aus Teil 10 in `01_Recherchen` abgelegt; in die passenden Unterordner einsortiert: `01_Trainingsplaene/Trainingsplaene.md`, `02_Uebungserklaerungen/Uebungsdatenbank.md`, `03_Aufwaermen/Aufwaermprogramm.md`, `04_Stretching/Stretching.md`. `.gitkeep`-Platzhalter entfernt.
- Kurz gegengecheckt: alle 4 Dokumente sind vollständig, gut strukturiert (Gliederung mit Referenzen-Abschnitt) und decken die angefragten Themen ab; die Übungsdatenbank geht die aktuelle `EXERCISES`-Liste Übung für Übung durch.
- Noch nicht inhaltlich ausgewertet/ins Datenmodell integriert — das ist Phase 0/1 der Roadmap (siehe `MEMORY.md`), eigener Arbeitsschritt.
- Kein App-Code geändert, daher kein Versions-Bump.

## v1.3.1 — 2026-07-08 (Teil 14): Header-Logo größer + Darkmode-Lesbarkeit

- Nutzer-Feedback zum Live-Ergebnis von v1.3.0: Logo im Header darf größer sein, im Darkmode schlecht erkennbar.
- Größe: `logo-mark`-`<img>` im Header von 26px auf 36px Höhe erhöht.
- Darkmode-Lesbarkeit: das feine Linienwerk (Haarsträhnen etc.) verliert bei kleiner Anzeigegröße auf dunklem Hintergrund überproportional an Kontrast (dunkel-auf-dunkel wirkt "matschiger" als derselbe Farbwert auf hellem Grund — menschliche Kontrastwahrnehmung ist bei niedriger Hintergrundhelligkeit schwächer). Lösung: zwei separate, themenabhängige Logo-Assets statt einer fixen Recolor-Farbe:
  - `logo-mark-dark.png` — helleres, saturierteres Orange (`#F97316`) nur fürs Dark-Theme-Header-Logo, extra für Lesbarkeit auf nahezu-schwarzem `--bg`.
  - `logo-mark-sepia.png` — nutzt die Sepia-eigene `--rust`-Farbe (`#A8461E`), die auf dem hellen Hintergrund schon gut kontrastiert.
  - `render()` wählt das passende Bild anhand `state.theme`, analog zum bestehenden `theme-color`-Meta-Swap.
  - Die App-Icons (`icon-192.png`/`icon-512*.png`) bleiben bewusst unverändert/nicht themenabhängig — OS-Homescreens kennen den In-App-Theme-Zustand nicht.
- `sw.js`-`APP_SHELL`: `logo-mark.png` durch die zwei neuen Dateien ersetzt; altes `logo-mark.png` gelöscht (nur noch die zwei Varianten existieren).

## v1.3.0 — 2026-07-08 (Teil 13): Logo in Header + App-Icons eingebaut

- Logo-Marke (Kopf + Hantel-Kreis-Symbol aus `04_Medien/logo_fretze_pumpt.png`, ohne den Schriftzug "FRED PUMPT" — der bleibt bewusst außen vor, siehe Teil 12) freigestellt, auf die App-Akzentfarbe `--rust` (`#c1440e`) umgefärbt und als eigenständige Assets erzeugt:
  - `logo-mark.png` (Root, transparenter Hintergrund) — ersetzt im Header das 🏋-Emoji neben dem (weiterhin echten Text-)Schriftzug "Fretze pumpt".
  - `icon-192.png` / `icon-512.png` (dunkler abgerundeter Hintergrund, ~72% Füllgrad) und `icon-512-maskable.png` (randloser dunkler Hintergrund, ~56% Füllgrad, sicher innerhalb der Maskable-Safe-Zone) — ersetzen das bisherige abstrakte Hantel-Icon.
- Farbentscheidung: die Original-Logofarbe war ein Kirschrot (`#B51437`), spürbar anders als das App-Rost-Orange (`#C1440E`). Statt die ganze App-Palette (Dark- + Sepia-Theme, Buttons, Tabs, Timer-Leiste) ans Logo anzupassen, wurde das Logo selbst umgefärbt — deutlich kleinerer, risikoärmerer Eingriff.
- `sw.js`-`APP_SHELL` um `logo-mark.png` und `icon-512-maskable.png` ergänzt (Letzteres fehlte bisher im Cache, obwohl im Manifest referenziert — sonst wären beide offline nicht verfügbar gewesen).
- `04_Medien/logo_fretze_pumpt.png` (Original mit Schriftzug) bleibt unverändert als Rohquelle liegen; nur die abgeleiteten, umgefärbten/freigestellten Produktions-Assets liegen im Root.

## 2026-07-08 (Teil 12): Nutzer-Änderungen an der Ordnerstruktur übernommen + dokumentiert

- Nutzer hat direkt im Dateisystem (außerhalb der Session) zwei Änderungen an der in Teil 11 angelegten Struktur vorgenommen:
  - `04_Archiv/` → `99_Archiv/` umbenannt (Archiv bewusst ans Ende der Nummerierung, da am wenigsten relevant für den Alltag). Git hat das als Rename erkannt (`README.md` inhaltsgleich verschoben), `files.zip` bleibt wie zuvor gitignored/nur lokal.
  - Neuer Ordner `04_Medien/` mit `logo_fretze_pumpt.png` (rundes Logo: stilisierter Kopf mit Bart + Hantel-Motiv, in Rust-Rot passend zur `--rust`-Akzentfarbe der App) — noch nicht in `index.html`/`manifest.json` verdrahtet, reine Ablage.
  - **Auffälligkeit, dem Nutzer zur Bestätigung vorgelegt statt stillschweigend übernommen**: der Schriftzug im Logo lautet "FRED PUMPT", der Dateiname und die App selbst heißen "Fretze pumpt" — ungeklärt, ob das Logo noch überarbeitet wird oder ein bewusster Kurzname ist.
  - `CLAUDE.md`-Abschnitt "Ordnerstruktur" entsprechend aktualisiert (`99_Archiv`, neuer `04_Medien`-Eintrag).
- Kein App-Code geändert, daher kein Versions-Bump.

## 2026-07-08 (Teil 11): Repo in Ordnerstruktur aufgeräumt

- Nutzer wollte eine übersichtliche Ordnerstruktur, während Gemini Deep Research für die Feature-Roadmap (Teil 10) läuft: Archiv, Webapp, Recherchen, Quellen, Tools, plus eigene Ideen.
- Vorab geklärt: GitHub Pages liefert nur aus dem Repo-Root oder einem Ordner namens exakt `docs` aus — ein frei benannter "Webapp"-Ordner hätte das Deployment gebrochen (außer mit zusätzlichem Build-Workflow, den `CLAUDE.md` bewusst vermeidet). Nutzer hat sich für "Webapp-Dateien bleiben im Root" entschieden.
- Neue Struktur: `00_Projektsteuerung/` (MEMORY.md, PROJEKTLOG.md, hierher verschoben), `01_Recherchen/` (leere Unterordner für die 4 Deep-Research-Themen: Trainingspläne, Übungserklärungen, Aufwärmen, Stretching), `02_Quellen/` (Belege), `03_Tools/worker/` (Cloudflare-Gemini-Proxy, verschoben aus `worker/`), `04_Archiv/` (`files.zip`, ursprünglicher Projekt-Upload, gitignored).
- Webapp-Dateien (`index.html`, `sw.js`, `manifest.json`, `icon-*.png`) sowie `CLAUDE.md`/`README.md` bleiben bewusst im Root (GitHub-Pages- bzw. Tooling-Konvention).
- Alle Pfad-Referenzen in `CLAUDE.md` (PROJEKTLOG-Verweise, `cd worker`-Befehl, Worker-Dateipfade) und `.gitignore` (`worker/.wrangler/` → `03_Tools/worker/.wrangler/`) entsprechend aktualisiert; per `git mv` verschoben, keine App-Datei inhaltlich verändert (bestätigt: kein Diff auf `index.html`/`sw.js`/`manifest.json`/Icons gegenüber `origin/main`) — daher kein Versions-Bump.
- Lokal committed, noch nicht gepusht (reine Struktur-/Doku-Änderung ohne Live-Auswirkung).

## 2026-07-08 (Teil 10): Feature-Roadmap dokumentiert

- Nutzer hat eine Wunschliste für die Zukunft skizziert: vorgefertigte wissenschaftlich fundierte Trainingspläne zur Auswahl, Plan-Wechsel ohne Datenverlust, Übungserklärungen in der App, Login-Funktion, eigene Übungen hinzufügen, Aufwärmen und Stretching passend zum jeweiligen Workout-Typ.
- Eingeordnet in Recherche-Themen (Trainingspläne, Übungserklärungen, Aufwärmen, Stretching — brauchen wissenschaftliche Quellen) vs. reine Engineering-Themen (Plan-Wechsel, Login, eigene Übungen — Datenmodell-/Architekturarbeit ohne Recherchebedarf).
- 4 copy-paste-fertige Gemini-Deep-Research-Prompts erstellt (strukturierte Ausgabeformate, damit die Ergebnisse später leicht ins bestehende `EXERCISES`-Datenmodell passen), um Recherche-Token in dieser Session zu sparen — Nutzer führt sie separat aus.
- Empfohlene Umsetzungsreihenfolge in `MEMORY.md` festgehalten (Abschnitt "Feature-Roadmap"): Phase 0 (Übungs-Bibliothek vom Plan-Datenmodell trennen) → Phase 1 (Übungserklärungen, Aufwärmen, Stretching — additiv, kein Datenmodell-Umbau) → Phase 2 (mehrere Pläne + Plan-Wechsel + eigene Übungen — echter Datenmodell-Umbau) → Phase 3 (Login/Firebase, bewusst zuletzt, gekoppelt an "erster Freund steigt ein").
- Kein App-Code geändert, daher kein Versions-Bump; Doku liegt in `MEMORY.md`, nicht hier im chronologischen Log — dieser Eintrag verweist nur darauf.

## v1.2.3 — 2026-07-08 (Teil 9): Header bricht auf schmalen Screens sauber um

- Nutzer meldete: auf dem Handy erschien unter dem Titel nur noch "Push · Pull · ", der Rest der Subzeile war abgeschnitten (v1.2.1-Ellipsis-Fix hat den Titel-Container nicht ausreichend Platz gelassen, weil `flex: 1` mit Flex-Basis 0 der Actions-Leiste (Theme-Toggle + Export + Import) fast die ganze Zeile überlässt, bevor überhaupt "gewrapped" würde).
- Ursache: `.header-row` ist ein Flex-Container mit `justify-content: space-between`; der Titel-Block hatte `flex:1` (Basis 0), wodurch er theoretisch immer "passt" und der Browser nie auf eine zweite Zeile umbricht — er schrumpft stattdessen bis fast auf 0, egal wie eng es wird.
- Fix: neue Media Query `@media (max-width: 480px)` stellt `.header-row` auf `flex-direction: column` um, sodass Titel/Subzeile und die Actions-Leiste auf schmalen Screens sauber übereinander statt nebeneinander stehen. Auf breiteren Screens (Tablet/Desktop) bleibt das bisherige Nebeneinander-Layout.
- Zusätzlich: dem Nutzer erklärt, dass die installierte PWA auf dem Handy einmal komplett geschlossen (aus der App-Übersicht wischen) und neu geöffnet werden muss, damit der neue Service Worker greift — reines "Aktualisieren" innerhalb der offenen App reicht nicht, weil die bereits geladene Seite von der alten `sw.js`-Instanz kontrolliert bleibt, bis eine echte Neuladung/Neustart passiert.

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
