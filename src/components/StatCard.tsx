import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, type, fontWeight } from '../theme';

interface Props {
  label: string;
  value: string;
  sub?: string;
}

export default function StatCard({ label, value, sub }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {sub ? <Text style={styles.sub}>{sub}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.md,
    minWidth: 0,
  },
  label: {
    fontSize: type.caption,
    color: colors.inkSoft,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: type.subtitle,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
  },
  sub: {
    fontSize: type.caption,
    color: colors.inkFaint,
    marginTop: spacing.xs,
  },
});
