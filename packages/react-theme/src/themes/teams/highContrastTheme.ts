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

export const teamsHighContrastTheme: Theme = {
  brandColors: brandColors.teams,
  neutralColorTokens: createNeutralColorTokens(brandColors.teams),
  ...common,
} as any;
