# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Eisernes Log" (`index.html`, title "Eisernes Log – PPL Trainingstracker") is a single-user Push/Pull/Legs workout tracker, built as an installable PWA. It is entirely client-side, in German.

## Commands

There is no build, lint, or test tooling — no `package.json`, no dependencies. The app is plain HTML/CSS/JS.

- **Develop**: edit `index.html` directly and reload in a browser.
- **Test PWA/offline behavior**: the service worker (`sw.js`) only registers on a real HTTP origin, not `file://`. Serve the folder locally, e.g. `npx serve` or `python -m http.server`, then open it.
- **Deploy**: pushing to `main` on GitHub is the deploy — GitHub Pages serves this repo directly (no `gh-pages` branch, no build step). Live at the repo's Pages URL. Only push to `main` when explicitly asked to deploy.

## Architecture

Everything lives in one file, `index.html`: inline `<style>` block plus a single inline `<script>` at the bottom (~680 lines total). No framework, no bundler. Supporting files are `manifest.json` (PWA metadata), `sw.js` (cache-first service worker caching the app shell), and `icon-*.png`.

**Data model** (top of the script):
- `DAYS`: the 6 workout days — `pushA`, `pullA`, `legsA`, `pushB`, `pullB`, `legsB`.
- `EXERCISES`: keyed by day id, each an array of exercises with `id`, `name`, `sets`, `reps` (target range), optional `alts` (swappable alternative exercise names) and `core` (boolean flag for core exercises). This is the content to edit when changing the training program itself.

**State & persistence**: a single in-memory `state` object (`currentDay`, `sessions`, `history`, `swaps`, `notes`, `lastWeights`, `lastCompletedDay`, `lastCompletedDate`) is loaded from and persisted to `localStorage` under key `eisernes-log-v1` (debounced ~300ms via `persist()`). There is no backend — the Export/Import buttons in the header serialize/restore this state as a JSON file, and that's the only backup mechanism.

**Rendering**: no virtual DOM — `render()` rebuilds `#app`'s `innerHTML` from `state` on every state change (day switch, set marked done, RIR chip, swap, finish session). One exception: raw text inputs (set weight/reps, notes) update `state` directly in an `input` listener without calling `render()`, to preserve focus/cursor position while typing; only `persist()` runs there.

**Events**: everything is delegated through three top-level listeners (`click`, `input`, `change`) on `document`, dispatching on `data-role` attributes (e.g. `data-role="set-done"`, `data-role="swap-toggle"`, `data-role="finish"`) rather than per-element handlers. New interactive elements should follow this pattern: give them a `data-role` (plus `data-day`/`data-exid`/`data-idx` as needed) and add a branch in the relevant delegated listener.

**Session flow**: `finishSession(dayId)` records the last completed set per exercise into `state.history` (shown as "Letztes Mal: ..."), snapshots current weights into `state.lastWeights` (used by `buildInitialSets` to prefill next time), resets the day's sets, and stamps `lastCompletedDay`/`lastCompletedDate` (used by `renderTodayBanner()`/`getRecommendedDay()` to suggest the next day in the PPL rotation on the home banner).

**Exercise swapping**: `state.swaps[`${day}:${exId}`]` maps an exercise slot to a chosen alternative name (from that exercise's `alts` list); the original exercise's `sets`/`reps` targets and history are still keyed by the original `ex.id`, only the displayed name changes.
