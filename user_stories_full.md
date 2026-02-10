



User Story Document for Cydra Social Application



Date: 5 Feb 2026



























This document is prepared by Wishtree Technologies Inc. and intended only for use by Spencer Technologies LLC





Table of Content



Public Website & Static Content	3

WEB-01 | Home Page & Value Proposition	3

WEB-02 | Static Legal Pages (Terms, Privacy, About)	3

WEB-03 | Plan Selection Redirection Logic	3

Authentication & Identity Management	4

AUTH-01 | Sign Up via Email & Password	4

AUTH-02 | Sign Up / Log In via Social SSO	5

AUTH-03 | User Log In (Email)	5

AUTH-04 | Email Verification ("Soft Gate" Access)	6

AUTH-05 | Forgot Password / Reset	6

AUTH-06 | User Logout	7

AUTH-07 | Invite Acceptance (For Phase 2 Readiness)	7

AUTH-08 | Validation & Error Feedback	7

Onboarding & Workspace Management User Stories	8

ONB-01 | Set Workspace Name & URL Slug	8

ONB-02 | Slug Validation & Auto-Suggestions	8

ONB-03 | Timezone Setup	9

ONB-04 | Workspace Branding (Logo Upload)	9

ONB-05 | Onboarding Completion & Subscription Handoff	10

ONB-06 | Multi-Workspace Restriction (Phase 1 Logic)	10

ONB-07 | Business Profile & AI Context Setup	11

Social Account Integrations	11

PHASE 1: Core Connectivity (Solo Plan)	12

Sub-Epic 5.1: Integrations Hub & Management	12

SOC-P1-01 | Social Accounts Dashboard (Settings)	12

SOC-P1-02 | Solo Plan Limit Enforcement (The Gate)	12

SOC-P1-03 | Disconnect Account & Draft Conversion	13

Sub-Epic 5.2: Platform Connectors (OAuth)	13

SOC-P1-04 | Connect LinkedIn (Page vs. Profile Selection)	13

SOC-P1-05 | Connect X (Twitter)	14

SOC-P1-06 | Connect Meta (Business Login)	14

PHASE 2: Team & Operational Optimization	14

Sub-Epic 5.3: Advanced Health & Team Limits	14

SOC-P2-01 | Team Plan Limit Enforcement (10 Accounts)	14

SOC-P2-02 | Token Health & Expiry Alerts	15

Sub-Epic 5.4: Role-Based Access Control (RBAC)	15

SOC-P2-03 | Role Restrictions (Creator vs. Admin)	15

PHASE 3: Agency Scale & Governance	15

Sub-Epic 5.5: Agency Scale & Enterprise Features	16

SOC-P3-01 | Agency Plan Limit Enforcement (25 Accounts)	16

SOC-P3-02 | Multi-Workspace Context Switching	16



Public Website & Static Content

WEB-01 | Home Page & Value Proposition

1. User Story As a visitor, I want to understand what Cydra Social does and see the pricing plans, So that I can decide if I want to start a trial or subscribe.

2. Description The Home Page acts as the sales funnel. It must clearly articulate the value ("Create smarter social content") and present the subscription options. In Phase 1, while we display all plans for positioning, the primary Call to Action (CTA) drives users to the Solo Plan or Free Trial.

3. Acceptance Criteria

• Hero Section:

    ◦ Headline: "Create smarter social content. Publish with confidence.".

    ◦ Primary CTA Button: "Get Started" (Links to Sign Up -> Select Plan).

    ◦ Secondary CTA Button: "View Plans" (Scrolls to Pricing Section).

• Pricing Section:

    ◦ Display three cards: Solo (49)∗∗,∗∗Team(99), Agency ($299).

    ◦ Solo Card: CTA "Start 7-Day Trial" or "Subscribe".

    ◦ Team/Agency Cards: In Phase 1, clicking these should either:

        ▪ A) Lead to Sign Up (and allow selection if supported).

        ▪ B) Show "Coming Soon" if strict Phase 1 limits apply (Referencing requirement, limiting to Solo is safest for MVP, but the design should show all three).

• Footer: Links to About Us, Terms, Privacy, Login.



WEB-02 | Static Legal Pages (Terms, Privacy, About)

1. User Story As a visitor or compliance officer, I want to view the Privacy Policy, Terms & Conditions, and About Us pages, So that I can trust the platform's legitimacy and understand how my data is handled.

2. Description These are mandatory static pages required for Stripe verification and user trust.

3. Acceptance Criteria

• Pages Required:

    ◦ About Us: Content from "Our Story" (Frustration with blank screens, AI philosophy).

    ◦ Privacy Policy: Text regarding data collection, AI content rights, and no data selling.

    ◦ Terms & Conditions: Age eligibility (18+), Payment terms, and Liability disclaimers.

• Navigation: Accessible via the Footer on all public pages.

• SEO: Pages must be crawlable by search engines.



WEB-03 | Plan Selection Redirection Logic

1. User Story As a System, I want to remember which plan the user clicked on the public site, So that I can pre-select that plan when they reach the checkout screen after signing up.

2. Description This bridges the gap between the Public Website and the Application. If a user clicks "Start Solo Trial" on the homepage, they shouldn't have to select it again after signing up.

3. Acceptance Criteria

• Functional Logic:

    ◦ When user clicks a CTA (e.g., ?plan=solo), store this preference in the URL query parameter or LocalStorage.

    ◦ User is redirected to AUTH-01 (Sign Up).

    ◦ After successful Sign Up, system checks for the stored plan preference.

    ◦ System redirects user directly to BILL-01 (Checkout) with the "Solo Plan" pre-selected.

• Fallback: If no plan was selected (user just clicked "Sign Up"), redirect them to the Plan Selection screen inside the app to choose manually.





Authentication & Identity Management

AUTH-01 | Sign Up via Email & Password

1. User Story As a prospective user, I want to create an account using my email and a secure password, So that I can access the Cydra Social platform and begin setting up my workspace.

2. Description This is the standard registration flow. I will provide my email and create a password. The system must enforce specific security rules (8-12 alphanumeric characters) to ensure my account is secure before logging me in.

3. Acceptance Criteria

• Functional Logic:

    ◦ I enter my email and password.

    ◦ The system checks if my email is already registered.

        ▪ If yes: I see an alert prompting me to Log In instead.

        ▪ If no: The system creates my account and logs me in immediately.

    ◦ Upon successful sign-up, I am redirected to the Onboarding/Workspace Setup page.

    ◦ The system automatically sends a verification email to my inbox (triggering AUTH-04).

• Validations:

    ◦ Email: Must be a valid format (e.g., user@domain.com).

    ◦ Password: Must be 8-12 characters long and contain Alphanumeric characters only (A-Z, 0-9).

    ◦ Terms: I must check a box to agree to Terms & Conditions.

• Field Matrix:

Field Label

Placeholder

Helper Text

Mandatory

Email Address

name@business.com

—

Yes

Password

Create a password

Must be 8-12 alphanumeric characters.

Yes

Agree to Terms

—

I agree to the Terms of Service

Yes

Sign Up Button

—

—

N/A



AUTH-02 | Sign Up / Log In via Social SSO

1. User Story As a user, I want to sign up or log in using my existing Meta, LinkedIn, Google, or X account, So that I can access the platform quickly without remembering another password.

2. Description I want to use my business credentials from other platforms to authenticate. Specifically, I need to be able to use Meta Business Login to ensure my future Facebook/Instagram connections work smoothly.

3. Acceptance Criteria

• Functional Logic:

    ◦ I click "Continue with [Provider]".

    ◦ I am redirected to the provider's OAuth permission screen.

    ◦ New User: If I don't have an account, the system creates one using my social email and logs me in.

    ◦ Existing User: If I already have an account with that email, the system logs me in.

    ◦ Meta Specifics: The flow must utilize the Meta Business Login standard.

• UI Elements:

    ◦ Buttons: "Continue with Meta Business," "Continue with LinkedIn," "Continue with Google," "Continue with X".

• Edge Case:

    ◦ If the social provider does not share my email (e.g., privacy settings), the system prompts me to enter an email address manually to complete the profile.

AUTH-03 | User Log In (Email)

1. User Story As a returning user, I want to log in using my email and password, So that I can resume managing my content.

2. Description I need to access my existing account. If I enter the wrong credentials, the system should give me a generic error for security purposes.

3. Acceptance Criteria

• Functional Logic:

    ◦ I enter email and password.

    ◦ If credentials match, I am redirected to the Dashboard.

    ◦ If I have not completed onboarding, I am redirected to Workspace Setup.

    ◦ If authentication fails, I see a generic error message ("Invalid email or password").

• Field Matrix:

    ◦ Label: Email Address | Placeholder: name@business.com

    ◦ Label: Password | Placeholder: Enter your password

    ◦ Link: Forgot Password?

AUTH-04 | Email Verification ("Soft Gate" Access)

1. User Story As a newly registered user, I want to verify my email address via a link sent to my inbox, So that I can unlock publishing features (Posting/Scheduling).

2. Description After signing up, I can access the dashboard immediately to look around ("Read-Only"), but I cannot post content until I prove my email is valid.

3. Acceptance Criteria

• Functional Logic:

    ◦ Unverified State:

        ▪ I can view the Dashboard, Settings, and Calendar.

        ▪ I see a global banner: "Please verify your email to start posting."

        ▪ If I click "Create Post" or "Schedule," the system blocks the action and shows a modal: "Email Verification Required."

    ◦ Verification Action:

        ▪ I click the link in the email.

        ▪ The system confirms verification and removes the banner/blocks.

    ◦ Expiry: The link in my email is valid for 24 hours.

    ◦ Resend: I can click "Resend Verification Email" from the dashboard banner if the link expires.

AUTH-05 | Forgot Password / Reset

1. User Story As a user who forgot their credentials, I want to reset my password via a secure email link, So that I can regain access to my account.

2. Description I need a self-serve way to recover my account. The new password I set must adhere to the same strict security policy as sign-up.

3. Acceptance Criteria

• Functional Logic:

    ◦ I enter my email on the "Forgot Password" page.

    ◦ The system displays a confirmation message: "If an account exists, we have sent a reset link." (Security best practice).

    ◦ I receive an email with a link valid for 24 hours.

    ◦ I click the link and land on the "Reset Password" page.

    ◦ I enter a new password that meets the 8-12 alphanumeric requirement.

• Field Matrix (Reset Page):

    ◦ Label: New Password | Validation: 8-12 Alphanumeric.

    ◦ Label: Confirm New Password | Validation: Must match exactly.



AUTH-06 | User Logout

1. User Story As a user, I want to log out of the application, So that I can close my session securely.

2. Description I need to ensure my account is safe, especially if I am on a shared computer.

3. Acceptance Criteria

• Functional Logic:

    ◦ I click "Log Out" in the profile dropdown.

    ◦ The system destroys my active session.

    ◦ I am redirected to the Public Homepage or Login Screen.

    ◦ I cannot use the browser "Back" button to access the dashboard again without logging back in.



AUTH-07 | Invite Acceptance (For Phase 2 Readiness)

1. User Story As a user invited to a workspace, I want to click the link in my invitation email to set up my account, So that I can join the team workspace immediately.

2. Description While Phase 1 is focused on Solo users, the system supports inviting members (as per Admin requirements). I need to accept an invite and set my password without having to "Create a Workspace" myself.

3. Acceptance Criteria

• Functional Logic:

    ◦ I click the "Join Workspace" link in my email.

    ◦ I land on a Sign-Up page where my Email is pre-filled and locked (read-only).

    ◦ I create a password (8-12 alphanumeric).

    ◦ Upon success, I am directed straight to the Dashboard of the shared workspace (skipping the "Create Workspace" onboarding step).



AUTH-08 | Validation & Error Feedback

1. User Story As a user, I want to see clear error messages when I make a mistake, So that I can fix my input and proceed quickly.

2. Description I need immediate feedback if I enter an invalid email or a weak password.

3. Acceptance Criteria

• Functional Logic:

    ◦ Real-time Validation: If I type a password with a special character (e.g., "Pass!"), the field turns red, and I see: "Password must contain letters and numbers only."

    ◦ Length Check: If I type fewer than 8 or more than 12 characters, I see: "Password must be 8-12 characters."

    ◦ Offline State: If I try to log in without an internet connection, I see a "Network Error" message rather than a browser crash page.

Onboarding & Workspace Management User Stories

ONB-01 | Set Workspace Name & URL Slug

1. User Story As a new user, I want to name my workspace and claim a unique URL slug (e.g., cydra.social/brand), So that I can establish my business identity on the platform.

2. Description Upon first login, the user must define their workspace. This creates the "container" for all future content, social connections, and billing. The system must generate a URL-friendly "slug" based on the workspace name and ensure it is unique across the entire Cydra platform.

3. Acceptance Criteria

• Functional Logic:

    ◦ User enters a "Workspace Name" (e.g., "Wishtree Consulting").

    ◦ System auto-generates a slug in real-time (e.g., wishtree-consulting).

    ◦ User can manually edit the slug field.

    ◦ Uniqueness Check: System validates availability against the database workspaces table.

• Validations:

    ◦ Name: Max 50 characters. Alphanumeric + spaces allowed.

    ◦ Slug: Lowercase alphanumeric and hyphens (-) only. No spaces. Max 30 chars.

• Field Matrix:

Field Label

Placeholder

Helper Text

Mandatory

Workspace Name

e.g., Acme Agency

Your business or brand name.

Yes

Workspace URL

cydra.social/

letters, numbers, and dashes only.

Yes





ONB-02 | Slug Validation & Auto-Suggestions

1. User Story As a user, I want to receive automatic suggestions if my desired workspace URL is already taken, So that I can quickly find a valid alternative without guessing.

2. Description Since workspace slugs must be globally unique, collisions will happen. Instead of just showing an error, the system must proactively suggest alternatives (similar to Gmail username selection) as requested in the Requirement Gathering document.

3. Acceptance Criteria

• Functional Logic:

    ◦ Trigger: Fires onBlur (when user leaves the slug field) or after a 500ms debounce while typing.

    ◦ Scenario: Available

        ▪ Show a green checkmark or "Available" badge.

    ◦ Scenario: Unavailable

        ▪ Show error: "That URL is already taken."

        ▪ Auto-Suggest Logic: Display 3 clickable alternatives based on the input.

            • Input: wishtree

            • Suggestions: wishtree1, wishtree-hq, wishtree-official

    ◦ Action: Clicking a suggestion automatically populates the Slug field and clears the error.



ONB-03 | Timezone Setup

1. User Story As a user, I want to set my workspace's default timezone, So that my scheduled posts go live at the correct local time.

2. Description Timezone accuracy is critical for a scheduling tool. This setting will govern the default "Schedule" time in the editor.

3. Acceptance Criteria

• Functional Logic:

    ◦ Auto-Detect: On page load, try to detect the user's browser timezone and pre-select it in the dropdown.

    ◦ Selection: User can search and select a different timezone from a standard list (e.g., "EST - New York", "GMT - London").

    ◦ Storage: Save as the workspace_default_timezone in the database.

• Field Matrix:

    ◦ Label: Timezone

    ◦ Type: Dropdown (Searchable)

    ◦ Default: Browser Timezone (e.g., America/New_York)

    ◦ Mandatory: Yes

ONB-04 | Workspace Branding (Logo Upload)

1. User Story As a user, I want to upload my brand’s logo, So that I can visually distinguish my workspace in the dashboard and personalize my environment.

2. Description This serves as the visual identifier for the Workspace. In Phase 1, it replaces the default avatar in the UI navigation. In Phase 2, it becomes the primary navigation cue for multi-client switching.

3. Acceptance Criteria

• Functional Logic:

    ◦ User clicks "Upload Logo".

    ◦ System opens native file picker.

    ◦ Preview: Display a circular preview of the uploaded image immediately.

    ◦ Storage: Upload the asset to AWS S3 (as per architecture) and associate the URL with the workspace.

• Validations:

    ◦ File Type: JPG, PNG.

    ◦ File Size: Max 2MB (Phase 1 limit to save storage costs).

    ◦ Dimensions: Minimum 200x200px.

• Edge Case:

    ◦ If user skips this, auto-generate an avatar using the initials of the Workspace Name (e.g., "WC" for Wishtree Consulting).



ONB-05 | Onboarding Completion & Subscription Handoff

1. User Story As a System, I want to save the workspace data and redirect the user to the pricing page, So that I can enforce the "Subscription First" workflow.

2. Description This is the "submit" action for the Onboarding module. It connects Epic 2 (Onboarding) to Epic 6 (Subscription).

3. Acceptance Criteria

• Functional Logic:

    ◦ User clicks "Continue" or "Next Step" on the onboarding form.

    ◦ Backend Action:

        1. Create Workspace record in PostgreSQL.

        2. Link current User ID as Role: WORKSPACE_ADMIN for this workspace.

        3. Set status to Active.

    ◦ Redirection Logic:

        ▪ Scenario A (Plan Pre-selected): If the user clicked "Start Solo Trial" on the public site (Epic 0), redirect directly to Stripe Checkout for the Solo Plan.

        ▪ Scenario B (No Plan): Redirect to the Plan Selection Screen (displaying Solo, Team, Agency).

• Validation:

    ◦ Prevent progression if Name, Slug, or Timezone are missing.

ONB-06 | Multi-Workspace Restriction (Phase 1 Logic)

1. User Story As a System, I want to prevent Phase 1 "Solo" users from creating a second workspace, So that I can enforce the "1 User = 1 Workspace" limit defined in the requirements.

2. Description The requirement docs state that Phase 1 is strictly "1-to-1 per account for solo".

3. Acceptance Criteria

• Functional Logic:

    ◦ If a user who already owns a workspace attempts to access the "Create Workspace" route/URL:

        ▪ Redirect them to their existing Dashboard (if paid).

        ▪ Or redirect them to the "Billing" page (if unpaid).

    ◦ UI: Do not show a "Create New Workspace" button in the profile dropdown for Solo users.

    ◦ Exception: This restriction will be lifted in Phase 2 for "Agency" plans, so the backend code should be modular (e.g., if (user.workspaces.count >= plan.limit) { block }).



ONB-07 | Business Profile & AI Context Setup

1. User Story As a new user, I want to provide details about my business, industry, and target audience, So that the AI generates content that actually sounds like me and appeals to my customers.

2. Description This step captures the "Static Context" that will be injected into every AI prompt. This creates a "set it and forget it" experience where the user doesn't have to repeat "I am a marketing agency" in every single prompt.

3. Acceptance Criteria

• Functional Logic:

    ◦ Displayed immediately after Workspace Name/Slug creation.

    ◦ Data is stored in the workspaces table.

    ◦ Skip Logic: Users can skip this step (to reduce friction), but a "completeness meter" should encourage them to fill it out for better results.

• Field Matrix:

Field Label

Placeholder

Helper Text

Data Type

Mandatory

Industry / Niche

e.g., SaaS, Legal, Health

Helps AI understand your market.

Dropdown + Custom

Yes

Business Description

e.g., We help startups scale...

What do you do? (Max 500 chars)

Text Area

Yes

Target Audience

e.g., CTOs, Busy Moms

Who are you talking to?

Text Input

No

Brand Tone

Select tone...

How should your posts sound?

Dropdown

No

Website

https://



URL

No

• Dropdown Options (Tone): Professional, Casual, Enthusiastic, Authoritative, Witty, Empathetic.

• Dropdown Options (Industry): Marketing, Technology, Real Estate, Coaching, Law, Finance, Healthcare, Retail, Other.

Social Account Integrations

PHASE 1: Core Connectivity (Solo Plan)

Focus: Establishing the foundational OAuth pipes, handling the "1 User = 1 Workspace" logic, and enforcing the strict 3-account limit.

Sub-Epic 5.1: Integrations Hub & Management

SOC-P1-01 | Social Accounts Dashboard (Settings) 

1. User Story As a Workspace Admin, I want to view a list of connected social accounts within my Workspace Settings, So that I can see which profiles are active and monitor my plan limits.

2. Description The central hub for integrations. It must visually reinforce that these connections apply only to the current workspace. It displays the specific connected entities (e.g., "Company Page" vs "Personal Profile") and the connection status.

3. Acceptance Criteria

• Functional Logic:

    ◦ Location: Navigate to Sidebar > Settings > Connected Accounts.

    ◦ Context: Query database for connections linked strictly to the current active_workspace_id.

    ◦ List View: Display cards for LinkedIn, X (Twitter), and Meta.

    ◦ States:

        ▪ Not Connected: Enable "Connect" button.

        ▪ Connected: Show Platform Logo + Profile Avatar + Handle/Name + "Active" Badge.

        ▪ Error: Show "Expired" Red Badge (if token is invalid).

    ◦ Counter: Display "Accounts Connected: [Current Count] / 3".

• UI Elements:

    ◦ Header: "Connected Accounts".

    ◦ Helper Text: "Connect your social profiles to start scheduling. Solo Plan limit: 3 accounts."



SOC-P1-02 | Solo Plan Limit Enforcement (The Gate) 

1. User Story As a Solo Plan user, I want to be notified if I try to exceed my 3-account limit, So that I understand the value of upgrading to the Team plan.

2. Description The monetization trigger. The Solo plan is hard-capped at 3 accounts. This logic runs before any OAuth process starts.

3. Acceptance Criteria

• Functional Logic:

    ◦ Trigger: User clicks "Connect" on any platform card.

    ◦ Check: IF (Count(social_connections) >= 3) THEN Block Action.

    ◦ UI Response: Open Upgrade Modal (do not redirect to social network).

        ▪ Headline: "You've reached the Solo limit."

        ▪ Body: "The Solo plan supports up to 3 social accounts. Upgrade to Team to connect up to 10 accounts."

        ▪ Primary Button: "Join Team Waitlist" (Phase 1) OR "Upgrade to Team" (Phase 2).

        ▪ Secondary Button: "Cancel".

SOC-P1-03 | Disconnect Account & Draft Conversion 

1. User Story As a Workspace Admin, I want to disconnect a social account, So that I can remove unused profiles or fix a corrupted connection.

2. Description Destructive action handling. If a user removes an account, we must ensure "Scheduled" posts don't fail silently or hang in the system.

3. Acceptance Criteria

• Functional Logic:

    ◦ Action: Click "Trash/Disconnect" icon on a connected row.

    ◦ Confirmation Modal: "Are you sure? This will disconnect [Account Name]. Any scheduled posts for this account will be moved to Drafts."

    ◦ Backend Process:

        1. Delete the token record from social_connections.

        2. Query posts table for status = 'SCHEDULED' AND account_id = [Deleted ID].

        3. Update these posts to status = 'DRAFT'.

        4. Log internal history: "Reverted to draft via account disconnect."

    ◦ Feedback: Show Toast Message: "Account disconnected. [X] scheduled posts moved to Drafts."



Sub-Epic 5.2: Platform Connectors (OAuth)

SOC-P1-04 | Connect LinkedIn (Page vs. Profile Selection) 

1. User Story As a user, I want to connect a specific LinkedIn Company Page or my Personal Profile, So that I can publish to the correct professional entity.

2. Description Standard OAuth flow. Crucially, Cydra must force the user to select specific pages to import. Per pricing docs, a Profile and a Page count as two separate accounts.

3. Acceptance Criteria

• Functional Logic:

    ◦ Step 1: Click "Connect LinkedIn" -> Redirect to LinkedIn OAuth.

    ◦ Step 2: User grants permissions (w_organization_social, r_liteprofile, w_member_social).

    ◦ Step 3 (Import Modal):

        ▪ System fetches the user's Profile AND all Administered Pages.

        ▪ UI displays list with checkboxes.

        ▪ Constraint: User can select multiple.

        ▪ Counting: Each checked box increments the Account Counter by 1.

    ◦ Step 4: Store unique URN (ID) and Token for each selected entity against the Workspace.



SOC-P1-05 | Connect X (Twitter)

1. User Story As a user, I want to connect my X (Twitter) account, So that I can schedule tweets.

2. Description Standard OAuth flow for X.

3. Acceptance Criteria

• Functional Logic:

    ◦ Step 1: Click "Connect X" -> Redirect to Twitter OAuth.

    ◦ Step 2: Authorize App -> Callback to Cydra.

    ◦ Step 3: Store oauth_token and oauth_token_secret.

    ◦ Validation: Check if this specific X Handle is already connected to this Workspace. If yes, show error: "Account already connected."



SOC-P1-06 | Connect Meta (Business Login) 

1. User Story As a user, I want to connect Facebook Pages and Instagram Business accounts via Meta Business Login, So that I can manage my Meta portfolio.

2. Description Required Day 1 feature per Requirement Gathering. Uses the specific Meta Business Login flow to retrieve multiple assets from one login.

3. Acceptance Criteria

• Functional Logic:

    ◦ Step 1: Click "Connect Meta" -> Launch Facebook Business Popup.

    ◦ Step 2: User selects specific Facebook Pages and Instagram Accounts in the Meta UI.

    ◦ Step 3 (Cydra Import Modal):

        ▪ Display the assets returned by the token.

        ▪ Example: "Found: Nike FB Page, Nike Instagram."

        ▪ User confirms import.

    ◦ Counting: 1 FB Page = 1 Account. 1 IG Account = 1 Account.

    ◦ Validation: Reject Personal Instagram profiles (API restriction). Must be Business/Creator.



PHASE 2: Team & Operational Optimization

Focus: Expanding limits to 10 accounts, introducing Role-Based Access (RBAC), and automated health checks.



Sub-Epic 5.3: Advanced Health & Team Limits

SOC-P2-01 | Team Plan Limit Enforcement (10 Accounts) 

1. User Story As a Team Plan user, I want to connect up to 10 social accounts, So that I can manage my brand's diverse presence.

2. Description Updates the limit logic for the $99/mo plan.

3. Acceptance Criteria

• Functional Logic:

    ◦ Update Max_Accounts validation rule to 10 for Workspaces on Team Plan.

    ◦ Upgrade Trigger: If user attempts 11th connection, show Agency Upgrade Modal ($299/mo).





SOC-P2-02 | Token Health & Expiry Alerts

 1. User Story As a Workspace Admin, I want to see a visual alert when a social connection expires, So that I can reconnect it before posts fail.

2. Description Proactive monitoring. Social tokens expire (e.g., LinkedIn every 60 days). Phase 2 introduces automated detection to prevent "Silent Failures".

3. Acceptance Criteria

• Functional Logic:

    ◦ Detection: System flags connections returning 401 Unauthorized or uses a background job to check expiry dates.

    ◦ Database: Update connection_status = EXPIRED.

    ◦ UI (Settings): Change badge to Red "Reconnect Required".

    ◦ UI (Dashboard): Global Banner: "Action Required: Reconnect [LinkedIn Account] to resume publishing."

    ◦ Action: "Reconnect" button re-triggers OAuth flow to refresh token.



Sub-Epic 5.4: Role-Based Access Control (RBAC)

SOC-P2-03 | Role Restrictions (Creator vs. Admin) 

1. User Story As a Workspace Admin, I want to prevent Creators from deleting social connections, So that my integration setup remains stable.

2. Description Enforcing the "Creator" vs. "Admin" permissions defined in the Team Plan.

3. Acceptance Criteria

• Functional Logic:

    ◦ Creator Role:

        ▪ Can view connected accounts in the Post Editor (to select them for posting).

        ▪ Cannot access Settings > Connected Accounts.

    ◦ Admin Role: Full access to Connect/Disconnect.

    ◦ Security: If a Creator manually navigates to the Settings URL, redirect to Dashboard with "Access Denied."

PHASE 3: Agency Scale & Governance

Focus: High-volume management (25 accounts), multi-workspace context switching, and White Labeling.



Sub-Epic 5.5: Agency Scale & Enterprise Features

SOC-P3-01 | Agency Plan Limit Enforcement (25 Accounts)

1. User Story As an Agency Admin, I want to connect up to 25 social accounts, So that I can manage complex client portfolios.

2. Description Updates the limit logic for the $299/mo plan.

3. Acceptance Criteria

• Functional Logic:

    ◦ Update Max_Accounts validation rule to 25 for Workspaces on Agency Plan.

    ◦ Overage: If user needs >25, prompt to "Add Additional Workspace" or "Contact Sales".



SOC-P3-02 | Multi-Workspace Context Switching

1. User Story As an Agency User managing 5 clients, I want the Connected Accounts list to update instantly when I switch Workspaces, So that I never accidentally post content to the wrong client.

2. Description Visual enforcement of the architecture. When the user switches the "Global Workspace Context" in the nav bar, the Settings page must refresh immediately.

3. Acceptance Criteria

• Functional Logic:

    ◦ Action: User toggles "Nike" to "Adidas" in top navigation.

    ◦ System: Triggers a re-fetch of the social_connections list based on the new workspace_id.

    ◦ Verification: Ensure "Nike" tokens are completely hidden/inaccessible in the "Adidas" session context.







