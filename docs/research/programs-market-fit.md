# Programs: market fit and recommendation

Research date: September 23, 2026. Question: should Viram add **Programs**, multi-day structured pranayama plans that teachers create and publish, or that users create for themselves? Sources are linked inline; unverified items are listed at the end.

**Decision (September 23, 2026):** curated programs go into v1.1 (FR-20, checkpoint v1.1-G). Teacher programs (v1.2) wait for 6–8 teacher interviews.

**Verdict: yes, in a specific shape.** Curated programs are table stakes; every major breathing app has them. The unoccupied position is **teacher-authored programs of timed breathing practices, shared privately with students, free, offline, and without accounts.** No app we found does that. A public teacher marketplace is a different, much larger business (accounts, backend, moderation, payments) and should wait until the private teacher loop proves itself.

---

## 1. Who already offers programs

About 30 apps were checked. Multi-day breath programs are common, but they are almost always made by the company or its contracted instructors.

| App | Programs | Who creates | User-built multi-day plans | Private teacher → student | Pricing |
|---|---|---|---|---|---|
| Insight Timer | Courses (3+ lessons), e.g. Ben Holt's “21-Day Breathwork Academy” | Open but gated teacher marketplace (2 free tracks rated 4.5+, 1–2 week editorial review), ~20k teachers | No | No: groups can only recommend content; pointing students off-platform is banned | New courses subscriber-only ($59.99/yr); revenue by plays; donations 100% to teachers ([requirements](https://help.insighttimer.com/support/solutions/articles/67000664708-instructions-and-requirements-for-courses), [revenue](https://help.insighttimer.com/support/solutions/articles/67000664874-how-can-teachers-earn-revenue-from-their-work-)) |
| Breathwrk (reported acquired by Peloton, Oct 2025) | 7-day programs | In-house instructors | No | No | ~$12/mo ([App Store](https://apps.apple.com/us/app/breathwrk-breathing-exercises/id1481804500)) |
| Othership | Weekly journeys | Contracted facilitators | No | No | $129.99/yr ([App Store](https://apps.apple.com/us/app/othership-guided-breathwork/id1590348936)) |
| Wim Hof Method | 20- and 30-day challenges, 10-week courses | In-house | Single custom session | No | $42.99/yr ([App Store](https://apps.apple.com/us/app/wim-hof-method-breathwork/id890471578)) |
| SOMA Breath | 21-day journey (live, $497), in-app journeys | Founder; certified instructors teach live outside the app | Daily routine builder, not a day plan | Outside the app only | $89/yr ([App Store](https://apps.apple.com/us/app/soma-breath-guided-breathwork/id6450054756)) |
| Prana Breath | Difficulty levels, in-session progression | Developer | Unlimited custom patterns, no day plans | Single patterns by file, paid Guru tier | Free + Guru ([patterns](https://pranabreath.info/Get_new_patterns)) |
| Open | Series | Studio instructors | No | Gift links only | $149.99/yr ([App Store](https://apps.apple.com/us/app/open-breathwork-meditation/id1482725254)) |
| Yogi Breath, 7pranayama | Levels, goal programs, 21-day packages | Solo developers | 7pranayama has a paid schedule builder | No | Low-cost subscriptions; under 100 ratings each ([Yogi Breath](https://apps.apple.com/us/app/yogi-breath-guided-pranayama/id6744612926), [7pranayama](https://apps.apple.com/us/app/7pranayama-yoga-fitness-plan/id1127298201)) |
| Glo, YogaDownload, Yoga International | Pranayama series, 10-day immersion, 7-week course | Contracted teachers | No | No | Paid ([Glo](https://www.glo.com/programs/116), [YI](https://yogainternational.com/ecourse/build-a-personal-pranayama-practice-in-7-weeks/)) |
| BreathMAX, Down Dog | None / generated classes | Developer / algorithm | No | Single pattern or practice by code/link | Free + premium ([BreathMAX](https://breathmax.app/), [Down Dog](https://www.downdogapp.com/faq)) |
| Practice Better, OfferingTree, Tummee | Drip-fed programs for a teacher's clients | The teacher | n/a | Yes, with paid software and student accounts | Paid ([Practice Better](https://practicebetter.io/features/programs)) |

**What this shows**
- Ready-made programs are crowded. **Seven days** is the standard format; **21 days** is common in pranayama.
- The only open teacher marketplace (Insight Timer) is **paywalled, public, audio-only, and cannot be sent privately** to a teacher's own students.
- **No breathing app lets a user or teacher build a true Day 1…Day N plan with progressing ratios.** The closest are routine builders (SOMA, School of Breath), 7pranayama's paid schedule builder, and Prana Breath's in-session ramp.
- Private teacher-to-student sharing exists only for **single patterns** (Prana Breath's paid pattern files, BreathMAX codes). Sharing a **whole program**, offline and free, would be new.
- Teacher business tools deliver video and PDFs, not a breath pacer, and cost money.

## 2. The teacher side

- **Teachers pay $40–600 a month** for course and studio platforms: Kajabi $179–499, Teachable $39–189, Thinkific $54–219, Uscreen $49–499, Marvelous $79–179, Passion.io $119–599 ([Kajabi](https://kajabi.com/pricing), [Teachable](https://teachable.com/pricing), [Uscreen](https://www.uscreen.tv/pricing/), [Marvelous](https://heymarvelous.com/pricing), [Passion.io](https://www.passion.io/pricing)). They handle payments and media well, but none has an adjustable paced-breathing engine. Individual teachers fall back to YouTube and WhatsApp.
- **Demand signal:** single-teacher branded breathwork apps keep appearing, e.g. [9D](https://apps.apple.com/app/id6680193387), [The Breath Haus](https://apps.apple.com/app/id6740152987), and studio home-practice apps like [Om Spaces](https://apps.apple.com/mx/app/om-spaces/id6744583030).
- **Audience size (directional):** Yoga Alliance is reported at 100k+ registered teachers (secondary sources only); SOMA reports 2,000–4,000 instructors; 9D reports 1,300+ facilitators in 80+ countries ([9D](https://9dbreathwork.com/become-facilitator/)); the GPBA sets 400-hour training standards ([GPBA](https://breathworkalliance.com/training-standards/)).
- **Insight Timer economics:** ~20k teachers and 300k+ titles ([about](https://insighttimer.com/about)); teacher income depends on plays and return rates, with a bonus pool since 2024 ([FAQ](https://help.insighttimer.com/support/solutions/articles/67000737721-teacher-income-faq-august-2024)). Teachers who want income will go there; Viram competes on **tooling and control**, not payouts.

## 3. Platform and safety constraints

- **A public marketplace is user-generated content.** Apple 1.2 requires filtering, reporting with timely response, blocking, and published contact details; 1.2.1 treats creator content as UGC ([Apple guidelines](https://developer.apple.com/app-store/review/guidelines/)). Google Play requires terms acceptance, ongoing moderation, and in-app report and block ([Play UGC](https://support.google.com/googleplay/android-developer/answer/9876937)).
- **Selling programs or tipping in-app** falls under Apple 3.1.1 (in-app purchase, 15–30%). Apple moved to enforce this even on Insight Timer's teacher tips ([TechCrunch 2024](https://techcrunch.com/2024/02/21/in-a-reversal-apple-is-now-demanding-30-of-the-donations-to-meditation-app-insight-timers-teachers/)) and is moving Patreon onto in-app purchase by November 2026 ([TechCrunch 2026](https://techcrunch.com/2026/01/28/apple-tells-patreon-to-move-creators-to-in-app-purchase-for-subscriptions-by-november/)).
- **Safety:** hyperventilation followed by breath-holding can cause blackout without warning ([StatPearls](https://www.ncbi.nlm.nih.gov/books/NBK554620/)); drownings have been linked to breath practice in water ([Live Science](https://www.livescience.com/health/gambling-with-your-life-experts-weigh-in-on-dangers-of-the-wim-hof-method)). Teacher-authored free audio would put that risk outside Viram's control.

## 4. Do programs improve engagement?

The evidence is more careful than the marketing.

- **Baseline retention is very low:** median day-30 retention is 4.7% for mindfulness apps and 0.0% for breathing apps ([JMIR 2019](https://www.jmir.org/2019/9/e14567/)).
- **Programs alone don't create practice.** Placing Headspace users into a course doubled course starts (31% → 63%) but didn't significantly change meditation days; asking for a concrete **when-and-how plan** added +7.5% app opens and +4% return days ([Irrational Labs](https://irrationallabs.com/case-studies/headspace-doubled-course-starts/)). Implementation intentions show d ≈ 0.27–0.66 across 642 tests ([review](https://www.tandfonline.com/doi/abs/10.1080/10463283.2024.2334563)).
- **A human makes the biggest difference.** In web mindfulness programs, retention was **93% with a facilitator vs 67% without** ([review](https://pmc.ncbi.nlm.nih.gov/articles/PMC8792770/)); human contact and reminders lowered attrition in app trials ([meta-analysis](https://pubmed.ncbi.nlm.nih.gov/41259035/)). **This is the strongest argument for teacher-led programs:** the teacher supplies accountability an app can't.
- **Short programs work:** Calm's 7-day course improved wellbeing (d = 0.42 daily users) ([study](https://www.sciencedirect.com/science/article/pii/S2214782919300880)). 8-week programs had better compliance than longer ones.
- **Few people author content:** about 1% of users produce about 75% of content in health communities ([2014](https://pubmed.ncbi.nlm.nih.gov/24496109/)); self-set goals didn't help low-active users, while prescribed goals did ([2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12916092/)). A blank program builder for everyone would be little used.
- **Rigid plans drop people:** Couch-to-5K completion was 27.3%, with most dropouts before week 5 citing guilt and steep progression ([study](https://pmc.ncbi.nlm.nih.gov/articles/PMC10487403/)). Broken streaks reduce later engagement ([JCR](https://academic.oup.com/jcr/article-abstract/49/6/1095/6623414)); missing a single day doesn't harm habit formation ([EJSP](https://onlinelibrary.wiley.com/doi/abs/10.1002/ejsp.674)).

## 5. Recommendation

| Stage | What | Why | Effort (one engineer) |
|---|---|---|---|
| **v1.1 · Curated programs** | 2–3 Viram programs built from the library: a 7-day Pranayama Foundations and a 21-day Nadi Shodhana path | Parity with every competitor; free where others charge; proves the program engine | ~1.5–2 weeks on top of v1.1 routines, progression, and reminder, plus content |
| **v1.2 · Teacher programs, shared privately** | Program builder for teachers; share by link or QR; students import and follow; users can **duplicate and tweak** | The unoccupied position; turns teachers into distribution; the teacher is the “facilitator” that drives adherence | ~2–3 weeks |
| **Later, only if the loop works** | Public teacher directory or marketplace | Discovery and teacher reputation | 2–4 months plus ongoing moderation and support; accounts, backend, review queue, reporting, terms |

**Program design rules (all stages)**
- **Built from Viram's own techniques.** Teachers choose practices, rhythms within bounds, minutes, and days. They don't upload audio or instructions; guidance and safety notes always come from the app. Holds stay capped; vigorous techniques remain excluded until reviewed.
- **Phases, not 30 separate days.** A program is 1–4 phases of 1–7 days, each with 1–3 practices. A 21-day, three-phase plan fits in a short link, so **no backend is needed**.
- **Forgiving by design.** Advance by sessions completed, not calendar days. Never reset on a missed day; no streaks or shaming. Gentle steps between phases.
- **Plan plus reminder at the start.** Ask when the practitioner will practise and offer the v1.1 daily reminder.
- **No free text in v1.2** beyond a program name and teacher name (plain text, 40 characters each, labeled as chosen by the sender). Free-text teacher notes would make shared programs user-generated content with report and block obligations; add them only with that design.
- **Measure practice, not starts:** practice days per week for program starters vs others; 7-day program completion (stretch goal 25–30%); program links created and imported per week; D30 retention above the ~5% category median.

**Why not a marketplace now:** it breaks the no-account, no-backend posture; it requires moderation that store policies mandate; it invites payment requests that trigger in-app purchase rules; and it competes directly with Insight Timer's 20k teachers. Private sharing gets the growth loop without those costs.

**Validate before building v1.2:** interview 6–8 pranayama and yoga teachers. Ask how they give students practice between classes today, what a program looks like in their teaching, and whether a free link students open in an app would replace WhatsApp and PDFs. A clickable builder mock is enough for these conversations.

## Could not verify

- Reddit and forum demand threads (not reachable by the research tools).
- Primary-source counts for Yoga Alliance teachers and SOMA instructors.
- Othership's named multi-day programs; whether SOMA instructors can publish in-app.
- Insight Timer's current revenue split and the number and popularity of its breathwork courses; its course paywall appears inconsistent in practice.
- Breathwrk's acquisition details and program launch date.
- Usage rates of any app's custom-plan builder; completion rates for Calm, Headspace, or Insight Timer courses.
