# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are digital nomads and remote workers in Siem Reap, Cambodia who need a café to actually get work done in — not just get coffee. The site is scoped to this single audience by design; general tourists/coffee lovers are explicitly not a target audience for positioning or copy decisions.

## Product Purpose

A café directory for Siem Reap that answers the questions remote workers actually have before walking in: how fast is the Wi-Fi, what's the minimum spend, what's the vibe, is there aircon/power/quiet seating. Success means someone can pick a café with confidence before leaving home, based on real (eventually) tested data rather than guesswork.

## Positioning

Independent, zero-sponsorship café testing: no paid placements, no free coffees, reviewers visit incognito and pay their own way. This is the stated differentiator from generic "work-friendly café" lists, which the About page explicitly frames as untrustworthy paid content by comparison.

## Operating Context

Users typically browse before or during a work session — filtering/sorting by Wi-Fi speed, price, and area (Wat Bo, Old Market, Taphul, Sok San Road), then opening a café detail page to check the gallery, stats, and tags before heading over or tapping through to Google Maps.

## Capabilities and Constraints

- Static/server-rendered café directory built with Next.js App Router (`app/page.tsx` explore grid, `app/cafe/[slug]` detail pages, `app/about`).
- Café records live in `data/cafes.json`; each includes area, price, top drink, Wi-Fi stats (download/upload/latency/testedAt), tags, gallery, notes, and optional vibe fields (vibeScore, lighting, powerOutlets, seating, music, trending).
- **The 14 current café entries are sample/seed data**: real café names, but Wi-Fi numbers, test dates, and gallery photos (currently Unsplash stock) are placeholders standing in for real on-site testing and original photography. Do not treat current numeric Wi-Fi/price values or gallery images as verified facts when writing new copy — future work should replace them with real measurements and original photos rather than extending the placeholder pattern.
- Map integration via Leaflet/react-leaflet; each café also links out to Google Maps.

## Brand Commitments

- Product name: "Siem Reap Cafes."
- Zero-sponsorship / independent-testing stance is a binding promise, not just marketing copy — any future feature or partnership work must not compromise it (e.g. no paid placement, no sponsored ranking boosts).

## Evidence on Hand

- 14 café entries in `data/cafes.json` with real café names but placeholder Wi-Fi metrics, test dates, and stock gallery photography (see Capabilities and Constraints). No real testing data or original photos exist yet — future work must not present the current numbers/photos as verified findings in copy or marketing claims.

## Product Principles

1. Every displayed fact (Wi-Fi speed, price, testing date) should read as if it were personally verified — placeholder data must eventually be replaced, never expanded with more fabricated entries.
2. Stay scoped to remote workers' actual decision criteria (Wi-Fi, price, quiet, power, aircon) rather than broadening into general tourism/dining content.
3. Preserve the independent, no-sponsorship positioning in any new feature (filters, sorting, "trending" badges, etc.) — nothing should look like paid placement.
4. Keep the directory usable as a fast pre-visit decision tool: search, filter, and sort must stay fast and low-friction.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web accessibility practice.
