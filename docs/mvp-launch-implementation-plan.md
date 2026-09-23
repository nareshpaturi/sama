# Sama Breath launch implementation plan

Status: proposed · v3 scope (2026-09-22) with the user-needs update (2026-09-23); supersedes the lean scope (2026-09-17) and v2 design alignment (2026-09-18)  
Target: public iOS and Android v1.0 (the wedge), then the v1.1 track (reasons to return)  
Expected delivery: v1.0 about 8–9 weeks with one experienced full-time cross-platform engineer plus part-time product/design/QA, with content drafted in parallel; v1.1 about 6.5–7.5 weeks including curated programs and four library additions. Store review, the Google Play closed-testing requirement for new personal developer accounts, and physical-device testing add calendar time.

This plan converts the product requirements and UX design into gated implementation checkpoints. A checkpoint is complete only when its exit evidence exists; completing code without passing the gate does not advance the release.

## v3 scope update · 2026-09-22

The binding decision contract is the “v3 direction” section of the [design review](design-review.md); the [PRD v2.0](product-requirements.html) turns it into requirements. This is a documentation-only update: no code changed, and no checkpoint state, checkbox, or historical evidence was advanced or revalidated.

What changed:

- **Positioning.** Practitioner-first (yoga practitioners, teacher-training students, teachers); the curious beginner follows techniques with gentle defaults; teachers distribute through share links. Promise: authentic pranayama, guided at your pace. Free, offline, no account.
- **v1.0 adds** flexible rhythms (inhale and exhale 1–20 s; holds 0–20 s, where 0 is skipped and shown “Off”; library half-second steps and left/right side labels), the eight-technique practice library, bundled AI voice cues, My rhythms (up to 20), share links with a static web fallback, app-icon quick actions, one-screen first use, and four-tab navigation: Breathe · Practices · History · Settings.
- **Moved to v1.1:** Apple Health / Health Connect writing (CP5). New in v1.1: curated programs (added 2026-09-23), routines, gentle progression, practice calendar (no streaks), daily reminder, fuller voice guidance. Teacher programs are planned for v1.2, pending teacher interviews.
- **Not building:** wearable reads, heart-rate/HRV comparisons, trend charts, accounts and cloud sync, large content or music libraries, streaks, scores, badges. The Progress/Insights route is removed, not deferred.
- **Vocabulary.** “Round” replaces “cycle.” Planned rounds = round up (target seconds ÷ round seconds). Guided pace is guided breaths per minute (inhale steps per minute), never a measured rate. Box 4 · 4 · 4 · 4 at 5 min = 19 rounds / 5:04, 3.8 breaths/min; Nadi Shodhana in 4 · out 6 each side at 5 min = 15 rounds / 5:00, 6 breaths/min; 4-7-8 at 1 min = 4 rounds / 1:16.
- **Checkpoints.** CP0 adopts the step bounds; CP2 becomes one-screen first use, four tabs, and the cue chip; new CP2b covers the library, voice, My rhythms, sharing, and quick actions; CP3 and CP4 extend to the new surfaces; CP5 moves to the [v1.1 track](#v11-track--reasons-to-return); CP6 and CP7 add the voice licence, link-verification files, technique-name store copy, and the Play closed-testing requirement.

## User-needs update · 2026-09-23

From the [user needs research](research/user-needs-research.md), recorded in the [design review](design-review.md) as the MVP definition:

- **Changed:** Voice and Tones guidance continues with the screen locked (native audio timeline, iOS background audio, Android `mediaPlayback` foreground service, lock-screen controls). Calls, other apps' audio, and headphone disconnects pause with a named reason. Silent mode still pauses on lock.
- **Added to v1.0:** sound controls (cue volume, other-audio mixing, tone sets, haptic strength, keep screen on), a rounds target, data safety (device backup, tested migrations, export and import), the free-core promise, a natural-voice listener gate, and no rating prompts.
- **Added to v1.1:** night practice, gradual slowing, half-second builder steps, and repeating a practice within a routine. **v1.2 candidates:** teacher programs, an Apple Watch companion, Hindi voice cues.
- **Cut line:** if v1.0 slips, defer the export and import screens (keep backup and migration safety) and ship one tone set.

## Design documentation update · 2026-09-18

Historical: this v2 note predates v3. Where it differs from the v3 scope update above (navigation, first use, “cycle”), v3 wins.

The [brand guide](branding-design.html) and [UX mocks](ux-design.html) are now v2; the [design review](design-review.md) records the rationale. This is a documentation-only update. Existing checkpoint states, checkboxes, and historical evidence below have not been advanced or revalidated.

Carry forward “Your breath. Your rhythm.”, the shared breath mark, the pine/paper/mist hierarchy, and Breathe/History/Settings navigation. Customize practice is an optional dedicated setup surface. Use full phase labels: Inhale, Hold after inhale, Exhale, Rest.

The duration design is now explicit: round up to the cycle that reaches the target and disclose its actual duration before Begin. A 5-minute 4–4–4–4 practice is 19 cycles / 5:04; 4–4–6–4 is 17 cycles / 5:06. Pausing excludes paused time; restarting a partially used phase can extend actual active practice time. Completion reports actual active time and completed cycles. Implementation and device validation remain future work.

## Launch definition

The public v1.0 (the wedge) includes:

- The core practice from v2: monotonic timer, three-second settle countdown, pause and resume of the interrupted step, end confirmation, interruption pause, local history, accessibility, privacy, and Delete local history.
- Flexible rhythms: inhale and exhale 1–20 s; holds 0–20 s (0 = skipped, shown “Off”); library techniques may use half-second steps and more than four steps with left/right side labels; the custom builder stays four rows in whole seconds.
- The practice library: Sama Vritti, Visama Vritti, Nadi Shodhana, Bhramari, Ujjayi, Sheetali, coherent breathing, and 4-7-8, each with sourced content and gentle defaults.
- Bundled AI voice cues (cue words, optional technique introductions, pronunciation clips) with Voice / Tones / Silent cue modes and independent haptics, passing the natural-voice listener gate.
- Guidance that continues with the screen locked in Voice or Tones mode, lock-screen controls, named automatic pauses, and sound controls (cue volume, other audio, tone sets, haptic strength, keep screen on).
- A minutes or rounds target (1–108 rounds; 11, 21, 27 shortcuts).
- Data safety: device backup, tested forward-only migrations, and export and import of My rhythms, history, and preferences.
- The free-core promise in About and on the store page; no ads, account, or rating prompts.
- My rhythms (up to 20), share links (`https://samabreath.app/r/…`) with an in-app preview and a static web fallback, and app-icon quick actions.
- One-screen first use and four-tab navigation: Breathe · Practices · History · Settings.
- Store disclosures, crash monitoring, and production builds.

Apple Health / Health Connect writing is no longer part of v1.0; it moves to the [v1.1 track](#v11-track--reasons-to-return) with routines, gentle progression, the practice calendar, the daily reminder, and fuller voice guidance. Night practice, gradual slowing, and half-second builder steps are v1.1. v1.2 candidates (teacher programs, Apple Watch companion, Hindi voice cues), later concepts (Kapalabhati and Bhastrika rapid-rhythm mode, full Hindi localization, widgets, Wear OS), tablet-specific layouts, and a full dark theme must not delay v1.0. Wearable reads, heart-rate/HRV comparisons, trend charts, accounts and cloud sync, large content or music libraries, and streaks, scores, or badges are not being built.

## Gate rules

- Checkpoints on the critical path are completed in order.
- Every gate requires reproducible test evidence, not verbal confirmation.
- A failed regression reopens the checkpoint that introduced the failure.
- Sample data, dead controls, misleading health labels, and undocumented permission prompts are release blockers; unfinished v1.1 destinations are removed from production navigation.
- Unsafe link rendering, an accepted out-of-bounds rhythm, an unreviewed vigorous technique, a “Reviewed by” line without a recorded review, and an unapproved voice clip are release blockers.
- Users with no network and every permission denied must pass every core practice flow at every checkpoint.
- A v1.1 feature cannot enter the v1.0 critical path. v1.1 checkpoints start after v1.0 is passing and may not regress any v1.0 gate.

## Recorded baseline · 2026-09-17

Historical evidence; predates v3 and is not revalidated. CP2b and the v1.1 track have no recorded baseline, and CP5 now lives on the v1.1 track.

These implementation findings are retained from the prior audit and were not revalidated by the September 18 design review.

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

Historical evidence; predates v3. HealthKit findings now apply to the v1.1 Health track.

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

Historical evidence; predates v3. Checkbox states below are unchanged.

Historical implementation alignment date: 2026-09-15

The implementation evidence in this section predates the 2026-09-18 documentation polish. It does not certify conformance to v2. The v2 docs supersede the earlier visual examples and launch copy; runtime changes have not been made in this pass.

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

- [ ] Apply the v3 step contract in code and tests: inhale and exhale `1–20 s`; holds `0–20 s`, where 0 skips the step and displays “Off”; the custom builder has four steps in whole seconds; library techniques may use half-second steps, more than four steps, and left/right side labels.
- Withdrawn in v3 (not a checkpoint item): wearable comparison windows. Wearable reads and comparisons are not being built.
- [ ] Remove or disable HealthKit/Health Connect modules, entitlements, and purpose strings in the v1.0 release configuration; they return with the v1.1 Health track.
- [ ] Confirm ownership and static hosting for samabreath.app (share links, link-verification files, web fallback, privacy policy).
- [ ] Verify the quick-actions library (candidate: `expo-quick-actions`) against the installed Expo SDK 57, or choose an alternative, and record the decision.
- [ ] Define supported iOS and Android versions. Set Android min SDK to at least 26 and set an explicit iOS deployment target compatible with the selected Expo/React Native/Hermes versions; record both decisions in the PRD.
- [ ] Provision and select a supported Xcode version locally and in CI, accept required licenses, install the selected iOS Simulator runtimes, and record the toolchain versions.
- [ ] Disable iPad/tablet support for v1.0; tablet-specific layouts and orientation validation are outside v1.0.
- [ ] Configure audio for least privilege: disable microphone permission and recording; enable iOS background audio (`UIBackgroundModes: audio`) and an Android `mediaPlayback` foreground service only for locked-screen guidance (FR-04).
- [ ] Inspect the generated release `Info.plist`, entitlements, and Android manifest. Remove unjustified microphone, local-network, Bonjour, and development-client declarations; keep background audio and the `mediaPlayback` foreground-service type with their FR-04 justification recorded.
- [ ] Configure backups: keep the SQLite file in an iOS-backed-up location and include it in Android Auto Backup rules (FR-21).
- [ ] Verify the `react-native-health` New Architecture patch against the selected Xcode, iOS SDK, React Native version, and CocoaPods build rather than assuming the existing patch is sufficient (needed by the v1.1 Health track; may move with it if the module is removed from v1.0).
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
- [ ] Step bounds (inhale and exhale 1–20 s, holds 0–20 s, library half seconds) are reflected consistently in the PRD, UX document, and tests.
- [ ] The v1.0 release configuration declares no HealthKit or Health Connect permission, entitlement, or purpose string.
- [ ] Domain ownership and the quick-actions library decision are recorded.

Gate: no core UX implementation proceeds on an unbuildable platform baseline.

## CP1 · Make session timing and lifecycle trustworthy

Target: Weeks 2–3

### Implementation checklist

- [ ] Use a monotonic elapsed-time source for foreground timing; keep wall-clock timestamps only for record boundaries.
- [ ] Model the engine as an ordered step list from the start (box 4 · 4 · 4 · 4 is four steps) so CP2b extends it rather than rewriting it.
- [ ] Add explicit engine operations for the three-second pre-session countdown, pausing, restarting the interrupted step, resuming after the same countdown, requesting end confirmation, and ending.
- [ ] Subscribe to app lifecycle and audio-interruption events. In Voice or Tones mode, backgrounding and screen locking keep guidance running (FR-04; engine in CP1b). Calls, VoIP, Siri, alarms, non-mixable audio from other apps, route loss, and lock-screen Pause enter the paused state with a reason. Silent mode continues only with haptics on Android; otherwise it pauses on lock.
- [ ] On iOS, handle `inactive` and `background` transitions (Notification Center, Control Center, app switching, locking) without pausing Voice or Tones guidance; handle calls, alarms, Siri, and route changes as pauses.
- [ ] Create a dedicated paused presentation that names the state and its reason (“Paused for a call”, “Paused: another app started audio”, “Paused: headphones disconnected”) and keeps Resume and End available.
- [ ] Keep the screen awake only in Silent mode or when “Keep screen on during practice” is enabled; otherwise follow system auto-lock.
- [ ] Track active elapsed time separately from paused wall time.
- [ ] Store completed rounds, allowing zero for a session ended during its first round.
- [ ] Prevent duplicate completion and end actions while persistence/navigation is pending.
- [ ] Add a session initialization state so settings or content reads cannot look like a frozen active timer.
- [ ] Make the requested duration and whole-round behavior explicit before starting (planned rounds = round up of target ÷ round length); v1.0 targets are 1, 3, 5, or 10 minutes, or 1–108 rounds.
- [ ] Ensure tones and haptics fire exactly once per active step boundary and do not fire while paused.
- [ ] Configure the iOS audio session deliberately: validate silent-switch behavior, mixing/ducking with other audio, interruption recovery, Bluetooth route changes, and deactivation after practice. Record the result as the locked audio decision that voice clips will follow.
- [ ] Add engine tests for all v1.0 durations, whole-second steps at the 1–20 s bounds, long steps, countdown, pause/resume, end confirmation, app resume, delayed ticks, and completion boundaries.

### Exit evidence

- [ ] A 5-minute target using 4–4–4–4 finishes within ±250 ms of its disclosed 5:04 duration on representative iOS and Android devices, without interruptions.
- [ ] In Voice or Tones mode, locking or backgrounding keeps guidance running with correct practice time and rounds; in Silent mode it returns to an unmistakable paused state.
- [ ] Resuming restarts the interrupted step after the documented countdown.
- [ ] Summary duration excludes paused time and round count includes only completed rounds.
- [ ] Force-quit does not create a completed record.
- [ ] Tones, haptics, and the displayed step remain synchronized during a 30-minute soak test.
- [ ] On physical iPhone and Android, a call or non-mixable audio pauses guidance with the right reason, and no cues play or time accrues until Resume.
- [ ] Silent-switch and other-audio behavior matches the locked product decision without unexpectedly stopping the user’s existing audio.

Gate: timer drift, stale active UI, unsafe ending, or incorrect duration/round accounting blocks CP2.

## CP1b · Locked-screen audio engine and sound controls

Target: Weeks 7–8 (about 1.5–2 weeks); the audio-clock design is agreed during CP1 so the engine is not rebuilt

### Implementation checklist

- [ ] Schedule every cue (voice clip, tone, completion) on a native audio timeline driven by the audio clock, not JavaScript timers. The engine supplies the timeline; the visual guide reads the same clock and re-syncs on return.
- [ ] iOS: background audio session, interruption and route-change handling, Now Playing metadata (practice name, round, time left) and remote Pause and Resume; release the session after practice.
- [ ] Android: `mediaPlayback` foreground service with a media session, audio focus handling, and a media-style notification (Pause, Resume, End); complete the Play Console foreground-service declaration.
- [ ] A session keeps going with the screen locked when a non-visual cue can still play: Voice or Tones on both platforms, or haptics on Android. Otherwise (Silent without haptics, or Silent with haptics on iOS, where background haptics are not allowed) it pauses on lock.
- [ ] Sound controls: cue volume separate from media volume; “Play alongside other audio” (mix and briefly lower others during cues) or “Pause other audio”; tone sets Soft bells, Wood, and Chimes with distinct per-step sounds; haptic strength Light, Medium, or Strong; “Keep screen on during practice.” All persist.
- [ ] Rounds target: Minutes or Rounds in Adjust rhythm (1–108; 11, 21, 27 shortcuts); rounds left during practice; stored on sessions and saved rhythms, and carried in share links.
- [ ] The settle screen shows the one-time note that the phone can be locked.

### Exit evidence

- [ ] With the screen locked from the first step, 5- and 20-minute Voice and Tones sessions keep cues within ±250 ms and record correct practice time and rounds on physical iPhone and Android, including Low Power Mode, battery saver, and Doze.
- [ ] Lock-screen Pause and Resume work on both platforms; End works on Android.
- [ ] Calls, VoIP, Siri, alarms, non-mixable audio, and headphone or Bluetooth disconnects pause with the right reason; mixable audio (music, podcasts) keeps playing under the cues.
- [ ] Each tone set plays four distinct step sounds; cue volume and haptic strength changes take effect on the next cue.
- [ ] A 21-round Nadi Shodhana practice ends after exactly 21 rounds and shows rounds left throughout.

Gate: drift beyond ±250 ms while locked, guidance continuing through a call, or a missing lock-screen control blocks CP6.

## CP2 · Implement one-screen first use, four tabs, and the cue chip

Target: Week 4

### Implementation checklist

- [ ] Add one first-use screen: welcome, comfort guidance, wellness disclaimer, and Continue. Continue records first use as complete and opens Breathe with Sama Vritti (4 · 4 · 4 · 4, 5 min) ready; when a quick action or link opened first use, Continue proceeds to it. “Begin” is reserved for starting a practice.
- [ ] Persist first-use completion locally; Settings repeats the comfort guidance and cue controls.
- [ ] Do not request any permission during first use or app launch.
- [ ] Make Breathe show the last or default practice, planned rounds and duration, and Begin first.
- [ ] Add the cue chip on Breathe (Voice / Tones / Silent) and matching Settings controls; haptics are independent. Defaults: Voice on, haptics on, motion follows the system. The Voice option plays clips once CP2b bundles them.
- [ ] Use an optional Adjust rhythm surface for the 1, 3, 5, and 10 minute targets and the four-row custom builder (inhale and exhale 1–20 s, holds 0–20 s with “Off” at 0, whole seconds). Use this rhythm returns to Breathe; show planned rounds and duration before Begin.
- [ ] Recalculate round length, planned rounds, planned duration, and guided breaths per minute after every step or duration change.
- [ ] Persist configuration changes and restore them on the next launch.
- [ ] Implement four-tab navigation: Breathe · Practices · History · Settings. Remove the Progress route from production navigation. Practices lists Sama Vritti until CP2b adds the library.
- [ ] Preserve navigation state safely around an active session and prevent accidental navigation away from it.
- [ ] Add loading and recoverable error states for storage reads and missing session IDs.

### Exit evidence

- [ ] A new user starts a practice from the single first-use screen with one tap.
- [ ] A returning user can start the last practice with one primary action from Breathe.
- [ ] `4 · 4 · 6 · 4` and `4 · 0 · 6 · 0` can be entered; a 0-second hold reads “Off.”
- [ ] Every tab is reachable with and without prior sessions; no Progress or Insights route exists.
- [ ] The cue chip and Settings stay in sync.
- [ ] No permission prompt appears before contextual explanation.

Gate: five moderated first-use tests must complete first use and start a practice without facilitator correction.

## CP2b · Practice library, voice, and sharing

Target: Weeks 4–7 (flexible engine and library about 1.5 weeks, voice about 0.5, My rhythms and share links about 1, quick actions within the 0.5-week first-use and quick-actions estimate)

### Implementation checklist

Engine and library

- [ ] Generalize the engine to an ordered step list: kind (inhale, hold, exhale, rest), seconds, optional side (left or right). Skip 0-second steps without cues; support half-second steps; derive round length, planned rounds, and guided breaths per minute (inhale steps per minute).
- [ ] Define the technique content schema (PRD section 05) and bundle the eight techniques as versioned data with a CI schema test.
- [ ] Ship the library defaults from the PRD table (Sama Vritti 4 · 4 · 4 · 4, Visama Vritti in 4 · out 6, Nadi Shodhana in 4 · out 6 each side, Bhramari in 4 · hum 8, Ujjayi 5 · 5, Sheetali in 4 · out 6 at 3 min, coherent 5.5 · 5.5, 4-7-8 at 1 min).
- [ ] Implement Practices (library, then My rhythms) and technique detail: names, pronunciation respelling and clip, how-to steps, traditional context, “Take care,” “What research says,” “Based on,” and “Reviewed by” only from a recorded review.
- [ ] Extend Adjust rhythm to library techniques: step structure and sides preserved; half-second increments only where the technique defines them.
- [ ] Show the guide and a progress ring instead of a countdown numeral for half-second steps; show Left / Right side cues and Hum for Bhramari.

Voice

- [ ] Bundle AI-generated clips—cue words (Inhale, Hold, Exhale, Rest, Hum, Left, Right, Switch), optional technique introductions, and pronunciation clips—with a build-time manifest of measured clip lengths. No runtime API, key, or network call.
- [ ] Implement the cue scheduler: Voice replaces tones; a step shorter than its cue plus 0.2 s plays its tone; a missing clip falls back to its tone; haptics stay independent; audio follows the CP1 locked decision.
- [ ] Add the voice-introductions setting and the Settings → About disclosure that voice guidance is AI-generated.

My rhythms

- [ ] Save up to 20 named rhythms (plain text, at most 40 characters) from the custom builder, an adjusted library technique, or a received link; rename; delete with confirmation; explain the limit at 20.

Share links

- [ ] Encode and decode `https://samabreath.app/r/…` carrying only a display name, step list (kind, seconds, optional side), target (1, 3, 5, or 10 minutes, or 1–108 rounds), and optional library technique ID.
- [ ] Validate every field and reject the whole link on any failure; without a technique ID the steps must fit the custom builder, with one they must match the installed technique. Unknown technique IDs are invalid; vigorous techniques are not shareable.
- [ ] Never render link content as HTML; safety and instruction text comes only from app content.
- [ ] Implement the share preview, the incoming preview (Save, Begin), and the invalid-link state; first use comes first when incomplete.
- [ ] Configure iOS Associated Domains and Android App Links; host `apple-app-site-association` and `assetlinks.json` on samabreath.app.
- [ ] Publish the static web fallback page: rhythm as plain text, App Store and Google Play links with fixed campaign identifiers, no trackers or cookies.

Quick actions

- [ ] Implement “Begin last practice” (named with the most recent practice), “1-minute box breathing,” and the most recent other practice (omitted until history has two distinct practices) on iOS and Android with the library chosen in CP0. Each opens the settle countdown with Cancel; before first use is complete, each opens first use; a deleted last practice falls back to Breathe.

### Exit evidence

- [ ] Step-engine tests pass for 0-second holds (skipped, silent, shown “Off”), side labels in order, half-second steps, and planned rounds for every library default (for example 19 rounds / 5:04 box, 15 rounds / 5:00 Nadi Shodhana, 28 rounds / 5:08 coherent, 4 rounds / 1:16 4-7-8).
- [ ] All eight techniques pass the schema test with sourced content (“Based on,” “Take care,” “What research says”); holds are at most 20 s; no “Reviewed by” appears without a review record.
- [ ] Voice clips are bundled; every cue word measures at most 0.8 s; tone fallback is verified for short steps; a listener who knows Sanskrit or Hindi has approved every clip, with the approval recorded.
- [ ] My rhythms save, rename, delete, and limit tests pass; history snapshots survive rename and delete.
- [ ] Share-link encode/decode, per-field validation, and fuzz tests pass (malformed, truncated, oversized, out-of-bounds, unknown ID, HTML or script in the name).
- [ ] Universal Links (iOS) and App Links (Android) open the in-app preview on physical devices from cold and warm start; without the app, the web fallback page is live and shows the rhythm and store links.
- [ ] Quick actions work on physical iOS and Android devices from cold and warm start and route to first use when it is incomplete.
- [ ] Every practice flow works in airplane mode.

Gate: unsafe link rendering, an accepted out-of-bounds rhythm, unsourced technique content, or an unapproved voice clip blocks CP3.

## CP3 · Meet the accessibility and visual quality bar

Target: gate closes in Week 7; core-surface work runs alongside CP1, and new surfaces are covered as CP2 and CP2b land

### Implementation checklist

- [x] Replace failing text colors with tokens that meet WCAG AA on every used surface.
- [ ] Support Dynamic Type without truncating step labels, side labels, countdowns, safety copy, values, or primary actions.
- [ ] Make session and setup layouts responsive on the smallest supported phone and at 200% text size.
- [ ] Replace the fixed 280-point breathing geometry with bounded responsive sizing so the step, countdown or progress ring, controls, and safety actions remain visible on a small iPhone at large text sizes.
- [ ] Add screen-reader labels, roles, selected/disabled states, values, and hints to the cue chip, duration chips, steppers, switches, library rows, and session controls.
- [ ] Announce step changes (kind, side, and seconds), pause, resume countdown, completion, and recoverable errors without overwhelming the user.
- [ ] Respect the system reduced-motion preference and expose the documented setting. Keep the breathing shape and progress ring static while retaining count, label, voice, tone, and haptic cues.
- [ ] Ensure step meaning never depends on color or animation alone; half-second steps announce their seconds even though no countdown numeral is shown.
- [ ] Use at least 44×44 pt iOS and 48×48 dp Android touch targets with visible pressed/focus states.
- [ ] Increase the current 40-point steppers, compact duration chips, and End Session target to at least 44×44 points on iOS.
- Moved to the v1.1 track: the practice calendar’s text summary. No trend charts are built.
- [ ] Make first use, technique detail (including long content), Adjust rhythm, My rhythms, share preview, incoming link preview, and the invalid-link state work with screen readers and at 200% text size.
- [ ] Expose each technique’s pronunciation respelling as its accessible hint and label the pronunciation play control.
- [ ] Give app-icon quick actions clear titles that VoiceOver and TalkBack read correctly.

### Exit evidence

- [ ] VoiceOver and TalkBack users can configure, start, pause, resume, end, and review a session.
- [ ] VoiceOver and TalkBack users can choose a technique, hear its pronunciation, adjust and save a rhythm, share it, open a received link, and complete Nadi Shodhana with side cues.
- [ ] All screens pass at 100%, 150%, and 200% text size on smallest and largest supported layouts.
- [ ] Production configuration confirms tablet support is disabled for v1.0.
- [ ] Reduced-motion mode contains no scaling breathing animation or moving progress ring.
- [ ] Automated contrast checks and manual spot checks pass AA.
- [ ] Core guidance remains usable with visual-only, voice-only, tone-only, and haptic-only cues.

Gate: any inaccessible core guidance path remains a release blocker.

## CP4 · Correct local records, privacy, and user control

Target: gate closes in Week 7; core records land with CP1, and new record fields land with CP2b

### Implementation checklist

- [ ] Add versioned SQLite migrations for active duration, practice ID, practice-name snapshot, step snapshot (kind, seconds, side for every step), target, completed-round count, guided breaths per minute, and completion state. Health-write state and idempotency key move to the v1.1 track.
- [ ] Add a SavedRhythm table (name, steps, target, optional technique ID, source; at most 20) and preferences for cue mode, voice introductions, and last practice.
- [ ] Group History by local calendar day and show practice name, rhythm, active duration, completed rounds, and completion state.
- [ ] Keep rows easy to scan; session detail is optional for v1.0 if every required value fits accessibly in the row.
- [ ] Keep Summary focused on practice name, rhythm, active duration, rounds, and guided breaths per minute. Do not render unavailable biometric placeholders.
- [ ] Add Privacy, Safety & wellbeing, About (content sources, AI-voice disclosure, acknowledgments), and Delete local history to Settings.
- [ ] Require an in-page deletion confirmation that says what is deleted (history) and what is kept (preferences, My rhythms).
- [ ] Ensure deletion removes local sessions without touching preferences or My rhythms.
- [ ] Make migrations forward-only with tests from every released schema; a failed migration keeps the existing data and shows a recoverable error (FR-21).
- [ ] Add Export my data (versioned JSON: My rhythms, history, preferences) through the share sheet, and Import from a file with the share-link validation rules, a summary, and duplicate-free merging.
- [ ] Add the free-core promise and “Rate Sama” to About; add no in-app rating prompt (FR-22).
- [ ] Do not implement streaks, scores, or badges (not building); the calendar, reminder, and progression belong to the v1.1 track.

### Exit evidence

- [ ] Seeded completed and intentionally ended sessions render correctly in History and Summary for library, adjusted, saved, received-link, and custom practices.
- [ ] Records keep their practice-name and step snapshots after a saved rhythm is renamed or deleted and after a content version change.
- [ ] Paused time cannot inflate stored active duration or completed rounds.
- [ ] Local deletion passes confirmation and restart tests; preferences and My rhythms survive.
- [ ] Upgrading from every released schema, killing the app mid-write, and restoring from an iOS backup and Android Auto Backup lose nothing.
- [ ] Export then import into a clean install restores everything; importing into a populated install creates no duplicates; an invalid file imports nothing.

Gate: incorrect records, irreversible deletion ambiguity, data loss on update or import, or missing privacy controls blocks beta.

## CP5 · Health-session writing — Moved to v1.1 track

Moved on 2026-09-22. Apple Health / Health Connect writing is no longer part of v1.0. Its checklist, exit evidence, and gate are kept unchanged under [v1.1-E](#v11-e--health-session-writing-moved-from-cp5). The v1.0 binary ships without Health permissions (CP0).

## CP6 · Run the v1.0 closed beta and produce the launch candidate

Target: after the v1.0 build; closed testing and store review add calendar time

### Implementation checklist

- [ ] Complete the phone device matrix: oldest/current iOS, small/current iPhones, oldest/current Android, Pixel, and Samsung. Tablets and representative wearables are excluded.
- [ ] Run timer, countdown, safe-end, interruption, audio route, silent-mode, battery-saver, accessibility, and offline regression suites.
- [ ] Run the voice, share-link, and quick-action suites: clip timing and tone fallback, link validation and fuzz tests, Universal Links and App Links on physical devices, and quick actions from cold and warm start.
- [ ] Distribute the v1.0 build to a closed-beta cohort of practitioners, teachers, and beginners for at least seven stable days. On Google Play, meet the closed-testing requirement for new personal developer accounts before applying for production access.
- [ ] Collect consented crash data and feedback on voice clarity and pronunciation, side cues, technique comprehension, share links, haptic comfort, start success, completion, accessibility, and failures.
- [ ] Collect wedge-validation feedback: which practices beta users choose (target: at least 40% of sessions on a practice other than box breathing).
- [ ] Confirm the voice licence covers bundled commercial distribution and file it with the release evidence, together with the listener approvals.
- [ ] Remove sample data, v1.1 routes, dead links, debug UI, and unfinished controls.
- [ ] Freeze user-facing strings, complete privacy/legal review, produce signed release candidates, and triage issues into release blocker or post-launch work.

### Exit evidence

- [ ] Closed beta records at least 99.5% crash-free sessions and 70% completion, or product explicitly approves a documented exception.
- [ ] Voice, tone, and haptic cue timing and comprehension are validated, including side cues and the short-step tone fallback.
- [ ] Signed release candidates pass the supported phone, accessibility, interruption, offline, link, and quick-action matrices.
- [ ] The Google Play closed-testing requirement is met and recorded.
- [ ] No open P0/P1 defect remains in build, timer, accessibility, consent, records, content, voice, links, or privacy.

Gate: no open core release blocker advances to store submission.

## CP7 · Store submission, rollout, and monitoring

Target: after CP6

### Implementation checklist

- [ ] Publish the privacy policy and support contact. The policy explains share links (what a link contains, that anyone with it can read it) and that the web page keeps only aggregate host logs.
- [ ] Reconcile Apple privacy labels, Google Play Data Safety answers, permission copy, SDK behavior, and the privacy policy.
- [ ] Verify the archived iOS binary does not declare microphone, local-network discovery, HealthKit, or other unused capabilities; background audio is declared and justified by locked-screen guidance in the review notes.
- [ ] Serve `apple-app-site-association` and `assetlinks.json` over HTTPS from samabreath.app with the production app IDs and the Play app-signing certificate; confirm Play Console deep-link verification passes.
- [ ] Prepare app name, subtitle, descriptions, wellness disclaimer, review notes, icon, and required screenshots. Store copy and keywords name the shipped techniques (for example Nadi Shodhana, Bhramari, Ujjayi, 4-7-8) and nothing unshipped, and state the free-core promise, no ads, no account, and locked-screen guidance.
- [ ] Complete name and cultural-language clearance, including the brand name’s pronunciation guidance.
- [ ] Verify production signing, versioning, crash reporting, and symbol/mapping uploads.
- [ ] Submit iOS and Android builds with review notes that explain share links, quick actions, background audio, and the `mediaPlayback` foreground service.
- [ ] Prepare a rollback/hotfix owner, decision path, and tested patch build procedure.
- [ ] Use a staged rollout where supported and monitor crashes, starts, completions, and invalid-link rates without collecting health values or link contents.
- [ ] Review feedback daily during the initial rollout and pause rollout on any launch-stop condition.

### Final go/no-go checklist

- [ ] Every v1.0 PRD acceptance criterion has linked evidence.
- [ ] Closed beta has at least seven stable days, and the Play closed-testing requirement is met.
- [ ] No open release blocker or P0/P1 defect remains.
- [ ] Users with no network and every permission denied can complete every core flow.
- [ ] No link content renders unsafely and no out-of-bounds rhythm is accepted; no unreviewed vigorous technique or unrecorded “Reviewed by” ships.
- [ ] The voice licence and every clip’s listener approval are on file; About discloses AI-generated voice.
- [ ] VoiceOver, TalkBack, Dynamic Type, reduced motion, offline, and interruption suites pass.
- [ ] Physical-iPhone silent-switch, haptic, locked-screen guidance, audio-route, voice, Universal Link, quick-action, and data-safety suites pass; physical-Android App Link, app-shortcut, TalkBack, and audio-focus suites pass. Simulator-only evidence is insufficient.
- [ ] Store disclosures match the shipped binary.
- [ ] Rollback and hotfix ownership is active.

Gate: release only with unanimous product, engineering, QA, and privacy go/no-go approval.

## v1.1 track · reasons to return

Target: about 6.5–7.5 weeks after v1.0 is passing, including curated programs (v1.1-G), night practice (v1.1-H), gradual slowing (v1.1-I), and library additions (v1.1-J). Each checkpoint may ship when its evidence passes; none may regress a v1.0 gate. The v1.0 gate rules, device matrix, and definition of done apply.

### v1.1-A · Routines

- [ ] Build routines of 2–6 practices (library techniques or saved rhythms) with per-practice minutes; a practice may appear more than once; store them as Routine records.
- [ ] Show planned duration before Begin: the sum of segments, each rounded up to whole rounds of its own practice.
- [ ] Add the 5-second transition screen that names the next practice; it is not practice time.
- [ ] Apply pause, end, and interruption rules to the whole routine; store one session record with per-segment snapshots.
- [ ] List each practice completed on the summary.

Exit evidence

- [ ] Engine tests pass for per-segment rounding (box 3 min = 12 rounds / 3:12, then coherent 5 min = 28 rounds / 5:08, planned 8:20), pausing across a transition, and ending during a segment.
- [ ] Screen readers announce the transition and the next practice.

### v1.1-B · Gentle progression

- [ ] Add progression paths to content data only where the PRD library table defines one (Sama Vritti, Visama Vritti, Nadi Shodhana, Ujjayi).
- [ ] After 5 completed (not ended early) sessions at the same rhythm within 14 days, offer one next step on the completion screen, for example 4 · 0 · 6 · 0 → 4 · 0 · 7 · 0.
- [ ] Provide Try it / Not now / Stop suggesting. Never change a rhythm automatically.
- [ ] Offer “Make it easier next time” after every practice.

Exit evidence

- [ ] Rule tests pass at the boundaries: 4 versus 5 sessions, the 14-day window, ended-early sessions excluded, sessions at a different rhythm not counted.
- [ ] No suggestion exceeds the step bounds or a 20-second hold; no automatic change is observed.

### v1.1-C · Practice calendar

- [ ] Add a month view in History: a pine dot on each practiced day, days and minutes this month, and minutes by practice.
- [ ] Show no streak count, broken-chain visual, or missed-day marking.
- [ ] Use local calendar days with deterministic timezone handling.

Exit evidence

- [ ] Aggregation tests match seeded records, including a timezone change.
- [ ] The month has a screen-reader text summary, and no streak language appears anywhere.

### v1.1-D · Daily reminder

- [ ] Add a reminder that is off by default and schedules one local notification at a chosen time with the copy “Time for a little space.”
- [ ] Request the notification permission only after the user turns the reminder on; show a clear denied state without repeated prompting.

Exit evidence

- [ ] Physical iOS and Android tests pass for allowed, denied, time change, device restart, and timezone change.
- [ ] No notification permission prompt appears before the user turns the reminder on.

### v1.1-E · Health session writing (moved from CP5)

Carried unchanged from CP5; “MVP” in these items now means this v1.1 release. v2 eligibility and result states are unchanged. One item is added for v3:

- [ ] Restore the Health modules, entitlements, and write-only purpose strings removed from the v1.0 configuration in CP0.

#### Implementation checklist

- [ ] Offer session-write permission only after the first qualifying completed session; Done and Breathe again remain the primary completion actions.
- [ ] Explain only the mindful/breathing session write before opening native permission UI. Do not request wearable read categories in MVP.
- [ ] Use neutral request-completed and write-result states; never claim that health read access is granted or denied.
- [ ] Detect Health Connect availability separately from generic Android support.
- [ ] Do not write sessions shorter than 60 seconds or intentionally ended sessions.
- [ ] Add an idempotent write queue with pending, written, unavailable, declined, and failed states.
- [ ] Guarantee one local session creates at most one system Health record and retry only transient failures.
- [ ] Keep every breathing, history, and summary flow usable without permission or platform Health availability.
- [ ] Remove health read permissions, biometric queries, sample placeholders, and insights routes from the production MVP.

#### Exit evidence

- [ ] Physical iOS and Android tests pass for allowed, declined/restricted, revoked, and platform-unavailable write states.
- [ ] Qualifying sessions write once; sub-60-second and intentionally ended sessions never write.
- [ ] Reopening/retrying cannot duplicate a system Health record.
- [ ] No wearable value, permission claim, or sample-data insight appears in the production MVP.

Gate: duplicate/incorrect-time writes or premature permission prompts are release blockers. If the native write path cannot pass on schedule, remove it cleanly and launch the core app without Health permissions.

### v1.1-F · Fuller voice guidance

- [ ] Add optional counting (off unless the user turns it on) and longer technique introductions in the same voice, under the same licence.
- [ ] Apply the pronunciation dictionary and the cue-plus-0.2 s timing fallback to every new clip.

Exit evidence

- [ ] A listener who knows Sanskrit or Hindi has approved every new clip, with the approval recorded.
- [ ] Counting never overlaps the next step boundary in timing tests; the About disclosure still covers all voice guidance.

### v1.1-G · Curated programs

Added 2026-09-23 from the [programs research](research/programs-market-fit.md). Depends on v1.1-A (routines), v1.1-B (progression), and v1.1-D (reminder). Teacher-authored programs are a separate v1.2 decision.

- [ ] Bundle versioned definitions for Pranayama Foundations (7 sessions) and the Nadi Shodhana Path (21 sessions in three phases) exactly as specified in FR-20, built only from library techniques and routines.
- [ ] Add the Programs group to Practices, the program overview, and the start step (when you'll practise, optional reminder; both skippable).
- [ ] Store one Program enrollment with a definition snapshot; allow one active program; support Leave (with confirmation), resume, and Restart.
- [ ] Show the next session as the ready practice on Breathe while enrolled; other practices never advance or break the program.
- [ ] Advance only on completed sessions; keep ended-early sessions as the next session; never reset or mark missed days.
- [ ] Offer “Repeat session N−1” or “Continue with session N” after 7 or more days away, and “Move on” or “Repeat this phase” at phase boundaries.
- [ ] Show “Session N of M” with session dots and the next-session preview on completion; show the program summary and suggested next program at the end.
- [ ] Pause FR-15 progression suggestions for program sessions; tag program sessions in History with program name and session number.

Exit evidence

- [ ] Engine tests cover session advancement, ended-early sessions, the 7-day welcome-back offer, phase decisions, content-version snapshots, and planned durations (in 4 · out 7 at 7 min = 20 rounds / 7:20; in 4 · out 8 at 10 min = 25 rounds / 10:00).
- [ ] A clock-change and timezone test shows no calendar logic affects progress.
- [ ] The program works with notification permission denied and with the reminder off.
- [ ] Screen readers read session dots as text (“Session 3 of 7 complete”) and announce the next session.
- [ ] Program copy passes the voice review: no streak, guilt, or outcome language.

### v1.1-H · Night practice

- [ ] Add a true-black settle, practice, and completion surface with a dimmer guide, AA-passing labels, and a soft completion cue.
- [ ] Setting: Off (default), 9 PM–6 AM (local time), or Always.

Exit evidence

- [ ] Contrast checks pass for every night-surface text role; step labels, side cues, and controls stay as legible as in day mode.

### v1.1-I · Gradual slowing and half-second builder steps

- [ ] Add optional gradual slowing for coherent breathing and custom rhythms: start and end inhale and exhale; step lengths change evenly round by round, to 0.1 s; the session ends on a whole round.
- [ ] Add an option for half-second steps in the custom builder.

Exit evidence

- [ ] Engine tests cover interpolation, rounding, bounds, planned duration, and whole-round endings; the summary shows start and end guided pace.

### v1.1-J · Library additions

- [ ] Add Dirgha, Udgeeth, Chandra Bhedana, and cyclic sighing as bundled content meeting the FR-09 standard (steps, Take care, research, sources), with draft rhythms confirmed by the research pass.
- [ ] Add “Anulom Vilom” as a search name and guide alias for Nadi Shodhana.
- [ ] Generate and approve the “Om” and “Top up” cue words and the four pronunciation clips through the voice gate.
- [ ] Show and speak “through the mouth” once per practice for mouth steps.

Exit evidence

- [ ] Content schema tests pass for all 12 techniques; searching “Anulom Vilom” finds Nadi Shodhana.
- [ ] Cyclic sighing reports 6 guided breaths/min at in 3 · top up 1 · out 6 (the top-up does not count as a breath).
- [ ] Every new clip has listener approval on file.

## v1.2 candidates

Each needs its own go decision after v1.1 metrics: **vigorous techniques** (Kapalabhati, Bhastrika, and Bahya, each after a named instructor review, with the rapid-rhythm mode and the safety check), **teacher programs** (after 6–8 teacher interviews), an **Apple Watch companion** that keeps running with the wrist down, with per-step haptics (the most-requested platform feature), and **Hindi voice cues** (the listener gate applies).

## Recommended implementation order by code area

1. `app.json`, package scripts, and CI: restore buildability and repeatable evidence; remove Health from the v1.0 configuration; record the domain and quick-actions decisions.
2. `src/engine/` and `app/session.tsx`: timing, lifecycle, pause/resume, and active-duration correctness on an ordered step list; core-surface records and accessibility foundations land alongside.
3. Routing, first use, Breathe, the cue chip, Adjust rhythm, and four-tab navigation.
4. Step-sequence engine extensions (0-second holds, sides, half seconds), bundled technique content and schema, Practices, and technique detail.
5. `src/audio/`: voice clip manifest, cue scheduler, tone fallback, introductions, and the About disclosure.
5b. Native audio timeline, locked-screen guidance, lock-screen controls, sound controls, and the rounds target (CP1b).
6. My rhythms, link encode/decode and validation, share and incoming previews, Universal Links and App Links, and the static samabreath.app site.
7. App-icon quick actions.
8. Theme and shared controls: accessibility, contrast, reduced motion, and interaction states across every new surface.
9. SQLite schema, History, Summary, and Settings: correct records, snapshots, user control, backups, migrations, and export and import.
10. Closed-beta hardening, the Play closed-testing requirement, store assets and technique-name keywords, release candidate, and staged rollout.
11. v1.1 track: routines, gentle progression, practice calendar, daily reminder, curated programs (after routines, progression, and the reminder), night practice, gradual slowing, `src/health/` session writing, and fuller voice guidance.

## Definition of done for every task

- [ ] Implementation is covered by an automated test where practical.
- [ ] Loading, empty, denied, unavailable, error, and success states are handled.
- [ ] Screen-reader and large-text behavior is reviewed for changed UI.
- [ ] No health or medical claim is introduced.
- [ ] Offline behavior is unchanged or explicitly tested.
- [ ] Documentation and acceptance criteria are updated with the code.
- [ ] The change is demonstrated on both iOS and Android before checkpoint sign-off.
