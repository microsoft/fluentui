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
  ghostColorTokens: {
    ghostBackground: 'red',
    ghostBackgroundHover: 'red',
    ghostBackgroundPressed: 'red',
    ghostBackgroundSelected: 'red',
  },
  transparentColorTokens: {
    transparentBackground: 'rgba(255, 0, 0, 0.2)',
    transparentBackgroundHover: 'rgba(255, 0, 0, 0.2)',
    transparentBackgroundPressed: 'rgba(255, 0, 0, 0.2)',
    transparentBackgroundSelected: 'rgba(255, 0, 0, 0.2)',
  },
  shadowLevels: createShadowLevelTokens(
    webNeutralColorTokens.neutralShadowAmbient,
    webNeutralColorTokens.neutralShadowKey,
  ),
  ...common,
};
