import { colorPaletteTokens, colorStatusTokens } from '../alias/darkColorPalette';
import { generateColorTokens } from '../alias/darkColor';

import { borderRadius, fontSizes, lineHeights, fontFamilies, strokeWidths, fontWeights } from '../global/index';
import { createShadowTokens } from './shadows';
import type { BrandVariants, Theme } from '../types';
import { durations } from '../global/durations';
import { curves } from '../global/curves';
import { horizontalSpacings, verticalSpacings } from '../global/spacings';

export const createDarkTheme: (brand: BrandVariants) => Theme = brand => {
  const colorTokens = generateColorTokens(brand);

  return {
    // For testing semantic tokens, remove later
    'smtc-lightness-selected-hover': '5',
    'smtc-lightness-selected-pressed': '-10',
    'smtc-lightness-hover': '5',
    'smtc-lightness-pressed': '-10',
    ...borderRadius,
    ...fontSizes,
    ...lineHeights,
    ...fontFamilies,
    ...fontWeights,
    ...strokeWidths,
    ...horizontalSpacings,
    ...verticalSpacings,
    ...durations,
    ...curves,

    ...colorTokens,
    ...colorPaletteTokens,
    ...colorStatusTokens,

    ...createShadowTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
    ...createShadowTokens(colorTokens.colorBrandShadowAmbient, colorTokens.colorBrandShadowKey, 'Brand'),
  };
};
