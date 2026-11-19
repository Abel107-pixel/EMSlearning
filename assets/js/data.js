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
  intro: "Verstehe Bewegung, Geschwindigkeit und die Wirkung von Kräften.",
  lessons: [
    ["Ruhe und Bewegung", "Ein Körper ist in Ruhe, wenn sich seine Position relativ zu einem gewählten Bezugspunkt nicht verändert. Er ist in Bewegung, wenn sich seine Position mit der Zeit verändert."],
    ["Bewegungsrichtung", "Fährt ein Auto geradeaus und biegt dann links ab, ändert sich seine Bewegungsrichtung. Auch wenn die Geschwindigkeit gleich bleibt, hat sich die Bewegung verändert."],
    ["Geschwindigkeit", "Die Geschwindigkeit gibt an, welche Strecke ein Körper in einer bestimmten Zeit zurücklegt."],
    ["Kräfte", "Eine Kraft kann einen Körper beschleunigen, abbremsen, seine Richtung ändern oder seine Form verändern. Formelzeichen: F; Einheit: Newton (N)."]
  ],
  formulas: [["Geschwindigkeit", "v = s / t"], ["Strecke", "s = v · t"], ["Zeit", "t = s / v"]],
  quiz: [
    ["Ein Radfahrer fährt 100 m in 20 s. Wie schnell ist er?", ["2 m/s", "5 m/s", "20 m/s", "120 m/s"], 1, "v = s / t = 100 / 20 = 5 m/s.", "easy"],
    ["Ein Auto fährt 150 km in 2 Stunden. Wie groß ist die Durchschnittsgeschwindigkeit?", ["75 km/h", "150 km/h", "300 km/h"], 0, "150 km ÷ 2 h = 75 km/h.", "medium"],
    ["Ein Läufer läuft 5 m/s für 12 Sekunden. Welche Strecke legt er zurück?", ["17 m", "60 m", "2,4 m"], 1, "s = v · t = 5 · 12 = 60 m.", "medium"],
    ["Ein Zug fährt 180 km mit 90 km/h. Wie lange fährt er?", ["3 h", "90 min", "2 h"], 2, "t = s / v = 180 / 90 = 2 h.", "medium"],
    ["Was ist die Einheit der Kraft?", ["Kilogramm", "Newton", "Meter"], 1, "Die Einheit der Kraft ist Newton (N).", "easy"],
    ["Ein Auto fährt geradeaus und biegt links ab. Was ändert sich?", ["Die Bewegungsrichtung", "Die Masse", "Die Zeit"], 0, "Die Bewegungsrichtung ändert sich.", "easy"]
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
