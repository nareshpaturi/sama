import { getDb } from './db';

export interface SessionRecord {
  id: string;
  startedAt: number; // epoch ms
  endedAt: number; // epoch ms
  patternName: string;
  inhaleSec: number;
  holdSec: number;
  exhaleSec: number;
  restSec: number;
  cycles: number;
  durationSec: number;
  completed: boolean;
  heartRateBefore?: number;
  heartRateAfter?: number;
}

interface SessionRow {
  id: string;
  started_at: number;
  ended_at: number;
  pattern_name: string;
  inhale_sec: number;
  hold_sec: number;
  exhale_sec: number;
  rest_sec: number;
  cycles: number;
  duration_sec: number;
  completed: number;
  heart_rate_before: number | null;
  heart_rate_after: number | null;
}

function rowToRecord(row: SessionRow): SessionRecord {
  return {
    id: row.id,
    startedAt: row.started_at,
    endedAt: row.ended_at,
    patternName: row.pattern_name,
    inhaleSec: row.inhale_sec,
    holdSec: row.hold_sec,
    exhaleSec: row.exhale_sec,
    restSec: row.rest_sec,
    cycles: row.cycles,
    durationSec: row.duration_sec,
    completed: row.completed === 1,
    heartRateBefore: row.heart_rate_before ?? undefined,
    heartRateAfter: row.heart_rate_after ?? undefined,
  };
}

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function saveSession(
  input: Omit<SessionRecord, 'id'> & { id?: string },
): Promise<SessionRecord> {
  const record: SessionRecord = { ...input, id: input.id ?? newId() };
  getDb().runSync(
    `INSERT OR REPLACE INTO sessions
     (id, started_at, ended_at, pattern_name, inhale_sec, hold_sec, exhale_sec, rest_sec,
      cycles, duration_sec, completed, heart_rate_before, heart_rate_after)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      record.id,
      record.startedAt,
      record.endedAt,
      record.patternName,
      record.inhaleSec,
      record.holdSec,
      record.exhaleSec,
      record.restSec,
      record.cycles,
      record.durationSec,
      record.completed ? 1 : 0,
      record.heartRateBefore ?? null,
      record.heartRateAfter ?? null,
    ],
  );
  return record;
}

export async function getSession(id: string): Promise<SessionRecord | null> {
  const row = getDb().getFirstSync<SessionRow>('SELECT * FROM sessions WHERE id = ?', [id]);
  return row ? rowToRecord(row) : null;
}

export async function listSessions(limit = 60): Promise<SessionRecord[]> {
  const rows = getDb().getAllSync<SessionRow>(
    'SELECT * FROM sessions ORDER BY started_at DESC LIMIT ?',
    [limit],
  );
  return rows.map(rowToRecord);
}

/** Local calendar day key: YYYY-MM-DD. */
export function dayKey(epochMs: number): string {
  const d = new Date(epochMs);
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/**
 * Consecutive days with at least one completed session, ending today
 * (or yesterday if today has none yet — the streak is still alive).
 */
export async function getStreak(): Promise<number> {
  const rows = getDb().getAllSync<{ started_at: number }>(
    'SELECT started_at FROM sessions WHERE completed = 1 ORDER BY started_at DESC LIMIT 400',
  );
  const days = new Set(rows.map((r) => dayKey(r.started_at)));
  if (days.size === 0) return 0;

  const today = new Date();
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  // If no session today, the streak may still continue from yesterday.
  if (!days.has(dayKey(cursor.getTime()))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(dayKey(cursor.getTime()))) return 0;
  }
  let streak = 0;
  while (days.has(dayKey(cursor.getTime()))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export interface DayMinutes {
  date: string; // YYYY-MM-DD
  label: string; // e.g. "Mon"
  minutes: number;
}

/** Practice minutes per day for the last `days` days (oldest → newest). */
export async function getMinutesByDay(days: number): Promise<DayMinutes[]> {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  start.setDate(start.getDate() - (days - 1));
  const rows = getDb().getAllSync<{ started_at: number; duration_sec: number }>(
    'SELECT started_at, duration_sec FROM sessions WHERE started_at >= ?',
    [start.getTime()],
  );
  const byDay = new Map<string, number>();
  for (const r of rows) {
    const key = dayKey(r.started_at);
    byDay.set(key, (byDay.get(key) ?? 0) + r.duration_sec / 60);
  }
  const out: DayMinutes[] = [];
  const cursor = new Date(start);
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let i = 0; i < days; i++) {
    const key = dayKey(cursor.getTime());
    out.push({
      date: key,
      label: days <= 7 ? weekday[cursor.getDay()] : `${cursor.getMonth() + 1}/${cursor.getDate()}`,
      minutes: Math.round((byDay.get(key) ?? 0) * 10) / 10,
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

export interface PatternTotal {
  patternName: string;
  sessions: number;
  minutes: number;
}

export async function getTotalsByPattern(): Promise<PatternTotal[]> {
  const rows = getDb().getAllSync<{
    pattern_name: string;
    sessions: number;
    seconds: number;
  }>(
    `SELECT pattern_name, COUNT(*) AS sessions, SUM(duration_sec) AS seconds
     FROM sessions GROUP BY pattern_name ORDER BY sessions DESC`,
  );
  return rows.map((r) => ({
    patternName: r.pattern_name,
    sessions: r.sessions,
    minutes: Math.round((r.seconds / 60) * 10) / 10,
  }));
}

export async function getTotalSessions(): Promise<number> {
  const row = getDb().getFirstSync<{ n: number }>('SELECT COUNT(*) AS n FROM sessions');
  return row?.n ?? 0;
}

export async function getTotalMinutes(): Promise<number> {
  const row = getDb().getFirstSync<{ s: number }>(
    'SELECT COALESCE(SUM(duration_sec), 0) AS s FROM sessions',
  );
  return Math.round(((row?.s ?? 0) / 60) * 10) / 10;
}
