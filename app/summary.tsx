import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, fonts, spacing, radius, type } from '../src/theme';
import PrimaryButton from '../src/components/PrimaryButton';
import StatCard from '../src/components/StatCard';
import { getSession, type SessionRecord } from '../src/storage/sessions';
import { formatClock, formatDateTime } from '../src/lib/format';
import { formatPattern, type PatternConfig } from '../src/engine/types';

export default function SummaryScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [record, setRecord] = useState<SessionRecord | null>(null);

  useEffect(() => {
    if (id) {
      void getSession(id).then(setRecord);
    }
  }, [id]);

  if (!record) {
    return (
      <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
        <View style={styles.center}>
          <Text style={styles.body}>Loading session…</Text>
        </View>
      </SafeAreaView>
    );
  }

  const pattern: PatternConfig = {
    inhaleSec: record.inhaleSec,
    holdSec: record.holdSec,
    exhaleSec: record.exhaleSec,
    restSec: record.restSec,
  };
  const showHr =
    typeof record.heartRateBefore === 'number' && typeof record.heartRateAfter === 'number';
  const hrDelta = showHr
    ? Math.round((record.heartRateAfter as number) - (record.heartRateBefore as number))
    : 0;

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{record.completed ? 'Session complete' : 'Session ended'}</Text>
        <Text style={styles.subtitle}>
          {record.patternName} · {formatPattern(pattern)}
        </Text>
        <Text style={styles.date}>{formatDateTime(record.startedAt)}</Text>

        <View style={styles.statsRow}>
          <StatCard label="Duration" value={formatClock(record.durationSec)} />
          <StatCard label="Breath cycles" value={String(record.cycles)} />
        </View>

        {showHr ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Heart rate</Text>
            <Text style={styles.hrLine}>
              {record.heartRateBefore} → {record.heartRateAfter} bpm
              <Text style={styles.hrDelta}>
                {' '}
                ({hrDelta > 0 ? '+' : ''}
                {hrDelta} bpm)
              </Text>
            </Text>
            <Text style={styles.cardSub}>
              A lower heart rate after practice is common. Trends are for general wellness
              awareness, not medical guidance.
            </Text>
          </View>
        ) : null}

        <View style={styles.cta}>
          <PrimaryButton title="Done" onPress={() => router.replace('/')} />
          <View style={styles.gap} />
          <PrimaryButton
            title="Practice again"
            variant="secondary"
            onPress={() => router.push('/setup')}
          />
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    fontSize: type.body,
    fontFamily: fonts.sansRegular,
    color: colors.inkSoft,
  },
  title: {
    fontSize: type.title,
    fontFamily: fonts.displaySemibold,
    color: colors.ink,
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: type.body,
    fontFamily: fonts.sansRegular,
    color: colors.inkSoft,
    marginTop: spacing.xs,
  },
  date: {
    fontSize: type.caption,
    fontFamily: fonts.sansRegular,
    color: colors.inkFaint,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
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
    marginTop: spacing.md,
  },
  cardTitle: {
    fontSize: type.caption,
    fontFamily: fonts.sansRegular,
    color: colors.inkSoft,
    marginBottom: spacing.xs,
  },
  hrLine: {
    fontSize: type.subtitle,
    fontFamily: fonts.displaySemibold,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
  },
  hrDelta: {
    fontSize: type.body,
    fontFamily: fonts.sansRegular,
    color: colors.inkSoft,
  },
  cardSub: {
    fontSize: type.caption,
    fontFamily: fonts.sansRegular,
    color: colors.inkFaint,
    marginTop: spacing.sm,
    lineHeight: 18,
  },
  cta: {
    marginTop: spacing.xl,
  },
  gap: {
    height: spacing.md,
  },
});
