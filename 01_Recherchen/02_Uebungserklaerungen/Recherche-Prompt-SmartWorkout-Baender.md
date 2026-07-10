# Deep-Research-Prompt: Übungserklärungen für den Bänder-Plan (SmartWorkout Elite)

Dieser Prompt ist zum Ausführen in einer eigenen Gemini-Deep-Research-Session gedacht (nicht in Claude Code), analog zu den vorherigen Prompts (`Uebungsdatenbank.md`, `Uebungsdatenbank-UL-FB-BroSplit.md`, `Recherche-Prompt-Calisthenics.md`). Ergebnis bitte als neue Datei in diesem Ordner ablegen (z.B. `Uebungsdatenbank-SmartWorkout-Baender.md`) und dann Claude Code Bescheid geben, damit der Inhalt in `exercise-library.json` integriert wird.

**Warum ein eigener Durchgang nötig ist:** die Trainingsplan-Recherche (`01_Trainingsplaene/SmartWorkout-Baender-Trainingsplan.md`) hat bei **jeder** der 22 Übungen einen relevanten Technik-Unterschied zur Freihantel-Version markiert — Widerstandsbänder haben eine akkommodierende (progressiv ansteigende) Widerstandskurve statt einer konstanten Schwerkraftlast, d.h. minimale Last am gedehnten Punkt, maximale Last im Lockout (genau umgekehrt zu freien Gewichten). Die bestehenden Freihantel-Erklärungen aus `exercise-library.json` passen deshalb technisch nicht 1:1 und werden hier bewusst nicht wiederverwendet.

---

## Prompt (zum Kopieren)

Erstelle einen biomechanisch fundierten Übungskatalog für eine Fitness-App, im selben Stil und Format wie ein bereits bestehender Katalog (Beispiel-Eintrag unten als Formatvorlage).

**Ausrüstung (exaktes Set, "SmartWorkout Elite"):** 7 Widerstandsbänder (5-25kg, stapelbar bis ca. 120-160kg kombiniert), eine zerlegbare Metallstange ("SmartWorkout Bar"), 2 Griffe, 2 Fußmanschetten, 1 XL-Türanker, 4 Karabiner.

**Ziel:** Für jede der folgenden 22 Übungen exakt diese vier Angaben liefern:

1. **Zielmuskulatur (primär/sekundär)** — eine primäre und 1-2 sekundäre Muskelgruppen, in normalem Deutsch (nicht lateinische Fachbegriffe).
2. **Ausführung** — 3-5 nummerierte Schritte, prägnant, ohne direkte Anrede ("du"/"deine" vermeiden, neutral-professionell formulieren). **Bitte explizit auf die bänderspezifische Technik eingehen**, wo relevant: nötige Vorspannung am tiefsten Punkt (damit die Bänder dort nicht schlaff hängen), Standbreite/Verankerungsabstand zur Widerstandseinstellung, sowie ggf. empfohlene Tempokontrolle in der exzentrischen Phase.
3. **Häufigste Fehler** — 2-4 Stichpunkte, die häufigsten Technikfehler speziell beim Bändertraining (nicht nur allgemeine Fehler der Freihantel-Version — z.B. fehlende Vorspannung, unkontrolliertes Zurückschnellenlassen der Bänder).
4. **Sicherheitshinweis** — ein Satz mit dem wichtigsten Sicherheitsaspekt für Bändertraining (z.B. Prüfung auf Materialermüdung/Risse vor dem Satz, sicherer Stand des Türankers, kontrolliertes Nachlassen statt Loslassen unter Spannung).

**Format-Vorlage (Beispiel aus dem bestehenden Katalog):**

```
#### Übung: Flachbankdrücken Kurzhantel

* Zielmuskulatur (primär/sekundär): Primär: Großer Brustmuskel (mittlerer Anteil) / Sekundär: Vorderer Schultermuskel, Trizeps.
* Ausführung:
  1. Flach auf den Rücken auf die Bank legen und die Füße fest auf dem Boden platzieren.
  2. Die Kurzhanteln mit gestreckten Armen senkrecht über der Brust halten, wobei die Handflächen nach vorne zeigen.
  3. Die Gewichte kontrolliert absenken, bis die Ellbogen etwa im 90-Grad-Winkel stehen und leicht zum Körper geneigt sind.
  4. Die Hanteln kraftvoll nach oben zusammenführen, ohne die Ellbogen ganz durchzustrecken.
* Häufigste Fehler:
  * Die Ellbogen stehen im 90-Grad-Winkel nach außen, was die Gelenke überlastet.
  * Extremes Hohlkreuz mit Anheben des Gesäßes von der Flachbank.
  * Unkontrolliertes Herablassen der Gewichte ohne Muskelspannung.
* Sicherheitshinweis: Am Ende des Satzes die Hanteln kontrolliert auf die Oberschenkel sinken lassen, statt sie seitlich auf den Boden fallen zu lassen.
```

**Die 22 Übungen** (nach Bewegungsmuster gruppiert, damit ähnliche Übungen im Kontext recherchiert werden):

*Drücken (Brust/Schulter):*
- Bankdrücken mit der SmartWorkout Bar (Bänder)
- Schulterdrücken mit der SmartWorkout Bar (Bänder)
- Fliegende mit Türanker und Griffen (Bänder)

*Ziehen (Rücken):*
- Vorgebeugtes Rudern mit der SmartWorkout Bar (Bänder)
- Latzug kniend mit Türanker und Griffen (Bänder)
- Einarmiges Rudern mit Türanker und Griff (Bänder)
- Latzug eng mit Türanker und der SmartWorkout Bar (Bänder)

*Schulter (isoliert):*
- Seitheben mit Griffen (Bänder)
- Seitheben vorgebeugt mit Griffen (Bänder)

*Arme:*
- Trizepsdrücken über Kopf mit Türanker und Griffen (Bänder)
- Bizeps-Curls mit der SmartWorkout Bar (Bänder)
- Trizepsdrücken mit Türanker und Griffen (Bänder)

*Beine (kniedominant):*
- Kniebeugen mit der SmartWorkout Bar (Bänder)
- Ausfallschritte mit der SmartWorkout Bar (Bänder)
- Beinstrecken stehend mit Türanker und Fußmanschette (Bänder)

*Beine (hüftdominant/hinten):*
- Rumänisches Kreuzheben mit der SmartWorkout Bar (Bänder)
- Kreuzheben mit der SmartWorkout Bar (Bänder)
- Beinbeuger stehend mit Türanker und Fußmanschette (Bänder)
- Glute Kickbacks mit Türanker und Fußmanschette (Bänder)
- Hüft-Abduktion mit Türanker und Fußmanschette (Bänder)

*Rumpf/Core:*
- Core-Rotations-Holzfäller mit Türanker und Griffen (Bänder)
- Pallof Press mit Türanker und Griffen (Bänder)

**Wichtig:**
- Ausgabeformat exakt wie oben (Markdown-Liste mit `####`-Überschrift pro Übung, dieselben vier Bullet-Kategorien) — das lässt sich direkt eins-zu-eins in die App-Datenstruktur übernehmen, ohne Nachbearbeitung.
- Bitte mit Quellenangaben/Fußnoten arbeiten wie im Beispiel, falls das Recherche-Tool das unterstützt.
- Die Übungsnamen bitte exakt wie oben übernehmen (inkl. Zubehör-Angabe in Klammern) — das ist der Name, unter dem die Übung schon im Trainingsplan hinterlegt ist.
