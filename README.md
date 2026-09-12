# Ahmad Al-Smadi portfolio

This standalone repository contains Ahmad's warm-white React portfolio, the Football Match Analytics experience, and its optional Express API. It is intentionally separate from the parent Content Engine repository even though it currently lives inside that project folder.

Live site: [ahmad-al-smadi-portfolio.vercel.app](https://ahmad-al-smadi-portfolio.vercel.app)

Key routes are:

`/`

`/projects/content-engine`

`/pitch-vision/tactics/liverpool-madrid-five`

## Run locally

```powershell
npm ci
npm run api

cd frontend
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/`.

The deployed frontend reads the checked-in static export at `frontend/public/tactics/liverpool-madrid-five.json`; no running API is required on Vercel. The locally licensed match excerpt is deliberately excluded from Git.

The homepage has a reserved n8n walkthrough. Add the finished recording at `frontend/public/assets/automation/n8n-workflow-walkthrough.mp4`; the placeholder automatically becomes a video player.

## Validate

```powershell
npm test

cd frontend
npm run build
```

The API can read from the local data folder or object storage. See `infra/template.yaml` for the existing AWS deployment template.

## Deploy

Create a Vercel project with `frontend` as its root directory. `frontend/vercel.json` provides the single-page-app rewrite required for direct links to project routes.
