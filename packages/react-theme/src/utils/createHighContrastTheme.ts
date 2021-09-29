import { generateColorAliasTokens, sharedColorTokens } from '../alias/highContrast';
import { borderRadius, fontSizes, lineHeights, fontFamilies, strokeWidths } from '../global';
import { createShadowLevelTokens } from './shadows';
import type { Theme } from '../types';

export const createHighContrastTheme = (): Theme => {
  const colorAliasTokens = generateColorAliasTokens();

  return {
    ...borderRadius,
    ...fontSizes,
    ...lineHeights,
    ...fontFamilies,
    ...strokeWidths,

    ...colorAliasTokens,
    ...sharedColorTokens,

    ...createShadowLevelTokens(
      colorAliasTokens.colorAliasNeutralShadowAmbient,
      colorAliasTokens.colorAliasNeutralShadowKey,
    ),
  };
};
