import { createNeutralColorTokens, sharedColorTokens } from './dark';
import { createShadowTokens } from './default';
import { brandColors, sharedColors, fontFamilies, fontWeights, fontSizes, lineHeights } from './global';

const common = {
  sharedColors,
  sharedColorTokens,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
};

const teamsNeutralColorTokens = createNeutralColorTokens(brandColors.teams);
const webNeutralColorTokens = createNeutralColorTokens(brandColors.web);

export const teamsDarkTheme = {
  brandColors: brandColors.teams,
  neutralColorTokens: teamsNeutralColorTokens,
  shadows: createShadowTokens(
    teamsNeutralColorTokens.neutralShadowAmbientDarker,
    teamsNeutralColorTokens.neutralShadowKeyDarker,
  ),
  ...common,
};

export const webDarkTheme = {
  brandColors: brandColors.web,
  neutralColorTokens: webNeutralColorTokens,
  shadows: createShadowTokens(
    webNeutralColorTokens.neutralShadowAmbientDarker,
    webNeutralColorTokens.neutralShadowKeyDarker,
  ),
  ...common,
};
