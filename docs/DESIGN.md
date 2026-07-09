# DESIGN.md — claylewismusic.com

> Portfolio site for Clay Lewis, a film & media composer in USC's Screen Scoring MFA program.
> This file is the single source of truth for the site's visual identity.
> Read it before writing any CSS, HTML, or JS.

---

## 1. Brand & Mission

**What this site is:** A single-page portfolio optimized for one scenario — a film director who just met Clay at a USC networking event pulls up the site on their phone in an Uber and spends 60–90 seconds deciding whether to bookmark or forget.

**What the director should feel:** Impressed (the work is good enough to take seriously), trusting (Clay is credentialed and professional), and inspired ("I can see how this person could fit with my project").

**The aesthetic in three words:** Warm. Cinematic. Quiet.

**The design metaphor:** Walking into a dimly lit screening room. Warm, focused, confident. The design exists to make Clay's work feel inevitable — the director should press play not because a button is flashing but because everything about the environment says "this person is serious and the work is worth your time."

**The constraint the design resolves:** Impressive enough to be taken seriously, honest enough that nothing feels inflated. Clay is a USC MFA student with MIT credentials and real talent — not an established Hollywood composer. The design communicates competence and taste without overselling.

**What the director should remember:** Clay, not the website. The design is a well-set table — you notice it, it elevates the meal, but you talk about the food afterward.

**Reference points (what was drawn from each):**

- **olafurarnalds.com** — Creative typography, specific vibe, clean presentation. Rejected: horizontal scroll, black-and-white monochrome, Scandinavian austerity.
- **tomholkenborg.com** — Scroll-driven motion that makes browsing feel fun, cohesive design system, good use of color. Rejected: autoplay audio.
- **michaelabels.com** — Semi-transparent header, strong landing image, restrained palette, professional but not stiff.
- **natalieholt.com** — Clean structure and layout, professional feel. Rejected: too serious/somber.
- **criterion.com** — Editorial confidence, work-centered, grainy texture. Rejected: requires more image inventory than Clay has.

---

## 2. Colors

The palette is derived from Clay's professional environment: warm amber lighting of a mixing console, dark studio surfaces, warm shadows. The gold accent connotes cinematic craft (title cards, award shows, film credits) without feeling corporate.

```css
:root {
  /* ── Background ── */
  --color-bg-primary:     #1c1a17;   /* Main page background — warm charcoal */
  --color-bg-elevated:    #242119;   /* Audio player, interactive surfaces */
  --color-bg-subtle:      #2a2620;   /* Hover states, subtle differentiation */

  /* ── Text ── */
  --color-text-primary:   #f0ece4;   /* Headings, body text — warm off-white */
  --color-text-secondary: #c4bdb2;   /* Metadata, descriptions — softer warm white */
  --color-text-muted:     #a09889;   /* Tertiary labels, timestamps, section headings — warm gray */

  /* ── Accent ── */
  --color-accent:         #c8a96e;   /* Gold — credential line, active states, links */
  --color-accent-hover:   #d4b87e;   /* Lighter gold — hover/focus on accent elements */
  --color-accent-subtle:  rgba(200, 169, 110, 0.12); /* Gold tint — backgrounds, borders */

  /* ── Border ── */
  --color-border:         rgba(240, 236, 228, 0.08); /* Default dividers — barely visible */
  --color-border-strong:  rgba(240, 236, 228, 0.15); /* Audio player progress track */

  /* ── Overlay ── */
  --color-overlay:        rgba(28, 26, 23, 0.85);    /* Semi-transparent header background */
}
```

### Color rules

- **Gold accent is used sparingly.** It appears on: the credential/subtitle line, link hover states, the active audio player progress bar, and social icon hover states. It does NOT appear on section headings, body text, or borders. Overusing gold makes the palette feel cheap.
- **Sections are separated by whitespace, not color.** Background is `--color-bg-primary` everywhere. `--color-bg-elevated` is reserved for the audio player component and interactive elements only.
- **No pure white or pure black anywhere.** All whites are warm (`#f0ece4` family). All darks are warm (`#1c1a17` family). This warmth is the single most important quality of the palette.
- **Vimeo embeds blend naturally** on this dark warm background. Set Vimeo embed `color` parameter to `c8a96e` to match the gold accent on the playbar.

---

## 3. Typography

Two Google Fonts families, loaded via `<link>` with `font-display: swap`.

**Display — Syne (variable, 400–800).** Geometric sans-serif with subtle character. At large sizes it reads as cinematic; at smaller sizes it stays clean. Avoids the "tech startup" feel of Inter or the "design studio" feel of a grotesque. Used for: Clay's name, section headings, project titles.

**Body — Inter (variable, 400–500).** Optimized for screen reading at small sizes. Its neutrality is a feature — it stays out of the way and lets Syne carry the identity. Used for: body text, metadata, descriptions, audio player UI. Only two weights: 400 (regular) and 500 (medium for labels).

```css
:root {
  --font-display: 'Syne', sans-serif;
  --font-body:    'Inter', sans-serif;
}
```

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Syne:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type scale

All sizes in `rem` relative to 16px root. The scale is purposefully limited — fewer sizes means stronger hierarchy.

```css
:root {
  --type-hero:         700 3rem/1.1 var(--font-display);      /* 48px — Clay's name, desktop */
  --type-hero-mobile:  700 2rem/1.15 var(--font-display);     /* 32px — Clay's name, mobile */
  --type-section:      600 1.125rem/1.3 var(--font-display);  /* 18px — section headings */
  --type-project:      500 1rem/1.3 var(--font-display);      /* 16px — project titles */
  --type-body:         400 0.9375rem/1.65 var(--font-body);   /* 15px — bio, descriptions */
  --type-meta:         500 0.8125rem/1.5 var(--font-body);    /* 13px — metadata, credentials */
  --type-small:        400 0.75rem/1.5 var(--font-body);      /* 12px — audio time, copyright */
}
```

### Type rules

- **Clay's name:** Syne 700, `letter-spacing: 0.03em`. Slight tracking opens it up at hero scale.
- **Credential line** ("Film & Media Composer · USC Screen Scoring MFA"): `--type-meta` in `--color-accent`. Uppercase, `letter-spacing: 0.08em`. Dot separator (`·`) in `--color-text-muted`. This is one of the key typographic moments on the page.
- **Section headings:** Uppercase Syne 600, `letter-spacing: 0.1em`, `--color-text-muted`. Quiet wayfinding markers — labels, not shout-y headlines. Generous space below.
- **Project titles:** Syne 500, `--color-text-primary`. Not uppercase — normal case reads as warmer for individual project names.
- **Body text:** Inter 400, `--color-text-primary`. Max line length: `max-width: 38rem` (~65ch).
- **Fallback if Syne renders poorly at hero scale on target devices:** DM Sans or Plus Jakarta Sans.

---

## 4. Spacing & Layout

8px base unit. All spacing is multiples of 8.

```css
:root {
  --space-xs:   0.25rem;  /*   4px — internal component padding */
  --space-sm:   0.5rem;   /*   8px — tight gaps within components */
  --space-md:   1rem;     /*  16px — standard internal spacing */
  --space-lg:   1.5rem;   /*  24px — between related elements */
  --space-xl:   2rem;     /*  32px — between component groups */
  --space-2xl:  3rem;     /*  48px — between sections (mobile) */
  --space-3xl:  5rem;     /*  80px — between sections (desktop) */
  --space-4xl:  8rem;     /* 128px — hero vertical padding */
}
```

### Grid

```css
:root {
  --grid-max-width:     800px;   /* Content max-width — keeps text readable */
  --grid-wide:          1000px;  /* Video embeds can go wider */
  --grid-gutter-mobile: 20px;   /* Side padding on mobile */
  --grid-gutter:        32px;   /* Side padding on desktop */
}
```

**Layout is a single centered column.** No multi-column grid. Video embeds extend to `--grid-wide`; all other content stays within `--grid-max-width`. The only exception: the About section may use a 2-column layout (text + headshot) on desktop if Clay provides a photo.

### Breakpoints

Mobile-first. Two breakpoints only. Phone is the design target — everything designed for ~375px first.

```css
/* Base: 0–599px (phone — primary target) */
@media (min-width: 600px) { /* Tablet */ }
@media (min-width: 900px) { /* Desktop */ }
```

Layout structure does not change across breakpoints — only spacing, type size, and content width scale.

---

## 5. Components

### 5.1 Header (semi-transparent, fixed)

Fixed to top. Background: `--color-overlay` with `backdrop-filter: blur(12px)`. Contains Clay's name (`--type-meta`, Syne 500) left-aligned and anchor links (Work · Compositions · About · Contact) in `--type-small` right-aligned. Links smooth-scroll.

**Behavior:** Hidden on initial load (hero already shows Clay's name). Fades in (200ms ease-out) after scrolling past the hero. On mobile: name only, no nav links.

```css
.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
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

### 5.2 Hero

Studio photo (Clay at the mixing console) as a prominent background or image. Clay's name in `--type-hero` (desktop) / `--type-hero-mobile` (mobile). Credential line below in `--type-meta` / `--color-accent`.

**Critical constraint:** On mobile, the hero must NOT consume the entire viewport. Director must see Clay's name, the studio image, AND a hint of content below — without scrolling. No `100vh`. Image height is content-driven; may be cropped to ~50-60% of viewport with `object-fit: cover`.

Desktop: more generous vertical padding (`--space-4xl`), larger image.

### 5.3 Featured video (primary CTA)

Immediately below the hero. Clay's single strongest scored-to-picture piece, embedded from Vimeo. 16:9 aspect ratio, `max-width: var(--grid-wide)`, `border-radius: 4px`, `overflow: hidden`.

Below the embed: project metadata in `--type-meta` / `--color-text-secondary`. Single line with dot separators on desktop, stacking on mobile.

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

Vimeo embed parameters: `?badge=0&autopause=0&player_id=0&app_id=0&color=c8a96e&title=0&byline=0&portrait=0`. Featured video loads eagerly; all subsequent embeds use `loading="lazy"`. Consider a lightweight facade (thumbnail + play button that replaces with iframe on click) for non-featured videos.

### 5.4 Work section — project cards

Each scored-to-picture project as a repeating unit. No cards, no borders, no background differentiation — projects separated by whitespace alone (`--space-3xl` desktop, `--space-2xl` mobile).

Per project:
- Vimeo embed (16:9, same container style, but at `--grid-max-width`)
- Project title: `--type-project` / `--color-text-primary`, left-aligned below embed
- Metadata cluster: type · director · role · year in `--type-meta` / `--color-text-secondary`
- Optional one-line description: `--type-body` / `--color-text-muted`

Section heading "Work": `--type-section`, uppercase, `--color-text-muted`, `letter-spacing: 0.1em`. `--space-3xl` above, `--space-xl` below.

### 5.5 Compositions section — audio player

Custom audio player. The most design-intensive component. Each track is an elevated container:

```
┌─────────────────────────────────────────────────┐
│  ▶  Alas... Sanctuary                    2:34   │
│     for string quartet                          │
│     ━━━━━━━━━━━━━━━━━━━━━░░░░░░░░░░░░░░░░░░░░   │
└─────────────────────────────────────────────────┘
```

- Container: `--color-bg-elevated`, no border, `border-radius: 8px`, padding `--space-lg`
- Play/pause button: circle, 40px, `--color-accent` fill, icon in `--color-bg-primary`. Hover: `--color-accent-hover`
- Track title: `--type-project` (Syne 500) / `--color-text-primary`, inline with play button
- Duration: `--type-small` / `--color-text-muted`, right-aligned
- Instrumentation: `--type-meta` / `--color-text-secondary`, below title
- Progress bar: full width, track 3px `--color-border-strong`, fill 3px `--color-accent`. Scrubber handle: 12px circle `--color-accent`, hidden until hover/active

**States:** Default (play icon, bar at 0%). Playing (pause icon, bar fills, accent glow on button). Hover on bar (scrubber appears). Loading (bar pulses, `--color-accent-subtle`).

**Behavior:** Only one track plays at a time. Tracks load on click, not on page load. Audio files served from Cloudflare R2.

Spacing between tracks: `--space-md` (16px). Section heading "Compositions": same treatment as other sections.

### 5.6 About section

Prose text block. `--type-body`, `--color-text-primary`, `max-width: 38rem`. Left-aligned, not centered. Credentials woven into prose — no bold, no accent color on institution names. The bio reads as a human paragraph, not a highlight reel.

Optional: headshot to the right on desktop (2-column at this breakpoint only), above text on mobile. Not a launch requirement.

### 5.7 Contact section

- Email: `mailto:` link, `--type-body`, `--color-accent`. Underline on hover only. Primary CTA of this section.
- Location: `--type-meta` / `--color-text-muted`. One line.
- Social links: row of inline SVG icons (YouTube, Instagram, LinkedIn). 20px, `--color-text-muted` default, `--color-accent` on hover. Transition: 200ms ease.

Spacing: `--space-md` between email, location, and social row.

### 5.8 Footer

Below contact. "© 2026 Clay Lewis" in `--type-small` / `--color-text-muted`, centered. `--space-2xl` above, `--space-xl` below.

---

## 6. Elevation & Depth

Elevation is expressed through background color, not shadow. This is a dark-theme site — shadows are invisible against dark backgrounds.

| Surface level | Token | Usage |
|---|---|---|
| Base | `--color-bg-primary` | Page background, all sections |
| Elevated | `--color-bg-elevated` | Audio player tracks, interactive components |
| Subtle | `--color-bg-subtle` | Hover states on elevated surfaces |
| Overlay | `--color-overlay` | Fixed header (with backdrop blur) |

No box shadows anywhere. No gradients. Depth comes from the warm color step between surfaces and from the backdrop blur on the header overlay.

---

## 7. Motion

**Philosophy:** Motion is earned, not applied. Every animation has a reason: reducing cognitive load (scroll → content reveals) or providing feedback (hover, press, play state). Nothing animates for decoration.

### Scroll-driven reveals

Elements fade in and slide up 20px as they scroll into view. Implemented with CSS transitions + IntersectionObserver (~15 lines of JS).

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

**What gets reveals:** project cards (Work), audio tracks (Compositions), About text, Contact section.

**What does NOT animate:** The hero (it's there on load — the stage doesn't walk onstage). The featured video (first content after hero — animating it delays the most important CTA). The fixed header (uses its own opacity transition).

### Micro-interactions

| Element | Trigger | Animation | Timing |
|---|---|---|---|
| Links, nav anchors | Hover | Color → `--color-accent-hover` | 200ms ease |
| Social icons | Hover | Color → `--color-accent` | 200ms ease |
| Audio play button | Hover | Background → `--color-accent-hover` | 150ms ease |
| Audio play button | Press | `scale(0.95)` | 100ms ease-in-out |
| Audio progress bar | Hover | Scrubber handle opacity 0→1 | 150ms ease |
| Vimeo embeds | — | No custom animation (Vimeo handles its own UI) | — |

### Reduced motion

All animation respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

---

## 8. Voice & Writing

**Register:** Warm, professional, first person. The tone of someone you'd want to grab coffee with, not a grant application.

**Bio:** 3-5 sentences. Key credentials (USC, MIT, awards) woven into narrative prose, not listed. No third person. No fellowship-application register.

**Project metadata:** Factual and terse. Title · Type · Director · Role · Year. No marketing language, no superlatives. The work speaks for itself.

**Section headings:** Single nouns. "Work." "Compositions." "About." "Contact." Not "My Work" or "Get In Touch" or "Listen to My Music."

**Credential line:** "Film & Media Composer · USC Screen Scoring MFA" — institutional identity in the most compressed form possible.

---

## 9. Accessibility

- **Color contrast:** `--color-text-primary` (#f0ece4) on `--color-bg-primary` (#1c1a17) exceeds WCAG AA for normal text. `--color-accent` (#c8a96e) on `--color-bg-primary` passes AA for large text; verify at `--type-meta` sizes.
- **Reduced motion:** All animations disabled via `prefers-reduced-motion: reduce` (see Section 7).
- **Keyboard focus:** All interactive elements (links, play buttons, progress bar) must have visible focus indicators. Use `outline: 2px solid var(--color-accent)` with `outline-offset: 2px`.
- **Audio player:** Play/pause button has `aria-label` ("Play [track name]" / "Pause [track name]"). Progress bar is a `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-label="Seek"`.
- **Vimeo iframes:** Each embed has a descriptive `title` attribute (e.g., `title="Harmony Rescore — Clay Lewis, Composer"`).
- **Semantic HTML:** Use `<header>`, `<main>`, `<section>`, `<footer>`. Each section has an `<h2>` even if the visual heading is styled as a small label.
- **Skip link:** Hidden skip-to-content link before the header for keyboard users.

---

## Technical Context

**Stack:** Plain HTML / CSS / JS. No framework, no build step, no package.json. `git push` deploys to Cloudflare Pages.

**Video:** Vimeo embeds. Adaptive streaming, no competitor recommendations, minimal chrome.

**Audio:** MP3 files on Cloudflare R2 (free tier, zero egress). Custom player wraps native HTMLAudioElement (~50-100 lines JS).

**Fonts:** Google Fonts via `<link>`. Two families only (Syne + Inter).

**External dependencies shipped to visitor:** Zero JS libraries. Zero CSS frameworks.

**Repo structure:**
```
claylewismusic.com/
├── index.html
├── css/
│   ├── reset.css
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── favicon.ico / favicon.svg / apple-touch-icon.png
│   └── og-image.jpg
├── DESIGN.md          ← this file
├── CONTENT.md
├── TECH_STACK.md
└── README.md
```

**Performance targets:** FCP < 1.0s, LCP < 2.0s, total page weight < 200KB (before lazy-loaded embeds), JS payload < 5KB, external library dependencies: 0.
