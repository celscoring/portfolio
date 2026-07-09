# claylewismusic.com — Design System Specification

**Session 3 of 3: Design System**
**Date:** July 6, 2026
**Prepared by:** Cole Lewis (for Clay Lewis)

---

## Design Direction

The site should feel like walking into a dimly lit screening room — warm, focused, confident. The design exists to make Clay's work feel inevitable: the director should press play not because a button is flashing but because everything about the environment says "this person is serious and the work is worth your time."

**Core tension the design resolves:** Impressive enough to be taken seriously, honest enough that nothing feels inflated. Clay is a USC MFA student with MIT credentials and real talent — not an established Hollywood composer. The design communicates competence and taste without overselling.

**The aesthetic in three words:** Warm. Cinematic. Quiet.

**What the director should remember:** Clay, not the website. The design is a well-set table — you notice it, it elevates the meal, but you talk about the food afterward.

### Reference Points

Sites that informed the direction (what was drawn from each):

- **olafurarnalds.com** — Creative typography, specific vibe, clean presentation. Rejected: horizontal scroll, black-and-white monochrome, Scandinavian austerity.
- **tomholkenborg.com** — Scroll-driven motion that makes browsing feel fun, cohesive design system, good use of color to break up content. Rejected: autoplay audio.
- **michaelabels.com** — Semi-transparent header, strong landing image, restrained 1–2 color palette, professional but not stiff.
- **natalieholt.com** — Clean structure and layout, professional feel. Rejected: too serious/somber overall mood.
- **criterion.com** — Editorial confidence, work-centered, grainy texture. Rejected: requires more image inventory than Clay currently has.

---

## 1. Color System

### Palette

The palette is derived from Clay's professional environment: the warm amber lighting of a mixing console, dark studio surfaces, warm shadows. The gold accent tone complements Clay's skin tone and connotes cinematic craft (title cards, award shows, film credits) without feeling corporate.

### Tokens

```css
:root {
  /* ── Background ── */
  --color-bg-primary:     #1c1a17;   /* Main page background — warm charcoal */
  --color-bg-elevated:    #242119;   /* Cards, audio player, slightly lifted surfaces */
  --color-bg-subtle:      #2a2620;   /* Hover states, subtle differentiation */

  /* ── Text ── */
  --color-text-primary:   #f0ece4;   /* Headings, body text — warm off-white */
  --color-text-secondary: #c4bdb2;   /* Metadata, descriptions — softer warm white */
  --color-text-muted:     #a09889;   /* Tertiary labels, timestamps — warm gray */

  /* ── Accent ── */
  --color-accent:         #c8a96e;   /* Gold — credential line, active states, links */
  --color-accent-hover:   #d4b87e;   /* Lighter gold — hover/focus on accent elements */
  --color-accent-subtle:  rgba(200, 169, 110, 0.12); /* Gold tint — backgrounds, borders */

  /* ── Border ── */
  --color-border:         rgba(240, 236, 228, 0.08); /* Default dividers — barely visible */
  --color-border-strong:  rgba(240, 236, 228, 0.15); /* Emphasized dividers, audio player track */

  /* ── Overlay ── */
  --color-overlay:        rgba(28, 26, 23, 0.85);    /* Semi-transparent header background */
}
```

### Usage Rules

- **Gold accent is used sparingly.** It appears on: Clay's credential/subtitle line, link hover states, the active audio player progress bar, and social icon hover states. It does not appear on section headings, body text, or borders by default. Overusing gold makes the palette feel cheap.
- **Section differentiation through spacing, not color.** Sections are separated by generous whitespace, not by alternating background colors. The background is `--color-bg-primary` everywhere. `--color-bg-elevated` is reserved for the audio player component and interactive elements.
- **No pure white or pure black anywhere.** All whites are warm (`#f0ece4` family). All darks are warm (`#1c1a17` family). This warmth is the single most important quality of the palette.
- **Vimeo embeds on this background.** The dark warm background means Vimeo's default dark chrome will blend naturally. Set Vimeo embed `color` parameter to match the gold accent for the playbar.

---

## 2. Typography

### Typeface Selection

Two Google Fonts families, loaded via `<link>` with `font-display: swap`:

**Display — Syne (variable, 400–800)**
Used for Clay's name in the hero and section headings. Syne is a geometric sans-serif with subtle character — its letterforms have just enough personality to feel intentional without being decorative. At large sizes it reads as cinematic; at smaller sizes it stays clean. It avoids the "tech startup" feel of Inter or the "design studio" feel of a grotesque while still being modern.

**Body — Inter (variable, 400–500)**
Used for all body text, metadata, descriptions, the bio, and the audio player UI. Inter is optimized for screen reading at small sizes. Its neutrality is a feature here — it stays out of the way and lets Syne carry the identity. Only two weights used: 400 (regular) for body text and 500 (medium) for metadata labels.

```css
:root {
  --font-display: 'Syne', sans-serif;
  --font-body:    'Inter', sans-serif;
}
```

**Google Fonts load tag:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Syne:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

All sizes in `rem` relative to a 16px root. The scale is purposefully limited — fewer sizes means stronger hierarchy.

| Token | Size | Weight | Font | Line-height | Usage |
|---|---|---|---|---|---|
| `--type-hero` | 3rem (48px) | 700 | Syne | 1.1 | Clay's name in the hero, desktop |
| `--type-hero-mobile` | 2rem (32px) | 700 | Syne | 1.15 | Clay's name in the hero, mobile |
| `--type-section` | 1.125rem (18px) | 600 | Syne | 1.3 | Section headings (Work, Compositions, About, Contact) |
| `--type-project` | 1rem (16px) | 500 | Syne | 1.3 | Project titles |
| `--type-body` | 0.9375rem (15px) | 400 | Inter | 1.65 | Bio text, descriptions |
| `--type-meta` | 0.8125rem (13px) | 500 | Inter | 1.5 | Project metadata, credential line |
| `--type-small` | 0.75rem (12px) | 400 | Inter | 1.5 | Audio player time, copyright, fine print |

```css
:root {
  --type-hero:         700 3rem/1.1 var(--font-display);
  --type-hero-mobile:  700 2rem/1.15 var(--font-display);
  --type-section:      600 1.125rem/1.3 var(--font-display);
  --type-project:      500 1rem/1.3 var(--font-display);
  --type-body:         400 0.9375rem/1.65 var(--font-body);
  --type-meta:         500 0.8125rem/1.5 var(--font-body);
  --type-small:        400 0.75rem/1.5 var(--font-body);
}
```

### Typography Rules

- **Clay's name** is set in Syne 700 with `letter-spacing: 0.03em`. The slight tracking opens it up at hero scale without feeling airy.
- **The credential line** ("Film & Media Composer · USC Screen Scoring MFA") is `--type-meta` in `--color-accent`. The dot separator (`·`) uses `--color-text-muted`. Uppercase with `letter-spacing: 0.08em` — small text, expanded tracking, gold color. This is one of the key typographic moments on the page.
- **Section headings** are uppercase Syne 600 with `letter-spacing: 0.1em`, `--color-text-muted`. They are quiet wayfinding markers, not shout-y headlines. They sit above content with generous space below, acting more like labels than headings.
- **Project titles** are Syne 500 in `--color-text-primary`. Not uppercase. Normal case reads as warmer and more natural for individual project names.
- **Body text** is Inter 400 in `--color-text-primary`. The bio section uses this. Max line length: 65ch (`max-width: 38rem`).

---

## 3. Spacing & Layout

### Spacing Scale

8px base unit. All spacing values are multiples of 8:

```css
:root {
  --space-xs:   0.25rem;  /*  4px — internal component padding */
  --space-sm:   0.5rem;   /*  8px — tight gaps within components */
  --space-md:   1rem;     /* 16px — standard internal spacing */
  --space-lg:   1.5rem;   /* 24px — between related elements */
  --space-xl:   2rem;     /* 32px — between component groups */
  --space-2xl:  3rem;     /* 48px — between sections (mobile) */
  --space-3xl:  5rem;     /* 80px — between sections (desktop) */
  --space-4xl:  8rem;     /* 128px — hero vertical padding */
}
```

### Grid

```css
:root {
  --grid-max-width:     800px;    /* Content max-width — keeps text readable */
  --grid-wide:          1000px;   /* Video embeds can go wider */
  --grid-gutter-mobile: 20px;     /* Side padding on mobile */
  --grid-gutter:        32px;     /* Side padding on desktop */
}
```

**Layout is a single centered column.** No multi-column grid — the single-page scroll is one column of content, centered, with generous side padding. Video embeds may extend slightly wider than text content (`--grid-wide` vs `--grid-max-width`) for visual emphasis.

### Breakpoints

Mobile-first. Two breakpoints only:

```css
/* Base: 0–599px (phone — the primary target) */
/* Tablet: 600px+ */
@media (min-width: 600px) { ... }
/* Desktop: 900px+ */
@media (min-width: 900px) { ... }
```

**Phone is the design target.** Everything is designed for a ~375px viewport first. Tablet and desktop get more whitespace and larger hero type, but the layout structure does not change. There is no hamburger menu because there is no navigation bar (single-page scroll).

---

## 4. Component Specifications

### 4.1 Header (Semi-transparent, fixed)

**Inspiration:** michaelabels.com semi-transparent header.

**Visual treatment:** Fixed to top of viewport. Background: `--color-overlay`. Contains Clay's name (small — `--type-meta`, Syne 500) left-aligned and a minimal set of anchor links right-aligned (Work · Compositions · About · Contact) in `--type-small`.

**Behavior:** Hidden on initial load (the hero has Clay's name already — no need to double it). Appears after scrolling past the hero section, with a subtle fade-in (200ms, ease-out). The anchor links smooth-scroll to their sections.

**Responsive:** On mobile, the anchor links are hidden. Just Clay's name, small, top-left. The single-page scroll doesn't need navigation on a phone — the director just thumbs down.

**States:**
- Default (scrolled past hero): visible, `--color-overlay` background
- At top of page: hidden

```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: var(--space-md) var(--grid-gutter);
  background: var(--color-overlay);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease-out;
}
.site-header.visible {
  opacity: 1;
  pointer-events: auto;
}
```

### 4.2 Hero Section

**Content:** Clay's studio photo (the mixing console shot) as a background or prominent image. Clay's name in `--type-hero`. Credential line below in `--type-meta` / `--color-accent`.

**Visual treatment:** The studio photo provides the atmospheric first impression. Clay's name and credential line are positioned over or immediately below the image — exact relationship (overlay vs. stacked) to be resolved in visual comp stage.

**Key constraint:** On mobile, the hero must not consume the entire viewport height. The director should see Clay's name, the studio image, and ideally a hint that there's more content below — all without scrolling. No full-bleed viewport-height hero.

**Responsive:**
- Mobile: hero height is `auto` / content-driven, not `100vh`. Image may be cropped to roughly 50–60% of viewport height with `object-fit: cover`.
- Desktop: more generous vertical padding (`--space-4xl`), image can be larger.

### 4.3 Featured Video (Primary CTA)

**What it is:** Clay's single strongest scored-to-picture piece, embedded from Vimeo. This is the first piece of work the director encounters — immediately below the hero.

**Visual treatment:** Vimeo embed in a 16:9 aspect ratio container. Width: `--grid-wide` (wider than text content). Rounded corners: 4px (subtle — it's video, not a card). No additional frame, border, or label above the embed. The video is self-explanatory in context — it sits directly below the hero and the work speaks for itself.

**Below the embed:** Project metadata in `--type-meta` / `--color-text-secondary`: project title, type, director, Clay's role, year. Arranged as a single line with dot separators on desktop, stacking to two lines on mobile.

```css
.video-container {
  position: relative;
  width: 100%;
  max-width: var(--grid-wide);
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  overflow: hidden;
}
.video-container iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
```

**Vimeo embed parameters:**
```
?badge=0&autopause=0&player_id=0&app_id=0&color=c8a96e&title=0&byline=0&portrait=0
```
- `color=c8a96e`: playbar matches the gold accent
- `title=0&byline=0&portrait=0`: strips Vimeo's default metadata overlay
- `loading="lazy"`: only for non-hero videos (the featured video loads eagerly)

### 4.4 Work Section — Project Cards

**What it is:** Each remaining scored-to-picture project as a repeating unit.

**Visual treatment per card:**
- Vimeo embed (16:9, same container style as hero video but at `--grid-max-width`)
- Project title in `--type-project` / `--color-text-primary`, left-aligned below the embed
- Metadata cluster below the title: type · director · role · year in `--type-meta` / `--color-text-secondary`
- Optional one-line description in `--type-body` / `--color-text-muted`

**Spacing:** `--space-3xl` (80px) between project cards on desktop, `--space-2xl` (48px) on mobile. This generous spacing lets each project breathe and prevents the page from feeling like a feed.

**Section heading:** "Work" — set in `--type-section`, uppercase, `--color-text-muted`, with `--space-3xl` above and `--space-xl` below.

**No cards, no borders, no background differentiation.** Projects are separated by whitespace alone. Adding card containers or dividers would make the section feel like a list rather than a curated collection.

### 4.5 Compositions Section — Audio Player

**What it is:** The custom audio player for standalone (non-film) compositions. This is the most design-intensive component.

**Visual treatment per track:**

```
┌─────────────────────────────────────────────────┐
│  ▶  Alas... Sanctuary                    2:34   │
│     for string quartet                          │
│     ━━━━━━━━━━━━━━━━━━━━━░░░░░░░░░░░░░░░░░░░░   │
└─────────────────────────────────────────────────┘
```

- Container: `--color-bg-elevated` background, no border, `border-radius: 8px`, padding `--space-lg`.
- Play/pause button: circle, 40px diameter, `--color-accent` fill, play/pause icon in `--color-bg-primary`. On hover: `--color-accent-hover`.
- Track title: `--type-project` (Syne 500) / `--color-text-primary`, inline with the play button.
- Duration: `--type-small` / `--color-text-muted`, right-aligned.
- Instrumentation: `--type-meta` / `--color-text-secondary`, below the title.
- Progress bar: full width below the metadata. Track: 3px tall, `--color-border-strong`. Fill: 3px tall, `--color-accent`. Scrubber handle: 12px circle, `--color-accent`, hidden until hover/active.

**States:**
- Default: play icon, no progress visible (bar at 0%).
- Playing: pause icon, progress bar fills, `--color-accent` active glow on the play button.
- Hover on progress bar: scrubber handle appears, cursor changes to pointer.
- Loading: progress bar pulses subtly (CSS animation, `--color-accent-subtle`).

**Interaction:** Only one track plays at a time. Starting a new track stops the current one. Tracks load on user interaction (click play), not on page load.

**Spacing between tracks:** `--space-md` (16px). Tracks are visually grouped — the section heading sits above the group with the same styling as other section headings.

**Section heading:** "Compositions" — same treatment as Work section heading.

### 4.6 About Section

**Visual treatment:** Prose text block, `--type-body`, `--color-text-primary`. Max-width: 38rem (≈65ch) for comfortable reading. Left-aligned, not centered.

**Section heading:** "About" — same treatment as other section headings.

**Key credentials** (USC, MIT, awards) are woven into prose, not visually differentiated. No bold, no accent color on institution names. The bio reads as a human paragraph, not a highlight reel.

**Optional image consideration:** If Clay wants a photo in this section (the headshot — image 2 — would work), it sits to the right of the text on desktop (2-column layout at this breakpoint only) and above the text on mobile. This is the one place a multi-column layout may appear. Not a launch requirement.

### 4.7 Contact Section

**Visual treatment:**

- Email: `mailto:` link in `--type-body`, `--color-accent`. Underline on hover only (not default). This is the primary CTA — it should be the most visually prominent element in the section.
- Location: `--type-meta` / `--color-text-muted`. One line (e.g., "Los Angeles, CA").
- Social links: Row of icon links (YouTube, Instagram, LinkedIn). Icons are SVG, 20px, `--color-text-muted` default, `--color-accent` on hover. Transition: color 200ms ease.

**Spacing:** `--space-md` between email, location, and social row.

**Section heading:** "Contact" — same treatment as other section headings.

**Footer:** Below the contact section, a subtle copyright line: "© 2026 Clay Lewis" in `--type-small` / `--color-text-muted`, centered, with `--space-2xl` above and `--space-xl` below.

---

## 5. Motion & Interaction

### Philosophy

Motion is earned, not applied. Every animation has a reason: either it reduces cognitive load (scroll position → content reveals) or it provides feedback (hover, press, play state). Nothing animates for decoration.

### Scroll-Driven Reveals

Elements fade in and slide up slightly as they scroll into view. This is the primary motion on the page. Implemented with CSS `@keyframes` + `IntersectionObserver` (a few lines of JS — no library).

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

**What gets the reveal treatment:**
- Each project card in the Work section (video + metadata as a unit)
- Each audio track in the Compositions section
- The About section text
- The Contact section

**What does NOT animate:**
- The hero (name + image) — it's there on load, no entrance animation. The hero is the stage; it doesn't walk onstage.
- The featured video — it's the first content the user scrolls to. Animating it would delay the most important CTA.
- The fixed header — it uses a simple opacity transition (see 4.1), not the reveal system.

### Interaction Micro-animations

| Element | Trigger | Animation | Duration/Easing |
|---|---|---|---|
| Links (email, nav anchors) | Hover | Color → `--color-accent-hover` | 200ms ease |
| Social icons | Hover | Color → `--color-accent` | 200ms ease |
| Audio play button | Hover | Background → `--color-accent-hover` | 150ms ease |
| Audio play button | Press | `scale(0.95)` | 100ms ease-in-out |
| Audio progress bar | Hover | Scrubber handle appears (opacity 0→1) | 150ms ease |
| Vimeo embeds | — | No custom animation — Vimeo handles its own UI | — |

### Reduced Motion

All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

---

## 6. Responsive Behavior Summary

### Mobile (0–599px) — Primary target

- Hero type: `--type-hero-mobile` (32px)
- Credential line: wraps to two lines if needed
- Section spacing: `--space-2xl` (48px)
- Side padding: `--grid-gutter-mobile` (20px)
- Video embeds: full width minus gutters
- Fixed header: name only, no nav links
- Audio player: full width minus gutters
- Project metadata: stacks vertically

### Tablet (600–899px)

- Hero type: scales between mobile and desktop
- Side padding: `--grid-gutter` (32px)
- Content max-width: enforced at `--grid-max-width`
- Fixed header: name + nav links visible

### Desktop (900px+)

- Hero type: `--type-hero` (48px)
- Section spacing: `--space-3xl` (80px)
- Video embeds: `--grid-wide` (1000px) max-width
- Content: `--grid-max-width` (800px) max-width
- About section: optional 2-column layout (text + headshot)
- Generous breathing room — the wide screen earns more whitespace, not wider content

---

## 7. Asset Requirements

| Asset | Format | Dimensions | Notes |
|---|---|---|---|
| Studio hero photo | JPEG or WebP | ≥ 1600px wide | The mixing console shot. Provide 2x for retina. Consider serving WebP with JPEG fallback via `<picture>`. |
| Headshot (optional) | JPEG or WebP | ≥ 600px wide | For the About section if Clay wants a photo there. |
| OG image | JPEG | 1200 × 630px | Social sharing preview. Could be a cropped/treated version of the studio photo with Clay's name overlaid. Design this separately. |
| Favicon | SVG + ICO + PNG | Standard sizes | SVG for modern browsers (can adapt to dark mode). ICO for legacy. apple-touch-icon.png at 180×180. |
| Social icons | Inline SVG | 20×20 viewBox | YouTube, Instagram, LinkedIn. Inline SVG (not icon font, not image files) for color control via CSS. |

---

## 8. Decisions Log

| # | Decision | Status | Rationale |
|---|---|---|---|
| 1 | Dark warm palette (charcoal + gold) | Locked | Complements Clay's skin tone, connotes cinematic craft, matches the warm lighting of studio environments. |
| 2 | Sans-serif typography (Syne display + Inter body) | Locked | Modern and clean without feeling corporate. Syne has enough character for display use; Inter is invisible-good for body text. |
| 3 | Studio photo as hero, featured video immediately below | Locked | The studio shot communicates "legit" before any music plays. A Vimeo thumbnail alone is just a rectangle with a play button — the photo earns the click. |
| 4 | Gentle scroll-driven fade/slide-up reveals | Locked | Adds life to scrolling without gimmickry. Implemented via IntersectionObserver (~15 lines of JS), no library. |
| 5 | Semi-transparent fixed header, hidden until scroll past hero | Locked | Provides wayfinding without doubling the hero's content. Inspired by michaelabels.com. |
| 6 | No full-viewport hero | Locked | Director must see content hint below the hero without scrolling. Rejected based on nilsfrahm.com and aislingbrouwer.com feedback. |
| 7 | Gold accent used sparingly | Locked | Credential line, link hovers, audio player active state, social icon hovers. Nowhere else. Overuse cheapens the palette. |
| 8 | Mobile-first, two breakpoints (600px, 900px) | Locked | Phone-in-Uber is the primary scenario. Layout structure doesn't change across breakpoints — only spacing, type size, and content width scale. |
| 9 | Single-column layout (no grid) | Locked | Small portfolio inventory, single-page scroll. Multi-column adds complexity without benefit at this scale. |
| 10 | Custom audio player, elevated surface | Locked | Distinctive component with full design control. `--color-bg-elevated` differentiates it from the page without adding borders or cards everywhere. |

---

## Open Items for Implementation

1. **Hero photo/name relationship.** Exact treatment (name overlaid on photo vs. stacked separately) to be resolved in visual comp / implementation. Both approaches work with this design system.
2. **Syne rendering test.** Load Syne at hero scale (48px/32px) on target devices before committing. If the variable font renders poorly on any target browser, DM Sans or Plus Jakarta Sans are fallback options with similar warmth.
3. **Vimeo embed lazy loading.** The featured (hero) video loads eagerly. All subsequent Vimeo embeds use `loading="lazy"` on the iframe. Consider a lightweight facade (thumbnail + play button overlay that replaces with the real iframe on click) to avoid loading Vimeo's JS until the user actually interacts.
4. **Audio file preparation.** All compositions exported as MP3, 192–256kbps, uploaded to R2. File naming: lowercase, hyphenated (e.g., `alas-sanctuary.mp3`).
5. **OG image design.** Needs to be designed and exported at 1200×630. Recommend: the studio photo, darkened, with "Clay Lewis — Film & Media Composer" overlaid in Syne. Keep it simple — it's a text preview in a timeline, not a poster.

---