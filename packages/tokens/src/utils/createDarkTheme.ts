import { colorPaletteTokens, colorStatusTokens } from '../alias/darkColorPalette.js';
import { generateColorTokens } from '../alias/darkColor.js';

import { borderRadius, fontSizes, lineHeights, fontFamilies, strokeWidths, fontWeights } from '../global/index.js';
import { createShadowTokens } from './shadows.js';
import type { BrandVariants, Theme } from '../types';
import { durations } from '../global/durations.js';
import { curves } from '../global/curves.js';
import { horizontalSpacings, verticalSpacings } from '../global/spacings.js';

export const createDarkTheme: (brand: BrandVariants) => Theme = brand => {
  const colorTokens = generateColorTokens(brand);

  return {
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
