/**
 * ICSSRule is copied from the merge-styles package.
 * It is unclear if this is a general construct that should remain in theming-core
 *
 * @internal This is an experimental interface and will be changed post design review
 */
export type ICSSRule = 'initial' | 'inherit' | 'unset';

/**
 * IFontWeight is copied from the merge-styles package.
 * We use an exact copy to satisfy ts's structural subtyping rules
 * These seem like acceptable values, but are subject to change
 * Especially depending on what is done with ICSSRule
 *
 * @internal This is an experimental interface and will be changed post design review
 */
export type IFontWeight =
  | ICSSRule
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | '100'
  | 100
  | '200'
  | 200
  | '300'
  | 300
  | '400'
  | 400
  | '500'
  | 500
  | '600'
  | 600
  | '700'
  | 700
  | '800'
  | 800
  | '900'
  | 900;

/**
 * IRawFontStyle acts as a subset of IRawStyle from the merge-styles package
 * By taking advantage of ts's structural subtyping, instance of IRawFontStyle
 * are also instances of IRawStyle
 *
 * @internal This is an experimental interface and will be changed post design review
 */
export interface IRawFontStyle {
  fontFamily?: string | undefined;
  fontSize?: number | string | undefined;
  fontWeight?: IFontWeight;
  MozOsxFontSmoothing?: 'none' | 'antialiased' | 'grayscale' | 'subpixel-antialiased' | undefined;
  WebkitFontSmoothing?: 'none' | 'antialiased' | 'grayscale' | 'subpixel-antialiased' | undefined;
}

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IFontFamilies {
  standard: string;
  heading: string;
  semilight: string;
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
  superLarge: string;
  mega: string;
}

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IFontWeights {
  light: IFontWeight;
  semilight: IFontWeight;
  medium: IFontWeight;
  semibold: IFontWeight;
  bold: IFontWeight;
}

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IFontVariant {
  fontFamily: keyof IFontFamilies | string;
  fontSize: keyof IFontSizes | number | string;
  fontWeight: keyof IFontWeights | IFontWeight;
}

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IFontChoice extends Partial<IFontVariant> {
  fontVariant?: keyof IFontVariants;
}

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IFontVariants {
  // size based variants
  tiny: Partial<IFontVariant>;
  xSmall: Partial<IFontVariant>;
  small: Partial<IFontVariant>;
  smallPlus: Partial<IFontVariant>;
  standard: Partial<IFontVariant>;
  standardPlus: Partial<IFontVariant>;
  large: Partial<IFontVariant>;
  xLarge: Partial<IFontVariant>;
  xxLarge: Partial<IFontVariant>;
  superLarge: Partial<IFontVariant>;
  mega: Partial<IFontVariant>;

  // role based variants
  caption: Partial<IFontVariant>;
  link: Partial<IFontVariant>;
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
 * @internal This is an experimental interface and will be changed post design review.
 */
export type IPartialTypography = { [P in keyof ITypography]?: Partial<ITypography[P]> };
