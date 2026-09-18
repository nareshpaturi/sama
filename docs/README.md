# Sama Breath — docs

Start with the [design review](design-review.md), then open the [brand guide](branding-design.html) and [UX mocks](ux-design.html) side by side in a browser. Both are v2, aligned on September 18, 2026.

The direction is **“Your breath. Your rhythm.”** The launch experience centers on a free, offline breathing practice, adjustable timing, optional cues, and local history. Health session writing is optional; wearable insights and recorded voice remain post-MVP.

| Document | Purpose |
|---|---|
| [Brand guide](branding-design.html) | Positioning, naming, shared breath mark, semantic palette, type and component rules, voice, app specimens, and launch copy |
| [UX mocks](ux-design.html) | Clickable state viewer, first use, setup, practice, completion, history, settings, optional Health states, and accessibility handoff |
| [Design review](design-review.md) | Findings, resolved inconsistencies, brand-to-UX decisions, validation, and remaining design checks |
| [Product requirements](product-requirements.html) | v1.5 MVP scope and behavior, aligned with the revised design and the optional write-only Health boundary |
| [Launch implementation plan](mvp-launch-implementation-plan.md) | Existing gated plan and historical implementation evidence, with a separate v2 design handoff note |
| [Market research](market-research.html) | Research snapshot and opportunity hypotheses; not the current launch scope |
| [Research notes](research/market-fit-report.md) | Supporting research and unverified items behind the market brief |

The brand guide owns identity, color roles, typography, component geometry, and voice. The UX guide owns screen hierarchy, navigation, interaction, and state treatment. Shared decisions must agree across both. Product requirements describe the resulting scope and behavior.

The HTML files contain their own styles and mockup markup. Open them directly in a browser; no app build is needed. Google Fonts enhances the presentation when available; local serif and system sans fallbacks remain usable offline. The UX viewer needs JavaScript for scene changes. Its controls only change documentation specimens: no timer, audio, haptics, storage, Health access, or native permissions run. Review controls and illustrative data are outside the product experience.

The September 18 revision changes **documentation and mockups only**. Application code, app assets, native configuration, and implementation checkpoint status are unchanged. `src/theme.ts` is the existing runtime mapping, not evidence that the new design has been implemented.
