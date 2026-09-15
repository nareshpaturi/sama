import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, fonts, radius, spacing, type } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export default function PrimaryButton({ title, onPress, variant = 'primary' }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'primary' ? styles.labelPrimary : styles.labelSecondary,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.md,
    paddingVertical: 13,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: type.body,
    fontFamily: fonts.sansBold,
  },
  labelPrimary: {
    color: colors.white,
  },
  labelSecondary: {
    color: colors.ink,
  },
});
