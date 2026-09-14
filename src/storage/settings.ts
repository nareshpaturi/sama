import { getDb } from './db';
import { PatternConfig, PRESETS } from '../engine/types';

export interface AppSettings {
  pattern: PatternConfig;
  patternName: string;
  sessionMinutes: number;
  tonesEnabled: boolean;
  hapticsEnabled: boolean;
}

const DEFAULTS: AppSettings = {
  pattern: PRESETS[0].pattern,
  patternName: PRESETS[0].name,
  sessionMinutes: 5,
  tonesEnabled: true,
  hapticsEnabled: true,
};

const KEYS: Record<keyof AppSettings, string> = {
  pattern: 'pattern',
  patternName: 'patternName',
  sessionMinutes: 'sessionMinutes',
  tonesEnabled: 'tonesEnabled',
  hapticsEnabled: 'hapticsEnabled',
};

function parse(key: keyof AppSettings, raw: string | null): unknown {
  if (raw == null) return DEFAULTS[key];
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULTS[key];
  }
}

export async function getSettings(): Promise<AppSettings> {
  const db = getDb();
  const get = (key: keyof AppSettings): string | null => {
    const row = db.getFirstSync<{ value: string }>('SELECT value FROM settings WHERE key = ?', [
      KEYS[key],
    ]);
    return row?.value ?? null;
  };
  return {
    pattern: parse('pattern', get('pattern')) as PatternConfig,
    patternName: parse('patternName', get('patternName')) as string,
    sessionMinutes: parse('sessionMinutes', get('sessionMinutes')) as number,
    tonesEnabled: parse('tonesEnabled', get('tonesEnabled')) as boolean,
    hapticsEnabled: parse('hapticsEnabled', get('hapticsEnabled')) as boolean,
  };
}

export async function saveSettings(patch: Partial<AppSettings>): Promise<void> {
  const db = getDb();
  for (const [k, v] of Object.entries(patch)) {
    const key = k as keyof AppSettings;
    db.runSync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [
      KEYS[key],
      JSON.stringify(v),
    ]);
  }
}
