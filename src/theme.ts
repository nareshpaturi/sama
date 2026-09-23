/**
 * Viram visual-system tokens.
 *
 * The brand board is the identity source of truth: deep pine, living coral,
 * quiet sky, warm paper, Newsreader display type, and DM Sans interface type.
 * Screen code consumes semantic aliases so color meaning stays consistent.
 */

export const colors = {
  // Brand foundations
  pine: '#12372F',
  pineRaised: '#1C4B40',
  mist: '#EEF4EF',
  paper: '#FBFCF8',
  ink: '#17211D',
  inkSoft: '#59675F',
  inkFaint: '#68746D',
  coral: '#E46F51',
  coralDeep: '#963D29',
  saffron: '#E4B84A',
  sky: '#A8CFD0',
  line: '#D5DED6',
  white: '#FFFFFF',

  // Semantic application roles
  background: '#FBFCF8',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF4EF',
  primary: '#12372F',
  primaryDeep: '#0C211C',
  accent: '#E46F51',
  accentDeep: '#963D29',
  accentSoft: '#F9E3DC',
  divider: '#D5DED6',
  danger: '#963D29',
  success: '#1C4B40',
  focus: '#E46F51',

  // Immersive practice roles
  practiceBackground: '#12372F',
  practiceSurface: '#1C4B40',
  practiceText: '#FFFFFF',
  practiceTextMuted: '#CBE0D2',
  practiceLine: 'rgba(255, 255, 255, 0.28)',

  // Phase cues use the brand palette; labels and countdowns remain the
  // primary cue so phase meaning never depends on color alone.
  phaseInhale: '#A8CFD0',
  phaseHold: '#E4B84A',
  phaseExhale: '#E46F51',
  phaseRest: '#EEF4EF',
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
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
} as const;

export const type = {
  hero: 40,
  title: 30,
  subtitle: 20,
  body: 16,
  caption: 13,
} as const;

export const fonts = {
  displayMedium: 'Newsreader_500Medium',
  displaySemibold: 'Newsreader_600SemiBold',
  sansRegular: 'DMSans_400Regular',
  sansMedium: 'DMSans_500Medium',
  sansSemibold: 'DMSans_600SemiBold',
  sansBold: 'DMSans_700Bold',
} as const;

export const phaseColors = {
  inhale: colors.phaseInhale,
  hold: colors.phaseHold,
  exhale: colors.phaseExhale,
  rest: colors.phaseRest,
} as const;
