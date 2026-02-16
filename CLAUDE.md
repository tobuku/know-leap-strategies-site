# CLAUDE.md - Project Context for Claude Code

## Project Overview

**Repository**: https://github.com/tobuku/know-leap-strategies-site
**Live Site**: https://knowleapstrategies.com
**Brand**: Know Leap Strategies (KLS)
**Purpose**: Proof-driven decision systems consultancy site with advanced GSAP animations

## Current State

The site is **Know Leap Strategies** — a cinematic, conversion-focused consultancy landing page showcasing advanced GSAP animations with 34 integrated images across 12+ animated sections. The messaging centers on proof, verification, structure, and predictable execution. Deep experience in tech and real estate.

### Files

- `index.html` — Main site with all sections and GSAP animation hooks
- `style.css` — All styling with CSS custom properties design system
- `script.js` — GSAP animations, Lenis smooth scroll, interactions
- `privacy.html` — Privacy policy (inline styles, dark theme)
- `terms.html` — Terms of service (inline styles, dark theme)
- `support.html` — Support page (inline styles, dark theme)
- `CNAME` — Custom domain: knowleapstrategies.com
- `img/` — 34 images (1.jpg through 34.jpg)
- `assets/images/brand/kls-logo-primary.svg` — Primary SVG logo
- `assets/images/icons/` — Favicons and icon SVGs

### Tech Stack

- **GSAP 3.12.5** + ScrollTrigger (CDN)
- **Lenis 1.1.13** for smooth scrolling (CDN)
- **Fonts**: Syne (display), Instrument Serif (italics), Space Mono (labels)
- Vanilla HTML/CSS/JS — no build step, no framework
- GitHub Pages deployment from `main` branch

### Brand Details

- **Full name**: Know Leap Strategies
- **Short name**: KLS
- **Contact email**: info@knowleapstrategies.com
- **Mailing address**: 1785 S King St Suite 3, Honolulu, HI 96826, USA
- **Tagline**: Clear systems for complex decisions. Proof first. Clean outcomes.
- **Industries**: Tech and real estate

### Favicon & Logo Assets

- `assets/images/brand/kls-logo-primary.svg` — Used in header, footer, and loader
- `assets/images/icons/knowleap_favicon.ico` — Browser tab favicon
- `assets/images/icons/favicon-16x16.png` — 16px favicon
- `assets/images/icons/favicon-32x32.png` — 32px favicon
- `assets/images/icons/favicon-48x48.png`
- `assets/images/icons/favicon-64x64.png`
- `assets/images/icons/favicon-128x128.png`
- `assets/images/icons/favicon-256x256.png` — Used for apple-touch-icon and OG/Twitter social preview
- `assets/images/icons/icon-proof.svg`, `icon-structure.svg`, `icon-verify.svg` — Icon SVGs

All four HTML pages include favicon `<link>` tags, Open Graph, and Twitter Card meta tags.

## Page Structure

### Main Site (index.html)

1. Loader (counting animation 0-100%, KLS logo)
2. Navigation (fixed, mix-blend-mode difference) — Links: About, Work, Services, Process, Contact
3. Hero (images 1-2, floating shapes, gradient mesh, label-only stats)
4. Image Reel Strip (images 15-20)
5. About (image 3, pinned word-by-word text reveal + body copy)
6. Showcase (images 4-6, staggered grid) — "Decision Systems"
7. Process / Stack Cards (images 21-23, pinned stacking) — id="process"
8. Process Deliverables & Trust (deliverables list + "What you get in week one")
9. Work / Proof in Practice (images 7-9, horizontal scroll, 3 case study cards)
10. Cinematic Reveal (image 12, circle iris reveal) — "Where Proof Meets Action"
11. Bento Grid (images 24-29, mosaic) — "System Components"
12. Services (4 service tiles with context, bullet lists, and outcome statements)
13. Diagonal Split (images 30-31, wipe reveals) — "Proof" / "Execution"
14. Duo (images 13-14, opposing parallax) — "Our method" / "Our outcomes"
15. Image Ribbon (images 32-34, tilted scroll)
16. Marquee ("Proof first. Clean outcomes.")
17. Contact (form: name, email, what are you building, where is it stuck)
18. Footer (KLS logo, branding, nav links, email, legal links)

### Subpages

- `privacy.html` — Privacy policy, last updated 2026-01-05
- `terms.html` — Terms of service, last updated 2026-01-05
- `support.html` — Support contact and guidelines

Subpages use **inline `<style>` blocks** (not the shared stylesheet) but match the dark KLS theme with the same color system, fonts, and component patterns (header, footer, content cards). Each includes its own responsive breakpoints.

### Services Section Detail

Each service card has three layers:
1. **Context** (`.service-context`) — Who it's for and the problem it solves
2. **Bullets** (`.service-bullets`) — What gets built, with specifics
3. **Outcome** (`.service-outcome`) — What the client walks away with

Services:
- **Audience acquisition system** — For tech/real estate teams needing qualified leads
- **Authority engine** — For founders needing market positioning
- **Digital infrastructure** — For businesses whose site doesn't convert
- **Asset growth strategy** — For investors building/acquiring digital properties

## Image Distribution

| Images | Section | Animation Techniques |
|--------|---------|---------------------|
| 1-2 | Hero | Clip-path reveal, 3D mouse parallax, scroll parallax, glow effect |
| 3 | About | Circular mask, scroll-driven 360deg rotation, grayscale-to-color |
| 4-6 | Showcase | Asymmetric grid, directional stagger reveals, inner parallax |
| 7-9 | Work Cards | Grayscale-to-color hover, scale parallax during horizontal scroll |
| 12 | Cinematic | Pinned circle clip-path iris reveal, counter-zoom |
| 13-14 | Duo | Opposing parallax, rotation entrance, gradient divider |
| 15-20 | Image Reel | Dual-row infinite scroll, opposite directions, scroll-speed boost |
| 21-23 | Stack Cards | Pinned stacking, fly-in with rotation, fanned deck effect |
| 24-29 | Bento Grid | Asymmetric mosaic, unique clip-path reveals per item |
| 30-31 | Diagonal Split | Pinned wipe reveal from opposing sides, counter-zoom |
| 32-34 | Image Ribbon | Tilted continuous scroll, dynamic tilt on scroll |

## Key Animation Techniques

- **ScrollTrigger pinning** with scrub for cinematic scroll-driven effects
- **Clip-path animations** (polygon, circle, inset) for image reveals
- **3D transforms** (perspective, rotateX/Y) for depth and mouse reactivity
- **Parallax** at multiple levels (container, inner image, scroll-driven)
- **Grayscale-to-color** CSS filter transitions on hover
- **Staggered reveals** with varied directions and rotations
- **Infinite CSS animations** for reels, ribbons, and marquees
- **Magnetic buttons** with elastic snap-back
- **Text scramble** effect on hover
- **Word-by-word pinned text reveal** in about section

## Design System

```css
/* Colors */
--void-black: #0a0a0b
--void-dark: #111113
--void-gray: #1a1a1d
--void-gray-light: #2a2a2f
--void-white: #fafafa
--void-muted: #6b6b7b
--void-purple: #8b5cf6
--void-gradient: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #f97316 100%)

/* Fonts */
--font-display: 'Syne', sans-serif
--font-serif: 'Instrument Serif', serif
--font-mono: 'Space Mono', monospace
```

## Git Workflow

- Push directly to `main` branch
- GitHub Pages deploys automatically from `main`
- Custom domain configured via CNAME file

## Important Rules

- All existing animations must be preserved when making changes
- Hero stats are label-only (no fake numbers)
- Work section has 3 case study placeholder cards (not fake clients)
- Services use bullet lists with context and outcome lines
- No fake phone numbers, awards, or misleading claims
- Subpages use inline styles — update each file individually when changing shared patterns
- When adding new images, continue the naming convention (35.jpg, 36.jpg, etc.)
- Site is fully responsive with breakpoints at 1024px, 768px, and 480px
- Header logos are 48px desktop, 36px mobile
- Footer logos use `loading="lazy"` for performance
