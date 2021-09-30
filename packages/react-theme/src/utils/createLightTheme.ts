import { colorPaletteTokens, generateColorTokens } from '../alias/light';
import { borderRadius, fontSizes, lineHeights, fontFamilies, strokeWidths, fontWeights } from '../global/index';
import { createShadowLevelTokens } from './shadows';
import type { BrandVariants, Theme } from '../types';

export const createLightTheme: (brand: BrandVariants) => Theme = brand => {
  const colorTokens = generateColorTokens(brand);

  return {
    ...borderRadius,
    ...fontSizes,
    ...lineHeights,
    ...fontFamilies,
    ...fontWeights,
    ...strokeWidths,

    ...colorTokens,
    ...colorPaletteTokens,

    ...createShadowLevelTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
  };
};
