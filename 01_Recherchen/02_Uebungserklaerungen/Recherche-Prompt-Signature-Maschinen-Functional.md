# Deep-Research-Prompt: Signature-Maschinen & Functional-Training-Übungen

Dieser Prompt ist zum Ausführen in einer eigenen Gemini-Deep-Research-Session gedacht (nicht in Claude Code), analog zu den vorherigen Prompts. Ergebnis bitte als neue Datei in diesem Ordner ablegen (z.B. `Uebungsdatenbank-Signature-Functional.md`) und dann Claude Code Bescheid geben, damit der Inhalt in `exercise-library.json` integriert wird.

**Hintergrund:** Die bestehende Datenbank (123 Einträge) deckt klassische pin-loaded Maschinen bereits gut ab (siehe `Recherche-Prompt-Maschinen.md`, Teil 74). Nutzer-Recherche ergab: viele Nutzer trainieren in Budget-/Kettenstudios wie McFIT — dort stehen zusätzlich zu den Standard-Maschinen sogenannte "Signature-Geräte" (McFIT nutzt gym80-Ausrüstung mit Reverse Hyper, Belt Squat, Nackenmaschine u.a.) sowie ein dedizierter Functional-Training-Bereich (Kettlebells, Schlitten, Battle Ropes). Unten aufgeführt sind bewusst nur die **8 Übungen, die dort noch fehlen** — wieder herstellerneutral formuliert.

---

## Prompt (zum Kopieren)

Erstelle einen biomechanisch fundierten Übungskatalog für eine Fitness-App, im selben Stil und Format wie ein bereits bestehender Katalog (Beispiel-Eintrag unten als Formatvorlage).

**Ziel:** Für jede der folgenden 8 Übungen (Signature-Kraftgeräte und Functional-Training-Klassiker, wie sie in vielen modernen Fitnessstudio-Ketten stehen, herstellerunabhängig) exakt diese vier Angaben liefern:

1. **Zielmuskulatur (primär/sekundär)** — eine primäre und 1-2 sekundäre Muskelgruppen, in normalem Deutsch (nicht lateinische Fachbegriffe wie "Musculus pectoralis" — stattdessen "Großer Brustmuskel" o.ä., damit es in einer Konsumenten-App direkt lesbar ist).
2. **Ausführung** — 3-5 nummerierte Schritte, prägnant, ohne direkte Anrede ("du"/"deine" vermeiden, neutral-professionell formulieren, z.B. "Den Rücken während der gesamten Bewegung neutral halten" statt "Halte deinen Rücken neutral").
3. **Häufigste Fehler** — 2-4 Stichpunkte, die häufigsten Technikfehler bei dieser Übung.
4. **Sicherheitshinweis** — ein Satz mit dem wichtigsten Sicherheitsaspekt.

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

**Die 8 Übungen** (nach Kategorie gruppiert):

*Signature-Maschinen (Rücken/Hüfte, geführt):*
- Reverse Hyperextension (Maschine, Hüftstreckung mit hängenden Beinen — nicht zu verwechseln mit der bereits vorhandenen Rückenstrecker-Maschine, bei der sich der Oberkörper bewegt statt der Beine)
- Belt-Squat-Maschine (Kniebeuge mit Zug über einen Hüftgurt statt Last auf der Wirbelsäule)
- Nackenmaschine (geführtes Nackentrainng, Flexion/Extension gegen Widerstand)
- Kniende Beincurl-Maschine (assistierte Nordic-Curl-Variante — nicht zu verwechseln mit der bereits vorhandenen freien/bewegungsgewichtigen Nordic-Hamstring-Curl-Übung)

*Functional Training (freie Übungen mit Equipment, kein Maschinen-Pin):*
- Kettlebell Swing
- Schlittenschieben (Sled Push)
- Schlittenziehen (Sled Pull, z.B. mit Zuggurt)
- Battle Ropes (Wellenschlag)

**Wichtig:**
- Bewusst herstellerneutral formulieren — keine Markennamen (weder im Übungsnamen noch in Ausführung/Sicherheitshinweis).
- Bei der Reverse Hyperextension bitte den Unterschied zur normalen Rückenstrecker-Maschine explizit herausarbeiten (dort bewegt sich der Oberkörper gegen fixierte Beine, hier bewegen sich die Beine/Hüfte gegen einen fixierten Oberkörper) — das ist der zentrale biomechanische Unterschied.
- Bei der knienden Beincurl-Maschine bitte den Unterschied zur bereits vorhandenen freien Nordic-Hamstring-Curl-Übung herausarbeiten (die Maschine bietet einstellbaren Widerstand/Unterstützung über den gesamten Bewegungsradius, die freie Variante nutzt nur das eigene Körpergewicht und einen Partner/eine Fixierung der Füße).
- Bei den 4 Functional-Training-Übungen (Kettlebell Swing, Sled Push/Pull, Battle Ropes) bitte auf die spezifischen Verletzungsrisiken eingehen, die bei ballistischen/dynamischen Bewegungen mit Schwung entstehen (anders als bei den übrigen, eher kontrolliert-langsamen Maschinenübungen in der Datenbank).
- Ausgabeformat exakt wie oben (Markdown-Liste mit `####`-Überschrift pro Übung, dieselben vier Bullet-Kategorien) — das lässt sich direkt eins-zu-eins in die App-Datenstruktur übernehmen, ohne Nachbearbeitung.
- Bitte mit Quellenangaben/Fußnoten arbeiten wie im Beispiel, falls das Recherche-Tool das unterstützt.
