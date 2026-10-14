/* Life Dashboard — all behavior lives in this one file.
   Data persistence: browser Local Storage only (TC-2). */

"use strict";

/* ---------- Tiny helpers ---------- */
const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "lifeDashboard";
const load = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
};
const save = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
const state = Object.assign(
  { theme: "light", name: "", duration: 25, tasks: [], links: [] },
  load()
);
const persist = () => save(state);

/* ---------- 1. Greeting: clock, date, time-of-day message ---------- */
function tickClock() {
  const now = new Date();
  $("time").textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  $("date").textContent = now.toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const h = now.getHours();
  const part = h < 5 ? "Good night" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : h < 21 ? "Good evening" : "Good night";
  $("greetingText").textContent = state.name ? `${part}, ${state.name}` : part;
}
setInterval(tickClock, 1000);
tickClock();

/* Challenge: custom name in greeting */
$("nameForm").addEventListener("submit", (e) => {
  e.preventDefault();
  state.name = $("nameInput").value.trim();
  persist();
  tickClock();
});
$("nameInput").value = state.name;

/* ---------- Challenge: Light / Dark mode ---------- */
function applyTheme() {
  const dark = state.theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  $("iconSun").hidden = !dark;
  $("iconMoon").hidden = dark;
  $("themeToggle").setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}
$("themeToggle").addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  applyTheme();
  persist();
});
applyTheme();

/* ---------- 2. Focus Timer (Challenge: change Pomodoro time) ---------- */
let remaining = state.duration * 60;
let timerId = null;

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
function renderTimer() {
  $("timerDisplay").textContent = fmt(remaining);
  const percent = (remaining / (state.duration * 60)) * 100;
  $("timerProgress").style.width = `${percent}%`;
  $("timerProgress").parentElement.setAttribute("aria-valuenow", String(Math.round(percent)));
}
function setTimerState(label) {
  $("timerState").textContent = label;
  $("stopBtn").disabled = !timerId;
  $("startBtn").disabled = Boolean(timerId);
  $("durationInput").disabled = Boolean(timerId);
}
function resetTimer() {
  clearInterval(timerId); timerId = null;
  remaining = state.duration * 60;
  renderTimer();
  setTimerState("Ready");
}
function finishTimer() {
  clearInterval(timerId); timerId = null;
  remaining = state.duration * 60;
  renderTimer();
  setTimerState("Complete");
  try {
    const beep = new (window.AudioContext || window.webkitAudioContext)();
    const osc = beep.createOscillator(), gain = beep.createGain();
    osc.connect(gain); gain.connect(beep.destination);
    osc.frequency.value = 880; gain.gain.value = 0.08;
    osc.start(); osc.stop(beep.currentTime + 0.4);
  } catch { /* audio optional */ }
  alert("Focus session complete — take a short break!");
}
function tick() {
  remaining -= 1;
  renderTimer();
  if (remaining <= 0) finishTimer();
}
$("startBtn").addEventListener("click", () => {
  if (timerId) return;
  if (remaining <= 0) remaining = state.duration * 60;
  timerId = setInterval(tick, 1000);
  setTimerState("Running");
});
/* Stop halts the countdown and keeps the remaining time (Reset restores it). */
$("stopBtn").addEventListener("click", () => {
  if (!timerId) return;
  clearInterval(timerId); timerId = null;
  setTimerState("Stopped");
});
$("resetBtn").addEventListener("click", resetTimer);
$("durationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const min = Math.min(180, Math.max(1, Number($("durationInput").value) || 25));
  state.duration = min;
  $("durationInput").value = min;
  persist();
  resetTimer();
});
$("durationInput").value = state.duration;
resetTimer();

/* ---------- 3. To-Do List (add / edit / done / delete / persist) ---------- */
function renderTasks() {
  const list = $("todoList");
  list.innerHTML = "";
  $("todoEmpty").hidden = state.tasks.length > 0;

  state.tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item${task.done ? " completed" : ""}`;

    const check = document.createElement("input");
    check.type = "checkbox"; check.className = "task-check"; check.checked = task.done;
    check.addEventListener("change", () => { task.done = check.checked; persist(); renderTasks(); });

    const span = document.createElement("span");
    span.className = "task-text"; span.textContent = task.text;

    const edit = document.createElement("button");
    edit.type = "button"; edit.className = "task-action"; edit.textContent = "Edit";
    edit.setAttribute("aria-label", `Edit task: ${task.text}`);
    edit.addEventListener("click", () => {
      const updated = prompt("Edit task", task.text);
      if (updated === null) return;
      const value = updated.trim();
      if (!value) return;
      if (state.tasks.some((other) => other.id !== task.id && other.text.toLowerCase() === value.toLowerCase())) {
        alert("That task is already on your list."); return;
      }
      task.text = value; persist(); renderTasks();
    });

    const remove = document.createElement("button");
    remove.type = "button"; remove.className = "task-action delete"; remove.textContent = "×";
    remove.setAttribute("aria-label", `Delete task: ${task.text}`);
    remove.addEventListener("click", () => {
      state.tasks = state.tasks.filter((other) => other.id !== task.id);
      persist(); renderTasks();
    });

    li.append(check, span, edit, remove);
    list.append(li);
  });
}
renderTasks();

$("todoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = $("todoInput").value.trim();
  if (!text) return;
  if (state.tasks.some((t) => t.text.toLowerCase() === text.toLowerCase())) {
    alert("That task is already on your list."); return;
  }
  state.tasks.push({ id: Date.now(), text, done: false });
  $("todoInput").value = "";
  persist(); renderTasks();
});

/* ---------- 4. Quick Links (open favorites, saved to Local Storage) ---------- */
function normalizeUrl(raw) {
  const value = raw.trim();
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}
function renderLinks() {
  const grid = $("quickLinks");
  grid.innerHTML = "";
  $("linksEmpty").hidden = state.links.length > 0;

  state.links.forEach((link) => {
    const item = document.createElement("div");
    item.className = "quick-link";

    const anchor = document.createElement("a");
    anchor.href = link.url; anchor.target = "_blank"; anchor.rel = "noopener noreferrer";

    const avatar = document.createElement("span");
    avatar.className = "link-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = link.name.charAt(0).toUpperCase();

    const label = document.createElement("span");
    label.textContent = link.name;
    anchor.append(avatar, label);

    const remove = document.createElement("button");
    remove.type = "button"; remove.className = "link-remove"; remove.textContent = "×";
    remove.setAttribute("aria-label", `Remove link: ${link.name}`);
    remove.addEventListener("click", () => {
      state.links = state.links.filter((other) => other.id !== link.id);
      persist(); renderLinks();
    });

    item.append(anchor, remove);
    grid.append(item);
  });
}
renderLinks();

$("linkForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("linkName").value.trim();
  const url = normalizeUrl($("linkUrl").value);
  if (!name || !url) return;
  if (state.links.some((l) => l.url.toLowerCase() === url.toLowerCase())) {
    alert("That link is already saved."); return;
  }
  state.links.push({ id: Date.now(), name, url });
  $("linkName").value = ""; $("linkUrl").value = "";
  persist(); renderLinks();
});
