import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { colors, fonts, spacing, radius, type } from '../src/theme';
import { listSessions, type SessionRecord } from '../src/storage/sessions';
import { formatClock, formatDateTime } from '../src/lib/format';

export default function HistoryScreen() {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);

  const load = useCallback(() => {
    void (async () => {
      try {
        setSessions(await listSessions(60));
      } catch {
        setSessions([]);
      }
    })();
  }, []);

  useFocusEffect(load);

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {sessions.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.empty}>
              No sessions yet — your practice history will appear here.
            </Text>
          </View>
        ) : (
          sessions.map((s) => (
            <View key={s.id} style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.name}>{s.patternName}</Text>
                <View
                  style={[
                    styles.badge,
                    s.completed ? styles.badgeComplete : styles.badgeEnded,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      s.completed ? styles.badgeTextComplete : styles.badgeTextEnded,
                    ]}
                  >
                    {s.completed ? 'Complete' : 'Ended'}
                  </Text>
                </View>
              </View>
              <Text style={styles.date}>{formatDateTime(s.startedAt)}</Text>
              <Text style={styles.meta}>
                {formatClock(s.durationSec)} · {s.cycles} cycle{s.cycles === 1 ? '' : 's'}
              </Text>
            </View>
          ))
        )}
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  empty: {
    fontSize: type.body,
    fontFamily: fonts.sansRegular,
    color: colors.inkSoft,
    lineHeight: 22,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: type.body,
    fontFamily: fonts.sansSemibold,
    color: colors.ink,
  },
  date: {
    fontSize: type.caption,
    fontFamily: fonts.sansRegular,
    color: colors.inkFaint,
    marginTop: spacing.xs,
  },
  meta: {
    fontSize: type.caption,
    fontFamily: fonts.sansRegular,
    color: colors.inkSoft,
    marginTop: spacing.xs,
    fontVariant: ['tabular-nums'],
  },
  badge: {
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
  },
  badgeComplete: {
    backgroundColor: colors.mist,
  },
  badgeEnded: {
    backgroundColor: colors.surfaceMuted,
  },
  badgeText: {
    fontSize: type.caption,
    fontFamily: fonts.sansMedium,
  },
  badgeTextComplete: {
    color: colors.success,
  },
  badgeTextEnded: {
    color: colors.inkSoft,
  },
});
