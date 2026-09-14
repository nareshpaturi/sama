import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import { colors, spacing, type, fontWeight } from '../src/theme';
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
import PrimaryButton from '../src/components/PrimaryButton';
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

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <Text style={styles.patternName}>{patternName}</Text>

        <View style={styles.circleWrap}>
          <BreathingCircle phase={phase} progress={progress} secondsLeft={secondsLeft} />
        </View>

        <Text style={styles.phaseLabel}>{PHASE_LABELS[phase]}</Text>
        <Text style={styles.cue}>{PHASE_CUES[phase]}</Text>

        <Text style={styles.cycle}>
          Cycle {cycle} of {totalCycles}
        </Text>
        <Text style={styles.time}>
          {formatClock(totalElapsedMs / 1000)} / {formatClock(totalDurationSec)}
        </Text>

        <View style={styles.controls}>
          <PrimaryButton
            title={paused ? 'Resume' : 'Pause'}
            variant="secondary"
            onPress={togglePause}
          />
          <Pressable onPress={endSession} style={styles.endButton} accessibilityRole="button">
            <Text style={styles.endButtonText}>End session</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  patternName: {
    fontSize: type.caption,
    color: colors.inkSoft,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  circleWrap: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  phaseLabel: {
    fontSize: type.title,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
  },
  cue: {
    fontSize: type.body,
    color: colors.inkSoft,
    marginTop: spacing.xs,
  },
  cycle: {
    fontSize: type.body,
    color: colors.inkSoft,
    marginTop: spacing.lg,
    fontVariant: ['tabular-nums'],
  },
  time: {
    fontSize: type.caption,
    color: colors.inkFaint,
    marginTop: spacing.xs,
    fontVariant: ['tabular-nums'],
  },
  controls: {
    marginTop: 'auto',
    width: '100%',
    gap: spacing.md,
  },
  endButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  endButtonText: {
    fontSize: type.body,
    color: colors.danger,
  },
});
