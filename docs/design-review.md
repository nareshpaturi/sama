# Sama Breath design review

Reviewed September 18, 2026. Scope: the product, branding, UX, and launch documentation in this folder. This is a design review and documentation revision; the installed app and runtime implementation were not evaluated or changed.

The strongest existing assets were the deep-pine practice surface, Newsreader/DM Sans pairing, approachable breath mark, and ready-to-start default. The main problem was disagreement between the promise, the screens, and the lean launch scope. The revised direction keeps the visual foundation and makes the experience more coherent.

## Findings and resolutions

| Priority | Finding in the previous docs | Revised direction |
|---|---|---|
| High | The lead line “Breathe by your numbers” and health-centric launch copy suggested measurement and wearable insights. The lean MVP deferred those capabilities. | Use **“Your breath. Your rhythm.”** Lead with a simple, personal breathing practice. Keep optional Health logging secondary; omit wearable outcomes from launch copy. |
| High | UX navigation exposed Insights and sample-data controls alongside MVP screens. Completion showed unavailable biometric cards. | Use Breathe, History, Settings. Remove Insights from the launch journey and biometric placeholders from the summary. Put illustrative-state controls outside the phone. |
| High | The mock timer lacked the documented settling/end behavior, resumed from a new session, and did not reach a truthful completion boundary. | Replace the apparent running app with an explicitly labeled state viewer. Show settling, all four phases, pause, resume countdown, end confirmation, complete, and ended-early states. Document the intended behavior without implying a validated timer. |
| High | Five minutes and 18 box-breathing cycles were presented together; 18 × 16 seconds is 4:48. | Disclose the whole-cycle rule before Begin. A five-minute target becomes **19 cycles / 5:04** at 4–4–4–4, or **17 cycles / 5:06** at 4–4–6–4. |
| High | Health reads, recorded voice, and reminders were marked deferred in some sections but required for launch elsewhere. Early-ending eligibility also conflicted. | Align PRD and design with the lean launch plan: tones/haptics, local history, optional session writing. Only completed practices of at least 60 seconds qualify for Health export; intentionally ended practices remain local. |
| Medium | The hero mark, primary mark, and onboarding illustration used different constructions. Phase colors and coral’s meaning also conflicted. | Reuse the existing full breath mark in brand and onboarding. Reserve sky/inhale, saffron/hold after inhale, coral/exhale, and mist/rest. Deep clay denotes deletion. |
| Medium | Optional setup crowded Home, used tiny phase steppers, and repeated “Hold” without distinguishing the recovery phase. | Keep the ready practice and Begin on Home. Move editing to an optional setup surface with full labels, comfortable controls, and a persistent Use this rhythm action. |
| Medium | User-facing copy explained test builds and recording plans. Completion presumed calm, and progression emphasized streaks. | Use concise product language: “Choose your cues,” “Take your time,” “A little space, made.” Acknowledge the practice without judging consistency or asserting a feeling. |
| Medium | Missing/error/permission states were described unevenly, and some settings rows were dead controls. | Add clear Health outcomes, local-save failure and leave confirmation, privacy/safety views, history details, and deletion confirmation/result. Specify loading and failure copy in the state contract. |
| Medium | Several HTML sections contained malformed tags, and the mock’s stated behavior differed from its controls. | Rebuild the two visual guides with consistent structure and clear documentation-only behavior. Repair malformed PRD scope markup and link the ownership contract. |

## Decisions shared by branding and UX

| Decision | Brand expression | UX expression |
|---|---|---|
| Product naming | Sama in conversation; Sama Breath for store identity | Sama on Home; familiar task names in navigation |
| Primary line | Your breath. Your rhythm. | Same welcome headline; customization supports personal choice |
| Descriptor | Guided breathing, at your pace. | Adjustable timing and independent optional cues |
| Surfaces | Paper and mist, anchored by pine | Paper everyday screens; immersive pine practice; mist completion |
| Typography | Newsreader 500 for display; DM Sans for interface | Serif titles; readable sans copy, controls, and tabular countdowns |
| Color semantics | Sky, saffron, coral, mist in phase order | Inhale, Hold after inhale, Exhale, Rest; names and numbers remain visible |
| Shape and spacing | 4/8/12/16/24/32/48 spacing; 12 px controls, 16 px cards, 24 px sheets | Predictable insets and control groups; circles reserved for the guide and simple status marks |
| Voice | Warm, specific, unhurried | Begin, Pause, Resume, End session, Done, Breathe again |
| Progress | A useful record of practice | Local History without scores, streaks, or outcome claims |
| Health | Optional convenience, outside the lead promise | Contextual write-only invitation and independent local-save status |

## Interaction decisions

First use is Welcome → comfort guidance → cue preferences → Breathe. Returning users can begin the current practice with one primary action. Customization is optional and returns to Breathe with the selected rhythm.

Duration choices are targets, not exact cutoffs. Finish the cycle that reaches the target and disclose the resulting duration. The default 5-minute target uses 19 complete 16-second cycles. Three-second settling countdowns and paused time are excluded. Restarting an interrupted phase preserves prior active time and completed-cycle count, so the actual active duration can exceed the original plan after a pause. Completion reports actual values rather than repeating the target.

End pauses first. Keep breathing goes through the resume countdown; dismissing the confirmation leaves the practice paused. End session stores an explicitly ended-early record, including zero complete cycles when appropriate. That record is never offered for Health export.

Completion is useful without a connection: actual time, complete cycles, pattern, guided pace, and local-save result. “Added to Apple Health” or “Added to Health Connect” appears only after a confirmed write. Native permissions remain a system handoff; the documentation does not simulate granting them.

The mock uses fixed records for History, early ending, and detail views. Setup and its corresponding summary update for review. It is intentionally a collection of design states, not a working breathing engine or a persistent session history.

## Validation and boundaries

Reviewed both HTML guides in Chromium at desktop and narrow browser widths. All 32 UX specimens were checked at 320, 390, 768, and 1440 px widths with no horizontal clipping in the viewer. Setup bounds (1–20 seconds), preset arithmetic, Begin/pause/resume navigation, and shared cue preferences passed the document interaction checks; no script errors were reported.

The two guides use identical shared tokens and mark construction. HTML nesting, local document links, and section anchors were checked. Text contrast was calculated for the documented surface pairs: muted text on mist is 5.33:1; paper on pine is 12.63:1. Pine on coral is reserved for the large countdown (4.15:1); small coral-surface labels use the darker text role. The larger-text preview and contrast checks are design evidence, not a native accessibility certification.

Only documentation files changed. No app builds, native permission flows, physical-device haptics, actual timing, screen-reader behavior, local persistence, or Health writes were tested. Existing implementation checkpoint evidence remains historical and has not been advanced.

Before implementation sign-off:

- Review the whole-cycle duration disclosure with users; confirm they understand the difference between a target and planned practice time.
- Check phase comprehension, especially Hold after inhale versus Rest, and tone/haptic distinction on physical devices.
- Verify small phones, system text sizes at 100/150/200%, VoiceOver/TalkBack, safe areas, and reduced-motion behavior.
- Confirm small icon reproduction and platform masks using exported assets. Name and cultural-language clearance remain prelaunch tasks.
- Match store claims and privacy wording to the exact released capabilities. Health writing can be omitted cleanly if it delays the core release.

The research documents retain their original opportunity hypotheses. They are background material, not instructions to add deferred features to the launch experience.
