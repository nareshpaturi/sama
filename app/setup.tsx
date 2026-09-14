import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors, spacing, radius, type, fontWeight } from '../src/theme';
import PrimaryButton from '../src/components/PrimaryButton';
import {
  PRESETS,
  formatPattern,
  type PatternConfig,
  type Phase,
} from '../src/engine/types';
import { getSettings, saveSettings } from '../src/storage/settings';

const DURATIONS = [3, 5, 10, 15, 20, 30];

const PHASE_FIELDS: { key: Phase; label: string }[] = [
  { key: 'inhale', label: 'Inhale' },
  { key: 'hold', label: 'Hold' },
  { key: 'exhale', label: 'Exhale' },
  { key: 'rest', label: 'Rest' },
];

function Stepper({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <View style={styles.stepperRow}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepperControls}>
        <Pressable
          style={styles.stepButton}
          onPress={() => onChange(Math.max(0, value - 1))}
          accessibilityLabel={`Decrease ${label}`}
        >
          <Text style={styles.stepButtonText}>−</Text>
        </Pressable>
        <Text style={styles.stepperValue}>{value}s</Text>
        <Pressable
          style={styles.stepButton}
          onPress={() => onChange(Math.min(12, value + 1))}
          accessibilityLabel={`Increase ${label}`}
        >
          <Text style={styles.stepButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function SetupScreen() {
  const [pattern, setPattern] = useState<PatternConfig>(PRESETS[0].pattern);
  const [patternName, setPatternName] = useState(PRESETS[0].name);
  const [selectedPreset, setSelectedPreset] = useState<number | 'custom'>(0);
  const [minutes, setMinutes] = useState(5);

  useEffect(() => {
    void (async () => {
      try {
        const s = await getSettings();
        setPattern(s.pattern);
        setPatternName(s.patternName);
        setMinutes(s.sessionMinutes);
        const idx = PRESETS.findIndex((p) => p.name === s.patternName);
        setSelectedPreset(idx >= 0 ? idx : 'custom');
      } catch {
        // fall back to defaults above
      }
    })();
  }, []);

  const choosePreset = (idx: number) => {
    void Haptics.selectionAsync();
    setSelectedPreset(idx);
    setPattern({ ...PRESETS[idx].pattern });
    setPatternName(PRESETS[idx].name);
  };

  const changePhase = (phase: Phase, value: number) => {
    setSelectedPreset('custom');
    setPattern((p) => ({ ...p, [`${phase}Sec`]: value }));
    setPatternName('Custom');
  };

  const start = () => {
    void (async () => {
      try {
        await saveSettings({ pattern, patternName, sessionMinutes: minutes });
      } catch {
        // settings are a convenience; the session can still run
      }
      router.push(
        `/session?pattern=${encodeURIComponent(JSON.stringify(pattern))}` +
          `&patternName=${encodeURIComponent(patternName)}&minutes=${minutes}`,
      );
    })();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Choose a pattern</Text>
        <Text style={styles.sectionHint}>Tap a card to select it.</Text>
        {PRESETS.map((preset, idx) => {
          const selected = selectedPreset === idx;
          return (
            <Pressable
              key={preset.name}
              onPress={() => choosePreset(idx)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`${preset.name}, ${formatPattern(preset.pattern)}`}
              style={({ pressed }) => [
                styles.card,
                selected && styles.cardSelected,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleWrap}>
                  <Text style={styles.presetName}>{preset.name}</Text>
                  <Text style={styles.presetPattern}>{formatPattern(preset.pattern)}</Text>
                </View>
                <View style={[styles.radio, selected && styles.radioSelected]}>
                  {selected ? <View style={styles.radioDot} /> : null}
                </View>
              </View>
              {preset.sanskrit ? (
                <Text style={styles.presetSanskrit}>{preset.sanskrit}</Text>
              ) : null}
              <Text style={styles.presetDesc}>{preset.description}</Text>
            </Pressable>
          );
        })}

        <Text style={styles.sectionTitle}>Custom timing</Text>
        <View style={styles.card}>
          {PHASE_FIELDS.map(({ key, label }) => (
            <Stepper
              key={key}
              label={label}
              value={pattern[`${key}Sec`]}
              onChange={(v) => changePhase(key, v)}
            />
          ))}
          <Text style={styles.hint}>
            Adjusting any phase creates a custom pattern, shown as {formatPattern(pattern)}.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Session length</Text>
        <View style={styles.chips}>
          {DURATIONS.map((d) => (
            <Pressable
              key={d}
              onPress={() => {
                void Haptics.selectionAsync();
                setMinutes(d);
              }}
              style={({ pressed }) => [
                styles.chip,
                minutes === d && styles.chipSelected,
                pressed && styles.cardPressed,
              ]}
            >
              <Text style={[styles.chipText, minutes === d && styles.chipTextSelected]}>
                {d} min
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.cta}>
          <PrimaryButton title="Start practice" onPress={start} />
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
    marginBottom: spacing.xs,
  },
  sectionHint: {
    fontSize: type.caption,
    color: colors.inkFaint,
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
  cardSelected: {
    borderColor: colors.accentDeep,
    borderWidth: 2,
  },
  cardPressed: {
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitleWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    flexShrink: 1,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  radioSelected: {
    borderColor: colors.accentDeep,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accentDeep,
  },
  presetName: {
    fontSize: type.body,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
  },
  presetPattern: {
    fontSize: type.body,
    color: colors.inkSoft,
    fontVariant: ['tabular-nums'],
  },
  presetSanskrit: {
    fontSize: type.caption,
    color: colors.accentDeep,
    marginTop: spacing.xs,
  },
  presetDesc: {
    fontSize: type.caption,
    color: colors.inkSoft,
    marginTop: spacing.xs,
    lineHeight: 18,
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  stepperLabel: {
    fontSize: type.body,
    color: colors.ink,
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  stepButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepButtonText: {
    fontSize: 20,
    color: colors.ink,
    lineHeight: 22,
  },
  stepperValue: {
    fontSize: type.body,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
    minWidth: 40,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  hint: {
    fontSize: type.caption,
    color: colors.inkFaint,
    marginTop: spacing.sm,
    lineHeight: 18,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: type.body,
    color: colors.ink,
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: fontWeight.semibold,
  },
  cta: {
    marginTop: spacing.xl,
  },
});
