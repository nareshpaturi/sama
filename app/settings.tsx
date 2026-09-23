import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing, radius, type } from '../src/theme';
import PrimaryButton from '../src/components/PrimaryButton';
import { PRESETS } from '../src/engine/types';
import { getSettings, saveSettings, type AppSettings } from '../src/storage/settings';
import { isHealthSupported, requestHealthPermissions } from '../src/health';

function Stepper({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <View style={styles.stepperRow}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.stepperControls}>
        <Pressable
          style={styles.stepButton}
          onPress={() => onChange(Math.max(min, value - 1))}
          accessibilityLabel={`Decrease ${label}`}
        >
          <Text style={styles.stepButtonText}>−</Text>
        </Pressable>
        <Text style={styles.stepperValue}>
          {value}
          {unit}
        </Text>
        <Pressable
          style={styles.stepButton}
          onPress={() => onChange(Math.min(max, value + 1))}
          accessibilityLabel={`Increase ${label}`}
        >
          <Text style={styles.stepButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const [tonesEnabled, setTonesEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [sessionMinutes, setSessionMinutes] = useState(5);
  const [patternName, setPatternName] = useState(PRESETS[0].name);
  const [healthBusy, setHealthBusy] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const s = await getSettings();
        setTonesEnabled(s.tonesEnabled);
        setHapticsEnabled(s.hapticsEnabled);
        setSessionMinutes(s.sessionMinutes);
        setPatternName(s.patternName);
      } catch {
        // keep defaults
      }
    })();
  }, []);

  const persist = (patch: Partial<AppSettings>) => {
    void saveSettings(patch).catch(() => undefined);
  };

  const setTones = (v: boolean) => {
    setTonesEnabled(v);
    persist({ tonesEnabled: v });
  };

  const setHaptics = (v: boolean) => {
    setHapticsEnabled(v);
    persist({ hapticsEnabled: v });
  };

  const setMinutes = (v: number) => {
    setSessionMinutes(v);
    persist({ sessionMinutes: v });
  };

  const choosePattern = (idx: number) => {
    const preset = PRESETS[idx];
    setPatternName(preset.name);
    void saveSettings({ pattern: preset.pattern, patternName: preset.name }).catch(
      () => undefined,
    );
  };

  const connectHealth = () => {
    setHealthBusy(true);
    void (async () => {
      try {
        const ok = await requestHealthPermissions();
        Alert.alert(
          'Health access',
          ok
            ? 'Health access granted. Your latest indicators will appear under Progress.'
            : 'Health access was not granted. You can enable it anytime from your device settings.',
        );
      } catch {
        Alert.alert(
          'Health access',
          'Health access could not be enabled on this device.',
        );
      } finally {
        setHealthBusy(false);
      }
    })();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Practice</Text>
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <Text style={styles.rowLabel}>Phase tones</Text>
            <Switch
              value={tonesEnabled}
              onValueChange={setTones}
              trackColor={{ false: colors.divider, true: colors.primary }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.switchRow}>
            <Text style={styles.rowLabel}>Haptics</Text>
            <Switch
              value={hapticsEnabled}
              onValueChange={setHaptics}
              trackColor={{ false: colors.divider, true: colors.primary }}
            />
          </View>
          <View style={styles.divider} />
          <Stepper
            label="Default session length"
            value={sessionMinutes}
            min={1}
            max={60}
            unit=" min"
            onChange={setMinutes}
          />
        </View>

        <Text style={styles.sectionTitle}>Default pattern</Text>
        {PRESETS.map((preset, idx) => {
          const selected = patternName === preset.name;
          return (
            <Pressable
              key={preset.name}
              onPress={() => choosePattern(idx)}
              style={[styles.card, styles.presetCard, selected && styles.cardSelected]}
            >
              <Text style={styles.presetName}>{preset.name}</Text>
              {selected ? <Text style={styles.selectedMark}>Selected</Text> : null}
            </Pressable>
          );
        })}

        <Text style={styles.sectionTitle}>Health</Text>
        <View style={styles.card}>
          <Text style={styles.body}>
            Sama can read resting heart rate, heart-rate variability, respiratory rate, blood
            oxygen and sleep from your device's health store, and log sessions as mindful
            minutes. Access is read-only except for session logging, and always optional.
          </Text>
          {isHealthSupported() ? (
            <View style={styles.healthCta}>
              <PrimaryButton
                title={healthBusy ? 'Requesting…' : 'Enable health access'}
                variant="secondary"
                onPress={connectHealth}
              />
            </View>
          ) : (
            <Text style={styles.bodyMuted}>Health data isn't available on this device.</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Safety</Text>
        <View style={styles.card}>
          <Text style={styles.body}>
            Breath retention isn't for everyone — skip holds if you're pregnant, have heart or
            blood pressure conditions, or feel dizzy. Never practice while driving.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <Text style={styles.body}>Sama Breath 1.0.0</Text>
          <Text style={styles.bodyMuted}>Steady breath. Steady mind.</Text>
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
    fontFamily: fonts.displaySemibold,
    color: colors.ink,
    marginTop: spacing.lg,
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
  presetCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  presetName: {
    fontSize: type.body,
    fontFamily: fonts.sansSemibold,
    color: colors.ink,
  },
  selectedMark: {
    fontSize: type.caption,
    fontFamily: fonts.sansMedium,
    color: colors.primary,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
  rowLabel: {
    fontSize: type.body,
    fontFamily: fonts.sansRegular,
    color: colors.ink,
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  stepButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepButtonText: {
    fontSize: 20,
    fontFamily: fonts.sansRegular,
    color: colors.ink,
    lineHeight: 22,
  },
  stepperValue: {
    fontSize: type.body,
    fontFamily: fonts.sansSemibold,
    color: colors.ink,
    minWidth: 56,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  body: {
    fontSize: type.body,
    fontFamily: fonts.sansRegular,
    color: colors.ink,
    lineHeight: 22,
  },
  bodyMuted: {
    fontSize: type.body,
    fontFamily: fonts.sansRegular,
    color: colors.inkSoft,
    marginTop: spacing.xs,
  },
  healthCta: {
    marginTop: spacing.md,
  },
});
