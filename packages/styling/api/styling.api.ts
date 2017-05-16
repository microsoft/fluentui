export function after(style: IRawStyle): IProcessedStyle;

export function before(style: IRawStyle): IProcessedStyle;

export function buildClassMap < T >(styles: T): {[key in keyof T]?: string };

export function fontFace(font: Glamor.FontProperties): string;

export function getFocusStyle(theme: ITheme,
  inset: string = '0',
  color: string = theme.palette.neutralSecondary,
  position: 'relative' | 'absolute' = 'relative'): IProcessedStyle;

export function getTheme(): ITheme;

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

interface IFontStyles {
  // (undocumented)
  icon?: IRawStyle;
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

export function insertGlobal(selector: string, style: IRawStyle): void;

interface IPalette {
  black?: string;
  blackTranslucent40?: string;
  blue?: string;
  blueDark?: string;
  blueLight?: string;
  blueMid?: string;
  green?: string;
  greenDark?: string;
  greenLight?: string;
  magenta?: string;
  magentaDark?: string;
  magentaLight?: string;
  neutralDark?: string;
  neutralLight?: string;
  neutralLighter?: string;
  neutralLighterAlt?: string;
  neutralPrimary?: string;
  neutralPrimaryAlt?: string;
  neutralQuaternary?: string;
  neutralQuaternaryAlt?: string;
  neutralSecondary?: string;
  neutralSecondaryAlt?: string;
  neutralTertiary?: string;
  neutralTertiaryAlt?: string;
  orange?: string;
  orangeLight?: string;
  orangeLighter?: string;
  purple?: string;
  purpleDark?: string;
  purpleLight?: string;
  red?: string;
  redDark?: string;
  teal?: string;
  tealDark?: string;
  tealLight?: string;
  themeDark?: string;
  themeDarkAlt?: string;
  themeDarker?: string;
  themeLight?: string;
  themeLighter?: string;
  themeLighterAlt?: string;
  themePrimary?: string;
  themeSecondary?: string;
  themeTertiary?: string;
  white?: string;
  yellow?: string;
  yellowLight?: string;
}

interface IProcessedStyle {
  toString: () => string;
}

// (undocumented)
interface IRawStyle {
  // (undocumented)
  [ key: string ]: string | number | IRawStyle;
}

// (undocumented)
interface ITheme {
  // (undocumented)
  fonts?: IFontStyles;
  // (undocumented)
  palette?: IPalette;
}

export function keyframes(timeline: Glamor.TimeLine): string;

export function loadTheme(theme: ITheme): void;

// (undocumented)
export function mergeStyles(...args: (IStyle | IRawStyle)[]): IStyle;

// (undocumented)
export function mergeStyleSets < T >(...args: T[]): T;

export function parent(selector: string, style: IRawStyle): IProcessedStyle;

// WARNING: Unsupported export: AnimationClassNames
// WARNING: Unsupported export: FontClassNames
// WARNING: Unsupported export: IconClassNames
// WARNING: Unsupported export: ColorClassNames
// WARNING: Unsupported export: AnimationStyles
// WARNING: Unsupported export: DefaultPalette
// WARNING: Unsupported export: DefaultFontStyles
// WARNING: Unsupported export: IconCodes
// WARNING: Unsupported export: IStyle
// (No packageDescription for this package)
