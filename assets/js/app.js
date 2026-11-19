(() => {
"use strict";
const $  = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const main = $("#main");
const DATA = window.EMS_DATA;
const MODULES = DATA.modules;

/* ---------- Konstanten ---------- */
const DEMO_PASSWORD = "ems-demo-2026"; // Nur Demo: im öffentlichen Quellcode sichtbar.
const HEART_MAX = 5;
const HEART_REGEN_MS = 20 * 60 * 1000; // 1 Herz pro 20 Minuten
const KEYS = {
  profiles: "emsLearning.profiles",
  profileState: id => "emsLearning.profile." + id,
  groups: "emsLearning.groups",
  theme: "emsLearning.theme",
  gate: "emsSchoolGate",
  admin: "emsAdmin"
};

const REWARD_POOL = [
  {id:"fox", type:"avatar", name:"Fuchs", icon:"🦊", rarity:"common"},
  {id:"owl", type:"avatar", name:"Eule", icon:"🦉", rarity:"common"},
  {id:"raccoon", type:"avatar", name:"Waschbär", icon:"🦝", rarity:"common"},
  {id:"koala", type:"avatar", name:"Koala", icon:"🐨", rarity:"common"},
  {id:"wolf", type:"avatar", name:"Wolf", icon:"🐺", rarity:"rare"},
  {id:"unicorn", type:"avatar", name:"Einhorn", icon:"🦄", rarity:"rare"},
  {id:"dragon", type:"avatar", name:"Drache", icon:"🐉", rarity:"epic"},
  {id:"phoenix", type:"avatar", name:"Phönix", icon:"🔥🐦", rarity:"legendary"},
  {id:"skin-forest", type:"picoSkin", name:"Pico · Wald", icon:"🌲", rarity:"common", colors:{a:"#5C8A3A",b:"#79A852",c:"#3E6626",d:"#1C2B14",e:"#2E4A1E",f:"#9FD47A"}},
  {id:"skin-sunset", type:"picoSkin", name:"Pico · Sonnenuntergang", icon:"🌅", rarity:"common", colors:{a:"#E85E8A",b:"#F08AAE",c:"#B93F66",d:"#241019",e:"#8F2E4D",f:"#FFB4CE"}},
  {id:"skin-arctic", type:"picoSkin", name:"Pico · Arktis", icon:"❄️", rarity:"rare", colors:{a:"#5EA8C9",b:"#8AC6E0",c:"#3D7D99",d:"#10232B",e:"#2E5A6E",f:"#C8EEFF"}},
  {id:"skin-royal", type:"picoSkin", name:"Pico · Königlich", icon:"👑", rarity:"legendary", colors:{a:"#8A5CE8",b:"#AE8AF0",c:"#663FB9",d:"#190F24",e:"#4D2E8F",f:"#E0C8FF"}},
  {id:"acc-glasses", type:"accessory", name:"Sonnenbrille", icon:"🕶️", rarity:"common"},
  {id:"acc-scarf", type:"accessory", name:"Schal", icon:"🧣", rarity:"common"},
  {id:"acc-bow", type:"accessory", name:"Schleife", icon:"🎀", rarity:"rare"},
  {id:"acc-crown", type:"accessory", name:"Krone", icon:"👑", rarity:"legendary"},
  {id:"frame-silver", type:"frame", name:"Silberrahmen", icon:"🥈", rarity:"rare"},
  {id:"frame-gold", type:"frame", name:"Goldrahmen", icon:"🥇", rarity:"epic"},
  {id:"frame-legendary", type:"frame", name:"Legendärer Rahmen", icon:"💎", rarity:"legendary"}
];
const CHEST_ODDS = {
  wooden:    {common:.70, rare:.25, epic:.05, legendary:0},
  silver:    {common:.45, rare:.40, epic:.14, legendary:.01},
  gold:      {common:.15, rare:.45, epic:.33, legendary:.07},
  legendary: {common:0,   rare:.20, epic:.55, legendary:.25}
};
const CHEST_INFO = {
  wooden:{name:"Holzkiste", icon:"🪵"}, silver:{name:"Silberkiste", icon:"🥈"},
  gold:{name:"Goldkiste", icon:"🥇"}, legendary:{name:"Legendäre Kiste", icon:"💎"}
};
const ACHIEVEMENTS = [
  {id:"a1", name:"Erster Schritt", icon:"🌱", test:s=>s.done>=1, chest:"wooden"},
  {id:"a2", name:"Fleißig gelernt", icon:"📘", test:s=>s.done>=10, chest:"wooden"},
  {id:"a3", name:"Lernmarathon", icon:"🏃", test:s=>s.done>=50, chest:"silver"},
  {id:"a4", name:"3-Tage-Serie", icon:"🔥", test:s=>s.streak>=3, chest:"wooden"},
  {id:"a5", name:"7-Tage-Serie", icon:"🔥", test:s=>s.streak>=7, chest:"silver"},
  {id:"a6", name:"30-Tage-Serie", icon:"🔥", test:s=>s.streak>=30, chest:"gold"},
  {id:"a7", name:"100 XP", icon:"⭐", test:s=>s.xp>=100, chest:"wooden"},
  {id:"a8", name:"1000 XP", icon:"🌟", test:s=>s.xp>=1000, chest:"silver"},
  {id:"a9", name:"Perfektes Quiz", icon:"🎯", test:s=>s.perfectCount>=1, chest:"wooden"},
  {id:"a10", name:"Fach-Meister", icon:"🏆", test:s=>Object.keys(s.subjectStats||{}).filter(k=>s.subjectStats[k].quizzes>0).length>=3, chest:"gold"}
];

/* ---------- Hilfsfunktionen ---------- */
function esc(s){ return String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function today(){ return new Date().toLocaleDateString("en-CA"); }
function shuffle(arr){ return [...arr].sort(()=>Math.random()-.5); }
function uid(){ return Math.random().toString(36).slice(2,10) + Date.now().toString(36); }
function readJSON(key, fallback){ try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function writeJSON(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

/* ---------- Konfiguration (config.json, Wartungsmodus / Fächer) ---------- */
let config = {maintenanceMode:false, maintenanceMessage:"Wir sind gleich zurück! Währenddessen kannst du ein Minispiel spielen.", subjects:{
  deutsch:{active:false, updated:false, title:"Deutsch", testDate:""},
  englisch:{active:true, updated:false, title:"Englisch", testDate:""},
  physik:{active:true, updated:true, testDate:""}
}};
async function loadConfig(){
  try {
    const r = await fetch(`config.json?v=${Date.now()}`, {cache:"no-store"});
    if (r.ok) config = {...config, ...await r.json()};
  } catch(e){ console.warn("config.json konnte nicht geladen werden; Standardwerte werden verwendet.", e); }
}
function hasActiveLearningOn(date){
  return Object.values(config.subjects||{}).some(s=>s.active && (!s.testDate || s.testDate>=date));
}

/* ---------- Theme (Dark / White / System) ---------- */
function applyTheme(){
  const pref = localStorage.getItem(KEYS.theme) || "dark";
  const effective = pref === "system"
    ? (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
    : pref;
  document.documentElement.setAttribute("data-theme", effective);
}
function setThemePref(p){ localStorage.setItem(KEYS.theme, p); applyTheme(); renderThemeButton(); }
function renderThemeButton(){
  const btn = $("#themeToggle"); if (!btn) return;
  const pref = localStorage.getItem(KEYS.theme) || "dark";
  const icons = {dark:"🌙", light:"☀️", system:"🖥️"};
  btn.textContent = icons[pref] || "🌙";
  btn.title = "Darstellung: " + ({dark:"Dunkel", light:"Hell", system:"System"}[pref]);
}
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: light)").addEventListener?.("change", ()=>{
    if ((localStorage.getItem(KEYS.theme)||"dark") === "system") applyTheme();
  });
}

/* ---------- Profile ---------- */
function getProfilesMeta(){ return readJSON(KEYS.profiles, {activeId:null, list:[]}); }
function saveProfilesMeta(m){ writeJSON(KEYS.profiles, m); }
function freshState(){
  return {
    xp:0, done:0, achievements:[], daily:{}, xpLog:{}, lastStudy:"", streak:0, goal:20,
    subjectStats:{}, hearts:{count:HEART_MAX, lastRegenAt:Date.now()},
    shards:0, chests:{wooden:0, silver:0, gold:0, legendary:0},
    inventory:{avatars:["fox"], picoSkins:["default"], accessories:["none"], frames:["none"]},
    equipped:{avatar:"fox", picoSkin:"default", accessory:"none", frame:"none"},
    perfectCount:0
  };
}
function getState(id){
  const s = readJSON(KEYS.profileState(id), null);
  if (!s) return freshState();
  // Migration / Absicherung fehlender Felder bei älteren Speichern
  return {...freshState(), ...s, hearts:{...freshState().hearts, ...(s.hearts||{})}, inventory:{...freshState().inventory, ...(s.inventory||{})}, equipped:{...freshState().equipped, ...(s.equipped||{})}};
}
function saveState(id, s){ writeJSON(KEYS.profileState(id), s); }

let activeProfileId = null;
let state = null;

function regenHearts(s){
  const now = Date.now();
  if (s.hearts.count >= HEART_MAX) { s.hearts.lastRegenAt = now; return; }
  const elapsed = now - s.hearts.lastRegenAt;
  const gained = Math.floor(elapsed / HEART_REGEN_MS);
  if (gained > 0) {
    s.hearts.count = Math.min(HEART_MAX, s.hearts.count + gained);
    s.hearts.lastRegenAt += gained * HEART_REGEN_MS;
  }
}
function heartsRow(s){
  regenHearts(s);
  let hearts = "";
  for (let i=0;i<HEART_MAX;i++) hearts += `<span class="heart ${i<s.hearts.count?'full':'empty'}">${i<s.hearts.count?'❤️':'🤍'}</span>`;
  let note = "";
  if (s.hearts.count < HEART_MAX) {
    const remain = HEART_REGEN_MS - (Date.now() - s.hearts.lastRegenAt);
    const mins = Math.max(1, Math.ceil(remain/60000));
    note = `<small class="muted">Nächstes Herz in ~${mins} Min.</small>`;
  }
  return `<div class="hearts-row">${hearts}${note}</div>`;
}

function addStudy(seconds, xp=0, subjectId=null, difficultyXp=null){
  const d = today();
  state.daily[d] = (state.daily[d]||0) + seconds;
  if (xp > 0) {
    state.xp += xp; state.done++;
    state.xpLog[d] = (state.xpLog[d]||0) + xp;
    if (subjectId) {
      state.subjectStats[subjectId] = state.subjectStats[subjectId] || {xp:0, done:0, quizzes:0};
      state.subjectStats[subjectId].xp += xp;
      state.subjectStats[subjectId].done += 1;
    }
    if (state.lastStudy !== d) {
      if (!state.lastStudy) state.streak = 1;
      else {
        let gapHasActiveContent = false;
        const cursor = new Date(state.lastStudy + "T00:00:00");
        cursor.setDate(cursor.getDate()+1);
        const end = new Date(d + "T00:00:00");
        while (cursor < end) {
          const day = cursor.toLocaleDateString("en-CA");
          if (hasActiveLearningOn(day)) { gapHasActiveContent = true; break; }
          cursor.setDate(cursor.getDate()+1);
        }
        state.streak = gapHasActiveContent ? 1 : (state.streak||1)+1;
      }
      state.lastStudy = d;
    }
  }
  checkLevelRewards();
  checkAchievements();
  persist();
}
let lastLevelAwarded = 0;
function checkLevelRewards(){
  const level = Math.floor(state.xp/100)+1;
  if (level > (state._lastLevel||1)) {
    const gained = level - (state._lastLevel||1);
    state._lastLevel = level;
    for (let i=0;i<gained;i++){
      grantChest("wooden");
      if (level % 5 === 0) grantChest("silver");
    }
    toast(`Level ${level} erreicht! +Kiste(n) im Inventar 🎁`);
  }
}
function grantChest(tier){ state.chests[tier] = (state.chests[tier]||0)+1; }
function checkAchievements(){
  ACHIEVEMENTS.forEach(a=>{
    if (!state.achievements.includes(a.id) && a.test(state)) {
      state.achievements.push(a.id);
      grantChest(a.chest);
      toast(`Achievement freigeschaltet: ${a.icon} ${a.name}`);
    }
  });
}
function persist(){ if (activeProfileId) saveState(activeProfileId, state); updateTop(); }
function updateTop(){
  const xpPill = $("#xpPill"), lvlPill = $("#levelPill");
  if (xpPill) xpPill.textContent = `${state.xp} XP`;
  if (lvlPill) lvlPill.textContent = `Level ${Math.floor(state.xp/100)+1}`;
}

let sessionStart = Date.now(), timeTimer = null, heartTimer = null, currentQuiz = null;
function startTracking(){
  clearInterval(timeTimer); sessionStart = Date.now();
  timeTimer = setInterval(()=>{
    const secs = Math.floor((Date.now()-sessionStart)/1000);
    if (secs >= 15) { addStudy(15,0); sessionStart = Date.now(); }
  }, 15000);
}
function startHeartTimer(){
  clearInterval(heartTimer);
  heartTimer = setInterval(()=>{ if (state){ regenHearts(state); persist(); if ($(".hearts-row")) render(currentScreen); } }, 60000);
}

let toastTimer = null;
function toast(msg){
  let el = $("#globalToast");
  if (!el) { el = document.createElement("div"); el.id="globalToast"; el.className="global-toast"; document.body.appendChild(el); }
  el.textContent = msg; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>el.classList.remove("show"), 3200);
}

function testLabel(date){
  if (!date) return "";
  const d = new Date(date+"T00:00:00"), now = new Date(today()+"T00:00:00");
  const diff = Math.round((d-now)/86400000);
  if (diff<0) return "Abgelaufen";
  if (diff===0) return "Heute";
  return `Noch ${diff} Tage`;
}

/* ---------- Pico Maskottchen ---------- */
const PICO_DEFAULT_COLORS = {a:"#E8793E", b:"#F08A4B", c:"#D96735", d:"#24150F", e:"#8F3E27", f:"#FFB477"};
function picoColors(){
  const skinId = state?.equipped?.picoSkin;
  const skin = REWARD_POOL.find(r=>r.id===skinId && r.type==="picoSkin");
  return skin?.colors || PICO_DEFAULT_COLORS;
}
function mascotMarkup(mood="idle", small=false){
  const c = picoColors();
  const accId = state?.equipped?.accessory;
  const accIcon = accId && accId!=="none" ? REWARD_POOL.find(r=>r.id===accId)?.icon : "";
  return `<div class="mascot-wrap mood-${mood}" aria-label="Pico, dein Lernbegleiter" role="img">
    <div class="mascot-acc">${accIcon||""}</div>
    <svg class="mascot" viewBox="0 0 96 88" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" aria-hidden="true">
    <g class="mascot-shadow"><rect x="24" y="78" width="48" height="5" rx="2"/></g>
    <g class="mascot-body">
      <rect x="25" y="17" width="46" height="42" fill="${c.a}"/><rect x="19" y="25" width="58" height="30" fill="${c.b}"/><rect x="29" y="10" width="38" height="10" fill="${c.b}"/>
      <rect x="12" y="34" width="10" height="19" fill="${c.c}"/><rect x="6" y="43" width="9" height="8" fill="${c.c}"/><rect x="74" y="34" width="10" height="19" fill="${c.c}"/><rect x="81" y="43" width="9" height="8" fill="${c.c}"/>
      <rect x="29" y="56" width="12" height="17" fill="${c.c}"/><rect x="55" y="56" width="12" height="17" fill="${c.c}"/><rect x="25" y="70" width="18" height="7" fill="${c.e}"/><rect x="53" y="70" width="18" height="7" fill="${c.e}"/>
      <rect x="34" y="30" width="8" height="10" fill="${c.d}"/><rect x="55" y="30" width="8" height="10" fill="${c.d}"/><rect x="43" y="46" width="10" height="4" fill="${c.e}"/>
      <rect x="29" y="20" width="7" height="4" fill="${c.f}"/><rect x="60" y="20" width="7" height="4" fill="${c.f}"/>
    </g></svg><span class="mascot-name">Pico</span></div>`;
}
function setMascotMood(mood){
  const el = $(".mascot-wrap"); if (!el) return;
  el.classList.remove("mood-idle","mood-happy","mood-oops","mood-celebrate");
  el.classList.add(`mood-${mood}`);
}

/* ---------- Gate / Wartung ---------- */
function gate(){
  if (localStorage.getItem(KEYS.gate) === "yes") return false;
  main.innerHTML = `<section class="gate-card panel"><div class="brand-mark" style="margin:auto">E</div><p class="eyebrow">EMS PAMHAGEN</p><h1>Willkommen bei EMS Learning</h1><p class="muted">Besuchst du die EMS Pamhagen?</p><div class="choice"><button class="btn" id="gateYes">Ja, ich besuche sie</button><button class="btn secondary" id="gateNo">Nein</button></div></section>`;
  $("#gateYes").onclick = ()=>{ localStorage.setItem(KEYS.gate,"yes"); boot(); };
  $("#gateNo").onclick = ()=>{ main.innerHTML = `<section class="gate-card panel"><h1>Entschuldigung!</h1><p>Das ist nicht für dich.</p></section>`; };
  return true;
}
let isAdmin = sessionStorage.getItem(KEYS.admin) === "yes";
function maintenance(){
  if (!config.maintenanceMode || isAdmin) return false;
  main.innerHTML = `<section class="maintenance panel"><div class="eyebrow">EMS LEARNING · WARTUNG</div><div style="font-size:54px;margin:16px">🛠️ ✨</div><h1>Wir sind gleich zurück!</h1><p class="muted">${esc(config.maintenanceMessage||"Wir verbessern gerade EMS Learning.")}</p><div class="game-box"><div class="eyebrow">KLEINES ZAHLENRÄTSEL</div><h2 id="gameQuestion">7 × 8 = ?</h2><div class="game-options" id="gameOptions"></div><p id="gameFeedback" class="muted">Ein kleiner Zeitvertreib, bis es weitergeht.</p></div><p class="muted">Bitte lade diese Seite später erneut.</p></section>`;
  runMiniGame(); return true;
}
function runMiniGame(){
  const a=2+Math.floor(Math.random()*9), b=2+Math.floor(Math.random()*9), correct=a*b;
  $("#gameQuestion").textContent = `${a} × ${b} = ?`;
  const opts = [correct, correct+2, Math.max(1,correct-3), correct+10].sort(()=>Math.random()-.5);
  $("#gameOptions").innerHTML = opts.map(n=>`<button data-v="${n}">${n}</button>`).join("");
  $$("#gameOptions button").forEach(btn=>btn.onclick=()=>{
    const ok = Number(btn.dataset.v)===correct;
    $("#gameFeedback").textContent = ok ? "Richtig! Sehr gut. 🎉" : "Nicht ganz – probiere es noch einmal!";
    if (ok) runMiniGame();
  });
}

/* ---------- Profilauswahl ---------- */
function profileScreen(){
  const meta = getProfilesMeta();
  main.innerHTML = `<section class="panel center-screen">
    <div class="brand-mark" style="margin:auto">E</div>
    <p class="eyebrow">EMS LEARNING</p>
    <h1>Wer lernt gerade?</h1>
    <div class="profile-grid">
      ${meta.list.map(p=>{
        const s = getState(p.id);
        const av = REWARD_POOL.find(r=>r.id===s.equipped.avatar)?.icon || "🦊";
        return `<button class="profile-card frame-${s.equipped.frame||'none'}" data-pick="${p.id}"><span class="profile-avatar">${av}</span><b>${esc(p.name)}</b><small class="muted">Level ${Math.floor(s.xp/100)+1} · ${s.xp} XP</small></button>`;
      }).join("") || `<p class="muted">Noch kein Profil vorhanden. Lege dein erstes Profil an!</p>`}
      <button class="profile-card profile-add" id="addProfile"><span class="profile-avatar">➕</span><b>Neues Profil</b></button>
    </div>
  </section>`;
  $$("[data-pick]").forEach(b=>b.onclick=()=>switchProfile(b.dataset.pick));
  $("#addProfile").onclick = ()=>{
    const name = prompt("Wie heißt du?");
    if (!name || !name.trim()) return;
    const id = uid();
    meta.list.push({id, name:name.trim(), createdAt:Date.now()});
    saveProfilesMeta(meta);
    saveState(id, freshState());
    switchProfile(id);
  };
}
function switchProfile(id){
  const meta = getProfilesMeta();
  meta.activeId = id; saveProfilesMeta(meta);
  activeProfileId = id;
  state = getState(id);
  regenHearts(state); persist();
  startHeartTimer();
  render("home");
}

/* ---------- Topbar / Layout ---------- */
function layoutShell(){
  const topStats = $("#top-stats-slot");
  if (!topStats) return;
}
function profileLabel(){
  if (!activeProfileId) return "";
  const meta = getProfilesMeta();
  const p = meta.list.find(p=>p.id===activeProfileId);
  return p ? p.name : "";
}

/* ---------- Home ---------- */
let currentScreen = "home";
function render(screen="home"){
  currentScreen = screen;
  clearInterval(timeTimer);
  if (gate()) return;
  if (maintenance()) return;
  if (!activeProfileId) { profileScreen(); return; }
  regenHearts(state);
  const screens = {home, stats:statsScreen, rewards:rewardsScreen, achievements:achievementsScreen, leaderboard:leaderboardScreen, admin:renderAdmin};
  (screens[screen]||home)();
  updateTop();
}
function switchProfilesLink(){ return `<button class="text-button" id="switchProfile">Profil wechseln (${esc(profileLabel())})</button>`; }

function home(){
  const subjectsDef = DATA.subjects;
  const active = subjectsDef.filter(([id])=>config.subjects?.[id]?.active && (!config.subjects[id].testDate || config.subjects[id].testDate>=today()));
  const mins = Math.floor((state.daily[today()]||0)/60);
  main.innerHTML = `<section class="hero"><div class="hero-content"><div><div class="eyebrow">DEIN LERNPLATZ · EMS PAMHAGEN</div><h1>Hallo, ${esc(profileLabel())}! 👋</h1><p>Bereite dich auf deine Tests vor, übe in deinem Tempo und sammle mit jedem Lernschritt Erfahrungspunkte.</p>${switchProfilesLink()}</div>${mascotMarkup('idle')}<div class="stats"><div class="stat"><strong>${state.xp}</strong><span>Gesamte XP</span></div><div class="stat"><strong>${Math.floor(state.xp/100)+1}</strong><span>Level</span></div><div class="stat"><strong>${state.streak||0} 🔥</strong><span>Lernserie</span></div><div class="stat"><strong>${mins} min</strong><span>Heute gelernt</span></div></div>${heartsRow(state)}</div></section>
  <div class="section-head"><h2>Deine Lernfächer</h2><small>${active.length} aktive Fächer</small></div>
  <div class="subject-grid">${active.map(([id,icon,desc,meta])=>{const s=config.subjects[id];return `<button class="subject-card ${s.updated?'updated':''}" data-subject="${id}"><span class="subject-icon">${icon}</span><h3>${esc(s.title||id)}</h3><p>${desc}</p><div class="subject-meta"><span class="pill">${meta}</span>${s.updated?'<span class="pill new">NEU AKTUALISIERT</span>':''}${s.testDate?`<span class="pill date">${testLabel(s.testDate)}</span>`:''}</div></button>`}).join("") || `<div class="panel">Momentan sind keine Lernfächer aktiv.</div>`}</div>
  <div class="grid-2"><section class="panel"><h3>🎯 Dein Tagesziel</h3><p class="muted">Lerne in deinem eigenen Tempo. Kein Druck, keine Benachrichtigungen.</p><div class="progress"><div style="width:${Math.min(100,mins/Math.max(1,state.goal||20)*100)}%"></div></div><strong>${mins} / ${state.goal||20} Minuten</strong><label>Dein Tagesziel (Minuten)<input id="goalInput" type="number" min="5" max="180" value="${state.goal||20}"></label><button class="btn secondary" id="saveGoal">Ziel speichern</button></section>
  <section class="panel"><h3>🏅 Deine Auszeichnungen</h3><div class="badge-grid">${badgeCards()}</div><button class="btn ghost" id="goAchievements">Alle Achievements</button></section></div>
  <div class="grid-2" style="margin-top:14px"><section class="panel"><h3>🎁 Belohnungen</h3><p class="muted">Kisten: 🪵 ${state.chests.wooden} · 🥈 ${state.chests.silver} · 🥇 ${state.chests.gold} · 💎 ${state.chests.legendary} &nbsp;|&nbsp; Splitter: ✨ ${state.shards}</p><button class="btn" id="goRewards">Inventar & Kisten öffnen</button></section>
  <section class="panel"><h3>📊 Statistik & Rangliste</h3><p class="muted">Schau dir deinen Fortschritt und lokale Ranglisten an.</p><div class="actions"><button class="btn secondary" id="goStats">Statistik</button><button class="btn secondary" id="goLeaderboard">Rangliste</button></div></section></div>`;
  $$("[data-subject]").forEach(b=>b.onclick=()=>openSubject(b.dataset.subject));
  $("#saveGoal").onclick=()=>{ state.goal = Math.max(5, Math.min(180, Number($("#goalInput").value)||20)); persist(); render("home"); };
  $("#switchProfile").onclick=()=>{ activeProfileId=null; clearInterval(heartTimer); render("home"); };
  $("#goAchievements").onclick=()=>render("achievements");
  $("#goRewards").onclick=()=>render("rewards");
  $("#goStats").onclick=()=>render("stats");
  $("#goLeaderboard").onclick=()=>render("leaderboard");
}
function badgeCards(){
  return ACHIEVEMENTS.slice(0,4).map(a=>{
    const earned = state.achievements.includes(a.id);
    return `<div class="badge-card ${earned?'earned':''}"><span>${a.icon}</span><strong>${a.name}</strong></div>`;
  }).join("");
}

/* ---------- Fachseite ---------- */
function openSubject(id){
  const m = MODULES[id]; if (!m) return;
  startTracking();
  state.subjectStats[id] = state.subjectStats[id] || {xp:0, done:0, quizzes:0};
  let html = `<button class="back" id="backHome">← Zurück</button><section class="panel"><div class="eyebrow">${id.toUpperCase()}</div><h1>${m.title}</h1><p class="muted">${m.intro}</p>`;
  if (m.formulas) html += `<div class="grid-2">${m.formulas.map(([n,f])=>`<div class="formula">${n}<br>${f}</div>`).join("")}</div>`;
  html += `<h2>Lernen</h2>${m.lessons.map(([t,d])=>`<div class="lesson-block"><h3>${t}</h3><p class="muted">${d}</p></div>`).join("")}`;
  if (m.verbs) html += `<h2>Irregular Verbs</h2><div class="lesson-block"><p><b>Infinitive · Simple Past · Past Participle · Deutsch</b></p>${m.verbs.map(v=>`<p>${v.map(esc).join(" · ")}</p>`).join("")}</div>`;
  if (m.vocab) html += `<h2>Wortschatz</h2><div class="lesson-block vocab-list">${m.vocab.map(v=>`<p><b>${esc(v[0])}</b> – ${esc(v[2])}<br><small class="muted">„${esc(v[1])}“</small></p>`).join("")}</div>`;
  html += `<h2>Üben</h2><div class="actions">`;
  if (m.verbs) html += `<button class="btn" data-quiz="verbs" data-practice="0">Verben-Quiz</button><button class="btn ghost" data-quiz="verbs" data-practice="1">Verben · Übungsmodus</button>`;
  if (m.vocab) html += `<button class="btn" data-quiz="vocab" data-practice="0">Wortschatz-Quiz</button><button class="btn ghost" data-quiz="vocab" data-practice="1">Wortschatz · Übungsmodus</button>`;
  if (m.quiz && m.quiz.length) html += `<button class="btn" data-quiz="standard" data-practice="0">Quiz starten</button><button class="btn ghost" data-quiz="standard" data-practice="1">Übungsmodus</button>`;
  html += `</div>`;
  if (state.hearts.count<=0) html += `<p class="muted" style="margin-top:10px">🤍 Keine Herzen mehr für das normale Quiz übrig – nutze den Übungsmodus oder warte, bis sich Herzen erneuern.</p>`;
  html += `</section>`;
  main.innerHTML = html;
  $("#backHome").onclick = ()=>render("home");
  $$("[data-quiz]").forEach(b=>b.onclick=()=>{
    const practice = b.dataset.practice === "1";
    if (!practice && state.hearts.count<=0) { toast("Keine Herzen mehr! Nutze den Übungsmodus."); return; }
    startQuiz(id, b.dataset.quiz, practice);
  });
}

/* ---------- Quiz ---------- */
function getQuizQuestions(id, variant){
  if (id === "englisch" && variant === "verbs") return MODULES.englisch.buildVerbQuiz();
  if (id === "englisch" && variant === "vocab") return MODULES.englisch.buildVocabQuiz();
  return shuffle(MODULES[id].quiz);
}
function xpForDifficulty(diff, correct, practice){
  const base = {easy:8, medium:10, hard:14}[diff] || 10;
  let xp = correct ? base : 2;
  if (practice) xp = Math.round(xp*0.6);
  return xp;
}
function startQuiz(id, variant, practice){
  startTracking();
  const qs = getQuizQuestions(id, variant);
  currentQuiz = {id, variant, practice, qs, i:0, correct:0, answered:false};
  showQuestion();
}
function showQuestion(){
  currentQuiz.answered = false;
  const q = currentQuiz.qs[currentQuiz.i];
  main.innerHTML = `<button class="back" id="quizBack">← Zurück</button><section class="panel quiz-panel"><div class="quiz-mascot">${mascotMarkup("idle")}</div><div class="eyebrow">${currentQuiz.id.toUpperCase()} · ${currentQuiz.practice?'ÜBUNGSMODUS':'QUIZ'} · FRAGE ${currentQuiz.i+1}/${currentQuiz.qs.length}</div>${!currentQuiz.practice ? heartsRow(state) : '<p class="muted">Übungsmodus – kostet keine Herzen.</p>'}<div class="progress"><div style="width:${currentQuiz.i/currentQuiz.qs.length*100}%"></div></div><h2>${esc(q[0])}</h2><div class="answers">${q[1].map((a,i)=>`<button class="answer" data-answer="${i}">${esc(a)}</button>`).join("")}</div><div id="feedback"></div><div class="actions"><button class="btn" id="next" disabled>${currentQuiz.i===currentQuiz.qs.length-1?"Ergebnis":"Weiter"}</button></div></section>`;
  $("#quizBack").onclick = ()=>render("home");
  $$("[data-answer]").forEach(b=>b.onclick=()=>answer(Number(b.dataset.answer)));
  $("#next").onclick = ()=>{ if (currentQuiz.i<currentQuiz.qs.length-1){ currentQuiz.i++; showQuestion(); } else finishQuiz(); };
}
function answer(i){
  const q = currentQuiz.qs[currentQuiz.i]; if (currentQuiz.answered) return; currentQuiz.answered = true;
  const good = i===q[2]; if (good) currentQuiz.correct++;
  const diff = q[4] || "medium";
  if (!good && !currentQuiz.practice) { state.hearts.count = Math.max(0, state.hearts.count-1); }
  setMascotMood(good?"happy":"oops");
  $$("[data-answer]").forEach((b,n)=>{ b.disabled=true; if (n===q[2]) b.classList.add("correct"); else if (n===i) b.classList.add("wrong"); });
  const xp = xpForDifficulty(diff, good, currentQuiz.practice);
  $("#feedback").innerHTML = `<div class="feedback ${good?'good':'bad'}">${good?`Richtig! +${xp} XP`:`Noch nicht ganz. +${xp} XP`}<br>${esc(q[3]).replace(/\n/g,'<br>')}</div>`;
  currentQuiz._xpThis = (currentQuiz._xpThis||0) + xp;
  persist();
  $("#next").disabled = false;
}
function finishQuiz(){
  const earned = currentQuiz._xpThis || 0;
  addStudy(1, earned, currentQuiz.id, null);
  state.subjectStats[currentQuiz.id].quizzes += 1;
  const pct = Math.round(currentQuiz.correct/currentQuiz.qs.length*100);
  if (pct === 100) { state.perfectCount = (state.perfectCount||0)+1; state.shards += 5; }
  checkAchievements(); persist();
  main.innerHTML = `<section class="panel center-screen">${mascotMarkup("celebrate")}<div style="font-size:48px">🎉</div><h1>Gut gemacht!</h1><h2>${currentQuiz.correct} / ${currentQuiz.qs.length} richtig</h2><p class="muted">${pct}% · ${earned} XP gesammelt</p><button class="btn" id="finishBack">Zur Übersicht</button></section>`;
  $("#finishBack").onclick = ()=>render("home");
}

/* ---------- Statistik ---------- */
function statsScreen(){
  const days = [...Array(7)].map((_,i)=>{ const d=new Date(); d.setDate(d.getDate()-(6-i)); return d.toLocaleDateString("en-CA"); });
  const mins = days.map(d=>Math.round((state.daily[d]||0)/60));
  const maxMin = Math.max(1, ...mins);
  const weekXp = days.reduce((a,d)=>a+(state.xpLog[d]||0),0);
  main.innerHTML = `<button class="back" id="backHome">← Zurück</button><section class="panel"><h1>📊 Statistik</h1><p class="muted">Woche: ${weekXp} XP</p>
  <div class="chart">${days.map((d,i)=>`<div class="chart-bar-wrap"><div class="chart-bar" style="height:${Math.round(mins[i]/maxMin*100)}%"></div><small>${d.slice(5)}</small><small class="muted">${mins[i]}m</small></div>`).join("")}</div>
  <h2>Nach Fach</h2><div class="subject-grid">${Object.entries(state.subjectStats).map(([id,st])=>`<div class="panel"><h3>${esc(config.subjects[id]?.title||id)}</h3><p class="muted">XP: ${st.xp} · Aufgaben: ${st.done} · Quizze: ${st.quizzes}</p></div>`).join("") || `<p class="muted">Noch keine Daten – starte ein Quiz!</p>`}</div>
  </section>`;
  $("#backHome").onclick = ()=>render("home");
}

/* ---------- Achievements ---------- */
function achievementsScreen(){
  main.innerHTML = `<button class="back" id="backHome">← Zurück</button><section class="panel"><h1>🏅 Achievements</h1><div class="badge-grid">${ACHIEVEMENTS.map(a=>{
    const earned = state.achievements.includes(a.id);
    return `<div class="badge-card ${earned?'earned':''}"><span>${a.icon}</span><strong>${a.name}</strong><small class="muted">${CHEST_INFO[a.chest].icon} ${CHEST_INFO[a.chest].name}</small></div>`;
  }).join("")}</div></section>`;
  $("#backHome").onclick = ()=>render("home");
}

/* ---------- Rewards / Lootboxen / Inventar ---------- */
function rewardsScreen(){
  main.innerHTML = `<button class="back" id="backHome">← Zurück</button><section class="panel"><h1>🎁 Belohnungen</h1><p class="muted">Splitter: ✨ ${state.shards} (20 Splitter = automatisch eine Holzkiste)</p>
  <div class="grid-2">${Object.entries(CHEST_INFO).map(([tier,info])=>`<div class="panel loot-card rarity-${tier}"><div style="font-size:40px">${info.icon}</div><h3>${info.name}</h3><p class="muted">Du besitzt: ${state.chests[tier]||0}</p><button class="btn" data-open="${tier}" ${!(state.chests[tier]>0)?'disabled':''}>Öffnen</button></div>`).join("")}</div>
  <h2 style="margin-top:20px">Inventar</h2>
  ${["avatar","picoSkin","accessory","frame"].map(type=>inventoryRow(type)).join("")}
  </section>`;
  $("#backHome").onclick = ()=>render("home");
  $$("[data-open]").forEach(b=>b.onclick=()=>openChest(b.dataset.open));
  $$("[data-equip]").forEach(b=>b.onclick=()=>{
    const [type,id] = b.dataset.equip.split("::");
    state.equipped[type] = id; persist(); render("rewards");
  });
}
function invLabel(type){ return {avatar:"Avatare", picoSkin:"Pico-Skins", accessory:"Accessoires", frame:"Profilrahmen"}[type]; }
function inventoryRow(type){
  const owned = state.inventory[type==="avatar"?"avatars":type==="picoSkin"?"picoSkins":type==="accessory"?"accessories":"frames"] || [];
  const items = REWARD_POOL.filter(r=>r.type===type);
  const noneItem = (type==="accessory"||type==="frame") ? [{id:"none", name:"Keins", icon:"—", rarity:"common"}] : [];
  const all = [...noneItem, ...items];
  return `<div class="lesson-block"><h3>${invLabel(type)}</h3><div class="inventory-grid">${all.map(it=>{
    const has = it.id==="none" || owned.includes(it.id);
    const equipped = state.equipped[type]===it.id;
    return `<button class="inv-item rarity-${it.rarity||'common'} ${has?'owned':'locked'} ${equipped?'equipped':''}" ${has?`data-equip="${type}::${it.id}"`:'disabled'} title="${esc(it.name)}"><span>${it.icon}</span><small>${esc(it.name)}</small>${!has?'<small class="muted">🔒</small>':''}${equipped?'<small class="muted">Aktiv</small>':''}</button>`;
  }).join("")}</div></div>`;
}
function openChest(tier){
  if (!(state.chests[tier]>0)) return;
  state.chests[tier]--;
  const odds = CHEST_ODDS[tier];
  const roll = Math.random();
  let acc = 0, rarity = "common";
  for (const r of ["common","rare","epic","legendary"]) { acc += odds[r]||0; if (roll<=acc) { rarity = r; break; } }
  const candidates = REWARD_POOL.filter(r=>r.rarity===rarity);
  const item = candidates[Math.floor(Math.random()*candidates.length)] || REWARD_POOL[0];
  const invKey = {avatar:"avatars", picoSkin:"picoSkins", accessory:"accessories", frame:"frames"}[item.type];
  let gotDuplicate = false;
  if (state.inventory[invKey].includes(item.id)) { gotDuplicate = true; state.shards += {common:3,rare:6,epic:12,legendary:25}[item.rarity]||3; }
  else state.inventory[invKey].push(item.id);
  while (state.shards >= 20) { state.shards -= 20; grantChest("wooden"); }
  persist();
  main.innerHTML = `<section class="panel center-screen"><div style="font-size:54px">${CHEST_INFO[tier].icon}</div><h1>${CHEST_INFO[tier].name} geöffnet!</h1><div class="loot-reveal rarity-${item.rarity}"><span style="font-size:46px">${item.icon}</span><h2>${esc(item.name)}</h2><small class="muted">Seltenheit: ${item.rarity}</small>${gotDuplicate?'<p class="muted">Schon vorhanden – stattdessen Splitter erhalten ✨</p>':''}</div><button class="btn" id="back2">Weiter</button></section>`;
  $("#back2").onclick = ()=>render("rewards");
}

/* ---------- Gruppen & Rangliste (lokal, auf diesem Gerät) ---------- */
function getGroups(){ return readJSON(KEYS.groups, []); }
function saveGroups(g){ writeJSON(KEYS.groups, g); }
function leaderboardScreen(groupId){
  const meta = getProfilesMeta();
  const groups = getGroups();
  const group = groups.find(g=>g.id===groupId);
  const ids = group ? group.memberIds : meta.list.map(p=>p.id);
  const days = [...Array(7)].map((_,i)=>{ const d=new Date(); d.setDate(d.getDate()-(6-i)); return d.toLocaleDateString("en-CA"); });
  const rows = ids.map(id=>{
    const p = meta.list.find(p=>p.id===id); if (!p) return null;
    const s = getState(id);
    const weekXp = days.reduce((a,d)=>a+(s.xpLog[d]||0),0);
    return {id, name:p.name, xp:s.xp, weekXp, level:Math.floor(s.xp/100)+1};
  }).filter(Boolean).sort((a,b)=>b.weekXp-a.weekXp);
  main.innerHTML = `<button class="back" id="backHome">← Zurück</button><section class="panel"><h1>🏆 Rangliste (dieses Gerät)</h1>
  <label>Gruppe<select id="groupSelect"><option value="">Alle lokalen Profile</option>${groups.map(g=>`<option value="${g.id}" ${g.id===groupId?'selected':''}>${esc(g.name)}</option>`).join("")}</select></label>
  <table class="leader-table"><thead><tr><th>#</th><th>Name</th><th>Level</th><th>Gesamt-XP</th><th>XP (7 Tage)</th></tr></thead><tbody>
  ${rows.map((r,i)=>`<tr class="${r.id===activeProfileId?'me':''}"><td>${i+1}</td><td>${esc(r.name)}</td><td>${r.level}</td><td>${r.xp}</td><td>${r.weekXp}</td></tr>`).join("") || `<tr><td colspan="5" class="muted">Noch keine Profile.</td></tr>`}
  </tbody></table>
  <h2 style="margin-top:18px">Gruppen verwalten</h2>
  <div class="actions"><button class="btn secondary" id="newGroup">Neue Gruppe</button></div>
  <div class="lesson-block">${groups.map(g=>`<p><b>${esc(g.name)}</b> — ${g.memberIds.length} Mitglieder <button class="text-button" data-delgroup="${g.id}">Löschen</button></p>`).join("")}</div>
  </section>`;
  $("#backHome").onclick = ()=>render("home");
  $("#groupSelect").onchange = e=>leaderboardScreen(e.target.value||null);
  $("#newGroup").onclick = ()=>{
    const name = prompt("Gruppenname (z. B. Klasse 3A):"); if (!name) return;
    const picks = meta.list.filter(p=>confirm(`${p.name} zur Gruppe "${name}" hinzufügen?`)).map(p=>p.id);
    if (!picks.length) return;
    const groups2 = getGroups(); groups2.push({id:uid(), name, memberIds:picks}); saveGroups(groups2);
    leaderboardScreen();
  };
  $$("[data-delgroup]").forEach(b=>b.onclick=()=>{ saveGroups(getGroups().filter(g=>g.id!==b.dataset.delgroup)); leaderboardScreen(); });
}

/* ---------- Admin ---------- */
function admin(){
  const pass = prompt("Admin-Passwort:");
  if (pass !== DEMO_PASSWORD) { alert("Falsches Passwort."); return; }
  isAdmin = true; sessionStorage.setItem(KEYS.admin,"yes"); render("admin");
}
function renderAdmin(){
  main.innerHTML = `<button class="back" id="adminBack">← Zur Website</button><section class="panel"><div class="eyebrow">EMS LEARNING · ADMIN</div><h1>Admin Center</h1><p class="muted">Diese Oberfläche ist eine lokale Prototyp-Vorschau. Änderungen hier werden nicht zu GitHub hochgeladen.</p><div class="toast">Demo-Admin aktiv. Für öffentliche Änderungen bitte <b>config.json</b> im GitHub-Repository bearbeiten.</div>
  <h2>Wartungsmodus</h2><div class="admin-row"><div><b>Wartung aktivieren</b><div class="muted">Normale Besucher sehen den Minispiel-Bildschirm.</div></div><button id="maintToggle" class="switch ${config.maintenanceMode?'on':''}" aria-label="Wartungsmodus umschalten"></button></div>
  <h2>Fächer</h2>${Object.entries(config.subjects).map(([id,s])=>`<div class="admin-row"><div><b>${esc(s.title||id)}</b><div class="muted">Aktiv / sichtbar</div></div><button class="switch ${s.active?'on':''}" data-active="${id}"></button></div><div class="grid-2"><label>Testtermin<input type="date" data-date="${id}" value="${s.testDate||''}"></label><label>Aktualisiert<select data-updated="${id}"><option value="false" ${!s.updated?'selected':''}>Nein</option><option value="true" ${s.updated?'selected':''}>Ja</option></select></label></div>`).join("")}
  <h2>Backup</h2><p class="muted">Sichere oder lade alle lokalen Profile, Gruppen und Einstellungen dieses Geräts.</p><div class="actions"><button class="btn" id="exportBackup">JSON exportieren</button><label class="btn secondary" style="display:inline-block">Importieren<input type="file" id="importBackup" accept="application/json" class="hidden"></label></div>
  <div class="actions"><button class="btn" id="showConfig">config.json anzeigen</button><button class="btn secondary" id="logout">Abmelden</button></div><pre id="configPreview" class="panel hidden" style="white-space:pre-wrap;overflow:auto"></pre></section>`;
  $("#adminBack").onclick = ()=>render("home");
  $("#maintToggle").onclick = ()=>{ config.maintenanceMode=!config.maintenanceMode; render("admin"); };
  $$("[data-active]").forEach(b=>b.onclick=()=>{ const s=config.subjects[b.dataset.active]; s.active=!s.active; render("admin"); });
  $$("[data-date]").forEach(i=>i.onchange=()=>{ config.subjects[i.dataset.date].testDate=i.value; });
  $$("[data-updated]").forEach(i=>i.onchange=()=>{ config.subjects[i.dataset.updated].updated = i.value==="true"; });
  $("#showConfig").onclick = ()=>{ $("#configPreview").textContent = JSON.stringify(config,null,2); $("#configPreview").classList.toggle("hidden"); };
  $("#logout").onclick = ()=>{ isAdmin=false; sessionStorage.removeItem(KEYS.admin); render("home"); };
  $("#exportBackup").onclick = exportBackup;
  $("#importBackup").onchange = importBackup;
}
function exportBackup(){
  const meta = getProfilesMeta();
  const states = {}; meta.list.forEach(p=>{ states[p.id] = getState(p.id); });
  const payload = {exportedAt:new Date().toISOString(), version:"3.0", profiles:meta, states, groups:getGroups(), theme:localStorage.getItem(KEYS.theme)||"dark"};
  const blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = `ems-learning-backup-${today()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
}
function importBackup(e){
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      if (payload.profiles) saveProfilesMeta(payload.profiles);
      if (payload.states) Object.entries(payload.states).forEach(([id,s])=>saveState(id,s));
      if (payload.groups) saveGroups(payload.groups);
      if (payload.theme) localStorage.setItem(KEYS.theme, payload.theme);
      applyTheme();
      toast("Backup importiert ✅");
      render("admin");
    } catch(err){ alert("Die Datei konnte nicht gelesen werden."); }
  };
  reader.readAsText(file);
}

/* ---------- Start ---------- */
function boot(){
  const meta = getProfilesMeta();
  if (meta.activeId && meta.list.some(p=>p.id===meta.activeId)) switchProfile(meta.activeId);
  else render("home");
}
$("#adminEntry").onclick = admin;
$("#themeToggle")?.addEventListener("click", ()=>{
  const order = ["dark","light","system"];
  const cur = localStorage.getItem(KEYS.theme) || "dark";
  setThemePref(order[(order.indexOf(cur)+1)%order.length]);
});
applyTheme(); renderThemeButton();
(async()=>{ await loadConfig(); boot(); })();
})();
