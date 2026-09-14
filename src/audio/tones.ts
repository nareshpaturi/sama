import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import type { AudioPlayer } from 'expo-audio';
import type { Phase } from '../engine/types';

const TONE_SOURCES: Record<Phase, number> = {
  inhale: require('../../assets/tones/inhale.wav'),
  hold: require('../../assets/tones/hold.wav'),
  exhale: require('../../assets/tones/exhale.wav'),
  rest: require('../../assets/tones/rest.wav'),
};
const COMPLETE_SOURCE: number = require('../../assets/tones/complete.wav');

type ToneKey = Phase | 'complete';

const players = new Map<ToneKey, AudioPlayer>();
let audioConfigured = false;

/**
 * Prepares the audio pipeline. Safe to call repeatedly; call once at app
 * start so the first phase transition has zero latency.
 */
export async function ensureTonesReady(): Promise<void> {
  try {
    if (!audioConfigured) {
      // Tones must be audible even when the iPhone silent switch is on —
      // a breathing guide that goes mute is a broken guide.
      await setAudioModeAsync({ playsInSilentMode: true });
      audioConfigured = true;
    }
    (Object.keys(TONE_SOURCES) as Phase[]).forEach((phase) => {
      if (!players.has(phase)) players.set(phase, createAudioPlayer(TONE_SOURCES[phase]));
    });
    if (!players.has('complete')) players.set('complete', createAudioPlayer(COMPLETE_SOURCE));
  } catch {
    // Audio unavailable — the session continues with haptics only.
  }
}

async function playTone(key: ToneKey): Promise<void> {
  try {
    await ensureTonesReady();
    const player = players.get(key);
    if (!player) return;
    try {
      await player.seekTo(0);
    } catch {
      // seek unsupported on this platform — play from current position
    }
    player.play();
  } catch {
    // never let audio break a session
  }
}

/** Soft chime marking a phase transition. Fire-and-forget. */
export function playPhaseTone(phase: Phase): void {
  void playTone(phase);
}

/** Gentle three-note bell when a session completes. Fire-and-forget. */
export function playCompletionTone(): void {
  void playTone('complete');
}
