# MEMORY.md

Projektweite Fakten und Entscheidungen für "Fretze" (bis 2026-07-08 "Eisernes Log", zwischenzeitlich "Fretze pumpt" bis 2026-07-09) — als Kontext-Referenz, ergänzend zu `CLAUDE.md` (Arbeitsanweisungen) und `PROJEKTLOG.md` (chronologischer Verlauf).

## Fakten

- Repo: https://github.com/speedfreed079/3erSplit.git, Branch `main`.
- Live-URL: https://speedfreed079.github.io/3erSplit/ (GitHub Pages, direkt aus `main`, kein Build-Step). Aktuelle Version: siehe `APP_VERSION` in `index.html` bzw. Anzeige unten am Header in der App selbst.
- Interne Bezeichner (`STORAGE_KEY` = `eisernes-log-v1`, Worker-Name `eisernes-log-proxy`, Repo-Name `3erSplit`) bleiben bewusst beim alten Namen — Umbenennen würde entweder Nutzerdaten löschen (`STORAGE_KEY`) oder unnötigen Infra-Aufwand ohne Nutzen bedeuten.
- Kein Backend, keine Datenbank: alle Trainingsdaten liegen nur im `localStorage` des jeweiligen Browsers (Key `eisernes-log-v1`). Einziger Backup-Weg ist der Export/Import-Button (JSON-Datei).
- Kein Package-Manager, keine Dependencies außer Google Fonts (CDN-Link in `index.html`).
- Gemini-Proxy: Cloudflare Worker `eisernes-log-proxy`, live unter https://eisernes-log-proxy.speedfreed.workers.dev, Modell `gemini-2.5-flash-lite`. Deploy separat via `wrangler deploy` aus `worker/`, nicht Teil des GitHub-Pages-Deploys. API-Key liegt als Cloudflare-Secret `GEMINI_API_KEY` (serverseitig, nie im Client-Code).
- Multi-User/Freunde: Firebase Auth + Firestore-Sync sind seit v1.22.0 live (Phase B, siehe CLAUDE.md "Konto/Login") — localStorage bleibt der primäre Speicher, Firestore ist ein Best-Effort-Spiegel pro eingeloggtem Nutzer unter `users/{uid}`. Login ist optional, die App funktioniert weiterhin komplett offline/ohne Konto.

## Entscheidungen

- **Deploy nur auf Zuruf**: Änderungen werden lokal committet, aber erst auf explizite Aufforderung nach `main` gepusht (= live), da GitHub Pages ohne Staging direkt aus `main` served.
- **Ein-Datei-Architektur bleibt bestehen**: `index.html` enthält Style + Script inline. Kein Umbau auf Framework/Build-Tooling ohne ausdrücklichen Wunsch.
- **Secrets nie über den Chat**: `wrangler secret put` wird immer vom Nutzer selbst im eigenen Terminal ausgeführt, nie über einen von Claude relayten Shell-Befehl (Hintergrund: ein Vorfall am 2026-07-08, siehe Projektlog Teil 3).
- **Immer versioniert + geloggt** (seit v1.1.0, 2026-07-08): jede Änderung bekommt eine Versionsnummer (`APP_VERSION` in `index.html`, `CACHE_NAME` in `sw.js` synchron mitziehen) und einen Eintrag in `PROJEKTLOG.md` — explizite Nutzeranforderung, keine Ausnahmen.

## Offene Punkte / Ideen

- **5 Nutzer-Funde vom 2026-07-12 (per Screenshots), noch nicht bearbeitet — nächste Session zuerst hier ansetzen:**
  1. **Tagebuch: Reihenfolge "Rekorde"/"Wochenvolumen"-Reiter tauschen** — aktuell Verlauf → Rekorde → Wochenvolumen (`journalTab`-Werte `"verlauf"/"rekorde"/"volumen"`), gewünscht Rekorde und Wochenvolumen vertauscht. Reine Reihenfolge-Änderung in `renderJournalView()`s Tab-Leiste, keine Logik-Änderung.
  2. **Falsche Tagesempfehlung im "Heute dran"-Banner**: zeigte "Pull A", obwohl der Nutzer zuletzt tatsächlich Legs A trainiert hatte (als Nächstes wäre Push B fällig gewesen). Verdacht (noch nicht verifiziert): `finishSession(dayId, ..., dateOverride)` setzt `state.lastCompletedDay`/`state.lastCompletedDate` bei **jedem** Abschluss bedingungslos (`state.lastCompletedDay = dayId`), auch bei rückdatierten Abschlüssen (seit v1.50.0) — ein später abgeschlossener, aber auf ein früheres Datum zurückdatierter Eintrag überschreibt dadurch fälschlich die Empfehlungsgrundlage, obwohl er chronologisch nicht der neueste ist. Nächster Schritt: `getRecommendedDay()`/`lastCompletedDay` ggf. aus `state.journal` ableiten (juengster Eintrag nach `timestamp`) statt aus dem separat gepflegten `lastCompletedDay`/`lastCompletedDate`-Feld, oder den Refresh in `finishSession()` nur ausführen, wenn `refDate` tatsächlich neuer ist als der bisherige `lastCompletedDate`.
  3. **KG-Eingabefeld zu schmal**: dreistellige Gewichte und Nachkommastellen werden abgeschnitten (Screenshots zeigen z.B. "10€" statt "100", "22," statt "22,5"). Betrifft `.set-row`/`.set-header`-Grid (`I:\Meine Ablage\Trainigs-App\index.html`, Set-Spalten-Breiten, siehe CLAUDE.md "Set-row grid alignment") — Kompromiss zwischen Feldbreite und den fixen 🔥/↑/✓-Spalten seit v1.26.0 nötig.
  4. **Ungünstiger Zeilenumbruch im Trainingsmodus**: langer Übungsname "Chest-Supported Row" bricht mitten im Wort ("SUPPO-RTED") statt an der Wortgrenze. `.focusmode-title` hat laut CLAUDE.md bereits `overflow-wrap: break-word` als "Last-Resort" für einzelne sehr lange Wörter (v1.32.0) — das greift hier offenbar zu aggressiv bei einem normal langen, aber zusammengesetzten Namen. Evtl. `word-break: normal` bevorzugen oder mehr Breite/kleinere Schrift für lange Titel.
  5. **Stift-Button (✎) rutscht aus dem Kartenrahmen** bei zweizeiligen Übungsnamen (Beispiel: "Hackenschmidt / Beinpresse"). Karten-Header-Layout (Titel + ℹ/⟲/✎-Buttons nebeneinander) reflowt nicht sauber, wenn der Titel auf 2 Zeilen umbricht.
- **Eingebaute Pläne im Detail bearbeitbar machen erledigt (v1.54.0, 2026-07-12)**: neuer ⎘-Button ("Kopieren & bearbeiten") pro Plan auf dem Startbildschirm, auch bei eingebauten Plänen — öffnet eine Kopie im bestehenden Plan-Builder, landet beim Speichern automatisch als eigener Plan (Label-Vorschlag `[Anzeigename]s [Planname]` bzw. `[Planname] (Kopie)`), Original bleibt unangetastet. Details siehe `PROJEKTLOG.md` v1.54.0.
- **Weiterhin offen, bewusst nicht Teil von v1.54.0**: Pläne analog zur Übungsdatenbank (`exercise-library.json`, seit v1.16.0) aus dem Code auslagern, um neue Pläne ohne Code-Update "injizieren" zu können — vom Nutzer selbst als vagere, spätere Überlegung markiert (Notiz vom 2026-07-12).
- **Standard-Schriftgröße evtl. auf "sehr groß" (`xgross`) ändern?** (Notiz vom 2026-07-08, nach Einführung des 3-Stufen-Schriftgrößen-Reglers in v1.6.0): Nutzer fand beim Ausprobieren die größte Stufe am angenehmsten zu lesen ("konnte so entspannt lesen"), aktueller Default ist aber `"normal"`. Noch keine endgültige Entscheidung — nächste Session zuerst fragen, ob der Default wirklich auf `xgross` umgestellt werden soll (betrifft nur `loadState()`-Fallback für neue/leere Installationen, analog zur früheren Sepia-Default-Änderung in v1.2.2).
- **KI-Übungstausch als Dialog statt Einbahnstraße erledigt (v1.49.0, 2026-07-12)**: letzter Punkt der großen Wunschliste vom 2026-07-10 (siehe unten). Nutzt die Plan-Chat-Infrastruktur aus v1.47.0 wieder, eingebettet im bestehenden ⟲-Panel. Details siehe `PROJEKTLOG.md` v1.49.0.
- **Aufwärmen-Inhalt überarbeitet, erledigt v1.40.0 (2026-07-11)**: Recherche kam als zwei (versehentlich doppelt ausgeführte) Ergebnisse mit teils widersprüchlichen Empfehlungen zurück; Nutzer hat per Rückfrage entschieden: Cardio-Gerät fest pro Tagestyp (Crosstrainer/Push, Rudern/Pull, Fahrrad/Legs), Band-Aktivierung nur noch Push/Pull (Beintag gestrichen), Rampenschema auf 3 Stufen vom Arbeitsgewicht vereinfacht. Details siehe `PROJEKTLOG.md` v1.40.0 und `CLAUDE.md`.
- **Admin-Panel erledigt (v1.45.0/v1.45.1, 2026-07-11)**: Nutzer sperren/entsperren/löschen über eine neue `/admin`-Route im Cloudflare-Worker (Firebase-ID-Token-Verifikation + selbst signiertes Service-Account-JWT über Web Crypto, keine neue Abhängigkeit). Details siehe `PROJEKTLOG.md` v1.45.0.
- **Eigene Übungen zu bestehenden Plänen hinzufügen erledigt (v1.43.0, 2026-07-11)**: Freitext-Tausch im ⟲-Panel + "+ Eigene Übung" pro Trainingstag (auch bei eingebauten Plänen wie PPL). Damit ist auch Feature-Roadmap-Punkt 5 (siehe unten) erledigt.
- **Physio-Übungen mit eigenem Fälligkeits-Rhythmus erledigt (v1.42.0, 2026-07-11)**: nicht Teil der ursprünglichen Roadmap, kam als eigenständiger Nutzerwunsch dazu (PT-Übungen unabhängig vom Trainingsplan-Rhythmus).
- **Übungs-Picker im Plan-Builder erledigt (v1.44.0, 2026-07-11)**: Muskelgruppen-sortierte Mehrfachauswahl + Reihenfolge-Pfeile statt reinem Freitext-Feld.
- **Maschinen-Übungsdatenbank erledigt (2026-07-11)**: 10 fehlende Gym-Maschinen (Adduktoren-/Abduktorenmaschine, Rudermaschine, Smith-Machine u.a.) recherchiert und eingepflegt, 113→123 Einträge.

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
- **Phase 3 (erledigt, v1.19.0-v1.22.0):** Punkt 4 (Login/Firebase Auth + Firestore-Sync).
- **Punkt 5 (erledigt, v1.43.0):** eigene Übungen zu bestehenden Plänen hinzufügen (Freitext-Tausch + "+ Eigene Übung").

**Damit ist die ursprüngliche 7-Punkte-Roadmap vom 2026-07-08 komplett abgearbeitet.**

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
- **Sekundärtext oft klein und stark gedimmt**: `--chalk-dim` bei 10–13px trägt Infos, die man mitten im Satz braucht. **Teilweise behoben in v1.28.2**: die ℹ/⟲/⚙-Buttons (`.swap-btn`) haben jetzt vollen Textkontrast (`--chalk`) plus eine sichtbare Füllfarbe (`--surface2`) statt transparent — `target-line`/`history-line`/`set-count` bleiben aber weiterhin gedimmt, das war nicht Teil dieser Änderung.
- **Reine Icon-Buttons ohne Label** (⟲/✏/🗑): haben bereits `title`-Tooltips (helfen Desktop-Maus-Nutzern und Screenreadern), aber `title` zeigt auf Touch-Geräten beim Antippen nichts an — für den eigentlichen Nutzungskontext (Handy im Gym) bleibt die Lernkurve für Erstnutzer damit im Kern unverändert offen.

**Behoben in v1.30.0 (Phase 3):**
- **Card-in-Card-Verschachtelung / fehlender Weißraum**: ℹ/⟲-Panels sind jetzt gegenseitig exklusiv (nie beide gleichzeitig offen), `.card`-Padding/Abstand leicht erhöht. Die KI-Vorschlag-Panel-Verschachtelung *innerhalb* des Swap-Panels bleibt unverändert (kein separater Punkt, war nie als eigenes Problem benannt).
- **Abrupte Screen-Wechsel ohne Übergang**: neue `setAppHTML()`-Funktion, 150ms-CSS-Fade-in bei jedem View-Wechsel.
- **Trainingsmodus zu nah an der normalen Liste**: Titel 24→32px vergrößert, Navigation jetzt sticky am unteren Rand. Header war schon vorher ausgeblendet (eigener minimaler `.focusmode-topbar`, kein Missverständnis — Gemini kannte den tatsächlichen Code nicht).

## Umsetzungsreihenfolge UI/UX + Feature-Wünsche (Stand v1.29.0)

Nach dem Sammeln von Claudes zwei Rollenspiel-Listen ("Feature-Wünsche"/"Kritisches Feedback" oben) und Geminis zwei Nachrichten (Optik/Bedienbarkeit + Feature-Wunschliste) wurde gemeinsam mit dem Nutzer eine priorisierte Reihenfolge festgelegt. Dies ist die eine Stelle, an der der Gesamtfortschritt über alle vier Quellen hinweg steht — nicht die vier Einzellisten einzeln durchgehen.

- **Phase 1 (erledigt, v1.26.0/v1.27.0/v1.27.1)**: Tap-Targets, native Dialoge ersetzt, `--rust`-Doppelbelegung in der neuen Modal-Komponente entschärft, Gym-Verwaltung auch im Profil. Details siehe "Kritisches Feedback" oben.
- **Phase 2 (erledigt, v1.28.2/v1.29.0)**: Button-Kontrast (ℹ/⟲/⚙), Cloud-Sync-Statusanzeige (Konto-Bereich), Bänder-Kombinations-Rechner (Klammer-Hinweis beim Gewichtsvorschlag im `baender`-Plan).
- **Phase 3 (erledigt, v1.30.0)**: ℹ/⟲-Panels gegenseitig exklusiv (nie beide gleichzeitig offen) + etwas mehr Karten-Weißraum; Trainingsmodus-Titel vergrößert (24→32px) + Navigation sticky am unteren Rand; sanfter Fade-in bei jedem View-Wechsel (`setAppHTML()`, ersetzt alle direkten `#app`.innerHTML-Zuweisungen).
- **Phase 4 (komplett, v1.31.0/v1.32.0/v1.33.0)**: PR-Modell auf geschätztes 1RM (Epley), KI-Übungstausch auch im Trainingsmodus, Wohlbefinden-Tracking (ein optionales Gesamt-Rating 😊/😐/😖 pro Trainingseinheit beim Abschluss, siehe CLAUDE.md "Tagebuch") — alle drei erledigt. Damit ist die gesamte ursprüngliche Phase-1-4-Liste abgearbeitet.
- **Rest der langen Wunschliste — gemeinsam priorisiert (2026-07-10), komplett**: 1) ~~Notizen pro Trainingseinheit~~ **erledigt v1.34.0**. 2) ~~Konfigurierbarer Ruhetimer (Compound-vs-Isolation)~~ **erledigt v1.35.0** (Push-Benachrichtigung im Hintergrund bewusst nicht mitgemacht — eigener, größerer Folgeschritt). 3) ~~Wochenvolumen-Trend über mehrere Wochen~~ **erledigt v1.36.0**. 4) ~~Kalender-/Streak-Zähler~~ **erledigt v1.37.0** (wochenbasiert statt tagesbasiert — siehe CLAUDE.md "Streak counter" für die Begründung). 5) ~~KI-Übungstausch als Dialog statt Einbahnstraße~~ **erledigt v1.49.0**.
- **Damit ist die gesamte am 2026-07-10 erstellte UI/UX- und Feature-Wunschliste (Phase 1-4 + "Rest der Wunschliste") komplett abgearbeitet.** Admin-Panel-Funktionalität ist seit v1.45.0 ebenfalls erledigt (siehe oben).
- **Calisthenics-Übungsdatenbank erledigt (v1.39.0, 2026-07-11)**: Nutzer-Recherche lag vor, 13 fehlende Übungserklärungen integriert — Calisthenics ist damit der letzte Plan mit vollständiger ℹ-Abdeckung, keine Bibliothekslücken mehr offen.
- **Parallel, nicht von mir blockiert**: Fraktionales Wochenvolumen (bewusst abgelehnt in v1.18.0, nur bei explizitem Wunsch revidieren).
