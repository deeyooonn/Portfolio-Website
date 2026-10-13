# Dion De Guzman — Personal Portfolio

Minimal, calm developer portfolio featuring a **full-viewport landing screen with layered window panels** over a soft starry night sky.

Built with React 19, Vite, Tailwind CSS v4, Framer Motion, and custom HTML5 Canvas particle systems.

For full technical specifications, architecture decisions, and component breakdowns, see [PROJECT_OVERVIEW.md](../PROJECT_OVERVIEW.md) and [LAYERED_NAV_CHANGES.md](../LAYERED_NAV_CHANGES.md).

---

## Quick Start

```powershell
# 1. Install dependencies
npm install

# 2. Run local dev server (http://localhost:5173/)
npm run dev

# 3. Lint with Oxlint
npm run lint

# 4. Production build
npm run build
```

---

## Architecture Summary

- **Navigation:** Layered panel windows (`Panel.jsx`) synced to URL hash (`#projects`, `#skills`, `#contact`).
- **Landing:** Full-viewport landing screen (`Landing.jsx`) with vertical menu rows replacing top navbars and long page scrolling.
- **Design Tokens:** Deep midnight (`#05070d`), panel surface (`#0a0f1c`), and pale-blue accent (`#9ec1ff`).
- **Typography:** Instrument Sans via Google Fonts in sentence case.
- **Background:** High-DPI canvas starfield with soft sinusoidal twinkle behind all views.
- **Accessibility:** Full WCAG keyboard trap, Escape key dismiss, focus restoration, and `prefers-reduced-motion` compliance.
