# Sama Breath — docs

Start with the [design review](design-review.md): its **v3 direction** section is the shared decision contract. Then open the [brand guide](branding-design.html) and [UX mocks](ux-design.html) side by side in a browser. All three were revised on September 22, 2026.

The direction is **“Your breath. Your rhythm.” · Pranayama, guided at your pace.** Sama is a free, offline pranayama companion for practitioners, and for beginners who want to follow a technique properly. v1.0 ships eight gentle techniques with sourced guides, flexible rhythms, bundled AI voice cues, My rhythms, share links for teachers, and app-icon quick actions. v1.1 adds routines, gentle progression, a practice calendar without streaks, an optional daily reminder, and Apple Health / Health Connect session writing.

| Document | Purpose |
|---|---|
| [Design review](design-review.md) | v3 decision contract (positioning, release plan, feature rules, content governance, AI voice, typography, share-link safety, success signals) plus the v2 history |
| [Brand guide](branding-design.html) | Positioning and audiences, naming practices, breath mark, semantic palette, practice cue components, voice and spoken-voice rules, launch copy and link preview |
| [UX mocks](ux-design.html) | Feature map linked to 64 screen specimens across v1.0, v1.1, and later concepts; journeys; state contract; guidance and accessibility handoff |
| [Product requirements](product-requirements.html) | v2.0 scope and testable behavior for v1.0 and v1.1 |
| [Launch implementation plan](mvp-launch-implementation-plan.md) | Gated checkpoints for v1.0, the v1.1 track, and historical implementation evidence |
| [Market research](market-research.html) | Research snapshot and opportunity hypotheses |
| [Research notes](research/market-fit-report.md) | Supporting research and unverified items behind the market brief |

The brand guide owns identity, color roles, typography, component geometry, and voice. The UX guide owns screen hierarchy, navigation, interaction, and state treatment. The design review records the decisions both must follow. Product requirements describe the resulting scope and behavior.

The HTML files contain their own styles and mockup markup. Open them directly in a browser; no app build is needed. Google Fonts improves the presentation when available; local serif and system sans fallbacks work offline. The UX viewer needs JavaScript for scene changes. Its controls only change documentation specimens: no timer, audio, voice, haptics, links, quick actions, notifications, storage, Health access, or native permissions run. Technique copy in the mocks is illustrative until the sourced content pass is complete.

The September 22 revision changes **documentation and mockups only**. Application code, app assets, native configuration, and implementation checkpoint status are unchanged. `src/theme.ts` is the existing runtime mapping, not evidence that the design has been implemented.
