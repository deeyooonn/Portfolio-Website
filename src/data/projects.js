import { demoUrl } from '../utils/demoUrl';
// Screenshots: keep image as the card thumbnail; gallery accepts paths or { path, alt?, caption? }.
// Store files in public/projects/<project-id>-1.webp and reference /projects/<project-id>-1.webp.
// Recommended: 1600×1000 (16:10), WebP or PNG, ideally under 300 KB each.
// With no image, the first gallery entry becomes the thumbnail; cards without media show a category icon.
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
    tags: ["Next.js", "TypeScript", "MongoDB"],
    image: "/projects/prime-fleet-mobility-live-20261101-prime-ui-thumb.webp",
    gallery: [
      {"path":"/projects/prime-fleet-mobility-live-20261101-prime-ui-overview.webp","alt":"PRIME fleet dashboard with navy and gold styling, four metric cards, a dispatch log and activity feed","caption":"PRIME dashboard - light theme"},
      {"path":"/projects/prime-fleet-mobility-live-20261101-prime-ui-dark.webp","alt":"PRIME fleet dashboard in its original dark palette, with gold metrics, a dispatch log and activity feed","caption":"PRIME dashboard - dark theme"},
      {"path":"/projects/prime-fleet-mobility-live-20261101-prime-ui-bookings.webp","alt":"PRIME booking workspace with passenger requests, vehicle assignments, status filters and approval controls","caption":"PRIME bookings - sample requests"},
      {"path":"/projects/prime-fleet-mobility-live-20261101-prime-ui-mobile.webp","alt":"PRIME fleet dashboard on a phone with four metrics and labeled bottom navigation","caption":"PRIME dashboard - mobile layout"},
    ],
    demoNote: "Interactive fleet workflow showcase using sample data.",
    liveUrl: demoUrl(import.meta.env.VITE_DEMO_PRIME_URL ?? 'https://prime-fleet-demo.vercel.app'),
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
    tags: ["Next.js", "React", "PostgreSQL"],
    image: "/projects/just-ctrl-v-live-20261101-actual-thumb.webp",
    gallery: [
      {
        "path": "/projects/just-ctrl-v-live-20261101-actual-overview.webp",
        "alt": "Original Just CTRL + V screenshot and document upload application",
        "caption": "Original Just CTRL + V application"
      },
      {
        "path": "/projects/just-ctrl-v-live-20261101-actual-mobile.webp",
        "alt": "Current just-ctrl-v application on a phone-sized screen",
        "caption": "Original application - mobile layout"
      }
    ],
    liveUrl: demoUrl(import.meta.env.VITE_DEMO_CTRL_V_URL ?? 'https://just-ctrl-v.vercel.app'),
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
    tags: ["React", "TypeScript", "Supabase"],
    image: "/projects/margal-sport-center-live-20261101-actual-thumb.webp",
    gallery: [
      {
        "path": "/projects/margal-sport-center-live-20261101-actual-overview.webp",
        "alt": "Deployed Margal Sports homepage with the current sports booking interface",
        "caption": "Current Margal Sports homepage"
      },
      {
        "path": "/projects/margal-sport-center-live-20261101-actual-bookings.webp",
        "alt": "Margal court calendar and booking controls showing current online-reservation availability",
        "caption": "Court booking interface"
      },
      {
        "path": "/projects/margal-sport-center-live-20261101-actual-mobile.webp",
        "alt": "Current margal-sport-center application on a phone-sized screen",
        "caption": "Original application - mobile layout"
      }
    ],
    liveUrl: demoUrl(import.meta.env.VITE_DEMO_MARGAL_URL ?? 'https://margal-sports.vercel.app'),
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
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/projects/albion-enchantment-calculator-live-20261101-thumb.webp",
    gallery: [
      {"path":"/projects/albion-enchantment-calculator-live-20261101-overview.webp","alt":"Deployed Albion enchantment calculator with item, material, and crafting cost controls","caption":"Current enchantment calculator"},
    ],
    liveUrl: demoUrl(import.meta.env.VITE_DEMO_ALBION_URL ?? 'https://albion-calculator-two.vercel.app'),
    repoUrl: "https://github.com/deeyooonn/Albion-Online-Enchantment-Calculator",
  },
  {
    id: "just-paste",
    title: "Just Paste",
    year: "",
    role: "",
    summary: "A Flutter study app for turning documents and notes into flashcards on web and Android.",
    description: "Just Paste is built with Flutter for Android and web. The project includes document and text inputs, flashcard study screens, and an authenticated library. Its website now runs the original Flutter application.",
    highlights: [],
    tags: ["Flutter", "Android"],
    image: "/projects/just-paste-live-20261101-actual-thumb.webp",
    gallery: [
      {
        "path": "/projects/just-paste-live-20261101-actual-overview.webp",
        "alt": "Original Just Paste Flutter application with its study introduction and Google sign-in screen",
        "caption": "Original Flutter app - sign in"
      },
      {
        "path": "/projects/just-paste-live-20261101-actual-mobile.webp",
        "alt": "Current just-paste application on a phone-sized screen",
        "caption": "Original application - mobile layout"
      }
    ],
    liveUrl: demoUrl(import.meta.env.VITE_DEMO_JUST_PASTE_URL ?? 'https://just-paste-demo.vercel.app'),
    repoUrl: "https://github.com/deeyooonn/Just-Paste",
  },
  {
    id: "client-scrapper",
    title: "LeadHunter",
    year: "",
    role: "",
    summary: "An automated tool that finds small businesses and checks for websites and contact details.",
    description: "LeadHunter discovers local businesses through OpenStreetMap, checks their websites for contact details, and lets users filter locations across the Philippines and export results to CSV.",
    highlights: [],
    tags: ["Next.js", "TypeScript", "Supabase"],
    image: "/projects/client-scrapper-live-20261101-actual-thumb.webp",
    gallery: [
      {
        "path": "/projects/client-scrapper-live-20261101-actual-overview.webp",
        "alt": "Original LeadHunter application with province, city and business-category search controls",
        "caption": "LeadHunter - live discovery workspace"
      },
      {
        "path": "/projects/client-scrapper-live-20261101-actual-mobile.webp",
        "alt": "Current client-scrapper application on a phone-sized screen",
        "caption": "Original application - mobile layout"
      }
    ],
    liveUrl: demoUrl(import.meta.env.VITE_DEMO_LEADHUNTER_URL ?? 'https://leadhunter-snowy.vercel.app'),
    repoUrl: "https://github.com/deeyooonn/LeadHunter",
  },
  {
    id: "aether-arena",
    title: "Aether Arena",
    year: "",
    role: "",
    summary: "A 3D arena survival game with enemy waves, boss fights, and weapon upgrades.",
    description: "Aether Arena is a single-player browser game built with React, TypeScript, and Three.js. Players fight waves of enemies, face bosses, collect loot, and upgrade ranged and melee weapons between rounds.",
    highlights: [],
    tags: ["React", "TypeScript", "Three.js"],
    image: "/projects/aether-arena-live-20261101-thumb.webp",
    gallery: [
      {"path":"/projects/aether-arena-live-20261101-overview.webp","alt":"Deployed Aether Arena title screen with Single Player, Enemy Almanac, and Settings","caption":"Current Aether Arena title screen"},
      {"path":"/projects/aether-arena-live-20261101-gameplay.webp","alt":"Deployed Aether Arena gameplay with the player, enemies, and health and weapon HUD","caption":"Current arena gameplay"},
    ],
    liveUrl: demoUrl(import.meta.env.VITE_DEMO_AETHER_URL ?? 'https://aether-arena-phi.vercel.app'),
    repoUrl: "https://github.com/deeyooonn/AeA",
  },
];
