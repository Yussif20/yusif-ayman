# AI Development Instructions for Portfolio Website

**Version:** 1.0  
**Last Updated:** October 2025  
**Project:** Next.js 14+ Portfolio with Multilingual Support

---

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [Design System](#design-system)
3. [Code Organization](#code-organization)
4. [Internationalization](#internationalization)
5. [Accessibility Standards](#accessibility-standards)
6. [Component Development](#component-development)
7. [Animation & Interactions](#animation--interactions)
8. [Performance Requirements](#performance-requirements)
9. [Code Quality](#code-quality)
10. [Critical Rules](#critical-rules)

---

## Technology Stack

### Core Framework
- **Next.js 14+** with App Router
- **TypeScript** (required for all new code)
- **React 18+** with Server Components by default

### Required Libraries
- **Tailwind CSS** - All styling must use Tailwind utility classes
- **Framer Motion** - For animations (use selectively)
- **next-intl** - For internationalization

### File Extensions
- Components: `.tsx`
- Utilities: `.ts`
- Styles: `.css`

---

## Design System

### Color Palette
**Primary Gradient Theme: Dark Blue to Slate Gray**

```css
/* Main Gradient */
from-blue-900 via-slate-700 to-slate-600 (light mode)
from-blue-400 via-slate-400 to-slate-300 (dark mode)

/* Specific Colors */
Blue-900: #1e3a8a (Navy Blue)
Slate-700: #334155 (Dark Slate)
Slate-600: #475569 (Medium Slate)
```

**Usage:**
- Headings: Use gradient (`bg-gradient-to-r from-blue-900 via-slate-700 to-slate-600`)
- Primary buttons: `bg-gradient-to-r from-blue-900 to-slate-700`
- Hover states: Slightly darker shades
- Borders on hover: `border-blue-900`

### Typography
- **English:** Inter font (handled in layout)
- **Arabic:** Tajawal font (handled in layout)
- **DO NOT** add font imports in components - fonts are managed globally in `layout.tsx`

### Spacing Standards
- Section padding: `py-16 md:py-24`
- Container: `container mx-auto px-4`
- Card padding: `p-6`
- Gap between elements: `gap-4`, `gap-8`, or `gap-12`

### Border Radius
- Cards: `rounded-xl`
- Buttons: `rounded-lg`
- Badges/Tags: `rounded-lg` or `rounded-full`

### Shadow Usage
- Cards: `shadow-lg`
- Hover: `hover:shadow-2xl`
- Buttons: `shadow-lg hover:shadow-xl`

---

## Code Organization

### File Structure
```
portfolio/
├── app/
│   └── [locale]/
│       ├── components/     # Reusable UI components
│       ├── sections/       # Page sections (Hero, Skills, etc.)
│       ├── layout.tsx      # Main layout (handles fonts & RTL)
│       └── page.tsx        # Homepage
├── messages/
│   ├── en.json            # English translations
│   └── ar.json            # Arabic translations
└── public/                # Static assets
```

### Naming Conventions
- **Components:** PascalCase (e.g., `Hero.tsx`, `SkillCard.tsx`)
- **Sections:** PascalCase (e.g., `Skills.tsx`, `Experience.tsx`)
- **Translation keys:** camelCase (e.g., `viewProjects`, `downloadCV`)
- **CSS classes:** Tailwind utilities only

### Component Location
- Place reusable UI components in `/components` folder
- Place page sections in `/sections` folder
- Keep related components together

---

## Internationalization

### Translation Requirements
**CRITICAL:** All text must use translations. No hardcoded strings allowed.

#### Translation File Structure
```json
{
  "ComponentName": {
    "key": "value",
    "nestedKey": {
      "subKey": "value"
    }
  }
}
```

#### Usage Pattern
```tsx
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("ComponentName");

  return (
    <h1>{t("title")}</h1>
    <p>{t("description")}</p>
  );
}
```

#### Creating New Translations
When creating a new component:
1. Add translation keys to both `en.json` and `ar.json`
2. Use professional, clear naming conventions
3. Group related keys under the component name
4. Provide meaningful ARIA labels in translations

**Example:**
```json
// en.json
{
  "Projects": {
    "title": "My Projects",
    "viewAll": "View All Projects",
    "filterLabel": "Filter by technology"
  }
}

// ar.json
{
  "Projects": {
    "title": "مشاريعي",
    "viewAll": "عرض جميع المشاريع",
    "filterLabel": "تصفية حسب التقنية"
  }
}
```

### RTL Support
- **DO NOT** handle RTL in components
- RTL is managed globally in `layout.tsx`
- Tailwind RTL utilities work automatically (`rtl:text-right`, `rtl:space-x-reverse`)

---

## Accessibility Standards

### WCAG 2.1 AA Compliance Required

#### Semantic HTML
Always use semantic HTML elements:
```tsx
<section aria-labelledby="section-heading">
  <h2 id="section-heading">{t("title")}</h2>
  <article>...</article>
  <nav aria-label="...">...</nav>
</section>
```

#### Required ARIA Attributes
- **Sections:** `aria-labelledby` pointing to heading ID
- **Interactive elements:** `aria-label` for context
- **Lists:** `role="list"` and `role="listitem"` when needed
- **Buttons:** Descriptive `aria-label` for icon-only buttons
- **Images:** Meaningful `alt` text from translations

#### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus states required: `focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2`
- Focus trap for modals/dialogs
- Escape key to close overlays

#### Color Contrast
- Minimum 4.5:1 for body text
- Minimum 3:1 for large text and UI components
- Test gradients to ensure readability

### Example Accessible Component
```tsx
<section
  className="container mx-auto px-4 py-16 md:py-24"
  aria-labelledby="skills-heading"
>
  <h2
    id="skills-heading"
    className="text-3xl font-bold"
  >
    {t("title")}
  </h2>

  <div role="list">
    {items.map((item, index) => (
      <article key={index} role="listitem">
        <h3>{item.title}</h3>
      </article>
    ))}
  </div>
</section>
```

---

## Component Development

### Server vs Client Components
- **Default:** Server-side components
- **Use Client-side (`"use client"`) when:**
  - Using React hooks (useState, useEffect, etc.)
  - Using event handlers (onClick, onChange, etc.)
  - Using Framer Motion animations
  - Using next-intl's `useTranslations` in interactive components

### TypeScript Requirements
- All components must have typed props
- Use interfaces for prop types
- Include proper return types

```tsx
interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps): JSX.Element {
  // Component code
}
```

### Image Handling
Always use Next.js Image component:
```tsx
import Image from "next/image";

<Image
  src="/path/to/image.jpg"
  alt={t("imageAlt")}
  fill // or width/height
  className="..."
  priority // for above-fold images
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Data Structure Best Practices
- Use arrays for lists
- Use objects for structured data
- Keep data in translation files when possible
- Use TypeScript interfaces for complex data

---

## Animation & Interactions

### Framer Motion Usage
**Use sparingly** to add life to the website without affecting performance.

#### Standard Animation Pattern
```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>
```

#### Recommended Animations
- Fade in on scroll for sections
- Slide up for cards
- Subtle scale on hover
- Staggered children animations

#### Animation Guidelines
- Use `viewport={{ once: true }}` to prevent repeated animations
- Keep duration between 0.3s - 0.6s
- Add delays for staggered effects: `delay: index * 0.1`

### Hover Effects
Standard hover patterns:
```tsx
className="hover:shadow-2xl hover:border-blue-900 transition-all duration-200"
```

### Transitions
Always add smooth transitions:
```tsx
className="transition-all duration-200" // or duration-300
```

---

## Performance Requirements

### Lazy Loading
Implement lazy loading for:
- Below-the-fold sections
- Heavy components (charts, large lists)
- Images (automatic with Next.js Image)

```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <Skeleton />,
});
```

### Code Splitting
- Split large components into smaller ones
- Use dynamic imports for conditional features
- Avoid importing entire libraries when only using parts

### Image Optimization
- Use WebP format when possible
- Provide proper `sizes` attribute
- Use `priority` for above-fold images
- Lazy load images below the fold

---

## Code Quality

### Error Handling
Add error handling in critical places:
- API calls
- Data fetching
- User input validation
- Image loading fallbacks

### TypeScript Error Prevention
Focus on typing in areas prone to errors:
- Component props
- API responses
- Form data
- Complex data structures

### Professional Error Pattern
```tsx
try {
  // Operation
} catch (error) {
  console.error("Descriptive error message:", error);
  // User-friendly fallback
}
```

### Comments
Add comments only when necessary:
- Complex logic that isn't immediately clear
- Why something is done a certain way (not what it does)
- TODO items for future improvements
- Accessibility-specific implementations

```tsx
// Fix for Arabic text clipping with bg-clip-text gradient
style={{ 
  WebkitBoxDecorationBreak: 'clone',
  boxDecorationBreak: 'clone'
}}
```

---

## Critical Rules

### ✅ MUST DO

1. **Use Translations Always**
   - No hardcoded text
   - All strings must come from en.json/ar.json
   - Include ARIA labels in translation files

2. **Dark Blue to Slate Gray Gradient Theme**
   - Headings: `from-blue-900 via-slate-700 to-slate-600`
   - Buttons: `from-blue-900 to-slate-700`
   - Maintain theme consistency

3. **Accessibility**
   - Semantic HTML elements
   - ARIA attributes where needed
   - Keyboard navigation support
   - Focus visible states

4. **Performance**
   - Lazy load below-fold content
   - Code split large components
   - Optimize images with Next.js Image

5. **RTL Support**
   - Do NOT handle fonts or RTL in components
   - These are managed globally in layout.tsx
   - Use Tailwind RTL utilities when needed

6. **TypeScript**
   - Type all component props
   - Use interfaces
   - Avoid 'any' type

7. **Professional Aesthetics**
   - Follow minimalist design
   - Use consistent spacing
   - Match existing component styles

### ❌ MUST NOT DO

1. **Never hardcode text** - Always use translation files
2. **Never add font imports** - Handled in layout.tsx
3. **Never add RTL logic** - Handled globally
4. **Avoid inline styles** - Use Tailwind classes (except for specific fixes)
5. **Don't use client components unnecessarily** - Default to server-side
6. **Don't skip accessibility** - It's mandatory
7. **Don't ignore performance** - Lazy load and code split

---

## Component Checklist

Before submitting any new component, verify:

- [ ] Uses TypeScript with proper types
- [ ] All text from translation files (en.json & ar.json)
- [ ] Follows dark blue-gray gradient theme
- [ ] Semantic HTML with ARIA attributes
- [ ] Focus states for interactive elements
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Proper spacing (py-16 md:py-24 for sections)
- [ ] Uses Next.js Image for images
- [ ] Lazy loaded if below fold
- [ ] Animations are subtle and performant
- [ ] No hardcoded fonts or RTL logic
- [ ] Consistent with existing components
- [ ] Comments only where necessary
- [ ] Error handling in critical places

---

## Example Component Template

```tsx
"use client"; // Only if needed

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

interface ComponentProps {
  // Define props with TypeScript
  locale?: string;
}

export default function ComponentName({ locale }: ComponentProps) {
  const t = useTranslations("ComponentName");

  return (
    <section
      className="container mx-auto px-4 py-16 md:py-24"
      aria-labelledby="component-heading"
    >
      <h2
        id="component-heading"
        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-900 via-slate-700 to-slate-600 dark:from-blue-400 dark:via-slate-400 dark:to-slate-300 bg-clip-text text-transparent leading-tight pb-2"
        style={{ 
          WebkitBoxDecorationBreak: 'clone',
          boxDecorationBreak: 'clone'
        }}
      >
        {t("title")}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Component content */}
      </div>
    </section>
  );
}
```

### Corresponding Translation Files

```json
// en.json
{
  "ComponentName": {
    "title": "Component Title",
    "description": "Component description"
  }
}

// ar.json
{
  "ComponentName": {
    "title": "عنوان المكون",
    "description": "وصف المكون"
  }
}
```

---

## Additional Resources

### Tailwind CSS Reference
- [Tailwind Documentation](https://tailwindcss.com/docs)
- Focus on utility classes for all styling

### Next.js Reference
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Dynamic Imports](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)

### Accessibility Reference
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## Contact & Support

For questions or clarifications about these guidelines, please refer to existing components in the codebase as reference implementations:
- `Hero.tsx` - Main hero section with gradients and accessibility
- `Skills.tsx` - Card grid layout with clean design
- `Header.tsx` - Navigation with full keyboard support
- `experience.tsx` - Timeline layout with animations

---

**End of AI Development Instructions**
