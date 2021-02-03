import { createNeutralColorTokens, sharedColorTokens } from '../../utils/dark/index';
import { createShadowLevelTokens } from '../../utils/light/index';
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
