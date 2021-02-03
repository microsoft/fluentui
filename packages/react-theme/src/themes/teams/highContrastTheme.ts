import {
  createBrandColorTokens,
  createNeutralColorTokens,
  ghostColorTokens,
  sharedColorTokens,
  transparentColorTokens,
} from '../../utils/highContrast';
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

const teamsNeutralColorTokens = createNeutralColorTokens(brandColors.teams);

export const teamsHighContrastThemeCompat: ThemeCompat = {
  brandColors: brandColors.teams,
  ghostColorTokens,
  transparentColorTokens,
  neutralColorTokens: teamsNeutralColorTokens,
  ...common,
};

export const teamsHighContrastTheme: Theme = {
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
      brand: createBrandColorTokens(),
    },
  },
};
