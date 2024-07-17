import { colorPaletteTokens, colorStatusTokens } from '../alias/darkColorPalette';
import { generateColorTokens } from '../alias/darkColor';

import { borderRadius, fontSizes, lineHeights, fontFamilies, strokeWidths, fontWeights, noBlur } from '../global/index';
import { createShadowTokens } from './shadows';
import type { BrandVariants, Theme } from '../types';
import { durations } from '../global/durations';
import { curves } from '../global/curves';
import { horizontalSpacings, verticalSpacings } from '../global/spacings';

export const createDarkTheme: (brand: BrandVariants, glass?: boolean) => Theme = (brand, glass = false) => {
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
    ...noBlur,

    ...colorTokens,
    ...colorPaletteTokens,
    ...colorStatusTokens,

    ...createShadowTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
    ...createShadowTokens(colorTokens.colorBrandShadowAmbient, colorTokens.colorBrandShadowKey, 'Brand'),
  };
};
