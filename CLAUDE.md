# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Fretze pumpt" (`index.html`, title "Fretze pumpt – PPL Trainingstracker"; named "Eisernes Log" before the 2026-07-08 rebrand — see `00_Projektsteuerung/PROJEKTLOG.md` for history) is a single-user Push/Pull/Legs workout tracker, built as an installable PWA. It is entirely client-side, in German.

## Ordnerstruktur (seit 2026-07-08)

Die eigentliche Webapp (`index.html`, `howto.html`, `sw.js`, `manifest.json`, `icon-*.png`) bleibt bewusst im Repo-Root — GitHub Pages liefert nur aus dem Root oder einem Ordner namens exakt `docs` aus, ein frei benannter Ordner wie `Webapp` würde das Deployment ohne zusätzlichen Build-Workflow brechen. Alles andere ist in nummerierte Ordner sortiert:

- `00_Projektsteuerung/` — `MEMORY.md` (Fakten/Entscheidungen) und `PROJEKTLOG.md` (chronologischer Verlauf, siehe Versionierung unten).
- `01_Recherchen/` — Ergebnisse der Gemini-Deep-Research-Prompts (Trainingspläne, Übungserklärungen, Aufwärmen, Stretching), je ein Unterordner.
- `02_Quellen/` — Rohquellen/Belege, die die Recherchen stützen.
- `03_Tools/worker/` — der Cloudflare-Gemini-Proxy-Worker (siehe unten), nicht Teil des GitHub-Pages-Deploys.
- `04_Medien/` — Rohgrafiken (z.B. `logo_fretze_pumpt.png`, das Ausgangslogo mit Schriftzug). Die daraus abgeleiteten, umgefärbten Produktions-Assets (`logo-mark-dark.png`, `logo-mark-sepia.png`, `icon-*.png`) liegen im Root, da sie aus der Webapp referenziert werden (siehe Architektur unten für die Farbwahl).
- `99_Archiv/` — alte/nicht mehr aktiv genutzte Dateien (z.B. `files.zip`, der ursprüngliche Projekt-Upload vor dem Repo-Setup; gitignored). Bewusst mit hoher Nummer ans Ende sortiert, war ursprünglich `04_Archiv/`.

## Versioning (process rule, active since v1.1.0)

Every change gets a version bump and a `00_Projektsteuerung/PROJEKTLOG.md` entry — no exceptions, this was an explicit user request.

- Bump `APP_VERSION` in `index.html` (semantic-ish: PATCH for small fixes, MINOR for features, MAJOR for breaking/rewrite-level changes).
- Bump `CACHE_NAME` in `sw.js` to match (e.g. `fretze-pumpt-v1.2.0`) — this is not just bookkeeping, it's what makes the PWA actually update on installed devices (see the auto-update note below). The two must move together.
- Add a dated, versioned entry to `00_Projektsteuerung/PROJEKTLOG.md` describing what changed, before/alongside deploying.

## User-facing documentation (`howto.html`, process rule, active since v1.5.1)

`00_Projektsteuerung/PROJEKTLOG.md` is a developer-facing changelog (for future Claude sessions, not end users). `howto.html` is the separate, plain-German **user-facing** how-to page, linked from the app header ("❓ Anleitung") — explicit user request: **every change relevant to what the user sees or does must also update `howto.html`**, not just `PROJEKTLOG.md`. Examples of "relevant": a new/changed feature, a UI element that moves or behaves differently, a new settings/toggle. Not relevant: internal refactors, data-model changes with no visible effect, doc/versioning-only commits. `howto.html` reads the same `localStorage` theme key as `index.html` to match dark/sepia automatically, and is listed in `sw.js`'s `APP_SHELL` for offline use — keep both in sync if it's ever renamed.

## Commands

There is no build, lint, or test tooling — no `package.json`, no dependencies. The app is plain HTML/CSS/JS.

- **Develop**: edit `index.html` directly and reload in a browser.
- **Test PWA/offline behavior**: the service worker (`sw.js`) only registers on a real HTTP origin, not `file://`. Serve the folder locally, e.g. `npx serve` or `python -m http.server`, then open it.
- **Deploy**: pushing to `main` on GitHub is the deploy — GitHub Pages serves this repo directly (no `gh-pages` branch, no build step). Live at the repo's Pages URL. Only push to `main` when explicitly asked to deploy.
- **Deploy the Gemini proxy worker**: `cd 03_Tools/worker && wrangler deploy` (requires `wrangler secret put GEMINI_API_KEY` once beforehand). This is separate from the GitHub Pages deploy — the worker lives on Cloudflare, not in this repo's Pages site.

## Architecture

Everything lives in one file, `index.html`: inline `<style>` block plus a single inline `<script>` at the bottom (~680 lines total). No framework, no bundler. Supporting files are `manifest.json` (PWA metadata), `sw.js` (cache-first service worker caching the app shell), `icon-*.png`, `logo-mark-dark.png`/`logo-mark-sepia.png` (header logo, transparent PNGs; see Ordnerstruktur above for the source file), and `howto.html` (standalone user-facing how-to page, see the User-facing documentation section below). All must stay in the app shell list in `sw.js` (`APP_SHELL`) — a new asset referenced from `index.html` but missing there won't be available offline.

**Header logo is theme-aware, unlike the app icons**: `render()` picks `logo-mark-dark.png` or `logo-mark-sepia.png` based on `state.theme`, mirroring the existing `theme-color`-meta swap. Two separate PNGs exist (rather than one raster recolored to the shared `--rust`) because a single color didn't read well in both contexts: dark theme needed a brighter/more saturated orange (`#F97316`) for the fine linework to stay legible against the near-black `--bg`, while sepia keeps the theme's own `--rust` (`#A8461E`), which already contrasts fine on the light background. The app-icon PNGs (`icon-192.png`/`icon-512*.png`) are NOT theme-aware — OS home screens don't know about in-app theme state, so they stay on the single dark-mode-style asset regardless of `state.theme`.

**PWA update mechanism**: `sw.js` uses a cache-first strategy, which means an installed/home-screen copy will keep serving whatever it last cached until the service worker itself gets updated — browsers only re-check `sw.js` for byte-level changes, they don't know `index.html` changed on their own. That's why `CACHE_NAME` must change every release (see Versioning below): a different string makes `sw.js`'s bytes differ, which is what triggers the browser to install the new worker (`skipWaiting()` + `clients.claim()` in the code make it take over immediately), delete the old-named cache, and re-fetch the app shell fresh. Skipping the `CACHE_NAME` bump on a release means installed devices silently keep the old version.

**Naming stability**: `STORAGE_KEY` (`eisernes-log-v1`) and the Cloudflare Worker name (`eisernes-log-proxy`) were deliberately *not* renamed during the 2026-07-08 rebrand to "Fretze pumpt" — changing `STORAGE_KEY` would wipe every user's existing `localStorage` data, and renaming the deployed worker has no user-facing benefit. Don't rename these without explicitly flagging the data-loss risk to the user first.

**Data model** (top of the script):
- **Multiple plans (since v1.5.0)**: `PLANS` is an array of `{ id, label, days, exercises }` — currently `ppl` (`PPL_DAYS`/`PPL_EXERCISES`, the original 6-day split), `upperLower` (`UL_DAYS`/`UL_EXERCISES`), `fullbody` (`FB_DAYS`/`FB_EXERCISES`), `broSplit` (`BRO_DAYS`/`BRO_EXERCISES`) — all sourced from `01_Recherchen/01_Trainingsplaene/Trainingsplaene.md`. `DAYS`/`EXERCISES` are `let` (not `const`): they're mutable pointers to the *active* plan's data, reassigned by `applyPlan(planId)`. Every other function in the file (`render()`, event handlers, `getRecommendedDay()`, …) reads `DAYS`/`EXERCISES` normally and doesn't need to know plans exist.
- **Day/exercise IDs are globally unique across all plans** (e.g. PPL uses `pushA`/`pa1`, Upper/Lower uses `ulUpperA`/`uua1`, never overlapping) — this is *the* mechanism that makes "switch plans without losing data" work: `state.sessions`/`history`/`swaps`/`notes`/`lastWeights` stay flat objects keyed by these IDs, so switching `state.currentPlan` never overwrites another plan's entries; nothing needed migrating. Don't reuse an ID across plans.
- `DAYS` entries have an optional `type` (`"push"`/`"pull"`/`"legs"`) used to look up `WARMUP`/`STRETCHING` content per day-type. Only assigned where the research content genuinely applies (e.g. Upper/Lower's "Lower" days get `"legs"`, Bro-Split's "Schultern"/"Arme" days get none) — `warmupSectionHTML()`/`stretchSectionHTML()` return `""` when there's no matching entry, so a missing `type` just means no section shows, not a crash.
- `EXERCISES`: keyed by day id, each an array of exercises with `id`, `name`, `sets`, `reps` (target range), optional `alts` (swappable alternative exercise names) and `core` (boolean flag for core exercises). This is the content to edit when changing a training program itself. Only the `ppl` plan's exercises have populated `alts`; the 3 newer plans default to `alts: []` (no researched alternatives yet).
- `EXERCISE_INFO`: keyed by `ex.id` (not `ex.name` — the research doc's exercise names don't always match verbatim), each `{ muscles: {primary, secondary}, steps, mistakes, safety }`. Sourced from `01_Recherchen/02_Uebungserklaerungen/Uebungsdatenbank.md`; rendered in a per-card "ℹ" toggle panel. Currently only covers `ppl`'s exercise IDs — the 3 newer plans don't show the ℹ button (graceful, not a bug: the button only renders `${info ? ... : ""}`).
- `WARMUP`/`STRETCHING`/`STRETCHING_NOTE`: keyed by day `type`. Sourced from `01_Recherchen/03_Aufwaermen/` and `01_Recherchen/04_Stretching/`; rendered as collapsible sections above/below the exercise cards. None of this — nor the exercise-info panel — is part of `state`/`localStorage`; open/closed state (`infoOpenKey`/`warmupOpen`/`stretchOpen`) is ephemeral like `swapOpenKey`.

**State & persistence**: a single in-memory `state` object (`currentDay`, `currentPlan`, `sessions`, `history`, `swaps`, `notes`, `lastWeights`, `lastCompletedDay`, `lastCompletedDate`, `theme`) is loaded from and persisted to `localStorage` under key `eisernes-log-v1` (debounced ~300ms via `persist()`). `applyPlan(state.currentPlan)` must run after `state` is loaded/replaced (on initial load and after Import) so `DAYS`/`EXERCISES` point at the right plan before anything renders — both call sites also snap `state.currentDay` back to `DAYS[0].id` if it doesn't belong to the now-active plan. There is no backend — the Export/Import buttons in the header serialize/restore this state as a JSON file, and that's the only backup mechanism.

**Rendering**: no virtual DOM — `render()` rebuilds `#app`'s `innerHTML` from `state` on every state change (day switch, set marked done, RIR chip, swap, finish session). One exception: raw text inputs (set weight/reps, notes) update `state` directly in an `input` listener without calling `render()`, to preserve focus/cursor position while typing; only `persist()` runs there.

**Events**: everything is delegated through three top-level listeners (`click`, `input`, `change`) on `document`, dispatching on `data-role` attributes (e.g. `data-role="set-done"`, `data-role="swap-toggle"`, `data-role="finish"`) rather than per-element handlers. New interactive elements should follow this pattern: give them a `data-role` (plus `data-day`/`data-exid`/`data-idx` as needed) and add a branch in the relevant delegated listener.

**Session flow**: `finishSession(dayId)` records the last completed set per exercise into `state.history` (shown as "Letztes Mal: ..."), snapshots current weights into `state.lastWeights` (used by `buildInitialSets` to prefill next time), resets the day's sets, and stamps `lastCompletedDay`/`lastCompletedDate` (used by `renderTodayBanner()`/`getRecommendedDay()` to suggest the next day in the PPL rotation on the home banner).

**Exercise swapping**: `state.swaps[`${day}:${exId}`]` maps an exercise slot to a chosen alternative name (from that exercise's `alts` list, or an AI-suggested name); the original exercise's `sets`/`reps` targets and history are still keyed by the original `ex.id`, only the displayed name changes.

**Rest timer**: `restTimer` (endsAt/duration/intervalId) is module-level, in-memory only — deliberately not part of `state`/`localStorage`. Starts via `startRestTimer()` when a set is marked done (in the `set-done` click handler). Its bar (`#rest-timer-bar`) lives outside `#app` in the static HTML and is updated directly via `renderRestTimer()`, not through the main `render()` pipeline, so it survives full re-renders without extra bookkeeping.

**KI-gestützter Übungstausch**: `03_Tools/worker/` contains a standalone Cloudflare Worker (deployed at https://eisernes-log-proxy.speedfreed.workers.dev via `wrangler deploy` from that directory, not part of the GitHub Pages deploy) that proxies to the Gemini API — it holds `GEMINI_API_KEY` server-side so the key never reaches the client. The client's `PROXY_URL` constant (top of the script) points at this deployed worker URL; empty string disables the feature gracefully. `fetchAiSuggestions()` calls the worker (25s client-side timeout — real Gemini latency for this model runs ~10s) and stores results in the in-memory (non-persisted) `aiSuggestions` map, keyed like `state.swaps`; results render via `aiSuggestHTML()` inside the existing swap panel and, on selection, flow through the same `swap-select` mechanism as the static `alts`. The worker's CORS `ALLOWED_ORIGIN` is locked to `https://speedfreed079.github.io` — testing locally against it requires temporarily pointing that constant at your local origin and redeploying, then reverting before any real deploy.

**Gemini model choice**: `GEMINI_MODEL` in `03_Tools/worker/src/index.js` is `gemini-2.5-flash-lite`. `gemini-2.0-flash` was deprecated/shut down 2026-06-01 (returns a `429`/`limit: 0` quota error, not an auth error, if you see this it means the model id is stale — check https://ai.google.dev/gemini-api/docs/models for the current free-tier-eligible model before assuming the API key is broken).

**Secrets hygiene**: `wrangler secret put GEMINI_API_KEY` takes the secret **name** as the CLI argument and prompts separately for the **value** — never pass the key itself as the argument (secret names are plaintext-visible via `wrangler secret list`, unlike values). Always run secret-setting commands in the user's own terminal, never through an agent-relayed shell, so the key value never appears in any transcript/log.
