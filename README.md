# EMS Learning 3.0

Eine statische, deutschsprachige Lernplattform für GitHub Pages — für die Schüler der EMS Pamhagen.

## Veröffentlichung auf GitHub Pages

1. Erstelle auf GitHub ein neues Repository namens `ems-learning`.
2. Entpacke diese ZIP-Datei.
3. Öffne den entpackten Ordner und lade **alle Inhalte** in das Repository hoch. `index.html` muss im Hauptverzeichnis liegen.
4. Öffne im Repository **Settings → Pages**.
5. Wähle **Deploy from a branch**, Branch `main`, Ordner `/(root)` und speichere.
6. Nach dem Deployment findest du die Website unter `https://DEIN-NAME.github.io/ems-learning/`.

## Wartungsmodus und Fach-Einstellungen

Öffne `config.json` direkt auf GitHub und bearbeite die Werte (oder nutze das Admin-Center unten rechts → „You admin?“ → Passwort `ems-demo-2026`, um eine Vorschau zu sehen; veröffentlicht wird aber nur über `config.json` auf GitHub):

- `"maintenanceMode": true` zeigt den Wartungsbildschirm für normale Besucher.
- `subjects.*.active` aktiviert/deaktiviert ein Fach. **Deutsch ist standardmäßig deaktiviert** — die Inhalte und bisherigen Ergebnisse bleiben aber erhalten und können jederzeit mit `"active": true` wieder sichtbar gemacht werden.
- `subjects.*.updated` zeigt die Markierung „NEU AKTUALISIERT“.
- `subjects.*.testDate` setzt einen Testtermin im Format `YYYY-MM-DD`.

Nach dem Commit kann es kurz dauern, bis GitHub Pages die neue Version ausliefert. Die Seite liest `config.json` bei jedem vollständigen Neuladen erneut ein (`cache: "no-store"`).

**Wichtig:** Die Konfiguration ist öffentlich lesbar. Das ist für einen nicht-sensiblen Schul-Prototyp gedacht, nicht für vertrauliche Informationen.

## Neu in 3.0

### Profile
- Beliebig viele lokale Profile auf einem Gerät, Profilwechsel ohne PIN über den Startbildschirm.
- Jedes Profil hat eigene XP, Level, Herzen, Statistik, Achievements und Inventar (gespeichert im LocalStorage des Browsers).

### Lernen & Motivation
- Einstellbares Tagesziel (Minuten), nur aktive Lernzeit zählt (Tracking läuft, solange eine Lernseite offen ist).
- XP richtet sich nach der Schwierigkeit der Frage (leicht/mittel/schwer).
- **5 Herzen**, die sich mit der Zeit automatisch wieder auffüllen (1 Herz alle 20 Minuten). Ein normales Quiz kostet bei falschen Antworten ein Herz.
- **Übungsmodus**: beliebig oft spielbar, kostet **keine** Herzen (dafür etwas weniger XP).
- Statistikseite mit 7-Tage-Lernzeit-Diagramm und Fach-Statistiken (XP, erledigte Aufgaben, Quizze).

### Belohnungen
- Lootboxen in vier Stufen: 🪵 Holz, 🥈 Silber, 🥇 Gold, 💎 Legendär — mit unterschiedlichen Seltenheits-Chancen.
- Inhalt: Avatare, Pico-Skins, Accessoires und Profilrahmen, jeweils mit Seltenheitsstufe (häufig/selten/episch/legendär).
- Doppelte Belohnungen werden automatisch in „Splitter“ ✨ umgewandelt; 20 Splitter ergeben automatisch eine neue Holzkiste.
- Achievements/Abzeichen schalten zusätzliche Kisten frei.

### Pico
- Eigene Animationen (Idle, Hop bei richtiger Antwort, Wobble bei falscher Antwort, Feier-Animation beim Levelaufstieg/Quizabschluss).
- Aussehen ändert sich je nach ausgewähltem Pico-Skin und Accessoire (im Inventar unter „Belohnungen“ ausrüstbar).

### Gruppen & Ranglisten
- Lokale Gruppen (z. B. Klassen) lassen sich aus den vorhandenen Profilen dieses Geräts zusammenstellen.
- Rangliste zeigt Gesamt-XP und XP der letzten 7 Tage, gefiltert nach „Alle“ oder einer Gruppe.
- Hinweis: Da die Seite keinen Server hat, funktioniert dies nur zwischen Profilen **auf demselben Gerät/Browser**.

### Darstellung
- Dunkelmodus (Standard-Design) und Hellmodus, beide im gleichen warmen Orange/Gold-Farbschema.
- Umschalter oben rechts (🌙/☀️/🖥️) wechselt zwischen Dunkel, Hell und „Systemeinstellung folgen“; die Wahl wird gespeichert.

### Backup
- Im Admin-Center: **JSON exportieren** sichert alle lokalen Profile, Gruppen und Einstellungen dieses Geräts in eine Datei.
- **Importieren** liest eine solche Datei wieder ein (z. B. nach einem Gerätewechsel oder als Sicherheitskopie).

## Admin-Center

Der Prototyp hat einen lokalen Admin-Modus, damit du die Admin-Oberfläche ausprobieren kannst. Das Demo-Passwort lautet `ems-demo-2026`. Es ist im öffentlichen JavaScript sichtbar und schützt daher nicht wirklich vor anderen Besuchern. Es ist nur eine Vorschau und kann nicht `config.json` auf GitHub veröffentlichen. Für Änderungen für alle Besucher bearbeitest du `config.json` auf GitHub.

## Datenspeicherung

XP, Level, Herzen, Achievements, Inventar, Gruppen und Lernzeit werden im LocalStorage des jeweiligen Browsers/Geräts gespeichert. Diese Daten werden nicht automatisch zwischen Geräten synchronisiert — nutze dafür die Backup-Funktion im Admin-Center. Es werden keine Benachrichtigungen verschickt.

## Hinweis zur Lernserie

Ein Tag zählt nur bei echter Lernaktivität. Tage ohne aktive, gültige Lerninhalte unterbrechen die Serie nicht. Der Prototyp erfasst Lernzeit während einer aktiven Lernsession.

## Inhalte erweitern

- Neue Vokabeln/Beispielsätze: `assets/js/data.js`, Array `vocab` (Format: `[Begriff, Beispielsatz, deutsche Übersetzung]`).
- Neue unregelmäßige Verben: Array `verbs` in derselben Datei.
- Neue Lektionen/Quizfragen: in den jeweiligen Modulen (`deutsch`, `englisch`, `physik`) in `data.js`.

## Versionsgeschichte

**3.0** — Profile, Herzen, Übungsmodus, Lootboxen/Belohnungen, Statistik, lokale Gruppen & Ranglisten, Dark-/White-Mode, Backup-Export/Import, neue Englisch-Vokabeln aus dem Workbook (Unit 4).

**2.0 – Orange Edition** — Warm orange visual theme and original pixel companion character **Pico**. Pico reacts to correct/incorrect answers and celebrates quiz completion. Fixed shared quiz state: each new question resets the answer lock. The mascot is an original character inspired by the general pixel-art companion idea; it is not a copy of Claude Code's Clawd character or artwork.
