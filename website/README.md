# Dharaa Marketing Website

Static brochure site for **DHARAA** — premium yet affordable Indian spices.

> Rooted in Nature. Crafted for Taste.

**No cart or checkout** — browse products, recipes, and brand story only.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (Dharaa brand tokens)
- Framer Motion + GSAP ScrollTrigger
- Static export (`output: 'export'`)

## Develop

```bash
cd website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production static build

```bash
npm run build
```

Output is in `out/` — deploy to Netlify, Vercel, GitHub Pages, or any static host.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Motion homepage |
| `/products` | Wave 1 product grid |
| `/products/[slug]` | Product detail (4 SKUs) |
| `/recipes` | Home recipes |
| `/about` | Brand story |
| `/find-us` | Distribution / Hardoi presence |

## Brand tokens

Cream `#F7F1E3` · Forest `#1B4D3E` · Gold `#C9A227` · Ink `#2C2416`

See `../docs/superpowers/specs/2026-08-10-dharaa-static-site-design.md` and `../Dharaa_Brand_Guidelines_v1.docx`.
