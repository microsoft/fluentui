/** @public */
export type IColor = string;

/** @public */
export interface ICastableToString {
  toString: () => string;
}

/** @public */
export interface IColorRamp extends ICastableToString {
  values: string[];
  index: number;
}

/** @public */
export type ITokenLiteral = string | number | ICastableToString;

/** @public */
export interface ITokenResolver {
  dependsOn: string | string[];
  resolve?: (arg: ITokenLiteral[], theme: ITheme) => ITokenLiteral;
}

/** @public */
export type IToken = ITokenLiteral | ((theme: ITheme) => ITokenLiteral) | ITokenResolver;

/** @public */
export type IResolvedTokens<TTokens> = {
  [key in keyof TTokens]: ITokenLiteral;
};

type IComponentOverrides = {
  tokens?: any;
  styles?: any;
  slots?: any;
};

type IComponentOverrideGroup = { [componentName: string]: IComponentOverrides };

export type IThemeColorDefinition = {
  background: IColor;
  bodyText: IColor;
  subText: IColor;
  disabledText: IColor;

  brand: IColorRamp;
  accent: IColorRamp;

  neutral: IColorRamp;

  success: IColorRamp;
  warning: IColorRamp;
  danger: IColorRamp;

  [key: string]: IColorRamp | string;
};

/** @public */
export interface ITheme {
  direction: 'rtl' | 'ltr';

  colors: IThemeColorDefinition;

  fonts: {
    default: string;
    userContent: string;
    mono: string;
    [key: string]: string;
  };

  fontSizes: {
    base: number;
    scale: number;
    unit: 'px' | 'rem' | 'pt';
  };

  animations: {
    fadeIn: {};
    fadeOut: {};
  };

  spacing: {
    base: number;
    scale: number;
    unit: 'px' | 'rem';
  };

  radius: {
    base: number;
    scale: number;
    unit: 'px' | 'rem' | '%';
  };

  icons: {};

  components: IComponentOverrideGroup;

  schemes: {
    [key: string]: ITheme;
  };
}

export type DeepPartial<T> = {
  [key in keyof T]?: {
    [key2 in keyof T[key]]?: T[key][key2];
  };
};

export type IPartialTheme = DeepPartial<Omit<ITheme, 'schemes'>> & {
  schemes?: {
    [key: string]: IPartialTheme;
  };
};
