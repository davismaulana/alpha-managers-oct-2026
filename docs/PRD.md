# PRD - Alpha Managers October 2026 Landing Page

## Outcome
Rebuild the August Ferly landing page as a premium black/gold, pain-first executive landing page for businesses that need stronger manager accountability.

## ICP
Owners, HR leaders, and business leaders in companies with meaningful team complexity and minimum 5M monthly revenue. They have managers, but owner still chases results and accountability.

## Positioning
August focuses on manager accountability, KPI usage, performance rhythm, and execution discipline.

## User Flow
1. Visitor lands on a premium black/gold hero with a manager-accountability pain headline.
2. Visitor sees specific symptoms: KPI exists but does not control execution, managers report activity not outcomes, owner still follows up everything.
3. Visitor understands Alpha Managers as a practical management execution session.
4. Visitor answers fit/pain questions only.
5. After submit, visitor continues to WhatsApp chatbot for identity and contact details.

## Form Constraints
Do not ask name, WhatsApp number, or business name on the page form. Those belong in the chatbot.

## Acceptance Criteria
- Theme reads black/gold premium, not purple/blue.
- Hero headline is dominant, serif, and pain-first.
- Copy is simple, diagnostic, and manager-accountability focused.
- Poster/proof appears early and feels premium.
- Form qualifies fit and reveals WhatsApp only after completion.
- Build passes and local preview loads.

## Approved October Revision - 2026-08-08

- Replace the event poster with the CEO-provided October poster asset.
- Replace the industry/client proof strip with the CEO-provided logo collage.
- Change the event date to 1 Oktober 2026.
- Set the hero headline to: "Manager Anda Belum Kerja Seperti Yang Anda Harapkan? Semua Masih Anda Yang Harus Kerjakan Sendiri?"
- Use `oct-2026` for the public WhatsApp campaign route and October tracking identifiers.

## Approved October Parity Restoration - 2026-08-10 (NAG-20260810-100745-251)

### Objective

Restore the October landing page to the live August reference design and user
experience, using `origin/main` as the source baseline. Retain only approved
October event and campaign data.

### Preserved October data

- Event date: Kamis, 1 Oktober 2026.
- Hero/event asset: `public/october-event-poster.png`.
- Client-proof asset: `public/industry-trust-october.png`.
- WhatsApp route: `/oct-2026` on the approved ZeniChat campaign URL.
- October metadata, Meta Pixel configuration, campaign/server identifiers, and
  production domain configuration already on `deploy-six3161`.

### Acceptance criteria

- The rendered component order is exactly Hero, ProblemStatement,
  TargetAudience, WhatYoullLearn, Speakers, EventFormat, LimitedSeats,
  IndustryTrust, VideoProof, FinalCTA, and FAQ; Footer remains after FAQ.
- Desktop (1440 × 1000) and mobile (390 × 844) each have the same 11-section
  structure, spacing system, and responsive behavior as the reference, with no
  horizontal overflow. Document height may differ only where approved October
  imagery or event text has different intrinsic dimensions.
- The August visual system, copy structure/text, animation behavior, navigation,
  video controls, FAQ interaction, and responsive layout are retained except
  for October-specific data above.
- Navigation, hero, final, ticket, and FAQ WhatsApp CTAs open the approved
  `oct-2026` route in a new tab.
- No August date, WhatsApp route, campaign identifier, or UTM default remains
  in active landing-page code or server metadata.

## Approved Comparison-Price Correction - 2026-08-10 (NAG-20260810-234659-801)

### Objective

Correct the crossed-out comparison price in the existing October 2026 landing
page to exactly `9.999.000`.

### Acceptance criteria

- The active offer price remains `3.999.999`.
- The adjacent crossed-out comparison price renders exactly `9.999.000`, using
  Indonesian dot grouping with no currency, locale, CTA, or positioning change.
- No other visible price claim or production target is changed.

## Approved WhatsApp CTA Revision - 2026-08-13

### Objective

Route every WhatsApp CTA to the CEO-approved ZeniChat TAM endpoint.

### Acceptance criteria

- All WhatsApp CTAs use `https://zenichat.com/api/wa/2be594bf-19e8-4195-98a3-4094fce74ea8/tam`.
- The Alpha Leaders ticket checkout URL remains unchanged.
- CTA behavior, tracking events, copy, pricing, layout, and deployment target remain unchanged.
