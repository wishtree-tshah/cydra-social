# Cydra Social — Prototype Demo Guide

**Purpose:** This document guides how to use and extend the `index.html` prototype for stakeholder demos. It identifies what to **simulate**, what to **implement realistically**, and what to **defer** to production.

---

## 1. Prototype Intent (Recap)

- **Goal:** Demonstrate the complete end-to-end user workflow so stakeholders can understand product flow, interact without imagining missing pieces, and grasp value directly.
- **Scope:** Visual and functional demo only — no production backend, no real OAuth, no real payments, no real email.

---

## 2. What the Prototype Already Covers

| Area | Current Behavior | Notes |
|------|------------------|--------|
| **Public site** | Hero (WEB-01), Pricing (Solo $49, Team $99, Agency $299), Footer (Login, Terms, Privacy, About) | Plan selection stores in `localStorage` and routes to signup (WEB-03). |
| **Auth** | Sign up (email/password), Log in, SSO buttons (Google, Meta, LinkedIn, X), Forgot password modal | Email verification “soft gate”: banner + block on Publish/Schedule; “Resend” and “Verify” simulate AUTH-04. |
| **Onboarding** | Workspace name/slug, timezone, business profile, logo upload, completeness % | Slug auto-generation; availability can be **simulated** (see below). |
| **Subscription** | Plan selection screen, Stripe-like checkout modal (card pre-filled), success + confetti | Trial start, credits applied in memory. Team/Agency open “Join Waitlist” modal. |
| **Content** | Create post: platform toggles, AI generate (credit check, multiple agents), editor, char count, media upload, Save Draft, Schedule, Publish Now | AI is local mock; Publish shows step-by-step “publishing” animation then saves as published. |
| **Scheduling** | Date/time picker, 15-min buffer (can be enforced in UI), Schedule confirmation | Backend FIFO/retries deferred. |
| **Content Library** | List with status (Draft/Scheduled/Published), search, filter, edit, delete | Data from in-memory store. |
| **Calendar** | Month grid, posts per day, click to view | View-only; no drag-drop. |
| **Connected Accounts** | Cards per platform (LinkedIn, X, Meta), Connect → OAuth **simulation** (progress steps then “connected”), Disconnect with draft conversion | Solo limit (3) enforced; upgrade modal when at limit. |
| **Media Library** | Upload, grid, delete, 50-item limit; “Add Media” in editor: Upload New / Select from Library | Files in memory (data URLs). |
| **Workspace Settings** | Profile/business fields, branding | Saves to store. |
| **Billing** | Manage subscription (opens “portal” placeholder), Top-up credits (modal, demo) | No real Stripe. |
| **Super Admin** | User lookup table, Impersonate (switches to user context with banner) | Mock user list. |

---

## 3. Features to Simulate or Mock (Keep Lightweight)

These are already or should remain **simulated** so the demo is convincing without production complexity.

| Feature | User Story / Ref | Suggested Simulation |
|--------|-------------------|------------------------|
| **Email verification** | AUTH-04 | ✅ Already: banner + block Publish/Schedule; “Resend” shows toast; optional “Verify” button or magic link that sets `emailVerified: true` in one click for demo. |
| **OAuth (LinkedIn, X, Meta)** | SOC-P1-04/05/06 | ✅ Already: “Connect” opens modal with progress steps, then marks account connected. Optional: LinkedIn “Page vs Profile” choice before “connecting.” |
| **Stripe Checkout** | BILL-P1-02 | ✅ Already: Modal with card (4242…), “Processing…” then success. Keep “Demo mode” badge. |
| **AI content generation** | CONT-02 | ✅ Already: Local “agents” + credit deduction. Optional: short delay (1–2s) to mimic API. |
| **Slug availability** | ONB-02 | **Add:** On slug blur/debounce, check against list of “taken” slugs (e.g. hardcode 3–5). Show “Available” or “Taken” + 3 suggested alternatives (e.g. `slug1`, `slug-hq`, `slug-official`). |
| **Publishing to platforms** | PUB-01 | ✅ Already: “Publishing…” modal with 3 steps then post marked Published. No real API. |
| **Token expiry / reconnect** | SOC-P2-02 | **Optional:** One connected account could show “Expired” badge and “Reconnect” that re-runs the same OAuth simulation. |
| **Forgot password** | AUTH-05 | ✅ Already: Modal with email; show “If an account exists, we’ve sent a reset link” and optionally a “Demo: Mark as reset” that navigates to a simple “New password” form then login. |
| **Team/Agency plans** | BILL-P1-01 | ✅ Already: “Join Waitlist” + email capture. No real checkout. |
| **Invoice / Billing portal** | BILL-P1-05 | Keep as “Manage Subscription” opening a modal saying “In production you’ll go to Stripe Customer Portal.” |

---

## 4. UI Behaviors and Flows to Implement Realistically

These should **feel real** in the prototype (correct screens, validation, and flow) even if data is fake.

| Flow | What to implement | Why |
|------|--------------------|-----|
| **Public → Sign up → Onboarding → Checkout** | Same as now: Home → “Get Started” or “Start 7-Day Trial” (store plan) → Sign up → Onboarding → After “Continue”, redirect to Plan Selection or directly to “Stripe” checkout if plan pre-selected (WEB-03, ONB-05). | Core conversion story. |
| **Plan pre-selection (WEB-03)** | Ensure plan from homepage is used: e.g. store as `preSelectedPlan` and after onboarding skip plan selection and open checkout for that plan. (Check: code uses `preSelectedPlan` in onboarding but `selectPlan()` sets `selectedPlan` — align keys or copy on signup.) | Reduces clicks and shows smart handoff. |
| **Email verification gate (AUTH-04)** | ✅ Keep: unverified users can open Dashboard, Create Post, Calendar, Settings; “Publish Now” / “Schedule” show message and (optional) modal “Email verification required.” After “verify” (or resend), allow publishing. | Shows soft gate without real email. |
| **Character limits (CONT-01)** | Enforce per platform in UI: X = 280, LinkedIn = 3000; if both selected, use 280. Show counter and bar (green/yellow/red). Block paste overflow and show toast “Text truncated to fit X limit.” | Core content UX. |
| **Scheduling rules (SCHED-01)** | Date ≥ today; time ≥ now + 15 min. Show workspace timezone. Error messages: “Cannot schedule in the past” and “Posts must be scheduled at least 15 minutes in advance.” | Trust in scheduling. |
| **Solo 3-account limit (SOC-P1-02)** | ✅ Already: “Connect” when already 3 opens Upgrade modal. Keep. | Clear monetization moment. |
| **Disconnect → drafts (SOC-P1-03)** | ✅ Already: Disconnect confirms and moves scheduled posts for that platform to Draft. Keep. | Shows careful handling of scheduled content. |
| **Credits and AI (CONT-02)** | ✅ Already: Check balance before generate; deduct on success; “Out of credits” modal with top-up/upgrade. Keep. | Shows value and limits. |
| **Form validation** | Sign up: email format, password 8–12 alphanumeric (AUTH-01, AUTH-08). Login: generic “Invalid email or password.” Onboarding: required name, slug, timezone before “Continue.” | Reduces “broken” feel. |
| **Accessibility (A11y)** | Semantic structure, focus states, labels, keyboard navigation where possible. | Aligns with your A11y rule and improves demo quality. |

---

## 5. Interactions Essential for the Full User Journey

Prioritize these in demos so the journey is clear and unbroken.

1. **Visitor → Lead**  
   Homepage → “View Plans” → choose plan (e.g. Solo) → “Get Started” / “Start 7-Day Trial” → Sign up (or Login).

2. **New user → Workspace**  
   Sign up → Onboarding (name, slug, timezone, optional profile/logo) → “Continue” → Plan selection or direct Checkout.

3. **Subscribe**  
   Checkout modal → “Start Free Trial” → Processing → Success → Dashboard with credits and trial info.

4. **Connect accounts**  
   Settings → Connected Accounts → Connect LinkedIn/X/Meta (simulated) → see “Active.” Optionally hit 4th “Connect” → Upgrade modal.

5. **Create and publish**  
   Create Post → (optional) Generate with AI (topic + tone) → Edit → choose platforms → “Publish Now” or “Schedule” (if unverified, show gate). See post in Content Library and Calendar.

6. **Email verification**  
   Sign up with email → Dashboard with banner “Verify your email” → try Publish → blocked → click “Verify” or “Resend” (demo shortcut) → Publish allowed.

7. **Content management**  
   Content Library: filter by status, search, edit draft, delete. Calendar: month view, click post. Media Library: upload, select in editor.

8. **Billing / limits**  
   Header “Manage Subscription,” “Top up credits”; at 3 accounts “Connect” → Upgrade modal. Team/Agency CTAs → Waitlist.

---

## 6. What to Defer to Real Backend Integrations

Do **not** build for production in the prototype; only show placeholders or document.

| Area | Defer | Prototype approach |
|------|--------|---------------------|
| **Real auth** | Firebase/Auth0/Custom (sessions, JWT, refresh) | In-memory user + localStorage; SSO sim. |
| **Real OAuth** | LinkedIn / X / Meta app credentials, callbacks, token storage | Simulated “connecting…” then store fake connection. |
| **Real Stripe** | Checkout, Customer Portal, webhooks, subscriptions, invoices | Modal + success state; “Manage” = placeholder. |
| **Real email** | Verification, password reset, notifications | Toasts + one-click “Verify” / “Reset” for demo. |
| **Database** | PostgreSQL (users, workspaces, posts, connections) | Single `Store` in memory + localStorage. |
| **File storage** | S3 (logos, media) | Data URLs / base64 in memory. |
| **AI API** | n8n or LLM API, workspace context injection | Local mock agents + optional delay. |
| **Publishing engine** | Cron/worker, FIFO queue, retries, rate limits (PUB-01) | No backend; “Publish Now” only updates status in UI. |
| **Scheduled execution** | Actual run at `scheduled_time` | Calendar and list show “scheduled”; no real cron. |
| **Multi-workspace / RBAC** | Agency switching, Creator vs Admin (SOC-P2-03, SOC-P3-02) | Optional: second workspace in dropdown; no real RBAC. |
| **Super Admin** | Real user DB, Stripe refund API, audit logs | Mock user list + impersonation. |
| **Legal pages** | CMS or static deploy, SEO | Static HTML in prototype is enough. |

---

## 7. Quick Fixes for a Smoother Demo

- **WEB-03 / ONB-05:** Use one key for “plan chosen on public site” (e.g. `preSelectedPlan`). When user finishes onboarding, if `preSelectedPlan` is set, redirect straight to checkout for that plan instead of plan selection.
- **Slug (ONB-02):** Add a small list of “taken” slugs; on blur/debounce show Available vs Taken and 3 suggestions.
- **Character limit (CONT-01):** If not already, enforce 280 when X is selected (or both); paste truncation + toast.
- **Schedule validation:** Enforce 15-min buffer and “no past” with clear error messages.
- **Demo script:** One-page “Demo script” (separate or in README) that walks through: Home → Plan → Sign up → Onboarding → Checkout → Connect 1 account → Create Post (AI) → Publish → Content Library / Calendar.

---

## 8. Summary Table

| Category | Examples | Action in prototype |
|----------|----------|----------------------|
| **Simulate** | OAuth, Stripe, email verification, AI, slug check, publish pipeline | Keep or add lightweight mocks; no real APIs. |
| **Implement realistically** | Navigation, validation, limits (char, schedule, 3 accounts), verification gate, disconnect → drafts | Full UI and flow; data can be fake. |
| **Essential for journey** | Home → Sign up → Onboarding → Checkout → Connect → Create → Publish → Library/Calendar | Ensure this path works and is demo-ready. |
| **Defer** | Real auth, OAuth, Stripe, DB, S3, AI API, cron publisher, RBAC, refunds | Placeholder or doc; no production logic. |

This keeps the prototype **clear and impactful for stakeholder demos** without overengineering or introducing production complexity.
