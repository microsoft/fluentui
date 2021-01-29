import { createNeutralColorTokens, sharedColorTokens } from '../../default/index';
import { createShadowLevelTokens } from '../../default/index';
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

const webNeutralColorTokens = createNeutralColorTokens(brandColors.web);

export const webDefaultTheme: Theme = {
  brandColors: brandColors.web,
  neutralColorTokens: webNeutralColorTokens,
  shadowLevels: createShadowLevelTokens(
    webNeutralColorTokens.neutralShadowAmbient,
    webNeutralColorTokens.neutralShadowKey,
  ),
  ...common,
};
