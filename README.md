# Martin Knopper Steuerberatung · Coded Prototype

Hi-fi prototype of a one-page website for **MMag. Martin Knopper**, tax advisor in Graz (Steuerberatung, Jurist · Betriebswirt).
Built by Emrah Özbay for the UED course ("Assignment High Fidelity Prototype") as the coded counterpart to the Figma prototype.

**Live:** https://ozbayemrah.github.io/MKnopper-Test/

> **Prototype notice:** the Erstgespräch (first consultation) request is **simulated**. Submitting the form shows a 1.2 s loading state and a confirmation screen. Nothing is stored or sent, and the form says so ("Prototyp: Die Anfrage wird in dieser Testversion nicht versendet.").

## What the site contains

One scrolling page (DE/EN, starts in light mode, optional dark mode):

| Section | Anchor | Content source |
|---|---|---|
| Hero | `#top` | "steuer?! lass ihn machen!" + portrait |
| Leistungen | `#services` | Client brochure, p. 2 ("ihre kunst. ihre praxis. …") |
| Kunst & USt | `#art-vat` | Client deck "Kunst über Grenzen" (Kunstverkauf ins Ausland) |
| Erfahrung | `#experience` | Client brochure, p. 4 + "Berufserfahrung" layouts |
| Zusammenarbeit (IURIO) | `#iurio` | Client IURIO sheet and German web block |
| Honorare | `#fees` | Client brochure, p. 5 |
| Erstgespräch | `#consultation` + modal | 3-step request: topic → date/time → contact |

All visible copy comes from the client's material (in `../Customer Logos and images/` next to this repo, not published).
**Do not paraphrase it.** The first AI Studio export invented headlines, testimonials, a rating and an FAQ; those were removed.

### Booking flow states
Topic selection, time slots, inline validation (field-level error with icon + text, plus a summary), a "Wird gesendet …" loading state, a confirmation screen, and an optional `.ics` calendar download.
There is also an optional "Mit Google anmelden" path (Firebase Google sign-in). It checks the *visitor's own* calendar for conflicts and can add the slot to it. In this prototype it never invites the practice's address.

## Brand and design system

- **Logo:** the client's original SVG (`public/brand/logo-mk.svg`), wordmark in brand orange **#EC6608**. `logo-mk-dark.svg` only swaps the navy "steuerberatung" line to white for dark backgrounds.
- **Colours:** navy `#102D69`, brand orange `#EC6608` (logo, accents, focus). Buttons use the darker action orange `#B84F05` because white on `#EC6608` only reaches 3.3:1 (WCAG AA needs 4.5:1).
- **Type:** Raleway; headlines in the client's lowercase voice.
- **Figma:** style guide, components and the clickable prototype (desktop + mobile) live in Figma file `y5XpAZX9c3Xp3fv3YfZlLi` ("MKnopper"). It also holds a click-through page with screenshots of this site and a heuristic evaluation.

## Mobile

Below 768 px the header shows the logo, the "Erstgespräch" button and a menu button. The menu sheet holds the section links (current section highlighted with "Hier sind Sie"), DE/EN and the light/dark switch.
There is no bottom navigation bar, since the booking button is always in the header.

## Run locally

Requires Node.js 22.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # TypeScript check (tsc --noEmit)
npm run build    # production build into dist/
npm run preview  # serve dist/ locally
```

No API keys are needed. `firebase-applet-config.json` is the public web config for the optional Google sign-in; the rest of the site works without it.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with `npm ci && npm run build` and publishes `dist/` to GitHub Pages.
In the repo settings, **Pages → Source must be "GitHub Actions"**. "Deploy from a branch" publishes the raw source and the page renders black.
`vite.config.ts` uses `base: "./"`, so the build works under `/MKnopper-Test/` as well as at a domain root.

## Project layout

```
src/
  App.tsx                     page assembly, theme/locale state, booking modal
  data/content.ts             all DE/EN copy (client text)
  components/                 one file per section + TopNav, BottomBarAndFooter (footer + mobile menu sheet)
  components/ConsultationScheduler.tsx   3-step booking form with all states
  services/googleCalendar.ts  optional Google free/busy + event creation
  utils/icsGenerator.ts       .ics download
public/brand/                 client logo (light/dark)
public/images/                client photos
```

## Known open points

The heuristic evaluation and the final report (both on the "Heuristic Evaluation" page in Figma) list what was fixed on 2026-11-21. Two items are still open:
- **Brand elements:** the client's § graphic and lavender cards aren't yet used across the style guide and the site.
- **FAQ:** an FAQ needs answers the client has approved; the AI-generated one was removed and stays out.

The booking modal stays mounted while closed, so closing it never discards entries. On phones, long sections collapse behind "Mehr anzeigen" (`src/components/MobileMore.tsx`).
