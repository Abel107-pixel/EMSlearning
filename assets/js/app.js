(() => {
"use strict";
const $ = (s, root=document) => root.querySelector(s);
const main = $("#main");
const STORE = "emsLearning.v1";
const DEMO_PASSWORD = "ems-demo-2026"; // Nur Demo: im öffentlichen Quellcode sichtbar.
let config = {maintenanceMode:false,maintenanceMessage:"Wir sind gleich zurück! Währenddessen kannst du ein Minispiel spielen.",subjects:{
  deutsch:{active:true,updated:false,title:"Deutsch",testDate:""},
  englisch:{active:true,updated:false,title:"Englisch",testDate:""},
  physik:{active:true,updated:true,title:"Physik",testDate:"2026-11-24"}
}};
let state = loadState(), isAdmin = sessionStorage.getItem("emsAdmin") === "yes";
let sessionStart = Date.now(), timeTimer = null, currentQuiz = null;

function loadState(){
  try { return {...{xp:0,done:0,badges:[],daily:{},lastStudy:"",streak:0,subjects:{}},...JSON.parse(localStorage.getItem(STORE)||"{}")}; }
  catch { return {xp:0,done:0,badges:[],daily:{},lastStudy:"",streak:0,subjects:{}}; }
}
function save(){ localStorage.setItem(STORE,JSON.stringify(state)); updateTop(); }
function today(){ return new Date().toLocaleDateString("en-CA"); }
function updateTop(){
  $("#xpPill").textContent = `${state.xp} XP`;
  $("#levelPill").textContent = `Level ${Math.floor(state.xp/100)+1}`;
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
async function loadConfig(){
  try {
    const response = await fetch(`config.json?v=${Date.now()}`,{cache:"no-store"});
    if(response.ok) config = {...config,...await response.json()};
  } catch(e){ console.warn("config.json konnte nicht geladen werden; Standardwerte werden verwendet.",e); }
}
function hasActiveLearningOn(date){
  return Object.values(config.subjects||{}).some(s=>s.active && (!s.testDate || s.testDate>=date));
}
function addStudy(seconds, xp=0){
  const d=today(); state.daily[d]=(state.daily[d]||0)+seconds;
  if(xp>0){
    state.xp+=xp; state.done++;
    if(state.lastStudy!==d){
      if(!state.lastStudy) state.streak=1;
      else {
        let gapHasActiveContent=false;
        const cursor=new Date(state.lastStudy+"T00:00:00");
        cursor.setDate(cursor.getDate()+1);
        const end=new Date(d+"T00:00:00");
        while(cursor<end){
          const day=cursor.toLocaleDateString("en-CA");
          if(hasActiveLearningOn(day)){gapHasActiveContent=true;break;}
          cursor.setDate(cursor.getDate()+1);
        }
        state.streak=gapHasActiveContent?1:(state.streak||1)+1;
      }
      state.lastStudy=d;
    }
  }
  save();
}
function startTracking(){
  clearInterval(timeTimer);
  sessionStart=Date.now();
  timeTimer=setInterval(()=>{
    const secs=Math.floor((Date.now()-sessionStart)/1000);
    if(secs>=15){ addStudy(15,0); sessionStart=Date.now(); }
  },15000);
}
function testLabel(date){
  if(!date) return "";
  const d=new Date(date+"T00:00:00"), now=new Date(today()+"T00:00:00");
  const diff=Math.round((d-now)/86400000);
  if(diff<0)return "Abgelaufen";
  if(diff===0)return "Heute";
  return `Noch ${diff} Tage`;
}
function gate(){
  if(localStorage.getItem("emsSchoolGate")==="yes") return false;
  main.innerHTML=`<section class="gate-card panel"><div class="brand-mark" style="margin:auto">E</div><p class="eyebrow">EMS PAMHAGEN</p><h1>Willkommen bei EMS Learning</h1><p class="muted">Besuchst du die EMS Pamhagen?</p><div class="choice"><button class="btn" id="gateYes">Ja, ich besuche sie</button><button class="btn secondary" id="gateNo">Nein</button></div></section>`;
  $("#gateYes").onclick=()=>{localStorage.setItem("emsSchoolGate","yes");render();};
  $("#gateNo").onclick=()=>{main.innerHTML=`<section class="gate-card panel"><h1>Entschuldigung!</h1><p>Das ist nicht für dich.</p></section>`;};
  return true;
}
function maintenance(){
  if(!config.maintenanceMode || isAdmin) return false;
  main.innerHTML=`<section class="maintenance panel"><div class="eyebrow">EMS LEARNING · WARTUNG</div><div style="font-size:54px;margin:16px">🛠️ ✨</div><h1>Wir sind gleich zurück!</h1><p class="muted">${esc(config.maintenanceMessage||"Wir verbessern gerade EMS Learning.")}</p><div class="game-box"><div class="eyebrow">KLEINES ZAHLENRÄTSEL</div><h2 id="gameQuestion">7 × 8 = ?</h2><div class="game-options" id="gameOptions"></div><p id="gameFeedback" class="muted">Ein kleiner Zeitvertreib, bis es weitergeht.</p></div><p class="muted">Bitte lade diese Seite später erneut.</p></section>`;
  runMiniGame(); return true;
}
function runMiniGame(){
  const a=2+Math.floor(Math.random()*9),b=2+Math.floor(Math.random()*9),correct=a*b;
  $("#gameQuestion").textContent=`${a} × ${b} = ?`;
  const opts=[correct,correct+2,Math.max(1,correct-3),correct+10].sort(()=>Math.random()-.5);
  $("#gameOptions").innerHTML=opts.map(n=>`<button data-v="${n}">${n}</button>`).join("");
  $("#gameOptions").querySelectorAll("button").forEach(btn=>btn.onclick=()=>{
    const ok=Number(btn.dataset.v)===correct;
    $("#gameFeedback").textContent=ok?"Richtig! Sehr gut. 🎉":"Nicht ganz – probiere es noch einmal!";
    if(ok) runMiniGame();
  });
}
function render(){
  clearInterval(timeTimer);
  if(gate()) return;
  if(maintenance()) return;
  const subjects=[
    ["deutsch","📚","Wortarten, Satzanalyse und Grammatikübungen","Lernen · Karten · Quiz"],
    ["englisch","🇬🇧","Irregular Verbs und eigene Wortlisten","Forms · Training · Wiederholung"],
    ["physik","⚡","Bewegung, Geschwindigkeit und Kräfte","Lernen · Rechnen · Test"]
  ];
  const active=subjects.filter(([id])=>config.subjects?.[id]?.active && (!config.subjects[id].testDate || config.subjects[id].testDate>=today()));
  const mins=Math.floor((state.daily[today()]||0)/60);
  main.innerHTML=`<section class="hero"><div class="eyebrow">DEIN LERNPLATZ · EMS PAMHAGEN</div><h1>Heute ein bisschen besser.</h1><p>Bereite dich auf deine Tests vor, übe in deinem Tempo und sammle mit jedem Lernschritt Erfahrungspunkte.</p><div class="stats"><div class="stat"><strong>${state.xp}</strong><span>Gesamte XP</span></div><div class="stat"><strong>${Math.floor(state.xp/100)+1}</strong><span>Level</span></div><div class="stat"><strong>${state.streak||0} 🔥</strong><span>Lernserie</span></div><div class="stat"><strong>${mins} min</strong><span>Heute gelernt</span></div></div></section>
  <div class="section-head"><h2>Deine Lernfächer</h2><small>${active.length} aktive Fächer</small></div>
  <div class="subject-grid">${active.map(([id,icon,desc,meta])=>{const s=config.subjects[id];return `<button class="subject-card ${s.updated?'updated':''}" data-subject="${id}"><span class="subject-icon">${icon}</span><h3>${esc(s.title||id)}</h3><p>${desc}</p><div class="subject-meta"><span class="pill">${meta}</span>${s.updated?'<span class="pill new">NEU AKTUALISIERT</span>':''}${s.testDate?`<span class="pill date">${testLabel(s.testDate)}</span>`:''}</div></button>`}).join("") || `<div class="panel">Momentan sind keine Lernfächer aktiv.</div>`}</div>
  <div class="grid-2"><section class="panel"><h3>🎯 Dein Tagesziel</h3><p class="muted">Lerne in deinem eigenen Tempo. Kein Druck, keine Benachrichtigungen.</p><div class="progress"><div style="width:${Math.min(100,mins/Math.max(1,state.goal||20)*100)}%"></div></div><strong>${mins} / ${state.goal||20} Minuten</strong><label>Dein Tagesziel (Minuten)<input id="goalInput" type="number" min="5" max="180" value="${state.goal||20}"></label><button class="btn secondary" id="saveGoal">Ziel speichern</button></section>
  <section class="panel"><h3>🏅 Deine Auszeichnungen</h3><div class="badge-grid">${badgeCards()}</div></section></div>`;
  main.querySelectorAll("[data-subject]").forEach(b=>b.onclick=()=>openSubject(b.dataset.subject));
  $("#saveGoal").onclick=()=>{state.goal=Math.max(5,Math.min(180,Number($("#goalInput").value)||20));save();render();};
  updateTop();
}
function badgeCards(){
  const items=[["🌱","Erster Schritt",state.done>=1],["📘","Fleißig gelernt",state.done>=10],["🔥","3-Tage-Serie",state.streak>=3],["⭐","100 XP",state.xp>=100]];
  return items.map(([e,n,yes])=>`<div class="badge-card ${yes?'earned':''}"><span>${e}</span><strong>${n}</strong></div>`).join("");
}
const modules={
 deutsch:{title:"Deutsch · Wortarten",intro:"Die zehn Wortarten erkennen und unterscheiden.",lessons:[
 ["Nomen","Nomen werden großgeschrieben. Sie bezeichnen Menschen, Tiere, Dinge oder abstrakte Begriffe. Beispiele: der Vater, die Schule, das Buch, die Liebe."],
 ["Verben","Verben beschreiben Tätigkeiten oder Zustände. Stammformen: Infinitiv – Präteritum – Partizip II, z. B. essen – aß – gegessen."],
 ["Adjektive","Adjektive beschreiben Eigenschaften und lassen sich oft steigern: groß – größer – am größten. Unregelmäßig: gut – besser – am besten."],
 ["Artikel","Bestimmte Artikel: der, die, das. Unbestimmte Artikel: ein, eine. Artikel zeigen Genus, Numerus und Kasus."],
 ["Pronomen","Pronomen ersetzen oder begleiten Nomen: ich, du, er, mein, dieser, jemand, sich."],
 ["Numeralien","Zahlwörter: Grundzahlen (zwei), Ordnungszahlen (der dritte), Wiederholungszahlen (dreimal)."],
 ["Konjunktionen","Bindewörter verbinden Wörter oder Sätze: und, aber, oder, weil, dass. Im Nebensatz steht das Verb oft am Ende."],
 ["Präpositionen","Präpositionen bestimmen häufig einen Fall: mit + Dativ, für + Akkusativ, wegen + Genitiv. Wechselpräpositionen: in, an, auf …"],
 ["Adverbien","Adverbien geben Umstände an: hier (lokal), heute (temporal), gern (modal), deshalb (kausal)."],
 ["Interjektionen","Ausrufewörter drücken Gefühle oder Reaktionen aus: Hurra!, Au!, Pfui!, Hallo!"]
 ],quiz:[
 ["Welche Wortart wird immer großgeschrieben?",["Nomen","Verb","Adjektiv","Adverb"],0,"Nomen werden großgeschrieben."],
 ["Welche drei Formen sind Stammformen?",["Infinitiv, Präteritum, Partizip II","Präsens, Perfekt, Futur","Singular, Plural, Kasus"],0,"Beispiel: essen – aß – gegessen."],
 ["Wie lautet die Steigerung von gut?",["gut – guter – am gutesten","gut – besser – am besten","gut – am besten – besser"],1,"gut – besser – am besten."],
 ["Welche Präposition verlangt den Dativ?",["für","ohne","mit","gegen"],2,"mit + Dativ: mit dem Bus."],
 ["Welche Konjunktion leitet einen Nebensatz ein?",["und","weil","oder","aber"],1,"weil leitet einen Nebensatz ein; das Verb steht am Ende."]
 ]},
 englisch:{title:"Englisch · Irregular Verbs",intro:"Trainiere die drei Formen unregelmäßiger englischer Verben.",lessons:[
 ["Was sind Irregular Verbs?","Unregelmäßige Verben bilden Simple Past und Past Participle nicht einfach mit -ed. Beispiel: go – went – gone."],
 ["Drei Formen","Infinitive – Simple Past – Past Participle. Beispiel: write – wrote – written."],
 ["Lernstrategie","Lerne Verben in Dreiergruppen und wiederhole besonders jene, bei denen du dich vertan hast."]
 ],verbs:[
 ["be","was / were","been","sein"],["become","became","become","werden"],["begin","began","begun","beginnen"],["break","broke","broken","brechen"],["bring","brought","brought","bringen"],["buy","bought","bought","kaufen"],["come","came","come","kommen"],["do","did","done","tun"],["drink","drank","drunk","trinken"],["drive","drove","driven","fahren"],["eat","ate","eaten","essen"],["find","found","found","finden"],["get","got","got / gotten","bekommen"],["give","gave","given","geben"],["go","went","gone","gehen"],["have","had","had","haben"],["know","knew","known","wissen"],["make","made","made","machen"],["see","saw","seen","sehen"],["take","took","taken","nehmen"],["write","wrote","written","schreiben"]
 ]},
 physik:{title:"Physik · Bewegung und Kräfte",intro:"Verstehe Bewegung, Geschwindigkeit und die Wirkung von Kräften.",lessons:[
 ["Ruhe und Bewegung","Ein Körper ist in Ruhe, wenn sich seine Position relativ zu einem gewählten Bezugspunkt nicht verändert. Er ist in Bewegung, wenn sich seine Position mit der Zeit verändert."],
 ["Bewegungsrichtung","Fährt ein Auto geradeaus und biegt dann links ab, ändert sich seine Bewegungsrichtung. Auch wenn die Geschwindigkeit gleich bleibt, hat sich die Bewegung verändert."],
 ["Geschwindigkeit","Die Geschwindigkeit gibt an, welche Strecke ein Körper in einer bestimmten Zeit zurücklegt."],
 ["Kräfte","Eine Kraft kann einen Körper beschleunigen, abbremsen, seine Richtung ändern oder seine Form verändern. Formelzeichen: F; Einheit: Newton (N)."]
 ],formulas:[["Geschwindigkeit","v = s / t"],["Strecke","s = v · t"],["Zeit","t = s / v"]],quiz:[
 ["Ein Radfahrer fährt 100 m in 20 s. Wie schnell ist er?",["2 m/s","5 m/s","20 m/s","120 m/s"],1,"v = s / t = 100 / 20 = 5 m/s."],
 ["Ein Auto fährt 150 km in 2 Stunden. Wie groß ist die Durchschnittsgeschwindigkeit?",["75 km/h","150 km/h","300 km/h"],0,"150 km ÷ 2 h = 75 km/h."],
 ["Ein Läufer läuft 5 m/s für 12 Sekunden. Welche Strecke legt er zurück?",["17 m","60 m","2,4 m"],1,"s = v · t = 5 · 12 = 60 m."],
 ["Ein Zug fährt 180 km mit 90 km/h. Wie lange fährt er?",["3 h","90 min","2 h"],2,"t = s / v = 180 / 90 = 2 h."],
 ["Was ist die Einheit der Kraft?",["Kilogramm","Newton","Meter"],1,"Die Einheit der Kraft ist Newton (N)."],
 ["Ein Auto fährt geradeaus und biegt links ab. Was ändert sich?",["Die Bewegungsrichtung","Die Masse","Die Zeit"],0,"Die Bewegungsrichtung ändert sich."]
 ]}
};
function openSubject(id){
 const m=modules[id]; if(!m)return;
 startTracking();
 let html=`<button class="back" id="backHome">← Zurück</button><section class="panel"><div class="eyebrow">${id.toUpperCase()}</div><h1>${m.title}</h1><p class="muted">${m.intro}</p>`;
 if(m.formulas) html+=`<div class="grid-2">${m.formulas.map(([n,f])=>`<div class="formula">${n}<br>${f}</div>`).join("")}</div>`;
 html+=`<h2>Lernen</h2>${m.lessons.map(([t,d])=>`<div class="lesson-block"><h3>${t}</h3><p class="muted">${d}</p></div>`).join("")}`;
 if(m.verbs) html+=`<h2>Wortliste</h2><div class="lesson-block"><p><b>Infinitive · Simple Past · Past Participle · Deutsch</b></p>${m.verbs.map(v=>`<p>${v.map(esc).join(" · ")}</p>`).join("")}</div><button class="btn" id="verbQuiz">Irregular Verbs üben</button>`;
 if(m.quiz) html+=`<div class="actions"><button class="btn" id="startQuiz">Quiz starten</button></div>`;
 html+=`</section>`;
 main.innerHTML=html; $("#backHome").onclick=render;
 if(m.quiz) $("#startQuiz").onclick=()=>startQuiz(id);
 if(m.verbs) $("#verbQuiz").onclick=()=>startVerbQuiz();
}
function startQuiz(id){
 startTracking();
 const qs=modules[id].quiz;
 currentQuiz={id,qs:[...qs].sort(()=>Math.random()-.5),i:0,correct:0,answered:false};
 showQuestion();
}
function showQuestion(){
 const q=currentQuiz.qs[currentQuiz.i];
 main.innerHTML=`<button class="back" id="quizBack">← Zurück</button><section class="panel"><div class="eyebrow">${currentQuiz.id.toUpperCase()} · FRAGE ${currentQuiz.i+1}/${currentQuiz.qs.length}</div><div class="progress"><div style="width:${currentQuiz.i/currentQuiz.qs.length*100}%"></div></div><h2>${q[0]}</h2><div class="answers">${q[1].map((a,i)=>`<button class="answer" data-answer="${i}">${a}</button>`).join("")}</div><div id="feedback"></div><div class="actions"><button class="btn" id="next" disabled>${currentQuiz.i===currentQuiz.qs.length-1?"Ergebnis":"Weiter"}</button></div></section>`;
 $("#quizBack").onclick=render;
 main.querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>answer(Number(b.dataset.answer)));
 $("#next").onclick=()=>{if(currentQuiz.i<currentQuiz.qs.length-1){currentQuiz.i++;showQuestion()}else finishQuiz()};
}
function answer(i){
 const q=currentQuiz.qs[currentQuiz.i]; if(currentQuiz.answered)return; currentQuiz.answered=true;
 const good=i===q[2]; if(good)currentQuiz.correct++;
 main.querySelectorAll("[data-answer]").forEach((b,n)=>{b.disabled=true;if(n===q[2])b.classList.add("correct");else if(n===i)b.classList.add("wrong")});
 $("#feedback").innerHTML=`<div class="feedback ${good?'good':'bad'}">${good?'Richtig! +10 XP':'Noch nicht ganz. +2 XP'}<br>${q[3]}</div>`;
 $("#next").disabled=false;
}
function finishQuiz(){
 const earned=currentQuiz.correct*10+(currentQuiz.qs.length-currentQuiz.correct)*2;
 addStudy(1,earned);
 const pct=Math.round(currentQuiz.correct/currentQuiz.qs.length*100);
 if(pct>=50&&!state.badges.includes("practice50"))state.badges.push("practice50");
 main.innerHTML=`<section class="panel center-screen"><div style="font-size:48px">🎉</div><h1>Gut gemacht!</h1><h2>${currentQuiz.correct} / ${currentQuiz.qs.length} richtig</h2><p class="muted">${pct}% · ${earned} XP gesammelt</p><button class="btn" id="finishBack">Zur Übersicht</button></section>`;
 $("#finishBack").onclick=render;save();
}
function startVerbQuiz(){
 startTracking();
 const verbs=modules.englisch.verbs;
 const deck=[...verbs].sort(()=>Math.random()-.5).slice(0,8);
 const all=verbs.map(v=>`${v[1]} · ${v[2]}`);
 const qs=deck.map(v=>{
   const correct=`${v[1]} · ${v[2]}`;
   const choices=[correct,...all.filter(x=>x!==correct).sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5);
   return [`Welche Formen gehören zu „${v[0]}“?`,choices,choices.indexOf(correct),`Simple Past: ${v[1]} · Past Participle: ${v[2]} · ${v[3]}`];
 });
 currentQuiz={id:"englisch",qs,i:0,correct:0,answered:false};
 showQuestion();
}
function admin(){
 const pass=prompt("Admin-Passwort:");
 if(pass!==DEMO_PASSWORD){alert("Falsches Passwort.");return;}
 isAdmin=true;sessionStorage.setItem("emsAdmin","yes");renderAdmin();
}
function renderAdmin(){
 main.innerHTML=`<button class="back" id="adminBack">← Zur Website</button><section class="panel"><div class="eyebrow">EMS LEARNING · ADMIN</div><h1>Admin Center</h1><p class="muted">Diese Oberfläche ist eine lokale Prototyp-Vorschau. Änderungen hier werden nicht zu GitHub hochgeladen.</p><div class="toast">Demo-Admin aktiv. Für öffentliche Änderungen bitte <b>config.json</b> im GitHub-Repository bearbeiten.</div>
 <h2>Wartungsmodus</h2><div class="admin-row"><div><b>Wartung aktivieren</b><div class="muted">Normale Besucher sehen den Minispiel-Bildschirm.</div></div><button id="maintToggle" class="switch ${config.maintenanceMode?'on':''}" aria-label="Wartungsmodus umschalten"></button></div>
 <h2>Fächer</h2>${Object.entries(config.subjects).map(([id,s])=>`<div class="admin-row"><div><b>${esc(s.title||id)}</b><div class="muted">Aktiv / sichtbar</div></div><button class="switch ${s.active?'on':''}" data-active="${id}"></button></div><div class="grid-2"><label>Testtermin<input type="date" data-date="${id}" value="${s.testDate||''}"></label><label>Aktualisiert<select data-updated="${id}"><option value="false" ${!s.updated?'selected':''}>Nein</option><option value="true" ${s.updated?'selected':''}>Ja</option></select></label></div>`).join("")}
 <div class="actions"><button class="btn" id="showConfig">config.json anzeigen</button><button class="btn secondary" id="logout">Abmelden</button></div><pre id="configPreview" class="panel hidden" style="white-space:pre-wrap;overflow:auto"></pre></section>`;
 $("#adminBack").onclick=render;
 $("#maintToggle").onclick=()=>{config.maintenanceMode=!config.maintenanceMode;renderAdmin()};
 main.querySelectorAll("[data-active]").forEach(b=>b.onclick=()=>{const s=config.subjects[b.dataset.active];s.active=!s.active;renderAdmin()});
 main.querySelectorAll("[data-date]").forEach(i=>i.onchange=()=>{config.subjects[i.dataset.date].testDate=i.value});
 main.querySelectorAll("[data-updated]").forEach(i=>i.onchange=()=>{config.subjects[i.dataset.updated].updated=i.value==="true"});
 $("#showConfig").onclick=()=>{$("#configPreview").textContent=JSON.stringify(config,null,2);$("#configPreview").classList.toggle("hidden")};
 $("#logout").onclick=()=>{isAdmin=false;sessionStorage.removeItem("emsAdmin");render()};
}
$("#adminEntry").onclick=admin;
(async()=>{await loadConfig();updateTop();render()})();
})();