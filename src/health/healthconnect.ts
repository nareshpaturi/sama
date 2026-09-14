import {
  initialize,
  requestPermission,
  readRecords,
  insertRecords,
} from 'react-native-health-connect';
import type { HealthSnapshot } from './index';

import type { Permission } from 'react-native-health-connect';

// MindfulnessSessionType.BREATHING
const MINDFULNESS_BREATHING = 2;

const READ_PERMS: Permission[] = [
  { accessType: 'read', recordType: 'HeartRate' },
  { accessType: 'read', recordType: 'RestingHeartRate' },
  { accessType: 'read', recordType: 'HeartRateVariabilityRmssd' },
  { accessType: 'read', recordType: 'RespiratoryRate' },
  { accessType: 'read', recordType: 'OxygenSaturation' },
  { accessType: 'read', recordType: 'SleepSession' },
];
const WRITE_PERMS: Permission[] = [{ accessType: 'write', recordType: 'MindfulnessSession' }];

async function ensureInitialized(): Promise<boolean> {
  try {
    return await initialize();
  } catch {
    return false;
  }
}

/** Prompts for Health Connect permission. Resolves true when usable. */
export async function requestPermissions(): Promise<boolean> {
  try {
    if (!(await ensureInitialized())) return false;
    const granted = await requestPermission([...READ_PERMS, ...WRITE_PERMS]);
    return granted.length > 0;
  } catch {
    return false;
  }
}

const isoDaysAgo = (days: number) =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

async function readLatest<T>(recordType: string, daysBack: number): Promise<T | null> {
  try {
    const result = await readRecords(recordType as never, {
      timeRangeFilter: {
        operator: 'between',
        startTime: isoDaysAgo(daysBack),
        endTime: new Date().toISOString(),
      },
    });
    const records = (result as { records: T[] }).records;
    if (!records || records.length === 0) return null;
    return records[records.length - 1];
  } catch {
    return null;
  }
}

/** Reads the latest available indicators. Missing data is simply omitted. */
export async function readSnapshot(): Promise<HealthSnapshot> {
  const snapshot: HealthSnapshot = {};
  try {
    if (!(await ensureInitialized())) return snapshot;

    const [resting, hrv, heart, rr, spo2, sleep] = await Promise.all([
      readLatest<{ beatsPerMinute: number }>('RestingHeartRate', 7),
      readLatest<{ heartRateVariabilityMillis: number }>('HeartRateVariabilityRmssd', 7),
      readLatest<{ samples: Array<{ beatsPerMinute: number; time: string }> }>('HeartRate', 1),
      readLatest<{ rate: number }>('RespiratoryRate', 1),
      readLatest<{ percentage: number }>('OxygenSaturation', 1),
      readRecords('SleepSession' as never, {
        timeRangeFilter: {
          operator: 'between',
          startTime: isoDaysAgo(1),
          endTime: new Date().toISOString(),
        },
      }).catch(() => null) as Promise<{ records: Array<{ startTime: string; endTime: string }> } | null>,
    ]);

    if (resting?.beatsPerMinute) snapshot.restingHeartRate = Math.round(resting.beatsPerMinute);
    if (hrv?.heartRateVariabilityMillis)
      snapshot.hrvMs = Math.round(hrv.heartRateVariabilityMillis);
    if (heart?.samples?.length) {
      const latest = heart.samples[heart.samples.length - 1];
      if (latest?.beatsPerMinute) snapshot.heartRate = Math.round(latest.beatsPerMinute);
    }
    if (rr?.rate) snapshot.respiratoryRate = Math.round(rr.rate * 10) / 10;
    if (spo2?.percentage) snapshot.spo2 = Math.round(spo2.percentage);
    if (sleep?.records?.length) {
      const ms = sleep.records.reduce((sum, s) => {
        const d = new Date(s.endTime).getTime() - new Date(s.startTime).getTime();
        return sum + (d > 0 ? d : 0);
      }, 0);
      if (ms > 0) snapshot.sleepHours = Math.round((ms / 3600000) * 10) / 10;
    }
  } catch {
    // return whatever we managed to gather
  }
  return snapshot;
}

/** Logs the session as a breathing mindfulness session in Health Connect. */
export async function logMindfulSession(start: Date, end: Date): Promise<boolean> {
  try {
    if (!(await ensureInitialized())) return false;
    await insertRecords([
      {
        recordType: 'MindfulnessSession',
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        mindfulnessSessionType: MINDFULNESS_BREATHING,
      },
    ]);
    return true;
  } catch {
    return false;
  }
}
