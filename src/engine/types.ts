/** Core breathing-engine types. Phase durations are in seconds. */

export type Phase = 'inhale' | 'hold' | 'exhale' | 'rest';

export const PHASES: Phase[] = ['inhale', 'hold', 'exhale', 'rest'];

export interface PatternConfig {
  inhaleSec: number;
  holdSec: number;
  exhaleSec: number;
  restSec: number;
}

export interface PatternPreset {
  name: string;
  sanskrit?: string;
  description: string;
  pattern: PatternConfig;
}

export const PRESETS: PatternPreset[] = [
  {
    name: 'Box Breathing',
    sanskrit: 'Sama Vritti',
    description: 'Equal phases. Steady, grounding, balanced.',
    pattern: { inhaleSec: 4, holdSec: 4, exhaleSec: 4, restSec: 4 },
  },
  {
    name: 'Extended Exhale',
    description: 'Longer exhale to unwind and settle the body.',
    pattern: { inhaleSec: 4, holdSec: 4, exhaleSec: 6, restSec: 4 },
  },
  {
    name: 'Deep Relaxation',
    description: 'Classic 4-7-8 rhythm for winding down.',
    pattern: { inhaleSec: 4, holdSec: 7, exhaleSec: 8, restSec: 0 },
  },
];

export const PHASE_LABELS: Record<Phase, string> = {
  inhale: 'Breathe in',
  hold: 'Hold',
  exhale: 'Breathe out',
  rest: 'Rest',
};

export const PHASE_CUES: Record<Phase, string> = {
  inhale: 'Slowly fill your lungs',
  hold: 'Gently hold, shoulders soft',
  exhale: 'Slowly let it all go',
  rest: 'Pause before the next breath',
};

/** Total seconds of one full breathing cycle. */
export function cycleSeconds(pattern: PatternConfig): number {
  return pattern.inhaleSec + pattern.holdSec + pattern.exhaleSec + pattern.restSec;
}

/** Whole cycles that fit inside a session of `totalSeconds`. Minimum 1. */
export function cyclesForDuration(pattern: PatternConfig, totalSeconds: number): number {
  const per = cycleSeconds(pattern);
  if (per <= 0) return 1;
  return Math.max(1, Math.floor(totalSeconds / per));
}

export function formatPattern(pattern: PatternConfig): string {
  return `${pattern.inhaleSec}-${pattern.holdSec}-${pattern.exhaleSec}-${pattern.restSec}`;
}

export function patternEquals(a: PatternConfig, b: PatternConfig): boolean {
  return (
    a.inhaleSec === b.inhaleSec &&
    a.holdSec === b.holdSec &&
    a.exhaleSec === b.exhaleSec &&
    a.restSec === b.restSec
  );
}
