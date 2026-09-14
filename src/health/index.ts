import { Platform } from 'react-native';

/**
 * Unified, permission-gated health interface.
 *
 * iOS → HealthKit (react-native-health)
 * Android → Health Connect (react-native-health-connect)
 *
 * Every function is safe: it never throws and simply reports failure,
 * so the app is fully usable with no wearable, no permission, or no data.
 */

export interface HealthSnapshot {
  restingHeartRate?: number; // bpm
  hrvMs?: number; // milliseconds
  heartRate?: number; // bpm, most recent
  respiratoryRate?: number; // breaths/min
  spo2?: number; // percent
  sleepHours?: number; // last 24h
}

export function isHealthSupported(): boolean {
  return Platform.OS === 'ios' || Platform.OS === 'android';
}

/** Asks the OS for health permissions. True when health reads are possible. */
export async function requestHealthPermissions(): Promise<boolean> {
  try {
    if (Platform.OS === 'ios') {
      const mod = await import('./healthkit');
      return mod.requestPermissions();
    }
    if (Platform.OS === 'android') {
      const mod = await import('./healthconnect');
      return mod.requestPermissions();
    }
    return false;
  } catch {
    return false;
  }
}

/** Latest available indicators; absent fields mean "no data", not zero. */
export async function readHealthSnapshot(): Promise<HealthSnapshot> {
  try {
    if (Platform.OS === 'ios') {
      const mod = await import('./healthkit');
      return mod.readSnapshot();
    }
    if (Platform.OS === 'android') {
      const mod = await import('./healthconnect');
      return mod.readSnapshot();
    }
    return {};
  } catch {
    return {};
  }
}

/** Writes the session as mindful minutes to the system health store. */
export async function logMindfulSession(start: Date, end: Date): Promise<boolean> {
  try {
    if (Platform.OS === 'ios') {
      const mod = await import('./healthkit');
      return mod.logMindfulSession(start, end);
    }
    if (Platform.OS === 'android') {
      const mod = await import('./healthconnect');
      return mod.logMindfulSession(start, end);
    }
    return false;
  } catch {
    return false;
  }
}
