# Oak Ridge Roofing Co. — Roadmap

## Vision

A 5-page Astro demo site that converts homeowners into inspection leads. Portfolio-quality design that commands $3,500–$5,000 for the Page and Pixel portfolio.

---

## Phases

| Phase | Name | Pages/Scope | Status |
|-------|------|-------------|--------|
| 1 | Foundation & Design | Astro scaffold, design system, brand tokens, layout | ● In Progress |
| 2 | Homepage | Hero, trust bar, services cards, before/after, reviews, FAQ | ○ Pending |
| 3 | Service Pages | Roofing Services, Roof Repair, Storm Damage | ○ Pending |
| 4 | Contact & Conversion | Contact form, click-to-call, service areas, FAQ expansion | ○ Pending |
| 5 | Polish & Portfolio | Performance audit, mobile QA, accessibility, brand handoff | ○ Pending |

---

## Phase Details

### Phase 1: Foundation & Design

**Goal:** Astro scaffold with design system, fonts, colors, layout components.

**Plans:** 2 plans

**Plan list:**
- [x] 01-01-PLAN.md — Initialize Astro scaffold, global CSS design tokens, base Layout.astro with font configuration
- [x] 01-02-PLAN.md — Create Header.astro (logo + nav + sticky + click-to-call) and Footer.astro (brand + nav + Page and Pixel attribution)

**Deliverables:**
- Astro project initialized with proper structure
- Design tokens: colors, typography scale, spacing
- Base layout: header (logo + nav + click-to-call), footer (brand, links, contact)
- Responsive breakpoint system (mobile-first)
- Global CSS / design system

**Success criteria:**
- `npm run dev` runs cleanly
- All pages share consistent header/footer
- Design system tokens applied to components
- 0 console errors

---

### Phase 2: Homepage

**Goal:** Full homepage with all required sections.

**Deliverables:**
- Hero section: headline, subheadline, "Get a Free Roof Inspection" CTA
- Trust bar: licensed, insured, local, emergency repairs (icons + text)
- Services cards: 4 cards (Roofing, Repair, Storm Damage, Gutters & Inspections)
- Before/after placeholder section
- Customer reviews (3 testimonials)
- Service areas (list of counties/cities served)
- FAQ accordion (5–6 common questions)
- Contact form (name, email, phone, service type, message)

**Success criteria:**
- All sections render on desktop and mobile
- CTA button scrolls to contact form
- Trust icons visually prominent above the fold
- Reviews section with star ratings

---

### Phase 3: Service Pages

**Goal:** Three service pages with detailed content.

**Deliverables:**
- `/services` — Roofing Services overview
- `/repair` — Roof Repair (leaks, missing shingles, storm damage, ventilation)
- `/storm-damage` — Storm Damage (hail, wind, insurance claims, emergency tarp)
- Each page: hero, service details, CTA, related services sidebar

**Success criteria:**
- Consistent layout with homepage
- Each page links to contact form
- Clear service differentiation on each page

---

### Phase 4: Contact & Conversion

**Goal:** Contact page optimized for lead capture.

**Deliverables:**
- `/contact` — Full contact page
- Contact form with all fields (name, email, phone, address, service type, urgency, message)
- Click-to-call button (sticky mobile)
- Service area visual
- Business hours, address, map placeholder
- FAQ section (expanded with contact-specific questions)

**Success criteria:**
- Form validates all required fields
- Click-to-call works on mobile
- Clear next steps after form submission (success state)

---

### Phase 5: Polish & Portfolio

**Goal:** Production-ready, portfolio showcase.

**Deliverables:**
- Lighthouse audit: 90+ Performance, Accessibility, Best Practices, SEO
- Mobile click-to-call on every page (sticky header button)
- Accessibility: alt text, ARIA labels, keyboard navigation, color contrast
- 404 page
- SEO: meta tags, OG image, sitemap
- Brand handoff: Page and Pixel attribution in footer

**Success criteria:**
- `npm run build` succeeds with 0 errors
- All Lighthouse metrics 90+
- Fully responsive at 320px, 768px, 1024px, 1440px
- Footer shows "Page and Pixel" branding

---

## Success Definition

**Done =** Phase 5 complete, Lighthouse 90+ across all metrics, production build succeeds, ready to screenshot for portfolio.

*All phases build on each other — complete Phase 1 before Phase 2, etc.*