# claylewismusic.com — Content Specification

**Session 1 of 3: Content & Information Architecture**
**Date:** July 6, 2026
**Prepared by:** Cole Lewis (for Clay Lewis)

---

## Primary User & Scenario

A film director meets Clay at a USC event, pulls up the site on their phone in the Uber five minutes later, and spends 60–90 seconds deciding whether to bookmark or forget. The entire site is optimized for this moment.

## Target Impression (90 seconds)

The director should leave feeling:

- **Impressed** — the work is good enough to take seriously.
- **Trusting** — Clay is credentialed, trained, and operates at a professional level.
- **Inspired** — "I can see how this person could fit with my project."

These impressions are served through **range and craft quality** rather than a singular artistic identity. Clay does not yet have a signature sound, so the site proves competence across genres — with each piece strong enough to own its lane.

## Strategic Principles

1. **Film work leads.** It proves the thing directors hire for: writing to picture, serving a story, responding to scene constraints. Standalone compositions are secondary.
2. **Projects are the unit.** Work is organized by project, not by medium. The music *is* the video — splitting them into separate audio/video sections strips context.
3. **Context builds credibility.** Every piece of work carries project metadata (title, role, director, project type). An anonymous genre label ("Action, Fantasy") wastes credibility that real project attribution would provide.
4. **Credentials hit fast.** Institutional credentialing (USC, MIT, awards) is real and valuable, but must land visually in seconds — not require parsing two paragraphs.
5. **The real conversion is watching a piece.** If the director watches one scored clip all the way through and feels something, they'll find a way to reach Clay. Everything else is subordinate to that.

## Site Format

**Single-page scroll.** Rationale:

- Small portfolio inventory does not justify multi-page navigation.
- The phone scenario is pure vertical scroll — every added click is a decision point where the director can bounce.
- One continuous page lets the hierarchy do its work: best piece first, then more work, then bio, then contact. The director just keeps thumbing down.

## Section Architecture

The page flows top to bottom in this order:

### 1. Hero — Studio Portrait + Identity

**What it is:** Clay's studio photo (at the mixing console) paired with his name and a one-line credential. This is the first thing the director sees — an atmospheric image that communicates "this person works in professional studios" before any music plays.

**Content inventory:**

- Studio photo (Clay at the mixing console — high-resolution version required)
- Clay's name
- One-line identifier (e.g., "Film & Media Composer · USC Screen Scoring MFA")

**Rationale:** An unplayed Vimeo embed is just a rectangle with a play button — it doesn't earn attention on its own. The studio photo communicates legitimacy and professionalism immediately: real equipment, real environment, real work. It earns the click on the video below. The warm amber lighting of the studio environment reinforces the site's visual palette.

**Key constraint:** The hero must not consume the entire phone viewport. The director should see Clay's name, the studio image, and a hint that there's more content below — all without scrolling.

### 2. Featured Piece

**What it is:** Clay's single strongest scored-to-picture work, embedded from Vimeo and immediately playable. This is the first content the director scrolls to — one thumb-scroll below the hero.

**Content inventory:**

- Video embed (Vimeo) — the featured scored piece
- Project metadata below the embed: title, type, director, Clay's role, year

**Rationale:** The studio photo in the hero earns the director's attention; the featured piece is where that attention converts. Placing it immediately below the hero — not buried in the Work section — preserves the original priority: get the director to the best work as fast as possible.

**Open question for Clay:** Which piece is the strongest lead? Candidates from the current site: Harmony Rescore, Oryctes Rescore, A Second of Sight, MIT Compass Course doc. Clay should choose the piece he'd most want a director to judge him by.

### 3. Work — Film & Scoring Projects

**What it is:** Additional scored-to-picture projects, each presented as a unit with full context.

**Content inventory per project:**

- Video embed (the scored scene or clip)
- Project title
- Project type (rescore, student film, documentary, etc.)
- Director or collaborator name(s)
- Clay's role (composer, additional music, orchestrator, etc.)
- Year
- One-line description (optional — only if it adds context the title doesn't provide)

**Organization:** Not by genre. Ordered by strength/impact — best remaining pieces first. If the inventory grows large enough to need grouping in the future, project type (narrative film, documentary, rescore) is the natural axis. But at current scale, a flat ordered list is correct.

**Current inventory (pending Clay's review):**

| Piece | Type | Notes |
|---|---|---|
| Harmony Rescore | Rescore | One of these becomes the Featured Piece (Section 2); rest go here |
| Oryctes Rescore | Rescore | |
| A Second of Sight | Student film | |
| MIT Compass Course | Documentary | |

### 4. Compositions — Standalone Music

**What it is:** Audio-only works that demonstrate musicianship and range but were not scored to picture.

**Content inventory per piece:**

- Audio player (embedded, inline)
- Composition title
- Instrumentation or ensemble (e.g., "for string quartet," "orchestral")
- One-line description (optional — Clay can add when ready; not a launch blocker)

**Rationale for keeping this section:** The compositions show breadth and musical craft. A director who's already been impressed by the film work may scroll here and get a fuller sense of Clay's range. But this section is explicitly secondary — it sits below the film work, and no composition should appear above a scored-to-picture piece.

**Current inventory (pending Clay's review):**

| Track | Current Label |
|---|---|
| Alas... Sanctuary | Action, Fantasy |
| (remaining 3 tracks) | Various genre labels |

### 5. About — Bio

**What it is:** Short first-person bio that tells the director who Clay is, signals credentialing quickly, and sounds like a person rather than a fellowship application.

**Content inventory:**

- First-person prose, 3–5 sentences
- Key credentials woven into the narrative, not listed:
  - USC Screen Scoring MFA (current program)
  - MIT background
  - Notable mentors (Ruehr, Shadle, Ziporyn) — include only if recognizable to likely audience, otherwise drop or reference obliquely ("studied under film and concert composers at MIT")
  - Awards (Wiesner, Naess, Warren Prize) — can be named but shouldn't require the reader to know what they are
  - The Last Mile internship
  - Log Log Land (if relevant to the director audience)
- Optional: a brief line about what kind of projects Clay is looking for, or what draws him to scoring. This is the one place where a hint of artistic identity — even without a "signature sound" — can come through.

**Register:** Warm, professional, first person. The tone of someone you'd want to grab coffee with, not a grant application.

**Open question for Clay:** Review current bio for temporal accuracy. The current version refers to USC in future tense — this may already be stale.

### 6. Contact

**What it is:** The simplest possible way to get in touch.

**Content inventory:**

- Email link (mailto: — not a contact form). On mobile, one tap opens the mail app. A Web3Forms form is friction.
- Location (Philly/LA or wherever is current)
- Social links: YouTube, Instagram, LinkedIn (keep current set; drop any that are inactive)

**What's excluded:**

- No contact form. A mailto link is faster on mobile and more reliable.
- No downloadable resume. This is a creative portfolio, not a job application.
- No downloadable tracks. The director isn't building a music library.
- No showreel link (for now). Clay doesn't have a compiled reel. If he builds one later, it could replace the Featured Piece (Section 2) or sit alongside it.

## Primary User Journey

```
LAND → see Clay's name + "USC Screen Scoring MFA" + studio photo (Hero)
     → scroll → play the best scored-to-picture piece (Featured Piece)
     → scroll → more film projects with full context (Work)
     → scroll → standalone compositions (Compositions)
     → scroll → short human bio with credentials (About)
     → scroll → email link + socials (Contact)
```

The journey is a single downward scroll. The director can bail at any point and still have received the most important content, because it's ordered by priority. The studio photo earns the first scroll; the featured piece earns the rest.

## What Changed from the Current Site

| Current | New | Rationale |
|---|---|---|
| Hero photo of Clay at mixing console (template stock-photo feel) | Studio photo (Clay at the console) + name + credential, with featured video immediately below | The studio photo stays but with intentional design treatment. It earns the director's attention; the featured video immediately below converts it. |
| Listen section (audio player, 4 tracks) | Compositions section (demoted below film work) | Standalone compositions are secondary to scored-to-picture work. |
| Watch section (video carousel) | Work section (flat project list with metadata) | Each project is a unit with full context, not a slide in a carousel. |
| Listen and Watch as separate sections by medium | Work and Compositions as separate sections by type | The organizing axis is project type (film vs. standalone), not medium (audio vs. video). |
| About in third person, fellowship register | About in first person, warm professional tone | Directors are meeting a person, not reading an application. |
| Web3Forms contact form | Mailto link | Lower friction on mobile; one tap vs. filling fields. |
| No CTA above the fold | Studio photo hero earns the scroll; featured piece one scroll below is the CTA | The studio photo earns attention, the featured video converts it. Watching the work *is* the conversion. |
| Genre-only labels on tracks | Full project metadata | Project name, director, type, year — context builds credibility. |

## Open Items for Clay

1. **Select the featured piece.** Which single scored-to-picture work is strongest? This appears immediately below the hero and is the most important content decision for the site.
1. **Provide high-resolution studio photo.** The mixing console shot is the hero image. Must be at least 1600px wide and high enough quality for retina displays.
2. **Provide project metadata.** For each film/video piece: project title, type, director, year, Clay's role.
3. **Review composition titles.** Current genre labels are insufficient. At minimum: proper title and instrumentation.
4. **Rewrite bio in first person.** 3–5 sentences, warm professional tone. Check temporal accuracy (USC tense).
5. **Confirm contact info.** Current location, preferred email, which social links are active.

---
