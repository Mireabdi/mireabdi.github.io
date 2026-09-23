# Visual Style Guide

Reference for building out the 4-page site (Home, Projects, About, Resume/Contact) against
the existing single-page identity. This document is a **refinement and extension** of what's
already in `style.css` and `index.html`, not a new design system. When in doubt, reuse an
existing pattern rather than inventing a new one — see Guardrails at the bottom.

Status: approved by site owner. Build against this document.

---

## 1. Design tokens

### 1.1 Existing tokens (unchanged — carry forward as-is)

Defined in `:root` and `:root[data-theme="dark"]`:

| Token | Light | Dark | Use |
|---|---|---|---|
| `--ink` | `#14171c` | `#e7e9ec` | Primary text |
| `--paper` | `#f1f2f4` | `#15181d` | Page background |
| `--slate` | `#5b6572` | `#8a93a1` | Secondary text, labels, meta |
| `--signal` | `#2f6f6b` | `#5fc4bd` | Accent (links, focus, hover) — intentionally lighter in dark mode for contrast |
| `--signal-solid` | `#2f6f6b` | `#2f6f6b` | Solid accent fills (primary button bg) — stays the same value in both modes |
| `--signal-tint` | `rgba(47,111,107,.08)` | `rgba(95,196,189,.1)` | Hover backgrounds (row-link hover) |
| `--status-ok` | `#3f8f5f` | `#4ecb82` | "Open to work" dot, "Resolved" status |
| `--rule` | `rgba(20,23,28,.13)` | `rgba(255,255,255,.12)` | All hairline borders |
| `--max-width` | `760px` | — | Reading-width container (Home, About, Resume prose) |

Do not add new hues. Every new token below is either a derived neutral or a layout value.

### 1.2 New tokens

```css
:root {
  --surface: color-mix(in srgb, var(--ink) 3%, var(--paper));
  --max-width-wide: 1000px;
}

:root[data-theme="dark"] {
  --surface: color-mix(in srgb, var(--ink) 6%, var(--paper));
}
```

- **`--surface`** — a barely-there tint, one step off the page background. Used only where a
  listing needs a container distinct from the page (Projects page, once there are more than
  ~5 entries). It is a **border-only** distinction — never paired with `box-shadow`. If a
  section reads fine directly on `--paper` with just a `--rule` border, don't reach for
  `--surface`.
- **`--max-width-wide`** (~1000px) — used **only** on the Projects page wrapper, and only if
  the entry count justifies a two-column layout at wide viewports. Home, About, and
  Resume/Contact keep `--max-width` (760px) for their prose-driven content. This is a
  deliberate, scoped exception, not a general upgrade to the grid.

---

## 2. Typography scale

Font stack is unchanged: **IBM Plex Sans** for prose, **IBM Plex Mono** for UI chrome and
structured metadata (`.mono`, `.logo`, `.section-label`, `dt` terms, `.row-tags`, `.row-key`,
`.status-value`, `.nav-links a`, `.btn`).

| Role | Spec | Where |
|---|---|---|
| Display H1 | `clamp(2rem, 5vw, 2.6rem)`, weight 700, `-0.01em` | **Home hero only.** Not reused on inner pages. |
| Page heading (inner-page H1) | `clamp(1.6rem, 4vw, 2rem)`, weight 700, `-0.01em` | Top of Projects / About / Resume. Deliberately smaller than the Home display size so inner pages read as "inner pages," not repeated landing pages. |
| Section label (kicker) | `0.85rem`, weight 500, `var(--slate)`, mono, lowercase | Existing `.section-label` pattern (`about`, `projects`, `skills`) — the standard section-divider convention, reused on every page. |
| Body | `1rem` / line-height `1.65`, Plex Sans | All prose paragraphs. |
| Meta / small | `0.78–0.92rem`, `var(--slate)`, mono where it's a label/value pair | `dt`/`dd` pairs, tags, nav links, row descriptions. |

**Hard rule:** mono is never used for paragraph-length text, on any page. A resume entry's
job title and date range may be mono (they're a structured label), but its description
sentence is always Plex Sans. This split is the core of the visual identity — mono signals
"structured record," sans signals "human narrative" — and it must hold everywhere, including
new pages.

---

## 3. Spacing / layout

- Section rhythm is unchanged: `.section` = top border (`--rule`) + vertical padding
  (`3–4rem`), stacked. Every page uses this same rhythm so all 4 pages read as chapters of one
  document, not four different templates.
- Containers: `.wrap` (760px, existing) stays the default for Home, About, Resume/Contact.
  A second wrapper class, e.g. `.wrap-wide` (1000px, using `--max-width-wide`), is added only
  for the Projects page's own wrapper — not global.
- Nav becomes real multi-page links (`index.html`, `projects.html`, `about.html`,
  `resume.html`) instead of in-page anchors. Visual treatment is unchanged; the *current* page
  link gets the same styling currently applied to `:hover` (teal underline, `--ink` color)
  applied persistently, plus `aria-current="page"`. Four links wrap fine at all widths already
  — no hamburger menu needed.
- Mobile-first breakpoint stays `640px` (existing `@media (max-width: 640px)` block). Any new
  grid (Projects wide layout) collapses to single column at this same breakpoint, consistent
  with how `.info-row` / `.spec-row` already collapse.

---

## 4. Components

### 4.1 Existing components (reused, not rebuilt)

- `.info-panel` / `.info-row` — label/value `dl` grid, used on Home hero.
- `.spec-list` / `.spec-row` — wider label column `dl` grid, used for Skills.
- `.row-list` / `.row-link` — flex rows with hover tint, used for Projects and Contact.
- `.btn-primary` / `.btn-secondary` — solid teal / outlined-ink buttons.
- Status dot (`.status-dot`, pulsing) tied to `--status-ok`.
- Sticky blurred header, circular theme toggle — unchanged, applies to all pages identically.

### 4.2 New: Project case-study entry (Projects page)

Extends `.row-list` — **not** a new card component, no grid, no shadows. Each entry gets one
additional mono metadata line above the existing title/description/tags, styled like a
helpdesk ticket record:

```
Case 01 · Status: Resolved · Stack: Windows 11, DNS
Workstation Setup
Windows 11 Pro install, hardening, user accounts, and a DNS troubleshooting case.
[Windows 11] [VMware] [DNS]
```

- The metadata line is mono, `var(--slate)`, small (`~0.75rem`), matching `.row-tags` sizing.
- "Status: Resolved" reuses `--status-ok` with the same small dot used for "Open to work" on
  Home — a controlled reuse of an existing token/motif, not a new indicator style.
- This is the single most important differentiator in the whole system: it reframes each
  project as a ticket record rather than a dev-portfolio "tech stack badge" card, which reads
  immediately to a non-technical hiring manager and cannot be mistaken for a generic template.
- Stays a flat row list at all viewport widths. If entry count grows, add rows, not a grid.

### 4.3 New: Resume timeline entry (Resume/Contact page)

Extends `.spec-row` (`dl` grid: label column / value column), stacked chronologically instead
of as independent rows:

```
dt: 2023 — present     dd: Haaga-Helia UAS — BBA, Business Information Technology
dt: 2019 — 2023        dd: [Employer] — Customer Service Representative
```

- Label column (`dt`): mono date range, same sizing as existing `.spec-row dt`.
- Value column (`dd`): role/organization in Plex Sans (org/title can be `font-weight: 600`
  for scannability), description sentence below it in regular-weight Plex Sans — never mono.
- Entries are connected by a single thin `--rule` vertical line down the label column (a
  `border-left` on the row or a pseudo-element), suggesting a timeline without introducing
  icons, dots, or decorative markers. No new visual language — just a border, like everything
  else in the system.

**Skills block on Resume/Contact:** per task-lead's page-structure decision, the consolidated
Skills list lives on `resume.html` only (not About). It reuses `.spec-list`/`.spec-row`
exactly as it exists today (label column = category, e.g. "Platforms"; value column =
comma-separated items) — it does **not** need the timeline treatment, since skills aren't
chronological. Place it as its own `.section` on the Resume page, using the standard
`.section-label` kicker (e.g. `skills`), separate from the timeline section (e.g.
`experience` / `education`). Both sections on that page share the same `dl` grammar
(`.spec-row`), just with different content shapes (timeline vs. flat list) — no separate
component is needed for "skills" versus "experience," only a different use of the same rows.

### 4.4 New: Page kicker convention

Each inner page (Projects / About / Resume) opens with a `.section-label`-styled line before
its page heading, optionally formatted as a prompt to tie back to the logo's terminal identity
(`mire@it-support`):

```
mire@it-support:~/projects$
```

- Use this **once per page**, at the top only. It is a signature detail, not a UI pattern to
  repeat throughout the page.
- Do not extend this into full terminal-window chrome (no window title bars, no blinking
  cursor, no ASCII borders). One line, mono, `var(--slate)`, done.

### 4.5 New: Home "why hire me" proof strip

A short highlight strip on Home, above or below the hero `.info-panel`. Reuses the
`.info-panel`/`.spec-row` grammar (label/value `dl` pairs, hairline top/bottom borders) rather
than introducing a stat-card or icon-grid component. Suggested shape: 3–4 short label/value
pairs (e.g. `Hands-on labs` → `4 documented environments`, `Background` → `5 yrs customer
service`, `Status` → reuse the existing status dot pattern) laid out the same way
`.info-row` already is. No icons, no colored stat tiles, no counters/animation — same flat
`dl`-row treatment as everything else, just shorter and positioned as a scannable strip.
Exact copy/count of items is content, not layout — task-lead owns that; this section only
needs to reuse the existing grammar and sit inside the standard `--max-width` (760px)
container like the rest of Home.

---

## 5. Explicit guardrails

These are constraints, not suggestions — they're what keeps the site from drifting toward a
generic AI-template look or a flashy dev-portfolio look as it grows to 4 pages.

1. **No gradients, no box-shadows, no card grids.** The entire design is flat and
   hairline-bordered (`--rule`). Every new component above extends `dl`/flex row patterns
   already in `style.css`. If a new page's content seems to need a shadowed card or a grid of
   icon tiles to look "finished," that's a signal to go back to a row-based layout instead —
   not to add shadows/cards.
2. **Mono is never used for paragraph-length text**, on any page. Mono is for labels, dates,
   tags, nav, buttons, and other structured/short values only.
3. **The terminal/ticket motif stays accent-only.** One page-kicker line per inner page, one
   ticket-metadata line per project entry — never a full fake-terminal window, ASCII art
   border, or blinking cursor. Overusing this motif turns a credible, restrained identity into
   a gimmick, which works against the hiring-manager audience this site is built for.
4. **One accent color.** Continue using `--signal` (teal) as the only accent, plus
   `--status-ok` (green) strictly for "resolved/complete/open" status indicators. No
   additional colors, no color-coded tag chips.
5. **Reuse before inventing.** `.info-panel`, `.spec-list`, and `.row-list` are the three
   layout primitives for the whole site. Every new page's content should map onto one of
   these three before a new component is considered. This is what makes 4 pages read as one
   deliberate system instead of four separately templated pages.
6. **`--surface` and `--max-width-wide` are scoped, not global.** `--surface` only applies
   where a listing needs to be visually distinguished from the page background (Projects, if
   needed) — it is never a general "card background" token. `--max-width-wide` only applies to
   the Projects page wrapper — Home, About, and Resume/Contact keep the 760px reading width.
