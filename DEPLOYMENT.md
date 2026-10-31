# Vercel deployment
Import `deeyooonn/Portfolio-Website`. The Git repository root is this directory: do not set Root Directory to another `portfolio-app` folder in Vercel. Select Node.js 22.x. `vercel.json` provides Vite, `npm ci`, `npm run build`, and `dist`.

The portfolio builds without environment variables. After deploying each project, set its public URL using the names in `.env.example`, then redeploy the portfolio. These Vite values are embedded at build time. Empty or non-HTTPS values hide the demo link; they do not create placeholder links.

Check the project links, hash routes, and mobile navigation on the actual deployment. No production URLs have been invented.

Reference: https://vercel.com/docs/frameworks/frontend/vite
