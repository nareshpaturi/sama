import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { colors, spacing, radius, type, fontWeight } from '../src/theme';
import PrimaryButton from '../src/components/PrimaryButton';
import StatCard from '../src/components/StatCard';
import {
  getStreak,
  getTotalMinutes,
  listSessions,
  type SessionRecord,
} from '../src/storage/sessions';
import { formatDateTime, formatDurationShort } from '../src/lib/format';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const [streak, setStreak] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [recent, setRecent] = useState<SessionRecord[]>([]);

  const load = useCallback(() => {
    void (async () => {
      try {
        const [s, m, r] = await Promise.all([
          getStreak(),
          getTotalMinutes(),
          listSessions(3),
        ]);
        setStreak(s);
        setMinutes(m);
        setRecent(r);
      } catch {
        // storage unavailable — home still renders with zeros
      }
    })();
  }, []);

  useFocusEffect(load);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>{greeting()}</Text>
        <Text style={styles.brand}>Sama Breath</Text>
        <Text style={styles.tagline}>Breathe by your numbers.</Text>

        <View style={styles.statsRow}>
          <StatCard
            label="Streak"
            value={streak === 0 ? '—' : `${streak} day${streak === 1 ? '' : 's'}`}
            sub={streak === 0 ? 'Practice today to begin' : 'Keep it going'}
          />
          <StatCard
            label="Total practice"
            value={minutes === 0 ? '—' : `${Math.round(minutes)} min`}
            sub={minutes === 0 ? 'Your minutes add up here' : 'Across all sessions'}
          />
        </View>

        <View style={styles.cta}>
          <PrimaryButton title="Begin practice" onPress={() => router.push('/setup')} />
        </View>

        <Text style={styles.sectionTitle}>Recent sessions</Text>
        {recent.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.empty}>
              No sessions yet. Your practice history will appear here.
            </Text>
          </View>
        ) : (
          recent.map((s) => (
            <Pressable
              key={s.id}
              style={styles.card}
              onPress={() => router.push('/history')}
            >
              <View style={styles.rowBetween}>
                <Text style={styles.sessionName}>{s.patternName}</Text>
                <Text style={styles.sessionMeta}>{formatDurationShort(s.durationSec)}</Text>
              </View>
              <Text style={styles.sessionDate}>{formatDateTime(s.startedAt)}</Text>
            </Pressable>
          ))
        )}

        <View style={styles.navRow}>
          <Pressable style={styles.navCard} onPress={() => router.push('/progress')}>
            <Text style={styles.navTitle}>Progress</Text>
            <Text style={styles.navSub}>Trends and health signals</Text>
          </Pressable>
          <Pressable style={styles.navCard} onPress={() => router.push('/settings')}>
            <Text style={styles.navTitle}>Settings</Text>
            <Text style={styles.navSub}>Sound, haptics, defaults</Text>
          </Pressable>
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
  greeting: {
    fontSize: type.body,
    color: colors.inkSoft,
    marginTop: spacing.sm,
  },
  brand: {
    fontSize: type.hero,
    fontWeight: fontWeight.bold,
    color: colors.ink,
    marginTop: spacing.xs,
  },
  tagline: {
    fontSize: type.body,
    color: colors.inkSoft,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  cta: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: type.subtitle,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
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
    color: colors.inkSoft,
    lineHeight: 22,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionName: {
    fontSize: type.body,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
  },
  sessionMeta: {
    fontSize: type.body,
    color: colors.inkSoft,
  },
  sessionDate: {
    fontSize: type.caption,
    color: colors.inkFaint,
    marginTop: spacing.xs,
  },
  navRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  navCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.md,
  },
  navTitle: {
    fontSize: type.body,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
  },
  navSub: {
    fontSize: type.caption,
    color: colors.inkSoft,
    marginTop: spacing.xs,
  },
});
