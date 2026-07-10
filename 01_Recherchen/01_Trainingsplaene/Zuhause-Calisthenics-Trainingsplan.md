# **Wissenschaftlicher Analysebericht: Evidenzbasierte Calisthenics-Trainingsplanung für mobile Fitness-Applikationen**

Die Reintegration von reinem Körpergewichtstraining in das Angebot moderner Fitness-Applikationen erfordert ein tiefgehendes Verständnis biomechanischer und physiologischer Prinzipien. Während das Training mit externen Lasten wie Langhanteln oder Maschinen eine einfache lineare Progression durch Gewichtserhöhung ermöglicht, basiert die Progression im Calisthenics-Bereich primär auf der Manipulation von Hebelverhältnissen, der Veränderung des Bewegungsumfangs (Range of Motion, ROM) sowie der gezielten Anpassung von Stabilisationsanforderungen.  
Wissenschaftliche Untersuchungen bestätigen, dass progressives Körpergewichtstraining bei adäquater Intensität und adäquatem Volumen zu vergleichbaren Hypertrophie- und Kraftzuwächsen führen kann wie das traditionelle Training mit freien Gewichten1. Dieser Bericht analysiert die wissenschaftlichen Grundlagen dieser Progressionsmechanismen, erörtert spezifische anatomische Besonderheiten und stellt einen gebrauchsfertigen, datenbankkompatiblen Vier-Tage-Split (Oberkörper/Unterkörper) vor.

## **Physiologische Grundlagen und Progressionsmechanismen im Körpergewichtstraining**

Um ein effektives Muskelaufbautraining ohne externe Gewichte zu gewährleisten, müssen die drei primären Treiber der Hypertrophie – mechanische Spannung, metabolischer Stress und Muskelschädigung – durch Körpergewichtsübungen evoziert werden1. Die entscheidende Variable ist hierbei die relative Intensität: Ein Liegestütz, der nahe am Muskelversagen ausgeführt wird, erzeugt eine nahezu identische mechanische Spannung auf den M. pectoralis major wie das Bankdrücken mit einer äquivalenten relativen Last1.  
Untersuchungen von Kikuchi et al. (2018) sowie Gentil et al. (2017) zeigten über mehrwöchige Trainingszeiträume hinweg keine signifikanten Unterschiede in der Muskelhypertrophie des Brust- und Trizepsmuskels zwischen progressivem Liegestütztraining und klassischem Bankdrücken1. Auch Schoenfeld et al. (2021) bestätigten, dass Körpergewichtstraining bei angepasstem Volumen und maximaler Anstrengung identische Kraft- und Muskelzuwächse erzielen kann1.  
Die Progression im Calisthenics-Training wird maßgeblich durch das Drehmoment an den beteiligten Gelenken bestimmt. Durch die Veränderung des Körperwinkels zur Gravitationsachse oder die Reduktion von Unterstützungspunkten lässt sich der mechanische Hebelarm gezielt verlängern, was die zu überwindende Last signifikant erhöht1. So trägt der Athlet bei einem Standard-Liegestütz etwa 64% bis 70% seines Körpergewichts7. Durch das Erhöhen der Füße (deklinierte Liegestütze) steigt diese Last auf ca. 75% an8, während bei Pike Push-ups oder Handstand-Push-ups ca. 75% bis 85% des Körpergewichts direkt über die Schultermuskulatur bewegt werden müssen8.

## **Biomechanische Analyse der Bewegungsmuster und Ausrüstungs-Limitationen**

Bei der Erstellung eines hocheffektiven Heimtrainingsplans für fortgeschrittene Athleten müssen die Bewegungsmuster des menschlichen Körpers präzise analysiert werden. Hierbei treten gerätetechnische Limitationen auf, die im wissenschaftlichen Kontext explizit benannt werden müssen, um falschen Erwartungshaltungen vorzubeugen und die Programmierung in der App-Logik sauber aufzubauen.

### **Horizontales und vertikales Ziehen (Rücken- und Bizepstraining)**

Das vertikale Ziehen (Klimmzug-Familie) ist exzellent geeignet, um eine hohe mechanische Spannung auf den M. latissimus dorsi und den M. biceps brachii auszuüben9. Das horizontale Ziehen (Rudern) hingegen ist für die vollständige Aktivierung der Scapula-Retraktoren (mittlerer und unterer Trapezmuskel, Rhomboideen) sowie des hinteren Deltamuskels unerlässlich9.  
An dieser Stelle muss eine signifikante biomechanische Limitation explizit benannt werden: Das horizontale Ziehen ist ohne eine verstellbare Klimmzugstange, Ringe oder einen Schlingentrainer wissenschaftlich klar unterlegen12. Behelfskonstruktionen (wie das Rudern unter einem Küchentisch oder an einer Türkante) schränken den Bewegungsumfang (ROM) drastisch ein, verhindern die vollständige Scapula-Retraktion am Peak der konzentrischen Phase und bergen biomechanische Verletzungsrisiken durch mangelnde Stabilität11. Ohne die Möglichkeit, den Neigungswinkel des Körpers stufenlos anzupassen, ist eine standardisierte, progressive Überlastung beim horizontalen Ziehen unmöglich12. Für eine seriöse App-Umsetzung muss dem Nutzer daher dringend der Erwerb von Turnringen oder eines Schlingentrainers empfohlen werden, um diese funktionelle Lücke zu schließen12.

### **Schultermuskulatur und vertikales Drücken**

Die Aktivierung des M. deltoideus (insbesondere der pars clavicularis und acromialis) erfordert im reinem Körpergewichtstraining eine Umkehrung der Gravitationslast. Pike Push-ups und deren Progressionen (wie Elevated Pike Push-ups oder Handstand-Push-ups) simulieren das vertikale Überkopfdrücken hocheffektiv8.  
Wissenschaftliche Analysen betonen hierbei die Bedeutung der Ausführung in der sogenannten Skapularebene (scapular plane): Die Ellbogen sollten nicht starr nach außen gepresst, sondern in einem Winkel von ca. 20 bis 30 Grad vor dem Oberkörper geführt werden15. Dies maximiert die Kraftübertragung und minimiert das Risiko eines subakromialen Impingement-Syndroms15.

### **Unterkörper-Mechanik: Das bilaterale Defizit und unilaterale Belastung**

Bei Kniebeugen-Varianten tritt ohne Zusatzgewicht schnell das Problem auf, dass die kardiovaskuläre Ausdauer oder die muskuläre Ausdauer zum limitierenden Faktor wird, bevor ein echter Hypertrophiereiz im Muskel gesetzt werden kann. Das bilaterale Defizit beschreibt das Phänomen, dass die einbeinig generierbare Maximalkraft in Summe größer ist als die zweibeinig generierbare Kraft17.  
Pistol Squats (einbeinige Kniebeugen) nutzen diesen Mechanismus optimal aus:

* Die segmentale Lastverteilung zeigt, dass bei einer einbeinigen Kniebeuge ca. 84% des Körpergewichts oberhalb des Hüftgelenks als Last wirken, während es bei der bilateralen Kniebeuge nur ca. 68% sind19.  
* Eine ungewichtete einbeinige Kniebeuge entspricht somit einer Belastungsintensität von weit über 1,0x des eigenen Körpergewichts bei einer klassischen Langhantel-Kniebeuge19.  
* Unilaterale Kniebeugen rekrutieren den M. gluteus medius und die kniestabilisierende Muskulatur signifikant stärker als bilaterale Varianten20.  
* Die axiale Belastung der Wirbelsäule wird minimiert, was das Verletzungsrisiko für den unteren Rücken im Vergleich zu schweren Back Squats drastisch senkt21.

### **Die biomechanische Limitation des Hamstring-Trainings zu Hause**

Eine weitere, wissenschaftlich klar nachweisbare Limitation betrifft die Oberschenkelrückseite (Hamstrings). Neuere klinische Hypertrophiestudien von Maeo et al. (2021, 2024\) belegen eindeutig, dass der sitzende Beinbeuger (Seated Leg Curl) dem liegenden Beinbeuger (Prone Leg Curl) sowie dem Nordic Hamstring Curl bezüglich der reinen Muskelhypertrophie der Hamstrings überlegen ist22. Dies liegt daran, dass die Hamstrings in der Hüftflexion des sitzenden Beinbeugers unter maximaler Vordehnung trainiert werden22.  
Da eine sitzende Knieflexion gegen nennenswerten Widerstand ohne Maschinen im reinen Körpergewichtstraining unmöglich zu realisieren ist, ist das Heimtraining für die Hamstring-Hypertrophie wissenschaftlich klar unterlegen22.  
Um dieses Defizit bestmöglich auszugleichen, kombiniert dieser Trainingsplan den Nordic Hamstring Curl (NHC) mit Sliding Leg Curls:

* Der Nordic Hamstring Curl ist der wissenschaftliche Goldstandard zur Steigerung der exzentrischen Kniebeugerkraft und zur Erhöhung der Faszikellänge, was einen extremen Schutz vor Verletzungen bietet14.  
* Die gleitenden Beinbeuger (Sliding Leg Curls mittels Socken/Handtuch auf glattem Boden) decken das konzentrische Bewegungsmuster ab, wobei die Hüfte aktiv gestreckt gehalten werden muss, um eine konstante mechanische Spannung aufrechtzuerhalten22.

### **Wadentraining: Dehnungsvermittelte Hypertrophie und aktive Insuffizienz**

Das Wadentraining wird in klassischen Heimtrainingsplänen oft vernachlässigt oder fehlerhaft programmiert. Die bahnbrechenden Studien von Kassiano et al. (2023) zeigten, dass das Wadentheben, welches ausschließlich in der maximal gedehnten Position (initial ROM, \-25° bis 0° Dorsalflexion) ausgeführt wird, zu einer signifikant stärkeren Hypertrophie des M. gastrocnemius führt als das Training in der Endkontraktion (+15,2% vs. \+3,4%)26.  
Darüber hinaus belegen Maeo et al. (2023), dass das Wadentheben im Stehen (mit gestrecktem Knie) dem sitzenden Wadentheben (mit gebeugtem Knie) dramatisch überlegen ist29. Da der M. gastrocnemius ein zweigelenkiger Muskel ist, führt die Kniebeugung im Sitzen zu einer aktiven Insuffizienz des Muskels, wodurch die Last fast vollständig auf den M. soleus übertragen wird29. Das stehende, einbeinige Wadenheben auf einer Treppenstufe mit einer bewussten Dehnungspause am tiefsten Punkt stellt somit das wissenschaftliche Optimum für den Muskelaufbau der Waden dar26.

## **Datenstrukturelle Klassifizierung der Bewegungsmuster**

Die folgende Tabelle fasst die biomechanischen Parameter aller im Plan enthaltenen Übungen zusammen und dient der App als Zuordnungsmatrix für die Übungsdatenbank.

| Übungsname | Primäre Zielmuskulatur | Bewegungsmuster | Gym-Äquivalent | Calisthenics-Spezifisch? (Muss neu angelegt werden) | Wissenschaftliche Begründung & Relevanz |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Klimmzüge (Proniert)** | M. latissimus dorsi, M. biceps brachii | Vertikaler Zug | Latzug (eng/breit) | Nein | Peak-Aktivierung des Latissimus in der maximalen Dehnungsphase9. |
| **Klassische Liegestütze** | M. pectoralis major, M. triceps brachii | Horizontaler Druck | Flachbankdrücken | Nein | Äquivalente Hypertrophie- und Kraftreize wie beim Bankdrücken bei hoher Rumpfaktivierung1. |
| **Pike Push-ups** | M. deltoideus (anterior), M. triceps | Vertikaler Druck | Overhead Press (OHP) | Ja | Erzeugt vertikales Druckmuster; nutzt ca. 75-85% des Körpergewichts als Last8. |
| **Invertiertes Rudern** | M. trapezius (mid/lower), Rhomboideen | Horizontaler Zug | Langhantelrudern | Nein | Aktiviert die Scapula-Retraktoren optimal bei minimaler Wirbelsäulenbelastung9. |
| **Pistol Squats** | M. quadriceps femoris, M. gluteus max | Knie-dominant | Langhantel-Kniebeuge | Ja | Nutzt das bilaterale Defizit; Intensität entspricht \>1.0x BW Back Squat17. |
| **Nordic Hamstring Curls** | Hamstrings (insb. Biceps femoris) | Knie-Flexion (exzentrisch) | Beinbeuger-Maschine | Ja | Überlegene exzentrische Kraftentwicklung, Schutz vor Hamstring-Verletzungen23. |
| **Sliding Leg Curls** | Hamstrings, M. gluteus maximus | Knie-Flexion (konzentrisch) | Beinbeuger liegend | Ja | Konzentrischer Beuger-Reiz bei simultaner Hüftstreckung im Heim-Szenario22. |
| **Einbeiniges Wadenheben** | M. gastrocnemius, M. soleus | Plantarflexion | Wadenheben stehend | Nein | Nutzen der dehnungsvermittelten Hypertrophie im Knie-gestreckten Zustand26. |
| **Hängendes Beinheben** | M. rectus abdominis, Hüftbeuger | Core-Flexion | Kabel-Crunch | Nein | Hohe Bauchmuskelaktivierung unter vollständiger Entlastung der Wirbelsäule30. |
| **RKC Plank** | Gesamter Rumpf (Core-Stabilisatoren) | Core-Antiextension | Standard-Plank | Ja | Drastisch erhöhte EMG-Aktivität der Rumpfmuskeln durch maximale Co-Kontraktion30. |

## **Der App-kompatible Trainingsplan (Datenbank-Template)**

Dieses Template ist für die direkte Übertragung in die Datenbank der Fitness-Applikation optimiert. Die Struktur entspricht exakt der Format-Vorlage.  
Plan: Calisthenics Oberkörper/Unterkörper Split (OK/UK) Trainingstage: 4 Kurzbegründung (2-3 Sätze, mit Quellenverweis): Der Oberkörper/Unterkörper-Split ermöglicht eine optimale Reaktivierung der Muskelproteinsynthese durch eine Trainingsfrequenz von zweimal pro Woche pro Muskelgruppe1. Durch die Aufteilung wird die akute neuromuskuläre Ermüdung pro Trainingseinheit minimiert, wodurch lokales Junk-Volumen vermieden und eine konstant hohe Intensität bei allen komplexen Körpergewichtsübungen gewährleistet wird1.  
Tag Oberkörper A (Fokus: Vertikales Ziehen / Horizontales Drücken):

* Klimmzüge im pronierten Griff (Pull-ups) | 4 | 6-10 | Maximiert die mechanische Spannung und Aktivierung des M. latissimus dorsi und M. biceps brachii in der gedehnten Position9 → Progressionsstufe(n): Klimmzüge mit Fuß-Unterstützung durch ein Band/Stuhl (einfacher) / Klimmzüge mit langsamer Negativphase oder L-Sit-Klimmzüge (schwerer)  
* Klassische Liegestütze (Push-ups) | 3 | 10-15 | Liefert eine dem Langhantel-Bankdrücken gleichwertige mechanische Spannung auf den M. pectoralis major und M. triceps brachii1 → Progressionsstufe(n): Liegestütze mit erhöht aufgesetzten Händen (einfacher) / Archer Push-ups oder einarmige Liegestütze (schwerer)  
* Pike Push-ups | 3 | 6-10 | Simuliert das vertikale Überkopfdrücken und rekrutiert den M. deltoideus (anterior) sowie den M. triceps brachii unter hoher Last8 → Progressionsstufe(n): Pike Push-ups mit erhöht abgesetzten Händen (einfacher) / Elevated Pike Push-ups mit erhöhten Füßen (schwerer)  
* Invertiertes Rudern (Inverted Rows) | 3 | 8-12 | Isoliert die Scapula-Retraktoren (M. trapezius, Rhomboideen) und den hinteren Deltamuskel bei minimaler Wirbelsäulenbelastung9 → Progressionsstufe(n): Invertiertes Rudern mit gebeugten Knien (einfacher) / Invertiertes Rudern mit erhöhten Beinen (schwerer)

Tag Unterkörper A (Fokus: Unilaterale Knie-Dominanz / Wade gestreckt):

* Pistol Squats (Einbeinige Kniebeugen) | 3 | 5-8 (pro Seite) | Generiert extrem hohe mechanische Last auf den Quadrizeps und M. gluteus maximus unter Vermeidung axialer Wirbelsäulenkompression17 → Progressionsstufe(n): Unterstützte Pistol Squats mit Festhalten an der Klimmzugstange/Türrahmen (einfacher) / Pistol Squats mit 1,5-Wiederholungen-Methode (schwerer)  
* Nordic Hamstring Curls | 3 | 5-8 | Maximiert die exzentrische Kniebeugerkraft und induziert signifikante Anpassungen der Faszikellänge der Hamstrings14 → Progressionsstufe(n): Nordic Hamstring Curls mit Handunterstützung am Boden (einfacher) / Freie exzentrische Nordic Hamstring Curls mit 5 Sekunden Absenkzeit (schwerer)  
* Einbeiniges Wadenheben im Stehen (auf einer Erhöhung) | 3 | 12-15 | Nutzt die dehnungsvermittelte Hypertrophie des M. gastrocnemius durch bewusste Pause in der maximalen Dehnung26 → Progressionsstufe(n): Beidbeiniges Wadenheben auf flachem Boden (einfacher) / Einbeiniges Wadenheben mit langsamer exzentrischer Phase (schwerer)  
* Hängendes Beinheben (Hanging Leg Raises) | 3 | 8-12 | Liefert eine überlegene Aktivierung des M. rectus abdominis und der Hüftbeuger ohne Druckbelastung der Bandscheiben30 → Progressionsstufe(n): Hängendes Knieheben (einfacher) / Hängendes Beinheben mit gestreckten Beinen bis zur Stange (schwerer)

Tag Oberkörper B (Fokus: Horizontales Ziehen / Vertikales Drücken):

* Klimmzüge im supinierten Griff (Chin-ups) | 4 | 6-10 | Erhöht die mechanische Spannung des M. biceps brachii bei gleichbleibend hoher Latissimus-Rekrutierung9 → Progressionsstufe(n): Exzentrische Chin-ups (einfacher) / Chin-ups mit Zusatzgewicht oder einarmige Klimmzug-Negativen (schwerer)  
* Deklinierte Liegestütze (Füße erhöht) | 3 | 8-12 | Erhöht den Lastanteil des Körpergewichts auf bis zu 75% und verlagert den Fokus auf die claviculären Fasern der Brust1 → Progressionsstufe(n): Klassische Liegestütze (einfacher) / Archer Push-ups (schwerer)  
* Elevated Pike Push-ups (Füße erhöht) | 3 | 6-10 | Steigert die Last auf die Schultern auf bis zu 85% des Körpergewichts und bereitet auf den Handstand-Push-up vor8 → Progressionsstufe(n): Pike Push-ups mit Füßen auf dem Boden (einfacher) / Handstand-Push-ups an der Wand (schwerer)  
* Invertiertes Rudern im breiten Griff | 3 | 10-12 | Erhöht die Rekrutierung des M. trapezius (transversale Fasern) und des hinteren Deltamuskels durch verringerten Hebelarm der Oberarme12 → Progressionsstufe(n): Invertiertes Rudern im engen neutralen Griff (einfacher) / Invertiertes Rudern mit erhöhten Beinen und Zusatzgewicht (schwerer)

Tag Unterkörper B (Fokus: Unilaterale Hüft-Dominanz / Wade gedehnt):

* Bulgarian Split Squats | 3 | 8-12 (pro Seite) | Bietet eine hochstabile unilaterale Überlastung des Quadrizeps und Gluteus maximus bei gleichzeitigem Stretch des kontralateralen Hüftbeugers18 → Progressionsstufe(n): Klassische Ausfallschritte (einfacher) / Bulgarian Split Squats mit 3 Sekunden exzentrischer Phase (schwerer)  
* Gleitende Beincurls (Sliding Leg Curls) | 3 | 8-12 | Simuliert die Knieflexion des Beinbeugers in Hüftstreckung unter konstanter mechanischer Spannung22 → Progressionsstufe(n): Gleitende Beincurls rein exzentrisch (einfacher) / Einbeinige gleitende Beincurls (schwerer)  
* Einbeiniges Wadenheben mit Dehnungs-Pause | 3 | 10-12 | Spezifisches Training im voll gedehnten Muskelbereich zur gezielten Auslösung dehnungsinduzierter Anpassungen26 → Progressionsstufe(n): Beidbeiniges Wadenheben mit Dehnungs-Pause (einfacher) / Einbeiniges Wadenheben mit zusätzlichem Rucksack-Gewicht (schwerer)  
* RKC Plank | 3 | 15-30 Sek. | Maximale Ganzkörperspannung durch bewusste, explosive Kontraktion aller großen Muskelketten30 → Progressionsstufe(n): Standard-Unterarmstütz (einfacher) / RKC Plank mit weit nach hinten versetzten Ellbogen (schwerer)

## **Systematische Integration und algorithmische Progressionslogik**

Für die Implementierung in einer Fitness-Applikation reicht es nicht aus, Übungsnamen statisch anzuzeigen. Die App muss die Progression ohne Gewichte dynamisch steuern, um den Nutzer im optimalen Intensitätsbereich zu halten1.

### **Der automatische Progressions-Algorithmus**

Die App sollte die erbrachten Leistungen der Nutzer analysieren und basierend auf den Wiederholungszielen der aktuellen Übung automatische Empfehlungen ausgeben.

1. **Wiederholungsziel übertroffen (Upgrade-Trigger)**: Erreicht ein Nutzer im letzten Arbeitssatz einer Übung die obere Grenze des Zielwiederholungsbereichs (z. B. 15 saubere Wiederholungen bei klassischen Liegestützen) mit einer subjektiven Belastung (RPE – Rate of Perceived Exertion) von unter 9, empfiehlt der Algorithmus für das nächste Training die schwerere Progressionsstufe (z. B. Archer Push-ups)1.  
2. **Wiederholungsziel unterschritten (Downgrade-Trigger)**: Fällt ein Nutzer bei einer hochkomplexen Übung (z. B. Pistol Squats) unter die Mindestwiederholungszahl (z. B. weniger als 5 Wiederholungen pro Satz) oder bricht die saubere Form ein, schlägt die App automatisch die einfachere Progressionsstufe (z. B. unterstützte Pistol Squats am Türrahmen) vor21.  
3. **Konstante TUT-Regelung (Tempo-Kontrolle)**: Um Schummeln durch Schwungbewegung zu verhindern, sollte die App einen integrierten akustischen oder visuellen Taktgeber (Metronom-Prinzip) anbieten. Für Hypertrophie-Zwecke empfiehlt sich ein Standard-Tempo von 3-0-1-0 (3 Sekunden exzentrische Phase, keine Pause im gedehnten Zustand, 1 Sekunde explosive konzentrische Phase, keine Pause im verkürzten Zustand)13.

Durch diese automatisierte Feedbackschleife simuliert die App die präzise Belastungssteuerung eines persönlichen Trainers im Kraftraum und garantiert trotz des Verzichts auf Hantelscheiben eine kontinuierliche und verletzungsfreie Leistungssteigerung1.  
*Dies dient nur zu Informationszwecken. Für eine medizinische Beratung oder Diagnose wenden Sie sich an einen Fachmann.*

#### **Referenzen**

1. Calisthenics: Build Strength & Real Fitness With Your Own Body | DR T S DIDWAL, [https://drdidwal.com/calisthenics-build-strength-and-real-fitness-with-your-own-body](https://drdidwal.com/calisthenics-build-strength-and-real-fitness-with-your-own-body)  
2. Effect of Progressive Calisthenic Push-Up Training On Muscle Strength and Thickness, [https://www.researchgate.net/publication/321297726\_Effect\_of\_Progressive\_Calisthenic\_Push-Up\_Training\_On\_Muscle\_Strength\_and\_Thickness](https://www.researchgate.net/publication/321297726_Effect_of_Progressive_Calisthenic_Push-Up_Training_On_Muscle_Strength_and_Thickness)  
3. Effect of Progressive Calisthenic Push-up Training on Muscle Strength and Thickness, [https://pubmed.ncbi.nlm.nih.gov/29466268/](https://pubmed.ncbi.nlm.nih.gov/29466268/)  
4. Calisthenics Vs Weights: Which Builds More Muscle? \- Bony to Beastly, [https://bonytobeastly.com/calisthenics-vs-weights-for-building-muscle/](https://bonytobeastly.com/calisthenics-vs-weights-for-building-muscle/)  
5. Effect of Progressive Calisthenic Push-up Training on Muscle Strength and Thickness. \- SciSpace, [https://scispace.com/pdf/effect-of-progressive-calisthenic-push-up-training-on-muscle-2r2p4djl97.pdf](https://scispace.com/pdf/effect-of-progressive-calisthenic-push-up-training-on-muscle-2r2p4djl97.pdf)  
6. Does Calisthenics Build Muscle? Here's What You Need To Know \- Endomondo, [https://www.endomondo.com/training/does-calisthenics-build-muscle](https://www.endomondo.com/training/does-calisthenics-build-muscle)  
7. How to Do the Push-up: Form, Variations, and Workouts \- Legion Athletics, [https://legionathletics.com/push-up/](https://legionathletics.com/push-up/)  
8. Top 5 Compound Exercises that Use the Most Bodyweight \- JEFIT, [https://www.jefit.com/blog/top-5-compound-exercises-that-use-the-most-bodyweight](https://www.jefit.com/blog/top-5-compound-exercises-that-use-the-most-bodyweight)  
9. Electromyographic analysis of the back muscles during various back exercises, [https://minds.wisc.edu/items/76a74fe2-531c-40aa-a626-45e6fe1581ed](https://minds.wisc.edu/items/76a74fe2-531c-40aa-a626-45e6fe1581ed)  
10. The Pull-Up vs. Inverted Row Debate Is a Trap. Here's What Actually Works. \- bullbar, [https://bullbarfit.com/en-eu/blogs/updates/the-pull-up-vs-inverted-row-debate-is-a-trap-here-s-what-actually-works](https://bullbarfit.com/en-eu/blogs/updates/the-pull-up-vs-inverted-row-debate-is-a-trap-here-s-what-actually-works)  
11. The Pull-Up vs. Inverted Row Debate Is a Trap. Here's What Actually Works. \- bullbar, [https://bullbarfit.com/blogs/updates/the-pull-up-vs-inverted-row-debate-is-a-trap-here-s-what-actually-works](https://bullbarfit.com/blogs/updates/the-pull-up-vs-inverted-row-debate-is-a-trap-here-s-what-actually-works)  
12. Effects of hand-grip during the inverted row with and without a suspension device: An electromyographical investigation \- Scholars Research Library, [https://www.scholarsresearchlibrary.com/articles/effects-of-handgrip-during-the-inverted-row-with-and-without-a-suspension-device-an-electromyographical-investigation.pdf](https://www.scholarsresearchlibrary.com/articles/effects-of-handgrip-during-the-inverted-row-with-and-without-a-suspension-device-an-electromyographical-investigation.pdf)  
13. Effects of hand-grip during the inverted row with and without a suspension device: An electromyographical investigation \- ResearchGate, [https://www.researchgate.net/publication/272092763\_Effects\_of\_hand-grip\_during\_the\_inverted\_row\_with\_and\_without\_a\_suspension\_device\_An\_electromyographical\_investigation](https://www.researchgate.net/publication/272092763_Effects_of_hand-grip_during_the_inverted_row_with_and_without_a_suspension_device_An_electromyographical_investigation)  
14. Leg Curl: Technique, Variations and Benefits \- Nordic Performance Training, [https://www.nordicperformancetraining.com/blog/leg-curl](https://www.nordicperformancetraining.com/blog/leg-curl)  
15. Best Shoulder Compound Exercises in 2023 | Built With Science, [https://builtwithscience.com/fitness-tips/shoulder-compound-exercises/](https://builtwithscience.com/fitness-tips/shoulder-compound-exercises/)  
16. Shoulder Workouts: Build Strong, Sculpted Delts \- BodySpec, [https://www.bodyspec.com/blog/post/shoulder\_workouts\_build\_strong\_sculpted\_delts](https://www.bodyspec.com/blog/post/shoulder_workouts_build_strong_sculpted_delts)  
17. A general comparison of pistols to barbell squats : r/bodyweightfitness \- Reddit, [https://www.reddit.com/r/bodyweightfitness/comments/28mwy9/a\_general\_comparison\_of\_pistols\_to\_barbell\_squats/](https://www.reddit.com/r/bodyweightfitness/comments/28mwy9/a_general_comparison_of_pistols_to_barbell_squats/)  
18. COMPARISON OF BILATERAL AND UNILATERAL SQUAT EXERCISES ON BARBELL KINEMATICS AND MUSCLE ACTIVATION \- PMC, [https://pmc.ncbi.nlm.nih.gov/articles/PMC6159498/](https://pmc.ncbi.nlm.nih.gov/articles/PMC6159498/)  
19. Tip: The Single-Leg Squat That Actually Works \- t nation, [https://archive.t-nation.com/training/tip-the-single-leg-squat-that-actually-works/](https://archive.t-nation.com/training/tip-the-single-leg-squat-that-actually-works/)  
20. Comparison of Lower Extremity EMG Between the 2-Leg Squat and Modified Single-Leg Squat in Female Athletes \- ResearchGate, [https://www.researchgate.net/publication/41969369\_Comparison\_of\_Lower\_Extremity\_EMG\_Between\_the\_2-Leg\_Squat\_and\_Modified\_Single-Leg\_Squat\_in\_Female\_Athletes](https://www.researchgate.net/publication/41969369_Comparison_of_Lower_Extremity_EMG_Between_the_2-Leg_Squat_and_Modified_Single-Leg_Squat_in_Female_Athletes)  
21. Benefits of Pistol Squats | AFA Asia Blog, [https://fitnesseducation.asia/personal-training/benefits-of-pistol-squats/](https://fitnesseducation.asia/personal-training/benefits-of-pistol-squats/)  
22. How To Grow Your Hamstrings \- E3 Rehab, [https://e3rehab.com/how-to-grow-your-hamstrings/](https://e3rehab.com/how-to-grow-your-hamstrings/)  
23. Lying Leg Curls: Video Technique, Benefits, Tips & Variations | Myprotein UK, [https://www.myprotein.com/thezone/training/lying-leg-curl-exercise-form-common-mistakes/](https://www.myprotein.com/thezone/training/lying-leg-curl-exercise-form-common-mistakes/)  
24. 10 Best Hamstring Exercises (2026) \- LoadMuscle, [https://loadmuscle.com/blog/best-hamstring-exercises](https://loadmuscle.com/blog/best-hamstring-exercises)  
25. 10+ Best Leg Curl Alternatives for Stronger Hamstrings at Home or Gym \- RitFit, [https://www.ritfitsports.com/blogs/article/leg-curl-alternatives-exercises-for-stronger-hamstrings](https://www.ritfitsports.com/blogs/article/leg-curl-alternatives-exercises-for-stronger-hamstrings)  
26. Stretch-Mediated Hypertrophy: Why Length Wins | FitCraft, [https://getfitcraft.com/science/stretch-mediated-hypertrophy](https://getfitcraft.com/science/stretch-mediated-hypertrophy)  
27. (PDF) Greater Gastrocnemius Muscle Hypertrophy After Partial Range of Motion Training Performed at Long Muscle Lengths \- ResearchGate, [https://www.researchgate.net/publication/365127382\_Greater\_gastrocnemius\_muscle\_hypertrophy\_after\_partial\_range\_of\_motion\_training\_performed\_at\_long\_muscle\_lengths](https://www.researchgate.net/publication/365127382_Greater_gastrocnemius_muscle_hypertrophy_after_partial_range_of_motion_training_performed_at_long_muscle_lengths)  
28. Greater Gastrocnemius Muscle Hypertrophy After Partial Range of Motion Training Performed at Long Muscle Lengths \- PubMed, [https://pubmed.ncbi.nlm.nih.gov/37015016/](https://pubmed.ncbi.nlm.nih.gov/37015016/)  
29. Triceps surae muscle hypertrophy is greater after standing versus seated calf-raise training, [https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2023.1272106/full](https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2023.1272106/full)  
30. 3 Core Exercises to Replace Sit Ups in Your Training | BOXROX, [https://www.boxrox.com/3-core-exercises-to-replace-sit-ups-in-your-training/](https://www.boxrox.com/3-core-exercises-to-replace-sit-ups-in-your-training/)  
31. Electromyographic analysis of abdominal muscle activation during side bridge variations: effects of hip angle and breathing pattern \- Human Movement, [https://hummov.awf.wroc.pl/Electromyographic-analysis-of-abdominal-muscle-activation-during-side-bridge-variations,207654,0,2.html](https://hummov.awf.wroc.pl/Electromyographic-analysis-of-abdominal-muscle-activation-during-side-bridge-variations,207654,0,2.html)  
32. Bigger Calves from Doing Higher Resistance Training Volume?, [https://www.thieme-connect.com/products/ejournals/html/10.1055/a-2316-7885?device=desktop\&innerWidth=412\&offsetWidth=412](https://www.thieme-connect.com/products/ejournals/html/10.1055/a-2316-7885?device=desktop&innerWidth=412&offsetWidth=412)  
33. Bigger Calves from Doing Higher Resistance Training Volume? \- Thieme E-Books & E-Journals \-, [https://www.thieme-connect.com/products/ejournals/abstract/10.1055/a-2316-7885](https://www.thieme-connect.com/products/ejournals/abstract/10.1055/a-2316-7885)  
34. What Muscles Do Push Ups Work & Variations \- Sport Science Insider, [https://sportscienceinsider.com/what-muscles-do-push-ups-work/](https://sportscienceinsider.com/what-muscles-do-push-ups-work/)  
35. A Comparison of Muscle Activation during the Pull-up and Three Alternative Pulling Exercises \- Juniper Publishers, [https://juniperpublishers.com/jpfmts/pdf/JPFMTS.MS.ID.555669.pdf](https://juniperpublishers.com/jpfmts/pdf/JPFMTS.MS.ID.555669.pdf)  
36. Comparison of the electromyographic activity of the muscles involved in low pulley horizontal rowing with different grips and bi \- Dialnet, [https://dialnet.unirioja.es/descarga/articulo/9760834.pdf](https://dialnet.unirioja.es/descarga/articulo/9760834.pdf)  
37. How accurate is this calculation on the load a single leg receives when squatting/pistol squatting? : r/bodyweightfitness \- Reddit, [https://www.reddit.com/r/bodyweightfitness/comments/1gbdjsy/how\_accurate\_is\_this\_calculation\_on\_the\_load\_a/](https://www.reddit.com/r/bodyweightfitness/comments/1gbdjsy/how_accurate_is_this_calculation_on_the_load_a/)