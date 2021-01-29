import { createNeutralColorTokens, sharedColorTokens } from '../../utils/highContrast/index';
import { brandColors, sharedColors, fontFamilies, fontWeights, fontSizes, lineHeights } from '../../global/index';
import { Theme } from '../../types';
const common = {
  sharedColors,
  sharedColorTokens,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
};

export const teamsHighContrastTheme: Theme = {
  brandColors: brandColors.teams,
  neutralColorTokens: createNeutralColorTokens(brandColors.teams),
  ...common,
};
