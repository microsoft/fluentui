import { colorPaletteTokens, colorStatusTokens } from '../alias/lightColorPalette';
import { generateColorTokens } from '../alias/lightColor';

import { borderRadius, fontSizes, lineHeights, fontFamilies, strokeWidths, fontWeights } from '../global/index';
import { createShadowTokens } from './shadows';
import type { BrandVariants, Theme } from '../types';
import { durations } from '../global/durations';
import { curves } from '../global/curves';
import { horizontalSpacings, verticalSpacings } from '../global/spacings';

export const createLightTheme: (brand: BrandVariants) => Theme = brand => {
  const colorTokens = generateColorTokens(brand);

  return {
    // For testing semantic tokens, remove later
    'smtc-lightness-selected-hover': '5',
    'smtc-lightness-selected-pressed': '-15',
    'smtc-lightness-hover': '-5',
    'smtc-lightness-pressed': '-15',
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
