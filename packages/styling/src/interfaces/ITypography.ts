import { IFontWeight } from '../MergeStyles';

export interface IFontFamilies {
  default: string;
  monospace: string;
}

export interface IFontSizes {
  mini: string;
  xSmall: string;
  small: string;
  smallPlus: string;
  medium: string;
  mediumPlus: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  mega: string;
}

export interface IFontWeights {
  default: IFontWeight;
  light: IFontWeight;
  regular: IFontWeight;
  semibold: IFontWeight;
  bold: IFontWeight;
}

export interface IFontVariant {
  fontFamily: keyof IFontFamilies | string;
  fontSize: keyof IFontSizes | number | string;
  fontWeight: keyof IFontWeights | number;
}

export interface IFontVariants {
  default: Partial<IFontVariant>;
  caption: Partial<IFontVariant>;
  h1: Partial<IFontVariant>;
  h2: Partial<IFontVariant>;
  h3: Partial<IFontVariant>;
  h4: Partial<IFontVariant>;
  h5: Partial<IFontVariant>;
}

export interface ITypography {
  families: IFontFamilies;
  sizes: IFontSizes;
  weights: IFontWeights;
  variants: IFontVariants;
}

/**
 * Used in IPartialTheme so that user-defined themes can override selected typography properties
 */
export type IPartialTypography = { [P in keyof ITypography]?: Partial<ITypography[P]> };
