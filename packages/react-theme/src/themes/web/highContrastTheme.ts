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

const webNeutralColorTokens = createNeutralColorTokens(brandColors.web);

export const webHighContrastThemeCompat: ThemeCompat = {
  brandColors: brandColors.web,
  ghostColorTokens,
  transparentColorTokens,
  neutralColorTokens: webNeutralColorTokens,
  ...common,
};

export const webHighContrastTheme: Theme = {
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
      brand: createBrandColorTokens(),
    },
  },
};
