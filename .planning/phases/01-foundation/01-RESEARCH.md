# Phase 1: Foundation & Design - Research

**Researched:** 2026-05-30
**Domain:** Astro.js static site setup, CSS custom properties design system, mobile-first responsive architecture
**Confidence:** MEDIUM-HIGH

## Summary

Phase 1 establishes the technical foundation for a 5-page Astro.js static site for Oak Ridge Roofing Co. The research confirms that Astro.js v6.4.2 is the current stable release, with the recommended project structure being `src/pages/`, `src/components/`, `src/layouts/`, `src/styles/`, and `public/`. CSS custom properties are the standard approach for design tokens in vanilla CSS setups, aligning with D-10 (no Tailwind). The mobile-first breakpoint strategy is confirmed as standard practice using `min-width` media queries, with the project-specified breakpoints at 320px (base), 768px, 1024px, and 1440px. Google Fonts integration via Astro's built-in `astro:assets` Font component is the recommended approach for Archivo and Roboto Slab.

**Primary recommendation:** Initialize Astro with `npm create astro@latest`, use CSS custom properties for all design tokens in `src/styles/global.css`, create a base `Layout.astro` with header/footer slots, and configure Google Fonts via `astro.config.mjs`.

## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-08:** Framework — Astro.js (static-first, fast, clean hand-off)
- **D-09:** No UI framework (React/Vue/Svelte) — vanilla Astro components only
- **D-10:** Global CSS — CSS custom properties for design tokens, no Tailwind
- **D-01:** Color palette — Warm earth tones (tan, brown, forest green)
- **D-02:** Typography — Industrial slab serif (Archivo / Roboto Slab for headlines) with clean sans body
- **D-04:** Header — Logo + nav + prominent click-to-call button (sticky on scroll, mobile-first)
- **D-05:** Footer — Brand attribution "Page and Pixel", links, contact info, service areas
- **D-06:** Responsive breakpoints — Mobile-first: 320px base → 768px → 1024px → 1440px

### Claude's Discretion

- Specific color values for the earth tone palette (D-01 defines direction, not exact hex values)
- Specific font loading strategy (Google Fonts via astro:assets Font component)
- Component internal structure (how header collapses on mobile, footer column layout)
- Design token naming conventions and CSS organization

### Deferred Ideas (OUT OF SCOPE)

- None — all decisions were within phase scope

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Design tokens (colors, typography, spacing) | Global CSS | — | CSS custom properties declared in `:root`, cascade to all components |
| Base layout (header + footer shell) | Astro Layout | — | `.astro` layout wraps all pages via `<slot />` |
| Header (logo, nav, click-to-call) | Astro Component | — | `src/components/Header.astro` — server-rendered, sticky via CSS |
| Footer (brand, links, contact) | Astro Component | — | `src/components/Footer.astro` — server-rendered |
| Responsive breakpoint system | Global CSS | — | CSS media queries in `src/styles/global.css` |
| Font loading | Astro Config + Layout | — | `astro.config.mjs` fontProviders + `<Font />` in layout head |
| Page routing | Astro Pages | — | `src/pages/*.astro` files auto-route |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro.js | 6.4.2 [VERIFIED: npm registry] | Static site framework | Static-first, zero JS by default, clean HTML output |
| TypeScript | (bundled with Astro) | Type safety for any JS/TS | Astro includes tsconfig.json by default |

### Fonts

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Google Fonts: Archivo | Latest via Font provider | Headline slab serif | [ASSUMED: Google Fonts catalog] — industrial sans-serif with slab-like weight |
| Google Fonts: Roboto Slab | Latest via Font provider | Alternative headline font | [ASSUMED: Google Fonts catalog] — actual slab serif per D-02 |

### No External CSS Frameworks

| Instead of | Use | Rationale |
|------------|-----|-----------|
| Tailwind CSS | CSS custom properties + vanilla CSS | D-10 locks no Tailwind; clean hand-off requirement |
| Bootstrap | Vanilla CSS | D-10 locks no framework |
| CSS-in-JS | Global CSS with custom properties | Simpler, static-first, no runtime |

## Package Legitimacy Audit

> **Required** whenever this phase installs external packages. Run the Package Legitimacy Gate protocol before completing this section.

This phase installs zero external packages beyond Astro itself (which is bootstrapped via `npm create astro`). No additional npm packages are required for Phase 1 deliverables.

**Packages removed due to slopcheck [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

## Architecture Patterns

### System Architecture Diagram

```
[Browser Request]
       |
       v
[Static HTML]<-- Astro builds to /dist
 |
       v
[Layout.astro] -- wraps every page
       |
       +--<Header.astro> -- sticky, contains logo + nav + click-to-call
       |
       +-- <slot /> -- page content
       |
       +-- <Footer.astro> -- brand attribution + links + contact
       |
       v
[Global CSS] -- design tokens, typography, breakpoints
```

### Recommended Project Structure

```
oak-ridge-roofing/
├── public/
│   ├── favicon.svg
│   └── fonts/               # self-hosted fonts if needed
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── [future: Card.astro, TrustBar.astro, FAQ.astro, etc.]
│   ├── layouts/
│   │   └── Layout.astro     # base layout wrapping all pages
│   ├── pages/
│   │   ├── index.astro      # homepage
│   │   ├── services.astro
│   │   ├── repair.astro
│   │   ├── storm-damage.astro
│   │   └── contact.astro
│   └── styles/
│       └── global.css       # design tokens, typography, breakpoints
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### Pattern 1: Astro Base Layout with Slots

**What:** A `Layout.astro` file that wraps all page content with shared header/footer
**When to use:** Every page of the site
**Example:**

```astro
---
// src/layouts/Layout.astro
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Oak Ridge Roofing Co.' } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <title>{title} | Oak Ridge Roofing Co.</title>
</head>
<body>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</body>
</html>
```

**Source:** [Astro docs - Project Structure]()

### Pattern 2: CSS Custom Properties Design Tokens

**What:** All design tokens declared as CSS custom properties on `:root`, consumed via `var()` throughout
**When to use:** Every component — colors, typography, spacing
**Example:**

```css
/* src/styles/global.css */
:root {
  /* Colors — warm earth tones per D-01 */
  --color-primary: #5D4E37;       /* brown — primary brand */
  --color-secondary: #3D5A45;     /* forest green — accent */
  --color-background: #F5F0E8;    /* tan — warm off-white */
  --color-surface: #FFFFFF;
  --color-text: #2C2416;          /* dark brown text */
  --color-text-muted: #6B5D4D;
  --color-accent: #C4A35A;         /* warm gold accent */

  /* Typography scale per D-02 */
  --font-headline: 'Roboto Slab', serif;
  --font-body: 'Archivo', sans-serif;
  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem;        /* 14px */
  --font-size-base: 1rem;          /* 16px */
  --font-size-lg: 1.125rem;        /* 18px */
  --font-size-xl: 1.25rem;         /* 20px */
  --font-size-2xl: 1.5rem;         /* 24px */
  --font-size-3xl: 1.875rem;       /* 30px */
  --font-size-4xl: 2.25rem;        /* 36px */
  --font-size-5xl: 3rem;           /* 48px */

  /* Spacing scale */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */

  /* Breakpoints per D-06 */
  --bp-sm: 48rem;   /* 768px */
  --bp-md: 64rem;   /* 1024px */
  --bp-lg: 90rem;   /* 1440px */
}

/* Mobile-first base styles */
body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  color: var(--color-text);
  background-color: var(--color-background);
  line-height: 1.6;
}

/* Responsive: tablet */
@media (min-width: 48rem) {
  body {
    font-size: var(--font-size-lg);
  }
}

/* Responsive: desktop */
@media (min-width: 64rem) {
  body {
    font-size: var(--font-size-xl);
  }
}
```

**Source:** [MDN - CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

### Pattern 3: Google Fonts via Astro Font Provider

**What:** Configure Google Fonts in `astro.config.mjs` and load via `<Font />` component in layout head
**When to use:** Setting up typography in the base layout
**Example:**

```javascript
// astro.config.mjs
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Archivo",
      cssVariable: "--font-archivo",
    },
    {
      provider: fontProviders.google(),
      name: "Roboto Slab",
      cssVariable: "--font-roboto-slab",
    },
  ],
});
```

```astro
<!-- In Layout.astro head -->
import { Font } from "astro:assets";
<Font cssVariable="--font-archivo" />
<Font cssVariable="--font-roboto-slab" />
```

**Source:** [Astro docs - Fonts]()

### Pattern 4: Sticky Header with Mobile-First Nav

**What:** Header with logo + nav + click-to-call that becomes sticky on scroll, with mobile hamburger menu
**When to use:** Every page's base layout
**Example:**

```css
/* Header sticky behavior */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* Mobile nav — hidden by default */
.nav-mobile-toggle {
  display: block;
}

.nav-links {
  display: none;
}

@media (min-width: 48rem) {
  .nav-mobile-toggle {
    display: none;
  }
  .nav-links {
    display: flex;
  }
}
```

**Source:** [ASSUMED — standard mobile-first sticky header pattern]

### Anti-Patterns to Avoid

- **Tailwind CSS:** Explicitly locked out by D-10. Would add framework dependency contradicting the clean hand-off goal.
- **Framework components (React/Vue/Svelte):** D-09 locks no UI framework. Vanilla Astro components only.
- **CSS custom properties inside media queries:** CSS variables cannot be used inside `@media` or `@container` queries as property names — only as values. Design token breakpoints must use hard-coded `min-width` values in media queries.
- **Importing CSS in every page:** Global CSS should be imported once in the base Layout, not per-page.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Design token system | Custom CSS class naming convention | CSS custom properties on `:root` | Industry standard, easy theming, reduces repetition |
| Responsive breakpoints | Unique breakpoint values per component | Single breakpoint system in global CSS with custom properties | Consistency across all components |
| Font loading | `<link>` tags in every page | Astro Font provider + `<Font />` component | Auto-preload, optimized fallbacks, Lighthouse-friendly |
| Base layout wrapper | Copy-pasting header/footer in every page | `Layout.astro` with `<slot />` | Single source of truth, maintainable |

**Key insight:** The clean hand-off requirement (D-10) means vanilla CSS with custom properties is both the locked decision and the industry best practice for static sites.

## Common Pitfalls

### Pitfall 1: Forgetting `lang="en"` on `<html>`
**What goes wrong:** Accessibility audit failures, screen readers mishandling content
**Why it happens:** Skipped in haste when scaffolding
**How to avoid:** Always include in base Layout template
**Warning signs:** Lighthouse accessibility score below 90

### Pitfall 2: Mobile-first means writing CSS for mobile FIRST, not desktop with `max-width`
**What goes wrong:** Responsive behavior breaks on small screens
**Why it happens:** Habits from desktop-first development
**How to avoid:** Base styles target320px. Media queries use `min-width` to add styles for larger screens.
**Warning signs:** Horizontal scroll on mobile, content overflow

### Pitfall 3: Sticky header covering anchor targets
**What goes wrong:** When clicking nav links, header overlaps section headings
**Why it happens:** `position: sticky` with `top: 0` doesn't account for header height
**How to avoid:** Use `scroll-margin-top` on sections or `padding-top` on `<main>` equal to header height
**Warning signs:** Anchor links scrolling to wrong position

### Pitfall 4: Font loading causes layout shift (CLS)
**What goes wrong:** Text jumps when fonts load, Lighthouse performance penalty
**Why it happens:** No font-display strategy, no size-adjust fallbacks
**How to avoid:** Astro Font provider handles this automatically; prefer it over manual `<link>` tags
**Warning signs:** Lighthouse CLS > 0.1

### Pitfall 5: Global CSS imported multiple times
**What goes wrong:** Styles duplicated, specificity wars, bloated CSS
**Why it happens:** Import in both Layout and individual pages
**How to avoid:** Single import in Layout.astro only
**Warning signs:** Duplicate style rules in dev tools

## Code Examples

### Google Fonts Astro Config (verified via Astro docs)

```javascript
// astro.config.mjs
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Archivo",
      cssVariable: "--font-archivo",
    },
    {
      provider: fontProviders.google(),
      name: "Roboto Slab",
      cssVariable: "--font-roboto-slab",
    },
  ],
});
```

### Base Layout Astro File

```astro
---
// src/layouts/Layout.astro
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { Font } from 'astro:assets';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Premium roofing services by Oak Ridge Roofing Co.' } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <title>{title} | Oak Ridge Roofing Co.</title>
  <Font cssVariable="--font-archivo" />
  <Font cssVariable="--font-roboto-slab" />
</head>
<body>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</body>
</html>
```

### Header Component (Sticky + Click-to-Call)

```astro
---
// src/components/Header.astro
---

<header class="site-header">
  <div class="header-inner">
    <a href="/" class="logo" aria-label="Oak Ridge Roofing Co. — Home">
      <span class="logo-text">Oak Ridge</span>
      <span class="logo-sub">Roofing Co.</span>
    </a>

    <nav class="nav-desktop" aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/services">Services</a>
      <a href="/repair">Roof Repair</a>
      <a href="/storm-damage">Storm Damage</a>
      <a href="/contact">Contact</a>
    </nav>

    <a href="tel:+15551234567" class="btn-call">
<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
      <span>Call Now</span>
    </a>

    <button class="nav-mobile-toggle" aria-label="Open menu" aria-expanded="false">
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </svg>
    </button>
  </div>
</header>
```

### Footer Component

```astro
---
// src/components/Footer.astro
---

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <span class="brand-name">Oak Ridge Roofing Co.</span>
      <span class="brand-attribution">A Page and Pixel brand</span>
    </div>

    <nav class="footer-nav" aria-label="Footer navigation">
      <a href="/">Home</a>
      <a href="/services">Services</a>
      <a href="/repair">Roof Repair</a>
      <a href="/storm-damage">Storm Damage</a>
      <a href="/contact">Contact</a>
    </nav>

    <div class="footer-contact">
      <p><a href="tel:+15551234567">(555) 123-4567</a></p>
      <p>info@oakridgeroofing.com</p>
      <p>Serving the greater Oak Ridge area</p>
    </div>
  </div>
</footer>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<link>` tags for Google Fonts | Astro Font provider + `<Font />` component | Astro v6 (2025) | Auto preload, size-adjust fallbacks, CLS reduction |
| Global CSS with preprocessor (Sass) | CSS custom properties with vanilla CSS | Industry shift ~2022 | No build step needed, native cascade, easier hand-off |
| `max-width` desktop-first media queries | `min-width` mobile-first media queries | Industry standard ~2018 | Correct mobile experience by default |
| CSS reset (Normalize.css) | Modern CSS base (box-sizing: border-box, etc.) | Progressive | Less HTTP overhead, simpler setup |

**Deprecated/outdated:**
- Normalize.css as separate file: Modern browsers have consistent defaults; a minimal reset in global.css is sufficient
- `@import` for Google Fonts: Higher latency than preconnect + preload; Astro Font provider is the modern approach

## Assumptions Log

> List all claims tagged `[ASSUMED]` in this research. The planner and discuss-phase use this section to identify decisions that need user confirmation before execution.

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Archivo is a sans-serif with industrial character suitable for headlines | Standard Stack | Archivo may not be the ideal slab serif substitute — Roboto Slab (actual slab serif) is the D-02 primary recommendation; Archivo is listed as alternative. [ASSUMED: Google Fonts catalog knowledge] |
| A2 | Specific color values (#5D4E37 brown, #3D5A45 forest green, #F5F0E8 tan, #C4A35A gold) fit the "warm earth tones" direction from D-01 | Code Examples | Actual brand colors may differ; these are plausible starting values but need client approval |
| A3 | Roboto Slab and Archivo are available via `fontProviders.google()` in Astro v6.4.2 | Standard Stack | If Astro's Font provider has issues with these specific fonts, fallback to `<link>` tag approach |

## Open Questions

1. **Exact color palette values**
   - What we know: D-01 specifies "tan, brown, forest green" — warm earth tones
   - What's unclear: Specific hex values for the palette
   - Recommendation: Use the research's proposed values as starting point; planner should include a `checkpoint:human-verify` to confirm colors before Phase 2

2. **Logo treatment**
   - What we know: Header needs a logo + "Oak Ridge Roofing Co." text
   - What's unclear: Is there a real logo SVG/image, or should text-only logo be used?
   - Recommendation: Text-based logo with SVG icon for Phase 1; image logo can be swapped in Phase 5

3. **Click-to-call phone number**
   - What we know: Click-to-call button needed on every page
   - What's unclear: Real phone number for Oak Ridge Roofing Co.
   - Recommendation: Use placeholder `(555) 123-4567` for Phase 1; real number can be configured in Phase 4

4. **Google Fonts access in deployment environment**
   - What we know: Astro Font provider requires network access to Google Fonts
   - What's unclear: Will the deployment environment (Vercel/Netlify) have access to Google Fonts?
   - Recommendation: Astro Font provider is the standard approach; if network-restricted, fall back to self-hosted fonts in `public/fonts/`

## Environment Availability

> Step 2.6: SKIPPED (no external dependencies beyond Astro bootstrap)

The phase consists entirely of code and configuration. All required tools are available:
- Node.js v22.22.3 — sufficient for Astro 6.x
- npm 10.9.8 — sufficient for package management
- No external services, databases, or runtime dependencies required

## Validation Architecture

> Skip this section if workflow.nyquist_validation is explicitly set to false. If absent, treat as enabled.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None (Phase 1 is structural, no runtime logic to test) |
| Config file | N/A |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|--------------|
| REQ-01 | `npm run dev` starts without errors | smoke | `npm run dev &` then `curl -s http://localhost:4321 \| head -20` | TBD after scaffold |
| REQ-02 | All pages share consistent header/footer | manual | Visual inspection across all 5 pages | TBD after scaffold |
| REQ-03 | Design tokens applied to components | manual | DevTools inspection of CSS custom properties | TBD after scaffold |
| REQ-04 | 0 console errors | smoke | DevTools console check on each page | TBD after scaffold |

### Wave 0 Gaps
- [ ] `src/styles/global.css` — design tokens, typography scale, breakpoint system
- [ ] `src/layouts/Layout.astro` — base layout with header/footer slots
- [ ] `src/components/Header.astro` — logo, nav, click-to-call, sticky behavior
- [ ] `src/components/Footer.astro` — brand attribution, links, contact
- [ ] `astro.config.mjs` — Astro config with Google Fonts provider
- [ ] Framework install: `npm create astro@latest` — if not detected in workspace

*(If no gaps: "None — existing test infrastructure covers all phase requirements")*

## Security Domain

> Required when `security_enforcement` is enabled (absent = enabled). Omit only if explicitly `false` in config.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V1 Architecture | yes | Static site — no server-side code, minimal attack surface |
| V4 Access Control | no | No authentication/authorization in static site |
| V5 Input Validation | partial | Contact form (Phase 4) will need validation; design system should use semantic HTML inputs |
| V12 Http Headers | yes | Astro handles security headers via `astro.config.mjs` |

### Known Threat Patterns for Static Astro Sites

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| External font供应链 | Information Disclosure | Use Astro Font provider with verified Google Fonts source |
| Missing CSP | Tampering/Information Disclosure | Add Content-Security-Policy header in `astro.config.mjs` |
| Open redirect (if using redirects) | Repudiation | Avoid client-side redirects; use server-side 301 |

## Sources

### Primary (HIGH confidence)
- [Astro docs - Project Structure](https://docs.astro.build/en/basics/project-structure/) — verified project structure
- [Astro docs - Fonts](https://docs.astro.build/en/guides/fonts/) — verified Font provider API
- [Astro docs - Responsive Design](https://docs.astro.build/en/guides/responsive-design/) — verified mobile-first approach
- [npm registry - astro@6.4.2](https://www.npmjs.com/package/astro) — verified version
- [MDN - CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) — verified design token pattern

### Secondary (MEDIUM confidence)
- [web.dev - Design Systems Tokens](https://web.dev/articles/design-systems-tokens) — verified CSS custom properties for design systems

### Tertiary (LOW confidence)
- Archivo font classification as industrial sans-serif — [ASSUMED: general knowledge of Archivo typeface]
- Roboto Slab as slab serif — [ASSUMED: general knowledge of Roboto Slab typeface]
- Specific proposed color values — [ASSUMED: plausible warm earth tone palette]

## Metadata

**Confidence breakdown:**
- Standard stack: MEDIUM-HIGH — Astro confirmed via npm registry; Google Fonts approach confirmed via docs; no verification of specific font classification
- Architecture: HIGH — Astro project structure is well-documented and stable
- Pitfalls: MEDIUM — patterns are standard industry practice, verified via multiple sources

**Research date:** 2026-05-30
**Valid until:** 2026-06-29 (30 days — Astro stable release, design system patterns well-established)
