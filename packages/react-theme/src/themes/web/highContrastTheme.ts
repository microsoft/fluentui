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

export const webHighContrastTheme: Theme = {
  brandColors: brandColors.web,
  neutralColorTokens: createNeutralColorTokens(brandColors.web),
  ...common,
};
