# Deep-Research-Prompt: Übungserklärungen für Upper/Lower, Ganzkörper, Bro-Split

Dieser Prompt ist zum Ausführen in einer eigenen Gemini-Deep-Research-Session gedacht (nicht in Claude Code), analog zum ursprünglichen Prompt, aus dem `Uebungsdatenbank.md` (Push/Pull/Legs) entstanden ist. Ergebnis bitte als neue Datei in diesem Ordner ablegen (z.B. `Uebungsdatenbank-UL-FB-BroSplit.md`) und dann Claude Code Bescheid geben, damit der Inhalt in `EXERCISE_INFO` in `index.html` integriert wird.

---

## Prompt (zum Kopieren)

Erstelle einen biomechanisch fundierten Übungskatalog für eine Fitness-App, im selben Stil und Format wie ein bereits bestehender Katalog für einen Push/Pull/Legs-Trainingsplan (Beispiel-Eintrag unten als Formatvorlage).

**Ziel:** Für jede der folgenden 37 Übungen (aus einem Upper/Lower-, einem Ganzkörper- und einem Bro-Split-Trainingsplan) exakt diese vier Angaben liefern:

1. **Zielmuskulatur (primär/sekundär)** — eine primäre und 1-2 sekundäre Muskelgruppen, in normalem Deutsch (nicht lateinische Fachbegriffe wie "Musculus pectoralis" — stattdessen "Großer Brustmuskel" o.ä., damit es in einer Konsumenten-App direkt lesbar ist).
2. **Ausführung** — 3-5 nummerierte Schritte, prägnant, ohne direkte Anrede ("du"/"deine" vermeiden, neutral-professionell formulieren, z.B. "Die Hanteln senkrecht über der Brust halten" statt "Halte die Hanteln...").
3. **Häufigste Fehler** — 2-4 Stichpunkte, die häufigsten Technikfehler bei dieser Übung.
4. **Sicherheitshinweis** — ein Satz mit dem wichtigsten Sicherheitsaspekt (z.B. Gelenkschutz, kontrolliertes Ablegen der Gewichte, Verletzungsvermeidung).

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

**Die 37 Übungen** (nach Bewegungsmuster gruppiert, damit ähnliche Übungen im Kontext recherchiert werden):

*Drücken (Brust/Schulter):*
- Flachbankdrücken mit der Langhantel
- Schrägbankdrücken mit Kurzhanteln
- Fliegende Bewegung mit Kurzhanteln auf der Flachbank
- Fliegende Bewegung am Kabelzug
- Dips am Barren
- Schulterdrücken mit der Langhantel stehend
- Schulterdrücken mit Kurzhanteln

*Ziehen (Rücken):*
- Klimmzüge im Ristgriff
- Klimmzüge im Untergriff
- Rudern am Kabelzug im breiten Parallelgriff
- Rudern am Kabelzug im engen Parallelgriff
- Kurzhantel-Rudern
- Kurzhantel-Rudern auf der Schrägbank
- Langhantelrudern vorgebeugt
- Latzug an der Maschine
- Latzug im engen Untergriff
- Kurzhantel-Überzüge
- Face Pulls am Kabelzug

*Schulter (isoliert):*
- Seitheben am Kabelzug
- Seitheben mit Kurzhanteln

*Arme:*
- Incline Dumbbell Curls
- Preacher Curls an der Maschine
- Preacher Curls am Kabelzug
- Overhead-Trizepsdrücken am Kabelzug mit Seil
- Trizepsdrücken am Kabelzug mit gerader Stange

*Beine (Kniedominant):*
- Kniebeugen mit der Langhantel
- Hackenschmidt-Kniebeuge
- Beinpresse 45 Grad
- Beinstrecker-Maschine
- Ausfallschritte mit Kurzhanteln

*Beine (Hüftdominant/hinten):*
- Rumänisches Kreuzheben mit der Langhantel
- Kreuzheben mit der Langhantel
- Sitzender Beinbeuger

*Waden:*
- Wadenheben stehend an der Maschine
- Wadenheben sitzend an der Maschine

*Rumpf/Core:*
- Cable Crunches
- Beinheben hängend

**Wichtig:**
- Gleiche Übung wie im bestehenden PPL-Katalog (z.B. eine Übung, die dort schon mit Kurzhantel-Variante steht) bitte trotzdem eigenständig für die hier gelistete Variante (oft Langhantel statt Kurzhantel, oder Maschine statt freies Gewicht) recherchieren — Ausführung/Fehler/Sicherheit unterscheiden sich je nach Gerät.
- Ausgabeformat exakt wie oben (Markdown-Liste mit `####`-Überschrift pro Übung, dieselben vier Bullet-Kategorien) — das lässt sich direkt eins-zu-eins in die App-Datenstruktur übernehmen, ohne Nachbearbeitung.
- Bitte mit Quellenangaben/Fußnoten arbeiten wie im Beispiel, falls das Recherche-Tool das unterstützt.
