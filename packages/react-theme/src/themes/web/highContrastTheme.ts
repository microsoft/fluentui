import { createNeutralColorTokens, sharedColorTokens } from '../../utils/highContrast/index';
import {
  brandColors,
  sharedColors,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  borderRadius,
  strokeWidths,
} from '../../global/index';
import { Theme } from '../../types';

const common = {
  borderRadius,
  sharedColors,
  sharedColorTokens,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  strokeWidths,
};

export const webHighContrastTheme: Theme = {
  brandColors: brandColors.web,
  neutralColorTokens: createNeutralColorTokens(brandColors.web),
  ...common,
};
