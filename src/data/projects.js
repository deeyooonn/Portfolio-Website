// Screenshots: keep image as the card thumbnail; gallery accepts paths or { path, alt?, caption? }.
// Store files in public/projects/<project-id>-1.webp and reference /projects/<project-id>-1.webp.
// Recommended: 1600×1000 (16:10), WebP or PNG, ideally under 300 KB each.
// With no image, the first gallery entry becomes the thumbnail; empty media shows a constellation.
// ─── Projects Data ────────────────────────────────────────────────────────────
// Central definition of all portfolio projects.
//
// Field rules:
//   - id: Unique slug used in URL hash (#projects/<id>)
//   - title: Project title shown on card and detail view
//   - year: Year string (e.g. "2026"). Leave empty ("") to cleanly hide the year.
//   - role: Your role on the project. Leave empty ("") to hide.
//   - summary: Short 1-2 sentence description shown on the grid card.
//   - description: 2-4 sentences explaining what the project does and what was built.
//   - highlights: Array of concrete accomplishment strings. Empty array hides the section.
//   - tags: Array of technology strings (e.g. ["React", "Python"]). Empty array hides tags.
//   - image: Thumbnail image path (e.g. "/images/thumb.png") or null to omit.
//   - gallery: Array of extra screenshot paths or empty array ([]).
//   - liveUrl: Live website URL. Empty string ("") hides the live link.
//   - repoUrl: GitHub repository URL. Empty string ("") hides the repo link.
//
// Any number of projects can be added here; the grid dynamically scales row by row.
// ─────────────────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: "prime-fleet-mobility",
    title: "PRIME: Intelligent Fleet and Mobility Management System",
    year: "",
    role: "",
    summary: "An employee platform for booking company cars and services that I contributed to as part of PRIME's development team during my internship.",
    description: "PRIME helps company employees book cars and services through one platform. During my internship, I worked alongside the development team and contributed to building the system.",
    highlights: [],
    tags: [],
    image: "/projects/prime-fleet-mobility-thumb.webp",
    gallery: [{"path":"/projects/prime-fleet-mobility-front.webp","alt":"PRIME Philippines sign-in page","caption":"Sign-in page"}],
    liveUrl: "",
    repoUrl: "https://github.com/prime-philippines/PRIME-Philippines-Intelligent-Fleet-and-Mobility-Management-System",
  },
  {
    id: "just-ctrl-v",
    title: "Just CTRL + V",
    year: "",
    role: "",
    summary: "Scans documents and images with AI to create table-style reviewers and flashcards.",
    description: "Just CTRL + V uses AI to read documents and pictures and turn them into reviewers and flashcards. Users can save and export their files.",
    highlights: [],
    tags: [],
    image: "/projects/just-ctrl-v-thumb.webp",
    gallery: [{"path":"/projects/just-ctrl-v-front.webp","alt":"Just CTRL + V home screen","caption":"Home screen"}],
    liveUrl: "",
    repoUrl: "https://github.com/deeyooonn/just-ctrl-v",
  },
  {
    id: "margal-sport-center",
    title: "Margal Sports Website",
    year: "",
    role: "",
    summary: "A website with booking and management tools for Margal Sports clients.",
    description: "The website helps Margal Sports clients book services and manage their bookings.",
    highlights: [],
    tags: [],
    image: "/projects/margal-sport-center-thumb.webp",
    gallery: [{"path":"/projects/margal-sport-center-front.webp","alt":"Margal Sports Website home screen","caption":"Home screen"}],
    liveUrl: "",
    repoUrl: "https://github.com/deeyooonn/Margal-Sport-Center-Website",
  },
  {
    id: "albion-enchantment-calculator",
    title: "Albion Online Enchantment Calculator",
    year: "",
    role: "",
    summary: "A crafting calculator for planning the items and materials needed in Albion Online.",
    description: "The calculator helps Albion Online players work out the items and materials required to craft in-game gear and other items.",
    highlights: [],
    tags: [],
    image: "/projects/albion-enchantment-calculator-thumb.webp",
    gallery: [{"path":"/projects/albion-enchantment-calculator-front.webp","alt":"Albion Online Enchantment Calculator home screen","caption":"Home screen"}],
    liveUrl: "",
    repoUrl: "https://github.com/deeyooonn/Albion-Online-Enchantment-Calculator",
  },
  {
    id: "just-paste",
    title: "Just Paste",
    year: "",
    role: "",
    summary: "An Android-focused Flutter app that scans documents with AI and turns them into flashcards.",
    description: "Just Paste uses AI to read documents and create flashcards for studying. It is built with Flutter, primarily for Android devices.",
    highlights: [],
    tags: ["Flutter", "Android"],
    image: "/projects/just-paste-thumb.webp",
    gallery: [{"path":"/projects/just-paste-front.webp","alt":"Just Paste home screen","caption":"Home screen"},{"path":"/projects/just-paste-mobile.webp","alt":"Just Paste mobile home screen","caption":"Mobile home screen"}],
    liveUrl: "",
    repoUrl: "https://github.com/deeyooonn/Just-Paste",
  },
  {
    id: "client-scrapper",
    title: "LeadHunter",
    year: "",
    role: "",
    summary: "An automated tool that finds small businesses and checks for websites and contact details.",
    description: "LeadHunter searches Google Maps for potential small-business clients, checks for websites, phone numbers, and email addresses, and lets users filter locations across the country.",
    highlights: [],
    tags: [],
    image: "/projects/client-scrapper-thumb.webp",
    gallery: [{"path":"/projects/client-scrapper-front.webp","alt":"LeadHunter home screen","caption":"Home screen"}],
    liveUrl: "",
    repoUrl: "https://github.com/deeyooonn/Client-Scrapper",
  },
];
