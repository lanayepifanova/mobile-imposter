# Math Imposter – Local Setup

## Prereqs
- Node.js 20+
- pnpm (project pins `pnpm@10.4.1`; `corepack enable` to use the bundled one)

## Install
```bash
pnpm install
```

## Configure
Create a `.env` in repo root (Vite reads from here):
```bash
VITE_OAUTH_PORTAL_URL=
VITE_APP_ID=
VITE_FRONTEND_FORGE_API_KEY=
VITE_FRONTEND_FORGE_API_URL= # optional; defaults to https://forge.butterfly-effect.dev
VITE_ANALYTICS_ENDPOINT=      # optional; only if using analytics snippet
VITE_ANALYTICS_WEBSITE_ID=    # optional; only if using analytics snippet
```

## Run in dev
```bash
pnpm dev
```
Open the printed localhost URL.

## Production preview
```bash
pnpm build
pnpm start
```
