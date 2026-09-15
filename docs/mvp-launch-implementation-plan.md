# Sama Breath MVP launch implementation plan

Status: proposed · updated with visual-system alignment (2026-09-15)
Target: public iOS and Android MVP  
Expected delivery: 8–10 weeks with one experienced cross-platform engineer plus part-time product/design/QA

This plan converts the product requirements and UX design into gated implementation checkpoints. A checkpoint is complete only when its exit evidence exists; completing code without passing the gate does not advance the release.

## Launch definition

The public MVP includes:

- Offline four-phase breathing with presets and independently adjustable phase timing.
- Accurate tones, haptics, visual guidance, pause/resume, interruption handling, and safe session ending.
- First-run onboarding, accessible configuration, local history, streaks, and pattern totals.
- Optional HealthKit and Health Connect session writes and permission-gated health insights.
- Recorded voice guidance as an optional mode after tone-and-haptic beta validation.
- Privacy, safety, local-data deletion, store disclosures, crash monitoring, and production builds.

Daily reminders remain a stretch feature. Dark mode and direct wearable-vendor integrations are outside the MVP unless the product requirements are explicitly changed.

## Gate rules

- Checkpoints on the critical path are completed in order.
- Every gate requires reproducible test evidence, not verbal confirmation.
- A failed regression reopens the checkpoint that introduced the failure.
- Sample data, dead controls, misleading health labels, and undocumented permission prompts are release blockers.
- Health-denied and no-wearable users must pass every core breathing flow at every checkpoint.

## Current baseline

| Checkpoint | Current state | Blocking evidence |
|---|---|---|
| CP0 · Scope and build baseline | Blocked | Android targets min SDK 24 while Health Connect requires 26. The iOS bundle succeeds, but no native iOS build has run because Xcode is unavailable and the deployment target is not locked. |
| CP1 · Session correctness | Not started | Background pause, iOS interruption handling, phase restart, active-duration accounting, and completed-cycle accounting are incomplete. |
| CP2 · First-use and navigation | Not started | Onboarding and persistent primary navigation are absent. |
| CP3 · Accessibility and visual system | In progress | Canonical brand tokens, fonts, launch identity, contrast-tested text roles, responsive breathing geometry, and the immersive practice surface are implemented. Reduced motion, VoiceOver phase announcements, large-text/device visual evidence, and remaining control semantics are incomplete. |
| CP4 · Local records and user control | Not started | History details, correct aggregates, privacy, and deletion are incomplete. |
| CP5 · Health consent and data integrity | Not started | Latest historical HealthKit samples are presented as session measurements, read authorization is misreported as granted, and every ended session is submitted for a Health write. |
| CP6 · Insights and closed beta | Not started | Required health trends and beta evidence are absent. |
| CP7 · Voice and launch candidate | Not started | Recorded voice guidance is intentionally pending beta validation. |
| CP8 · Store launch and monitoring | Not started | Depends on all prior gates. |

## iOS readiness audit and disposition

Audit date: 2026-09-14

### Verified now

- TypeScript validation passes.
- Expo produces the iOS Hermes bundle successfully; the reviewed bundle was approximately 2.8 MB and contained all five tone assets.
- Generated Expo configuration includes the HealthKit entitlement and read/write purpose strings.
- The 1024×1024 App Store icon has no alpha channel.

These checks validate JavaScript packaging and configuration generation only. They do not satisfy a native build, Simulator, or physical-device gate.

HealthKit permission-state design must follow [Apple’s authorization model](https://developer.apple.com/documentation/HealthKit/authorizing-access-to-health-data): iOS intentionally does not disclose whether read access was denied, so an empty query cannot be labeled as a denial or as proof that no health records exist.

### Findings assigned to checkpoints

| Priority | iOS finding | Required disposition |
|---|---|---|
| P0 | No native iOS build or Simulator walkthrough has run because Xcode is unavailable. | CP0 provisions Xcode locally and in CI, locks the deployment target, compiles pods/New Architecture, installs, and launches on supported Simulators. |
| P0 | `initHealthKit` completing without an error is shown as “Health access granted,” although iOS does not reveal read-denial status. | CP5 replaces the false granted/denied model with platform-honest request, write, data-availability, and limited-history states. |
| P0 | The latest heart-rate sample from the previous 24 hours is labeled as a session before/after measurement. | CP5 adds exact timestamp-window queries, sample sufficiency, delayed-data handling, and honest unavailable states. |
| P0 | Incomplete and sub-60-second sessions can be written to HealthKit without durable idempotency. | CP4 adds write state/idempotency storage; CP5 gates writes and implements safe retries. |
| P0 | iOS inactive/background, lock-screen, call, and audio-interruption transitions do not pause guidance. | CP1 implements one visible paused state and verifies active-time/cue behavior through every iOS interruption path. |
| P1 | Generated iOS configuration declares microphone access and background audio even though the MVP only plays bundled foreground tones. | CP0 configures `expo-audio` for least privilege and audits the release `Info.plist`; CP7 re-enables only capabilities justified by the final voice design. |
| P1 | VoiceOver phase announcements and reduced motion are absent; fixed session geometry risks clipping with large text. | CP3 implements announcements, reduced motion, responsive geometry, and Dynamic Type testing on small iPhones. |
| P1 | Several interactive controls are smaller than Apple’s 44-point target. | CP3 enlarges phase steppers, duration chips, and End Session while preserving hierarchy. |
| P1 | iPad support is enabled and generated configuration permits all iPad orientations, but the product has no verified tablet layout. | CP0 decides whether iPad ships; CP3 adds portrait/landscape responsive tests if it remains enabled. |
| P1 | The generated minimum-version metadata and the React Native/Hermes minimum are not explicitly aligned. | CP0 sets one supported iOS deployment target in Expo configuration, native build settings, CI, and the PRD. |

## Visual-system alignment contract

Alignment date: 2026-09-15

The branding and UX documents previously described different palettes and font pairs, while the application used a third indigo/teal system. The following ownership contract now prevents further drift:

- `docs/branding-design.html` is canonical for palette, typography, logo, app icon, and launch identity.
- `docs/ux-design.html` is canonical for screen hierarchy, interaction behavior, state treatment, and accessibility handoff rules.
- `src/theme.ts` is the runtime expression of the branding tokens. Screens consume semantic roles rather than inventing local colors.
- The MVP uses the light application theme plus an immersive pine practice surface. A complete system-wide dark theme remains outside MVP.

### Implemented and verified in this alignment slice

- [x] Replaced the indigo/teal runtime palette with deep pine, living coral, quiet sky, saffron, mist, paper, and AA-safe semantic text roles.
- [x] Bundled Newsreader display weights and DM Sans interface weights for offline iOS and Android use.
- [x] Applied the font hierarchy and reduced component radii across Home, setup, practice, summary, history, progression, settings, and shared controls.
- [x] Rebuilt the practice screen as an immersive pine surface with brand-coded phase forms, bright labels, responsive breathing geometry, progress, paused treatment, and mock-aligned circular controls.
- [x] Replaced the indigo spiral app icon, adaptive icon foreground, favicon, and blank splash treatment with the canonical pine/sky/coral breath mark.
- [x] Updated the product requirements and both design documents to state the source-of-truth contract and use the same semantic phase palette.
- [x] Added `npm run check:theme`; 14 normal-text pairs, four large phase-number pairs, and one non-text focus pair pass their WCAG thresholds.
- [x] `npm run typecheck` passes, and Expo production exports for both iOS and Android include only the six selected font files.

### Evidence still required

- [ ] Capture and approve Home, setup, all four practice phases, paused, completion, history, progression, and settings on representative iOS and Android devices.
- [ ] Repeat visual review at 100%, 150%, and 200% text sizes on the smallest and largest supported phones.
- [ ] Validate icon safe areas on iOS masks and representative Android adaptive-icon masks.
- [ ] Complete VoiceOver/TalkBack, reduced-motion, and non-color phase-cue testing before CP3 can pass.

## CP0 · Lock scope and establish a buildable baseline

Target: Week 1

### Implementation checklist

- [ ] Resolve the phase-range conflict in the documents and code. Recommended contract: inhale/exhale `1–20s`; either hold may be `0–20s`, where zero is explicitly labeled “Skip.” If every phase must be `1–20s`, remove the zero-second 4-7-8 phase.
- [ ] Define the pre-session and post-session heart-rate windows, minimum sample counts, and delayed-data behavior before implementing comparisons.
- [ ] Define supported iOS and Android versions. Set Android min SDK to at least 26 and set an explicit iOS deployment target compatible with the selected Expo/React Native/Hermes versions; record both decisions in the PRD.
- [ ] Provision and select a supported Xcode version locally and in CI, accept required licenses, install the selected iOS Simulator runtimes, and record the toolchain versions.
- [ ] Decide whether iPad is in the MVP. If not, disable tablet support; if it is, lock supported orientations and add tablet layouts to the device matrix.
- [ ] Configure `expo-audio` for least privilege in the test build: disable microphone permission/recording and background playback unless a reviewed feature requires them.
- [ ] Inspect the generated release `Info.plist` and entitlements. Remove unjustified microphone, background-audio, local-network, Bonjour, and development-client declarations from production artifacts.
- [ ] Verify the `react-native-health` New Architecture patch against the selected Xcode, iOS SDK, React Native version, and CocoaPods build rather than assuming the existing patch is sufficient.
- [ ] Add stable `typecheck`, unit-test, and build scripts to `package.json`.
- [ ] Add CI gates for clean install, TypeScript, unit tests, Android debug build, and an unsigned iOS simulator build.
- [ ] Audit the current dependency warnings and vulnerabilities; document accepted transitive risks and upgrade actionable direct dependencies.
- [ ] Confirm that a clean Expo prebuild does not create tracked source changes.
- [ ] Produce and inspect an iOS release-mode JavaScript bundle in CI; retain its bundle size and asset inventory as evidence.
- [ ] Create a lightweight release evidence template containing build IDs, test devices, test results, known issues, and approvers.

### Exit evidence

- [ ] `npm ci` and TypeScript validation pass from a clean checkout.
- [ ] Android installs and opens on the oldest supported API and the current API.
- [ ] iOS installs and opens on the oldest supported simulator and the current simulator.
- [ ] A clean native iOS build completes with no deployment-target, pod, entitlement, signing-capability, or New Architecture errors.
- [ ] The archived release `Info.plist` contains only justified privacy and background capabilities and reports the locked minimum iOS version.
- [x] The App Store source icon is 1024×1024 and contains no alpha channel (verified 2026-09-14).
- [ ] CI produces repeatable build artifacts for both platforms.
- [ ] Product decisions for phase ranges and health windows are reflected consistently in the PRD, UX document, and tests.

Gate: no core UX implementation proceeds on an unbuildable platform baseline.

## CP1 · Make session timing and lifecycle trustworthy

Target: Weeks 2–3

### Implementation checklist

- [ ] Use a monotonic elapsed-time source for foreground timing; keep wall-clock timestamps only for record boundaries.
- [ ] Add explicit engine operations for pausing, restarting the interrupted phase, resuming after a short countdown, and ending.
- [ ] Subscribe to app lifecycle and audio-interruption events. Backgrounding, screen locking, calls, and unsafe audio interruptions must enter the same visible paused state.
- [ ] On iOS, handle both `inactive` and `background` transitions, including Notification Center/Control Center, app switching, calls, alarms, Siri, route changes, and device locking.
- [ ] Create a dedicated paused presentation that names the state and keeps Resume and End available.
- [ ] Keep the screen awake only while guidance is actively running.
- [ ] Track active elapsed time separately from paused wall time.
- [ ] Store completed cycles, allowing zero for a session ended during its first cycle.
- [ ] Prevent duplicate completion and end actions while persistence/navigation is pending.
- [ ] Add a session initialization state so health/settings reads cannot look like a frozen active timer.
- [ ] Make the requested duration and actual whole-cycle duration explicit before starting.
- [ ] Ensure tones and haptics fire exactly once per active phase boundary and do not fire while paused.
- [ ] Configure the iOS audio session deliberately: validate silent-switch behavior, mixing/ducking with other audio, interruption recovery, Bluetooth route changes, and deactivation after practice.
- [ ] Add engine tests for all presets, skipped phases, long phases, pause/resume, app resume, delayed ticks, and completion boundaries.

### Exit evidence

- [ ] A five-minute foreground session finishes within ±250 ms on representative iOS and Android devices.
- [ ] Locking or backgrounding always returns to an unmistakable paused state.
- [ ] Resuming restarts the interrupted phase after the documented countdown.
- [ ] Summary duration excludes paused time and cycle count includes only completed cycles.
- [ ] Force-quit does not create a completed record.
- [ ] Tones, haptics, and the displayed phase remain synchronized during a 30-minute soak test.
- [ ] On physical iPhone, locking or interrupting the app produces no background phase tones and no elapsed guidance time while paused.
- [ ] Silent-switch and other-audio behavior matches the locked product decision without unexpectedly stopping the user’s existing audio.

Gate: timer drift, stale active UI, unsafe ending, or incorrect duration/cycle accounting blocks CP2.

## CP2 · Implement the first-use journey and primary navigation

Target: Week 3

### Implementation checklist

- [ ] Add three first-run screens: value, safety, and cue preferences.
- [ ] Persist onboarding completion locally and provide a Settings route to revisit safety/cue information.
- [ ] Do not request health permission during onboarding or app launch.
- [ ] Make Home show the last-used duration and all four phase values without requiring navigation.
- [ ] Keep the default/last practice immediately startable; make presets and phase editing optional.
- [ ] Recalculate cycle length, estimated whole cycles, actual duration, and guided cadence after every phase or duration change.
- [ ] Persist configuration changes and restore them on the next launch.
- [ ] Implement persistent primary navigation for Breathe, Progress, History, and Settings so every empty state is reachable.
- [ ] Preserve navigation state safely around an active session and prevent accidental navigation away from it.
- [ ] Add loading and recoverable error states for storage reads and missing session IDs.

### Exit evidence

- [ ] A new user reaches a ready-to-start practice after the three short onboarding screens.
- [ ] A returning user can start the last-used practice with one primary action from Home.
- [ ] `4–4–6–4` is selectable in one action and editable phase by phase.
- [ ] Every top-level destination is reachable with and without prior sessions.
- [ ] No permission prompt appears before contextual explanation.

Gate: five moderated first-use tests must complete setup and start a session without facilitator correction.

## CP3 · Meet the accessibility and visual quality bar

Target: Week 4

### Implementation checklist

- [x] Replace failing text colors with tokens that meet WCAG AA on every used surface.
- [ ] Support Dynamic Type without truncating phase labels, countdowns, safety copy, values, or primary actions.
- [ ] Make session and setup layouts responsive on the smallest supported phone and at 200% text size.
- [ ] Replace the fixed 280-point breathing geometry with bounded responsive sizing so the phase, countdown, controls, and safety actions remain visible on a small iPhone at large text sizes.
- [ ] Add screen-reader labels, roles, selected/disabled states, values, and hints to presets, duration chips, steppers, switches, charts, and session controls.
- [ ] Announce phase changes, pause, resume countdown, completion, and recoverable errors without overwhelming the user.
- [ ] Respect the system reduced-motion preference and expose the documented setting. Keep the breathing shape static while retaining count, label, tone, and haptic cues.
- [ ] Ensure phase meaning never depends on color or animation alone.
- [ ] Use at least 44×44 pt iOS and 48×48 dp Android touch targets with visible pressed/focus states.
- [ ] Increase the current 40-point phase steppers, compact duration chips, and End Session target to at least 44×44 points on iOS.
- [ ] Give charts accessible summaries and expose their date range, unit, and missing-data state as text.

### Exit evidence

- [ ] VoiceOver and TalkBack users can configure, start, pause, resume, end, and review a session.
- [ ] All screens pass at 100%, 150%, and 200% text size on smallest and largest supported layouts.
- [ ] If iPad remains supported, every screen passes portrait and landscape review on standard and large iPads without phone-width stretching or unsafe empty space.
- [ ] Reduced-motion mode contains no scaling breathing animation.
- [ ] Automated contrast checks and manual spot checks pass AA.
- [ ] Core guidance remains usable with visual-only, tone-only, and haptic-only cues.

Gate: any inaccessible core guidance path remains a release blocker.

## CP4 · Correct local records, progression, privacy, and user control

Target: Weeks 4–5

### Implementation checklist

- [ ] Add versioned SQLite migrations for guided cadence, completed-cycle count, health-write state, idempotency key, and timestamped biometric summaries.
- [ ] Group History by local calendar day and show pattern timing, active duration, completed cycles, completion state, health sync state, and available HR comparison.
- [ ] Make history records selectable and provide an honest detail/error state.
- [ ] Aggregate progression from completed sessions only unless ended sessions are explicitly shown as a separate measure.
- [ ] Key custom-pattern totals by all four timing values, not only the name “Custom.”
- [ ] Implement current and longest streaks with deterministic timezone-change behavior.
- [ ] Add Summary fields for guided cadence, measured-data availability, sample sufficiency, and health-write status.
- [ ] Add Privacy, Safety & wellbeing, and Delete local history to Settings.
- [ ] Require an in-page deletion confirmation that explains system Health records are not deleted.
- [ ] Ensure deletion removes local sessions and derived aggregates without touching preferences.
- [ ] Decide the reminder stretch feature at this gate; cut it cleanly if it threatens health/accessibility hardening.

### Exit evidence

- [ ] Seeded completed and ended sessions render correctly in History, Summary, and Progress.
- [ ] Paused and ended time cannot inflate completed-practice totals.
- [ ] Two different custom timings produce separate pattern totals.
- [ ] Streak tests pass across midnight, daylight-saving transitions, and timezone changes.
- [ ] Local deletion passes confirmation, restart, and system-Health-disclosure tests.

Gate: incorrect totals, irreversible deletion ambiguity, or missing privacy controls blocks health integration completion.

## CP5 · Implement contextual health consent and data integrity

Target: Weeks 5–6

### Implementation checklist

- [ ] Offer session-write permission only after the first qualifying completed session.
- [ ] Explain each read category and the mindful-session write separately before opening the native permission UI.
- [ ] Model platform-honest permission states. On iOS, never claim that read access is granted or denied: represent not requested, request completed, limited-history start date when available, data available, and no accessible data. Track write authorization/results separately.
- [ ] Replace the iOS “Health access granted” alert with neutral completion copy and route users to data availability or Health settings guidance.
- [ ] Detect Health Connect availability separately from generic Android platform support.
- [ ] Never use a latest historical value as a session measurement.
- [ ] Split HealthKit APIs into explicit latest-historical, exact-session-window, trend, and mindful-session-write operations so their results cannot be mislabeled by consumers.
- [ ] Query timestamped session HR/respiratory samples only for the locked windows and retain timestamps/source metadata needed for labeling.
- [ ] Show sample counts and window definitions for before/after comparisons; render insufficient samples as unavailable.
- [ ] Treat delayed post-session samples as a later update rather than inventing an immediate result.
- [ ] Do not write sessions shorter than 60 seconds.
- [ ] Write only qualifying completed sessions to HealthKit; intentionally ended sessions remain local unless the PRD explicitly changes.
- [ ] Add an idempotent health-write queue with pending, written, denied, unavailable, and failed states.
- [ ] Guarantee one local session creates at most one system Health record.
- [ ] Stop retrying permanent denials; retry only transient failures on a later app open.
- [ ] Keep every breathing, history, and summary flow usable without permission or wearable data.
- [ ] Make the HealthKit read purpose string explicitly match all requested categories, including resting heart rate, and verify the native permission sheet wording on a physical iPhone.

### Exit evidence

- [ ] Physical iOS and Android tests pass for full, partial, denied, revoked, and unavailable permissions.
- [ ] iOS tests do not infer read denial from an empty result and distinguish “no accessible data” from write authorization failure.
- [ ] Sparse, delayed, mixed-source, and absent records produce honest labels and gaps.
- [ ] Qualifying sessions write once; sub-60-second sessions never write.
- [ ] Reopening/retrying cannot duplicate a system Health record.
- [ ] Every displayed health value includes unit, time/range, and availability context.

Gate: stale data labeled as current, duplicate/incorrect-time writes, or premature permission prompts are release blockers.

## CP6 · Complete insights and run the tone/haptic closed beta

Target: Weeks 6–7

### Implementation checklist

- [ ] Add 7-day and 30-day selectors for resting heart rate, HRV, and mindful minutes.
- [ ] Query and chart actual dated samples with units, gaps, date range, and coverage notes.
- [ ] Keep local practice trends, pattern totals, and streaks visible when health data is missing.
- [ ] Add a useful no-wearable/denied empty state with connection guidance.
- [ ] Keep measured respiratory rate visually and semantically separate from guided cadence.
- [ ] Complete the physical-device matrix: oldest/current iOS, current iPhones, oldest/current Android, Pixel, Samsung, no Health Connect, and representative wearables.
- [ ] Include a small iPhone, current standard/large iPhones, and—if supported—portrait/landscape iPads in visual regression evidence.
- [ ] Run timer, interruption, audio route, silent-mode, battery-saver, timezone, accessibility, and offline regression suites.
- [ ] Distribute the tones-and-haptics build to 20–50 closed-beta testers for at least seven days.
- [ ] Collect consented crash data and a minimal feedback set covering cue clarity, volume, haptic comfort, start success, completion, and failures.
- [ ] Triage every beta issue into launch blocker, launch fix, or documented post-launch work.

### Exit evidence

- [ ] All required 7/30-day views pass seeded-data and real-device verification.
- [ ] No-data and partial-data states remain useful and navigable.
- [ ] Closed beta records at least 99.5% crash-free sessions and 70% completion, or product explicitly approves a documented exception.
- [ ] Cue timing and comprehension are validated before voice scripts are finalized.
- [ ] No open P0/P1 defect remains in build, timer, accessibility, consent, data integrity, or privacy.

Gate: voice production begins only after beta cue findings are resolved and signed off.

## CP7 · Add recorded voice and produce the launch candidate

Target: Week 8

### Implementation checklist

- [ ] Finalize concise voice scripts using beta evidence and safety/brand review.
- [ ] Record and master professional assets; do not use synthetic speech.
- [ ] Add Tones, Recorded voice, and Visual only as explicit guidance modes, with haptics independently selectable.
- [ ] Use the same engine phase-boundary events for every guidance mode.
- [ ] Handle audio focus, interruptions, Bluetooth route changes, silent mode, missing assets, and fallback to tones.
- [ ] Re-audit the iOS microphone and background-audio capabilities after recorded voice is implemented; voice playback alone must not enable microphone recording.
- [ ] Bundle all assets for fully offline operation.
- [ ] Regression-test every supported cue combination and reduced-motion state.
- [ ] Freeze user-facing strings and complete accessibility, localization-readiness, privacy, and legal reviews.
- [ ] Remove sample data, dead links, debug UI, and unfinished controls.
- [ ] Produce signed release-candidate builds and run the complete launch regression suite.

### Exit evidence

- [ ] Voice, tone, haptic, and visual phase boundaries remain synchronized in soak tests.
- [ ] Missing or interrupted audio fails safely without stopping the timer.
- [ ] Every guidance combination works offline on both platforms.
- [ ] Signed release candidates pass the full device and permission matrix.
- [ ] Product, design, engineering, QA, and privacy owners approve the release evidence.

Gate: the public store build cannot ship without the documented recorded-voice option or an explicit PRD scope change.

## CP8 · Store submission, rollout, and monitoring

Target: Weeks 9–10

### Implementation checklist

- [ ] Publish the privacy policy and support contact.
- [ ] Reconcile Apple privacy labels, Google Play Data Safety answers, permission copy, SDK behavior, and the privacy policy.
- [ ] Verify the archived iOS binary does not declare microphone, background audio, local-network discovery, or other capabilities that the production app does not use.
- [ ] Prepare app name, subtitle, descriptions, wellness disclaimer, review notes, icon, and required screenshots.
- [ ] Verify production signing, versioning, crash reporting, and symbol/mapping uploads.
- [ ] Submit iOS and Android builds with clear HealthKit/Health Connect review instructions.
- [ ] Prepare a rollback/hotfix owner, decision path, and tested patch build procedure.
- [ ] Use a staged rollout where supported and monitor crashes, starts, completions, permission failures, and health-write failures without collecting health values.
- [ ] Review feedback daily during the initial rollout and pause rollout on any launch-stop condition.

### Final go/no-go checklist

- [ ] Every must-have PRD acceptance criterion has linked evidence.
- [ ] Closed beta has at least seven stable days.
- [ ] No open release blocker or P0/P1 defect remains.
- [ ] Health-denied users can complete every core flow.
- [ ] No duplicate, zero-length, stale-labeled, or incorrect-time health record is observed.
- [ ] VoiceOver, TalkBack, Dynamic Type, reduced motion, offline, and interruption suites pass.
- [ ] Physical-iPhone HealthKit, silent-switch, haptic, lock-screen, audio-route, and permission-copy suites pass; Simulator-only evidence is insufficient.
- [ ] Store disclosures match the shipped binary.
- [ ] Rollback and hotfix ownership is active.

Gate: release only with unanimous product, engineering, QA, and privacy go/no-go approval.

## Recommended implementation order by code area

1. `app.json`, package scripts, and CI: restore buildability and repeatable evidence.
2. `src/engine/` and `app/session.tsx`: timing, lifecycle, pause/resume, and active-duration correctness.
3. Routing, onboarding, Home/setup, and primary navigation: complete the first-use and returning-user journeys.
4. Theme and shared controls: accessibility, contrast, reduced motion, and reusable interaction states.
5. SQLite schema, History, Summary, Progress, and Settings: correct records and user control.
6. `src/health/`: consent states, windowed reads, idempotent writes, and delayed data.
7. Insights charts and physical-device beta hardening.
8. Recorded voice, store assets, release candidate, and staged rollout.

## Definition of done for every task

- [ ] Implementation is covered by an automated test where practical.
- [ ] Loading, empty, denied, unavailable, error, and success states are handled.
- [ ] Screen-reader and large-text behavior is reviewed for changed UI.
- [ ] No health or medical claim is introduced.
- [ ] Offline behavior is unchanged or explicitly tested.
- [ ] Documentation and acceptance criteria are updated with the code.
- [ ] The change is demonstrated on both iOS and Android before checkpoint sign-off.
