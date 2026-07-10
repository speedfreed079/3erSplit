# Deep-Research-Prompt: SmartWorkout-Widerstandsbänder-Trainingsplan

Dieser Prompt ist zum Ausführen in einer eigenen Gemini-Deep-Research-Session gedacht (nicht in Claude Code), analog zu den bisherigen Recherchen (zuletzt: Zuhause/Calisthenics). Ergebnis bitte als neue Datei in diesem Ordner ablegen (z.B. `SmartWorkout-Baender-Trainingsplan.md`) und dann Claude Code Bescheid geben, damit der Inhalt als sechster Plan (`PLANS`) in `index.html` integriert wird.

Für Übungen, die noch nicht in der bestehenden Übungsdatenbank (`exercise-library.json`) stehen bzw. deren Technik sich beim Bändertraining relevant von der Kurzhantel-/Langhantel-Version unterscheidet, ist ggf. ein zweiter, kleinerer Recherche-Durchgang nach demselben Muster wie `02_Uebungserklaerungen/Recherche-Prompt-Calisthenics.md` nötig — das ist bewusst NICHT Teil dieses Prompts, sondern ein separater Folgeschritt.

---

## Prompt (zum Kopieren)

Erstelle einen wissenschaftlich fundierten Trainingsplan für ein bestimmtes Widerstandsbänder-Set für eine Fitness-App, im selben Stil und Format wie bereits bestehende Pläne für Push/Pull/Legs, Upper/Lower, Ganzkörper, Bro-Split und Zuhause/Calisthenics (Beispiel-Eintrag unten als Formatvorlage).

**Ausrüstung (exaktes Set, "SmartWorkout Elite"):**
- 7 Widerstandsbänder (je 120 cm Naturlatex): 2× 25 kg, 2× 20 kg, 1× 15 kg, 1× 10 kg, 1× 5 kg — einzeln oder kombiniert/gestapelt einsetzbar, dadurch stufenlos einstellbarer Widerstand von ca. 5 kg bis 160 kg (laut Hersteller kombinierbar).
- 1 Metallstange ("SmartWorkout Bar", bis 200 kg belastbar), zerlegbar in zwei 53-cm-Hälften — ermöglicht bänder-basierte Übungen im Bar-/Langhantel-Stil (z.B. Kniebeugen, Kreuzheben, Rudern, Überkopfdrücken).
- 2 Griffe (14,5 cm, bis 100 kg belastbar) — für Kabelzug-artige Übungen (Curls, Trizepsdrücken, Rudern, Seitheben).
- 2 Fußmanschetten (Neopren) — für Bein-Übungen (Beinheben, Kickbacks, Abduktion/Adduktion).
- 1 XL-Türanker (bis 120 kg belastbar) sowie 4 Karabiner — für angeankerte Zug-/Druckbewegungen.

**Zentraler Unterschied zum bisherigen Zuhause/Calisthenics-Plan:** hier gibt es eine echte, kontinuierliche Widerstands**progression** (mehr/stärkere Bänder kombinieren), ähnlich wie bei freien Gewichten — anders als beim reinen Körpergewichtstraining braucht dieser Plan **keine** Progressionsstufen-Liste (schwerere Übungsvariante statt mehr Gewicht). Bitte stattdessen wie bei den Gym-Plänen normale Sätze/Wiederholungsbereiche angeben; wo eine Übung mit diesem Set an eine Widerstandsgrenze stoßen könnte (z.B. wenn alle Bänder schon kombiniert sind), das bitte kurz anmerken.

**Rahmenbedingungen:**
- **Zielgruppe**: Personen mit Trainingserfahrung, die zeitweise oder dauerhaft ohne Gym trainieren wollen (Reisen, Homeoffice, kein Gym vor Ort) und in einen bestehenden Trainingsalltag mit freien Gewichten zurückwechseln können.
- **Frequenz**: bitte einen Split vorschlagen, der die tatsächlichen Möglichkeiten dieses Sets ausnutzt (Bar + Griffe + Türanker decken praktisch alle Hauptbewegungsmuster ab) — Ganzkörper (3x/Woche) oder Oberkörper/Unterkörper (4x/Woche), je nachdem was laut etablierten Volumen-/Frequenz-Richtwerten sinnvoller ist.
- **Abzudeckende Bewegungsmuster**: horizontales/vertikales Drücken (Bankdrücken- und Überkopfdrücken-Analogon mit Bar oder Griffen), horizontales/vertikales Ziehen (Rudern mit Bar/Türanker, Latzug-Analogon mit Türanker), Beine kniedominant (Kniebeugen mit Bar) und hüftdominant (Kreuzheben mit Bar, Beincurls mit Fußmanschette), Schultern isoliert (Seitheben mit Griffen), Arme (Curls, Trizepsdrücken mit Griffen/Türanker), Rumpf/Core.

**Ziel:** Für jeden Trainingstag eine Liste von Übungen mit **Name | Sätze | Zielwiederholungsbereich | Kurzbegründung (mit Quellenverweis)**, exakt im Format der bestehenden Trainingspläne. Bei jeder Übung bitte auch angeben, mit welchem Zubehör aus dem Set sie ausgeführt wird (Bar / Griffe / Türanker / Fußmanschette), damit das in der App als Hinweis mit angezeigt werden kann.

**Format-Vorlage (Beispiel aus dem bestehenden Katalog, Push/Pull/Legs):**

```
Plan: Push/Pull/Legs (PPL)
Trainingstage: 6
Kurzbegründung (2-3 Sätze, mit Quellenverweis): Der PPL-Split verteilt ein hohes wöchentliches Trainingsvolumen auf sechs Einheiten pro Woche, wodurch die akute Ermüdung pro Trainingseinheit gering gehalten und lokales Junk-Volumen vermieden wird[6]. Jede Muskelgruppe wird exakt zweimal pro Woche trainiert, was den optimalen Frequenzbereich für fortgeschrittene Athleten abdeckt[3].

Tag Push A (Brust, Schultern, Trizeps):
- Bankdrücken mit der SmartWorkout Bar (Bänder) | 3 | 6-8 | Hohe mechanische Spannung, Widerstandskurve passt sich der Hebelmechanik der Druckbewegung an[1]
- Seitheben mit Griffen (Bänder) | 3 | 12-15 | Kontinuierliche Spannung über den gesamten Bewegungsradius, anders als bei Kurzhanteln[19]
```

**Wichtig:**
- Ausgabeformat exakt wie oben (Klartext-Block pro Plan/Tag mit `Name | Sätze | Wiederholungen | Kurzbegründung`-Zeilen, plus Zubehör-Angabe pro Übung) — das lässt sich direkt in die App-Datenstruktur übernehmen, ohne Nachbearbeitung.
- Bitte mit Quellenangaben/Fußnoten arbeiten wie im Beispiel, falls das Recherche-Tool das unterstützt.
- Bitte klar kennzeichnen, welche Übungen sich in Ausführung/Technik relevant von ihrem Kurzhantel-/Langhantel-Pendant unterscheiden (z.B. andere Widerstandskurve, andere Verletzungsrisiken) — diese brauchen später eine eigene, bänderspezifische Übungserklärungs-Recherche statt die bestehende Freihantel-Erklärung einfach wiederzuverwenden.
