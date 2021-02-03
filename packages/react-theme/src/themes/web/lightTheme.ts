import {
  createBrandColorTokens,
  createNeutralColorTokens,
  ghostColorTokens,
  sharedColorTokens,
  transparentColorTokens,
} from '../../utils/light';
import { createShadowLevelTokens } from '../../utils/light';
import {
  brandColors,
  sharedColors,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  black,
  white,
  hyperlink,
  selected,
  disabled,
  grey,
} from '../../global';
import { Theme, ThemeCompat } from '../../types';

const common = {
  sharedColors,
  sharedColorTokens,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
};

const webNeutralColorTokens = createNeutralColorTokens(brandColors.web);

export const webLightThemeCompat: ThemeCompat = {
  brandColors: brandColors.web,
  neutralColorTokens: webNeutralColorTokens,
  ghostColorTokens,
  transparentColorTokens,
  shadowLevels: createShadowLevelTokens(
    webNeutralColorTokens.neutralShadowAmbient,
    webNeutralColorTokens.neutralShadowKey,
  ),
  ...common,
};

export const webLightTheme: Theme = {
  global: {
    color: {
      black,
      white,
      hyperlink,
      selected,
      disabled,
    },
    palette: {
      ...sharedColors,
      brand: brandColors.web,
      grey,
    },
  },
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: webNeutralColorTokens,
      ghost: ghostColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(brandColors.web),
    },
  },
};
