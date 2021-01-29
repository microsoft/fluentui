import { createNeutralColorTokens, sharedColorTokens, createShadowLevelTokens } from '../../default/index';
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

export const teamsDefaultTheme: Theme = {
  brandColors: brandColors.teams,
  neutralColorTokens: teamsNeutralColorTokens,
  shadowLevels: createShadowLevelTokens(
    teamsNeutralColorTokens.neutralShadowAmbient,
    teamsNeutralColorTokens.neutralShadowKey,
  ),
  ...common,
};
