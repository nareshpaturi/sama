# Sama Breath

**Breathe by your numbers.** A free, cross-platform pranayama app for iOS and Android.

Custom per-phase breathing timers (e.g. 4-4-6-4), guided tones + haptics, local
session history, streaks, and permission-gated health trends from Apple HealthKit
(iOS) and Health Connect (Android).

> **Audio roadmap:** the first test builds use **tones + haptics only**.
> Recorded voice guidance is added after testing, before public launch.

---

## 1. Run it locally

### Prerequisites

| You need | Notes |
|---|---|
| Node.js 22+ and npm | Check with `node --version` |
| For iOS builds | A Mac with Xcode installed |
| For Android builds | Android Studio (Mac, Windows, or Linux) |
| A phone (recommended) | Health features need a real device |

### Setup

```bash
git clone <your-repo-url> sama
cd sama
npm install
```

> If `npm install` ever fails with an `ERESOLVE` conflict around `react-dom`,
> the repo pins it exactly (`"react-dom": "19.2.3"` plus an npm `overrides`
> entry) — pull latest and retry before changing versions.

### Running

**This app needs a development build, not Expo Go.** It ships native health
modules (`react-native-health`, `react-native-health-connect`) that don't exist
inside the Expo Go sandbox.

```bash
# Android (emulator or USB-connected device)
npx expo run:android

# iOS (Mac only — simulator or USB-connected device)
npx expo run:ios
```

The first run compiles the native projects (a few minutes). After that, start
the dev server for fast iteration:

```bash
npx expo start --dev-client
```

Then open the **development build** app on your phone (not Expo Go) and scan
the QR code, or press `a` / `i` in the terminal.

### Testing checklist (first pass)

1. **Timer accuracy** — run a 4-4-4-4 session; phases should flip exactly on
   time and the circle animation should stay in sync with the tones.
2. **Background behavior** — lock the phone mid-session; the timer is
   wall-clock based so it should resume on the correct phase.
3. **Tones + haptics** — each phase transition plays a soft chime and a tap.
   iPhone silent switch on: tones should still play.
4. **History & streaks** — finish a session, check Home and History; do one
   session two days in a row and confirm the streak increments.
5. **Health (physical device only)** — Settings → Health access → grant
   permission; Progress should show resting HR / HRV / respiratory rate / SpO₂ /
   sleep when the paired wearable has synced data. Deny permission → the app
   must work normally with friendly empty states.
6. **Custom pattern** — build a 4-4-6-4 (or any) pattern in Setup and confirm
   the summary shows it correctly.

---

## 2. Push to GitHub

Create a **private** repo on GitHub (don't initialize it with a README), then:

```bash
cd sama
git remote add origin git@github.com:<your-username>/<repo>.git
git add -A
git commit -m "Sama Breath — MVP (tones + haptics)"
git push -u origin main
```

Later changes: `git add -A && git commit -m "..." && git push`.

---

## 3. Builds & store submission (EAS)

```bash
npm install -g eas-cli
eas login
eas build:configure   # creates eas.json
```

```bash
# Test on your phone via internal distribution
eas build --profile preview --platform all

# Store-ready binaries
eas build --profile production --platform all
eas submit --platform ios     # needs App Store Connect record "Sama Breath"
eas submit --platform android # needs Play Console app, package com.samabreath.app
```

**Before submitting:**
- App Store Connect: create the **Sama Breath** record (bundle id
  `com.samabreath.app`).
- Play Console: create the app with package `com.samabreath.app`.
- Privacy policy: required by both stores (health data access). Host it at
  `https://samabreath.app/privacy` and link it in the store listings.
- Apple HealthKit: the build enables the HealthKit capability automatically via
  config plugin; answer Apple's health-data questions honestly in review
  ("reads heart/HRV/sleep to display trends; writes mindful minutes").
- Screenshots: 6.7" iOS + 10" Android tablet recommended.
- Copy: keep claims modest — no medical promises. The Settings screen already
  carries the breath-retention safety note; mirror it in the store description.

---

## 4. Project structure

```
sama/
  app/                    # expo-router screens
    _layout.tsx           # stack nav + DB/audio init
    index.tsx             # Home — streak, quick start, recent sessions
    setup.tsx             # pattern presets + custom builder + duration
    session.tsx           # breathing player (engine + tones + haptics)
    summary.tsx           # post-session summary
    history.tsx           # session list
    progress.tsx          # streaks, charts, per-pattern totals, health
    settings.tsx          # toggles, defaults, health access, safety note
  src/
    theme.ts              # Sama brand tokens
    engine/
      types.ts            # Phase, PatternConfig, presets (4-4-4-4, 4-4-6-4, 4-7-8)
      BreathingEngine.ts  # drift-free wall-clock phase machine
    audio/tones.ts        # generated chimes via expo-audio (silent-switch proof)
    haptics.ts            # expo-haptics cues
    storage/
      db.ts               # expo-sqlite schema
      sessions.ts         # sessions, streaks, per-day minutes, pattern totals
      settings.ts         # user preferences
    health/
      index.ts            # unified safe interface (never throws)
      healthkit.ts        # iOS — Apple HealthKit
      healthconnect.ts    # Android — Health Connect
    components/           # BreathingCircle, StatCard, TrendChart, PrimaryButton
  assets/
    icon.png / splash.png / favicon.png
    tones/                # inhale/hold/exhale/rest/complete chimes (WAV)
```

## 5. Architecture notes

- **Local-first.** Sessions and settings live in SQLite on-device. No backend,
  no account, no analytics in v1.
- **Health is optional.** Every health function fails soft — the app is fully
  usable with no wearable, no permission, or no data.
- **Timing is wall-clock.** `BreathingEngine` recomputes phase from timestamps
  each tick, so animation, tones and haptics can't drift apart, and
  pause/resume is exact.
- **Voice guidance comes later.** The engine fires `onPhaseStart` per phase —
  the hook for recorded voice cues is already there; add playback in
  `session.tsx` when the voice assets land.

## 6. Roadmap

- [x] Custom per-phase timers, presets, tones + haptics
- [x] Local history, streaks, progression analytics
- [x] HealthKit + Health Connect (read indicators, write mindful minutes)
- [ ] Physical-device testing pass
- [ ] Recorded voice guidance
- [ ] Store submission (Sama Breath)
