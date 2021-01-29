import { createNeutralColorTokens, sharedColorTokens } from '../../utils/light';
import { createShadowLevelTokens } from '../../utils/light';
import { brandColors, sharedColors, fontFamilies, fontWeights, fontSizes, lineHeights } from '../../global';
import { Theme } from '../../types';

const common = {
  sharedColors,
  sharedColorTokens,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
};

const webNeutralColorTokens = createNeutralColorTokens(brandColors.web);

export const webLightTheme: Theme = {
  brandColors: brandColors.web,
  neutralColorTokens: webNeutralColorTokens,
  shadowLevels: createShadowLevelTokens(
    webNeutralColorTokens.neutralShadowAmbient,
    webNeutralColorTokens.neutralShadowKey,
  ),
  ...common,
};
