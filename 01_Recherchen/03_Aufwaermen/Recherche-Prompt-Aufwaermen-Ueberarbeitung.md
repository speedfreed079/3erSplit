# Deep-Research-Prompt: Überarbeitung des Aufwärmprogramms (vereinfachen)

Dieser Prompt ist zum Ausführen in einer eigenen Gemini-Deep-Research-Session gedacht (nicht in Claude Code), analog zu den vorherigen Recherche-Prompts. Ergebnis bitte als neue Datei in diesem Ordner ablegen (z.B. `Aufwaermprogramm-vereinfacht.md`) und dann Claude Code Bescheid geben, damit der bestehende `WARMUP`-Inhalt in `index.html` entsprechend ersetzt wird.

**Hintergrund:** Das aktuelle Aufwärmprogramm (`Aufwaermprogramm.md`, bereits integriert) besteht pro Trainingstag-Typ (Push/Pull/Legs) aus vier Teilen: 1) einer allgemeinen Cardio-Phase (aktuell fix "Rudern auf dem Ergometer"), 2) 3 Mobilisationsübungen (dynamisches Dehnen), 3) 2 Aktivierungsübungen mit dem Widerstandsband, 4) einem prozentualen Rampenschema (50/70/80/90 % des Arbeitsgewichts) vor der ersten schweren Übung. Der Nutzer empfindet das als zu umfangreich und möchte es auf das Wesentliche reduzieren: im Kern nur noch dynamisches Dehnen plus eine freie Wahl des Cardio-Geräts (Crosstrainer, Fahrrad oder Rudern statt nur Rudern). Die Band-Aktivierungsübungen und das Rampenschema stehen infrage — ob sie wegfallen oder bleiben, soll die Recherche fundiert beantworten, nicht vorab feststehen.

---

## Prompt (zum Kopieren)

Erstelle eine wissenschaftlich fundierte Einordnung und einen überarbeiteten, vereinfachten Aufwärm-Vorschlag für ein Krafttraining-Programm (Push/Pull/Legs-Split), mit folgenden konkreten Fragen und Zielen:

**1. Allgemeine Cardio-Phase (Cool-down zur Betriebstemperatur):**
Ist es aus sportwissenschaftlicher Sicht sinnvoll, hier statt eines einzelnen fest vorgeschriebenen Geräts (z.B. nur Rudern) eine freie Auswahl zwischen mehreren gleichwertigen Optionen anzubieten — konkret Crosstrainer, Fahrradergometer und Ruderergometer? Gibt es nennenswerte Unterschiede zwischen diesen dreien für die Aufwärmwirkung vor einem Push-, Pull- bzw. Bein-Tag, oder sind alle drei bei 2-3 Minuten moderater Intensität funktional austauschbar? Bitte kurze Einordnung, ob eine Empfehlung pro Tagestyp sinnvoll ist (z.B. Fahrrad/Crosstrainer vor Beintagen wegen höherer Beinbeteiligung) oder ob freie Wahl für alle drei Tagestypen ausreicht.

**2. Dynamisches Dehnen/Mobilisation:**
Bestätige oder korrigiere: ist dynamisches Dehnen (aktive Bewegungen durch das Bewegungsspektrum, kein statisches Halten) allein als Kernstück des Aufwärmens vor einem Krafttraining ausreichend, wenn direkt danach mit dem eigentlichen Satzgewicht (ggf. leicht ansteigend) begonnen wird? Für jeden der 3 Tagestypen (Push/Pull/Legs) bitte 2-3 passende dynamische Dehn-/Mobilisationsübungen mit kurzer Ausführungsanweisung vorschlagen (ähnlicher Umfang wie die bestehenden Mobilisationsübungen, siehe Formatvorlage unten).

**3. Band-Aktivierungsübungen — bleiben oder weglassen?**
Die aktuelle Version enthält zusätzlich 2 Aktivierungsübungen mit dem Widerstandsband pro Tagestyp (z.B. Band Pull-Aparts, Face Pulls, Glute Bridges mit Miniband). Bitte einordnen: haben diese einen belegbaren Zusatznutzen (z.B. Verletzungsprävention durch gezielte Voraktivierung von Rotatorenmanschette/Gesäßmuskulatur) gegenüber reinem dynamischem Dehnen, der den zusätzlichen Zeitaufwand und die Bandausrüstung rechtfertigt? Oder ist der Effekt in der Literatur so gering/uneindeutig, dass ein Weglassen zugunsten von Einfachheit vertretbar ist? Bitte eine klare Empfehlung mit Begründung, keine reine Auflistung von Für/Wider.

**4. Prozentuales Rampenschema (50/70/80/90 % vor dem ersten Arbeitssatz):**
Gleiche Frage wie bei Punkt 3: ist ein strukturiertes Rampenschema vor dem ersten schweren Satz einer Übung (insbesondere bei Grundübungen wie Kniebeuge, Kreuzheben, Bankdrücken) sportwissenschaftlich klar von Vorteil gegenüber einem einfacheren Einstieg (z.B. nur 1-2 lockere Aufwärmsätze nach Gefühl), oder ist der Zusatznutzen bei einem Freizeitsportler-Kontext (kein Wettkampf-Powerlifting) gering? Bitte eine klare Empfehlung.

**Format-Vorlage für die Mobilisationsübungen (Beispiel aus dem bestehenden Programm):**

```
{ text: "Brustwirbelsäulen-Rotation im Vierfüßlerstand", reps: "10 Wdh. pro Seite", cue: "Im Vierfüßlerstand eine Hand hinter den Kopf legen, den Ellbogen kontrolliert nach oben zur Decke rotieren und mit dem Blick folgen, dann zurück und Seite wechseln." }
```

**Gewünschte Ausgabestruktur:**
1. Kurze Einordnung/Antwort zu Frage 1 (Cardio-Geräte-Wahl) — mit klarer Ja/Nein-Empfehlung, ob freie Auswahl sinnvoll ist.
2. Für jeden Tagestyp (Push, Pull, Legs) 2-3 dynamische Mobilisationsübungen im obigen Format (`text`/`reps`/`cue`).
3. Klare Empfehlung zu Frage 3 (Band-Aktivierung behalten oder streichen) mit Begründung.
4. Klare Empfehlung zu Frage 4 (Rampenschema behalten, vereinfachen oder streichen) mit Begründung.
5. Falls Rampenschema oder Aktivierung laut Empfehlung bleiben sollen: bitte im bestehenden Format vorschlagen (siehe `Aufwaermprogramm.md`), damit eine Ein-zu-eins-Übernahme möglich ist.

**Bitte mit Quellenangaben/Fußnoten arbeiten, falls das Recherche-Tool das unterstützt** — hier zählt die wissenschaftliche Fundiertheit besonders, da bewusst von der bisherigen (bereits recherchierten) Version abgewichen werden soll.
