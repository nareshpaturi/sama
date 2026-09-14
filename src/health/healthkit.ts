import AppleHealthKit from 'react-native-health';
import type { HealthSnapshot } from './index';

const P = AppleHealthKit.Constants.Permissions;

const READ = [
  P.HeartRate,
  P.RestingHeartRate,
  P.HeartRateVariability,
  P.RespiratoryRate,
  P.OxygenSaturation,
  P.SleepAnalysis,
];
const WRITE = [P.MindfulSession];

function isAvailable(): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      AppleHealthKit.isAvailable((err: object, available: boolean) => {
        resolve(!err && available === true);
      });
    } catch {
      resolve(false);
    }
  });
}

/** Prompts for HealthKit permission. Resolves true when HealthKit is usable. */
export async function requestPermissions(): Promise<boolean> {
  try {
    if (!(await isAvailable())) return false;
    const granted = await new Promise<boolean>((resolve) => {
      AppleHealthKit.initHealthKit({ permissions: { read: READ, write: WRITE } }, (err: string) => {
        resolve(!err);
      });
    });
    return granted;
  } catch {
    return false;
  }
}

function call<T>(fn: (cb: (err: string, res: T) => void) => void): Promise<T | null> {
  return new Promise((resolve) => {
    try {
      fn((err, res) => resolve(err ? null : res));
    } catch {
      resolve(null);
    }
  });
}

const isoDaysAgo = (days: number) =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

/** Reads the latest available indicators. Missing data is simply omitted. */
export async function readSnapshot(): Promise<HealthSnapshot> {
  const snapshot: HealthSnapshot = {};
  try {
    if (!(await isAvailable())) return snapshot;

    const [resting, hrv, hr, rr, spo2, sleep] = await Promise.all([
      call<{ value: number }>((cb) =>
        AppleHealthKit.getRestingHeartRate({ startDate: isoDaysAgo(7) }, cb),
      ),
      call<Array<{ value: number; startDate: string }>>((cb) =>
        AppleHealthKit.getHeartRateVariabilitySamples(
          { startDate: isoDaysAgo(7), limit: 10 },
          cb,
        ),
      ),
      call<Array<{ value: number; startDate: string }>>((cb) =>
        AppleHealthKit.getHeartRateSamples({ startDate: isoDaysAgo(1), limit: 5 }, cb),
      ),
      call<Array<{ value: number; startDate: string }>>((cb) =>
        AppleHealthKit.getRespiratoryRateSamples({ startDate: isoDaysAgo(1), limit: 5 }, cb),
      ),
      call<Array<{ value: number; startDate: string }>>((cb) =>
        AppleHealthKit.getOxygenSaturationSamples({ startDate: isoDaysAgo(1), limit: 5 }, cb),
      ),
      call<Array<{ startDate: string; endDate: string }>>((cb) =>
        AppleHealthKit.getSleepSamples({ startDate: isoDaysAgo(1) }, cb),
      ),
    ]);

    if (resting?.value) snapshot.restingHeartRate = Math.round(resting.value);

    if (hrv && hrv.length > 0) {
      const latest = hrv.reduce((a, b) => (a.startDate > b.startDate ? a : b));
      if (latest.value) snapshot.hrvMs = Math.round(latest.value * 1000); // s → ms
    }
    if (hr && hr.length > 0) {
      const latest = hr.reduce((a, b) => (a.startDate > b.startDate ? a : b));
      if (latest.value) snapshot.heartRate = Math.round(latest.value);
    }
    if (rr && rr.length > 0) {
      const latest = rr.reduce((a, b) => (a.startDate > b.startDate ? a : b));
      if (latest.value) snapshot.respiratoryRate = Math.round(latest.value * 10) / 10;
    }
    if (spo2 && spo2.length > 0) {
      const latest = spo2.reduce((a, b) => (a.startDate > b.startDate ? a : b));
      if (latest.value) snapshot.spo2 = Math.round(latest.value * 100); // fraction → %
    }
    if (sleep && sleep.length > 0) {
      const ms = sleep.reduce((sum, s) => {
        const d = new Date(s.endDate).getTime() - new Date(s.startDate).getTime();
        return sum + (d > 0 ? d : 0);
      }, 0);
      if (ms > 0) snapshot.sleepHours = Math.round((ms / 3600000) * 10) / 10;
    }
  } catch {
    // return whatever we managed to gather
  }
  return snapshot;
}

/** Logs the session as a mindful-breathing session in HealthKit. */
export async function logMindfulSession(start: Date, end: Date): Promise<boolean> {
  try {
    if (!(await isAvailable())) return false;
    const ok = await new Promise<boolean>((resolve) => {
      AppleHealthKit.saveMindfulSession(
        { startDate: start.toISOString(), endDate: end.toISOString(), value: 0 },
        (err: string) => resolve(!err),
      );
    });
    return ok;
  } catch {
    return false;
  }
}
