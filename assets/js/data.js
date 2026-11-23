/* EMS Learning 3.0 — Lerninhalte
   Hier werden neue Wörter, Lektionen und Quizfragen ergänzt.
   Struktur ist bewusst einfach gehalten, damit später leicht erweitert werden kann. */
(() => {
"use strict";

const choice = (question, options, correct, explanation, difficulty = "medium") =>
  [question, options, correct, explanation, difficulty];

const written = (question, expected, explanation, difficulty = "medium") =>
  [question, { solutions: [Array.isArray(expected) ? expected : [expected]] }, null, explanation, difficulty];

const passage = (question, text, expected, explanation) =>
  [question, { passage: text, solutions: expected.map(word => [word]) }, null, explanation, "hard"];

const deutsch = {
  title: "Deutsch · Grammatik und Rechtschreibung",
  intro: "Erkenne nominalisierte Verben und Adjektive. Entscheide mit der Ersatzprobe, ob du das oder dass schreibst.",
  topics: {
    "verben-nominalisieren": {
      title: "Nominalisierung von Verben",
      intro: "Erkenne, wann ein Verb im Satz als Nomen verwendet wird.",
      lessons: [
        ["Grundregel", "Wird die Grundform eines Verbs (Infinitiv) wie ein Nomen verwendet, schreibt man sie groß. Mit dem bestimmten Artikel heißt es das Schwimmen, das Lesen und das Kochen. Als Verb schreibt man die Grundform klein: Wir können schwimmen."],
        ["Artikel und Possessivwörter", "Ein Artikel oder ein Possessivwort kann die Nominalisierung anzeigen: das Lachen, dein Schreien, ihr Husten. Auch ein gebeugtes Adjektiv kann davorstehen: lautes Singen, regelmäßiges Üben."],
        ["Präpositionen mit Artikel", "Beim, zum und vom enthalten einen Artikel: beim = bei dem, zum = zu dem, vom = von dem. Daher schreibt man beim Klettern, zum Kochen und vom vielen Planen groß. In „Wir versuchen zu klettern“ gehört zu zum Infinitiv. Deshalb schreibst du klettern in diesem Satz klein."],
        ["Artikelprobe", "Ist die Tätigkeit selbst gemeint, kannst du in manchen Sätzen einen Artikel dazudenken: „Lesen macht Spaß“ bedeutet hier „Das Lesen macht Spaß“. Mitten im Satz erkennst du den Unterschied besonders gut: „Ich mag Lesen und Zeichnen.“ – „Ich möchte lesen und zeichnen.“"]
      ],
      quiz: [
        choice("Welche Wortgruppe enthält ein nominalisiertes Verb?", ["wir schwimmen", "das Schwimmen", "schnell schwimmen"], 1, "Schwimmen wird mit dem Artikel das als Nomen verwendet.", "easy"),
        choice("Welches Wort zeigt die Nominalisierung in „Dein Schreien war bis draußen zu hören“ an?", ["war", "bis", "Dein", "draußen"], 2, "Dein ist ein Possessivwort und begleitet das Nomen Schreien."),
        choice("Was zeigt die Nominalisierung in „Häufiges Lesen erweitert den Wortschatz“ an?", ["ein gebeugtes Adjektiv", "ein Artikel", "ein Relativpronomen"], 0, "Häufiges ist ein gebeugtes Adjektiv und beschreibt das Lesen."),
        choice("Was bedeutet „beim“ in „beim Singen“?", ["bei das", "bei dem", "bei den"], 1, "Beim steht für bei dem. Dem ist der Artikel zu Singen.", "easy"),
        choice("In welchem Satz lässt sich vor der Tätigkeit der Artikel das ergänzen?", ["Wir wollen tauchen.", "Wir tauchen im See.", "Sie mag Tauchen."], 2, "„Sie mag das Tauchen“ meint dieselbe Tätigkeit als Nomen."),
        choice("Welcher Satz verwendet das nominalisierte Verb richtig?", ["Beim wechseln der Reifen hilft mir mein Onkel.", "Wir möchten die Reifen Wechseln.", "Beim Wechseln der Reifen hilft mir mein Onkel."], 2, "Beim steht für bei dem. Daher schreibt man Wechseln hier groß."),
        written("Wir … bis zur nächsten Boje. (schwimmen)", "schwimmen", "Schwimmen ist hier das Verb zum Subjekt wir und wird kleingeschrieben.", "easy"),
        written("In der Bibliothek stört lautes … die anderen. (schreien)", "Schreien", "Lautes beschreibt die Tätigkeit als Nomen: lautes Schreien."),
        written("Vor dem Schlafengehen mag ich das … besonders gern. (lesen)", "Lesen", "Der Artikel das gehört zum nominalisierten Verb Lesen.", "easy"),
        written("Zum … brauche ich eine große Pfanne. (kochen)", "Kochen", "Zum steht für zu dem. Kochen ist hier ein Nomen.", "easy"),
        written("Nächste Woche … wir unser Klassenfest. (planen)", "planen", "Planen ist das Verb zum Subjekt wir."),
        written("Vom vielen … brauchen wir eine Pause. (planen)", "Planen", "Vom steht für von dem. Planen ist hier ein Nomen."),
        written("Kannst du mir den Vorfall genauer …? (schildern)", "schildern", "Nach kannst steht schildern als Infinitiv und wird kleingeschrieben."),
        written("Beim … der Ereignisse blieb sie ganz ruhig. (schildern)", "Schildern", "Beim zeigt an, dass Schildern als Nomen verwendet wird."),
        written("Nominalisiere „schaukeln“ mit dem bestimmten Artikel.", "das Schaukeln", "Ein Beispiel: Die Kinder freuen sich auf das Schaukeln im Garten.", "easy"),
        written("Nominalisiere „irren“ mit dem bestimmten Artikel.", "das Irren", "Ein Beispiel: Das Irren gehört beim Lernen dazu."),
        written("Nominalisiere „halten“ mit dem bestimmten Artikel.", "das Halten", "Ein Beispiel: Das Halten des Gleichgewichts fällt mir auf dem Eis schwer."),
        written("Nominalisiere „erkennen“ mit dem bestimmten Artikel.", "das Erkennen", "Ein Beispiel: Das Erkennen eines Musters hilft beim Lösen der Aufgabe."),
        written("Nominalisiere „prüfen“ mit dem bestimmten Artikel.", "das Prüfen", "Ein Beispiel: Für das Prüfen der Antworten nehme ich mir Zeit."),
        passage("Ergänze die Verben im Text. Achte auf die Groß- und Kleinschreibung.",
          "Für das Schulfest ___ (planen) wir einen Bücherstand. Beim ___ (sortieren) finden wir alte Comics. Das ___ (lesen) der Titel macht uns Spaß. Bevor wir die Bücher einpacken, wollen wir die Preise ___ (prüfen).",
          ["planen", "Sortieren", "Lesen", "prüfen"],
          "In „planen wir“ und „wollen wir prüfen“ bleiben planen und prüfen klein. Beim ist das Signal für Sortieren. Das ist der Artikel vor Lesen."),
        passage("Ergänze den Text über die Sportstunde.",
          "Heute wollen wir in der Halle ___ (klettern). Beim ___ (halten) des Seils hilft mir Mia. Ihr lautes ___ (lachen) steckt mich an. Danach versuchen wir, leise zu ___ (reden).",
          ["klettern", "Halten", "Lachen", "reden"],
          "Beim Halten und lautes Lachen bezeichnen Tätigkeiten als Nomen. In „wir wollen klettern“ und „leise zu reden“ bleiben die Infinitive klein.")
      ]
    },
    "adjektive-nominalisieren": {
      title: "Nominalisierung von Adjektiven",
      intro: "Finde Hinweiswörter und bilde nominalisierte Adjektive mit der richtigen Endung.",
      lessons: [
        ["Grundregel", "Ein Adjektiv beschreibt eine Eigenschaft. Wird es als Nomen verwendet, schreibt man es groß: ein spannendes Buch → etwas Spannendes. Im ersten Beispiel beschreibt spannendes das Buch. Im zweiten steht Spannendes selbst für eine Sache mit dieser Eigenschaft."],
        ["Artikel als Hinweis", "Achte auf Artikel wie das oder des: das Neue, das Interessante, zu viel des Guten. Die Endung passt zum Satz und zum Begleiter: das Gute, des Guten."],
        ["Präposition mit Artikel als Hinweis", "Auch Präpositionen mit Artikel können ein Hinweis sein: im Dunkeln (in dem Dunkeln), vom Guten (von dem Guten), zum Wesentlichen (zu dem Wesentlichen)."],
        ["Mengenwörter und Pronomen als Hinweis", "Typische Hinweise sind etwas, nichts, alles, viel, wenig und manches. Beispiele: etwas Schönes, nichts Neues, alles Mögliche, viel Interessantes, wenig Schädliches und manches Aufregende. Lerne die Endung im Zusammenhang mit dem Hinweiswort."],
        ["Grundform wiederfinden", "Lies das Adjektiv ohne seine Endung: das Spannende → spannend, etwas Geheimnisvolles → geheimnisvoll. Bei einer Steigerungsform gehst du einen Schritt weiter: nichts Schlimmeres → schlimmer → schlimm."]
      ],
      quiz: [
        choice("Welches Wort ist das Hinweiswort in „Wir entdecken etwas Geheimnisvolles“?", ["Wir", "entdecken", "etwas", "Geheimnisvolles"], 2, "Nach etwas steht hier ein nominalisiertes Adjektiv.", "easy"),
        choice("Welches Wort ist das Hinweiswort in „Beim Ausflug sahen wir alles Mögliche“?", ["Beim", "Ausflug", "wir", "alles"], 3, "Alles ist das Hinweiswort zu Mögliche. Beim gehört hier zum Nomen Ausflug."),
        choice("Welche Wortgruppe enthält ein nominalisiertes Adjektiv?", ["das neue Spiel", "das Neue", "ein neues Spiel"], 1, "Neue steht hier selbst als Nomen. Bei „das neue Spiel“ beschreibt neue das Spiel.", "easy"),
        choice("Was zeigt „vom“ in „Wir erzählen vom Guten in unserem Alltag“ an?", ["eine Präposition mit Artikel", "ein Mengenwort", "ein Verb"], 0, "Vom steht für von dem. Guten wird hier als Nomen verwendet."),
        choice("Welche Form passt in „Die vielen Geschenke waren zu viel des …“?", ["guten", "Gute", "Guten"], 2, "Nach des steht hier die Form Guten. Es gibt kein folgendes Nomen, das guten beschreiben würde."),
        written("Gib die Grundform von „etwas Geheimnisvolles“ an.", "geheimnisvoll", "Geheimnisvolles gehört zum Adjektiv geheimnisvoll."),
        written("Gib die Grundform von „nichts Schlimmeres“ an.", "schlimm", "Schlimmer ist die Steigerungsform von schlimm."),
        written("Gib die Grundform von „viel Teures“ an.", "teuer", "Das Adjektiv heißt teuer. Bei Teures fällt das e vor dem r weg."),
        written("Ergänze nur das fehlende Wort: nichts … (besonder-)", "Besonderes", "So heißt es „ein besonderes Erlebnis“ oder nominalisiert „nichts Besonderes“."),
        written("Ergänze nur das fehlende Wort: alles … (möglich)", "Mögliche", "Alles ist das Hinweiswort: alles Mögliche."),
        written("Ergänze nur das fehlende Wort: das … daran (spannend)", "Spannende", "Der Artikel das steht hier vor dem nominalisierten Adjektiv Spannende."),
        written("Ergänze nur das fehlende Wort: etwas … (schön)", "Schönes", "Nach etwas passt hier die Endung -es: etwas Schönes."),
        written("Ergänze nur das fehlende Wort: manches … (aufregend)", "Aufregende", "Nach manches passt hier die Endung -e: manches Aufregende."),
        written("Ergänze nur das fehlende Wort: viel … (interessant)", "Interessantes", "Nach viel passt hier die Endung -es: viel Interessantes."),
        written("Ergänze nur das fehlende Wort: wenig … (schädlich)", "Schädliches", "Nach wenig passt hier die Endung -es: wenig Schädliches."),
        written("Ergänze nur das fehlende Wort: nichts … (neu)", "Neues", "Nach nichts passt hier die Endung -es: nichts Neues."),
        written("Ergänze nur das fehlende Wort: zum … kommen (wesentlich)", "Wesentlichen", "Zum steht für zu dem. Die Form lautet „zum Wesentlichen“."),
        passage("Setze die Adjektive in den Text ein. Achte auf Endungen und Großschreibung.",
          "Bei der Ausstellung sahen wir ein ___ (neu) Modell. Das ___ (spannend) daran war seine Beleuchtung. Im nächsten Raum entdeckten wir etwas ___ (geheimnisvoll). Am Schluss erzählte uns die Leiterin viel ___ (interessant) über die Modelle.",
          ["neues", "Spannende", "Geheimnisvolles", "Interessantes"],
          "In „ein neues Modell“ beschreibt neues das Nomen Modell und bleibt klein. Die übrigen Formen stehen nach das, etwas und viel als Nomen."),
        passage("Ergänze die Formen im Text über den Wandertag.",
          "Für unseren Wandertag packen wir alles ___ (möglich) ein. Im Wald sehen wir selten etwas ___ (schädlich) auf dem Boden liegen. Die ___ (schön) Aussicht ist viele Fotos wert. An der nächsten Station erleben wir manches ___ (aufregend).",
          ["Mögliche", "Schädliches", "schöne", "Aufregende"],
          "Alles, etwas und manches sind hier Hinweiswörter. In „die schöne Aussicht“ bleibt schöne klein, weil es die Aussicht beschreibt.")
      ]
    },
    "das-dass": {
      title: "das oder dass?",
      intro: "Unterscheide Artikel, Relativpronomen, Demonstrativpronomen und Konjunktion.",
      lessons: [
        ["das als Artikel (A)", "Steht das bei einem Nomen, kann es der bestimmte Artikel sein: „Das Heft liegt auf dem Tisch.“ Probe: „Dieses Heft liegt auf dem Tisch.“ Das kann auch vor einem Adjektiv stehen: das blaue Heft."],
        ["das als Relativpronomen (RP)", "Das bezieht sich auf ein Nomen und eröffnet einen Relativsatz: „Ich suche das Heft, das neben der Tasche liegt.“ Probe: „… welches neben der Tasche liegt.“ Ein eingeschobener Relativsatz steht zwischen zwei Kommas: „Das Heft, das du suchst, liegt hier.“"],
        ["das als Demonstrativpronomen (DP)", "Das kann allein stehen und auf etwas bereits Genanntes hinweisen: „Der Ausflug fällt aus. Das finde ich schade.“ Probe: „Dies finde ich schade.“"],
        ["dass als Konjunktion (K)", "Dass leitet einen Nebensatz ein. Dieser kann zum Beispiel sagen, was jemand denkt, sagt oder hofft: „Wir hoffen, dass der Bus pünktlich kommt.“ Die Ersatzprobe mit dieses, dies oder welches funktioniert an dieser Stelle nicht. Im dass-Satz steht das gebeugte Verb am Ende."],
        ["Komma und zwei ähnliche Wörter", "Hauptsatz und dass-Satz trennt ein Komma. Der Nebensatz kann auch am Anfang stehen: „Dass der Bus heute später kommt, wissen wir schon.“ Beide Wörter können direkt aufeinanderfolgen: „Wir hoffen, dass das Wetter schön bleibt.“ Dass leitet den Nebensatz ein, das ist der Artikel zu Wetter."]
      ],
      quiz: [
        choice("Welche Aufgabe hat das zweite „das“ in „Hier ist das Buch, das du gesucht hast“?", ["Artikel (A)", "Relativpronomen (RP)", "Demonstrativpronomen (DP)", "Konjunktion (K)"], 1, "Das bezieht sich auf Buch. Die Probe lautet „welches du gesucht hast“."),
        choice("Welche Aufgabe hat „das“ in „Das verstehe ich“?", ["Konjunktion (K)", "Relativpronomen (RP)", "Artikel (A)", "Demonstrativpronomen (DP)"], 3, "Das steht allein und weist auf etwas hin: „Dies verstehe ich.“"),
        choice("Welche Aufgabe hat „das“ in „Das rote Auto steht vor der Schule“?", ["Artikel (A)", "Demonstrativpronomen (DP)", "Relativpronomen (RP)", "Konjunktion (K)"], 0, "Das begleitet das Nomen Auto. Die Probe lautet „Dieses rote Auto“."),
        choice("Welche Aufgabe hat „dass“ in „Ich glaube, dass der Bus schon abgefahren ist“?", ["Demonstrativpronomen (DP)", "Relativpronomen (RP)", "Konjunktion (K)", "Artikel (A)"], 2, "Dass ist eine Konjunktion. Sie leitet den Nebensatz „dass der Bus schon abgefahren ist“ ein."),
        choice("Welches Wort ersetzt „das“ in „Das Bild, das dort hängt, gefällt mir“ beim zweiten Vorkommen?", ["dies", "dieses", "welches", "dass"], 2, "Die Probe lautet „Das Bild, welches dort hängt, gefällt mir“."),
        choice("Welcher Satz ist richtig geschrieben?", ["Wir hoffen, dass das Wetter bleibt schön.", "Wir hoffen dass das Wetter schön bleibt.", "Wir hoffen, dass das Wetter schön bleibt."], 2, "Vor dass steht hier ein Komma. Das gebeugte Verb bleibt steht am Ende des Nebensatzes."),
        choice("Wo stehen beide Kommas richtig?", ["Das Spiel, das du meinst, ist ausverkauft.", "Das Spiel das du meinst, ist ausverkauft.", "Das Spiel, das du meinst ist ausverkauft."], 0, "Der eingeschobene Relativsatz „das du meinst“ wird von zwei Kommas eingeschlossen."),
        written("Setze das oder dass ein: Ich freue mich, … du morgen mitkommst.", "dass", "Dass leitet den Nebensatz ein. Er sagt, worüber ich mich freue.", "easy"),
        written("Setze das oder dass ein: Ich suche das Heft, … du mir gestern geborgt hast.", "das", "Das bezieht sich auf Heft und lässt sich durch welches ersetzen.", "easy"),
        written("Setze das oder dass ein: Ich hoffe, … mein Zug rechtzeitig in Wien ankommt.", "dass", "Dass leitet den Nebensatz ein. Das Verb ankommt steht am Ende."),
        written("Setze das oder dass ein: Kannst du mir … neue Spiel erklären?", "das", "Das ist der Artikel zu Spiel: „dieses neue Spiel“."),
        written("Setze das oder dass ein: Der Termin wurde verschoben. … freut mich.", "Das", "Das weist auf die Nachricht davor hin. Am Satzanfang beginnt es groß."),
        written("Setze das oder dass ein: … du den Weg kennst, ist praktisch.", "Dass", "Dass leitet auch am Satzanfang einen Nebensatz ein. Das Komma folgt nach kennst."),
        written("Setze das oder dass ein: Auf der Bank liegt ein Tuch, … niemand abgeholt hat.", "das", "Das bezieht sich auf das Tuch. Ersatzprobe: „welches niemand abgeholt hat“."),
        written("Ersetze „das“ in „Das überrascht niemanden“ durch ein Demonstrativpronomen mit vier Buchstaben.", "Dies", "„Dies überrascht niemanden“ zeigt, dass Das auf etwas hinweist."),
        written("Ersetze das zweite „das“ in „Das Zimmer, das nach Süden zeigt, ist hell“ durch das passende Relativpronomen.", "welches", "„Das Zimmer, welches nach Süden zeigt, ist hell.“"),
        written("Ersatzprobe: Ersetze „das“ in „Sie liest das Buch“ durch ein passendes Wort.", ["dieses", "jenes"], "„Sie liest dieses Buch“ und „Sie liest jenes Buch“ funktionieren. Das ist hier ein Artikel."),
        passage("Schreibe das oder dass in jede Lücke. Achte auf den Satzanfang.",
          "Lea erzählt, ___ sie morgen einen Ausflug macht. Ihr Bruder zeigt ihr ___ Foto, ___ er am Ziel gemacht hat. „___ sieht schön aus!“, sagt Lea. Sie hofft, ___ es sonnig bleibt.",
          ["dass", "das", "das", "Das", "dass"],
          "Dass eröffnet die Nebensätze nach erzählt und hofft. Das erste das gehört zu Foto, das zweite bezieht sich darauf. Das am Satzanfang weist auf das Gesehene hin."),
        passage("Ergänze den Text zum Wandertag mit das oder dass.",
          "Wir hoffen, ___ ___ Wetter bis Mittag schön bleibt. ___ Kind, ___ die Karte trägt, geht vorne. Die Lehrerin sagt, ___ wir eine Pause machen. ___ finden alle gut.",
          ["dass", "das", "Das", "das", "dass", "Das"],
          "Nach hoffen und sagt leitet dass den Nebensatz ein. Das vor Wetter und Kind ist ein Artikel. Das nach Kind ist ein Relativpronomen. Das im letzten Satz bezieht sich auf die Pause."),
        passage("Finde die passenden Formen von das und dass.",
          "Ich weiß, ___ morgen ein Bücherflohmarkt stattfindet. Dort suche ich ein Buch, ___ schon lange auf meiner Wunschliste steht. Wenn ich ___ Buch finde, kaufe ich es. ___ habe ich mir fest vorgenommen.",
          ["dass", "das", "das", "Das"],
          "Dass leitet nach weiß den Nebensatz ein. Das nach Buch ist ein Relativpronomen, das vor Buch ein Artikel. Das im letzten Satz ist ein Demonstrativpronomen.")
      ]
    }
  }
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
    ["deutsch", "📚", "Nominalisierung von Verben und Adjektiven · das oder dass?", "Regeln · Lückentexte · Quiz"],
    ["englisch", "🇬🇧", "Irregular Verbs, Wortschatz und eigene Wortlisten", "Forms · Training · Wiederholung"],
    ["physik", "⚡", "Bewegung, Geschwindigkeit und Kräfte", "Lernen · Rechnen · Test"]
  ],
  modules: { deutsch, englisch, physik }
};
})();
