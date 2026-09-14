import { View, Text, StyleSheet } from 'react-native';
import { colors, type, fontWeight } from '../theme';
import type { Phase } from '../engine/types';

interface Props {
  phase: Phase;
  /** 0..1 progress within the current phase. */
  progress: number;
  /** Whole seconds remaining in the current phase. */
  secondsLeft: number;
  size?: number;
}

function scaleFor(phase: Phase, progress: number): number {
  const p = Math.min(1, Math.max(0, progress));
  switch (phase) {
    case 'inhale':
      return 1 + 0.35 * p;
    case 'hold':
      return 1.35;
    case 'exhale':
      return 1.35 - 0.35 * p;
    case 'rest':
      return 1;
  }
}

function circleColor(phase: Phase): string {
  switch (phase) {
    case 'inhale':
      return colors.breathEnd;
    case 'hold':
      return colors.breathStart;
    case 'exhale':
      return colors.accent;
    case 'rest':
      return colors.inkFaint;
  }
}

/**
 * Concentric breathing guide. The parent re-renders on every engine tick
 * (~10/sec), so the circle grows and shrinks with pure View styling —
 * no animation library needed.
 */
export default function BreathingCircle({ phase, progress, secondsLeft, size = 280 }: Props) {
  const scale = scaleFor(phase, progress);
  const color = circleColor(phase);
  const innerSize = size * 0.62 * scale;
  const midSize = size * 0.82;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.ring,
          { width: size, height: size, borderRadius: size / 2, backgroundColor: colors.accentSoft },
        ]}
      />
      <View
        style={[
          styles.ring,
          {
            width: midSize,
            height: midSize,
            borderRadius: midSize / 2,
            backgroundColor: color,
            opacity: 0.22,
          },
        ]}
      />
      <View
        style={[
          styles.ring,
          {
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            backgroundColor: color,
          },
        ]}
      />
      <View style={styles.center}>
        <Text style={styles.seconds}>{Math.max(0, secondsLeft)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  seconds: {
    fontSize: type.hero,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
  },
});
