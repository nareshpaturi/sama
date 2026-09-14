/**
 * Sama brand tokens.
 * Calm, warm, grounded — deep indigo ink on warm sand, with a teal breath accent.
 */

export const colors = {
  background: '#FAF6EE',
  surface: '#FFFFFF',
  surfaceMuted: '#F0E9D8',
  ink: '#232A3B',
  inkSoft: '#6B7280',
  inkFaint: '#9AA0B4',
  primary: '#3A4668',
  primaryDeep: '#232A3B',
  accent: '#4FB3A1',
  accentDeep: '#2E7F74',
  accentSoft: '#DDF0EB',
  breathStart: '#A8BDF0',
  breathEnd: '#5B7BD5',
  hold: '#E8B04B',
  divider: '#E7DFCC',
  danger: '#C96F4A',
  success: '#4FB3A1',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 16,
  lg: 28,
  pill: 999,
} as const;

export const type = {
  hero: 40,
  title: 28,
  subtitle: 20,
  body: 16,
  caption: 13,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;
