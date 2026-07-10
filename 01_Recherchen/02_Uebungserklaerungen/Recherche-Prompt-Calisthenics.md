# Deep-Research-Prompt: Übungserklärungen für den Zuhause/Calisthenics-Plan

Dieser Prompt ist zum Ausführen in einer eigenen Gemini-Deep-Research-Session gedacht (nicht in Claude Code), analog zu den vorherigen Prompts, aus denen `Uebungsdatenbank.md` und `Uebungsdatenbank-UL-FB-BroSplit.md` entstanden sind. Ergebnis bitte als neue Datei in diesem Ordner ablegen (z.B. `Uebungsdatenbank-Calisthenics.md`) und dann Claude Code Bescheid geben, damit der Inhalt in `exercise-library.json` integriert wird.

**Hinweis:** Von den 16 Übungen des Calisthenics-Plans haben 3 bereits einen Eintrag in der bestehenden Datenbank (beide Klimmzug-Varianten sowie "Hängendes Beinheben", geteilt mit anderen Plänen) — diese sind unten bewusst **nicht** noch einmal aufgeführt, um Doppelarbeit zu vermeiden.

---

## Prompt (zum Kopieren)

Erstelle einen biomechanisch fundierten Übungskatalog für eine Fitness-App, im selben Stil und Format wie ein bereits bestehender Katalog (Beispiel-Eintrag unten als Formatvorlage).

**Ziel:** Für jede der folgenden 13 Übungen (aus einem reinen Körpergewichts-/Calisthenics-Trainingsplan für zu Hause, nur eine Klimmzugstange als Equipment vorausgesetzt) exakt diese vier Angaben liefern:

1. **Zielmuskulatur (primär/sekundär)** — eine primäre und 1-2 sekundäre Muskelgruppen, in normalem Deutsch (nicht lateinische Fachbegriffe wie "Musculus pectoralis" — stattdessen "Großer Brustmuskel" o.ä., damit es in einer Konsumenten-App direkt lesbar ist).
2. **Ausführung** — 3-5 nummerierte Schritte, prägnant, ohne direkte Anrede ("du"/"deine" vermeiden, neutral-professionell formulieren, z.B. "Den Körper in einer geraden Linie halten" statt "Halte deinen Körper gerade").
3. **Häufigste Fehler** — 2-4 Stichpunkte, die häufigsten Technikfehler bei dieser Übung.
4. **Sicherheitshinweis** — ein Satz mit dem wichtigsten Sicherheitsaspekt (z.B. Gelenkschutz, Sturzvermeidung, kontrollierte Ausführung ohne Schwung).

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

**Die 13 Übungen** (nach Bewegungsmuster gruppiert, damit ähnliche Übungen im Kontext recherchiert werden):

*Drücken (Oberkörper, Liegestütz-Familie):*
- Klassische Liegestütze (Push-ups)
- Deklinierte Liegestütze (Füße erhöht)
- Pike Push-ups
- Elevated Pike Push-ups (Füße erhöht)

*Ziehen (Oberkörper, horizontal, ohne Zuggerät):*
- Invertiertes Rudern (Inverted Rows)
- Invertiertes Rudern im breiten Griff

*Beine (einbeinig, knie-dominant):*
- Pistol Squats (Einbeinige Kniebeugen)
- Bulgarian Split Squats

*Beine (hüft-/hinten-dominant):*
- Nordic Hamstring Curls
- Gleitende Beincurls (Sliding Leg Curls)

*Waden:*
- Einbeiniges Wadenheben im Stehen (auf einer Erhöhung)
- Einbeiniges Wadenheben mit Dehnungs-Pause

*Rumpf/Core:*
- RKC Plank

**Wichtig:**
- Alle Übungen sind reine Körpergewichtsübungen (keine Zusatzgeräte außer ggf. einer Erhöhung/einem Türrahmen/einer Klimmzugstange) — Ausführung und Sicherheitshinweise sollen das berücksichtigen (z.B. Balance, Sturzvermeidung bei einbeinigen Übungen, statt Hinweise zu Gewichtsscheiben o.ä.).
- Bei den beiden Wadenheben-Varianten und den beiden Pike-Push-up-Varianten bitte trotz Ähnlichkeit jeweils eigenständig recherchieren — die erhöhte/dekliniert Variante unterscheidet sich in Ausführung und Fehlerquellen von der Grundversion.
- Ausgabeformat exakt wie oben (Markdown-Liste mit `####`-Überschrift pro Übung, dieselben vier Bullet-Kategorien) — das lässt sich direkt eins-zu-eins in die App-Datenstruktur übernehmen, ohne Nachbearbeitung.
- Bitte mit Quellenangaben/Fußnoten arbeiten wie im Beispiel, falls das Recherche-Tool das unterstützt.
