import { createNeutralColorTokens, sharedColorTokens, createShadowLevelTokens } from '../../utils/light/index';
import {
  borderRadius,
  brandColors,
  sharedColors,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
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

const teamsNeutralColorTokens = createNeutralColorTokens(brandColors.teams);

export const teamsLightTheme: Theme = {
  brandColors: brandColors.teams,
  neutralColorTokens: teamsNeutralColorTokens,
  shadowLevels: createShadowLevelTokens(
    teamsNeutralColorTokens.neutralShadowAmbient,
    teamsNeutralColorTokens.neutralShadowKey,
  ),
  ...common,
};
