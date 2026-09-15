import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, phaseColors, type } from '../theme';
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
  return phaseColors[phase];
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
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 1,
            borderColor: colors.practiceLine,
          },
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
    fontSize: type.hero + 16,
    fontFamily: fonts.displaySemibold,
    color: colors.pine,
    fontVariant: ['tabular-nums'],
  },
});
