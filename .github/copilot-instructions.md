# Copilot / AI Agent Instructions for the `spese` repo

Purpose: give AI coding agents the minimal, actionable context they need to be productive in this React + Vite expense-tracking app.

- **Big picture**: small single-page React app (Vite) that stores expenses in a PocketBase collection called `spesa`. UI is component-based under `src/components/`. Networking is centralized in `src/services/pocketbase.js`.

- **Entry points & build**:
  - Dev server: `npm run dev` (uses Vite).
  - Build: `npm run build` and preview with `npm run preview`.
  - Lint: `npm run lint` (ESLint config lives at project root).

- **Key files / directories** (consult these for examples):
  - `src/main.jsx` and `src/App.jsx` — app bootstrap and top-level composition.
  - `src/components/` — UI components: `FormSpesa.jsx`, `ListaSpese.jsx`, `GraficoSpese.jsx`, `ItemSpesa.jsx`, `card.jsx`.
  - `src/services/pocketbase.js` — all PocketBase calls; keep network logic here and return plain JS objects.
  - `src/styles/app.css` — global styles.
  - `vite.config.js`, `package.json` — Vite + scripts and deps (React 19, Recharts).

- **Data flow & integration patterns**:
  - All PocketBase interaction happens via `src/services/pocketbase.js`. Use `getSpese()`, `createSpesa(spesa)`, and `deleteSpesa(id)` from components.
  - `getSpese()` returns an array from the `items` property of the PocketBase response.
  - Services throw Errors on non-OK responses. Calling components expect to `catch` and show errors or retry.
  - The base API URL is hard-coded in `pocketbase.js` as `http://127.0.0.1:8090/api/collections/spesa/records` — tests and dev runs assume a local PocketBase server on port 8090.

- **Component conventions**:
  - Components are functional React components in `.jsx` with PascalCase filenames (e.g., `FormSpesa.jsx`).
  - Keep components focused: UI + local state; move network and persistence logic to `src/services`.
  - Props naming is simple and descriptive (e.g., pass `onCreate`, `onDelete`, `items`).

- **Error handling & side effects**:
  - Services throw on HTTP errors; callers should `try/catch` and surface user-facing messages.
  - No global state management library present; state is local to components and lifted where needed (see `ListaSpese` + `GraficoSpese` for examples).

- **Styling**:
  - Single global stylesheet at `src/styles/app.css`. Follow existing class names when adding styles.

- **Charts**:
  - Charts use `recharts`. See `GraficoSpese.jsx` for usage pattern and data shape expectations.

- **Where to add new code**:
  - UI: new components go in `src/components/` and should export a default functional component.
  - API: add new PocketBase endpoints in `src/services/pocketbase.js` and keep names descriptive (e.g., `updateSpesa`, `getSpeseFiltered`).

- **Tests & CI**: No tests detected. If adding tests, prefer small unit tests for services and component behavior; document commands in `README.md`.

- **Quick checks for PRs**:
  - Ensure no direct fetch calls remain in components; prefer `src/services/pocketbase.js`.
  - Run `npm run dev` to validate the app boots and `npm run lint` for style.
  - Verify local PocketBase is reachable at `127.0.0.1:8090` if PR touches persistence.

If anything here is incorrect or you'd like a different focus (for example, more detail about test scaffolding or component examples), tell me what to expand and I'll update this file.
