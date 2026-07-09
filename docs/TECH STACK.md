# claylewismusic.com — Tech Stack Specification

**Session 2 of 3: Tech Stack & Hosting**
**Date:** July 6, 2026
**Prepared by:** Cole Lewis (for Clay Lewis)

---

## Summary of Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Plain HTML / CSS / JS | Zero build rot, zero dependencies, identical visual capability to any framework. Clay has the CS chops to edit HTML directly. |
| Hosting | Cloudflare Pages (free tier) | Same platform as R2 audio storage. Auto-deploys from GitHub on push. Free SSL, global CDN. |
| Video hosting | Vimeo embeds | Adaptive streaming, no competitor recommendations, clean embed chrome. Critical for the phone-on-cellular scenario. |
| Audio hosting | Cloudflare R2 (free tier) | 10GB storage, zero egress fees. Serves mp3s to a custom player with full design control. |
| Audio player | Lightweight custom component (~50–100 lines JS) | Styled to match design system. No library dependency. Wraps native Audio API. |
| Build step | None | `git push` deploys. No npm, no Node, no CI pipeline to maintain. |
| Contact form | Removed (mailto link) | Lower friction on mobile. Eliminates Web3Forms dependency and exposed API key. |

---

## 1. Framework: Plain HTML / CSS / JS

### What This Means

The site is a single `index.html` file, one or more `.css` files, and a small `.js` file for the audio player and any micro-interactions. No transpilation, no bundling, no package.json, no node_modules.

### Why Not a Static Site Generator

The standard argument for a generator (Astro, Hugo, 11ty) is authoring convenience: write content in markdown, let the tool build the HTML. But Clay's update pattern is "add one project card every few months." That task is a copy-paste of an HTML block with field changes — roughly the same effort as editing a YAML file. The convenience delta does not justify the maintenance cost.

The maintenance cost is real: Node version drift, dependency deprecation, breaking changes in plugins. A site that isn't touched for 6 months accumulates ecosystem entropy. Plain HTML has no entropy. The file Clay edited in 2026 works identically in 2031.

### Why Not a JS Framework (React, Vue, Svelte)

A single-page portfolio with no dynamic data, no user authentication, no state management, and no interactivity beyond an audio player does not benefit from a component framework. These tools solve problems this site does not have, and they ship JavaScript the visitor does not need.

---

## 2. Hosting: Cloudflare Pages

### Current State

- Site: GitHub Pages, served from `celscoring/portfolio` repo
- Domain: `claylewismusic.com` with CNAME pointing to GitHub Pages

### Target State

- Site: Cloudflare Pages, connected to same GitHub repo
- Audio: Cloudflare R2, same Cloudflare account
- Domain: `claylewismusic.com` with DNS managed by Cloudflare

### Migration Plan

**Step 1 — Set up Cloudflare account.** Create account (free). Add `claylewismusic.com` as a site. Cloudflare will prompt to change the domain's nameservers to Cloudflare's — this moves DNS management to Cloudflare. Do this first; propagation takes up to 24 hours but the existing GitHub Pages CNAME record carries over during migration.

**Step 2 — Create Cloudflare Pages project.** Connect to the `celscoring/portfolio` GitHub repo. Set the build output directory to `/` (or wherever the root HTML lives — no build command needed). Cloudflare assigns a `*.pages.dev` preview URL immediately. Verify the site works at that URL.

**Step 3 — Set up R2 bucket.** Create an R2 bucket (e.g., `clay-media`). Upload mp3 files. Configure a custom domain or public access URL for the bucket. Note the base URL for use in the audio player (e.g., `https://media.claylewismusic.com/` or the default R2 URL).

**Step 4 — Point domain to Cloudflare Pages.** In Cloudflare DNS, add a CNAME record for `claylewismusic.com` pointing to the Pages deployment. Remove the old GitHub Pages CNAME. SSL is automatic.

**Step 5 — Disable GitHub Pages.** In the repo settings, turn off GitHub Pages to avoid confusion. The repo remains on GitHub — only the hosting moves.

**Rollback:** If anything breaks, re-enable GitHub Pages and point DNS back. The old site is still in the repo, unchanged.

---

## 3. Media Strategy

### Video: Vimeo Embeds

All scored-to-picture work is hosted on Vimeo and embedded via `<iframe>`. Vimeo handles adaptive bitrate streaming, mobile optimization, and transcoding.

**Why Vimeo over YouTube:** YouTube injects competitor recommendations and branding at the end of playback. On a portfolio where the conversion is "watch one piece and feel something," this is unacceptable. Vimeo's embed chrome is minimal and configurable.

**Why Vimeo over self-hosted (R2):** Self-hosted mp4 serves a single file at a single bitrate. On a phone over cellular (the primary scenario), this means either buffering or serving a low-quality encode to everyone. Vimeo adapts automatically.

**Vimeo tier:** Free tier is sufficient for current inventory (4–6 clips). If Clay exceeds the free upload limits later, the Starter tier ($12/mo) is the upgrade path.

**Embed parameters:** Use Vimeo's embed options to disable branding, hide title overlay, and prevent autoplay. Exact parameters to be defined in Session 3 (design system).

### Audio: Cloudflare R2 + Custom Player

Standalone compositions are served as mp3 files from Cloudflare R2. The site includes a custom audio player component (see Section 5) that loads files on user interaction (not on page load).

**File preparation:** Each composition should be exported as a single mp3 file at 192kbps or 256kbps. No wav files in the hosting pipeline — wav is for archival, not web delivery.

**R2 bucket structure:**

```
clay-media/
  audio/
    alas-sanctuary.mp3
    [composition-2].mp3
    [composition-3].mp3
    [composition-4].mp3
```

**R2 free tier limits:** 10GB storage, 10 million Class B (read) requests/month, no egress fees. A portfolio with 4 mp3s at ~5MB each uses ~20MB of storage. This is nowhere near the limits.

### What Leaves the Git Repo

All binary media files are removed from the repo:
- `/assets/audio/*.mp3` — moved to R2
- `/assets/audio/*.wav` — archived locally, not re-uploaded anywhere
- `/assets/video/*.mp4` — replaced by Vimeo embeds
- Template placeholder images — deleted

The repo should contain only source code (HTML, CSS, JS), actual site images (favicon, OG image, any photos used in design), and documentation.

**Git history note:** Removing files from the repo does not remove them from git history. The 73MB of binary blobs remain in the history forever. Options: (a) accept this and move on — the repo works fine, it's just a larger clone; (b) do a one-time `git filter-repo` to rewrite history and force-push. Option (b) is cleaner but requires coordinating with anyone who has a local clone. Recommend option (a) unless the repo size becomes a practical problem.

---

## 4. Content Authoring Workflow

### Adding a New Film/Scoring Project

1. Upload the scored clip to Vimeo. Copy the embed URL.
2. Open `index.html`.
3. Copy an existing project block in the Work section.
4. Replace the fields: Vimeo embed URL, project title, type, director, role, year, description.
5. Reorder if needed (best work first).
6. `git add . && git commit -m "Add [project name]" && git push`
7. Cloudflare Pages auto-deploys in ~30 seconds.

### Adding a New Standalone Composition

1. Export the track as mp3 (192–256kbps).
2. Upload to the R2 bucket via Cloudflare dashboard (drag and drop).
3. Open `index.html`.
4. Copy an existing composition block in the Compositions section.
5. Replace the fields: audio file URL, title, instrumentation, description.
6. `git push`.

### Updating the Bio

1. Open `index.html`.
2. Edit the text in the About section.
3. `git push`.

### Estimated Time Per Update

Adding a project: ~10 minutes (most of that is uploading to Vimeo and writing the metadata). This is comparable to or faster than a markdown + build-step workflow, with the advantage of seeing exactly what will render.

---

## 5. Dependency Inventory

### Runtime Dependencies (shipped to the visitor)

| Dependency | Size | Purpose |
|---|---|---|
| None | 0 KB | — |

There are no external JS libraries. The audio player is a hand-written component (~50–100 lines) using the native Web Audio API / HTMLAudioElement. All animations use CSS transitions, animations, or scroll-driven animations (native browser features).

### Third-Party Embeds

| Service | Purpose | Loaded |
|---|---|---|
| Vimeo `<iframe>` | Video playback for film projects | On user interaction or when scrolled into view (lazy) |

Vimeo iframes should use `loading="lazy"` to avoid loading offscreen embeds on initial page load.

### Development Dependencies

| Dependency | Purpose |
|---|---|
| None | — |

No build tools, no linters, no formatters, no package manager. If Clay or Cole want to add a dev tool later (e.g., Prettier for formatting HTML), they can, but it's optional and not part of the deployment pipeline.

---

## 6. Skeleton Repo Structure

```
claylewismusic.com/
│
├── index.html              # Single-page site
├── css/
│   ├── reset.css           # Minimal CSS reset
│   └── style.css           # All site styles
├── js/
│   └── main.js             # Audio player + micro-interactions
├── assets/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── og-image.jpg        # Social sharing preview image (1200×630)
│   └── [any images used in design, if applicable]
├── CNAME                   # Domain config (may not be needed with Cloudflare DNS)
├── README.md               # Repo documentation
├── CONTENT.md              # Content spec (Session 1)
└── TECH_STACK.md           # This document (Session 2)
```

**What's not here:**
- No `package.json`
- No `node_modules/`
- No `dist/` or `build/` directory
- No `.github/workflows/` (no CI needed)
- No audio or video files

---

## 7. Performance & SEO Baseline

These are implementation requirements, not design decisions. They address the technical debt items from the current site.

### Meta Tags & Social Sharing

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Clay Lewis — Film & Media Composer. USC Screen Scoring MFA.">
<meta property="og:title" content="Clay Lewis — Film & Media Composer">
<meta property="og:description" content="Portfolio of scored-to-picture and standalone compositions.">
<meta property="og:image" content="/assets/og-image.jpg">
<meta property="og:url" content="https://claylewismusic.com">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

### Favicon

Provide at minimum:
- `favicon.ico` (legacy browsers)
- `favicon.svg` (modern browsers, supports dark mode adaptation)
- `apple-touch-icon.png` (iOS home screen)

### Analytics

Cloudflare Pages includes free, privacy-respecting analytics (Cloudflare Web Analytics) — no cookie banner required, no third-party script to load. Enabled in the Cloudflare dashboard, not in the site code. This replaces the need for Google Analytics.

### Performance Targets

| Metric | Target |
|---|---|
| First Contentful Paint | < 1.0s |
| Largest Contentful Paint | < 2.0s |
| Total page weight (before embeds) | < 200 KB |
| JavaScript payload | < 5 KB |
| External library dependencies | 0 |

These targets are easily achievable with the chosen stack. The Vimeo embeds will add weight, but only when loaded (lazy loading defers this until the user scrolls to them).

---

## 8. Open Items for Session 3 (Design System)

The following decisions carry forward:

1. **Audio player design** — The custom player needs visual design. This is a CSS/design question, not a technology question. Consider: progress bar style, play/pause button, track metadata display, whether to include a time display.
2. **Vimeo embed styling** — Aspect ratio containers, spacing, any overlay or frame treatment.
3. **Scroll behavior** — CSS scroll-driven animations can replace ScrollReveal with zero JS. Define which elements animate and how.
4. **Typography and color** — The entire visual identity. This is where "beautiful" lives.
5. **Dark vs. light theme** — Current site is dark. This is a design decision, not a tech constraint.
6. **Responsive breakpoints** — The "phone in an Uber" scenario is the primary target. Design mobile-first.
7. **OG image design** — The social sharing preview image when someone texts the link.

---

## Decisions Log

| # | Decision | Status |
|---|---|---|
| 1 | Update cadence: portfolio-event-driven (~2–4x/year) | Locked |
| 2 | Clay's technical capability: CS minor at MIT, comfortable with CLI/build tools | Locked |
| 3 | Framework: plain HTML/CSS/JS, no build step | Locked |
| 4 | Video hosting: Vimeo embeds | Locked |
| 5 | Audio hosting: Cloudflare R2 (free tier) | Locked |
| 6 | Audio player: custom lightweight component, no library | Locked |
| 7 | Hosting: Cloudflare Pages (free tier) | Locked |
| 8 | Contact: mailto link, no form | Locked |
| 9 | Carry-forward from current site: nothing — clean slate | Locked |
| 10 | Analytics: Cloudflare Web Analytics (free, no cookie banner) | Locked |

---
