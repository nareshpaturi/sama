import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import { StatusBar } from 'expo-status-bar';
import { colors, fonts, radius, spacing, type } from '../src/theme';
import { BreathingEngine } from '../src/engine/BreathingEngine';
import {
  PRESETS,
  PHASE_LABELS,
  PHASE_CUES,
  cycleSeconds,
  cyclesForDuration,
  type Phase,
  type PatternConfig,
} from '../src/engine/types';
import BreathingCircle from '../src/components/BreathingCircle';
import { playPhaseTone, playCompletionTone } from '../src/audio/tones';
import { phaseHaptic, completionHaptic } from '../src/haptics';
import { saveSession } from '../src/storage/sessions';
import { getSettings } from '../src/storage/settings';
import { readHealthSnapshot, logMindfulSession } from '../src/health';
import { formatClock } from '../src/lib/format';

function parsePattern(raw: string | undefined): PatternConfig {
  try {
    if (raw) {
      const p = JSON.parse(raw) as Partial<PatternConfig>;
      if (
        typeof p.inhaleSec === 'number' &&
        typeof p.holdSec === 'number' &&
        typeof p.exhaleSec === 'number' &&
        typeof p.restSec === 'number'
      ) {
        return p as PatternConfig;
      }
    }
  } catch {
    // fall through to default
  }
  return PRESETS[0].pattern;
}

export default function SessionScreen() {
  useKeepAwake();
  const { width, height, fontScale } = useWindowDimensions();

  const params = useLocalSearchParams<{
    pattern?: string;
    patternName?: string;
    minutes?: string;
  }>();
  const navigation = useNavigation();

  const pattern = useMemo(() => parsePattern(params.pattern), [params.pattern]);
  const patternName = params.patternName ?? 'Custom';
  const minutes = useMemo(() => {
    const m = parseInt(params.minutes ?? '', 10);
    return Number.isFinite(m) && m > 0 ? m : 5;
  }, [params.minutes]);
  const totalCycles = useMemo(
    () => cyclesForDuration(pattern, minutes * 60),
    [pattern, minutes],
  );
  const totalDurationSec = useMemo(
    () => totalCycles * cycleSeconds(pattern),
    [pattern, totalCycles],
  );

  const [phase, setPhase] = useState<Phase>('inhale');
  const [cycle, setCycle] = useState(1);
  const [phaseDurationMs, setPhaseDurationMs] = useState(4000);
  const [phaseElapsedMs, setPhaseElapsedMs] = useState(0);
  const [totalElapsedMs, setTotalElapsedMs] = useState(0);
  const [paused, setPaused] = useState(false);

  const engineRef = useRef<BreathingEngine | null>(null);
  const flagsRef = useRef({ tones: true, haptics: true });
  const finishedRef = useRef(false);
  const startTimeRef = useRef(0);
  const hrBeforeRef = useRef<number | undefined>(undefined);

  const finish = useCallback(
    async (completed: boolean) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      const engine = engineRef.current;
      const snap = engine?.snapshot();
      engine?.stop();
      const endTime = Date.now();
      const startTime = startTimeRef.current > 0 ? startTimeRef.current : endTime;

      let hrAfter: number | undefined;
      try {
        const s = await readHealthSnapshot();
        if (typeof s.heartRate === 'number') hrAfter = s.heartRate;
      } catch {
        // health unavailable — session still saves
      }

      const durationSec = Math.max(1, Math.round((endTime - startTime) / 1000));
      const cycles = completed
        ? totalCycles
        : Math.max(1, Math.min(totalCycles, snap?.cycle ?? 1));

      if (completed) {
        playCompletionTone();
        void completionHaptic();
      }

      try {
        const record = await saveSession({
          startedAt: startTime,
          endedAt: endTime,
          patternName,
          inhaleSec: pattern.inhaleSec,
          holdSec: pattern.holdSec,
          exhaleSec: pattern.exhaleSec,
          restSec: pattern.restSec,
          cycles,
          durationSec,
          completed,
          heartRateBefore: hrBeforeRef.current,
          heartRateAfter: hrAfter,
        });
        try {
          await logMindfulSession(new Date(startTime), new Date(endTime));
        } catch {
          // health logging is best-effort
        }
        router.replace(`/summary?id=${record.id}`);
      } catch {
        router.replace('/');
      }
    },
    [pattern, patternName, totalCycles],
  );
  const finishRef = useRef(finish);
  finishRef.current = finish;

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const settings = await getSettings();
        if (cancelled) return;
        flagsRef.current = {
          tones: settings.tonesEnabled,
          haptics: settings.hapticsEnabled,
        };
      } catch {
        // keep defaults
      }
      if (cancelled) return;
      // Best-effort baseline heart rate; no permission prompt here.
      try {
        const s = await readHealthSnapshot();
        if (!cancelled && typeof s.heartRate === 'number') {
          hrBeforeRef.current = s.heartRate;
        }
      } catch {
        // ignore
      }
      if (cancelled) return;

      const engine = new BreathingEngine(pattern, totalCycles, {
        onPhaseStart: (ph, cy, durMs) => {
          setPhase(ph);
          setCycle(cy);
          setPhaseDurationMs(durMs);
          setPhaseElapsedMs(0);
          if (flagsRef.current.tones) playPhaseTone(ph);
          if (flagsRef.current.haptics) void phaseHaptic(ph);
        },
        onTick: (_ph, _cy, phaseElapsed, phaseDur, totalElapsed) => {
          setPhaseElapsedMs(phaseElapsed);
          setPhaseDurationMs(phaseDur);
          setTotalElapsedMs(totalElapsed);
        },
        onComplete: () => {
          void finishRef.current(true);
        },
      });
      engineRef.current = engine;
      startTimeRef.current = Date.now();
      engine.start();
    })();
    return () => {
      cancelled = true;
      engineRef.current?.stop();
    };
  }, [pattern, totalCycles]);

  // If the user somehow navigates away mid-session, stop the engine.
  useEffect(() => {
    const sub = navigation.addListener('beforeRemove', () => {
      engineRef.current?.stop();
    });
    return sub;
  }, [navigation]);

  const togglePause = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (paused) {
      engine.resume();
      setPaused(false);
    } else {
      engine.pause();
      setPaused(true);
    }
  }, [paused]);

  const endSession = useCallback(() => {
    void finishRef.current(false);
  }, []);

  const progress =
    phaseDurationMs > 0 ? Math.min(1, Math.max(0, phaseElapsedMs / phaseDurationMs)) : 0;
  const secondsLeft = Math.ceil(Math.max(0, phaseDurationMs - phaseElapsedMs) / 1000);
  const sessionProgress = Math.min(1, totalElapsedMs / Math.max(1, totalDurationSec * 1000));
  const phaseNumber = { inhale: 1, hold: 2, exhale: 3, rest: 4 }[phase];
  const circleSize = Math.max(
    190,
    Math.min(280, width - spacing.xxl, height * (fontScale > 1.3 ? 0.27 : 0.34)),
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Pressable
            onPress={endSession}
            style={({ pressed }) => [styles.endButton, pressed && styles.controlPressed]}
            accessibilityRole="button"
            accessibilityLabel="End session"
          >
            <Text style={styles.endButtonText}>End</Text>
          </Pressable>
          <Text style={styles.topTime}>{formatClock(totalDurationSec)}</Text>
          <View style={styles.topSpacer} />
        </View>

        <Text style={styles.patternName}>PHASE {phaseNumber} OF 4</Text>

        <View style={styles.circleWrap}>
          <BreathingCircle
            phase={phase}
            progress={progress}
            secondsLeft={secondsLeft}
            size={circleSize}
          />
        </View>

        <Text style={styles.phaseLabel}>{PHASE_LABELS[phase]}</Text>
        <Text style={styles.cue}>{PHASE_CUES[phase]}</Text>

        <Text style={styles.cycle}>
          Cycle {cycle} of {totalCycles} · {pattern.inhaleSec}–{pattern.holdSec}–{pattern.exhaleSec}–{pattern.restSec}
        </Text>

        {paused ? (
          <View style={styles.pausePanel} accessibilityRole="alert">
            <Text style={styles.pauseTitle}>Session paused</Text>
            <Text style={styles.pauseCopy}>Resume when you feel ready.</Text>
          </View>
        ) : null}

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${sessionProgress * 100}%` }]} />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.time}>{formatClock(totalElapsedMs / 1000)}</Text>
          <Text style={styles.time}>{paused ? 'Session paused' : 'Session in progress'}</Text>
        </View>

        <View style={styles.controls}>
          <Pressable
            onPress={togglePause}
            style={({ pressed }) => [styles.roundAction, pressed && styles.controlPressed]}
            accessibilityRole="button"
            accessibilityLabel={paused ? 'Resume session' : 'Pause session'}
          >
            <Text style={styles.roundActionText}>{paused ? '▶' : 'Ⅱ'}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.practiceBackground,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  topRow: {
    width: '100%',
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topTime: {
    fontSize: type.caption,
    fontFamily: fonts.sansSemibold,
    color: colors.practiceText,
    fontVariant: ['tabular-nums'],
  },
  topSpacer: {
    width: 52,
  },
  patternName: {
    fontSize: type.caption,
    fontFamily: fonts.sansSemibold,
    color: colors.practiceTextMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: spacing.md,
  },
  circleWrap: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  phaseLabel: {
    fontSize: type.title,
    fontFamily: fonts.displaySemibold,
    color: colors.practiceText,
  },
  cue: {
    fontSize: type.body,
    fontFamily: fonts.sansRegular,
    color: colors.practiceTextMuted,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  cycle: {
    fontSize: type.caption,
    fontFamily: fonts.sansRegular,
    color: colors.practiceTextMuted,
    marginTop: spacing.sm,
    fontVariant: ['tabular-nums'],
  },
  time: {
    fontSize: type.caption,
    fontFamily: fonts.sansRegular,
    color: colors.practiceTextMuted,
    fontVariant: ['tabular-nums'],
  },
  pausePanel: {
    width: '100%',
    marginTop: spacing.md,
    padding: spacing.md,
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.practiceLine,
    backgroundColor: colors.practiceSurface,
  },
  pauseTitle: {
    fontSize: type.body,
    fontFamily: fonts.sansSemibold,
    color: colors.practiceText,
  },
  pauseCopy: {
    fontSize: type.caption,
    fontFamily: fonts.sansRegular,
    color: colors.practiceTextMuted,
    marginTop: spacing.xs,
  },
  progressTrack: {
    width: '100%',
    height: 3,
    marginTop: 'auto',
    backgroundColor: colors.practiceLine,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.practiceText,
  },
  timeRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  controls: {
    marginTop: spacing.md,
    width: '100%',
    alignItems: 'center',
  },
  endButton: {
    width: 52,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endButtonText: {
    fontSize: type.body,
    fontFamily: fonts.sansSemibold,
    color: colors.practiceText,
  },
  roundAction: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.practiceText,
  },
  roundActionText: {
    fontSize: 20,
    fontFamily: fonts.sansBold,
    color: colors.pine,
  },
  controlPressed: {
    opacity: 0.72,
  },
});
