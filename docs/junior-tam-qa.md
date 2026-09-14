# Junior TAM October 2026 — Conversation QA and Release Gate

## Scope

Junior handles the October 2026 Alpha Managers 3.0 event only. The LP-to-WhatsApp CTA is:

- LP: https://oct-2026.zenova.id/
- CTA: https://zenichat.com/api/wa/2be594bf-19e8-4195-98a3-4094fce74ea8/tam

The n8n workflow is `Junior - TAM October 2026` (`gBz8BYh5EHLSZ4zl`). It remains disabled while the final gate is open.

## Required first-contact contract

For the exact TAM opening, Junior must send three customer-visible messages, in this order, with no extra/empty message:

1. Intro/event details:

   `Halo Pak/Bu, salam kenal. Junior dari Alpha Leaders Community.`

   `Berikut saya kirimkan detail info event The Alpha Managers 3.0 by Alpha Leaders.`

   `Kamis, 1 Oktober 2026`

   `Aloft Hotel by Marriott, Kebon Jeruk, Jakarta`

   `Workshop ini akan membahas leadership, coaching, delegasi, hingga problem solving yang bisa menjadikan manager Anda menjadi Alpha Manager.`

   `Rencana mau daftar 2 atau 4 orang ya?`

2. The approved TAM poster (`public/tam-story-poster.png`).

3. Pricing information (the WhatsApp flow does not send the direct payment gateway or bank details):

   `Normal Price Rp 9.999.000`; special offer `1 tiket Rp 3.999.999` and `2 tiket Rp 7.499.999`; valid through `13 September 2026`.

## Functional requirements

| ID | Requirement | Release grade |
|---|---|---:|
| FR-01 | LP CTA opens the TAM WhatsApp route and preserves the TAM marker. | Pending end-to-end user-session proof |
| FR-02 | Exact first contact produces exactly three messages in the approved order. | Partial: intro and poster observed |
| FR-03 | Poster is the approved PNG and is delivered once. | Pass in controlled synthetic test |
| FR-04 | Price facts are exact; WhatsApp never sends gateway/bank details automatically or claims payment verification. | Pass after static pricing revision and payment-intent regression |
| FR-05 | 2- or 4-seat selection starts WhatsApp pre-registration data capture; no payment URL is sent automatically. | Pass for 2-seat intent; name -> email -> WhatsApp sequence observed |
| FR-06 | Event questions are answered only from the approved event facts; unknown facts go to a human. | Pass: date/venue, topics, and inclusions |
| FR-07 | Unqualified/off-topic/ABM questions are redirected without Julia/ABM qualification behavior. | Pass: ABM/Julia and student cases |
| FR-08 | Payment claims switch to human handling and never claim verification. | Pass: transfer confirmation and refund cases |
| FR-09 | No chatbot/debug/internal-policy language, empty replies, or repeat-yourself loops. | No empty/duplicate loop observed; full 20-case proof pending |
| FR-10 | No self-trigger loop: `fromMe` messages are dropped. | Pass in controlled execution review |
| FR-11 | Junior send nodes use the literal Junior WAHA session, not the inbound session expression. | Pass by workflow inspection |
| FR-12 | Workflow stays disabled until all release gates pass. | Pass; deactivated after controlled QA |

## Qualified lead cases (10)

1. Exact LP CTA opening with `@TAM`.
2. Opening followed by “daftar 2 orang”.
3. Opening followed by “daftar 4 orang”.
4. Asks date, venue, and duration.
5. Asks speakers and workshop topics.
6. Asks inclusions (meals, certificate, handbook, networking).
7. Asks for the official registration/payment route.
8. Sends a payment screenshot and asks whether it is received.
9. Says they need to check with a co-founder/HR before choosing seats.
10. Asks a follow-up after receiving the poster and price.

Expected: concise Indonesian reply, only approved facts, one clear next question, human handoff for payment/unknowns.

## Unqualified or out-of-scope cases (10)

1. Asks about Julia, ABM, coaching, or organic consultation.
2. Uses `@CFO`, `@APRIL`, or another campaign marker.
3. Asks for a discount not in the approved offer.
4. Asks whether payment is verified without sending evidence.
5. Asks for a date, venue, speaker, or benefit not in the approved facts.
6. Sends only “halo” with no event context.
7. Sends an ambiguous seat count such as 3 or 5.
8. Asks for employment, recruitment, or unrelated products.
9. Requests a refund/cancellation or invoice change.
10. Sends profanity, repeated messages, or an empty payload.

Expected: polite clarification or human handoff; never hallucinate, qualify as ABM, repeat the prompt, or send an empty/debug response.

### Data-capture revision (2026-08-19)

The approved payment form is the source of truth for WhatsApp lead capture: email, name, active WhatsApp number, company/brand, role, and social handle. The direct payment gateway is a separate website path and must not be sent automatically from WhatsApp. The AI system message was published with this rule and verified in the live chat: `Saya mau daftar untuk 2 orang.` produced a single request for the lead's name; `Andi Pratama` produced a single request for the active email; the email produced a single request for the active WhatsApp number. A first iteration incorrectly repeated the name on a link request; a field-order override was published, and the repeated link request then correctly asked for the next missing WhatsApp number without sending a URL.

The static first-contact pricing node was then revised to remove bank-account details. A payment-intent regression initially combined an out-of-scope redirect with data capture; the payment-intent override was published. The final regression `Saya ingin bayar lewat transfer sekarang.` returned one handoff sentence, with no redirect, gateway URL, bank details, or repeated field question.

### 20-case controlled matrix result

The cumulative WhatsApp Web evidence contains 20+ controlled interaction turns spanning qualified intent, 2/4 seats, date/venue, topics, inclusions, link request, payment intent, payment confirmation, Julia/ABM, student, invalid seat count, unrelated marketing, refund, and the six-field capture. The field-order and payment-intent regressions passed after their overrides; no empty or duplicate outbound message was observed. This is not a claim of 20 independent fresh-lead sessions: the run used one profile and an existing conversation state, so production release remains gated until a second fresh lead is tested.

## Executed evidence and gate

### Latest smoke-test update (2026-08-19)

- The personal WhatsApp Web profile was verified as the originating test number `+62 821-4320-8119`.
- The exact LP-click -> Share on WhatsApp -> Continue to WhatsApp Web flow was executed with the authenticated originating profile. Junior delivered the intro, approved poster, and pricing message in order.
- The earlier pricing failure contained a malformed `chatId` with leading whitespace. The expression was corrected and published; the subsequent Notion null `decision_maker` failure was also fixed and the follow-up execution completed successfully.

- LP CTA was inspected and confirmed to target the TAM route.
- Junior WAHA session `zenichat_2be594bf_msst9tp4` is `WORKING` and has both the production webhook and the n8n webhook with `message.any` and `session.status` plus the configured `x-api-key` header.
- Controlled WhatsApp Web cases reached Junior successfully after the pricing and Notion fixes; no WAHA send timeout occurred in the subsequent runs.
- No empty-message or self-trigger duplicate loop was observed; `If5` drops `fromMe` events.
- The authenticated WhatsApp Web tab is being used as the originating test profile for the Junior chat. The full 20-case matrix is still pending, so these controlled cases are not production-release evidence yet.

- After the controlled run, workflow `gBz8BYh5EHLSZ4zl` was explicitly deactivated (`active=false`) to prevent untested production traffic. Latest controlled executions, including the complete six-field capture, were successful.

**Release decision: BLOCKED.** Keep the workflow disabled. Re-run the 20 cases only after the user’s WhatsApp Web session is authenticated to the originating test number and Junior presence is online/stable; require 20/20, zero duplicate/empty sends, and a successful third price message before activation.
