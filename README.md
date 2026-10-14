# Life Dashboard

A personal dashboard built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step, no backend — all data is stored in the browser's Local Storage.

## Features

- **Greeting** — live clock, full date, and a greeting that changes with the time of day.
- **Focus Timer** — 25-minute timer by default, with Start, Stop, and Reset controls.
- **To-Do List** — add, edit, complete, and delete tasks. Everything is saved to Local Storage.
- **Quick Links** — save and open your favorite websites, stored in Local Storage.

## Extra challenges included

- Light / dark mode
- Custom name in the greeting
- Adjustable Pomodoro duration
- Duplicate task prevention

## Project structure

```
index.html        # markup
css/style.css     # all styling (single stylesheet)
js/app.js         # all behavior (single script)
```

## Run locally

Open `index.html` in any modern browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://127.0.0.1:8000

## Tech stack

HTML · CSS · Vanilla JavaScript · Local Storage API

## Live site

Published with GitHub Pages.
