import { colorPaletteTokens, colorStatusTokens } from '../alias/highContrastColorPalette.js';
import { generateColorTokens } from '../alias/highContrastColor.js';

import { borderRadius, fontSizes, lineHeights, fontFamilies, strokeWidths, fontWeights } from '../global/index.js';
import { createShadowTokens } from './shadows.js';
import type { Theme } from '../types';
import { durations } from '../global/durations.js';
import { curves } from '../global/curves.js';
import { horizontalSpacings, verticalSpacings } from '../global/spacings.js';

export const createHighContrastTheme = (): Theme => {
  const colorTokens = generateColorTokens();

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
