import { generateColorAliasTokens, sharedColorTokens } from '../alias/teamsDark';
import { borderRadius, fontSizes, lineHeights, fontFamilies, strokeWidths } from '../global';
import { createShadowLevelTokens } from './shadows';
import type { BrandVariants, Theme } from '../types';

export const createTeamsDarkTheme: (brand: BrandVariants) => Theme = brand => {
  const colorAliasTokens = generateColorAliasTokens(brand);

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
