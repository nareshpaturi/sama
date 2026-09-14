import * as Haptics from 'expo-haptics';
import type { Phase } from './engine/types';

/** Haptic cue on each phase transition. Never throws. */
export async function phaseHaptic(phase: Phase): Promise<void> {
  try {
    switch (phase) {
      case 'inhale':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'hold':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'exhale':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'rest':
        await Haptics.selectionAsync();
        break;
    }
  } catch {
    // Haptics unavailable — the session continues silently.
  }
}

/** Celebratory haptic when a session completes. Never throws. */
export async function completionHaptic(): Promise<void> {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {
    // ignore
  }
}
