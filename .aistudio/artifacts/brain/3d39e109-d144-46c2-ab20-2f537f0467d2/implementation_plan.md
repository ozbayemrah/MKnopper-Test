# Martin Knopper Steuerberatung — Digital Practice & Consultation Portal

An editorial, bilingual (German / English) responsive web application for **MMag. Martin Knopper Steuerberatung** (Graz, Austria), uniting his advisory portfolio, cross-border art VAT guide, 28-year career timeline, IURIO digital collaboration workflow, transparent fee schedule, and a consultation scheduler with Google Calendar API integration and `.ics` download across desktop, tablet, and mobile viewports.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Phase 1 Confirmed Decisions & OAuth Flow**
> All four product and UX directions have been confirmed and govern this architecture. When implementation begins, Google Calendar integration will initiate a brief OAuth permission confirmation step (`set_up_oauth`) before writing Calendar API code.

- **Confirmed Decision 1 — Calendar Integration**: Dual-mode consultation scheduling supporting live **Google Calendar API** event creation and availability checking (via Google Sign-In) alongside instant **`.ics` calendar file download** for Apple Calendar, Outlook, and privacy-first visitors without a Google account.
- **Confirmed Decision 2 — Consultation Wording**: Formal tax and economic terminology using **"Request Initial Consultation"** (EN) and **"Erstgespräch anfragen"** (DE) for primary actions, clearly distinguishing between a complimentary-upon-mandate Initial Consultation (*Erstgespräch*) and ad-hoc advisory without an existing mandate (*Einzelberatung*).
- **Confirmed Decision 3 — Page Structure**: Single-page editorial showcase with smooth section anchor navigation on desktop/tablet, a thumb-friendly fixed bottom navigation bar on mobile, and a persistent sliding right-side **"Contact now / Kontakt"** tab and drawer that travels with scroll.
- **Confirmed Decision 4 — Content Scope**: Complete practice portfolio sourced directly from Martin Knopper's eleven documents, including Advisory Focus, the interactive *Kunst über Grenzen* (Cross-Border Art & VAT) guide, the *28 Years Across Three Worlds* timeline and *Bach-to-Tango* motif, the *IURIO & BMD Cloud* digital collaboration model, and the full *Fee Schedule* (*Honorare*).

---

## 1. Overview & Core Concept

- **What It Does**: Presents MMag. Martin Knopper's Graz-based, fully digital and international tax advisory practice in a high-trust, accessible single-page experience with instant DE/EN language switching, Light/Dark mode toggling, an interactive cross-border art VAT decision guide, a persistent sliding contact drawer, and a guided consultation scheduler connected to Google Calendar and `.ics` export.
- **Target Audience & Persona**: Sole proprietors, self-employed professionals, visual and performing artists, creative agencies, physicians/therapists, non-profits, and international clients (capital assets, RSUs, cross-border real estate) browsing on desktop, tablet, or mobile.
- **Key Value**: Replaces generic brochure PDFs with a calm, transparent, interactive client journey—letting prospective clients verify cross-border art VAT rules, inspect exact hourly and flat-rate fees, understand IURIO encrypted onboarding, and schedule an initial consultation into their calendar in under two minutes.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **First Impression & Orientation**: Visitors land on a balanced editorial hero showcasing the core proposition (*"Steuer?! Lass ihn machen."* / *"Tax?! Leave it to him."*), dual-degree positioning (*Law & Business Administration · Graz · Digital & International*), an inline language/theme utility bar (`DE | EN` and `Light | Dark`), and the primary **"Erstgespräch anfragen / Request Initial Consultation"** CTA.
2. **Guided Practice Exploration**: Visitors navigate smoothly via the top navigation bar (desktop/tablet) or mobile bottom bar through five cohesive narrative chapters:
   - *Capabilities*: 6-sector asymmetric Bento layout (Sole Proprietors, Artists & Creatives, Healthcare, Cross-Border Art, International Tax Cases, Calm as a Service).
   - *Cross-Border Art VAT Guide*: Interactive buyer-type selector (*EU B2B*, *EU Private B2C*, *Non-EU Export*) displaying the 13% Austrian reduced rate, €55,000 small business threshold (2025+), €10,000 EU distance-selling threshold, documentation requirements, and the 4 typical pitfalls.
   - *Experience & Identity*: Interactive 1999–present timeline across Public Administration/NPO (15 years) and Tax Advisory (13 years), plus an interactive SVG musical staff visualizing the B-A-C-H fugue motif from flute at age 6 to Argentine tango.
   - *Digital Collaboration (IURIO)*: Six-pillar security overview (Austrian servers, Passkey login, ID Austria digital signatures, eavesdrop-proof video calls, BMD Cloud ISO 27001) and 3-step onboarding path.
   - *Transparent Fee Schedule*: Clean tabular-numerals rate table (`€ 25` to `€ 1,800`, hourly & flat rates, `+20% VAT`, tax deductibility notice).
3. **Sliding "Contact Now / Kontakt" Side Drawer**: A compact floating right-edge handle stays aligned during scroll on desktop, tablet, and mobile. Clicking it slides open a drawer containing Graz office details (`Grieskai 56 / 6, 8020 Graz`), clickable phone/mobile numbers, `office@knopper-stb.at` (with the explicit note to keep confidential files inside IURIO rather than email attachments), and a one-tap button to open the Consultation Scheduler.
4. **Consultation Scheduling & Calendar Flow**:
   - Triggered from the Hero CTA, Top Bar CTA, Mobile Bottom Bar, Sliding Contact Drawer, or inline Consultation section.
   - **Step 1 (Mandate & Topic)**: Choose *Initial Consultation (Erstgespräch — in-person in Graz or encrypted video call, fee-free upon mandate)* or *Targeted Advisory (Einzelberatung — € 185 / 30 min + VAT)* and select the focus area.
   - **Step 2 (Date & Time Slot)**: Pick a date and 30-minute Europe/Vienna time slot. Optional **"Check Google Calendar Availability"** button connects via Google Sign-In and queries `freebusy` to highlight conflict-free slots.
   - **Step 3 (Details & Validation)**: Enter name, email, phone, consultation format (Graz office vs. encrypted video), and brief context.
   - **Step 4 (Confirm & Sync)**: User can either **Download `.ics` Invite** immediately (zero login required) or click **Add to Google Calendar**—which first opens a mandatory confirmation modal displaying exact event summary, date/time, timezone, and location before creating the Google Calendar event.

### Visual Identity & Theme

- **Aesthetic Direction**: Refined Austrian legal-economic editorialism—authoritative, calm, human, and precision-structured. Subtle circular `§` watermark motifs and hairline dividers echo the client's print identity while eliminating cluttered pill badges, left-stripe callout clichés, or generic tech gradients.
- **Color Palette & Dual-Theme Tokens (60-30-10 Discipline)**:
  - *Light Mode (Default)*:
    - `--background`: `#FFFFFF` / `#FAFBFD` (60% crisp neutral canvas)
    - `--surface`: `#F4F4FA` (30% client's cool lavender-slate structural surface)
    - `--text-primary`: `#14285C` (Client's Deep Navy for headlines and primary structure)
    - `--text-body`: `#26304A` (Client's Slate Ink for high-contrast prose)
    - `--accent`: `#E86404` (10% Client's Signature Orange strictly on primary CTAs, active indices, and key numeric highlights)
  - *Dark Mode (`html.dark` via `@custom-variant dark`)*:
    - `--background`: `#0B1120` (Deep midnight navy-obsidian canvas)
    - `--surface`: `#121C33` (Elevated navy-slate card surface, $\le 12\%$ delta)
    - `--text-primary`: `#F1F5F9` (Crisp off-white headings with subtle `+0.01em` optical tracking compensation)
    - `--text-body`: `#CBD5E1` (High-legibility slate body text)
    - `--accent`: `#F0781E` (Luminance-adjusted warm orange meeting WCAG AA contrast on dark surfaces)
- **Typography & Hierarchy**:
  - *Brand Wordmark*: `Playfair Display` (matching the classic serif "martin knopper" wordmark) paired with `Raleway` for "steuerberatung".
  - *Headings & UI / Body*: `Raleway` (explicitly specified in the client's HTML deliverables) across clean `clamp(2.25rem, 4vw, 3.75rem)` hero display headings (`text-wrap: balance`) and `15px–16px` readable prose.
  - *Tabular Numerals*: `JetBrains Mono` / `tabular-nums` applied strictly to fee schedule figures, VAT thresholds (`13%`, `€ 55.000`, `€ 10.000`), career year spans, and calendar time slots.
- **Responsive Navigation & Sticky Surface Budget**:
  - **Top Navigation Bar**: Follows the strict 3-zone contract (`martin knopper` single-line wordmark — 5 concise single-line section links — 1 primary `"Erstgespräch"` / `"Consultation"` CTA button). Language (`DE / EN`) and Theme (`Light / Dark`) switches reside cleanly in the Hero/workspace utility bar on desktop and inside the accessible mobile drawer/sheet.
  - **Bottom Bar**:
    - *Desktop & Tablet*: Clean multi-column practice footer plus a compact bottom quick-bar for instant language/theme switching and consultation launch.
    - *Mobile (`< 768px`)*: Fixed thumb-zone bottom tab bar (`64px` height, keeping combined top + bottom sticky chrome $\le 15\%$ of viewport height) with 4 $\ge 44\text{px}$ tap targets: *Services*, *Art & VAT*, *Consult*, and *Menu* (which opens a slide-up sheet for DE/EN toggle, Dark/Light toggle, Experience, IURIO, and Fees).

### Interactive Feedback & Motion

- Smooth compositor-only (`transform`, `opacity`) transitions settling within 150–200ms, respecting `prefers-reduced-motion`.
- Instant client-side language and dark/light switching with zero layout jump and `localStorage` preference persistence.
- Inline form validation, slot availability loading states, and explicit confirmation dialog prior to Google Calendar API writes.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Dual Calendar Strategy (Google Calendar API + `.ics` Export)**
  - *Chosen Approach*: Client-side Firebase Auth Google Sign-In (`calendar.events` + `calendar.freebusy` scopes, in-memory token caching only) for live free/busy checking and direct calendar event creation, paired with client-side RFC 5545 `.ics` file generation.
  - *Why*: Meets both Google Workspace users and privacy-conscious Austrian/EU clients (who may use Apple Calendar, Outlook, or prefer no third-party sign-in) without needing server-side OAuth redirect flows.
  - *Alternatives Considered*: Google Calendar API alone (blocks visitors without Google accounts) or static `.ics` alone (lacks live availability checks).

- **Decision 2 — Unboxed Editorial Typography Instead of Pill-Tag Clutter**
  - *Chosen Approach*: Convert the PDF's rounded pill clusters (e.g., 15+ career skill tags) into structured, scannable typographic grids and middot-separated (`·`) metadata rows.
  - *Why*: Eliminates visual noise across mobile and desktop while preserving 100% of Martin Knopper's credentials and specializations in a readable hierarchy.
  - *Alternatives Considered*: Reproducing dozens of capsule pills directly from the static print PDFs, which degrades scannability on small screens.

- **Decision 3 — Client-Side Bilingual Dictionary & Theme State**
  - *Chosen Approach*: Strongly typed `DE` / `EN` translation store and React Context managing language (`de` default or auto-detected, switchable anytime) and `dark` class toggling on `document.documentElement`.
  - *Why*: Zero-latency switching across every section, drawer, scheduler, and `.ics` / Calendar event payload without page reloads.

---

## 4. Technical Architecture & Data Strategy

### System & Component Architecture

```text
┌───────────────────────────────────────────────────────────────────────────┐
│                         App Shell (Theme + Locale Context)                │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ TopNav (3-Zone: Brand Wordmark · 5 Section Links · Primary CTA)     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
│  ┌──────────────────────────────┐   ┌──────────────────────────────────┐  │
│  │ Editorial Sections           │   │ Floating & Overlay Surfaces      │  │
│  │  • Hero + DE/EN & Theme Bar  │   │  • SlidingRightContactDrawer     │  │
│  │  • AdvisoryFocus (6 Sectors) │   │    ("Kontakt / Contact Now")     │  │
│  │  • ArtVatGuide (Interactive) │   │  • ConsultationModal / Section   │  │
│  │  • ExperienceAndBachMotif    │   │    (4-Step Scheduler + Confirm)  │  │
│  │  • IurioCollaboration        │   │  • MobileBottomBar + MoreSheet   │  │
│  │  • FeeSchedule (Tabular)     │   └──────────────────────────────────┘  │
│  │  • QuietPracticeFooter       │                                         │
│  └──────────────────────────────┘                                         │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ Calendar & Auth Services                                            │  │
│  │  • firebaseAuthService (in-memory OAuth token, Google Sign-In)      │  │
│  │  • googleCalendarApi (freeBusy query + confirmed events.insert)     │  │
│  │  • icsGenerator (RFC 5545 .ics Blob download in DE/EN)              │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State

- **App Preferences (`LocaleContext` & `ThemeContext`)**: `locale: 'de' | 'en'`, `theme: 'light' | 'dark'` synced to `document.documentElement.classList`.
- **Art VAT Scenario State**: Active buyer category (`'eu_b2b' | 'eu_b2c' | 'non_eu'`) and pitfall checklist toggle driving immediate rule, threshold (`€ 55.000`, `€ 10.000`, `13%`), and evidence breakdown.
- **Consultation Booking State**: `consultationType` (`initial` | `adhoc`), `topic`, `format` (`graz` | `video`), `selectedDate`, `selectedSlot`, `clientDetails` (`name`, `email`, `phone`, `notes`), `busySlots[]`, `pendingConfirmModal`, and `bookingReceipt`.
- **OAuth Token State**: Cached strictly in module memory (`cachedAccessToken: string | null`), cleared via `onAuthStateChanged` on sign-out (never persisted to `localStorage` or `sessionStorage`).

### Interactive Component & State Mapping

- **TopNav & MobileBottomBar**: Scroll smoothly to section IDs, open the Mobile More Sheet (containing DE/EN & Dark/Light toggles + secondary sections), or trigger `openScheduler()`.
- **SlidingRightContactDrawer**: Fixed right-edge tab translates/opens a focus-trapped slide-over drawer (`transform: translateX(...)`), offering one-tap phone/email links and consultation launch.
- **ConsultationScheduler**:
  - Validates required contact fields and email/phone format before advancing.
  - When authenticated with Google, queries `https://www.googleapis.com/calendar/v3/freeBusy` for the chosen date to disable conflicting timeslots.
  - Clicking **Add to Google Calendar** opens a dedicated confirmation modal summarizing title, start/end time, format/location, and attendee email; only upon clicking **Confirm & Create Event** does the app invoke `POST https://www.googleapis.com/calendar/v3/calendars/primary/events`.
  - Clicking **Download `.ics`** generates and downloads a valid UTF-8 `.ics` calendar file in the active language (`DE` or `EN`) immediately.

### Key Integrations & Visual Assets

- **Google Workspace OAuth & Calendar API**: Configured via `set_up_oauth` with `https://www.googleapis.com/auth/calendar.events` and `https://www.googleapis.com/auth/calendar.freebusy`, using Firebase Auth client-side popup sign-in (`firebase-applet-config.json`).
- **Editorial Visual Assets**: Generated in a single parallel batch via `generate_image` (architectural Graz office / tax advisory portrait atmosphere, fine art studio / cross-border gallery context, and modern encrypted workspace visual) with styled SVG/CSS fallbacks on every image slot.
