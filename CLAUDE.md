# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Eisernes Log" (`index.html`, title "Eisernes Log – PPL Trainingstracker") is a single-user Push/Pull/Legs workout tracker, built as an installable PWA. It is entirely client-side, in German.

## Commands

There is no build, lint, or test tooling — no `package.json`, no dependencies. The app is plain HTML/CSS/JS.

- **Develop**: edit `index.html` directly and reload in a browser.
- **Test PWA/offline behavior**: the service worker (`sw.js`) only registers on a real HTTP origin, not `file://`. Serve the folder locally, e.g. `npx serve` or `python -m http.server`, then open it.
- **Deploy**: pushing to `main` on GitHub is the deploy — GitHub Pages serves this repo directly (no `gh-pages` branch, no build step). Live at the repo's Pages URL. Only push to `main` when explicitly asked to deploy.
- **Deploy the Gemini proxy worker**: `cd worker && wrangler deploy` (requires `wrangler secret put GEMINI_API_KEY` once beforehand). This is separate from the GitHub Pages deploy — the worker lives on Cloudflare, not in this repo's Pages site.

## Architecture

Everything lives in one file, `index.html`: inline `<style>` block plus a single inline `<script>` at the bottom (~680 lines total). No framework, no bundler. Supporting files are `manifest.json` (PWA metadata), `sw.js` (cache-first service worker caching the app shell), and `icon-*.png`.

**Data model** (top of the script):
- `DAYS`: the 6 workout days — `pushA`, `pullA`, `legsA`, `pushB`, `pullB`, `legsB`.
- `EXERCISES`: keyed by day id, each an array of exercises with `id`, `name`, `sets`, `reps` (target range), optional `alts` (swappable alternative exercise names) and `core` (boolean flag for core exercises). This is the content to edit when changing the training program itself.

**State & persistence**: a single in-memory `state` object (`currentDay`, `sessions`, `history`, `swaps`, `notes`, `lastWeights`, `lastCompletedDay`, `lastCompletedDate`) is loaded from and persisted to `localStorage` under key `eisernes-log-v1` (debounced ~300ms via `persist()`). There is no backend — the Export/Import buttons in the header serialize/restore this state as a JSON file, and that's the only backup mechanism.

**Rendering**: no virtual DOM — `render()` rebuilds `#app`'s `innerHTML` from `state` on every state change (day switch, set marked done, RIR chip, swap, finish session). One exception: raw text inputs (set weight/reps, notes) update `state` directly in an `input` listener without calling `render()`, to preserve focus/cursor position while typing; only `persist()` runs there.

**Events**: everything is delegated through three top-level listeners (`click`, `input`, `change`) on `document`, dispatching on `data-role` attributes (e.g. `data-role="set-done"`, `data-role="swap-toggle"`, `data-role="finish"`) rather than per-element handlers. New interactive elements should follow this pattern: give them a `data-role` (plus `data-day`/`data-exid`/`data-idx` as needed) and add a branch in the relevant delegated listener.

**Session flow**: `finishSession(dayId)` records the last completed set per exercise into `state.history` (shown as "Letztes Mal: ..."), snapshots current weights into `state.lastWeights` (used by `buildInitialSets` to prefill next time), resets the day's sets, and stamps `lastCompletedDay`/`lastCompletedDate` (used by `renderTodayBanner()`/`getRecommendedDay()` to suggest the next day in the PPL rotation on the home banner).

**Exercise swapping**: `state.swaps[`${day}:${exId}`]` maps an exercise slot to a chosen alternative name (from that exercise's `alts` list, or an AI-suggested name); the original exercise's `sets`/`reps` targets and history are still keyed by the original `ex.id`, only the displayed name changes.

**Rest timer**: `restTimer` (endsAt/duration/intervalId) is module-level, in-memory only — deliberately not part of `state`/`localStorage`. Starts via `startRestTimer()` when a set is marked done (in the `set-done` click handler). Its bar (`#rest-timer-bar`) lives outside `#app` in the static HTML and is updated directly via `renderRestTimer()`, not through the main `render()` pipeline, so it survives full re-renders without extra bookkeeping.

**KI-gestützter Übungstausch**: `worker/` contains a standalone Cloudflare Worker (deployed at https://eisernes-log-proxy.speedfreed.workers.dev via `wrangler deploy` from that directory, not part of the GitHub Pages deploy) that proxies to the Gemini API — it holds `GEMINI_API_KEY` server-side so the key never reaches the client. The client's `PROXY_URL` constant (top of the script) points at this deployed worker URL; empty string disables the feature gracefully. `fetchAiSuggestions()` calls the worker (25s client-side timeout — real Gemini latency for this model runs ~10s) and stores results in the in-memory (non-persisted) `aiSuggestions` map, keyed like `state.swaps`; results render via `aiSuggestHTML()` inside the existing swap panel and, on selection, flow through the same `swap-select` mechanism as the static `alts`. The worker's CORS `ALLOWED_ORIGIN` is locked to `https://speedfreed079.github.io` — testing locally against it requires temporarily pointing that constant at your local origin and redeploying, then reverting before any real deploy.

**Gemini model choice**: `GEMINI_MODEL` in `worker/src/index.js` is `gemini-2.5-flash-lite`. `gemini-2.0-flash` was deprecated/shut down 2026-06-01 (returns a `429`/`limit: 0` quota error, not an auth error, if you see this it means the model id is stale — check https://ai.google.dev/gemini-api/docs/models for the current free-tier-eligible model before assuming the API key is broken).

**Secrets hygiene**: `wrangler secret put GEMINI_API_KEY` takes the secret **name** as the CLI argument and prompts separately for the **value** — never pass the key itself as the argument (secret names are plaintext-visible via `wrangler secret list`, unlike values). Always run secret-setting commands in the user's own terminal, never through an agent-relayed shell, so the key value never appears in any transcript/log.
