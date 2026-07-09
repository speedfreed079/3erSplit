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
