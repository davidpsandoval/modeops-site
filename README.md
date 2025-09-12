# ModeOps Website
Vite + React landing page for ModeOps with Formspree contact form and Vercel config.

## Quick start
```bash
npm install
cp .env.example .env
# add your Formspree ID, e.g. VITE_FORMSPREE_FORM_ID=xldwvnvg
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy on Vercel
- Push this folder to GitHub
- Import the repo on vercel.com
- Vercel uses `vercel.json` to build and route to `index.html`
