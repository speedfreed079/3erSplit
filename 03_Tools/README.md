# Tools

Werkzeuge, die die Webapp unterstützen, aber nicht Teil des GitHub-Pages-Deploys sind.

- `worker/` — Cloudflare Worker, proxied zur Gemini API für den KI-gestützten Übungstausch. Deploy separat via `wrangler deploy` (siehe `../CLAUDE.md`), nicht durch den Push nach `main`.
