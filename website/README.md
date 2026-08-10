# Dharaa Marketing Website

Static brochure site for **DHARAA** — premium yet affordable Indian spices.

> Rooted in Nature. Crafted for Taste.

**No cart or checkout** — static HTML only after build.

## Stack

- Next.js App Router (static export)
- TypeScript · Tailwind CSS
- Framer Motion · GSAP ScrollTrigger

## Develop

```bash
cd website
npm install
npm run dev
```

Open http://localhost:3000

## Static production build

```bash
cd website
npm ci
npm run build
```

Output folder: **`website/out`** (upload this, or point the host at it).

Preview locally:

```bash
npm run preview
```

---

## Deploy settings (static)

| Setting | Value |
|---------|--------|
| **Root / base directory** | `website` |
| **Node version** | 18+ (20 recommended) |
| **Install** | `npm ci` |
| **Build command** | `npm run build` |
| **Publish directory** | `out` |
| **Framework** | Other / Static (not “Next.js SSR”) |

### Render.com

**Option A — Blueprint** (repo root has `render.yaml`):

1. Render Dashboard → **New** → **Blueprint**
2. Connect `imagineversestudioai-web/Dharaa`
3. Apply — service `dharaa-website` is created automatically

**Option B — Manual Static Site:**

1. **New** → **Static Site**
2. Connect the GitHub repo
3. Settings:

| Field | Value |
|-------|--------|
| Name | `dharaa-website` |
| Branch | `main` |
| Root Directory | `website` |
| Build Command | `npm ci && npm run build` |
| Publish Directory | `out` |

4. Create Static Site → wait for deploy

### Netlify

- Base directory: `website`
- Build: `npm ci && npm run build`
- Publish: `out`  
  (`netlify.toml` is included)

### Vercel

- Root: `website`
- Build: `npm run build`
- Output: `out`  
  (`vercel.json` is included — do **not** use Next.js SSR preset)

### Cloudflare Pages

| Field | Value |
|-------|--------|
| Root directory | `website` |
| Build command | `npm ci && npm run build` |
| Build output | `out` |

### Any host (FTP / S3 / cPanel)

Upload **contents** of `website/out/` to the web root.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/products` | Wave 1 product grid |
| `/products/[slug]` | Product detail |
| `/recipes` | Recipes |
| `/about` | Brand story |
| `/find-us` | Distribution |

## Brand tokens

Cream `#F7F1E3` · Forest `#1B4D3E` · Gold `#C9A227` · Ink `#2C2416`
