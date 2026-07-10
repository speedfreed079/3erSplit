# MEMORY.md

Projektweite Fakten und Entscheidungen für "Fretze" (bis 2026-07-08 "Eisernes Log", zwischenzeitlich "Fretze pumpt" bis 2026-07-09) — als Kontext-Referenz, ergänzend zu `CLAUDE.md` (Arbeitsanweisungen) und `PROJEKTLOG.md` (chronologischer Verlauf).

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
- **Standard-Schriftgröße evtl. auf "sehr groß" (`xgross`) ändern?** (Notiz vom 2026-07-08, nach Einführung des 3-Stufen-Schriftgrößen-Reglers in v1.6.0): Nutzer fand beim Ausprobieren die größte Stufe am angenehmsten zu lesen ("konnte so entspannt lesen"), aktueller Default ist aber `"normal"`. Noch keine endgültige Entscheidung — nächste Session zuerst fragen, ob der Default wirklich auf `xgross` umgestellt werden soll (betrifft nur `loadState()`-Fallback für neue/leere Installationen, analog zur früheren Sepia-Default-Änderung in v1.2.2).

## Feature-Roadmap (Stand 2026-07-08)

Wunschliste des Nutzers, einsortiert nach Recherche- vs. Engineering-Aufwand und in eine empfohlene Umsetzungsreihenfolge gebracht. Für die Recherche-Punkte wurden bereits 4 Gemini-Deep-Research-Prompts erstellt (Trainingspläne, Übungserklärungen, Aufwärmen, Stretching) — Ergebnisse stehen noch aus, das ist aktuell der Blocker für Phase 1.

**Die 7 Punkte:**
1. Vorgefertigte, wissenschaftlich fundierte Trainingspläne zur Auswahl (mehrere Splits, nicht nur PPL) — *Recherche + Datenmodell*
2. Wechseln zwischen Plänen ohne Datenverlust — *Engineering, hängt an 1*
3. Erklärung der Übungen (Ausführung, Zielmuskeln, Fehler) in der App — *Recherche*
4. Login-Funktion — *Engineering, großer Architekturschritt*
5. Übungen hinzufügen (eigene/custom) — *Engineering*
6. Aufwärmen vor dem Workout, passend zum Workout-Typ — *Recherche*
7. Stretching/Cool-down nach dem Workout, passend zum Workout-Typ — *Recherche*

**Empfohlene Reihenfolge:**

- **Phase 0/1 (erledigt, v1.4.0, 2026-07-08):** Übungs-Erklärungen (`EXERCISE_INFO`), Aufwärmen/Stretching pro Workout-Typ (`WARMUP`/`STRETCHING`) additiv zum bestehenden PPL-Plan eingebaut, siehe `PROJEKTLOG.md` Teil 18.
- **Phase 2 (erledigt, v1.5.0, 2026-07-08):** Punkt 1 (mehrere Pläne: PPL/Upper-Lower/Ganzkörper/Bro-Split) + Punkt 2 (Plan-Wechsel ohne Datenverlust) umgesetzt, siehe `PROJEKTLOG.md` Teil 19 und `CLAUDE.md` Abschnitt "Data model" für den ID-Namensraum-Mechanismus. Punkt 5 (eigene Übungen hinzufügen) war bewusst **nicht** Teil dieser Version — offener nächster Schritt, sobald gewünscht.
- **Phase 3 — bewusst zuletzt:** Punkt 4 (Login/Firebase). Bleibt an die bestehende Entscheidung gekoppelt (Auslöser = erster mitnutzender Freund, siehe oben), zusätzlich sinnvoll erst NACH Phase 2, damit nur einmal migriert wird (fertiges Datenmodell nach Firestore, nicht zweimal migrieren).

**Nächster konkreter Schritt:** eigene Übungen hinzufügen (Punkt 5) — bisher einziger offener Roadmap-Punkt außer Login/Firebase (Phase 3, absichtlich später).

## Feature-Wünsche aus Nutzerperspektive (Claude-Rollenspiel, 2026-07-10)

Auf Nutzeranfrage hat Claude sich in die Nutzerrolle versetzt und die App aus Anwendersicht bewertet. Noch nicht priorisiert oder mit dem Nutzer abgestimmt — reine Ideensammlung, ergänzend zur Feature-Roadmap oben.

- **Wochenvolumen als Trend statt Einzelwoche**: `journalVolumeHTML()` (v1.18.0) zeigt nur die aktuelle ISO-Woche isoliert. Mehrwochen-Trend pro Muskelgruppe würde helfen, strukturelles Unter-/Übertraining zu erkennen statt nur eine Momentaufnahme.
- **PRs über reines Gewicht hinaus**: `computePersonalRecords()` definiert PR aktuell als schwerstes je gehobenes Gewicht (unabhängig von Wiederholungen). Volumen-PR (Gewicht × Wdh.) oder e1RM-Schätzung wären bei Übungen mit hohen Wiederholungszahlen aussagekräftiger.
- **Konfigurierbarer Ruhetimer**: `restTimer` startet aktuell pauschal bei jedem abgehakten Satz mit fester Logik. Wunsch: unterschiedliche Standardzeiten für Compound vs. Isolation, plus Push-Benachrichtigung, wenn die App im Hintergrund ist.
- **KI-Übungstausch als Dialog statt Einbahnstraße**: `fetchAiSuggestions()`/der Gemini-Proxy liefert aktuell nur statische Alternativlisten. Interessant wäre ein kurzer Dialog (z. B. "Knie zwickt bei Kniebeugen, was für die nächsten 2 Wochen?") statt einmaliger Vorschläge.
- **Bibliothekslücken schließen**: Calisthenics-Plan und einige Custom-Plan-Übungen haben noch keinen `libraryId`/keine ℹ-Erklärung (siehe CLAUDE.md, Abschnitt "calisthenics plan's alts repurposed"). Auf Dauer als unfertig wahrnehmbar für Nutzer dieser Pläne.
- **Cloud-Sync (Phase B) früher spürbar vermisst**: Aktuell nur Firebase Auth ohne Firestore-Sync (siehe "Konto/Login — Phase A" in CLAUDE.md). Bei Geräte-/Browserwechsel ist man auf Export/Import angewiesen — aus Nutzersicht schon jetzt spürbar, nicht erst "sobald ein Freund mitmacht".
- **Kalender-/Streak-Ansicht im Tagebuch**: aktuell zeigt das Tagebuch Verlauf/Rekorde/Volumen, aber keine Trainings-Streak oder Kalenderübersicht (aufeinanderfolgende Trainingstage, Pausentage). Wird als motivierender eingeschätzt als reine Zahlen.
- **Notizen pro Trainingseinheit statt nur pro Übung**: `state.notes` ist aktuell nur je Übung vorgesehen. Ein Tages-/Session-Kommentar (Schlaf, Energie, Krankheit) würde späteren Kontext liefern, warum eine Woche schwächer lief.

## Kritisches Feedback zu Optik/Bedienbarkeit (Claude-Rollenspiel + Gemini, 2026-07-10)

Auf Nutzeranfrage hat Claude den kompletten `<style>`-Block von `index.html` gesichtet und aus Nutzersicht bewertet; der Nutzer hat dieselbe Frage zusätzlich Gemini gestellt und beide Antworten zusammen einsortiert. Grundton beider Male positiv (Oswald/Inter/JetBrains-Mono-Kombination + Dark/Sepia-Themes wirken stimmig, kein Fokusverlust beim Tippen, festes Spalten-Grid).

**Bereits umgesetzt (v1.26.0):**
- **Tap-Targets zu klein für den Trainingskontext** — von beiden unabhängig voneinander als größtes Problem identifiziert (Claude: `.done-btn` war 24×24px, `.warmup-toggle`/`.couldmore-toggle` nur `min-width: 26px`, deutlich unter der 44px-Empfehlung; Gemini: dieselbe Beobachtung über Fitts' Law, Buttons zu nah beieinander bei schwitzigen/zittrigen Fingern im Training). Behoben: `.set-header`/`.set-row`-Grid-Spalten für 🔥/↑/Done auf `40px 40px 40px` (vorher `32px 32px 24px`), `.swap-btn` (ℹ/⟲) und `.home-plan-edit`/`.home-plan-delete` (✏/🗑) auf `min-width/height: 44px`. Playwright-Screenshot-Test bei 375px-Breite (iPhone SE) bestätigt: kein horizontales Überlaufen, alle Zielgrößen exakt getroffen.

**Bereits umgesetzt (v1.27.0, Phase 1 der Nutzer-Reihenfolge):**
- **`prompt()`/native Browser-Dialoge ersetzt**: neue App-eigene Modal-Komponente (`openPromptModal`/`openConfirmModal`) für Gym anlegen/umbenennen/löschen, Plan löschen, Import-Überschreiben. Per Playwright verifiziert, dass kein natives Dialogfenster mehr auftaucht.
- **Bestätigungsdialog vor dem Löschen**: existierte bereits vorher (kein Datenverlust-Risiko) — jetzt nur in der neuen Modal-Optik statt nativem `confirm()`.
- **`--rust` doppelt belegt — teilweise entschärft**: innerhalb der neuen Modal-Komponente ist die Bedeutung jetzt eindeutig (Speichern=`--olive`, Löschen=`--rust`, Abbrechen=neutral). Die App-weite Doppelbelegung an anderen Stellen (`home-plan-delete`, `swap-clear-btn`, `rest-timer-skip`) ist **nicht** global neu eingefärbt — bewusst nur für die neue Komponente gelöst, kein größeres Redesign.
- **Zusätzlich gefunden**: die ✎/✕-Buttons in der Gym-Verwaltung hatten inline `padding:0` (kleiner als der `.done-btn` vor v1.26.0, beim Tap-Target-Pass übersehen) — jetzt eigene `.gym-icon-btn`-Klasse mit 32×32px Mindestgröße.

**Noch offen, nicht priorisiert:**
- **Set-Row weiterhin dicht auf schmalen Screens**: durch die größeren Tap-Targets ist noch weniger Platz für die Gewicht/Wdh.-Eingabefelder übrig (Kompromiss: `gap` von 8px auf 6px reduziert, um das teilweise auszugleichen) — bei sehr schmalen Geräten immer noch eng, aber kein horizontales Overflow.
- **Sekundärtext oft klein und stark gedimmt**: `--chalk-dim` bei 10–13px trägt Infos, die man mitten im Satz braucht.
- **Reine Icon-Buttons ohne Label** (⟲/✏/🗑): haben bereits `title`-Tooltips (helfen Desktop-Maus-Nutzern und Screenreadern), aber `title` zeigt auf Touch-Geräten beim Antippen nichts an — für den eigentlichen Nutzungskontext (Handy im Gym) bleibt die Lernkurve für Erstnutzer damit im Kern unverändert offen.
- **Card-in-Card-Verschachtelung / fehlender Weißraum** (Claude + Gemini decken denselben Punkt aus zwei Blickwinkeln ab): Swap-/Info-/KI-Panel liegen alle in derselben `.card`; Gemini ergänzt, dass die Karte bei Historie+Vorschlag+Notizen+mehreren Sätzen "kollabiert" — beides zeigt auf dasselbe Kartenlayout-Problem, noch nicht angegangen.
- **Abrupte Screen-Wechsel ohne Übergang** (Gemini, neu): `innerHTML`-Austausch beim View-Wechsel "flasht" hart, keine CSS-Fades.
- **Trainingsmodus zu nah an der normalen Liste** (Gemini, neu): Fokus-Ansicht nutzt exakt dieselbe Kartengrafik wie die Kartenliste; Wunsch nach mehr Immersion (Header ausblenden, Übung größer, Navigation dominanter).
