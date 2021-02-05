import { createNeutralColorTokens, sharedColorTokens, createShadowLevelTokens } from '../../utils/light/index';
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
