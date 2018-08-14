import { DefaultFontStyles } from './DefaultFontStyles';
import { FontSizes, FontWeights } from './fonts';
import { IFontFamilies, IFontSizes, IFontWeights, IFontVariants, ITypography } from '../interfaces/ITypography';

export const DefaultFontSizes: IFontSizes = {
  mini: FontSizes.mini,
  xSmall: FontSizes.xSmall,
  small: FontSizes.small,
  smallPlus: FontSizes.smallPlus,
  medium: FontSizes.medium,
  mediumPlus: FontSizes.mediumPlus,
  large: FontSizes.large,
  xLarge: FontSizes.xLarge,
  xxLarge: FontSizes.xxLarge,
  mega: FontSizes.mega
};

export const DefaultFontFamilies: IFontFamilies = {
  default: DefaultFontStyles.medium.fontFamily!,
  monospace: 'Menlo, Monaco, "Courier New", monospace'
};

export const DefaultFontWeights: IFontWeights = {
  default: FontWeights.regular,
  regular: FontWeights.regular,
  light: FontWeights.light,
  semibold: FontWeights.semibold,
  bold: FontWeights.bold
};

export const DefaultFontVariants: IFontVariants = {
  default: {
    fontFamily: 'default',
    fontSize: 'medium',
    fontWeight: 'default'
  },

  caption: {
    fontSize: 'xSmall'
  },

  h1: {
    fontSize: 'mega',
    fontWeight: 'light'
  },

  h2: {
    fontSize: 'xxLarge',
    fontWeight: 'light'
  },

  h3: {
    fontSize: 'xLarge',
    fontWeight: 'light'
  },

  h4: {
    fontSize: 'large',
    fontWeight: 'light'
  },

  h5: {
    fontSize: 'mediumPlus',
    fontWeight: 'light'
  }
};

export const DefaultTypography: ITypography = {
  families: DefaultFontFamilies,
  sizes: DefaultFontSizes,
  weights: DefaultFontWeights,
  variants: DefaultFontVariants
};
