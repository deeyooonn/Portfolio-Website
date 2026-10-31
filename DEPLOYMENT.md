# Vercel deployment
Import `deeyooonn/Portfolio-Website`. The Git repository root is this directory: do not set Root Directory to another `portfolio-app` folder in Vercel. Select Node.js 22.x. `vercel.json` provides Vite, `npm ci`, `npm run build`, and `dist`.

The portfolio builds without environment variables and includes the deployed project addresses in `src/data/projects.js`. Each project card has an Open project link, and its detail view has the same link. Both open that project in a new tab while keeping the portfolio open.

The names in `.env.example` optionally override these addresses at build time. An explicitly empty or non-HTTPS override hides that project's link. To change a URL, update the source default or set the corresponding Vercel variable, then redeploy.

PRIME, Just Paste, CTRL + V, and LeadHunter link to the prepared interactive demos described in their detail views. PRIME's source link preserves the original team repository attribution. The Experience section uses the supplied internship completion photo.

Check the project links, hash routes, and mobile navigation on the actual deployment.

Reference: https://vercel.com/docs/frameworks/frontend/vite
