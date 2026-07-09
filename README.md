# claylewismusic.com

Single-page portfolio for Clay Lewis — Film & Media Composer (USC Screen Scoring MFA).

Plain HTML / CSS / JS. No framework, no build step, no dependencies. `git push` deploys (Cloudflare Pages).

## Structure

```
index.html          The whole site (all content lives here)
css/reset.css       Minimal reset
css/style.css       All styles (design tokens at the top)
js/main.js          Audio player, video facades, scroll-spy, reveal animations
assets/
  studio-hero.jpg   Hero image (web-optimized copy of studio.jpg)
  headshot-web.jpg  About photo (web-optimized copy of headshot.jpg)
  audio/*.mp3       Compositions (web copies, lowercase-hyphenated names)
  favicon.svg/.ico, apple-touch-icon.png, og-image.jpg
uploads/            Project specs (CONTENT.md, DESIGN.md, etc.) — not served
```

## How to edit content

Every editable region in `index.html` is marked with an `EDIT HERE` comment banner.

**Add a film/scoring project:** upload the clip to Vimeo (allow embedding in the video's privacy settings) → copy an existing `<article class="project">` block in the Work section → change `data-vimeo-id`, `data-title`, the `aria-label`, the title, and the metadata line. Best work first.

**Swap the featured piece:** in the Featured section, change the Vimeo ID in the iframe `src`, the iframe `title`, and the title/metadata below it.

**Add a composition:** export mp3 (192–256 kbps), drop it in `assets/audio/` with a lowercase-hyphenated name → copy a `.track` block in the Compositions section → change `data-src`, `data-duration` (seconds), the two `aria-label`s, title, label line, and the visible duration text.

**Update the bio / contact:** edit the text in the About / Contact sections directly.

Then: `git add -A && git commit -m "..." && git push` — Cloudflare Pages deploys in ~30s.

## Outstanding TODOs (content)

- [ ] **Project metadata is placeholder** — every `Dir. [Director]` and `[Year]` needs real values (Featured + all three Work projects).
- [ ] **Oryctes Rescore (Vimeo 1208304263) has embedding disabled** — in Vimeo: video → Privacy → "Where can this be embedded?" → allow claylewismusic.com (or anywhere). The card is already wired and will work as soon as this is flipped.
- [ ] **Composition labels are genre tags** carried over from the old site ("Action, Fantasy" etc.) — replace with instrumentation ("for string quartet") when ready.
- [ ] **Confirm track mapping:** `love.mp3` was assumed to be "Reminiscing in F" (the one live-site title with no matching filename). If wrong, fix the title in `index.html` and/or the file in `assets/audio/`.
- [ ] **studio.jpg is mirrored** (Focusrite logo reads backwards) — kept as-is by request.

## Media notes

- **Video:** Vimeo embeds. The featured piece loads eagerly; the Work cards are facades — Vimeo's iframe/JS loads only when clicked.
- **Audio:** served from `assets/audio/` for now. The spec's target is Cloudflare R2 (`clay-media/audio/`) — when migrating, upload the mp3s and change the four `data-src` values to the R2 URLs. The `.wav` files and original loose `.mp3`s in `assets/` are archival and should not be deployed/committed (add to `.gitignore` when the repo is set up).
- **Images:** `studio.jpg` / `headshot.jpg` are originals; the site references the `-hero`/`-web` optimized copies.

## Legacy files

`Clay Lewis Portfolio v2.dc.html` + `support.js` are the original design-component mockup this site was built from. Reference only — safe to delete once the site is live.
