# Deep-Research-Prompt: Übungserklärungen für klassische Gym-Maschinen

Dieser Prompt ist zum Ausführen in einer eigenen Gemini-Deep-Research-Session gedacht (nicht in Claude Code), analog zu den vorherigen Prompts, aus denen `Uebungsdatenbank.md`, `Uebungsdatenbank-UL-FB-BroSplit.md` und `Biomechanischer Übungskatalog Calisthenics.md` entstanden sind. Ergebnis bitte als neue Datei in diesem Ordner ablegen (z.B. `Uebungsdatenbank-Maschinen.md`) und dann Claude Code Bescheid geben, damit der Inhalt in `exercise-library.json` integriert wird.

**Hintergrund:** Die bestehende Datenbank (113 Einträge) deckt Maschinen/Kabelzug bereits zu rund 28% ab (Beinpresse, Latzug, Butterfly, Beinstrecker/-beuger, Kabelrudern, Trizeps-Pushdown u.a. sind schon drin). Unten aufgeführt sind bewusst nur die **10 klassischen Gym-Maschinen, die noch fehlen** — bewusst herstellerneutral (nicht "Technogym", "Hammer Strength" o.ä.), da die Bewegung überall gleich ist und Gyms unterschiedliche Marken einsetzen.

---

## Prompt (zum Kopieren)

Erstelle einen biomechanisch fundierten Übungskatalog für eine Fitness-App, im selben Stil und Format wie ein bereits bestehender Katalog (Beispiel-Eintrag unten als Formatvorlage).

**Ziel:** Für jede der folgenden 10 Übungen (klassische, pin-loaded bzw. geführte Kraftgeräte, wie sie in praktisch jedem Fitnessstudio stehen, herstellerunabhängig) exakt diese vier Angaben liefern:

1. **Zielmuskulatur (primär/sekundär)** — eine primäre und 1-2 sekundäre Muskelgruppen, in normalem Deutsch (nicht lateinische Fachbegriffe wie "Musculus pectoralis" — stattdessen "Großer Brustmuskel" o.ä., damit es in einer Konsumenten-App direkt lesbar ist).
2. **Ausführung** — 3-5 nummerierte Schritte, prägnant, ohne direkte Anrede ("du"/"deine" vermeiden, neutral-professionell formulieren, z.B. "Den Rücken während der gesamten Bewegung an der Rückenlehne halten" statt "Halte deinen Rücken an der Lehne").
3. **Häufigste Fehler** — 2-4 Stichpunkte, die häufigsten Technikfehler bei dieser Übung.
4. **Sicherheitshinweis** — ein Satz mit dem wichtigsten Sicherheitsaspekt (z.B. Gelenkschutz, korrekte Sitz-/Pin-Einstellung, kontrollierte Ausführung ohne Schwung).

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

**Die 10 Übungen** (nach Bewegungsmuster gruppiert, damit ähnliche Übungen im Kontext recherchiert werden):

*Hüfte/Bein (isoliert):*
- Adduktorenmaschine (Hip Adduction Machine)
- Abduktorenmaschine (Hip Abduction Machine)

*Rücken (gezogen, geführt):*
- Rudermaschine sitzend (pin-loaded, brustgestützt — nicht Kabelzug)
- Rückenstrecker-Maschine (geführte/belastete Hyperextension, nicht die freie Körpergewichts-Variante)

*Schulter/Arme (isoliert, geführt):*
- Schulterpresse-Maschine (sitzend, pin-loaded)
- Bizeps-Curl-Maschine (sitzend, pin-loaded, Standardversion — nicht Preacher-Curl-Bank)
- Trizeps-Maschine (pin-loaded Trizeps-Extension bzw. Dip-Maschine, sitzend)

*Assistenz:*
- Assistierte Klimmzug-/Dip-Maschine (Gegengewicht reduziert das Körpergewicht)

*Smith-Machine (geführte Langhantel in vertikaler Schiene):*
- Kniebeuge in der Smith-Machine
- Bankdrücken in der Smith-Machine

**Wichtig:**
- Bewusst herstellerneutral formulieren — keine Markennamen (weder im Übungsnamen noch in Ausführung/Sicherheitshinweis), da Ausführung/Muskulatur/Fehlerquellen geräteübergreifend identisch sind und Nutzer unterschiedliche Gym-Ketten mit unterschiedlichen Herstellern besuchen.
- Bei den beiden Smith-Machine-Übungen bitte den zentralen Unterschied zur freien Langhantel-Variante herausarbeiten (geführte Bahn erlaubt reduzierte Stabilisierung, dafür andere Verletzungsrisiken z.B. bei fixierter Bewegungsbahn) — das unterscheidet Ausführung/Sicherheitshinweis spürbar von den bereits vorhandenen freien Varianten ("Kniebeugen mit der Langhantel", "Flachbankdrücken mit der Langhantel").
- Bei der Rudermaschine sitzend bitte explizit von "Kabelrudern eng, sitzend" (bereits in der Datenbank) abgrenzen — hier geht es um eine brustgestützte, pin-loaded Maschine mit fixierter Zugbahn, nicht um freies Kabelrudern.
- Ausgabeformat exakt wie oben (Markdown-Liste mit `####`-Überschrift pro Übung, dieselben vier Bullet-Kategorien) — das lässt sich direkt eins-zu-eins in die App-Datenstruktur übernehmen, ohne Nachbearbeitung.
- Bitte mit Quellenangaben/Fußnoten arbeiten wie im Beispiel, falls das Recherche-Tool das unterstützt.
