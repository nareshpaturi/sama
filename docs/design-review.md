# Sama Breath design review

## v3 direction · September 22, 2026

Scope: product direction, requirements, brand, UX mocks, and launch plan. Application code, assets, and checkpoint evidence are unchanged. This section is the shared decision contract for the v3 documents; the v2 review below is retained as history.

### Why v3

The v2 lean MVP was a well-crafted four-phase timer. A product review found it had almost no differentiation: free, cross-platform timers (Simple Breathing, Breath Ball, Breathly, Prana Breath's free tier) and Apple Watch's built-in Mindfulness app already cover free, custom, box breathing. The one lane the market research found unowned — authentic pranayama, free, on both platforms — had been cut for speed. v3 restores it while keeping the lean, offline, no-account engineering posture. Revenue is intentionally out of scope for now.

### Positioning

| Decision | v3 direction |
|---|---|
| Primary user | **The practitioner:** yoga practitioners, teacher-training students, and teachers who want authentic techniques without a subscription. |
| Secondary user | **The curious beginner:** follows a technique guide with gentle defaults; never has to build a rhythm. |
| Distribution | Teachers share practices with students through links. |
| Promise | Authentic pranayama, guided at your pace. Free, offline, no account. |
| Brand line | Lead line **Steady breath. Steady mind.**; descriptor **Pranayama, guided at your pace.**; **Your breath. Your rhythm.** becomes the secondary line for adjusting and saving rhythms. Decided in the brand refresh below. |
| Navigation | **Breathe · Practices · History · Settings.** The library earns a top-level destination. |

### Release plan

| Release | Scope |
|---|---|
| **v1.0 · the wedge (MVP)** | Core practice (monotonic timer, settle countdown, pause/resume-step, end confirmation, local history, accessibility, privacy, delete local history) **plus:** flexible rhythms with a minutes or rounds target, the practice library, bundled AI voice cues, **guidance that continues with the screen locked, sound controls,** My rhythms, share links, app-icon quick actions, one-screen first use, four-tab navigation, **data export and backup,** and the **free-core promise**. See “MVP definition” below. |
| **v1.1 · reasons to return** | **Library grows to 12** (Dirgha, Udgeeth, Chandra Bhedana, cyclic sighing), **curated programs**, **night practice**, **gradual slowing within a session**, half-second steps in the custom builder, routines (a practice may repeat), gentle progression, practice calendar (no streaks), optional daily reminder, Apple Health / Health Connect mindful-minute writing (v2 states unchanged), fuller voice guidance (optional counting, longer introductions). |
| **v1.2 · candidates** | **Vigorous techniques** (Kapalabhati, Bhastrika, Bahya, bringing the library to 15; each needs a named instructor review, the rapid-rhythm mode, and the safety check), **teacher programs** (after 6–8 teacher interviews; see [programs research](research/programs-market-fit.md)), an **Apple Watch companion** (the most-requested platform feature), and **Hindi voice cues**. |
| **Later · concepts** | Full Hindi localization, home/lock-screen widgets, Wear OS, a full dark theme. |
| **Not building** | Wearable reads, heart-rate/HRV comparisons, trend charts; accounts and cloud sync; large content or music libraries; streaks, scores, badges. |

### v1.0 feature decisions

- **Flexible rhythms.** Inhale and exhale are 1–20 s. Holds are 0–20 s; 0 means the step is skipped and displays as “Off.” Library techniques may define half-second steps (coherent breathing 5.5 · 5.5) and more than four steps with left/right side labels (Nadi Shodhana). The custom builder stays four rows in whole seconds.
- **Practice library (8 gentle techniques).** Sama Vritti (box), Visama Vritti (extended exhale), Nadi Shodhana (alternate nostril, no retention), Bhramari (humming bee), Ujjayi (ocean breath), Sheetali (cooling; Sheetkari alternative), coherent breathing (5.5 · 5.5), and 4-7-8. Each technique has a romanized name and English name, pronunciation respelling and audio, how-to steps, traditional context, “Take care” guidance, “What research says,” and sources.
- **Voice guidance.** AI-generated clips bundled in the app: cue words (Inhale, Hold, Exhale, Rest, Hum, Left, Right, Switch), optional technique introductions before practice, and pronunciation clips. Cue mode is Voice, Tones, or Silent; haptics are independent. Defaults: Voice on, haptics on, motion follows the system.
- **My rhythms.** Save up to 20 named rhythms (custom or received through a link). Rename and delete are local.
- **Share links.** Share a library technique's current settings or a saved rhythm as `https://samabreath.app/r/…`. Opening the link shows an in-app preview (Save, Begin). Without the app, a small web page shows the rhythm and store links.
- **Quick start.** App-icon quick actions: “Begin last practice,” “1-minute box breathing,” and the most recent *other* practice (omitted until history has two distinct practices). They open the settle countdown with Cancel. Before first use is complete, they open first use.
- **First use.** One screen: welcome, comfort guidance, wellness disclaimer, and **Continue** to Breathe (“Begin” is reserved for starting a practice). When a quick action or link opened first use, Continue proceeds to it. Cue choices move to a cue chip on Breathe and to Settings.
- **Vocabulary.** “Round” replaces “cycle” (one pass through a practice's steps; a Nadi Shodhana round covers both sides). Planned rounds = round up (target seconds ÷ round seconds). Guided pace is shown in **guided breaths per minute** (inhale steps per minute), never as a measured rate. Examples: box 4 · 4 · 4 · 4 at 5 min = 19 rounds / 5:04, 3.8 breaths/min; Nadi Shodhana in 4 · out 6 each side at 5 min = 15 rounds / 5:00, 6 breaths/min; 4-7-8 at 1 min = 4 rounds / 1:16.
- **Half-second steps** show the guide and a progress ring instead of a countdown numeral; coherent breathing is followed, not counted.

| Library default | Rhythm | Default target | Planned | Progression path (v1.1) |
|---|---|---|---|---|
| Sama Vritti · box | 4 · 4 · 4 · 4 | 5 min | 19 rounds · 5:04 | +1 s every phase, to 6 · 6 · 6 · 6 |
| Visama Vritti · extended exhale | in 4 · out 6 | 5 min | 30 rounds · 5:00 | out 7, then out 8 |
| Nadi Shodhana · alternate nostril | in 4 · out 6, each side | 5 min | 15 rounds · 5:00 | out 7, then out 8 |
| Bhramari · humming bee | in 4 · hum 8 | 5 min | 25 rounds · 5:00 | — |
| Ujjayi · ocean breath | in 5 · out 5 | 5 min | 30 rounds · 5:00 | in 6 · out 6 |
| Sheetali · cooling breath | in 4 · out 6 | 3 min | 18 rounds · 3:00 | — |
| Coherent breathing | in 5.5 · out 5.5 | 5 min | 28 rounds · 5:08 | — |
| 4-7-8 | 4 · 7 · 8 · rest off | 1 min | 4 rounds · 1:16 | — |

### v1.1 feature decisions

- **Routines.** Chain 2–6 practices with per-practice minutes. A 5-second transition screen names the next practice. Pause, end, and interruption rules apply to the whole routine; the summary lists each practice completed.
- **Gentle progression.** Only for techniques with a defined path. After 5 completed (not ended early) sessions at the same rhythm within 14 days, the completion screen offers one next step, e.g. 4 · 0 · 6 · 0 → 4 · 0 · 7 · 0. Try it / Not now / Stop suggesting. Never automatic. “Make it easier next time” is always available after a practice.
- **Practice calendar.** A month view in History: a pine dot on each practiced day, days and minutes this month, minutes by practice. No streak count, broken-chain visual, or missed-day marking.
- **Daily reminder.** Off by default; one notification at a chosen time; the notification permission is requested only after the user turns it on. Copy: “Time for a little space.”
- **Curated programs** (decided September 23, 2026, from the [programs research](research/programs-market-fit.md)). Short, forgiving, multi-session plans built only from library techniques and routines. They live in a Programs group at the top of the Practices tab.
  - **Pranayama Foundations · 7 sessions:** 1 Sama Vritti 3 min · 2 Visama Vritti 5 min · 3 Ujjayi 5 min · 4 Nadi Shodhana 5 min · 5 Bhramari 5 min · 6 Ujjayi 3 min → Nadi Shodhana 5 min · 7 Nadi Shodhana 5 min → Bhramari 3 min. About 39 minutes in total; each session introduces one technique or joins two.
  - **Nadi Shodhana Path · 21 sessions in three phases:** in 4 · out 6 for 5 min (sessions 1–7), in 4 · out 7 for 7 min (8–14, 20 rounds / 7:20), in 4 · out 8 for 10 min (15–21, 25 rounds / 10:00). No breath retention. Finishing Foundations suggests this path.
  - **Progress counts completed sessions, never calendar days.** Ended-early sessions don't count and stay ready. One session a day is suggested; more are allowed. No streaks, no resets, no missed-day marks.
  - **Returning after 7 or more days** offers “Repeat session N−1” or “Continue with session N.” At each phase boundary: “Move on” or “Repeat this phase.”
  - **Starting a program asks when you'll practise** (morning, midday, evening, or a time) and offers the daily reminder. Both can be skipped.
  - **One active program at a time.** While enrolled, Breathe shows the next session as the ready practice. Other practices never advance or break the program. Leaving asks for confirmation and keeps progress for later. Gentle-progression suggestions are paused inside a program.
  - **Program definitions are bundled and versioned;** an enrollment keeps a snapshot, so content updates never change a program mid-way.
  - **Success signals:** 7-session completion of 25–30% (stretch), and more practice days per week for enrolled practitioners than for others (beta interviews and opt-in feedback).

### Content and safety governance

- Claude drafts technique content from classical and modern sources; every technique lists its sources under “Based on.”
- **Risk tiers.** *Gentle* techniques (the v1.0 eight and the v1.1 four) may ship with sourced content and gentle defaults. *Vigorous or retention-led* techniques (Kapalabhati, Bhastrika, long kumbhaka, bandhas) require a named human instructor review before they ship.
- “Reviewed by [name, credential]” appears only after a real review is recorded. Never imply review.
- Frame tradition as tradition (“Traditionally practiced to…”). State evidence plainly, including null results such as the Sussex coherent-breathing trial. No treatment, diagnosis, or outcome claims.
- Library defaults sit below classical ratios. Holds never exceed 20 s in v1.x.

### AI voice

- Generate once (ElevenLabs or equivalent) under a commercial licence, then bundle the clips. No runtime API, key, or network dependency.
- One calm, consistent voice. Cue words are at most 0.8 s. When a step is shorter than its cue plus 0.2 s, play that step's tone instead.
- Voice replaces tones when on; haptics stay independent. Platform audio conventions follow the CP1 locked decision.
- Sanskrit names use a pronunciation dictionary. A listener who knows Sanskrit or Hindi approves every clip before release; text review alone cannot validate pronunciation.
- Settings → About discloses that voice guidance is AI-generated.

### Typography finding

The bundled Newsreader and DM Sans files contain macrons and ś but lack the IAST underdot and overdot letters (ḍ ṣ ṭ ṇ ṃ ḥ ṛ), verified from each font's character map. The UI therefore uses common romanization without diacritics (Nadi Shodhana, Bhramari), a pronunciation respelling (“NAH-dee SHOH-duh-nuh”), and a pronunciation clip. Full IAST requires adding a covering font such as Noto Serif, which is a future brand decision.

### Share-link safety

- A link carries only a display name (plain text, at most 40 characters), a step list (kind, seconds within bounds, optional side), a target duration (1, 3, 5, or 10 min), and an optional library technique ID.
- Validate every field; reject anything out of bounds; never render link content as HTML. Safety and instruction text always comes from the app's own content, never from a link.
- Links cannot unlock techniques that are not in the installed library. Vigorous techniques are not shareable in v1.x.

### Success signals

| Signal | Target / source |
|---|---|
| Activation, completion, crash-free sessions | ≥ 60%, ≥ 70%, ≥ 99.5% (unchanged) |
| **D30 retention** | Opted-in store analytics; hypothesis ≥ 8%; continue/adjust decision 8 weeks after launch |
| **Wedge validation** | ≥ 40% of sessions use a practice other than box breathing (beta interviews and opt-in feedback until analytics exist) |
| **Teacher loop** | Web-fallback page visits and store campaign attribution from share links |
| **Discoverability** | Installs from technique-name searches (App Store Connect and Play Console acquisition reports) |

### Delivery estimate

One experienced full-time cross-platform engineer: v1.0 about 8–9 weeks (core correctness about 3, locked-screen audio engine about 1–1.5, flexible engine and library about 1.5, voice and sound controls about 1, My rhythms and share links about 1, rounds, data safety, quick actions, and first use about 1), with content drafting in parallel. v1.1 about 6.5–7.5 weeks, of which curated programs are about 1.5–2 and the library additions about 0.5 on top of routines, progression, and the reminder. The user-needs update below records the cut line. Store review, the Google Play closed-testing requirement for new personal accounts, and physical-device testing add calendar time.

### Brand refresh · decided September 22, 2026

The [brand exploration](brand-exploration.html) compared four marks, five lines, and three styles. Chosen:

| Decision | Choice | Why |
|---|---|---|
| Logo | **Two breaths:** two equal open arcs (sky left, mist right) on pine, with the coral point in the top gap | Expresses the name (even, balanced), inhale and exhale, and left and right; clear at 29 px. The previous drop-and-cross mark read as a leaf and as a double-barred cross, an emblem of lung-health charities. |
| Tagline | **Steady breath. Steady mind.** | Echoes Hatha Yoga Pradipika 2.2 and signals the tradition to practitioners. Framed as tradition, never paired with outcome claims. |
| Style | **Pine & Paper, refined** | Already implemented and contrast-tested. Adds line-diagram, icon, motion, and coral-point rules plus an imagery “don't” list. |

The mark's construction lives in the brand guide. `assets/brand-*.svg` are the sources, and `npm run brand:assets` renders the app icon, Android adaptive and monochrome icons, favicon, and splash from the same geometry. The splash now shows the tile mark without a wordmark, which avoids rasterizing a font. A trademark search on the mark remains a prelaunch task.

### User-needs update · decided September 23, 2026

The [user needs research](research/user-needs-research.md) analyzed about 10,900 App Store and Google Play reviews. Price is the top reason for 1–2★ reviews (41.6%), followed by bugs (19.8%); simplicity is the top praise; users ask most for sound control, custom patterns, eyes-closed and locked-screen guidance, rounds, and a Watch app. Prana Breath's September 2026 relaunch now claims a sourced pranayama library, so Sama differentiates on **a free core that stays free, dependability, voice that names the side, teacher links, and platform parity**.

#### Changed decision: guidance continues with the screen locked

Replaces “pause on background or lock.”

- **In Voice or Tones mode, guidance keeps going** when the screen locks or the app is in the background. Practice time counts, and cues stay within ±250 ms. When the app returns, the visual guide re-syncs from the same clock.
- **It pauses automatically** for phone and VoIP calls, Siri and alarms, another app taking audio focus without mixing, headphones disconnecting, or a pause from the lock-screen controls. Returning shows the paused state, with the reason (“Paused for a call”).
- **Silent mode:** A session keeps going with the screen locked when a non-visual cue can still play: Voice or Tones on both platforms, or haptics on Android. Otherwise (Silent without haptics, or Silent with haptics on iOS, where background haptics are not allowed) it pauses on lock.
- **Lock-screen controls:** iOS Now Playing (practice name, round and time left, Pause/Resume); Android media-style notification from a `mediaPlayback` foreground service (Pause/Resume, End). No Live Activity in v1.0.
- **Screen:** with Voice or Tones the screen may sleep normally. “Keep screen on during practice” is off by default; the screen always stays on in Silent mode.
- **Implementation:** cues are scheduled on a native audio timeline driven by the audio clock, not JavaScript timers. iOS background audio mode is justified by audible guidance; the microphone stays disabled. The audio session deactivates after practice. The settle screen tells people they can lock the phone.

#### New v1.0 requirements

1. **Sound controls:** a cue volume separate from media volume; “Play alongside other audio” (default on: Sama mixes with music and lowers it briefly during cues) or “Pause other audio”; three tone sets (Soft bells by default, Wood, Chimes), each with distinct inhale, hold, exhale, and rest sounds; haptic strength Light, Medium (default), or Strong. All persist.
2. **Rounds target:** the target can be minutes (1, 3, 5, 10) or rounds (1–108, with 11, 21, and 27 as shortcuts). Planned duration is shown for both. Practice shows “Round 6 of 21 · 16 left.” Share links, history, and programs carry the target type.
3. **Data that can't be lost:** the local database is included in device backups (iOS device and iCloud backups; Android Auto Backup). Migrations are forward-only and tested from every released schema. A failed migration keeps the data and shows a recoverable error. **Export my data** writes a versioned JSON file (My rhythms, history, preferences) through the share sheet. **Import** validates it like a share link and merges without duplicates. No server.
4. **Free-core promise,** in About and on the store page: every breathing practice, custom rhythms, voice, tone, and haptic guidance, and your history are free, with no ads and no account. Anything paid in future would be an addition, never a lock on these.
5. **Natural-voice gate:** at least 8 listeners, including pranayama practitioners and a Sanskrit or Hindi speaker, rate calm, pace, and naturalness. The median must be at least 4 out of 5, or the clips are regenerated. Tones remain available.
6. **No rating prompts** during or right after practice. v1.0 has no in-app rating prompt, only “Rate Sama” in About.

#### New v1.1 requirements

- **Night practice:** a true-black settle, practice, and completion surface with a dimmer guide and a soft completion cue. Off, 9 PM–6 AM, or Always (local time).
- **Gradual slowing:** optional for coherent breathing and custom rhythms. Set a start and end inhale and exhale (holds unchanged). Step lengths change evenly round by round, to 0.1 s, and the session still ends on a whole round, with planned duration shown.
- **Half-second steps** in the custom builder (an option).
- **Routines may repeat a practice.**

#### MVP definition (v1.0)

| Area | Ships in the MVP |
|---|---|
| Practice | Step-sequence timer that ends on whole rounds; visible countdown; pause, resume the step, end with confirmation; minutes or rounds target |
| Library | Eight gentle techniques with sourced guides, pronunciation, and Take care |
| Guidance | Voice, Tones, or Silent; haptics; voice that names the side; introductions; guidance with the screen locked; sound controls |
| Personal | Custom rhythms (four rows); My rhythms (up to 20); last practice remembered; app-icon quick actions |
| Sharing | Share links with preview, validation, and a static web page |
| Records and trust | Local history; delete; export and import; device backup; safe migrations |
| Access and safety | One-screen first use; four tabs; screen reader, large text, reduced motion; safety and privacy views |
| Promises | Free core, no ads, no account, no rating prompts during practice |

**Not in the MVP:** programs, routines, gentle progression, calendar, reminders, Apple Health / Health Connect, night practice, gradual slowing, half-second builder steps, Watch, Hindi, teacher programs, and a full dark theme.

**Estimate and cut line:** v1.0 grows to about **8–9 weeks** for one full-time engineer. Most of the increase is the locked-screen audio engine (about 1–1.5 weeks), plus sound controls (about 0.5), rounds (about 0.25), and data safety and export (about 0.5). If the schedule slips, defer the export and import screens to v1.1 (keeping backup and migration safety) and ship one tone set. v1.1 grows to about **6.5–7.5 weeks** with the four library additions.

### Library roadmap · decided September 23, 2026

Sama grows a small library deliberately instead of matching Prana Breath's 80+ practices. Only 12 of those are free, and users ask for simplicity far more than for volume. Target: **about 15 practices by v1.2, all free, each explained and sourced.** Rhythms below v1.0 are drafts until the technique research pass.

| Release | Practices | Count |
|---|---|---|
| **v1.0** | Sama Vritti, Visama Vritti, Nadi Shodhana, Bhramari, Ujjayi, Sheetali, coherent breathing, 4-7-8 | 8 |
| **v1.1** | + **Dirgha** (three-part yogic breath, in 4 · out 6), **Udgeeth** (Om on the exhale, in 4 · Om 8), **Chandra Bhedana** (in left, out right, in 4 · out 6), **cyclic sighing** (in 3 · top up 1 · out mouth 6) | 12 |
| **v1.2 candidates** | + **Kapalabhati**, **Bhastrika**, **Bahya**: vigorous or retention-led; each needs a named instructor review, the rapid-rhythm mode, and the pre-practice safety check | 15 |

- **“Anulom Vilom”** becomes a search name and guide alias for Nadi Shodhana in v1.1. It is the name most Indian practitioners use, and it is not a separate practice.
- **New cue words in v1.1:** “Om” and “Top up,” under the same voice gate. A top-up step belongs to the same breath: it doesn't count toward guided breaths per minute, and cyclic sighing is 6 guided breaths/min at its default.
- **Nose or mouth:** steps that breathe through the mouth (Sheetali's inhale, cyclic sighing's exhale) show and speak the route once per practice.
- **Bahya** stays within the 20-second hold cap unless the instructor review records a different decision.
- **Not planned:** other breathing traditions (Sufi, Tibetan, Taoist), applied collections (singers, divers, runners), habit collections (cravings, smoking), and self-measured health metrics. They are off-position, or they invite health claims.
- **Cost:** gentle additions are data plus content, about half a day to a day of engineering each, with content and voice work in parallel. Vigorous additions depend on the rapid-rhythm mode (about 4–6 days) and the review.

### Design validation boundary

The v3 UX mocks are documentation specimens. No timer, audio, voice, haptics, deep links, quick actions, notifications, storage, or Health access run in them. Technique copy in the mocks is illustrative until the sourced content pass is complete.

---

## v2 review · September 18, 2026

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
