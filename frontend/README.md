# Ahmad Al-Smadi — portfolio (Editorial redesign)

## Run it
    npm install
    npm run dev        # http://localhost:5173

## Build
    npm run build        # dist/  -> the real site (deploy this to Vercel)
    npm run build:demo   # dist-demo/index.html -> one-file demo of every design direction

## Assets
`public/` holds the images, videos and match data copied from the old portfolio
(`pitch-vision-platform/frontend/public`). If you cloned this without them, copy
that folder in as `public/` before building.

## Routes (same addresses as the old site)
- `/` home
- `/projects/content-engine` (includes the interactive sample run)
- `/pitch-vision/tactics/liverpool-madrid-five` (the full tactical lab)
- `/projects/outbound-engine`, `/projects/coordinate-classifier`,
  `/projects/visual-inspection`, `/projects/component-detection`

`vercel.json` rewrites every route to `index.html`.

## Where things live
- `src/site/` — the real site's routing, About section
- `src/demos/glass/` — Editorial layout + project page (shared with the demo)
- `src/data/` — project copy, stats, write-ups (all from the old portfolio / validation notes)
- `src/legacy/` — the tactical lab and Content Engine demo, ported as-is from the old site;
  `legacy.css` is generated from the old stylesheet by `scripts-scope-legacy.cjs`
