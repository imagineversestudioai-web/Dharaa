# Dharaa Static Marketing Site — Design Spec

**Version:** 1.0  
**Date:** 2026-08-10  
**Status:** Approved  

## Summary

Static marketing website for **DHARAA**, a mid-premium Indian spices brand. Inspired by Barcoop Bevy’s section rhythm and motion patterns, re-skinned with Dharaa brand tokens (cream / forest / gold). **No cart, checkout, or payments.**

## Goals

- Present brand story, Wave 1 products, recipes, and local presence (Hardoi → UP).
- Feel premium-accessible, rooted, trustworthy.
- Motion: moderate–cinematic (marquee, spice orbit, scroll reveals, product carousel).
- Deployable as fully static files.

## Out of scope

- E-commerce cart / checkout / Shopify
- User accounts, inventory, live payments
- CMS backend (content is local TypeScript data)

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + CSS design tokens
- Framer Motion (UI reveals) + GSAP ScrollTrigger (spice ring / scrub)
- `output: 'export'` for static hosting

## Brand tokens

| Token | Value | Use |
|-------|-------|-----|
| Cream | `#F7F1E3` | Page background |
| Forest | `#1B4D3E` | Primary, nav accents, footer, CTAs |
| Forest deep | `#0F3328` | Dark text on cream panels |
| Gold | `#C9A227` | Accents, rules, emblem |
| Ink | `#2C2416` | Body text |
| Ink muted | `#5C5346` | Secondary text |
| Chili | `#8B1E1E` | Laal Mirchi |
| Coriander | `#2F5D3A` | Dhaniya |
| Garam | `#5C3A1E` | Garam Masala |
| All-in-One | `#B8860B` | All in One |

**Tagline:** Rooted in Nature. Crafted for Taste.  
**Type:** Playfair Display (headings) + DM Sans (body); Devanagari via Noto Sans Devanagari where needed.

## Information architecture

| Route | Purpose |
|-------|---------|
| `/` | Motion homepage |
| `/products` | Wave 1 grid + Wave 2 teaser |
| `/products/[slug]` | Product story pages (4 SKUs) |
| `/recipes` | Recipe cards |
| `/about` | Brand story |
| `/find-us` | Distribution / Hardoi presence |

## Homepage sections

1. Promo bar (launch message)
2. Sticky/transparent nav (no basket)
3. Hero — headline + tagline + lifestyle visual treatment
4. Marquee — Carefully Sourced · Cleaned Naturally · Expertly Blended · Packed with Care
5. Purity theater — deep field + REAL Ingredients + spice orbit
6. Product carousel — Wave 1 four (links to product pages, not cart)
7. Recipes teaser
8. Find us / trade CTA
9. Footer — forest, links, tagline

## Motion principles

- Animate `transform` / `opacity` only
- Signature moments: marquee loop, scroll-linked spice ring, staggered reveals
- Product carousel: centered, gentle autoplay, manual arrows
- Respect `prefers-reduced-motion`
- Ease: custom ease-out `[0.22, 1, 0.36, 1]`; durations 0.3–0.75s for entrances

## Content (Wave 1)

- Laal Mirchi Powder (200g)
- Dhaniya Masala (100g)
- Garam Masala (100g)
- All in One Masala (100g)

## Success criteria

- Visually on-brand (cream/forest/gold)
- Mobile-readable hierarchy
- Static build succeeds with no cart UI
- Reduced-motion path usable

## Self-review

- No TBD placeholders for core scope
- Consistent: static only, no commerce
- Scoped to marketing brochure site
- Product CTAs = “Explore” / “View product”, never “Buy” / “Add to cart”
