import { colorPaletteTokens, generateColorTokens } from '../alias/highContrast';
import { borderRadius, fontSizes, lineHeights, fontFamilies, strokeWidths, fontWeights } from '../global/index';
import { createShadowLevelTokens } from './shadows';
import type { Theme } from '../types';

export const createHighContrastTheme = (): Theme => {
  const colorTokens = generateColorTokens();

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
