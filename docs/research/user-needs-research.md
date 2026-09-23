# What breathing-app users want

**Decision (September 23, 2026):** the recommendations became requirements. Guidance continues with the screen locked; sound controls, a rounds target, data export and backup, the free-core promise, a natural-voice gate, and no rating prompts joined v1.0 (PRD FR-01–FR-05, FR-21, FR-22; plan CP1b and CP4). Night practice and gradual slowing joined v1.1 (FR-23, FR-24). Apple Watch and Hindi voice cues are v1.2 candidates. See the MVP definition in the [design review](../design-review.md).

Research date: September 23, 2026. Question: what do potential users actually ask for, praise, and complain about in breathing and pranayama apps, and what would make Viram's market fit stronger?

## Method and sample

| Source | What | Size |
|---|---|---|
| Apple App Store | Public review feeds for 35 breathing and pranayama apps plus Insight Timer, from the US, UK, Canada, Australia, and India stores (most recent and most helpful) | 7,397 reviews; 6,475 from breathing-specific apps |
| Google Play | Most relevant plus the newest 1–3★ reviews for 16 apps, via Play's public review endpoint | ~3,455 reviews |
| Communities and press | Hacker News threads, Product Hunt comments, Trustpilot, 2025–2026 roundups | ~15 sources |
| Reddit | **Not included:** blocked by the organization's browser policy and absent from search results | — |

App Store reviews were tagged against 30 themes with keyword patterns, and 1,239 explicit request sentences (“I wish…”, “please add…”, “it would be great if…”) were extracted from 992 reviews. Percentages are directional: keyword tagging over- and under-counts at the edges, and reviews skew toward people with strong feelings. User comments are paraphrased; counts refer to App Store reviews unless noted.

---

## 1. What makes people angry

Share of **1–2★ reviews** (n = 799) that mention each theme:

| Pain | % of 1–2★ | Notes |
|---|---|---|
| **Price, paywall, subscription** | **41.6%** | The top reason by far. By app: Open 76%, FivePointFive 70%, Coherence 62%, Wim Hof 55%, Breathwrk 44%. Free apps barely register: Oak 4%, Breathing Zone 3%, Breathe2Relax 0%. A recurring line on Play: people resent “paying to breathe.” |
| **Bugs and reliability** | **19.8%** | Crashes mid-session, sound cues that stop, apps that ignore the chosen timings, watch apps that stop when the screen dims. In free apps, this is the main complaint. |
| **Account and login problems** | 13.6% | Forced sign-up before breathing, lost logins after updates, purchases not recognized. |
| **Trial auto-charge, cancelling, refunds** | 12.3% | Mostly subscription apps. |
| **Updates that removed or broke things** | 8.5% | Beloved features removed (Breathing Zone's automatic slow-down, Breathwrk's nostril/mouth indicators), redesigns, lost custom settings and history. |
| **Ads interrupting practice** | 6.5% | Especially pranayama apps (7pranayama: ads mid-session). |

**Takeaway.** Charging for breathing is the main thing that makes people angry. Among free apps, the main complaint is broken trust: crashes, wrong timing, lost data, removed features. Being free only wins if the app is also dependable.

## 2. What people praise

- **Simplicity** is the most common praise: 22.7% of 4–5★ reviews (16.9% of all). People value “not bloated,” few but good techniques, and nothing between them and the first breath.
- **What people use it for:** stress and anxiety (17.3% of positive reviews), sleep (8.2%), focus and waking up. About 90 reviews describe using an app in the moment, during panic or acute stress.
- **Custom timing** (10% of positive reviews) and **gentle audio cues**: bells, chimes, and sounds that differ by phase.
- **Privacy and no ads** appear in positive reviews of free apps (Oak, Yogi Breath).

## 3. What people ask for

Ranked by the number of App Store reviews with an explicit request on the theme, with total mentions for context:

| # | Request | Requests | Mentions | What they mean |
|---|---|---|---|---|
| 1 | **Sound and cue control** | 130 | 13.6% of reviews | A different sound for inhale, hold, and exhale; choose or turn off music; an in-app volume that is separate from media volume and balanced against the voice; soft beeps or bells instead of harsh pings |
| 2 | **Custom patterns** | 92 | 10.1% | Any ratio (7:7, 3:4, 8:12, exhale beyond 2×), fine steps (down to 0.1 s), save several named patterns, remember the last one |
| 3 | **Apple Watch app** | 55 | 165 reviews | The most-requested platform feature. Watch apps that stop when the wrist drops get 1★ reviews. On Play, Wear OS is requested less often. |
| 4 | **Visual comfort** | 54 | 8.6% | Choose colors, dark or night mode for bedtime (38 reviews), less-busy animation |
| 5 | **History and progress** | 51 | 6.2% | A calendar showing days, minutes, and which exercise; tap a day to see sessions. The strongest anger here is about *losing* history. |
| 6 | **Programs and structure** | 51 | 7.8% | More courses, check off completed challenges, beginner sequences, a monthly plan, schedules tailored to the person |
| 7 | **More techniques** | 44 | 6.1% | Especially pranayama: Nadi Shodhana, correct Kapalabhati, Bhramari, plus box and 4-7-8 in pranayama apps |
| 8 | **Keeps going with the screen off or locked** | 35 | 87 reviews | Eyes-closed and longer sessions; playing while using other apps; keeps working alongside music or podcasts |
| 9 | **Voice guidance** | 33 | 4.4% | A calm, natural voice; voice options; a voice that names the step. Robotic or rushed voices are criticized, including in pranayama apps. |
| 10 | **Session length and timer** | 29 | 3.5% | Longer sessions (10–20+ min), a visible countdown, finishing at the end of a breath rather than mid-breath |
| 11 | **Haptics** | 27 | 138 reviews | Vibration so the eyes can stay closed, a distinct pattern per phase, adjustable strength, and vibration that follows the length of the breath |
| 12 | **Reminders** | 25 | 151 reviews | A gentle daily reminder; mostly praised where it exists |
| 13 | **Rounds instead of minutes** | — | 67 reviews | “Set the reps”: choose the number of rounds, and show how many are left. Common in pranayama practice. |
| 14 | **Gradual slowing within a session** | — | 27 reviews | Start at one pace and slow down over the session. Breathing Zone users left 1★ reviews when it was removed. |

**Low demand despite industry attention:** HRV and biofeedback (5 requests), community and social features, big content libraries, widgets and Siri (43 reviews), and offline (19; users simply expect it). Apple Health sync has modest but steady requests (62 reviews), notably from pranayama users in India.

## 4. Pranayama practitioners

- **India is central:** 50% of reviews for pranayama-specific apps come from the India store. These users practise daily for years, often in 15-minute or longer sessions.
- **They want to keep their eyes closed,** which is proper technique. They ask for audio or voice cues that **name the side** (left or right) during alternate nostril breathing, and for correct instructions. A pranayama teacher criticized very brief Nadi Shodhana instructions in a mainstream app; another reviewer wished apps acknowledged the techniques' origins and names.
- **They want to control rounds and ratios:** set the number of rounds, see counts left, use exhale ratios beyond doubling, and repeat a technique within a routine.
- **They lose patience with:** crashes mid-practice (the dominant 7pranayama complaint), ads during sessions, mechanical voices and harsh pings, and paid unlocks that fail.
- **Adjacent asks:** Apple Health sync, an Apple Watch app, Hindi or Tamil, and occasionally asanas, mudras, or Surya Namaskar. The last group is scope creep; the rest are relevant.

## 5. Competitive alert: Prana Breath relaunched this month

Prana Breath (Android-first, 5M+ downloads) updated on **September 9, 2026**. Its Play listing now describes 80+ practices in 7 collections “from beginner breathwork to classical pranayama,” each with an explanation of what it does, how to sit, what can go wrong, and where it came from, with sources. It is free to start, with no ads and deliberately no narrator ([Play listing](https://play.google.com/store/apps/details?id=com.abdula.pranabreath)).

- **This overlaps directly with Viram's “sourced, authentic library” position.** That alone is no longer enough to set Viram apart.
- **The relaunch is hurting loyal users:** 16 of 41 September reviews in the Play sample are 1–2★. They cite a price increase, features moved behind the paywall, sounds skipping, lost custom settings, a lifetime purchase not honored, and missing nostril cues. Long-time users say they are looking for a new app **right now**.

**What still sets Viram apart:** the core stays free with no paywall creep, reliability is treated as a feature, voice guidance that names the side (Prana chose no narrator), teacher links that need no account, iOS and Android parity, and simplicity.

---

## 6. What this means for Viram

### Already in the plan (keep)
Free with no ads or account · a simple, one-action start · custom rhythms and My rhythms · voice, tones, and haptics with distinct phase cues · voice that names the side in Nadi Shodhana · finishing on a whole round with a visible countdown · reminders, a calendar without streaks, and curated programs (v1.1) · Apple Health (v1.1) · sourced technique guides.

### Gaps worth adding

| Priority | Change | Evidence | Where |
|---|---|---|---|
| **1** | **Guidance continues with the screen locked:** voice and tones play in the background, the screen may sleep, and only calls or other apps' audio pause it. This reverses the current pause-on-lock rule and needs a decision. | 87 reviews; top Prana Breath complaint; eyes-closed practice | v1.0 (CP1 decision) |
| **2** | **Sound controls:** a cue volume separate from media, “play with my music” (mix or duck), a choice of tone set, and haptic strength | Top request theme (130) | v1.0 |
| **3** | **Rounds target:** choose a number of rounds (e.g. 11 or 21) as an alternative to minutes, and show rounds left | 67 reviews; pranayama practice | v1.0 |
| **4** | **History and rhythms that can't be lost:** migration tests, device backup included (iCloud / Android Auto Backup), and export and import of My rhythms and history | Data loss is a top 1★ trigger across apps | v1.0 |
| **5** | **A public free-core promise** on the store page and in About: breathing practices, custom rhythms, and guidance are never paywalled | 41.6% of 1–2★; Prana Breath and Wim Hof backlash | v1.0 copy |
| **6** | **A natural-voice quality gate:** listener testing for calm and pace, not only pronunciation, with a Tones fallback always available | Robotic or rushed voice complaints | v1.0 voice pass |
| **7** | **Night comfort:** a true-black practice option, dimming, and a soft completion cue at night | 38 dark-mode requests; sleep use case | v1.1 |
| **8** | **Gradual slowing within a session** (e.g. from 5.5 to 6.5 s per breath) as an option for coherent breathing and custom rhythms | Loved feature; its removal caused 1★ reviews | v1.1 |
| **9** | **Repeat a technique within a routine** | Pranayama request | v1.1 |
| **10** | **Apple Watch companion** that keeps running with the wrist down and uses haptics for each phase | Most-requested platform feature (165) | v1.2 candidate, alongside teacher programs |
| **11** | **Hindi voice cues** | India-heavy pranayama audience | v1.2 candidate |
| — | **Never prompt for a rating during or right after practice** | Review nags draw 1★ | v1.0 rule |

### Messaging that answers what users ask for
1. **Free forever. No ads. No account.**
2. **Follow with your eyes closed:** voice that names the side, tones, and haptics, even with the screen locked.
3. **Authentic pranayama, explained and sourced.**
4. **Your rhythms and history are safe.**

### Timing
Prana Breath's unhappy long-time users are an audience that exists now. A dependable, free launch that makes it easy to recreate saved patterns, keeps guidance going with the screen locked, and supports rounds would meet their most common complaints. It is worth reaching this group directly at launch, e.g. in Play listing copy that speaks to switching.

## Limitations

- Reddit is missing (blocked by policy); forum voice comes from Hacker News, Product Hunt, and Trustpilot instead.
- The App Store review feed returns at most about 500 reviews per country and sort order, so large apps are under-sampled relative to their size.
- Keyword tagging is approximate. Themes were checked by reading samples, but exact percentages carry noise.
- The Prana Breath assessment reflects its first weeks after relaunch; sentiment may settle.
