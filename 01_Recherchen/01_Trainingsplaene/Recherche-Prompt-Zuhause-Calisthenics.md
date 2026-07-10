# Deep-Research-Prompt: Zuhause/Calisthenics-Trainingsplan

Dieser Prompt ist zum Ausführen in einer eigenen Gemini-Deep-Research-Session gedacht (nicht in Claude Code), analog zu den bisherigen Recherchen. Ergebnis bitte als neue Datei in diesem Ordner ablegen (z.B. `Zuhause-Calisthenics-Trainingsplan.md`) und dann Claude Code Bescheid geben, damit der Inhalt als fünfter Plan (`PLANS`) in `index.html` integriert wird — genau wie PPL/Upper-Lower/Ganzkörper/Bro-Split zuvor.

Für Übungen, die noch nicht in der bestehenden Übungsdatenbank (`exercise-library.json`, 78 Einträge) stehen, ist ggf. ein zweiter, kleinerer Recherche-Durchgang nach demselben Muster wie `02_Uebungserklaerungen/Recherche-Prompt-UL-FB-BroSplit.md` nötig — das ist bewusst NICHT Teil dieses Prompts, sondern ein separater Folgeschritt.

---

## Prompt (zum Kopieren)

Erstelle einen wissenschaftlich fundierten Zuhause-/Calisthenics-Trainingsplan für eine Fitness-App, im selben Stil und Format wie ein bereits bestehender Katalog für Push/Pull/Legs, Upper/Lower, Ganzkörper und Bro-Split (Beispiel-Eintrag unten als Formatvorlage).

**Rahmenbedingungen:**
- **Ausrüstung**: reines Körpergewichtstraining, aber eine Klimmzugstange darf als vorhanden vorausgesetzt werden (Standard-Annahme in praktisch jeder seriösen Calisthenics-Literatur, da ohne sie kein wirksames Rückentraining möglich ist). Keine weitere Ausrüstung (keine Kurzhanteln, Bänder, Ringe) — falls eine bestimmte Übung ohne Zusatzgerät wissenschaftlich klar unterlegen wäre, das explizit benennen statt sie stillschweigend wegzulassen.
- **Zielgruppe**: Personen mit Trainingserfahrung (kein reines Anfängerprogramm), die zeitweise oder dauerhaft ohne Gym trainieren wollen (z.B. Reisen, Homeoffice, kein Gym in der Nähe).
- **Frequenz**: bitte einen Split vorschlagen, der mit 3-4 Trainingstagen/Woche auskommt (Ganzkörper- oder Oberkörper/Unterkörper-Struktur — was auch immer laut den etablierten Volumen-/Frequenz-Richtwerten für reines Körpergewichtstraining am sinnvollsten ist).
- **Progression ohne Zusatzgewicht**: das ist der zentrale Unterschied zu den bisherigen Gym-Plänen — dort steigert man das Gewicht, hier nicht. Bitte für jede Übung 1-2 **Progressionsstufen** nennen (z.B. "Liegestütze" → "Archer Push-ups" → "Einarmige Liegestütze", oder "Klimmzüge" → "Klimmzüge mit Zusatzgewicht/langsamer Negativphase"), damit die App diese später als Alternativ-Übungen anbieten kann, wenn die Zielwiederholungszahl am oberen Ende erreicht ist.

**Ziel:** Für jeden Trainingstag eine Liste von Übungen mit **Name | Sätze | Zielwiederholungsbereich | Kurzbegründung (mit Quellenverweis)**, exakt im Format der bestehenden Trainingspläne.

**Format-Vorlage (Beispiel aus dem bestehenden Katalog, Push/Pull/Legs):**

```
Plan: Push/Pull/Legs (PPL)
Trainingstage: 6
Kurzbegründung (2-3 Sätze, mit Quellenverweis): Der PPL-Split verteilt ein hohes wöchentliches Trainingsvolumen auf sechs Einheiten pro Woche, wodurch die akute Ermüdung pro Trainingseinheit gering gehalten und lokales Junk-Volumen vermieden wird[6]. Jede Muskelgruppe wird exakt zweimal pro Woche trainiert, was den optimalen Frequenzbereich für fortgeschrittene Athleten abdeckt[3].

Tag Push A (Brust, Schultern, Trizeps):
- Flachbankdrücken mit der Langhantel | 3 | 6-8 | Hohe mechanische Spannung in gedehnter Position[1]
- Schrägbankdrücken mit Kurzhanteln | 3 | 8-10 | Erhöhter Bewegungsradius für die claviculären Fasern[19]
```

**Zusätzlich pro Übung** (neu gegenüber der bisherigen Vorlage, wegen der fehlenden Gewichtsprogression):
```
  → Progressionsstufe(n): Liegestütze auf den Knien (einfacher) / Archer Push-ups (schwerer)
```

**Erwartete Tagesstruktur** (Beispiel, bitte an die tatsächlich empfohlene Split-Form anpassen):
- Falls Ganzkörper (3x/Woche): 3 Tage, je Oberkörper-Druck/-Zug + Beine + Rumpf abgedeckt.
- Falls Oberkörper/Unterkörper (4x/Woche): 2x Oberkörper + 2x Unterkörper, analog zum bestehenden Upper/Lower-Plan.

**Abzudeckende Bewegungsmuster** (damit alle Hauptmuskelgruppen wie in den bestehenden Plänen erfasst sind):
- Horizontales Drücken (Liegestütze-Familie)
- Vertikales/horizontales Ziehen (Klimmzüge, Rudern-Varianten mit Körpergewicht)
- Beine (Kniedominant: Kniebeugen-Varianten; Hüftdominant: einbeinige Hüftheben/Nordic Curls o.ä.)
- Schultern (Pike Push-ups o.ä.)
- Rumpf/Core
- Waden (einbeiniges Wadenheben)

**Wichtig:**
- Ausgabeformat exakt wie oben (Klartext-Block pro Plan/Tag mit `Name | Sätze | Wiederholungen | Kurzbegründung`-Zeilen pro Übung, plus der neuen Progressionsstufen-Zeile) — das lässt sich direkt in die App-Datenstruktur übernehmen, ohne Nachbearbeitung.
- Bitte mit Quellenangaben/Fußnoten arbeiten wie im Beispiel, falls das Recherche-Tool das unterstützt.
- Bitte klar kennzeichnen, welche der genannten Übungen wahrscheinlich noch nicht in einer typischen Gym-Übungsdatenbank stehen (also calisthenics-spezifisch sind, z.B. Archer Push-ups, Pistol Squats) — diese brauchen später eine eigene Übungserklärungs-Recherche.
