import { colorPaletteTokens, generateColorTokens } from '../alias/teamsDark';
import { borderRadius, fontSizes, lineHeights, fontFamilies, strokeWidths } from '../global';
import { createShadowLevelTokens } from './shadows';
import type { BrandVariants, Theme } from '../types';

export const createTeamsDarkTheme: (brand: BrandVariants) => Theme = brand => {
  const colorTokens = generateColorTokens(brand);

  return {
    ...borderRadius,
    ...fontSizes,
    ...lineHeights,
    ...fontFamilies,
    ...strokeWidths,

    ...colorTokens,
    ...colorPaletteTokens,

    ...createShadowLevelTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
  };
};
