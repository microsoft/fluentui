import type { IPalette } from '@fluentui/react';
import type { BrandVariants } from '@fluentui/react-components';
import { TinyColor } from '@ctrl/tinycolor';
import type { ColorInput } from '@ctrl/tinycolor';

/**
 * A helper to mix colors using tiny color by an amount and get back a hex string.
 */
const mixColors = (colorA: ColorInput, colorB: ColorInput, amount?: number) => {
  return new TinyColor(colorA).mix(new TinyColor(colorB), amount).toHexString();
};

/**
 * Creates a v9 brand ramp by pairwise mixing v8 palette colors.
 */
const mixByPairs = (palette: IPalette): BrandVariants => {
  return {
    10: palette.themeDarker,
    20: mixColors(palette.themeDarker, palette.themeDark),
    30: palette.themeDark,
    40: mixColors(palette.themeDark, palette.themeDarkAlt),
    50: palette.themeDarkAlt,
    60: mixColors(palette.themeDarkAlt, palette.themePrimary),
    70: palette.themePrimary,
    80: mixColors(palette.themePrimary, palette.themeSecondary),
    90: palette.themeSecondary,
    100: mixColors(palette.themeSecondary, palette.themeTertiary),
    110: palette.themeTertiary,
    120: mixColors(palette.themeTertiary, palette.themeLight),
    130: palette.themeLight,
    140: mixColors(palette.themeLight, palette.themeLighter),
    150: palette.themeLighter,
    160: mixColors(palette.themeLighter, palette.themeLighterAlt),
  };
};

/**
 * Creates a v9 brand ramp by mixing v8 palette colors
 * using steps between themeDarker and themePrimary and
 * between themePrimary and themeLighterAlt.
 */
const mixPrimaryAndEnds = (palette: IPalette): BrandVariants => {
  return {
    10: palette.themeDarker,
    20: mixColors(palette.themeDarker, palette.themePrimary, 20),
    30: mixColors(palette.themeDarker, palette.themePrimary, 30),
    40: mixColors(palette.themeDarker, palette.themePrimary, 40),
    50: mixColors(palette.themeDarker, palette.themePrimary, 50),
    60: mixColors(palette.themeDarker, palette.themePrimary, 60),
    70: mixColors(palette.themeDarker, palette.themePrimary, 70),
    80: palette.themePrimary,
    90: mixColors(palette.themePrimary, palette.themeLighterAlt, 10),
    100: mixColors(palette.themePrimary, palette.themeLighterAlt, 20),
    110: mixColors(palette.themePrimary, palette.themeLighterAlt, 30),
    120: mixColors(palette.themePrimary, palette.themeLighterAlt, 40),
    130: mixColors(palette.themePrimary, palette.themeLighterAlt, 50),
    140: mixColors(palette.themePrimary, palette.themeLighterAlt, 60),
    150: mixColors(palette.themePrimary, palette.themeLighterAlt, 70),
    160: palette.themeLighterAlt,
  };
};

type Interpolation = 'pairs' | 'primaryAndEnds';

/**
 * Creates v9 brand colors from a v8 palette using interpolation
 * A v8 palette has nine colors and v9 has sixteen colors.
 */
export const createBrandVariants = (palette: IPalette, interpolation: Interpolation = 'pairs'): BrandVariants => {
  switch (interpolation) {
    case 'primaryAndEnds':
      return mixPrimaryAndEnds(palette);
    case 'pairs':
    default:
      return mixByPairs(palette);
  }
};
