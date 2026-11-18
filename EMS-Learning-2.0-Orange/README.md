# EMS Learning

Eine statische, deutschsprachige Lernplattform für GitHub Pages.

## Veröffentlichung auf GitHub Pages

1. Erstelle auf GitHub ein neues Repository namens `ems-learning`.
2. Entpacke diese ZIP-Datei.
3. Öffne den entpackten Ordner und lade **alle Inhalte** in das Repository hoch. `index.html` muss im Hauptverzeichnis liegen.
4. Öffne im Repository **Settings → Pages**.
5. Wähle **Deploy from a branch**, Branch `main`, Ordner `/(root)` und speichere.
6. Nach dem Deployment findest du die Website unter `https://DEIN-NAME.github.io/ems-learning/`.

## Wartungsmodus und Fach-Einstellungen

Öffne `config.json` direkt auf GitHub und bearbeite die Werte:

- `"maintenanceMode": true` zeigt den Wartungsbildschirm für normale Besucher.
- `"maintenanceMode": false` zeigt die Lernplattform.
- `subjects.*.active` aktiviert/deaktiviert ein Fach.
- `subjects.*.updated` zeigt die Markierung „NEU AKTUALISIERT“.
- `subjects.*.testDate` setzt einen Testtermin im Format `YYYY-MM-DD`.

Nach dem Commit kann es kurz dauern, bis GitHub Pages die neue Version ausliefert. Die Seite liest die Konfiguration bei jedem vollständigen Neuladen erneut ein und verwendet `cache: "no-store"`.

**Wichtig:** Die Wartungskonfiguration ist öffentlich lesbar. Das ist für einen nicht-sensiblen Schul-Prototyp gedacht, nicht für vertrauliche Informationen.

## Demo-Admin

Der Prototyp hat einen lokalen Admin-Modus, damit du die Admin-Oberfläche ausprobieren kannst. Das Demo-Passwort lautet `ems-demo-2026`. Es ist im öffentlichen JavaScript sichtbar und schützt daher nicht wirklich vor anderen Besuchern. Es ist nur eine Vorschau und kann nicht `config.json` auf GitHub veröffentlichen. Für Änderungen für alle Besucher bearbeitest du `config.json` auf GitHub.

## Datenspeicherung

XP, Level, Antworten, Lernzeit und Lernserie werden im LocalStorage des jeweiligen Browsers gespeichert. Diese Daten werden nicht zwischen Geräten synchronisiert. Es werden keine Benachrichtigungen verschickt.

## Hinweis zur Lernserie

Ein Tag zählt nur bei echter Lernaktivität. Tage ohne aktive, gültige Lerninhalte unterbrechen die Serie nicht. Der Prototyp erfasst Lernzeit während einer aktiven Lernsession.

## Version 2.0 – Orange Edition

- Warm orange visual theme and original pixel companion character **Pico**. Pico reacts to correct/incorrect answers and celebrates quiz completion.
- Fixed shared quiz state: each new question resets the answer lock, so subsequent questions in Deutsch, Englisch and Physik accept answers normally.
- The mascot is an original character inspired by the general pixel-art companion idea; it is not a copy of Claude Code's Clawd character or artwork.

Hinweis: XP und Fortschritt bleiben lokal im Browser.
