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
    family: 'default',
    size: 'inherit'
  },

  caption: {
    size: 'xSmall'
  },

  h1: {
    size: 'mega',
    weight: 'light'
  },

  h2: {
    size: 'xxLarge',
    weight: 'light'
  },

  h3: {
    size: 'xLarge',
    weight: 'light'
  },

  h4: {
    size: 'large',
    weight: 'light'
  },

  h5: {
    size: 'mediumPlus',
    weight: 'light'
  },

  link: {
    color: 'link',
    hoverColor: 'linkHovered'
  }
};

export const DefaultTypography: ITypography = {
  families: DefaultFontFamilies,
  sizes: DefaultFontSizes,
  weights: DefaultFontWeights,
  variants: DefaultFontVariants
};
