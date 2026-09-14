import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

/** Lazily opens the local database and runs migrations. Safe to call often. */
export function getDb(): SQLite.SQLiteDatabase {
  if (db) return db;
  db = SQLite.openDatabaseSync('sama.db');
  db.execSync(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY NOT NULL,
      started_at INTEGER NOT NULL,
      ended_at INTEGER NOT NULL,
      pattern_name TEXT NOT NULL,
      inhale_sec REAL NOT NULL,
      hold_sec REAL NOT NULL,
      exhale_sec REAL NOT NULL,
      rest_sec REAL NOT NULL,
      cycles INTEGER NOT NULL,
      duration_sec INTEGER NOT NULL,
      completed INTEGER NOT NULL,
      heart_rate_before REAL,
      heart_rate_after REAL
    );
    CREATE INDEX IF NOT EXISTS idx_sessions_started ON sessions(started_at DESC);
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `);
  return db;
}
