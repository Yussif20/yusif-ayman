# Functional Requirements Document (FRD) – Yusif Ayman Portfolio

## 1. Summary

A bilingual (EN/AR) personal portfolio showcasing Yusif Ayman, a front-end developer, featuring projects segmented by tech (JavaScript, React, Next.js), blog posts (future growth), services offered, testimonials, experience timeline, education, and contact methods. Emphasis on clean, elegant UI with subtle gradients, strong performance, accessibility (RTL/LTR), and SEO readiness. Content managed via Sanity CMS.

## 2. Goals

### Primary

- Present professional identity and credibility.
- Showcase projects with structured case study depth.
- Provide easy ways to contact (Email, WhatsApp, LinkedIn).
- Enable future blogging and scalable content editing via CMS.

### Secondary

- Build trust via testimonials.
- Offer downloadable CV.
- Enable service inquiries (indirectly—no form backend initially).

## 3. Target Users

- Recruiters / Hiring managers.
- Potential freelance clients.
- Developers / peers.
- Automated parsers (SEO / social preview bots).

## 4. Scope

### MVP (Phase 1)

- Pages / routes: `/[locale]` (Home/Hero), About (section inside home or dedicated anchor), Projects, Blog (listing + empty state), Services, Contact, (Testimonials & Experience & Education as sections integrated—likely all in home or split into modular sections), 404 page, CV static asset.
- Locales: `en`, `ar` (locale prefix stays: `/en/...`, `/ar/...`).
- Theme: Light/Dark toggle.
- Sanity CMS integration for structured content.
- Project filtering via tabs (JS | React | Next.js) + “All” fallback.
- Case study dynamic pages (e.g., `/[locale]/projects/[slug]`).
- SEO meta + OG + dynamic social cards per project/blog.
- Animations: Moderate (Framer Motion enter/scroll reveals).
- Accessibility: Keyboard nav, focus styles, RTL mirroring, semantic landmarks.
- Performance baseline (Lighthouse targets ≥90).
- GitHub integration: fetch pinned repositories or manually defined featured set (Will implement API fetch + fallback cache).
- Services list (3): Frontend Development, Landing Page Builds, E‑commerce Implementation.
- Testimonials section (structure + placeholder items).
- Blog index (no articles initially but layout ready).
- Download CV link (`/cv.pdf`).
- WhatsApp deep link: `https://wa.me/201014921282` (number normalized).
- Contact: Email mailto, WhatsApp link, LinkedIn link.

### Phase 2 (Nice to Have)

- Interactive GitHub activity graph.
- Contact form with hosted backend & spam protection.
- Newsletter integration.
- Animated hero background variant (particles or dynamic gradients).
- Project video embeds / carousel.
- Search across blog & projects.
- Tag-based filtering in addition to tech category.
- Analytics (once chosen).
- Auto OG image generation (e.g., Satori) if deferred in MVP.

## 5. Information Architecture

### Top-Level Nav (Desktop)

- Home (Logo)
- Projects
- Blog
- Services
- Contact (anchors or page)
- Language switcher
- Theme toggle

### Footer

- Quick links (Projects, Blog, CV)
- Social (GitHub, LinkedIn, WhatsApp)
- Copyright

### Sections (Home page composition)

1. Hero (Intro tagline, CTA buttons: View Projects, Download CV, Contact).
2. About (Medium bio).
3. Skills (Primary stacks + visual grouping).
4. Services (3 cards).
5. Featured Projects (Top 3 + link to all).
6. Experience (Timeline: Freelancer, Internship).
7. Education (Vet University).
8. Testimonials (slider or grid).
9. Blog preview (Latest 2 posts or “Coming soon”).
10. Contact panel.

## 6. Content Models (Sanity)

**(Names are suggestions—can adjust.)**

### 1. settings (singleton)

- siteTitle
- tagline
- heroSubtitle
- social (github, linkedin, whatsappNumber, email)
- seoDefaults (titleTemplate, descriptionDefault, ogImage)
- cvFile (file ref)

### 2. project

- title
- slug
- shortDescription
- longBody (Portable Text / MDX-like rich content)
- techStack (array of strings / references)
- category (enum: javascript | react | next)
- repoUrl
- liveUrl
- screenshots (array of images)
- featured (boolean)
- publishedAt (date)

### 3. blogPost

- title
- slug
- excerpt
- coverImage
- body (rich content / MDX)
- tags (array<string>)
- readingMinutes (auto-computed or stored)
- publishedAt (date)
- status (draft|published)

### 4. testimonial

- authorName
- authorRole
- quote
- avatar (image optional)
- order (number)

### 5. service

- title
- shortDescription
- iconKey (string for mapping component)
- order (number)

### 6. experience

- role
- organization
- startDate
- endDate (nullable)
- description (rich/array)
- type (freelance | internship)

### 7. education

- institution
- degreeOrProgram
- startDate
- endDate
- notes

### 8. skillCategory

- title (e.g., Frontend)
- levelLabel (e.g., Junior)
- skills (array<string>)

### Localization Strategy

Two-locale content: add a `locale` field to each translatable document and query by locale. `settings` may embed localized nested objects. Project & blog docs duplicated per locale with same slug value allowed.

## 7. Routing

- `/[locale]/` → Home
- `/[locale]/projects` → All projects (tabs for categories)
- `/[locale]/projects/[slug]` → Project detail
- `/[locale]/blog` → Blog index
- `/[locale]/blog/[slug]` → Post detail
- `/[locale]/services` (optional page or anchor) → Services list
- `/[locale]/contact` (or anchor) → Contact
- `/cv.pdf` (no locale)
- 404: `/[locale]/not-found`

## 8. Functional Requirements (Key Interactions)

**Projects Page:** Tab switching filters client-side; detail pages show full rich body.

**Blog:** Index list with reading time; empty placeholder initially; detail renders rich text with code styling (phase 2 advanced features).

**Services:** Cards with gradient accent.

**Testimonials:** Slider with keyboard nav.

**Language Switching:** Maintains equivalent route if content exists.

**Theme:** Toggle persists via localStorage; fallback to system if absent.

**GitHub Data:** Fetched during build/ISR with fallback cache.

**CV:** Direct download link.

**Responsive:** Mobile nav collapses; tabs adapt.

## 9. Non-Functional Requirements

Performance (Lighthouse ≥90), SEO (meta + OG), Accessibility (WCAG AA), Security (no sensitive data), Maintainability (typed queries), Internationalization (UI strings + content docs).

## 10. Tech Stack

Next.js (App Router), TypeScript, Sanity v3, Framer Motion, (Assumed) Tailwind CSS, next/font, optional next-seo, ESLint.

## 11. Data Flow

Build-time static generation; ISR for dynamic content; client-only tab filtering; GitHub fetch with caching.

## 12. Component Inventory (MVP)

LayoutRoot, Header, Footer, HeroSection, AboutSection, SkillsSection, ServicesSection, ProjectsPreviewSection, ProjectTabs, ProjectCard, ProjectDetailBody, ExperienceTimeline, EducationBlock, TestimonialsSlider, BlogPreviewSection, BlogList, BlogPostBody, ContactPanel, ThemeToggle, LanguageSelector, GradientAccentWrapper, SEO helpers, GitHubShowcase.

## 13. State & Config

Local storage: `theme`. Locale handled by route. Potential future: `dismissedAnnouncements`.

## 14. Edge Cases

Missing media placeholders, empty blog state, locale mismatch fallback, network failure for GitHub, absent localized project.

## 15. Risks & Mitigations

| Risk                        | Mitigation                                 |
| --------------------------- | ------------------------------------------ |
| Sanity learning curve       | Start minimal schemas first.               |
| RTL alignment issues        | Use logical CSS properties.                |
| Animation performance       | Limit layout-affecting motion.             |
| GitHub rate limits          | Cache & ISR.                               |
| Locale duplication overhead | Editorial guidance + simple query filters. |

## 16. Success Metrics

Lighthouse ≥90 all categories, CLS <0.05, quick FCP, no accessibility violations (axe). Low JS bundle overhead.

## 17. MVP vs Phase 2

MVP: All baseline sections, tabs, project details, localization, SEO, theme, Sanity integration, CV, GitHub basic.
Phase 2: Dynamic OG, contact form, newsletter, GitHub graph, search, analytics, hero enhancements, structured data, tag filtering UI.

## 18. Open Items

Testimonials real data, font pairing finalization, CV file path, GitHub pinned strategy (auto vs manual list), gradient direction specifics.

## 19. Assumptions

Tailwind present / will add; Sanity Studio at `/studio`; Portable Text rendering; gradient accent palette (indigo→violet→fuchsia); skills via category model.

## 20. Acceptance Checklist (MVP)

- [ ] EN & AR render correctly (RTL/LTR) for all sections.
- [ ] Project tabs filter locally.
- [ ] Project detail pages accessible & SEO meta present.
- [ ] Theme persists & accessible contrast maintained.
- [ ] Locale switching preserves route.
- [ ] CV downloads properly.
- [ ] Static OG meta tags valid.
- [ ] Lighthouse performance/SEO/accessibility targets met.
- [ ] No console or build errors.
- [ ] Focus states & keyboard nav functional.
