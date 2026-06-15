# my-react-app

This repository has been reorganized for a clean Railway deployment structure.

Root structure:

- `frontend/` — React application with its own `package.json`
- `backend/` — Express + MongoDB API with its own `package.json`

Notes:

- `backend/package.json` now includes a `start` script: `node server.js`
- Legacy files from the old `dashboard/` layout are preserved under `backend/legacy/`
