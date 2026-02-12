# CLAUDE.md

## Project Overview

**Mount Sinai NY vs The World** is a React web application that generates data-driven, factual comparisons between Mount Sinai, NY and any user-specified town. It uses Google Gemini AI to produce structured comparison data across 18+ categories (real estate, schools, safety, history, food, famous people, etc.) and generates AI-created side-by-side visual representations.

Deployed to GitHub Pages at `/Mount-Sinai-vs-The-World/`.

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (loaded via CDN in `index.html`)
- **Icons:** lucide-react
- **AI Backend:** Google Gemini API (`@google/genai`) — uses `gemini-3-pro-preview` for text comparisons and `gemini-2.5-flash-image` for image generation
- **Font:** Inter (Google Fonts CDN)
- **Deployment:** GitHub Pages via GitHub Actions

## Repository Structure

```
├── App.tsx                        # Main app component — state management, search UI, layout
├── index.tsx                      # React DOM entry point (StrictMode)
├── index.html                     # HTML template with Tailwind CDN, import maps, custom CSS
├── types.ts                       # TypeScript interfaces (ComparisonCategory, ComparisonResult, TownName)
├── constants.tsx                  # Shortcut towns array and category-to-icon mapping
├── components/
│   └── ComparisonDisplay.tsx      # Renders comparison results: hero image, category cards, verdict
├── services/
│   └── geminiService.ts           # Gemini API integration: compareTowns(), generateVictoryImage()
├── vite.config.ts                 # Vite config — base path, output dir
├── tsconfig.json                  # TypeScript config — ES2022, react-jsx, bundler resolution
├── package.json                   # Dependencies and scripts
├── metadata.json                  # Google AI Studio app metadata
├── .github/
│   └── workflows/
│       ├── deploy.yml             # Build + deploy to GitHub Pages (main branch)
│       └── static.yml             # Static content deployment (main branch)
└── .gitignore
```

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
```

## Environment Variables

| Variable  | Description                  | Where to set     |
|-----------|------------------------------|-------------------|
| `API_KEY` | Google Gemini API key        | `.env.local` file |

The API key is accessed in `services/geminiService.ts` via `process.env.API_KEY`.

## Architecture

### Data Flow

```
User enters town name → App.tsx handleCompare()
  → compareTowns(town) in geminiService.ts (Gemini API call with structured JSON schema)
  → Parse response into ComparisonResult
  → generateVictoryImage(heroImagePrompt) (Gemini image generation)
  → Render ComparisonDisplay with result + hero image
```

### Key Types (`types.ts`)

- `ComparisonCategory` — individual comparison metric with `mtSinaiFactual` and `otherTownFactual` fields
- `ComparisonResult` — full response: headline, summary, targetTown, categories[], verdict, heroImagePrompt
- `TownName` — union type of predefined shortcut towns

### Component Responsibilities

- **`App.tsx`** — Main container. Manages all state (`inputValue`, `isLoading`, `result`, `heroImage`, `error`). Handles search, shortcuts, loading states, and error display.
- **`ComparisonDisplay.tsx`** — Pure presentation component. Takes `ComparisonResult` and optional `heroImage` as props. Renders the two-column comparison, category cards with icons, and verdict section.
- **`geminiService.ts`** — API layer. Two exported functions:
  - `compareTowns(targetTown)` — structured comparison with Google Search grounding
  - `generateVictoryImage(prompt)` — AI image generation, returns base64 data URI or null

### Styling Conventions

- Tailwind utility classes throughout (no separate CSS files beyond `index.html` custom styles)
- Custom CSS classes: `.mt-sinai-navy`, `.mt-sinai-blue`, `.mt-sinai-light-blue` defined in `index.html`
- Color palette: slate/gray neutrals with blue accents for Mount Sinai branding
- Responsive breakpoints: mobile-first with `md:` prefix

## CI/CD

Two GitHub Actions workflows deploy to GitHub Pages on push to `main`:

- **`deploy.yml`** — Installs deps, runs `npm run build`, uploads `dist/` as artifact, deploys to Pages (primary workflow)
- **`static.yml`** — Uploads entire repo as static content to Pages (alternative/legacy workflow)

## Testing & Linting

No testing framework, linter, or formatter is currently configured. There are no test files in the repository.

## Path Aliases

TypeScript path alias configured in `tsconfig.json`:
- `@/*` maps to `./*` (project root)

## Important Notes

- The `index.html` uses ES module import maps to load React, ReactDOM, lucide-react, and @google/genai from esm.sh CDN
- The Vite base path is `/Mount-Sinai-vs-The-World/` (GitHub project site convention)
- The Gemini system instruction enforces neutral, unbiased comparisons — do not modify this to add bias
- `.env.local` files are gitignored — never commit API keys
- The project originated from Google AI Studio (see `metadata.json`)
