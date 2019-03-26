// @public
export function buildClassMap<T>(styles: T): {
    [key in keyof T]?: string;
};

// @public
export function concatStyleSets(...styleSets: (IStyleSet<any> | false | null | undefined)[]): IConcatenatedStyleSet<any>;

// @public (undocumented)
export function createFontStyles(localeCode: string | null): IFontStyles;

// @public
export function createTheme(theme: IPartialTheme, depComments?: boolean): ITheme;

// @public
export function focusClear(): IRawStyle;

// @public
export function fontFace(font: IFontFace): void;

// @public (undocumented)
module FontSizes {
  // (undocumented)
  icon: string;

  // (undocumented)
  large: string;

  // (undocumented)
  medium: string;

  // (undocumented)
  mediumPlus: string;

  // (undocumented)
  mega: string;

  // (undocumented)
  mini: string;

  // (undocumented)
  small: string;

  // (undocumented)
  smallPlus: string;

  // (undocumented)
  superLarge: string;

  // (undocumented)
  xLarge: string;

  // (undocumented)
  xSmall: string;

  // (undocumented)
  xxLarge: string;

}

// @public (undocumented)
module FontWeights {
  // (undocumented)
  bold: IFontWeight;

  // (undocumented)
  light: IFontWeight;

  // (undocumented)
  regular: IFontWeight;

  // (undocumented)
  semibold: IFontWeight;

  // (undocumented)
  semilight: IFontWeight;

}

// @public
export function getFadedOverflowStyle(theme: ITheme, color?: keyof ISemanticColors | keyof IPalette, direction?: 'horizontal' | 'vertical', width?: string | number, height?: string | number): IRawStyle;

// @public
export function getFocusStyle(theme: ITheme, inset?: number, position?: 'relative' | 'absolute', highContrastStyle?: IRawStyle | undefined, borderColor?: string, outlineColor?: string, isFocusedOnly?: boolean): IRawStyle;

// @public
export function getGlobalClassNames<T>(classNames: GlobalClassNames<T>, theme: ITheme, disableGlobalClassNames?: boolean): Partial<GlobalClassNames<T>>;

// @public
export function getIcon(name?: string): IIconRecord | undefined;

// @public
export function getIconClassName(name: string): string;

// @public (undocumented)
export function getScreenSelector(min: number, max: number): string;

// @public
export function getTheme(depComments?: boolean): ITheme;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function getThemedContext(context: ICustomizerContext, scheme?: ISchemeNames, theme?: ITheme): ICustomizerContext;

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

// @public (undocumented)
interface IAnimationVariables {
  // (undocumented)
  durationValue1: string;
  // (undocumented)
  durationValue2: string;
  // (undocumented)
  durationValue3: string;
  // (undocumented)
  durationValue4: string;
  // (undocumented)
  easeFunction1: string;
  // (undocumented)
  easeFunction2: string;
}

// @public (undocumented)
module IconFontSizes {
  // (undocumented)
  large: string;

  // (undocumented)
  medium: string;

  // (undocumented)
  small: string;

  // (undocumented)
  xSmall: string;

}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IEffects {
  elevation16: string;
  elevation4: string;
  elevation64: string;
  elevation8: string;
  roundedCorner2: string;
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
  large: IRawStyle;
  // (undocumented)
  medium: IRawStyle;
  // (undocumented)
  mediumPlus: IRawStyle;
  // (undocumented)
  mega: IRawStyle;
  // (undocumented)
  small: IRawStyle;
  // (undocumented)
  smallPlus: IRawStyle;
  // (undocumented)
  superLarge: IRawStyle;
  // (undocumented)
  tiny: IRawStyle;
  // (undocumented)
  xLarge: IRawStyle;
  // (undocumented)
  xSmall: IRawStyle;
  // (undocumented)
  xxLarge: IRawStyle;
}

// @public (undocumented)
interface IIconOptions {
  disableWarnings: boolean;
  // @deprecated (undocumented)
  warnOnMissingIcons?: boolean;
}

// @public (undocumented)
interface IIconRecord {
  // (undocumented)
  code: string | undefined;
  // (undocumented)
  subset: IIconSubsetRecord;
}

// @public (undocumented)
interface IIconSubset {
  // (undocumented)
  fontFace?: IFontFace;
  // (undocumented)
  icons: {
    [key: string]: string | JSX.Element;
  }
  // (undocumented)
  style?: IRawStyle;
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
  neutralSecondaryAlt: string;
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
  whiteTranslucent40: string;
  yellow: string;
  yellowDark: string;
  yellowLight: string;
}

// @public
interface IRawStyle extends IRawStyleBase {
  displayName?: string;
  selectors?: {
    [key: string]: IStyle;
  }
}

// @public (undocumented)
interface IScheme {
  disableGlobalClassNames: boolean;
  // (undocumented)
  effects: IEffects;
  // (undocumented)
  fonts: IFontStyles;
  // (undocumented)
  isInverted: boolean;
  // (undocumented)
  palette: IPalette;
  // (undocumented)
  semanticColors: ISemanticColors;
  // WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
  // @internal
  spacing: ISpacing;
}

// @public
interface ISemanticColors extends ISemanticTextColors {
  accentButtonBackground: string;
  blockingBackground: string;
  bodyBackground: string;
  bodyDivider: string;
  bodyFrameBackground: string;
  bodyFrameDivider: string;
  bodyStandoutBackground: string;
  buttonBackground: string;
  buttonBackgroundChecked: string;
  buttonBackgroundCheckedHovered: string;
  buttonBackgroundDisabled: string;
  buttonBackgroundHovered: string;
  buttonBackgroundPressed: string;
  buttonBorder: string;
  buttonBorderDisabled: string;
  defaultStateBackground: string;
  disabledBackground: string;
  errorBackground: string;
  focusBorder: string;
  inputBackground: string;
  inputBackgroundChecked: string;
  inputBackgroundCheckedHovered: string;
  inputBorder: string;
  inputBorderHovered: string;
  inputFocusBorderAlt: string;
  inputForegroundChecked: string;
  listBackground: string;
  listHeaderBackgroundHovered: string;
  listHeaderBackgroundPressed: string;
  listItemBackgroundChecked: string;
  listItemBackgroundCheckedHovered: string;
  listItemBackgroundHovered: string;
  listText: string;
  menuBackground: string;
  menuDivider: string;
  menuHeader: string;
  menuIcon: string;
  // @deprecated (undocumented)
  menuItemBackgroundChecked: string;
  menuItemBackgroundHovered: string;
  menuItemBackgroundPressed: string;
  menuItemText: string;
  menuItemTextHovered: string;
  primaryButtonBackground: string;
  primaryButtonBackgroundDisabled: string;
  primaryButtonBackgroundHovered: string;
  primaryButtonBackgroundPressed: string;
  primaryButtonBorder: string;
  smallInputBorder: string;
  successBackground: string;
  variantBorder: string;
  variantBorderHovered: string;
  warningBackground: string;
  warningHighlight: string;
}

// @public (undocumented)
interface ISemanticTextColors {
  accentButtonText: string;
  actionLink: string;
  actionLinkHovered: string;
  bodySubtext: string;
  bodyText: string;
  bodyTextChecked: string;
  buttonText: string;
  buttonTextChecked: string;
  buttonTextCheckedHovered: string;
  buttonTextDisabled: string;
  buttonTextHovered: string;
  buttonTextPressed: string;
  disabledBodySubtext: string;
  disabledBodyText: string;
  disabledSubtext: string;
  disabledText: string;
  errorText: string;
  inputPlaceholderText: string;
  inputText: string;
  inputTextHovered: string;
  link: string;
  linkHovered: string;
  listText: string;
  // @deprecated (undocumented)
  listTextColor: string;
  primaryButtonText: string;
  primaryButtonTextDisabled: string;
  primaryButtonTextHovered: string;
  primaryButtonTextPressed: string;
  warningText: string;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface ISpacing {
  // (undocumented)
  l1: string;
  // (undocumented)
  l2: string;
  // (undocumented)
  m: string;
  // (undocumented)
  s1: string;
  // (undocumented)
  s2: string;
}

// @public
interface IStyleSheetConfig {
  defaultPrefix?: string;
  injectionMode?: InjectionMode;
  namespace?: string;
  onInsertRule?: (rule: string) => void;
}

// @public (undocumented)
interface ITheme extends IScheme {
  // WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
  // @internal
  schemes?: {
          [P in ISchemeNames]?: IScheme;
      };
}

// @public
export function keyframes(timeline: {
    [key: string]: {};
}): string;

// @public
export function loadTheme(theme: IPartialTheme, depComments?: boolean): ITheme;

// @public
export function mergeStyles(...args: (IStyle | IStyleBaseArray | false | null | undefined)[]): string;

// @public
export function mergeStyleSets(...styleSets: Array<IStyleSet<any> | undefined | false | null>): IProcessedStyleSet<any>;

// @public (undocumented)
export function registerDefaultFontFaces(baseUrl: string): void;

// @public
export function registerIconAlias(iconName: string, mappedToName: string): void;

// @public
export function registerIcons(iconSubset: IIconSubset, options?: Partial<IIconOptions>): void;

// @public
export function registerOnThemeChangeCallback(callback: (theme: ITheme) => void): void;

// @public
export function removeOnThemeChangeCallback(callback: (theme: ITheme) => void): void;

// @public
export function setIconOptions(options: Partial<IIconOptions>): void;

// @public
class Stylesheet {
  constructor(config?: IStyleSheetConfig);
  argsFromClassName(className: string): IStyle[] | undefined;
  cacheClassName(className: string, key: string, args: IStyle[], rules: string[]): void;
  classNameFromKey(key: string): string | undefined;
  getClassName(displayName?: string): string;
  static getInstance(): Stylesheet;
  getRules(includePreservedRules?: boolean): string;
  insertedRulesFromClassName(className: string): string[] | undefined;
  insertRule(rule: string, preserve?: boolean): void;
  onReset(callback: () => void): void;
  reset(): void;
  // (undocumented)
  resetKeys(): void;
  setConfig(config?: IStyleSheetConfig): void;
}

// @public
export function unregisterIcons(iconNames: string[]): void;

// @public (undocumented)
module ZIndexes {
  // (undocumented)
  Coachmark: number;

  // (undocumented)
  FocusStyle: number;

  // (undocumented)
  KeytipLayer: number;

  // (undocumented)
  Layer: number;

  // (undocumented)
  Nav: number;

  // (undocumented)
  ScrollablePane: number;

}

// WARNING: Unsupported export: AnimationClassNames
// WARNING: Unsupported export: FontClassNames
// WARNING: Unsupported export: ColorClassNames
// WARNING: Unsupported export: AnimationStyles
// WARNING: Unsupported export: AnimationVariables
// WARNING: Unsupported export: DefaultPalette
// WARNING: Unsupported export: DefaultFontStyles
// WARNING: Unsupported export: hiddenContentStyle
// WARNING: Unsupported export: PulsingBeaconAnimationStyles
// WARNING: Unsupported export: GlobalClassNames
// WARNING: Unsupported export: ThemeSettingName
// WARNING: Unsupported export: HighContrastSelector
// WARNING: Unsupported export: HighContrastSelectorWhite
// WARNING: Unsupported export: HighContrastSelectorBlack
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
// WARNING: Unsupported export: ScreenWidthMinUhfMobile
// WARNING: Unsupported export: normalize
// WARNING: Unsupported export: noWrap
// WARNING: Unsupported export: IPartialTheme
// WARNING: Unsupported export: ISchemeNames
// WARNING: Unsupported export: IFontWeight
// WARNING: Unsupported export: IStyle
// WARNING: Unsupported export: IStyleSet
// WARNING: Unsupported export: IProcessedStyleSet
// WARNING: Unsupported export: InjectionMode
// WARNING: Unsupported export: InjectionMode
// (No @packagedocumentation comment for this package)
