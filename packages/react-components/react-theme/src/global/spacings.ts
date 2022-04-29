import type { HorizontalSpacingTokens, SpacingTokens, VerticalSpacingTokens } from '../types';

export const spacings: SpacingTokens = {
  none: '0',
  xxs: '2',
  xs: '4',
  sNudge: '6',
  s: '8',
  mNudge: '10',
  m: '12',
  l: '16',
  xl: '20',
  xxl: '24',
  xxxl: '32',
};

export const horizontalSpacings: HorizontalSpacingTokens = {
  spacingHorizontalNone: spacings.none,
  spacingHorizontalXXS: spacings.xxs,
  spacingHorizontalXS: spacings.xs,
  spacingHorizontalSNudge: spacings.sNudge,
  spacingHorizontalS: spacings.s,
  spacingHorizontalMNudge: spacings.mNudge,
  spacingHorizontalM: spacings.m,
  spacingHorizontalL: spacings.l,
  spacingHorizontalXL: spacings.xl,
  spacingHorizontalXXL: spacings.xxl,
  spacingHorizontalXXXL: spacings.xxxl,
};

export const verticalSpacings: VerticalSpacingTokens = {
  spacingVerticalNone: spacings.none,
  spacingVerticalXXS: spacings.xxs,
  spacingVerticalXS: spacings.xs,
  spacingVerticalSNudge: spacings.sNudge,
  spacingVerticalS: spacings.s,
  spacingVerticalMNudge: spacings.mNudge,
  spacingVerticalM: spacings.m,
  spacingVerticalL: spacings.l,
  spacingVerticalXL: spacings.xl,
  spacingVerticalXXL: spacings.xxl,
  spacingVerticalXXXL: spacings.xxxl,
};
