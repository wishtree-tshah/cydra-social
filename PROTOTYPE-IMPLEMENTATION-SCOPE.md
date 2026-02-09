# Cydra Social — What Can Be Implemented (Prototype Intent + GitHub Pages)

This document translates **PROTOTYPE-DEMO-GUIDE.md** into a clear implementation scope: what **can** be built for the prototype, given its **demo intent** and **GitHub Pages** hosting.

---

## 1. Prototype Intent (Recap)

- **Goal:** Demonstrate the complete end-to-end user workflow so stakeholders can understand product flow, interact without imagining missing pieces, and grasp value directly.
- **Scope:** Visual and functional demo only — no production backend, no real OAuth, no real payments, no real email.
- **Hosting:** GitHub Pages → **static site only** (HTML, CSS, JavaScript). No server, no server-side APIs, no backend processes.

**Implication:** Everything we implement must run entirely in the browser (client-side). Data can live in memory and in `localStorage`/`sessionStorage` only. No databases, no real third-party API callbacks (OAuth, Stripe, email), no cron jobs.

---

## 2. GitHub Pages Constraints

| Constraint | Effect on prototype |
|------------|----------------------|
| **Static only** | All logic in `index.html` (or linked JS/CSS). Hash-based routing (`#/dashboard`, etc.) works. |
| **No server** | No real login sessions, no OAuth redirect URLs to our domain, no webhooks, no server-rendered pages. |
| **Client-side storage only** | State persists via `localStorage` (and optionally `sessionStorage`). Data is per-browser, cleared if user clears site data. |
| **HTTPS** | GitHub Pages serves over HTTPS; no mixed-content issues if we only use HTTPS CDNs (e.g. Tailwind, fonts). |
| **Single entry** | Typically one `index.html`; SPA with hash routing is the right model (already in place). |

**Conclusion:** The guide’s “simulate” and “defer” recommendations are **fully compatible** with GitHub Pages. Nothing in “implement” requires a server.

---

## 3. What CAN Be Implemented (From the Guide)

All of the following are **client-side only** and fit both prototype intent and GitHub Pages.

### 3.1 Already in place (keep and polish)

- **Public site:** Hero, pricing (Solo $49, Team $99, Agency $299), footer (Login, Terms, Privacy, About).
- **Auth:** Sign up / Log in (email + password), SSO buttons (simulated), Forgot password modal.
- **Email verification gate:** Banner when unverified; block “Publish Now” / “Schedule”; “Resend” toast; optional one-click “Verify” for demo.
- **Onboarding:** Workspace name, slug (auto-generated), timezone, business profile, logo upload (data URL), completeness %.
- **Subscription:** Plan selection screen; Stripe-like checkout modal (pre-filled card, “Demo mode”); success + confetti; credits and trial in memory. Team/Agency → “Join Waitlist” + email capture.
- **Content:** Create post — platform toggles, AI generate (mock + credit check), editor, character count, media upload, Save Draft, Schedule, Publish Now. “Publishing…” animation then post marked Published.
- **Scheduling:** Date/time picker; optional 15-min buffer and “no past” validation in UI.
- **Content Library:** List (Draft/Scheduled/Published), search, filter, edit, delete.
- **Calendar:** Month grid, posts per day, click to view.
- **Connected Accounts:** Connect → OAuth simulation (steps then “connected”); Disconnect with draft conversion; Solo 3-account limit and Upgrade modal.
- **Media Library:** Upload (data URLs), grid, delete, 50-item limit; “Add Media” in editor: Upload New / Select from Library.
- **Workspace Settings, Billing placeholder, Super Admin (mock list + impersonate).**

All of this can stay as-is and be improved incrementally.

### 3.2 Add or fix (guide “Quick Fixes” and “Implement realistically”)

| Item | From guide | Implementation (client-side only) |
|------|------------|-----------------------------------|
| **Plan pre-selection (WEB-03 / ONB-05)** | §4, §7 | Use one key (e.g. `preSelectedPlan`) when user clicks plan on homepage. On onboarding completion: if `preSelectedPlan` is set, redirect **directly to checkout modal** for that plan (skip plan selection screen). All in JS + `localStorage`. |
| **Slug availability (ONB-02)** | §3, §7 | Hardcode 3–5 “taken” slugs in JS. On slug field blur (or 500ms debounce): if slug in list → show “Taken” + 3 suggestions (e.g. `slug1`, `slug-hq`, `slug-official`); else show “Available”. Click suggestion fills field. |
| **Character limits (CONT-01)** | §4, §7 | In editor: if X (or both X + LinkedIn) selected → max 280 chars. Enforce in `textarea` (e.g. `maxLength` or `input` handler). On paste: truncate at 280 and show toast “Text truncated to fit X limit.” Show counter and green/yellow/red bar. |
| **Schedule validation (SCHED-01)** | §4, §7 | On “Confirm Schedule”: if date &lt; today or time &lt; now + 15 min → show error (“Cannot schedule in the past” / “Posts must be scheduled at least 15 minutes in advance”). Block submit. Show workspace timezone near picker. |
| **Form validation** | §4 | Sign up: email format, password 8–12 alphanumeric (AUTH-01, AUTH-08). Login: generic “Invalid email or password.” Onboarding: require name, slug, timezone before “Continue.” All in JS. |
| **Optional: one-click “Verify” for demo** | §3 | Button or link in banner: “Verify email (demo)” → set `user.emailVerified = true` in store, persist, hide banner, allow Publish/Schedule. |
| **Optional: token expiry badge** | §3 | One connected account could have `status: 'expired'` in mock data; show “Reconnect” and re-run same OAuth simulation on click. |
| **Accessibility (A11y)** | §4 | Semantic HTML, focus states, labels, keyboard navigation where possible. No server required. |

### 3.3 Optional enhancements (still client-only)

- **AI “delay”:** 1–2 second timeout before showing generated content to mimic API.
- **LinkedIn “Page vs Profile”:** Before OAuth simulation, show a choice; store in connection object and display in card.
- **Demo script:** Short doc or README section: “Demo flow: Home → Plan → Sign up → Onboarding → Checkout → Connect 1 account → Create Post (AI) → Publish → Content Library / Calendar.”

---

## 4. What Is NOT Implemented (Deferred)

As in the guide (§6), the following are **out of scope** for the prototype and are **not** implemented when hosted on GitHub Pages:

- Real authentication (sessions, JWT, refresh).
- Real OAuth (LinkedIn, X, Meta) — no app credentials, no callbacks.
- Real Stripe (Checkout, Customer Portal, webhooks).
- Real email (verification, reset, notifications).
- Database (PostgreSQL or any server DB).
- File storage (S3) — we use data URLs / in-memory only.
- Real AI API (n8n, LLM) — we use local mock agents.
- Publishing engine (cron, FIFO queue, retries) — “Publish Now” only updates UI state.
- Actual execution of scheduled posts at `scheduled_time`.
- Multi-workspace/RBAC (optional UI only; no real permission checks).
- Super Admin (real user DB, Stripe refund API, audit logs).

These stay as placeholders or short explanatory text (e.g. “In production you’ll go to Stripe Customer Portal”).

---

## 5. End-to-End Implementable Journey (GitHub Pages)

The full stakeholder journey below is **implementable** with the current and planned client-side work:

1. **Visitor → Lead**  
   Home → “View Plans” → choose plan (e.g. Solo) → “Get Started” / “Start 7-Day Trial” → Sign up (or Login). *(Plan stored in `localStorage`.)*

2. **New user → Workspace**  
   Sign up → Onboarding (name, slug with availability check, timezone, optional profile/logo) → “Continue” → **either** Plan selection **or** direct Checkout if plan pre-selected.

3. **Subscribe**  
   Checkout modal → “Start Free Trial” → Processing → Success → Dashboard with credits and trial info. *(All in memory + localStorage.)*

4. **Connect accounts**  
   Settings → Connected Accounts → Connect LinkedIn/X/Meta (simulated) → “Active.” Fourth “Connect” → Upgrade modal.

5. **Create and publish**  
   Create Post → (optional) Generate with AI → Edit (with character limit and paste truncation) → “Publish Now” or “Schedule” (with validation and, if unverified, gate). Post appears in Content Library and Calendar.

6. **Email verification**  
   Sign up with email → Dashboard banner “Verify your email” → try Publish → blocked → “Verify (demo)” or “Resend” → Publish allowed.

7. **Content management**  
   Content Library: filter, search, edit draft, delete. Calendar: month view, click post. Media Library: upload, select in editor.

8. **Billing / limits**  
   “Manage Subscription” (placeholder), “Top up credits” (demo modal); at 3 accounts “Connect” → Upgrade modal; Team/Agency → Waitlist.

---

## 6. Summary: Implementable vs Deferred

| Category | Can implement on GitHub Pages? | Notes |
|----------|-------------------------------|--------|
| **Simulate** (OAuth, Stripe, email verify, AI, slug check, publish animation) | **Yes** | All client-side mocks and UI. |
| **Implement realistically** (flows, validation, limits, gates, disconnect → drafts) | **Yes** | UI and logic in JS; data in memory/localStorage. |
| **Essential journey** (Home → … → Publish → Library/Calendar) | **Yes** | Entire path works with current + quick fixes. |
| **Defer** (real auth, OAuth, Stripe, DB, S3, AI API, cron, RBAC, refunds) | **No** | Not built; placeholders or copy only. |

**Caveats for GitHub Pages:**

- **Persistence:** State is per-browser (localStorage). Clearing site data resets “accounts” and “workspaces.” For a demo this is acceptable; we can document it.
- **No real security:** No server-side validation; prototype is for demo only, not for production use.
- **URLs:** Single `index.html`; all routes are hash-based (`#/dashboard`, `#/login`, etc.). GitHub Pages can serve this with no extra config.

---

## 7. Alignment with Prototype Intent

- **Demonstrate workflow:** ✅ Full journey (1–8 above) can be implemented and demoed.
- **Interact without imagining:** ✅ Buttons, forms, modals, and flows work in the browser; no “coming soon” for core path.
- **Grasp value:** ✅ Pricing, connect accounts, AI generate, schedule, publish, library, calendar, and limits are visible and usable.
- **No overengineering:** ✅ Only client-side logic and lightweight mocks; nothing deferred is implemented.

Hosting on **GitHub Pages** does not restrict any of the guide’s “implement” or “simulate” items; it only reinforces that the prototype remains static and client-side, which matches the intent.
