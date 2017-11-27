// @public
export function buildClassMap < T >(styles: T): {[key in keyof T]?: string };

// @public
export function classNamesFunction < TStyleProps extends {}, TStyles extends {} >(): (
  getStyles?: IStyleFunction<TStyleProps, TStyles>,
  styleProps?: TStyleProps
) => IClassNames<TStyles>;

// @public
export declare function concatStyleSets < T extends object >(...args: (T | false | null | undefined)[]): T;

// @public
export function createFontStyles(localeCode: string | null): IFontStyles;

// @public
export function createTheme(theme: IPartialTheme): ITheme;

// @public
export declare function fontFace(font: IFontFace): void;

// WARNING: Export "mini" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "xSmall" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "small" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "smallPlus" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "medium" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "mediumPlus" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "icon" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "large" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "xLarge" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "xxLarge" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "superLarge" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "mega" must specify and be of type"string", "number" or "boolean"
// @public
module FontSizes {
}

// WARNING: Export "light" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "semilight" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "regular" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "semibold" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "bold" must specify and be of type"string", "number" or "boolean"
// @public
module FontWeights {
}

// @public
export function getFocusStyle(theme: ITheme,
  inset: number = 0,
  position: 'relative' | 'absolute' = 'relative'): IRawStyle;

// @public
export function getIcon(name?: string): IIconRecord | undefined;

// @public
export function getIconClassName(name: string): string;

// @public
export function getTheme(): ITheme;

// @public
interface IAnimationStyles {
  // (undocumented)
  fadeIn100: IRawStyle;
  // (undocumented)
  fadeIn200: IRawStyle;
  // (undocumented)
  fadeIn400: IRawStyle;
  // (undocumented)
  fadeIn500: IRawStyle;
  // (undocumented)
  fadeOut100: IRawStyle;
  // (undocumented)
  fadeOut200: IRawStyle;
  // (undocumented)
  fadeOut400: IRawStyle;
  // (undocumented)
  fadeOut500: IRawStyle;
  // (undocumented)
  rotate90deg: IRawStyle;
  // (undocumented)
  rotateN90deg: IRawStyle;
  // (undocumented)
  scaleDownIn100: IRawStyle;
  // (undocumented)
  scaleDownOut98: IRawStyle;
  // (undocumented)
  scaleUpIn100: IRawStyle;
  // (undocumented)
  scaleUpOut103: IRawStyle;
  // (undocumented)
  slideDownIn10: IRawStyle;
  // (undocumented)
  slideDownIn20: IRawStyle;
  // (undocumented)
  slideDownOut10: IRawStyle;
  // (undocumented)
  slideDownOut20: IRawStyle;
  // (undocumented)
  slideLeftIn10: IRawStyle;
  // (undocumented)
  slideLeftIn20: IRawStyle;
  // (undocumented)
  slideLeftIn40: IRawStyle;
  // (undocumented)
  slideLeftIn400: IRawStyle;
  // (undocumented)
  slideLeftOut10: IRawStyle;
  // (undocumented)
  slideLeftOut20: IRawStyle;
  // (undocumented)
  slideLeftOut40: IRawStyle;
  // (undocumented)
  slideLeftOut400: IRawStyle;
  // (undocumented)
  slideRightIn10: IRawStyle;
  // (undocumented)
  slideRightIn20: IRawStyle;
  // (undocumented)
  slideRightIn40: IRawStyle;
  // (undocumented)
  slideRightIn400: IRawStyle;
  // (undocumented)
  slideRightOut10: IRawStyle;
  // (undocumented)
  slideRightOut20: IRawStyle;
  // (undocumented)
  slideRightOut40: IRawStyle;
  // (undocumented)
  slideRightOut400: IRawStyle;
  // (undocumented)
  slideUpIn10: IRawStyle;
  // (undocumented)
  slideUpIn20: IRawStyle;
  // (undocumented)
  slideUpOut10: IRawStyle;
  // (undocumented)
  slideUpOut20: IRawStyle;
}

// WARNING: Export "xSmall" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "small" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "medium" must specify and be of type"string", "number" or "boolean"
// WARNING: Export "large" must specify and be of type"string", "number" or "boolean"
// @public
module IconFontSizes {
}

// @public
interface IFontFace extends IRawFontStyle {
  fontFeatureSettings?: string;
  src?: string;
  unicodeRange?: ICSSRule | string;
}

// @public
interface IFontStyles {
  // (undocumented)
  large?: IRawStyle;
  // (undocumented)
  medium?: IRawStyle;
  // (undocumented)
  mediumPlus?: IRawStyle;
  // (undocumented)
  mega?: IRawStyle;
  // (undocumented)
  small?: IRawStyle;
  // (undocumented)
  smallPlus?: IRawStyle;
  // (undocumented)
  superLarge?: IRawStyle;
  // (undocumented)
  tiny?: IRawStyle;
  // (undocumented)
  xLarge?: IRawStyle;
  // (undocumented)
  xSmall?: IRawStyle;
  // (undocumented)
  xxLarge?: IRawStyle;
}

// @public
interface IIconOptions {
  // (undocumented)
  disableWarnings: boolean;
  // (undocumented)
  warnOnMissingIcons: boolean;
}

// @public
interface IIconRecord {
  // (undocumented)
  code: string | undefined;
  // (undocumented)
  subset: IIconSubsetRecord;
}

// @public
interface IIconSubset {
  // (undocumented)
  fontFace?: IFontFace;
  // (undocumented)
  icons: {
    [ key: string ]: string | JSX.Element;
  }
  // (undocumented)
  style?: IRawStyle;
}

// @public
enum InjectionMode {
  appendChild = 2,
  insertNode = 1,
  none = 0
}

// @public
interface IPalette {
  accent: string;
  black: string;
  blackTranslucent40: string;
  blue: string;
  blueDark: string;
  blueLight: string;
  blueMid: string;
  green: string;
  greenDark: string;
  greenLight: string;
  magenta: string;
  magentaDark: string;
  magentaLight: string;
  neutralDark: string;
  neutralLight: string;
  neutralLighter: string;
  neutralLighterAlt: string;
  neutralPrimary: string;
  neutralPrimaryAlt: string;
  neutralQuaternary: string;
  neutralQuaternaryAlt: string;
  neutralSecondary: string;
  neutralTertiary: string;
  neutralTertiaryAlt: string;
  orange: string;
  orangeLight: string;
  orangeLighter: string;
  purple: string;
  purpleDark: string;
  purpleLight: string;
  red: string;
  redDark: string;
  teal: string;
  tealDark: string;
  tealLight: string;
  themeDark: string;
  themeDarkAlt: string;
  themeDarker: string;
  themeLight: string;
  themeLighter: string;
  themeLighterAlt: string;
  themePrimary: string;
  themeSecondary: string;
  themeTertiary: string;
  white: string;
  yellow: string;
  yellowLight: string;
}

// @public
interface IPropsWithStyles<TStyleProps, TStyles> {
  // (undocumented)
  getStyles?: IStyleFunction<TStyleProps, TStyles>;
  // (undocumented)
  subComponents?: {
    [ key: string ]: IStyleFunction<{}, {}>;
  }
}

// @public
interface IRawStyle extends IRawStyleBase {
  displayName?: string;
  selectors?: {
    [ key: string ]: IStyle;
  }
}

// @public
interface ISemanticColors {
  blockingBackground: string;
  bodyBackground: string;
  bodyDivider: string;
  bodySubtext: string;
  bodyText: string;
  bodyTextChecked: string;
  buttonBackground: string;
  buttonBackgroundChecked: string;
  buttonBackgroundCheckedHovered: string;
  buttonBackgroundHovered: string;
  buttonBorder: string;
  buttonText: string;
  buttonTextChecked: string;
  buttonTextCheckedHovered: string;
  buttonTextHovered: string;
  disabledBackground: string;
  disabledBodyText: string;
  disabledSubtext: string;
  disabledText: string;
  errorBackground: string;
  errorText: string;
  focusBorder: string;
  inputBackgroundChecked: string;
  inputBackgroundCheckedHovered: string;
  inputBorder: string;
  inputBorderHovered: string;
  inputFocusBorderAlt: string;
  inputForegroundChecked: string;
  listBackground: string;
  listItemBackgroundChecked: string;
  listItemBackgroundCheckedHovered: string;
  listItemBackgroundHovered: string;
  listTextColor: string;
  menuHeader: string;
  menuIcon: string;
  // @deprecated (undocumented)
  menuItemBackgroundChecked: string;
  menuItemBackgroundHovered: string;
  successBackground: string;
  warningBackground: string;
  warningHighlight: string;
  warningText: string;
}

// @public
interface IStyleSheetConfig {
  injectionMode?: InjectionMode;
}

// @public
interface ITheme {
  // (undocumented)
  fonts: IFontStyles;
  // (undocumented)
  isInverted: boolean;
  // (undocumented)
  palette: IPalette;
  // (undocumented)
  semanticColors: ISemanticColors;
}

// @public
export declare function keyframes(timeline: {
    [key: string]: {};
}): string;

// @public
export function loadTheme(theme: IPartialTheme): ITheme;

// @public
export declare function mergeStyles(...args: (IStyle | IStyle[] | false | null | undefined)[]): string;

// @public
export declare function mergeStyleSets < T >(...cssSets: ({
    [P in keyof T]?: IStyle;
} | null | undefined)[]): T;

// @public
export function registerDefaultFontFaces(baseUrl: string): void;

// @public
export function registerIconAlias(iconName: string, mappedToName: string): void;

// @public
export function registerIcons(iconSubset: IIconSubset): void;

// @public
export function setIconOptions(options: Partial<IIconOptions>): void;

// @public
export function styled < TComponentProps extends IPropsWithStyles<TStyleProps, TStyles>, TStyleProps, TStyles >(Component: React.ComponentClass<TComponentProps> | React.StatelessComponent<TComponentProps>,
  getBaseStyles: (props: TStyleProps) => TStyles,
  getProps?: (props: TComponentProps) => Partial<TComponentProps>): (props: TComponentProps) => JSX.Element;

// @public
class Stylesheet {
  constructor(config?: IStyleSheetConfig);
  argsFromClassName(className: string): IStyle[] | undefined;
  cacheClassName(className: string, key: string, args: IStyle[], rules: string[]): void;
  classNameFromKey(key: string): string | undefined;
  getClassName(displayName?: string): string;
  static getInstance(): Stylesheet;
  getRules(): string;
  insertedRulesFromClassName(className: string): string[] | undefined;
  insertRule(rule: string): void;
  reset(): void;
  setConfig(config?: IStyleSheetConfig): void;
}

// WARNING: Unsupported export: AnimationClassNames
// WARNING: Unsupported export: FontClassNames
// WARNING: Unsupported export: ColorClassNames
// WARNING: Unsupported export: AnimationStyles
// WARNING: Unsupported export: DefaultPalette
// WARNING: Unsupported export: DefaultFontStyles
// WARNING: Unsupported export: hiddenContentStyle
// WARNING: Unsupported export: ThemeSettingName
// WARNING: Unsupported export: HighContrastSelector
// WARNING: Unsupported export: ScreenWidthMinSmall
// WARNING: Unsupported export: ScreenWidthMinMedium
// WARNING: Unsupported export: ScreenWidthMinLarge
// WARNING: Unsupported export: ScreenWidthMinXLarge
// WARNING: Unsupported export: ScreenWidthMinXXLarge
// WARNING: Unsupported export: ScreenWidthMinXXXLarge
// WARNING: Unsupported export: ScreenWidthMaxSmall
// WARNING: Unsupported export: ScreenWidthMaxMedium
// WARNING: Unsupported export: ScreenWidthMaxLarge
// WARNING: Unsupported export: ScreenWidthMaxXLarge
// WARNING: Unsupported export: ScreenWidthMaxXXLarge
// WARNING: Unsupported export: IPartialTheme
// WARNING: Unsupported export: IClassNames
// WARNING: Unsupported export: IStyleFunction
// WARNING: Unsupported export: IFontWeight
// WARNING: Unsupported export: IStyle
// WARNING: Unsupported export: IStyleSet
// (No packageDescription for this package)
