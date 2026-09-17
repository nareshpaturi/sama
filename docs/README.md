# Sama Breath — docs

Product and design documentation for the Sama Breath app. The `.html` files
are self-contained exports — open any of them in a browser.

Visual-system ownership: `branding-design.html` is canonical for palette,
typography, logo, and launch identity; `ux-design.html` is canonical for screen
hierarchy, interaction behavior, and state treatment. The runtime mapping lives
in `src/theme.ts`.

| File | What it is |
|---|---|
| `product-requirements.html` | Lean MVP product specification (v1.4): fastest safe launch scope, requirements, data model, tones/haptics guidance, optional health-session writing, and post-MVP boundaries |
| `ux-design.html` | UX design: user flows, interactive mockups, progressively disclosed timer setup, focused practice, safe completion, and post-MVP progression concepts |
| `branding-design.html` | Brand and design direction: "Sama" / "Sama Breath", positioning ("Breathe by your numbers."), logo concept, color and typography systems, launch copy |
| `market-research.html` | Breathwork app market research: competitive landscape, positioning gaps, differentiation |
| `research/market-fit-report.md` | Raw market-fit research notes behind the market research doc |
| `mvp-launch-implementation-plan.md` | Checkpointed implementation, validation, beta, and store-launch plan |

Related: the app itself lives in `app/` and `src/`; the local testing guide is
in the repo-root `README.md`.
