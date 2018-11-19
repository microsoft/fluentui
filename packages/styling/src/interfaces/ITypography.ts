import { IFontWeight } from '../MergeStyles';
import { ISemanticTextColors } from './ISemanticTextColors';

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IFontFamilies {
  default: string;
  monospace: string;
}

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
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

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IFontWeights {
  default: IFontWeight;
  light: IFontWeight;
  regular: IFontWeight;
  semibold: IFontWeight;
  bold: IFontWeight;
}

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IFontVariant {
  family: keyof IFontFamilies | string;
  size: keyof IFontSizes | number | string;
  weight: keyof IFontWeights | number;
  color?: keyof ISemanticTextColors;
  hoverColor?: keyof ISemanticTextColors;
  disabledColor?: keyof ISemanticTextColors;
}

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IFontVariants {
  default: Partial<IFontVariant>;
  caption: Partial<IFontVariant>;
  link: Partial<IFontVariant>;
  h1: Partial<IFontVariant>;
  h2: Partial<IFontVariant>;
  h3: Partial<IFontVariant>;
  h4: Partial<IFontVariant>;
  h5: Partial<IFontVariant>;
}

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
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
