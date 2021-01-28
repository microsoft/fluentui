import { createNeutralColorTokens, sharedColorTokens } from './highContrast';
import { brandColors, sharedColors, fontFamilies, fontWeights, fontSizes, lineHeights } from './global';
const common = {
  sharedColors,
  sharedColorTokens,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
};

export const teamsHighContrastTheme = {
  brandColors: brandColors.teams,
  neutralColorTokens: createNeutralColorTokens(brandColors.teams),
  ...common,
};

export const webHighContrastTheme = {
  brandColors: brandColors.web,
  neutralColorTokens: createNeutralColorTokens(brandColors.web),
  ...common,
};
