export interface IFontFamilies {
  default: string;
  monospace: string;
  [key: string]: string;
}

export interface IFontSizes {
  tiny: string;
  xSmall: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  xxxLarge: string;
  mega: string;
  [key: string]: string;
}

export interface IFontWeights {
  light: number | string;
  regular: number | string;
  semibold: number | string;
  bold: number | string;
  [key: string]: number | string;
}

export interface IFontType {
  fontFamily: keyof IFontFamilies | string;
  fontSize: keyof IFontSizes | number | string;
  fontWeight: keyof IFontWeights | number;
}

export interface IFontTypes {
  default: Partial<IFontType>;
  disabled: Partial<IFontType>;
  caption: Partial<IFontType>;
  h1: Partial<IFontType>;
  h2: Partial<IFontType>;
  h3: Partial<IFontType>;
  h4: Partial<IFontType>;
  h5: Partial<IFontType>;
  [key: string]: Partial<IFontType>;
}

export interface ITypography {
  families: IFontFamilies;
  sizes: IFontSizes;
  weights: IFontWeights;
  types: IFontTypes;
}
