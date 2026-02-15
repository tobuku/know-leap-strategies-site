# CLAUDE.md - Project Context for Claude Code

## Project Overview

**Repository**: https://github.com/tobuku/Test2
**Live Site**: https://tobuku.github.io/Test2/
**Brand**: Know Leap Strategies (KLS)
**Purpose**: Proof driven decision systems consultancy site with advanced GSAP animations

## Current State

The site is **Know Leap Strategies** - a cinematic, conversion-focused consultancy landing page showcasing advanced GSAP animations with 34 integrated images across 12+ animated sections. The messaging centers on proof, verification, structure, and predictable execution.

### Files

- `index.html` - Main HTML structure
- `style.css` - All styling with CSS custom properties
- `script.js` - GSAP animations, Lenis smooth scroll, interactions
- `img/` - 34 images (1.jpg through 34.jpg)

### Tech Stack

- **GSAP 3.12.5** + ScrollTrigger (CDN)
- **Lenis 1.1.13** for smooth scrolling (CDN)
- **Fonts**: Syne (display), Instrument Serif (italics), Space Mono (labels)
- Vanilla HTML/CSS/JS (no build step)

### Brand Details

- **Full name**: Know Leap Strategies
- **Short name**: KLS
- **Contact email**: info@knowleapstrategies.com
- **No phone number or physical location** (removed by design)
- **Tagline**: Clear systems for complex decisions. Proof first. Clean outcomes.

### Page Section Order

1. Loader (counting animation 0-100%)
2. Navigation (fixed, mix-blend-mode difference) - Links: About, Work, Services, Process, Contact
3. Hero (images 1-2, floating shapes, gradient mesh, label-only stats)
4. Image Reel Strip (images 15-20)
5. About (image 3, pinned word-by-word text reveal + body copy)
6. Showcase (images 4-6, staggered grid) - "Decision Systems"
7. Process / Stack Cards (images 21-23, pinned stacking) - id="process"
8. Process Deliverables & Trust (deliverables list + "What you get in week one")
9. Work / Proof in Practice (images 7-9, horizontal scroll, 3 case study cards)
10. Cinematic Reveal (image 12, circle iris reveal) - "Where Proof Meets Action"
11. Bento Grid (images 24-29, mosaic) - "System Components"
12. Services (4 service tiles with bullet lists, no counters)
13. Diagonal Split (images 30-31, wipe reveals) - "Proof" / "Execution"
14. Duo (images 13-14, opposing parallax) - "Our method" / "Our outcomes"
15. Image Ribbon (images 32-34, tilted scroll)
16. Marquee ("Proof first. Clean outcomes.")
17. Contact (form: name, email, what are you building, where is it stuck)
18. Footer (Know Leap Strategies branding, nav links, email)

### Image Distribution

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

### Key Animation Techniques Used

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

### Design System

```css
/* Colors */
--void-black: #0a0a0b
--void-purple: #8b5cf6
--void-blue: #3b82f6
--void-coral: #f97316

/* Fonts */
--font-display: 'Syne'
--font-serif: 'Instrument Serif'
--font-mono: 'Space Mono'
```

## Git Workflow

- Push directly to `main` branch
- GitHub Pages deploys automatically from `main`
- No PR required for this test repo

## Notes

- Standard arrow cursor (custom cursor was removed per user preference)
- Site is fully responsive with breakpoints at 1024px, 768px, and 480px
- Hero stats are label-only (no fake numbers) - "Proof framework", "Verification loop", "Execution plan", "Stop list"
- Work section has 3 case study placeholder cards (not fake clients)
- Services use bullet lists instead of paragraph descriptions, no counter stats
- No fake phone, location, awards, or misleading claims
- When adding new images, continue the naming convention (35.jpg, 36.jpg, etc.)
- All existing animations must be preserved when adding new features
