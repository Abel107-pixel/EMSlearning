/* EMS Learning 3.0 — Lerninhalte
   Hier werden neue Wörter, Lektionen und Quizfragen ergänzt.
   Struktur ist bewusst einfach gehalten, damit später leicht erweitert werden kann. */
(() => {
"use strict";

const deutsch = {
  title: "Deutsch · Wortarten",
  intro: "Die zehn Wortarten erkennen und unterscheiden.",
  lessons: [
    ["Nomen", "Nomen werden großgeschrieben. Sie bezeichnen Menschen, Tiere, Dinge oder abstrakte Begriffe. Beispiele: der Vater, die Schule, das Buch, die Liebe."],
    ["Verben", "Verben beschreiben Tätigkeiten oder Zustände. Stammformen: Infinitiv – Präteritum – Partizip II, z. B. essen – aß – gegessen."],
    ["Adjektive", "Adjektive beschreiben Eigenschaften und lassen sich oft steigern: groß – größer – am größten. Unregelmäßig: gut – besser – am besten."],
    ["Artikel", "Bestimmte Artikel: der, die, das. Unbestimmte Artikel: ein, eine. Artikel zeigen Genus, Numerus und Kasus."],
    ["Pronomen", "Pronomen ersetzen oder begleiten Nomen: ich, du, er, mein, dieser, jemand, sich."],
    ["Numeralien", "Zahlwörter: Grundzahlen (zwei), Ordnungszahlen (der dritte), Wiederholungszahlen (dreimal)."],
    ["Konjunktionen", "Bindewörter verbinden Wörter oder Sätze: und, aber, oder, weil, dass. Im Nebensatz steht das Verb oft am Ende."],
    ["Präpositionen", "Präpositionen bestimmen häufig einen Fall: mit + Dativ, für + Akkusativ, wegen + Genitiv. Wechselpräpositionen: in, an, auf …"],
    ["Adverbien", "Adverbien geben Umstände an: hier (lokal), heute (temporal), gern (modal), deshalb (kausal)."],
    ["Interjektionen", "Ausrufewörter drücken Gefühle oder Reaktionen aus: Hurra!, Au!, Pfui!, Hallo!"]
  ],
  quiz: [
    ["Welche Wortart wird immer großgeschrieben?", ["Nomen", "Verb", "Adjektiv", "Adverb"], 0, "Nomen werden großgeschrieben.", "easy"],
    ["Welche drei Formen sind Stammformen?", ["Infinitiv, Präteritum, Partizip II", "Präsens, Perfekt, Futur", "Singular, Plural, Kasus"], 0, "Beispiel: essen – aß – gegessen.", "medium"],
    ["Wie lautet die Steigerung von gut?", ["gut – guter – am gutesten", "gut – besser – am besten", "gut – am besten – besser"], 1, "gut – besser – am besten.", "easy"],
    ["Welche Präposition verlangt den Dativ?", ["für", "ohne", "mit", "gegen"], 2, "mit + Dativ: mit dem Bus.", "medium"],
    ["Welche Konjunktion leitet einen Nebensatz ein?", ["und", "weil", "oder", "aber"], 1, "weil leitet einen Nebensatz ein; das Verb steht am Ende.", "medium"],
    ["Was ersetzt oder begleitet ein Nomen?", ["Adverb", "Pronomen", "Präposition", "Interjektion"], 1, "Pronomen ersetzen oder begleiten Nomen: ich, mein, dieser.", "easy"],
    ["Welches Wort ist eine Interjektion?", ["Hurra!", "schnell", "unter", "weil"], 0, "Interjektionen drücken Gefühle aus: Hurra!, Au!, Pfui!", "easy"],
    ["Welches ist ein Beispiel für eine Ordnungszahl?", ["zwei", "der dritte", "dreimal", "wenige"], 1, "Ordnungszahlen: der dritte, der zehnte …", "hard"]
  ]
};

/* Irregular verbs — Liste kann jederzeit erweitert werden (einfach neue Zeile anhängen). */
const verbs = [
  ["be", "was / were", "been", "sein"], ["become", "became", "become", "werden"],
  ["begin", "began", "begun", "beginnen"], ["break", "broke", "broken", "brechen"],
  ["bring", "brought", "brought", "bringen"], ["buy", "bought", "bought", "kaufen"],
  ["come", "came", "come", "kommen"], ["do", "did", "done", "tun"],
  ["drink", "drank", "drunk", "trinken"], ["drive", "drove", "driven", "fahren"],
  ["eat", "ate", "eaten", "essen"], ["find", "found", "found", "finden"],
  ["get", "got", "got / gotten", "bekommen"], ["give", "gave", "given", "geben"],
  ["go", "went", "gone", "gehen"], ["have", "had", "had", "haben"],
  ["know", "knew", "known", "wissen"], ["make", "made", "made", "machen"],
  ["see", "saw", "seen", "sehen"], ["take", "took", "taken", "nehmen"],
  ["write", "wrote", "written", "schreiben"],
  ["bite", "bit", "bitten", "beißen"], ["fall", "fell", "fallen", "fallen"],
  ["feel", "felt", "felt", "fühlen"], ["fly", "flew", "flown", "fliegen"],
  ["hear", "heard", "heard", "hören"], ["keep", "kept", "kept", "behalten"],
  ["leave", "left", "left", "verlassen"], ["lose", "lost", "lost", "verlieren"],
  ["meet", "met", "met", "treffen"], ["run", "ran", "run", "laufen"],
  ["say", "said", "said", "sagen"], ["sleep", "slept", "slept", "schlafen"],
  ["speak", "spoke", "spoken", "sprechen"], ["swim", "swam", "swum", "schwimmen"],
  ["teach", "taught", "taught", "lehren"], ["think", "thought", "thought", "denken"],
  ["understand", "understood", "understood", "verstehen"], ["win", "won", "won", "gewinnen"]
];

/* Wortschatz aus dem Workbook (Unit 4, "MORE Words and Phrases" + "WORD FILE – Adjectives
   describing animals"). Jedes Eintrag: [Begriff, Beispielsatz, deutsche Übersetzung]. */
const vocab = [
  ["polar bear", "There are 3,000 polar bears on the Svalbard Islands in Norway.", "Eisbär"],
  ["adorable", "The baby seal's parents are not as adorable.", "bezaubernd, liebenswert"],
  ["bite", "A bite from a slow loris can be deadly.", "Biss"],
  ["poison", "The slow loris produces a poison to protect its young.", "Gift"],
  ["to bite (off)", "His lizard tried to bite my finger off.", "(ab-)beißen"],
  ["lizard", "Dave's got a new lizard as a pet.", "Eidechse"],
  ["to chase away", "He managed to chase the big fish away.", "verjagen"],
  ["to complain", "She smiles a lot and never complains.", "sich beschweren"],
  ["to lift", "He dived into the water, and tried to lift the girl out.", "aufheben"],
  ["to pull down", "There was a big bull shark, and it was pulling Paige down into the water.", "hinunterziehen"],
  ["to accept", "Paige tries to accept her situation.", "akzeptieren"],
  ["immediately", "Why didn't they go back to the café immediately?", "sofort"],
  ["to advise (sb.) against sth.", "I would advise against surfing or swimming out too far.", "(jdm.) von etw. abraten, (jdn.) vor etw. warnen"],
  ["to defend", "Sharks attack to defend their territory.", "verteidigen"],
  ["on average", "They only kill one person every eight years on average.", "durchschnittlich, im Durchschnitt"],
  ["shape", "From below, the shape of a swimmer can look like a seal to a shark.", "Form"],
  ["to suppose", "I suppose so.", "vermuten, annehmen"],
  ["to communicate", "Soon they find out that Troodons can communicate.", "kommunizieren"],
  ["audience", "There are different ways to reach an audience.", "Publikum"],
  ["environment", "Foxes are a part of our environment.", "Umwelt"],
  ["to inform", "You need to inform the public about changes to the voting system.", "informieren"],
  ["poisonous", "A poisonous animal can make you very sick if it bites or stings you.", "giftig"],
  ["deadly", "A deadly animal can kill you.", "tödlich"],
  ["dangerous", "A dangerous animal can hurt or kill you.", "gefährlich"],
  ["aggressive", "An aggressive animal attacks without much reason.", "aggressiv"],
  ["elegant", "The swan moved across the lake in an elegant way.", "elegant, beeindruckend"],
  ["stunning", "Everyone agreed the swan looked stunning.", "atemberaubend"],
  ["cute", "The bear cub looked incredibly cute.", "niedlich"],
  ["cuddly", "The brown bear looked soft and cuddly.", "kuschelig"]
];

function shuffle(arr){ return [...arr].sort(()=>Math.random()-.5); }

function vocabQuiz(){
  const deck = shuffle(vocab).slice(0, 10);
  const allDe = vocab.map(v=>v[2]);
  return deck.map(v=>{
    const correct = v[2];
    const choices = shuffle([correct, ...shuffle(allDe.filter(x=>x!==correct)).slice(0,3)]);
    return [`Was bedeutet „${v[0]}“?`, choices, choices.indexOf(correct), `${v[0]} = ${v[2]}\n„${v[1]}“`, "medium"];
  });
}

function verbQuiz(){
  const deck = shuffle(verbs).slice(0, 8);
  const all = verbs.map(v=>`${v[1]} · ${v[2]}`);
  return deck.map(v=>{
    const correct = `${v[1]} · ${v[2]}`;
    const choices = shuffle([correct, ...shuffle(all.filter(x=>x!==correct)).slice(0,3)]);
    return [`Welche Formen gehören zu „${v[0]}“?`, choices, choices.indexOf(correct), `Simple Past: ${v[1]} · Past Participle: ${v[2]} · ${v[3]}`, "medium"];
  });
}

const englisch = {
  title: "Englisch · Irregular Verbs & Wortschatz",
  intro: "Trainiere die drei Formen unregelmäßiger englischer Verben und lerne neuen Wortschatz.",
  lessons: [
    ["Was sind Irregular Verbs?", "Unregelmäßige Verben bilden Simple Past und Past Participle nicht einfach mit -ed. Beispiel: go – went – gone."],
    ["Drei Formen", "Infinitive – Simple Past – Past Participle. Beispiel: write – wrote – written."],
    ["Lernstrategie", "Lerne Verben in Dreiergruppen und wiederhole besonders jene, bei denen du dich vertan hast."]
  ],
  verbs,
  vocab,
  quiz: [], // wird dynamisch aus verbQuiz()/vocabQuiz() zusammengestellt
  buildVerbQuiz: verbQuiz,
  buildVocabQuiz: vocabQuiz
};

const physik = {
  title: "Physik · Bewegung und Kräfte",
  intro: "Lerne Ruhe, Bewegung, Geschwindigkeit, Strecke, Zeit und Kräfte – mit Erklärungen und Rechenaufgaben.",
  lessons: [
    ["Ruhe und Bewegung", "Ein Körper ruht, wenn er seine Position gegenüber einem Bezugspunkt nicht verändert. Ein Körper bewegt sich, wenn sich seine Position gegenüber diesem Bezugspunkt mit der Zeit verändert. Beispiel: Im fahrenden Bus sitzt du relativ zum Sitz in Ruhe, gegenüber der Straße bewegst du dich."],
    ["Bezugspunkt", "Ob etwas ruht oder sich bewegt, hängt vom gewählten Bezugspunkt ab. Beispiel: Ein Fahrgast sitzt im Zug gegenüber dem Sitz in Ruhe, gegenüber dem Bahnhof bewegt er sich."],
    ["Bewegungsänderung", "Eine Bewegung verändert sich, wenn ein Körper schneller oder langsamer wird oder seine Bewegungsrichtung ändert. Ein Auto, das nach links abbiegt, verändert seine Bewegung – auch bei gleichbleibendem Tempo."],
    ["Gleichförmige und ungleichförmige Bewegung", "Bei gleichförmiger Bewegung bleibt die Geschwindigkeit konstant. Bei ungleichförmiger Bewegung ändert sich die Geschwindigkeit. Beispiele: Ein Auto beschleunigt beim Anfahren und bremst vor einer Ampel."],
    ["Geschwindigkeit berechnen", "Die Geschwindigkeit v ist die zurückgelegte Strecke s geteilt durch die benötigte Zeit t: v = s / t. Beispiel: 100 m in 20 s ergeben 5 m/s. Einheiten: m/s oder km/h."],
    ["Strecke berechnen", "Wenn Geschwindigkeit und Zeit bekannt sind, gilt s = v · t. Beispiel: 5 m/s · 12 s = 60 m. Achte darauf, dass die Einheiten zusammenpassen."],
    ["Zeit berechnen", "Wenn Strecke und Geschwindigkeit bekannt sind, gilt t = s / v. Beispiel: 180 km / 90 km/h = 2 h."],
    ["Geschwindigkeit umrechnen", "Von m/s nach km/h: mit 3,6 multiplizieren. Von km/h nach m/s: durch 3,6 dividieren. Beispiel: 10 m/s = 36 km/h."],
    ["Kräfte", "Kräfte können Körper beschleunigen, abbremsen, ihre Bewegungsrichtung ändern oder sie verformen. Das Formelzeichen ist F, die Einheit heißt Newton (N)."],
    ["Kräfte mit und ohne Berührung", "Manche Kräfte wirken durch Berührung, etwa beim Schieben oder Ziehen. Andere wirken ohne direkte Berührung, etwa die Gewichtskraft und die Magnetkraft."],
    ["Gewichtskraft und Magnetkraft", "Die Gewichtskraft zieht Gegenstände zur Erde. Magnetkräfte können bestimmte Materialien anziehen oder Magnete auch abstoßen. Beide können ohne direkten Kontakt wirken."],
    ["Versuchsprotokoll", "Ein Versuchsprotokoll dokumentiert ein Experiment nachvollziehbar. Es enthält einen aussagekräftigen Titel, eine Materialliste, eine Anleitung zur Durchführung, eine Versuchsskizze, eine Erklärung und eine Auswertung."],
    ["Diagrammarten", "Wichtige Diagrammarten sind Säulendiagramm, Balkendiagramm, Kreisdiagramm und Liniendiagramm. Sie stellen Messwerte oder Ergebnisse übersichtlich dar."],
    ["Bewegungen beschreiben", "Beschreibe eine Bewegung mit diesen Angaben: Wer oder was bewegt sich? Welche Art von Bewegung liegt vor? Wie schnell ist die Bewegung? In welche Richtung erfolgt sie?"],
    ["Stroboskopbild", "Bei einem Stroboskopbild wird ein bewegter Gegenstand in gleichen Zeitabständen mehrfach dargestellt. So lässt sich seine Bewegung untersuchen."],
    ["Tempo und Richtung", "Tempo und Richtung beschreiben gemeinsam eine Bewegung. Die Geschwindigkeit berücksichtigt auch die Richtung; diese lässt sich beispielsweise mit einem Pfeil darstellen."],
    ["Geschwindigkeitsarten", "Unterscheide die Geschwindigkeit zu einem bestimmten Zeitpunkt (Momentangeschwindigkeit), die Anfangsgeschwindigkeit, die Endgeschwindigkeit und die Zusatzgeschwindigkeit. Die Zusatzgeschwindigkeit beschreibt einen zusätzlichen Geschwindigkeitsanteil."],
    ["Kraft erkennen", "Eine Kraft kann man nicht direkt sehen. Ihre Wirkung lässt sich beobachten: Sie kann einen Gegenstand beschleunigen, abbremsen, umlenken oder verformen."],
    ["Kräfte im Alltag", "Beim Bremsen wird ein Fahrrad langsamer, beim Treten wird ein Ball beschleunigt, beim Lenken ändert sich die Richtung, und beim Drücken von Knete verändert sich die Form."]
  ],
  formulas: [["Geschwindigkeit", "v = s / t"], ["Strecke", "s = v · t"], ["Zeit", "t = s / v"], ["Umrechnung", "1 m/s = 3,6 km/h"]],
  quiz: [
    ["Was gehört in ein Versuchsprotokoll?", ["Titel, Materialliste, Durchführung, Versuchsskizze, Erklärung und Auswertung", "Nur der Titel", "Nur eine Zeichnung", "Nur die Note"], 0, "Ein vollständiges Versuchsprotokoll beschreibt Aufbau, Ablauf und Ergebnis eines Versuchs.", "medium"],
    ["Wozu dient ein Versuchsprotokoll?", ["Um ein Experiment nachvollziehbar zu dokumentieren", "Um die Geschwindigkeit zu verdoppeln", "Um eine Kraft zu messen", "Um die Uhrzeit zu ändern"], 0, "Es hält fest, wie ein Experiment durchgeführt und ausgewertet wurde.", "easy"],
    ["Welche vier Diagrammarten stehen in den Notizen?", ["Säulen-, Balken-, Kreis- und Liniendiagramm", "Würfel-, Stern-, Wolken- und Flächendiagramm", "Karten-, Text-, Foto- und Zahlendiagramm", "Nur Kreis- und Liniendiagramm"], 0, "Die vier genannten Arten sind Säulen-, Balken-, Kreis- und Liniendiagramm.", "medium"],
    ["Welche Frage hilft beim Beschreiben einer Bewegung?", ["In welche Richtung bewegt sich der Körper?", "Welche Farbe hat das Heft?", "Wie heißt das Experiment?", "Wie teuer ist das Fahrrad?"], 0, "Wichtig sind bewegter Körper, Bewegungsart, Tempo und Richtung.", "easy"],
    ["Welche Angaben sind beim Beschreiben einer Bewegung wichtig?", ["Wer oder was, Bewegungsart, Tempo und Richtung", "Nur die Farbe", "Nur die Masse", "Nur das Datum"], 0, "Die Notizen nennen vier Gesichtspunkte einer Bewegungsbeschreibung.", "medium"],
    ["Was zeigt ein Stroboskopbild?", ["Einen bewegten Gegenstand in gleichen Zeitabständen", "Nur einen ruhenden Körper", "Nur eine Temperaturmessung", "Nur die Masse eines Gegenstands"], 0, "Ein Stroboskopbild hält die Position eines bewegten Körpers in gleichen Zeitabständen fest.", "medium"],
    ["Wie werden die Aufnahmen in einem Stroboskopbild gemacht?", ["In gleichen Zeitabständen", "Nur einmal", "Immer nach zufälligen Tagen", "Ohne Zeitabstand"], 0, "Die Zeitabstände zwischen den dargestellten Positionen sind gleich.", "easy"],
    ["Wie lautet die Formel zur Berechnung des Tempos?", ["v = s / t", "v = s · t", "v = t / s", "v = s + t"], 0, "Tempo = Strecke geteilt durch benötigte Zeit: v = s / t.", "easy"],
    ["Wie kann man die Richtung einer Bewegung darstellen?", ["Mit einem Pfeil", "Nur mit einer Zahl ohne Richtung", "Mit einem Kreisdiagramm", "Nur mit der Masse"], 0, "Ein Pfeil kann die Bewegungsrichtung angeben.", "easy"],
    ["Welche Geschwindigkeitsbegriffe kommen in den Notizen vor?", ["Geschwindigkeit, Anfangs-, End- und Zusatzgeschwindigkeit", "Nur Licht- und Schallgeschwindigkeit", "Nur Durchschnittsgeschwindigkeit", "Nur Windgeschwindigkeit"], 0, "Die Notizen nennen Geschwindigkeit, Anfangs-, End- und Zusatzgeschwindigkeit.", "medium"],
    ["Was bedeutet Anfangsgeschwindigkeit?", ["Die Geschwindigkeit zu Beginn einer betrachteten Bewegung", "Die Kraft am Ende", "Die gesamte Strecke", "Die Zeit bis zum Stillstand"], 0, "Die Anfangsgeschwindigkeit ist die Geschwindigkeit am Anfang des betrachteten Vorgangs.", "easy"],
    ["Was bedeutet Endgeschwindigkeit?", ["Die Geschwindigkeit am Ende eines betrachteten Vorgangs", "Die Masse am Ende", "Die Richtung am Anfang", "Die zurückgelegte Strecke"], 0, "Die Endgeschwindigkeit ist die Geschwindigkeit am Ende des betrachteten Vorgangs.", "easy"],
    ["Kann man eine Kraft direkt sehen?", ["Nein, man erkennt sie an ihren Wirkungen", "Ja, jede Kraft ist blau", "Ja, jede Kraft leuchtet", "Nur nachts"], 0, "Kräfte sind nicht direkt sichtbar; ihre Wirkungen kann man beobachten.", "easy"],
    ["Woran kann man eine Kraft erkennen?", ["An Beschleunigung, Abbremsung, Richtungsänderung oder Verformung", "Nur an der Farbe", "Nur an der Uhrzeit", "Nur am Namen des Körpers"], 0, "Kräfte können Bewegungen verändern oder Körper verformen.", "medium"],
    ["Ein Radfahrer fährt 100 m in 20 s. Wie schnell ist er?", ["2 m/s", "5 m/s", "20 m/s", "120 m/s"], 1, "v = s / t = 100 m / 20 s = 5 m/s.", "easy"],
    ["Ein Auto fährt 150 km in 2 Stunden. Wie groß ist die Durchschnittsgeschwindigkeit?", ["75 km/h", "150 km/h", "300 km/h", "50 km/h"], 0, "150 km / 2 h = 75 km/h.", "medium"],
    ["Ein Läufer läuft 5 m/s für 12 Sekunden. Welche Strecke legt er zurück?", ["17 m", "60 m", "2,4 m", "120 m"], 1, "s = v · t = 5 m/s · 12 s = 60 m.", "medium"],
    ["Ein Zug fährt 180 km mit 90 km/h. Wie lange fährt er?", ["3 h", "90 min", "2 h", "1 h"], 2, "t = s / v = 180 km / 90 km/h = 2 h.", "medium"],
    ["Was ist die Einheit der Kraft?", ["Kilogramm", "Newton", "Meter", "Sekunde"], 1, "Die Einheit der Kraft heißt Newton (N).", "easy"],
    ["Ein Auto fährt geradeaus und biegt links ab. Was ändert sich?", ["Die Bewegungsrichtung", "Die Masse", "Die Zeit", "Die Einheit der Kraft"], 0, "Das Auto ändert seine Bewegungsrichtung.", "easy"],
    ["Wann ist ein Körper in Ruhe?", ["Wenn er immer schneller wird", "Wenn sich seine Position gegenüber dem Bezugspunkt nicht ändert", "Wenn er sich dreht", "Wenn eine Kraft auf ihn wirkt"], 1, "Ruhe bedeutet: keine Positionsänderung relativ zum gewählten Bezugspunkt.", "easy"],
    ["Wann ist ein Körper in Bewegung?", ["Wenn seine Position gegenüber einem Bezugspunkt mit der Zeit anders wird", "Nur wenn er fährt", "Nur wenn er schnell ist", "Wenn er schwer ist"], 0, "Bewegung ist eine Positionsänderung gegenüber einem Bezugspunkt.", "easy"],
    ["Ein Fahrgast sitzt im fahrenden Zug. Gegenüber welchem Bezugspunkt ruht er?", ["Bahnhof", "Straße", "Seinem Sitz", "Bahnsteig"], 2, "Gegenüber dem Sitz ändert der Fahrgast seine Position nicht.", "medium"],
    ["Welche Änderung zählt als Bewegungsänderung?", ["Nur eine Farbänderung", "Eine Richtungsänderung", "Nur eine Massenänderung", "Eine Temperaturänderung"], 1, "Auch eine Richtungsänderung verändert die Bewegung.", "easy"],
    ["Was ist eine gleichförmige Bewegung?", ["Eine Bewegung mit konstanter Geschwindigkeit", "Eine Bewegung, die immer schneller wird", "Eine Bewegung, die immer langsamer wird", "Eine Bewegung ohne Strecke"], 0, "Bei gleichförmiger Bewegung bleibt die Geschwindigkeit konstant.", "medium"],
    ["Welches Beispiel zeigt eine Beschleunigung?", ["Ein geparktes Fahrrad", "Ein Auto fährt an und wird schneller", "Ein Buch liegt auf dem Tisch", "Ein Ball liegt still"], 1, "Beim Anfahren nimmt die Geschwindigkeit zu.", "easy"],
    ["Welches Beispiel zeigt eine Verlangsamung?", ["Ein Fahrrad bremst", "Ein Auto wird schneller", "Ein Zug fährt konstant", "Ein Buch liegt still"], 0, "Beim Bremsen nimmt die Geschwindigkeit ab.", "easy"],
    ["Wie lautet die Formel für die Geschwindigkeit?", ["v = s · t", "v = t / s", "v = s / t", "v = s + t"], 2, "Geschwindigkeit = Strecke geteilt durch Zeit.", "easy"],
    ["Wie lautet die Formel für die Strecke?", ["s = v · t", "s = v / t", "s = t / v", "s = v + t"], 0, "Strecke = Geschwindigkeit mal Zeit.", "easy"],
    ["Wie lautet die Formel für die Zeit?", ["t = s · v", "t = v / s", "t = s / v", "t = s + v"], 2, "Zeit = Strecke geteilt durch Geschwindigkeit.", "easy"],
    ["Ein Kind läuft 60 m in 10 s. Wie groß ist seine Geschwindigkeit?", ["6 m/s", "600 m/s", "0,6 m/s", "50 m/s"], 0, "v = 60 / 10 = 6 m/s.", "medium"],
    ["Ein Auto fährt 80 km/h für 3 Stunden. Welche Strecke legt es zurück?", ["240 km", "83 km", "26,7 km", "160 km"], 0, "s = 80 · 3 = 240 km.", "medium"],
    ["Ein Radfahrer legt 24 km mit 12 km/h zurück. Wie lange braucht er?", ["12 h", "2 h", "0,5 h", "288 h"], 1, "t = 24 / 12 = 2 h.", "medium"],
    ["Wie viel km/h sind 10 m/s?", ["3,6 km/h", "36 km/h", "100 km/h", "13,6 km/h"], 1, "10 · 3,6 = 36 km/h.", "medium"],
    ["Wie viel m/s sind 72 km/h?", ["10 m/s", "20 m/s", "36 m/s", "259,2 m/s"], 1, "72 / 3,6 = 20 m/s.", "hard"],
    ["Was ist das Formelzeichen der Kraft?", ["v", "s", "F", "t"], 2, "Das Formelzeichen der Kraft ist F.", "easy"],
    ["Wie heißt die Kraft, die Gegenstände zur Erde zieht?", ["Magnetkraft", "Gewichtskraft", "Reibungskraft", "Muskelkraft"], 1, "Die Gewichtskraft zieht Gegenstände zur Erde.", "easy"],
    ["Welche Kraft kann ohne direkte Berührung wirken?", ["Magnetkraft", "Schubsen mit der Hand", "Ziehen an einem Seil", "Drücken auf Knete"], 0, "Magnetkräfte können auch ohne Berührung wirken.", "easy"],
    ["Welche zwei Kräfte können ohne direkten Kontakt wirken?", ["Gewichtskraft und Magnetkraft", "Schieben und Ziehen", "Drücken und Stoßen", "Kneten und Treten"], 0, "Gewichtskraft und Magnetkraft sind Beispiele für Kräfte ohne direkten Kontakt.", "medium"],
    ["Was kann eine Kraft bewirken?", ["Nur die Farbe ändern", "Beschleunigen, abbremsen, umlenken oder verformen", "Nur die Masse ändern", "Nur die Temperatur ändern"], 1, "Kräfte können Geschwindigkeit, Richtung oder Form ändern.", "easy"],
    ["Ein Ball wird getreten und rollt los. Was bewirkt die Kraft?", ["Beschleunigung", "Keine Änderung", "Nur Farbänderung", "Nur Temperaturänderung"], 0, "Der Ball wird durch die Kraft beschleunigt.", "easy"],
    ["Ein Fahrrad wird durch die Bremse langsamer. Was bewirkt die Kraft?", ["Verformung", "Abbremsen", "Beschleunigung", "Keine Wirkung"], 1, "Die Bremskraft verringert die Geschwindigkeit.", "easy"],
    ["Knete wird zusammengedrückt. Welche Wirkung hat die Kraft?", ["Richtungsänderung", "Beschleunigung", "Verformung", "Keine"], 2, "Die Knete wird verformt.", "easy"],
    ["Ein Ball ändert beim Aufprall seine Richtung. Welche Wirkung hat die Kraft?", ["Richtungsänderung", "Nur Farbänderung", "Nur Masseänderung", "Keine"], 0, "Eine Kraft kann die Bewegungsrichtung ändern.", "medium"],
    ["Welche Größe wird in m/s angegeben?", ["Zeit", "Strecke", "Geschwindigkeit", "Kraft"], 2, "m/s ist eine Einheit der Geschwindigkeit.", "easy"],
    ["Welche Größe wird in Sekunden (s) angegeben?", ["Zeit", "Kraft", "Geschwindigkeit", "Masse"], 0, "Sekunden sind eine Einheit der Zeit.", "easy"],
    ["Ein Körper bewegt sich 200 m in 40 s. Wie schnell ist er?", ["8 m/s", "5 m/s", "160 m/s", "0,2 m/s"], 1, "v = 200 / 40 = 5 m/s.", "medium"],
    ["Ein Auto fährt 90 km in 1,5 Stunden. Wie schnell fährt es durchschnittlich?", ["135 km/h", "45 km/h", "60 km/h", "90 km/h"], 2, "v = 90 / 1,5 = 60 km/h.", "hard"],
    ["Ein Läufer läuft 4 m/s. Wie weit kommt er in 15 Sekunden?", ["19 m", "60 m", "3,75 m", "45 m"], 1, "s = 4 · 15 = 60 m.", "medium"],
    ["Ein Auto fährt zuerst geradeaus und biegt dann links ab. Hat sich die Bewegung verändert?", ["Ja, weil sich die Richtung ändert", "Nein, solange das Tempo gleich bleibt", "Nein, weil die Masse gleich bleibt", "Nur wenn es stoppt"], 0, "Ja. Auch eine Richtungsänderung ist eine Bewegungsänderung.", "medium"]
  ]
};

window.EMS_DATA = {
  subjects: [
    ["deutsch", "📚", "Wortarten, Satzanalyse und Grammatikübungen", "Lernen · Karten · Quiz"],
    ["englisch", "🇬🇧", "Irregular Verbs, Wortschatz und eigene Wortlisten", "Forms · Training · Wiederholung"],
    ["physik", "⚡", "Bewegung, Geschwindigkeit und Kräfte", "Lernen · Rechnen · Test"]
  ],
  modules: { deutsch, englisch, physik }
};
})();
