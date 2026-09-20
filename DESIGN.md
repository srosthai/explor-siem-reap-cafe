---
name: Siem Reap Cafes
description: A warm, editorial café directory for Siem Reap digital nomads — real Wi-Fi speeds, honest prices, zero sponsorship.
colors:
  paper: "#f7f1e1"
  paper-soft: "#efe6cd"
  ink: "#1c2a20"
  ink-soft: "#263a2c"
  palm: "#2f6f52"
  palm-deep: "#1e4a38"
  palm-soft: "#e3ecdf"
  clay: "#bd5f2c"
  clay-soft: "#f5e2d1"
  gold: "#b8862f"
  gold-soft: "#f2e6c9"
typography:
  display:
    fontFamily: "var(--font-fraunces), Georgia, serif"
    fontSize: "clamp(1.875rem, 5vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "var(--font-manrope), system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-manrope), system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  sm: "8px"
  md: "12px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.palm}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.palm-deep}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  badge-area:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.md}"
---

# Design System: Siem Reap Cafes

## Overview

**Creative North Star: "The Jungle Ledger"**

This is a field notebook, not an ad. The system reads like a traveler's honest ledger of what they found: sun-bleached rice-paper backgrounds, deep palm-shadow ink for text and dark mode, and an earthy three-color accent trio (jungle-canopy green, terracotta roof-tile, marigold offering-flower gold) that stands in for real observations rather than decoration. Fraunces serif display type gives it a warm, slightly literary voice for headlines; Manrope carries the workmanlike UI and body copy. A near-invisible grain texture sits over the whole page, reinforcing the "printed, not rendered" feel.

Depth comes from quiet borders and a soft lift on hover, never from heavy drop shadows — the directory should feel calm and legible at a glance, the way a well-kept notebook page does, not like a marketing site competing for attention. Color is used sparingly and functionally: palm green means "open" or "fast Wi-Fi," clay means price/trending/weak-signal, gold means a middling or rated signal. Nothing is decorative-only.

**Key Characteristics:**
- Warm, paper-toned neutrals (paper/ink) instead of pure white/black
- Serif display (Fraunces) + workmanlike sans body (Manrope)
- Borders and subtle lift over drop shadows; a fixed grain overlay for texture
- A functional, restrained 3-accent palette (palm/clay/gold) tied to meaning, not mood
- Full-radius pill chrome for nav, badges, and filters; 12px rounded-xl for cards and inputs

## Colors

An earthy, editorial palette: warm paper neutrals carry the page, a single jungle-green accent carries action and "good" states, and two secondary earth tones (clay, gold) carry specific data meanings rather than general decoration.

### Primary
- **Palm** (`#2f6f52`): Primary accent — links, CTAs, active nav pill, "Open now" status, fast/insane Wi-Fi readings. Deepens to **Palm Deep** (`#1e4a38`) on hover/press. **Palm Soft** (`#e3ecdf`) is its tint, used as a badge/pill background behind the palm text.

### Secondary
- **Clay** (`#bd5f2c`), terracotta roof-tile: price emphasis, the "Trending" badge, and the "Slow" Wi-Fi signal. **Clay Soft** (`#f5e2d1`) is its badge-background tint.

### Tertiary
- **Gold** (`#b8862f`), marigold offering-flower: "OK" Wi-Fi signal and rating/star contexts. **Gold Soft** (`#f2e6c9`) is its badge-background tint.

### Neutral
- **Paper** (`#f7f1e1`): sun-bleached rice-paper — the default light-mode page and card background.
- **Paper Soft** (`#efe6cd`): a slightly deeper paper tone for skeleton loading states and subtle surface separation.
- **Ink** (`#1c2a20`): deep palm-shadow near-black — primary text color in light mode, and the page background in dark mode.
- **Ink Soft** (`#263a2c`): dark-mode card/surface background, one step lighter than Ink.

### Named Rules
**The Meaning-Not-Mood Rule.** Palm, clay, and gold are never used as arbitrary decoration — each is tied to a specific signal (open/fast, price/trending/slow, ok-rated). If a new UI element needs a color and it isn't one of these three meanings, it stays neutral (ink/paper at reduced opacity).

## Typography

**Display Font:** Fraunces (optical sizing auto, SOFT axis), with Georgia serif fallback
**Body Font:** Manrope, with system-ui sans fallback

**Character:** A literary serif for headlines against a clean, workmanlike sans for everything functional — the pairing reads as "a well-written guidebook," not a tech product.

### Hierarchy
- **Display** (400 weight, `clamp(1.875rem, 5vw, 3.75rem)`, 1.08–1.15 line-height): Page and section H1s (`.font-display`); always Fraunces, applied via the `font-display` utility class.
- **Title** (600 weight, ~1rem–1.125rem): Card titles, section headers, café names.
- **Body** (400 weight, 0.875rem–1rem, 1.5–1.6 line-height): Descriptions, notes, paragraph copy.
- **Label** (500 weight, 0.75rem, tabular-nums where numeric): Badges, stat values, nav links, timestamps.

### Named Rules
**The Serif-Is-Sparing Rule.** Fraunces is reserved for display headings only (`.font-display`); every interface element — nav, buttons, badges, body copy — stays in Manrope. Mixing serif into UI chrome would break the "notebook vs. functional tool" distinction the pairing exists to create.

## Layout

A centered `max-w-6xl` (explore grid) or `max-w-2xl`/`max-w-3xl` (detail/about prose) container with consistent `px-4 sm:px-6` horizontal padding. The café grid is a responsive card grid (1 column mobile → up to 3 columns desktop). Detail pages stack a hero, then stat/content sections with generous vertical rhythm (`py-8` to `py-20` per section). Cards entrance with a staggered fade-up (`animate-fade-in-up`, 0.4s). The top nav is a floating pill, fixed and centered, that hides on scroll-down and reappears on scroll-up.

## Elevation & Depth

Flat by default: surfaces are distinguished by a 1px border (`border-ink/8` light, `border-paper/10` dark) rather than shadow. Depth is introduced only as a response to interaction — cards lift 3px with a soft, warm-tinted shadow on hover (`card-hover`), and floating chrome (nav pill, lightbox) uses `backdrop-blur` plus a light shadow to separate from scrolling content behind it. A fixed, near-invisible SVG grain texture (`.grain::before`, 2–3.5% opacity) sits above the entire page to add tactile depth without literal shadow.

### Shadow Vocabulary
- **Card hover lift** (`0 12px 28px -10px rgba(28,42,32,0.18), 0 4px 8px -4px rgba(28,42,32,0.08)`, dark mode swaps to black-based rgba): the only elevation most surfaces ever show, triggered on hover.
- **Floating chrome** (`shadow-lg`, paired with `backdrop-blur-xl` and a translucent border): nav pill and dropdowns, to read as "above" the page.
- **Trending badge glow** (`shadow-lg shadow-clay/30`): a colored, low-opacity shadow tying the badge visually to its clay accent.

### Named Rules
**The Hover-Only Elevation Rule.** Nothing has a resting shadow. Shadow only appears as feedback for interaction (hover, floating overlays) — it signals "this responded to you," not "this is generically important."

## Shapes

Two radius steps cover the whole system: **8px** (`rounded-lg`) for small image tiles and gallery thumbnails, and **12px** (`rounded-xl`) for cards, buttons, inputs, and containers. Anything chrome-like — nav pill, badges, filter pills, the theme toggle — goes to **full pill radius** (`rounded-full`). There is no sharp-cornered surface anywhere in the system; corners are a hierarchy signal (pill = navigation/meta chrome, xl = content container, lg = imagery).

## Components

Calm and trustworthy: soft rounded-xl corners, quiet borders over shadows, and a gentle hover lift — nothing shouts, everything reads as considered and honest, matching the "independent, no-sponsorship" positioning.

### Buttons
- **Shape:** `rounded-xl` (12px).
- **Primary:** Palm background, paper text, `palm-deep` on hover (`bg-palm text-paper hover:bg-palm-deep`); sizes range `px-3 py-1.5 text-sm` (sm) to `px-6 py-3 text-base` (lg).
- **Secondary:** Paper background with a 1px ink/12% border; hovers to `paper-soft`.
- **Ghost:** Transparent, ink/65% text, hovers to a faint ink/5% fill.
- **Press:** All interactive buttons scale to 0.97 on `:active` (`.btn-press`) for tactile feedback.

### Chips / Badges
- **Style:** `rounded-full` pills, `px-2.5 py-1`, `text-xs font-medium`. Default/tag variant: `bg-ink/5` (dark: `bg-paper/10`) with `text-ink/70`. Area variant: translucent paper (`bg-paper/90 backdrop-blur-sm`) for overlaying photos.
- **State:** Selected filter chips and the Trending badge switch to a solid accent fill (palm for selection, clay for trending) with a matching low-opacity colored shadow.

### Cards / Containers
- **Corner Style:** `rounded-xl` (12px).
- **Background:** Paper (light) / Ink Soft (dark).
- **Shadow Strategy:** Flat at rest; lifts on hover per Elevation & Depth.
- **Border:** 1px `ink/8` (light) / `paper/10` (dark), brightening to `palm/40` on card hover to hint interactivity.
- **Internal Padding:** `p-4` to `p-6` depending on density.

### Inputs / Fields
- **Style:** `rounded-xl`, paper background, 1px `ink/12` border, leading icon inset with `pl-11`.
- **Focus:** 2px palm-tinted ring (`focus:ring-2 focus:ring-palm/30`) plus a `palm/50` border — never a hard outline.
- **Dropdowns:** Same card chrome (`rounded-xl`, border, `shadow-xl`) as containers, with a palm checkmark marking the active option.

### Navigation
- Floating centered pill (`rounded-full`, `backdrop-blur-xl`), translucent paper (light) or translucent ink (over a hero image), with a palm-filled pill marking the active link. Hides on scroll-down past 100px, reappears on scroll-up — chrome recedes when the user is reading, returns when they might want to navigate.

### Wi-Fi Signal (signature component)
Four bar-chart bars (`.signal-bars`, ascending height 35%→100%) colored by speed tier and paired with the numeric Mbps reading in `tabular-nums`. The fill color *is* the finding: clay = Slow (<10 Mbps), gold = OK (10–30), palm = Fast (30–80), palm-deep = Insane (80+) — directly encoding the CLAUDE.md Wi-Fi badge scale into a single reusable primitive used on both cards and detail pages.

## Do's and Don'ts

### Do:
- **Do** keep the accent palette to palm/clay/gold, each tied to a specific meaning (open-or-fast / price-or-trending-or-slow / ok-rated).
- **Do** use `rounded-full` for anything that behaves like navigation or a filter chip, and `rounded-xl` for content containers.
- **Do** reserve Fraunces for display headings only; keep every interactive/UI element in Manrope.
- **Do** let shadow appear only in response to interaction (hover, floating chrome) — never as a resting state.

### Don't:
- **Don't** introduce a new accent hue outside palm/clay/gold without a new, equally specific meaning behind it — this system doesn't decorate with color.
- **Don't** add resting drop shadows to cards or static surfaces; use the 1px border + hover-lift pattern instead.
- **Don't** present the current `data/cafes.json` Wi-Fi numbers, test dates, or stock gallery photography as verified findings in new copy — they are placeholder data pending real testing (see PRODUCT.md).
- **Don't** sharpen any corner to a hard right angle; every surface in this system is either pill, lg (8px), or xl (12px) radius.
