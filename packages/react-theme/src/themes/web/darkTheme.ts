import { createNeutralColorTokens, sharedColorTokens } from '../../utils/dark';
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

export const webDarkTheme: Theme = {
  brandColors: brandColors.web,
  neutralColorTokens: webNeutralColorTokens,
  shadowLevels: createShadowLevelTokens(
    webNeutralColorTokens.neutralShadowAmbientDarker,
    webNeutralColorTokens.neutralShadowKeyDarker,
  ),
  ...common,
};
