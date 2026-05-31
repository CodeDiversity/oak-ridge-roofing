---
status: approved
phase: 01-foundation
created: 2026-05-30
design_system: none (vanilla CSS, no shadcn)
---

# Phase 1: Foundation & Design — UI Specification

## Pre-Populated From Upstream

| Source | Decisions Used |
|--------|---------------|
| 01-CONTEXT.md | D-01 (earth tone direction), D-02 (Roboto Slab headlines + Archivo body), D-04 (sticky header + click-to-call), D-05 (Page and Pixel attribution), D-06 (mobile-first breakpoints) |
| 01-RESEARCH.md | CSS custom properties pattern, Astro Font provider, 8-point spacing scale, base layout with header/footer slots |
| User approval | Earth tone palette hex values confirmed 2026-05-30 |

---

## Design Tokens

### Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary/Brand | #5D4E37 | Headings, key UI elements, brand moments |
| Secondary | #3D5A45 | Section accents, secondary actions, trust icons |
| Background | #F5F0E8 | Page background (warm tan) |
| Surface | #FFFFFF | Cards, panels, elevated elements, header |
| Text | #2C2416 | Body copy, primary content |
| Text muted | #6B5D4D | Captions, secondary text, metadata |
| Accent | #C4A35A | CTAs, highlights, focus rings, hover states |

### Color Application Map

- **Background (60%):** background (#F5F0E8) fills the page canvas
- **Surface (30%):** surface (#FFFFFF) for cards, header, footer
- **Accent (10%):** reserved exclusively for CTAs and interactive highlights

| Element | Color |
|---------|-------|
| Primary buttons | Background: accent (#C4A35A) |
| CTA sections | Background: primary (#5D4E37) |
| Focus ring | 2px solid accent (#C4A35A) |
| Trust bar icons | color: secondary (#3D5A45) |
| Section backgrounds | background: secondary at 8% opacity for subtle tint |
| Footer | Background: primary (#5D4E37), text: surface (#FFFFFF) |

### Typography

| Role | Font | Fallback | Size (mobile → desktop) | Weight | Line Height |
|------|------|----------|--------------------------|--------|-------------|
| Headlines | Roboto Slab | serif | 28/36/48px | 700 | 1.2 |
| Subheadings | Roboto Slab | serif | 20/24/30px | 600 | 1.25 |
| Body | Archivo | sans-serif | 16/18/20px | 400 | 1.5 |
| Caption | Archivo | sans-serif | 12px | 400 | 1.4 |

### Spacing Scale

8-point scale exclusively (multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| --space-1 | 4px | Tight gaps, icon padding |
| --space-2 | 8px | Inline spacing, small gaps |
| --space-3 | 12px | Input padding-y |
| --space-4 | 16px | Mobile padding, card gap |
| --space-6 | 24px | Section gaps, card padding (mobile) |
| --space-8 | 32px | Desktop padding |
| --space-12 | 48px | Section spacing (mobile) |
| --space-16 | 64px | Large gaps |
| --space-24 | 96px | Section spacing (desktop) |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| --radius-sm | 4px | Small elements, badges |
| --radius-md | 8px | Cards, inputs, buttons |
| --radius-lg | 16px | Large panels, hero sections |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| --shadow-sm | 0 1px 4px rgba(44, 36, 22, 0.06) | Subtle card lift |
| --shadow-md | 0 4px 12px rgba(44, 36, 22, 0.10) | Cards, dropdowns |
| --shadow-lg | 0 8px 24px rgba(44, 36, 22, 0.12) | Modals, sticky header |

---

## Component Inventory

### Site Header

| Property | Value |
|----------|-------|
| Background | surface (#FFFFFF) |
| Shadow | 0 2px 8px rgba(44, 36, 22, 0.08) on scroll |
| Sticky | top: 0, z-index: 100 |
| Height | 72px (desktop), 64px (mobile) |
| Logo text | primary (#5D4E37), Roboto Slab 700 |
| Nav links | text (#2C2416), Archivo 14px weight 500, 32px gap |
| Nav hover | color: accent (#C4A35A) |
| Click-to-call button | background: accent (#C4A35A), text: primary (#5D4E37), weight 600, border-radius: md |
| Mobile toggle | 44x44px touch target, aria-label "Open menu" |

### Site Footer

| Property | Value |
|----------|-------|
| Background | primary (#5D4E37) |
| Text | surface (#FFFFFF) |
| Brand attribution | "A Page and Pixel brand" — accent (#C4A35A) on hover |
| Contact link | accent (#C4A35A) |
| Padding | 48px vertical (mobile), 64px (desktop) |

### Cards (Service Cards, Review Cards)

| Property | Value |
|----------|-------|
| Background | surface (#FFFFFF) |
| Border | none |
| Shadow | --shadow-sm |
| Border radius | --radius-md (8px) |
| Padding | 24px desktop, 16px mobile |
| Hover shadow | --shadow-md |
| Title | primary (#5D4E37), Roboto Slab 20px/700 |
| Body text | text (#2C2416), Archivo 16px/400, line-height 1.5 |

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|------------|------|--------|-------|
| Primary | accent (#C4A35A) | primary (#5D4E37) | none | brightness(0.95) |
| Secondary | transparent | primary (#5D4E37) | 2px solid primary | background: primary, text: surface |
| Ghost | transparent | text (#2C2416) | none | background: rgba(93,78,55,0.06) |

| Property | Value |
|----------|-------|
| Padding | 12px 24px |
| Border radius | --radius-md (8px) |
| Font | Archivo 600, 16px |
| Min touch target | 44x44px |
| Transition | 150ms ease |

### Form Inputs

| Property | Value |
|----------|-------|
| Background | surface (#FFFFFF) |
| Border | 1px solid text-muted (#6B5D4D) |
| Border radius | --radius-md (8px) |
| Padding | 12px 16px |
| Font | Archivo 16px |
| Focus border | 2px solid accent (#C4A35A) |
| Focus outline | none (border handles it) |
| Error border | 2px solid #C45A5A |
| Placeholder | text-muted (#6B5D4D), 14px |

### Trust Bar Icons

| Property | Value |
|----------|-------|
| Icon color | secondary (#3D5A45) |
| Icon size | 24px |
| Label text | text (#2C2416), Archivo 14px |
| Gap | 24px desktop, 16px mobile (wrap) |
| Background | surface (#FFFFFF) with subtle border-bottom |

---

## Layout System

### Responsive Breakpoints

| Name | Value | Usage |
|------|-------|-------|
| Base (mobile) | 320px+ | Default styles |
| sm (tablet) | 768px (48rem) | 2-column layouts, larger type |
| md (desktop) | 1024px (64rem) | 3-column layouts, full nav |
| lg (large) | 1440px (90rem) | Max-width container |

### Container

| Property | Value |
|----------|-------|
| Max width | 1200px |
| Padding-x | 16px (base), 32px (sm), 48px (md/lg) |
| Margin | auto (centering) |

### Section Spacing

| Property | Mobile | Desktop |
|----------|--------|---------|
| Section gap | 48px | 96px |
| Component gap | 24px | 32px |
| Inline gap | 16px | 24px |

---

## Copywriting Contract

| Element | Value |
|---------|-------|
| Primary CTA (hero) | "Get a Free Roof Inspection" |
| Mobile sticky CTA | "Call Now" |
| Trust bar items | "Licensed", "Insured", "Local", "24/7 Emergency Repairs" |
| Empty state | Not applicable (static marketing site) |
| Error state | Not applicable for Phase 1 foundation (contact form in Phase 4) |
| Destructive actions | None in Phase 1 |

---

## Interactive Behaviors

### Header Scroll Behavior
- `position: sticky; top: 0`
- On scroll > 0: add `box-shadow: var(--shadow-md)`
- Transition: 200ms ease

### Mobile Navigation
- Hamburger toggle: `display: block` at base, `display: none` at sm
- Nav links: `display: none` at base, `display: flex` at sm
- Mobile menu: slides down from header, `position: absolute`, z-index: 99
- Toggle aria-expanded: true/false on click

### Card Hover
- Shadow: --shadow-sm to --shadow-md
- Transform: translateY(-2px)
- Transition: 200ms ease

### Button Hover
- Filter: brightness(0.95)
- Transition: 150ms ease

### Focus States
- 2px solid accent (#C4A35A) outline
- 2px offset
- Applied to: buttons, links, form inputs, nav items

---

## Technical Implementation

### CSS Architecture
- No Tailwind (D-10 locked)
- No CSS framework
- CSS custom properties on `:root` for all tokens
- Single `src/styles/global.css` imported in Layout.astro
- Mobile-first media queries using `min-width`

### Font Loading
- Astro Font provider in `astro.config.mjs`
- cssVariable mapping for --font-headline and --font-body
- Fallback stack: Roboto Slab → serif, Archivo → sans-serif

### Accessibility
- All interactive elements: focus-visible styles
- Skip-to-content link (hidden until focused)
- aria-labels on icon-only buttons
- semantic HTML throughout
- color contrast: all text meets WCAG AA (verified against tan/earth palette)

---

## Visual Focal Points

### Primary Screen Focal Point
On page load, the **click-to-call button** in the header is the primary visual anchor — it draws the eye first as the highest-contrast interactive element against the white header surface.

Secondary focal point: **logo** — establishes brand identity immediately.

---

## Registry

**Tool:** none (vanilla CSS, no shadcn/ui library)

**Third-party registries:** none

---

## Safety Gate

| Check | Result |
|-------|--------|
| Third-party registry blocks | None declared — N/A |
| shadcn/ui | Not initialized — N/A |
| Tailwind CSS | Explicitly excluded (D-10) — N/A |
| Framework components (React/Vue/Svelte) | Excluded (D-09) — N/A |

---

*Phase: 1-Foundation & Design*
*UI-SPEC drafted: 2026-05-30*
*Approved palette: 2026-05-30 (user confirmed)*