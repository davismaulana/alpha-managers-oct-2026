# TRD - Alpha Managers October 2026 Landing Page

## Stack
Vite, React, TypeScript, CSS, lucide-react.

## Scope
Use the existing single-page React app. Keep changes scoped to landing-page source, styling, metadata, and local docs.

## Technical Requirements
- Preserve Vite build compatibility.
- Keep form state local and avoid collecting identity/contact fields.
- Generate WhatsApp chatbot URL only after required qualification answers are complete.
- Avoid backend changes unless the existing WhatsApp endpoint fails.
- Use semantic sections and responsive CSS.

## Visual Requirements
- Near-black background with subtle deep undertone only.
- Gold as the primary accent for CTAs, borders, labels, and selected states.
- Ivory text and warm muted body copy.
- Serif display headlines.
- Minimal card usage; prefer editorial rows and thin dividers.

## Verification
Run `npm run build`, confirm local preview loads, and review final result against CEO feedback.

## Approved October Revision - 2026-08-08

- Add `public/october-event-poster.png` and `public/industry-trust-october.png` without deleting the previous August assets.
- Update the active `App` content configuration and server lead metadata to the October event.
- Keep the existing `/api/leads` contract and change only campaign/event identifiers and the WhatsApp route slug.
- Verify build, lint, event-isolation checks, asset loading, and deployment health.

## Approved October Parity Restoration - 2026-08-10 (NAG-20260810-100745-251)

### Implementation boundary

- Treat `origin/main` as the authoritative implementation for App composition,
  section components, CSS, breakpoints, and client interactions.
- Treat `deploy-six3161` as authoritative only for October event data, active
  assets, WhatsApp route, campaign/server IDs, metadata, pixel configuration,
  and production-domain configuration.
- Do not change the GitHub remote, deployment configuration, or deploy state.

### Technical checks

- Assert the ordered 11-section `App` composition and direct WhatsApp CTA
  implementation in local source.
- Assert October poster/proof assets, `1 Oktober 2026`, `oct-2026`, and
  `cfr-oct-2026`; reject August date/route/campaign/UTM markers.
- Build and lint successfully, then use Playwright at 1440 × 1000 and
  390 × 844 to check section count, section/style parity, no mobile x-overflow,
  menu/FAQ/video behavior, and CTA targets. Height differences are acceptable
  only when caused by approved October event imagery or text.
- Deployed-link Playwright QA is release-gated and must be run after Head
  Manager coordinates deployment; it must target the current production domain.

## Approved Comparison-Price Correction - 2026-08-10 (NAG-20260810-234659-801)

### Implementation boundary

- Change only the active crossed-out comparison-price text in
  `src/components/sections/EventFormat.tsx`.
- Preserve the `line-through` visual treatment, active offer price, CTA URLs,
  section composition, deployment configuration, and production target.

### Technical checks

- Assert source contains the active offer `3.999.999` and the sole crossed-out
  comparison value `9.999.000`; reject `7.999.999` from the active source.
- Run build, lint, event-isolation verification, and rendered local/live page
  checks that confirm the displayed values and crossed-out comparison styling.

## Approved WhatsApp CTA Revision - 2026-08-13

### Implementation boundary

- Update only centralized `CTA_URL` in `src/lib/constants.ts` to `https://zenichat.com/api/wa/2be594bf-19e8-4195-98a3-4094fce74ea8/tam`.
- Preserve `TICKET_URL`, CTA tracking, visual behavior, and deployment configuration.

### Technical checks

- Require the exact approved endpoint and reject the exact former `zenichat.id` October endpoint in the event-isolation verification.
- Run lint, production build, and event-isolation verification; confirm the former endpoint is absent from active source and generated `dist` output.
