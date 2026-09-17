# Sama Breath MVP launch implementation plan

Status: proposed · lean-scope update (2026-09-17)
Target: fastest safe public iOS and Android MVP  
Expected delivery: 5–7 weeks with one experienced cross-platform engineer plus part-time product/design/QA; health-session writing may follow in a rapid point release if native integration threatens the core launch date

This plan converts the product requirements and UX design into gated implementation checkpoints. A checkpoint is complete only when its exit evidence exists; completing code without passing the gate does not advance the release.

## Launch definition

The public MVP includes:

- Offline four-phase breathing with presets and independently adjustable phase timing.
- Accurate tones, haptics, visual guidance, pause/resume, interruption handling, and safe session ending.
- First-run onboarding, progressively disclosed accessible configuration, and local session history.
- Optional HealthKit and Health Connect session writing when it is stable and does not delay the core release.
- Privacy, safety, local-data deletion, store disclosures, crash monitoring, and production builds.

Recorded voice, wearable reads, biometric comparisons, trend insights, streaks, pattern aggregates, daily reminders, tablet-specific layouts, dark mode, and direct wearable-vendor integrations are post-MVP. They must not delay the first public release.

## Gate rules

- Checkpoints on the critical path are completed in order.
- Every gate requires reproducible test evidence, not verbal confirmation.
- A failed regression reopens the checkpoint that introduced the failure.
- Sample data, dead controls, misleading health labels, and undocumented permission prompts are release blockers; unfinished post-MVP destinations are removed from production navigation.
- Health-denied and no-wearable users must pass every core breathing flow at every checkpoint.
- A post-MVP feature cannot enter the critical path unless the core release is already passing and the feature has complete evidence.

## Current baseline

| Checkpoint | Current state | Blocking evidence |
|---|---|---|
| CP0 · Scope and build baseline | Blocked | Android targets min SDK 24 while Health Connect requires 26. The iOS bundle succeeds, but no native iOS build has run because Xcode is unavailable and the deployment target is not locked. |
| CP1 · Session correctness | Not started | Background pause, iOS interruption handling, phase restart, active-duration accounting, and completed-cycle accounting are incomplete. |
| CP2 · First-use and navigation | Not started | Onboarding and lean Breathe/History/Settings navigation are absent. |
| CP3 · Accessibility and visual system | In progress | Canonical brand tokens, fonts, launch identity, contrast-tested text roles, responsive breathing geometry, and the immersive practice surface are implemented. Reduced motion, VoiceOver phase announcements, large-text/device visual evidence, and remaining control semantics are incomplete. |
| CP4 · Local records and user control | Not started | History details, correct aggregates, privacy, and deletion are incomplete. |
| CP5 · Health consent and data integrity | Not started | Latest historical HealthKit samples are presented as session measurements, read authorization is misreported as granted, and every ended session is submitted for a Health write. |
| CP6 · Core beta and launch candidate | Not started | Core breathing beta evidence and release-candidate validation are absent. |
| CP7 · Store launch and monitoring | Not started | Depends on CP0–CP6 only. |
| Post-MVP · Voice and insights | Deferred | Recorded voice, wearable reads, trends, streaks, and richer progression follow launch. |

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

- [ ] Apply the locked phase contract in code and tests: all four phases are `1–20s` in whole seconds for MVP. Zero-second skipped phases and named 4-7-8 coaching are post-MVP.
- [ ] Define the pre-session and post-session heart-rate windows, minimum sample counts, and delayed-data behavior before implementing comparisons.
- [ ] Define supported iOS and Android versions. Set Android min SDK to at least 26 and set an explicit iOS deployment target compatible with the selected Expo/React Native/Hermes versions; record both decisions in the PRD.
- [ ] Provision and select a supported Xcode version locally and in CI, accept required licenses, install the selected iOS Simulator runtimes, and record the toolchain versions.
- [ ] Disable iPad/tablet support for the first MVP; tablet-specific layouts and orientation validation are post-MVP.
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
- [ ] Add explicit engine operations for the three-second pre-session countdown, pausing, restarting the interrupted phase, resuming after the same countdown, requesting end confirmation, and ending.
- [ ] Subscribe to app lifecycle and audio-interruption events. Backgrounding, screen locking, calls, and unsafe audio interruptions must enter the same visible paused state.
- [ ] On iOS, handle both `inactive` and `background` transitions, including Notification Center/Control Center, app switching, calls, alarms, Siri, route changes, and device locking.
- [ ] Create a dedicated paused presentation that names the state and keeps Resume and End available.
- [ ] Keep the screen awake only while guidance is actively running.
- [ ] Track active elapsed time separately from paused wall time.
- [ ] Store completed cycles, allowing zero for a session ended during its first cycle.
- [ ] Prevent duplicate completion and end actions while persistence/navigation is pending.
- [ ] Add a session initialization state so health/settings reads cannot look like a frozen active timer.
- [ ] Make the requested duration and expected whole-cycle behavior explicit before starting; MVP duration choices are 1, 3, 5, and 10 minutes.
- [ ] Ensure tones and haptics fire exactly once per active phase boundary and do not fire while paused.
- [ ] Configure the iOS audio session deliberately: validate silent-switch behavior, mixing/ducking with other audio, interruption recovery, Bluetooth route changes, and deactivation after practice.
- [ ] Add engine tests for all MVP durations, 1–20 second phases, long phases, countdown, pause/resume, end confirmation, app resume, delayed ticks, and completion boundaries.

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
- [ ] Make Home show the default or last-used practice and Begin action first.
- [ ] Progressively disclose the 1, 3, 5, and 10 minute choices, 4–4–6–4 preset, and 1–20 second phase editing inline or in a sheet.
- [ ] Recalculate cycle length, estimated whole cycles, actual duration, and guided cadence after every phase or duration change.
- [ ] Persist configuration changes and restore them on the next launch.
- [ ] Implement lean primary navigation for Breathe, History, and Settings. Do not expose Progress until real post-MVP insights are implemented.
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
- [ ] Production configuration confirms tablet support is disabled for MVP.
- [ ] Reduced-motion mode contains no scaling breathing animation.
- [ ] Automated contrast checks and manual spot checks pass AA.
- [ ] Core guidance remains usable with visual-only, tone-only, and haptic-only cues.

Gate: any inaccessible core guidance path remains a release blocker.

## CP4 · Correct local records, privacy, and user control

Target: Week 4

### Implementation checklist

- [ ] Add versioned SQLite migrations for active duration, four phase values, guided cadence, completed-cycle count, completion state, and optional health-write state/idempotency key.
- [ ] Group History by local calendar day and show pattern timing, active duration, completed cycles, completion state, and health sync state when applicable.
- [ ] Keep rows easy to scan; session detail is optional for MVP if every required value fits accessibly in the row.
- [ ] Keep Summary focused on duration, cycles, pattern, and guided cadence. Do not render unavailable biometric placeholders.
- [ ] Add Privacy, Safety & wellbeing, and Delete local history to Settings.
- [ ] Require an in-page deletion confirmation that explains system Health records are not deleted.
- [ ] Ensure deletion removes local sessions without touching preferences.
- [ ] Do not implement streaks, pattern aggregates, reminders, or progression charts in this checkpoint.

### Exit evidence

- [ ] Seeded completed and intentionally ended sessions render correctly in History and Summary.
- [ ] Paused time cannot inflate stored active duration or completed cycles.
- [ ] Local deletion passes confirmation, restart, and system-Health-disclosure tests.

Gate: incorrect records, irreversible deletion ambiguity, or missing privacy controls blocks beta.

## CP5 · Add optional health-session writing without delaying launch

Target: Week 5 · may move to the first point release if native stability threatens launch

### Implementation checklist

- [ ] Offer session-write permission only after the first qualifying completed session; Done and Breathe again remain the primary completion actions.
- [ ] Explain only the mindful/breathing session write before opening native permission UI. Do not request wearable read categories in MVP.
- [ ] Use neutral request-completed and write-result states; never claim that health read access is granted or denied.
- [ ] Detect Health Connect availability separately from generic Android support.
- [ ] Do not write sessions shorter than 60 seconds or intentionally ended sessions.
- [ ] Add an idempotent write queue with pending, written, unavailable, declined, and failed states.
- [ ] Guarantee one local session creates at most one system Health record and retry only transient failures.
- [ ] Keep every breathing, history, and summary flow usable without permission or platform Health availability.
- [ ] Remove health read permissions, biometric queries, sample placeholders, and insights routes from the production MVP.

### Exit evidence

- [ ] Physical iOS and Android tests pass for allowed, declined/restricted, revoked, and platform-unavailable write states.
- [ ] Qualifying sessions write once; sub-60-second and intentionally ended sessions never write.
- [ ] Reopening/retrying cannot duplicate a system Health record.
- [ ] No wearable value, permission claim, or sample-data insight appears in the production MVP.

Gate: duplicate/incorrect-time writes or premature permission prompts are release blockers. If the native write path cannot pass on schedule, remove it cleanly and launch the core app without Health permissions.

## CP6 · Run the core tone/haptic closed beta and produce the launch candidate

Target: Week 6

### Implementation checklist

- [ ] Complete the phone device matrix: oldest/current iOS, small/current iPhones, oldest/current Android, Pixel, and Samsung. Tablets and representative wearables are excluded.
- [ ] Run timer, countdown, safe-end, interruption, audio route, silent-mode, battery-saver, accessibility, and offline regression suites.
- [ ] Distribute the tones-and-haptics build to a small closed-beta cohort for at least seven stable days.
- [ ] Collect consented crash data and feedback on cue clarity, haptic comfort, start success, completion, accessibility, and failures.
- [ ] Remove sample data, post-MVP routes, dead links, debug UI, and unfinished controls.
- [ ] Freeze user-facing strings, complete privacy/legal review, produce signed release candidates, and triage issues into release blocker or post-launch work.

### Exit evidence

- [ ] Closed beta records at least 99.5% crash-free sessions and 70% completion, or product explicitly approves a documented exception.
- [ ] Cue timing and comprehension are validated for the tones/haptics public MVP.
- [ ] Signed release candidates pass the supported phone, accessibility, interruption, offline, and optional health-write matrices.
- [ ] No open P0/P1 defect remains in build, timer, accessibility, consent, records, or privacy.

Gate: no open core release blocker advances to store submission.

## CP7 · Store submission, rollout, and monitoring

Target: Week 7

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
6. `src/health/`: optional contextual consent and idempotent session writing only.
7. Closed-beta hardening, store assets, release candidate, and staged rollout.
8. Post-MVP: recorded voice, wearable reads, biometric comparisons, insights charts, streaks, and reminders.

## Definition of done for every task

- [ ] Implementation is covered by an automated test where practical.
- [ ] Loading, empty, denied, unavailable, error, and success states are handled.
- [ ] Screen-reader and large-text behavior is reviewed for changed UI.
- [ ] No health or medical claim is introduced.
- [ ] Offline behavior is unchanged or explicitly tested.
- [ ] Documentation and acceptance criteria are updated with the code.
- [ ] The change is demonstrated on both iOS and Android before checkpoint sign-off.
