// @public
export function adjustForContrast(baseline: IRGB, target: IRGB, desiredRatio?: number): IRGB;

// @public
export function calcContrastRatio(c1: IRGB, c2: IRGB): number;

// @public
export function contrastRatio(relLumA: number, relLumB: number): number;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function createThemeCore(families: IFontFamilies): IThemeCore;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function createThemeRegistry<ITheme, IThemeDefinition>(platformDefaults: ITheme, resolver: ResolveTheme<ITheme, IThemeDefinition>): IThemeRegistry<ITheme, IThemeDefinition>;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function createTypography(families: IFontFamilies): ITypography;

// @public
export function cssColor(color: string): IRGB | undefined;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function getComponentStyles(theme: IThemeCore, props: IGetComponentStyleProps): object;

// @public
export function getContrastingColor(color: string, backgroundColor: string, desiredRatio?: number): string;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function getResolvedLayer(theme: IThemeCore, input?: string | ILayer, base?: ILayer, mixins?: string[]): ILayer;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function getStatesForLayer(mask: object): string | undefined;

// @public
export function hsl2rgb(hsl: IHSL): IRGB;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface ICollectibleStyles {
  // (undocumented)
  backgroundColor?: string;
  // (undocumented)
  textColor?: string;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IColorSlots {
  // (undocumented)
  backgroundColor?: keyof IPalette | string;
  // (undocumented)
  borderColor?: keyof IPalette | string;
  // (undocumented)
  color?: keyof IPalette | string;
  // (undocumented)
  iconColor?: keyof IPalette | string;
  // (undocumented)
  textColor?: keyof IPalette | string;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IFontChoice extends Partial<IFontVariant> {
  // (undocumented)
  fontVariant?: keyof IFontVariants;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IFontFamilies {
  // (undocumented)
  heading: string;
  // (undocumented)
  monospace: string;
  // (undocumented)
  semilight: string;
  // (undocumented)
  standard: string;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IFontSizes {
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

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IFontVariant {
  // (undocumented)
  fontFamily: keyof IFontFamilies | string;
  // (undocumented)
  fontSize: keyof IFontSizes | number | string;
  // (undocumented)
  fontWeight: keyof IFontWeights | IFontWeight;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IFontVariants {
  // (undocumented)
  caption: Partial<IFontVariant>;
  // (undocumented)
  large: Partial<IFontVariant>;
  // (undocumented)
  link: Partial<IFontVariant>;
  // (undocumented)
  mega: Partial<IFontVariant>;
  // (undocumented)
  small: Partial<IFontVariant>;
  // (undocumented)
  smallPlus: Partial<IFontVariant>;
  // (undocumented)
  standard: Partial<IFontVariant>;
  // (undocumented)
  standardPlus: Partial<IFontVariant>;
  // (undocumented)
  superLarge: Partial<IFontVariant>;
  // (undocumented)
  tiny: Partial<IFontVariant>;
  // (undocumented)
  xLarge: Partial<IFontVariant>;
  // (undocumented)
  xSmall: Partial<IFontVariant>;
  // (undocumented)
  xxLarge: Partial<IFontVariant>;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IFontWeights {
  // (undocumented)
  bold: IFontWeight;
  // (undocumented)
  light: IFontWeight;
  // (undocumented)
  medium: IFontWeight;
  // (undocumented)
  semibold: IFontWeight;
  // (undocumented)
  semilight: IFontWeight;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IGetComponentStyleProps {
  constLayer?: ILayer;
  layer?: string | ILayer;
  selectors?: boolean;
  slots?: {
    [slot: string]: string | undefined;
  }
  states?: string;
  style?: IPartialComponentStyle;
}

// @public (undocumented)
interface IHSL {
  h: number;
  l: number;
  s: number;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IOtherProps {
  // (undocumented)
  borderRadius?: number | string;
  // (undocumented)
  borderStyle?: string;
  // (undocumented)
  borderWidth?: number | string;
  // (undocumented)
  boxSizing?: string;
  // (undocumented)
  className?: string;
  // (undocumented)
  contentPadding?: number | string;
  // (undocumented)
  display?: string;
  // (undocumented)
  fill?: string;
  // (undocumented)
  height?: number | string;
  // (undocumented)
  iconSize?: number | string;
  // (undocumented)
  iconWeight?: number;
  // (undocumented)
  justifyContent?: string;
  // (undocumented)
  lineHeight?: number | string;
  // (undocumented)
  minHeight?: number | string;
  // (undocumented)
  minWidth?: number | string;
  // (undocumented)
  overflow?: string;
  // (undocumented)
  textAlign?: string;
  // (undocumented)
  textDecoration?: string;
  // (undocumented)
  userSelect?: string;
  // (undocumented)
  verticalAlign?: string;
  // (undocumented)
  width?: number | string;
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
  yellowLight: string;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IPartialComponentStyle {
  // (undocumented)
  [key: string]: IPartialStyle;
  // (undocumented)
  root: IPartialStyle;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IPartialStyle extends ICollectibleStyles {
  // (undocumented)
  selectors?: {
    [key: string]: ICollectibleStyles;
  }
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IRawFontStyle {
  // (undocumented)
  fontFamily?: string | undefined;
  // (undocumented)
  fontSize?: number | string | undefined;
  // (undocumented)
  fontWeight?: IFontWeight;
  // (undocumented)
  MozOsxFontSmoothing?: 'none' | 'antialiased' | 'grayscale' | 'subpixel-antialiased' | undefined;
  // (undocumented)
  WebkitFontSmoothing?: 'none' | 'antialiased' | 'grayscale' | 'subpixel-antialiased' | undefined;
}

// @public
interface IRGB {
  // (undocumented)
  a?: number;
  // (undocumented)
  b: number;
  // (undocumented)
  g: number;
  // (undocumented)
  r: number;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface ISpace {
  // (undocumented)
  margin?: number | string;
  // (undocumented)
  padding?: number | string;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IThemeCore {
  // (undocumented)
  layerCache: IThemeLayersBase<ILayerContents>;
  // (undocumented)
  layers: ILayers;
  // (undocumented)
  palette: IPalette;
  // (undocumented)
  typography: ITypography;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface ITypography {
  // (undocumented)
  families: IFontFamilies;
  // (undocumented)
  sizes: IFontSizes;
  // (undocumented)
  variants: IFontVariants;
  // (undocumented)
  weights: IFontWeights;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function mergeLayerCollections(partial: ILayers | undefined, parent: ILayers): ILayers;

// @public
export function relativeLuminance(r: number, g: number, b: number): number;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function resolveFontChoice(fontChoice: IFontChoice, typography: ITypography): IRawFontStyle;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function resolveLayerToComponentStyle(theme: IThemeCore, layer: ILayer, addSelectors: boolean, baseStyle?: IPartialComponentStyle, slotClasses?: IGetComponentStyleProps['slots']): object;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function resolveLayerToStyle(theme: IThemeCore, layer: ILayer, style: IPartialStyle): IPartialStyle;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function resolveThemeCore(definition: IPartialThemeCore | undefined, parent: IThemeCore): IThemeCore;

// @public
export function rgb2hex(r: number, g: number, b: number): string;

// @public
export function rgb2hsl(rgb: IRGB): IHSL;

// @public
export function rgbToString(r: number, g: number, b: number, a?: number): string;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function stripNonStyleProps(target: object): void;

// WARNING: Unsupported export: COLOR_VALUES
// WARNING: Unsupported export: DefaultPalette
// WARNING: Unsupported export: DefaultColorSlots
// WARNING: Unsupported export: DefaultFontSizes
// WARNING: Unsupported export: DefaultFontWeights
// WARNING: Unsupported export: DefaultFontVariants
// WARNING: Unsupported export: ILayerContentsFlatProps
// WARNING: Unsupported export: ILayerContents
// WARNING: Unsupported export: ILayer
// WARNING: Unsupported export: ILayers
// WARNING: Unsupported export: IPartialThemeCore
// WARNING: Unsupported export: ICSSRule
// WARNING: Unsupported export: IFontWeight
// WARNING: Unsupported export: IPartialTypography
// (No @packagedocumentation comment for this package)
