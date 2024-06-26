import { colorPaletteTokens, colorStatusTokens } from '../alias/darkColorPalette';
import { generateColorTokens } from '../alias/teamsDarkColor';

import {
  borderRadius,
  fontSizes,
  lineHeights,
  fontFamilies,
  strokeWidths,
  fontWeights,
  zIndexesTokens,
} from '../global/index';
import { createShadowTokens } from './shadows';
import type { BrandVariants, Theme } from '../types';
import { durations } from '../global/durations';
import { curves } from '../global/curves';
import { horizontalSpacings, verticalSpacings } from '../global/spacings';

export const createTeamsDarkTheme: (brand: BrandVariants) => Theme = brand => {
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
    ...zIndexesTokens,

    ...colorTokens,
    ...colorPaletteTokens,
    ...colorStatusTokens,

    ...createShadowTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
    ...createShadowTokens(colorTokens.colorBrandShadowAmbient, colorTokens.colorBrandShadowKey, 'Brand'),
  };
};
