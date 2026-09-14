import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { colors, spacing, radius, type, fontWeight } from '../src/theme';
import PrimaryButton from '../src/components/PrimaryButton';
import StatCard from '../src/components/StatCard';
import TrendChart from '../src/components/TrendChart';
import {
  getStreak,
  getTotalSessions,
  getTotalMinutes,
  getMinutesByDay,
  getTotalsByPattern,
  type DayMinutes,
  type PatternTotal,
} from '../src/storage/sessions';
import {
  isHealthSupported,
  requestHealthPermissions,
  readHealthSnapshot,
  type HealthSnapshot,
} from '../src/health';

function hasAnyMinutes(days: DayMinutes[]): boolean {
  return days.some((d) => d.minutes > 0);
}

export default function ProgressScreen() {
  const [streak, setStreak] = useState(0);
  const [sessions, setSessions] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [week, setWeek] = useState<DayMinutes[]>([]);
  const [month, setMonth] = useState<DayMinutes[]>([]);
  const [patterns, setPatterns] = useState<PatternTotal[]>([]);
  const [health, setHealth] = useState<HealthSnapshot>({});
  const [healthConnected, setHealthConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const load = useCallback(() => {
    void (async () => {
      try {
        const [s, n, m, w, mo, p] = await Promise.all([
          getStreak(),
          getTotalSessions(),
          getTotalMinutes(),
          getMinutesByDay(7),
          getMinutesByDay(30),
          getTotalsByPattern(),
        ]);
        setStreak(s);
        setSessions(n);
        setMinutes(m);
        setWeek(w);
        setMonth(mo);
        setPatterns(p);
      } catch {
        // keep defaults
      }
      // Best-effort health read; never prompts here.
      try {
        const snap = await readHealthSnapshot();
        setHealth(snap);
        setHealthConnected(Object.keys(snap).length > 0);
      } catch {
        // ignore
      }
    })();
  }, []);

  useFocusEffect(load);

  const connectHealth = useCallback(() => {
    setConnecting(true);
    void (async () => {
      try {
        const ok = await requestHealthPermissions();
        if (ok) {
          const snap = await readHealthSnapshot();
          setHealth(snap);
          setHealthConnected(Object.keys(snap).length > 0);
        }
      } catch {
        // ignore
      } finally {
        setConnecting(false);
      }
    })();
  }, []);

  const healthRows: { label: string; text: string }[] = [];
  if (typeof health.restingHeartRate === 'number')
    healthRows.push({ label: 'Resting heart rate', text: `${Math.round(health.restingHeartRate)} bpm` });
  if (typeof health.hrvMs === 'number')
    healthRows.push({ label: 'Heart-rate variability', text: `${Math.round(health.hrvMs)} ms` });
  if (typeof health.respiratoryRate === 'number')
    healthRows.push({ label: 'Respiratory rate', text: `${health.respiratoryRate.toFixed(1)} breaths/min` });
  if (typeof health.spo2 === 'number')
    healthRows.push({ label: 'Blood oxygen (SpO2)', text: `${Math.round(health.spo2)}%` });
  if (typeof health.sleepHours === 'number')
    healthRows.push({ label: 'Sleep (last 24h)', text: `${health.sleepHours.toFixed(1)} h` });

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsRow}>
          <StatCard
            label="Streak"
            value={streak === 0 ? '—' : `${streak} day${streak === 1 ? '' : 's'}`}
          />
          <StatCard label="Sessions" value={String(sessions)} />
          <StatCard label="Minutes" value={minutes === 0 ? '—' : String(Math.round(minutes))} />
        </View>

        <Text style={styles.sectionTitle}>Last 7 days</Text>
        <View style={styles.card}>
          {hasAnyMinutes(week) ? (
            <TrendChart data={week} />
          ) : (
            <Text style={styles.empty}>
              Practice a few sessions to see your weekly trend.
            </Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Last 30 days</Text>
        <View style={styles.card}>
          {hasAnyMinutes(month) ? (
            <TrendChart data={month} />
          ) : (
            <Text style={styles.empty}>
              Practice a few sessions to see your monthly trend.
            </Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>By pattern</Text>
        {patterns.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.empty}>Your per-pattern totals will appear here.</Text>
          </View>
        ) : (
          patterns.map((p) => (
            <View key={p.patternName} style={styles.rowCard}>
              <Text style={styles.rowName}>{p.patternName}</Text>
              <Text style={styles.rowMeta}>
                {p.sessions} session{p.sessions === 1 ? '' : 's'} ·{' '}
                {Math.round(p.minutes)} min
              </Text>
            </View>
          ))
        )}

        <Text style={styles.sectionTitle}>Health</Text>
        <View style={styles.card}>
          {!isHealthSupported() ? (
            <Text style={styles.empty}>
              Health data isn't available on this device. Sama works fully without it.
            </Text>
          ) : healthRows.length > 0 ? (
            healthRows.map((r) => (
              <View key={r.label} style={styles.healthRow}>
                <Text style={styles.healthLabel}>{r.label}</Text>
                <Text style={styles.healthValue}>{r.text}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.empty}>
              {healthConnected
                ? 'No recent health data yet — it will appear here as your wearable syncs.'
                : 'Connect a wearable or grant health access to see trends here.'}
            </Text>
          )}
          {isHealthSupported() && healthRows.length === 0 ? (
            <View style={styles.healthCta}>
              <PrimaryButton
                title={connecting ? 'Connecting…' : 'Connect health data'}
                onPress={connectHealth}
              />
            </View>
          ) : null}
          <Text style={styles.disclaimer}>
            Trends are for general wellness awareness, not medical guidance.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: type.subtitle,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.md,
  },
  rowCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowName: {
    fontSize: type.body,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
  },
  rowMeta: {
    fontSize: type.caption,
    color: colors.inkSoft,
    fontVariant: ['tabular-nums'],
  },
  empty: {
    fontSize: type.body,
    color: colors.inkSoft,
    lineHeight: 22,
  },
  healthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  healthLabel: {
    fontSize: type.body,
    color: colors.ink,
  },
  healthValue: {
    fontSize: type.body,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
  },
  healthCta: {
    marginTop: spacing.md,
  },
  disclaimer: {
    fontSize: type.caption,
    color: colors.inkFaint,
    marginTop: spacing.md,
    lineHeight: 18,
  },
});
