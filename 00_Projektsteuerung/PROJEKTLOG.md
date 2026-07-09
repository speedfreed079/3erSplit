# Projektlog

Chronologischer Log der Entwicklungs- und Setup-Schritte an "Fretze pumpt" (bis 2026-07-08 "Eisernes Log"). Neue Einträge oben anfügen. Seit v1.1.0 wird jede Änderung mit Versionsnummer eingetragen (Nutzeranforderung); der Stand direkt davor (Teil 1-4 unten) gilt rückwirkend als v1.0.0-Baseline.

## v1.7.0 — 2026-07-09 (Teil 25): Gym-Standorte (Phase A von 4)

- Nutzer-Feedback: trainiert über Wellhub/Urban Sports Club wechselnd in verschiedenen Studios (z.B. MCFit, Fitness First) mit unterschiedlicher Ausstattung — die App kannte bisher nur ein globales Gewicht pro Übung, das sich zwischen Studios vermischt hätte. Ausführlich mit dem Nutzer sortiert und in vier unabhängig testbare Versionen aufgeteilt (Plan unter `C:\Users\Frederik Rühmann\.claude\plans\snug-floating-acorn.md`); dies ist Phase A von 4 (danach: RIR-Ersatz/Arbeitssatz-Markierung, Trainingsmodus/Fokus-Ansicht, Gewichtsprogression).
- **Bewusst manuelle Gym-Auswahl, kein GPS** (Nutzerentscheidung) — neue Gyms werden per `prompt()` angelegt/umbenannt, analog zum bestehenden Import-Dialog-Muster, kein neues Formular gebaut.
- Neue `state`-Felder: `gyms` (Liste), `currentGymId` (`null` = "Kein Gym"), `gymLastWeights`, `gymHistory` — rein additiv, in `loadState()` **und** `importData()` mit Default versehen (beide Stellen müssen laut CLAUDE.md-Regel synchron bleiben). Bestehende Nutzer, die das Feature nie anfassen, sehen exakt das bisherige Verhalten: `currentGymId` bleibt `null`, alles läuft weiter über die unveränderten flachen `state.lastWeights`/`state.history`.
- Sowohl Gewichts-Vorbefüllung als auch die "Letztes Mal"-Anzeige sind gym-gescoped (nicht nur die Vorbefüllung) — neue Accessor-Funktionen `getLastWeights`/`setLastWeights`/`getHistoryEntry`/`setHistoryEntry` kapseln das Verzweigen zwischen Gym-Bucket und Flat-Bucket, damit `buildInitialSets`/`finishSession`/`render` nicht direkt auf `state.lastWeights`/`state.history` zugreifen müssen.
- **Bewusst kein Fallback** auf das alte Gewicht beim ersten Besuch eines neuen Gyms — erste Session an einem neuen Studio startet mit leeren Feldern statt einem potenziell falschen Wert aus einem anderen Gym; das ist genau der Verwechslungsfall, den das Feature verhindern soll.
- Neue UI-Zeile unter dem Plan-Dropdown: Gym-Select + ⚙-Verwalten-Panel (Umbenennen/Löschen). Komplett ausgeblendet bis auf einen dezenten "+ Standort hinzufügen"-Link, solange `state.gyms.length === 0` — Nutzer ohne Gym-Bedarf sehen keine neue UI.
- Löschen eines Gyms entfernt es nur aus `state.gyms`; `gymLastWeights[id]`/`gymHistory[id]` bleiben verwaist stehen (kein destruktiver Datenverlust in einer Single-User-App).
- `howto.html` (neuer Abschnitt "🏋 Gym wählen") aktualisiert.
- Verifiziert: `node --check` auf den extrahierten Skriptblock (Syntaxprüfung); manueller Test im Gym durch den Nutzer steht noch aus.

## 2026-07-08 (Teil 24): Notiz zum Schriftgrößen-Default für nächste Session

- Nutzer hat nach v1.6.0 die 3 Schriftgrößen-Stufen ausprobiert und fand die größte Stufe ("sehr groß") am angenehmsten zu lesen — aktueller Default bleibt aber `"normal"`, das war noch keine finale Entscheidung, nur eine Beobachtung zum Merken für die nächste Session.
- In `MEMORY.md` unter "Offene Punkte" festgehalten: nächstes Mal zuerst fragen, ob der Default in `loadState()` auf `"xgross"` umgestellt werden soll, bevor das umgesetzt wird.
- Kein Code geändert, daher kein Versions-Bump. Session wird vom Nutzer geschlossen.

## v1.6.0 — 2026-07-08 (Teil 23): Schriftgrößen-Umschalter (3 Stufen)

- Nutzer-Feedback zur Logo-Größenanpassung führte zur eigentlichen Anfrage: "jede Schrift soll größer werden, 3 Stufen wären gut" — also ein globaler Text-/UI-Skalierungs-Regler, nicht nur eine einzelne Schriftgröße.
- Umsetzung: neue CSS-Variable `--text-zoom` (Default 1, `gross` → 1.15, `xgross` → 1.3), gesetzt über `data-textsize` auf `<html>` (exakt dasselbe Muster wie `data-theme`). Angewendet als `zoom` auf `#app` und `#rest-timer-bar` — skaliert dadurch die **gesamte** Oberfläche (Schrift, Buttons, Abstände) proportional, nicht nur einzelne Font-Size-Regeln. Dadurch mussten nicht ~40 einzelne `font-size`-Deklarationen im Stylesheet angefasst werden.
- Neuer Button "Aa ●○○/●●○/●●●" im Header (neben Dark/Sepia-Toggle), zyklisch normal → groß → sehr groß → normal. Neues `state.textSize`, persistiert, mit Fallback in `loadState()` und `importData()`.
- `zoom` als CSS-Property braucht Firefox 126+ (Mitte 2024) — auf älteren Firefox-Versionen wird die Skalierung einfach ignoriert (kein Crash, nur kein Effekt), alle anderen relevanten Browser unterstützen es schon lange.
- `howto.html` (neuer Abschnitt "Schriftgröße") und `CLAUDE.md` (State-Beschreibung) gemäß der neuen Doku-Regel aktualisiert.
- Verifiziert: Node-Harness bestätigt korrekte 3-Stufen-Rotation, korrektes Button-Label pro Stufe und korrektes `data-textsize`-Attribut nach `render()`.

## v1.5.3 — 2026-07-08 (Teil 22): Header-Logo nochmal größer

- Nutzer-Feedback: Logo wirkt im Verhältnis zu "Fretze pumpt" noch zu klein.
- Anzeigehöhe im Header von 36px auf 46px erhöht (Verhältnis zur 22px-Schrift jetzt ~2.1:1 statt ~1.6:1).

## v1.5.2 — 2026-07-08 (Teil 21): Ausführungshinweise für Aufwärmübungen ergänzt

- Nutzer-Feedback: Übungen und Stretching sind gut mit Ausführungshinweisen beschrieben, die Aufwärmübungen (Mobilisation/Aktivierung) bisher nicht — dort stand nur Name + Wiederholungen.
- Für alle 15 Mobilisations-/Aktivierungsübungen in `WARMUP` (Push/Pull/Legs) ein neues `cue`-Feld ergänzt, analog zum bereits vorhandenen `cue`-Feld bei `STRETCHING` — kurze, eindeutige Standard-Ausführungshinweise (Cat-Cow, Band Pull-Apart, Goblet Squat Hold, etc.), nicht per Deep Research recherchiert, da es sich um allgemein bekannte, unstrittige Mobility-Drills handelt (anders als die Kernübungen/Trainingspläne, wo wissenschaftliche Fundierung wichtig war).
- `warmupSectionHTML()` zeigt den Cue jetzt unter Name+Wiederholungen an, gleiches Markup wie bei Stretching.
- Verifiziert: Render-Sweep über alle Pläne/Tage weiterhin fehlerfrei, Beispiel-Output der Push-Aufwärmsektion inhaltlich geprüft.

## v1.5.1 — 2026-07-08 (Teil 20): Neue Nutzer-Anleitung (`howto.html`)

- Nutzerwunsch: eine howto-Seite, die die App für Endnutzer erklärt (keine Entwickler-Doku), aufrufbar direkt aus der App.
- Neue eigenständige `howto.html` im Root (Teil der Webapp, nicht in `01_Recherchen` o.ä.) — deckt alle aktuellen Features ab: Plan-Auswahl, Tag-Auswahl, Aufwärmen, Sätze eintragen, Übungserklärung, Übung tauschen (inkl. KI-Vorschläge), Satzpause-Timer, Stretching, Training abschließen, Hell/Dunkel-Umschalter, Backup (Export/Import), Installation als PWA.
- Optisch an die App angeglichen (gleiche Google-Fonts, gleiche `--rust`/`--bg`-Variablen für Dark/Sepia); liest per kleinem Inline-Script denselben `localStorage`-Theme-Wert wie `index.html`, damit sie automatisch zum in der App gewählten Theme passt.
- Verlinkt aus dem App-Header ("❓ Anleitung"-Button neben Export/Import); in `sw.js`s `APP_SHELL` aufgenommen, damit sie auch offline verfügbar ist.
- **Neue Prozessregel** (explizite Nutzeranforderung, in `CLAUDE.md` verankert): jede Änderung, die für Endnutzer sichtbar/relevant ist, muss ab jetzt auch `howto.html` aktualisieren — zusätzlich zum bisherigen `PROJEKTLOG.md`-Eintrag (der ist Entwickler-/Session-Doku, kein Nutzer-Text). Rein interne Änderungen (Refactoring, Doku-only) sind davon ausgenommen.

## v1.5.0 — 2026-07-08 (Teil 19): Phase 2 — Mehrere Trainingspläne + Plan-Wechsel ohne Datenverlust

- Umgesetzt nach in Plan-Mode abgestimmtem Ansatz: 3 zusätzliche, wissenschaftlich fundierte Trainingspläne aus `01_Recherchen/01_Trainingsplaene/Trainingsplaene.md` eingebaut — **Upper/Lower** (4 Tage), **Ganzkörper** (3 Tage), **Bro-Split** (5 Tage) — neben dem bisherigen PPL-Plan. Neue Plan-Auswahl (Dropdown) zwischen Header und "Heute dran"-Banner.
- **Kernmechanismus für "kein Datenverlust beim Wechsel"**: `state.sessions`/`history`/`swaps`/`notes`/`lastWeights` bleiben strukturell unverändert (flache Objekte). Die 3 neuen Pläne bekommen komplett eigene, global eindeutige Tag-/Übungs-IDs (z.B. `ulUpperA`/`uua1` für Upper/Lower, `fbA`/`fba1` für Ganzkörper, `broChest`/`brc1` für Bro-Split) — dadurch kollidiert nichts mit den bestehenden PPL-IDs (`pushA`/`pa1` etc.), und ein Plan-Wechsel überschreibt nie Daten eines anderen Plans. Kein Migrationscode für bestehende Nutzerdaten nötig.
- Technisch: bisherige `const DAYS`/`EXERCISES` → `PPL_DAYS`/`PPL_EXERCISES` umbenannt; neues `PLANS`-Array registriert alle 4 Pläne; `DAYS`/`EXERCISES` sind jetzt `let` (mutable Zeiger auf den aktiven Plan, per `applyPlan(planId)` umgeschaltet) — dadurch mussten die ~15 bestehenden `DAYS`/`EXERCISES`-Referenzen in `render()`/Event-Handlern **nicht** angefasst werden.
- Neues `state.currentPlan` (Default `"ppl"`), `applyPlan()` läuft nach dem Laden und nach Import, mit Sicherheitsnetz: gehört `state.currentDay` nicht zum aktiven Plan, wird auf dessen ersten Tag zurückgesetzt.
- **Bug gefunden und behoben, direkt durch diese Änderung verursacht**: `importData()` hat bisher `lastWeights`/`lastCompletedDay`/`lastCompletedDate`/`theme` beim Import stillschweigend verworfen (bestehende Lücke, jetzt mit behoben) und hätte ohne `applyPlan()`-Aufruf nach Import beim Wiederherstellen eines Backups aus einem anderen Plan als dem gerade aktiven zu einem kompletten Render-Crash geführt (falscher `EXERCISES`-Zeiger). Beides gefixt.
- **Bewusster Content-Gap**: `EXERCISE_INFO` (Übungserklärungen) deckt weiterhin nur die PPL-Übungen ab — die 3 neuen Pläne zeigen (noch) keinen ℹ-Button, das blendet sich über den bestehenden Conditional-Check sauber aus. `WARMUP`/`STRETCHING` bekommen nur dort einen `type`, wo die Push/Pull/Legs-Recherche inhaltlich ehrlich passt (`ulLowerA/B`, `broChest/Back/Legs` → legs/push/pull; Oberkörper-Tage, Ganzkörper-Tage, Bro-Split-Schultern/Arme bleiben ohne Aufwärmen/Stretching-Sektion, statt eine schlecht passende Zuordnung zu erzwingen).
- **Bewusst außerhalb dieser Version**: eigene Übungen hinzufügen (bleibt eigener, späterer Schritt).
- **Verifikation**: Node-`vm`-Harness (kein Browser verfügbar) erweitert auf alle 4 Pläne × alle Tage × Panel-Kombinationen — keine Fehler. Zusätzlich gezielter Datenverlust-Test simuliert: Satz in PPL abgehakt, zu Upper/Lower gewechselt, dort auch geloggt, zurück zu PPL gewechselt → beide Pläne behalten ihre Daten unabhängig voneinander (bestätigt).

## v1.4.0 — 2026-07-08 (Teil 18): Recherche-Integration Phase 0/1 — Übungserklärungen, Aufwärmen, Stretching

- Umgesetzt nach dem in Plan-Mode abgestimmten Ansatz (siehe Plan-Datei bzw. Teil 10): additive Inhalte aus 3 der 4 Deep-Research-Dokumente eingebaut, ohne die bestehende `EXERCISES`/`state`-Struktur zu verändern. Die 4. Recherche (mehrere Trainingspläne) ist bewusst **nicht** Teil dieser Version — das ist Phase 2 (größerer Datenmodell-Umbau für Plan-Wechsel).
- **Neue Daten-Consts** in `index.html`: `EXERCISE_INFO` (keyed by `ex.id`, 42 Einträge: Zielmuskulatur primär/sekundär, Ausführung, häufigste Fehler, Sicherheitshinweis — aus `02_Uebungserklaerungen/Uebungsdatenbank.md`), `WARMUP` und `STRETCHING` + `STRETCHING_NOTE` (jeweils keyed by neuem `DAYS[].type` push/pull/legs — aus `03_Aufwaermen/Aufwaermprogramm.md` und `04_Stretching/Stretching.md`).
- **UI**, nach bestehendem Swap-Panel-Muster: neuer "ℹ"-Button pro Übungskarte öffnet ein Info-Panel; aufklappbare "🔥 Aufwärmen"-Sektion oberhalb und "🧘 Stretching"-Sektion unterhalb der Übungskarten (pro Tagestyp, nicht pro Einzeltag). Alle drei defaulten zugeklappt. Neuer ephemerer State `infoOpenKey`/`warmupOpen`/`stretchOpen` (wie `swapOpenKey` nicht in `state`/localStorage), resettet beim Tageswechsel.
- **Verifikation**: `node --check` auf den Script-Inhalt; zusätzlich ein Node-`vm`-Harness gebaut, das `render()` mit gestubbtem `document`/`localStorage` für alle 6 Tage × alle Panel-Kombinationen sowie alle 42 Info-Panels ausführt (kein Browser in dieser Session verfügbar) — keine Fehler, Stichproben-Snapshot inhaltlich gegengelesen (z.B. Push-Tag zeigt korrekt Brust-Stretches und Flachbankdrücken-Zielmuskulatur).
- Bewusst unverändert: `state`-Schema, Export/Import, Session-Flow, Swap-Mechanismus, `sw.js`-`APP_SHELL` (keine neuen Asset-Dateien, nur Code in `index.html`).

## v1.3.3 — 2026-07-08 (Teil 17): Header-Unterzeile ist jetzt ehrlich statisch

- Nutzer bemerkte zurecht: `Push · Pull · Legs — Fortschritt eintragen · v${APP_VERSION}` war komplett statisch (nur die Version änderte sich), wirkte aber wie ein Status. Direkt darunter liefert die bestehende "Heute dran"/"Heute schon trainiert"-Banner bereits den echten tagesaktuellen Inhalt.
- Von 3 vorgeschlagenen Optionen (1: kürzen zu ehrlichem Tagline, 2: echter dynamischer Wert wie ein Streak-Zähler, 3: heutigen Fokus nochmal im Header spiegeln — redundant zur Banner) hat sich der Nutzer für **Option 1** entschieden, jetzt umgesetzt: Text gekürzt zu `PPL Trainingstracker · v${APP_VERSION}` (passt zum `<title>`), keine neue Logik.
- **Offen für später**: Option 2 (z.B. Trainingsserie/Streak aus `state.history`/`lastCompletedDate` berechnet) als eigenes kleines Feature, falls gewünscht — siehe `MEMORY.md` für die Feature-Roadmap, dort ergänzen falls das umgesetzt werden soll.

## v1.3.2 — 2026-07-08 (Teil 16): Feinere Linien fürs Logo

- Nutzer-Feedback: Logo-Linien sollen feiner werden, Farbe gleich lassen (kein neuer Farbwert).
- Umgesetzt per Erosion auf der Alpha-Maske (`PIL.ImageFilter.MinFilter`, Stärke 7) vor dem Einfärben — schmälert Ring, Hantel-Icons und feine Gesichtslinien spürbar, ohne die Silhouette selbst (dicke Flächen wie Bart/Haare) zu verändern. Beide Theme-Varianten (`logo-mark-dark.png`, `logo-mark-sepia.png`) aus derselben verfeinerten Maske neu erzeugt, Farben unverändert (`#F97316` / `#A8461E`).
- App-Icon-Set (`icon-192.png`/`icon-512*.png`, damit auch das Favicon) bewusst nicht angefasst — war nicht Teil der Anfrage, bleibt die separate, nicht themenabhängige Asset-Linie (siehe Teil 13/14).

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
