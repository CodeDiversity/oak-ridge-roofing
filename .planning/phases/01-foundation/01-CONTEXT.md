# Phase 1: Foundation & Design - Context

**Gathered:** 2026-05-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Astro scaffold with design system: colors, typography, spacing, base layout (header/footer), responsive breakpoint system, and global CSS. Delivers the foundation that all 5 pages share.
</domain>

<decisions>
## Implementation Decisions

### Visual Identity

- **D-01:** Color palette — Warm earth tones (tan, brown, forest green) evoking natural materials, craftsmanship, and trustworthiness. NOT blue/charcoal professional (too generic), NOT dark/metallic (too dramatic for a local roofer).
- **D-02:** Typography — Industrial slab serif (Archivo / Roboto Slab for headlines) with clean sans body. Solid, established, confident — like the roofs they build.

### Design Direction

- **D-03:** Overall feel — "Sturdy like the roofs they build." Premium but approachable, not cold or tech-forward.

### Layout & Structure

- **D-04:** Header — Logo + nav + prominent click-to-call button (sticky on scroll, mobile-first)
- **D-05:** Footer — Brand attribution "Page and Pixel", links, contact info, service areas
- **D-06:** Responsive breakpoints — Mobile-first: 320px base → 768px → 1024px → 1440px
- **D-07:** Component library — Cards for service pages, hero section pattern, trust bar with icons, FAQ accordion

### Technology

- **D-08:** Framework — Astro.js (static-first, fast, clean hand-off)
- **D-09:** No UI framework (React/Vue/Svelte) — vanilla Astro components for simplicity and speed
- **D-10:** Global CSS — CSS custom properties for design tokens, no Tailwind (clean hand-off, no framework dependency)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

- `.planning/PROJECT.md` — Client context, constraints, goals
- `.planning/ROADMAP.md` — Phase 1 deliverables and success criteria

[No external specs — requirements fully captured in decisions above]
</canonical_refs>

<codebase_context>
## Existing Code Insights

### Reusable Assets

(No existing code yet — greenfield project)

### Established Patterns

(None — establishing patterns in this phase)

### Integration Points

(None yet — foundation phase creates the base)
</codebase_context>

<specifics>
## Specific Ideas

- Hero CTA: "Get a Free Roof Inspection" — primary conversion goal
- Trust bar icons: licensed, insured, local, emergency repairs — above the fold
- Click-to-call: every page, sticky header button on mobile
- Service cards: Roofing, Repair, Storm Damage, Gutters & Inspections
- FAQ accordion: 5–6 common questions
- Contact form: name, email, phone, service type, message
- Before/after placeholder section on homepage
- Customer reviews: 3 testimonials with star ratings
- Page and Pixel attribution in footer
</specifics>

<deferred>
## Deferred Ideas

[None — discussion stayed within phase scope]
</deferred>

---

*Phase: 1-Foundation & Design*
*Context gathered: 2026-05-30*