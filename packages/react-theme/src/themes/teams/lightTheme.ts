import {
  createBrandColorTokens,
  createNeutralColorTokens,
  sharedColorTokens,
  createShadowLevelTokens,
  transparentColorTokens,
  ghostColorTokens,
} from '../../utils/light';
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
  sharedColors, // global.palette
  sharedColorTokens, // alias.colors.darkRed
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
};

const teamsNeutralColorTokens = createNeutralColorTokens(brandColors.teams);

export const teamsLightThemeCompat: ThemeCompat = {
  brandColors: brandColors.teams,
  neutralColorTokens: teamsNeutralColorTokens,
  ghostColorTokens,
  transparentColorTokens,
  shadowLevels: createShadowLevelTokens(
    teamsNeutralColorTokens.neutralShadowAmbient,
    teamsNeutralColorTokens.neutralShadowKey,
  ),
  ...common,
};

export const teamsLightTheme: Theme = {
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
      brand: brandColors.teams,
      grey,
    },
  },
  alias: {
    color: {
      ...sharedColorTokens,
      neutral: teamsNeutralColorTokens,
      ghost: ghostColorTokens,
      transparent: transparentColorTokens,
      brand: createBrandColorTokens(brandColors.teams),
    },
  },
};
