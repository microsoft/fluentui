import { createNeutralColorTokens, sharedColorTokens } from './default';
import { createShadowTokens } from './default/shadows';
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

export const teamsDefaultTheme = {
  brandColors: brandColors.teams,
  neutralColorTokens: teamsNeutralColorTokens,
  shadows: createShadowTokens(teamsNeutralColorTokens.neutralShadowAmbient, teamsNeutralColorTokens.neutralShadowKey),
  ...common,
};

export const webDefaultTheme = {
  brandColors: brandColors.web,
  neutralColorTokens: webNeutralColorTokens,
  shadows: createShadowTokens(webNeutralColorTokens.neutralShadowAmbient, webNeutralColorTokens.neutralShadowKey),
  ...common,
};
