# Know Leap Strategies — Site

## Project Overview
Marketing website for Know Leap Strategies. Live at **knowleapstrategies.com**, hosted via GitHub Pages from the `main` branch.

## Architecture
- **Single-page static site** — no build tools, no frameworks, no bundler
- `index.html` is the entire site: inline CSS + inline JS in one self-contained file
- Additional pages: `privacy.html`, `terms.html`, `support.html`
- All assets in `assets/images/` (brand, cards, sections, icons)
- Domain configured via `CNAME` file

## Tech Stack
- **Fonts**: Instrument Serif (headlines) + DM Sans (body) via Google Fonts CDN
- **Animation**: GSAP 3.12.5 + ScrollTrigger + ScrollToPlugin (all CDN)
- **No dependencies** — everything loads from CDNs, no `package.json` or `node_modules`

## Design System: "Geometric Precision"
- **White background** (#ffffff) — do not change
- **Black/dark text** (--ink: #0f172a) — do not change
- **KLS logo SVG** unchanged at `assets/images/brand/kls-logo-primary.svg`
- **Arrow cursor** (default) — do not change to custom cursor
- **Green accent** (#16a34a) — used sparingly for CTAs, progress bar, accents
- Existing images and copy must be preserved

## Key Animation Features
- Cinematic preloader (dark curtain with logo + progress bar)
- Cursor-following green glow (desktop only)
- Character-by-character scramble text reveals (headlines)
- Velocity-responsive horizontal text marquees
- SVG chevron line-draw on scroll
- Inset clip-path image reveals with Ken Burns zoom
- 3D card tilt with dynamic light-source overlay
- Magnetic buttons with ripple effects
- Counter animations on process step numbers
- Parallax depth on section images
- Transparent-to-frosted-glass header on scroll

## Important Patterns

### Preloader Safety
The preloader (`z-index: 9999`, dark overlay) has multiple safety nets:
1. CSS `@keyframes preloader-fallback` auto-hides it after 4 seconds
2. `killPreloader()` runs immediately if `prefers-reduced-motion` is on or GSAP fails
3. `try/catch` wraps the entire animation engine — errors kill the preloader
Never add a preloader without these fallbacks.

### Headline Text
All `h1`/`h2` with class `.kls-headline` must have text both in the HTML content AND in a `data-text` attribute. The JS scramble effect reads from `data-text`, but the HTML text is the fallback if JS fails.

### Reduced Motion
`prefers-reduced-motion: reduce` disables ALL animations and hides decorative layers (grain, line art, cursor glow). The page must remain fully readable and functional in this state. Windows users with "Animation effects" off trigger this.

## File Structure
```
know-leap-strategies-site/
  index.html          # Main site (CSS + JS inline)
  privacy.html        # Privacy policy
  terms.html          # Terms of service
  support.html        # Support page
  CNAME               # Domain: knowleapstrategies.com
  assets/
    images/
      brand/          # kls-logo-primary.svg
      cards/          # Service card images (3)
      sections/       # Hero + section images (7)
      icons/          # SVG icons (3)
```

## Deployment
- Push to `main` branch auto-deploys via GitHub Pages
- Allow 1-3 minutes for GitHub Pages to rebuild after push
- Hard refresh (Ctrl+Shift+R) or incognito to bypass browser cache

## Testing Checklist
1. Open in browser — preloader plays then reveals page
2. Scroll through all sections — headlines scramble-reveal, images clip-reveal
3. Hover cards — 3D tilt with light reflection
4. Hover/click buttons — magnetic pull + ripple
5. Check marquee strips respond to scroll velocity
6. Resize to mobile (< 900px) — hamburger menu, single-column layout
7. Test with `prefers-reduced-motion: reduce` — page loads clean, no animations
8. Verify all images load from `assets/` paths
9. Check both Chrome and Firefox
