/**
 * Recursive partial type.
 */
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer I> ? Array<RecursivePartial<I>> : RecursivePartial<T[P]>;
};

/**
 * Design tokens for neutral colors
 */
export type NeutralColorTokens = {
  // https://www.figma.com/file/KB9oUjMKen2cKnyPG7RgdS/Design-tokens-superset?node-id=1963%3A17486
  neutralForeground1: string;
  neutralForeground2: string;
  neutralForeground2Hover: string;
  neutralForeground2Pressed: string;
  neutralForeground2Selected: string;
  brandForeground2Hover: string;
  brandForeground2Pressed: string;
  brandForeground2Selected: string;
  neutralForeground3: string;
  neutralForeground3Hover: string;
  neutralForeground3Pressed: string;
  neutralForeground3Selected: string;
  brandForeground3Hover: string;
  brandForeground3Pressed: string;
  brandForeground3Selected: string;
  neutralForeground4: string;
  neutralForegroundDisabled: string;
  brandForeground: string;
  brandForegroundHover: string;
  brandForegroundPressed: string;
  brandForegroundSelected: string;
  neutralForegroundInverted: string;
  neutralForegroundInvertedAccessible: string;
  neutralBackground1: string;
  neutralBackground1Hover: string;
  neutralBackground1Pressed: string;
  neutralBackground1Selected: string;
  neutralBackground2: string;
  neutralBackground2Hover: string;
  neutralBackground2Pressed: string;
  neutralBackground2Selected: string;
  neutralBackground3: string;
  neutralBackground3Hover: string;
  neutralBackground3Pressed: string;
  neutralBackground3Selected: string;
  neutralBackground4: string;
  neutralBackground4Hover: string;
  neutralBackground4Pressed: string;
  neutralBackground4Selected: string;
  neutralBackground5: string;
  neutralBackground5Hover: string;
  neutralBackground5Pressed: string;
  neutralBackground5Selected: string;
  neutralBackground6: string;
  neutralBackgroundDisabled: string;
  neutralStrokeAccessible: string;
  neutralStrokeAccessibleHover: string;
  neutralStrokeAccessiblePressed: string;
  neutralStrokeAccessibleSelected: string;
  neutralStroke1: string;
  neutralStroke1Hover: string;
  neutralStroke1Pressed: string;
  neutralStroke1Selected: string;
  neutralStroke2: string;
  neutralStroke3: string;
  neutralStrokeDisabled: string;
  strokeAccessible: string;
  strokeAccessibleInteractive: string;
  strokeAccessibleDisabled: string;
  neutralShadowAmbient: string;
  neutralShadowKey: string;
  neutralShadowAmbientLighter: string;
  neutralShadowKeyLighter: string;
  neutralShadowAmbientDarker: string;
  neutralShadowKeyDarker: string;
};

/**
 * Design tokens available for shared colors
 */
export type SharedColorTokens = {
  background1: string;
  background2: string;
  background3: string;
  foreground1: string;
  foreground2: string;
  foreground3: string;
  borderActive: string;
  border2: string;
};

/**
 * Possible color variant values
 */
export type ColorVariants = {
  shade50: string;
  shade40: string;
  shade30: string;
  shade20: string;
  shade10: string;
  primary: string;
  tint10: string;
  tint20: string;
  tint30: string;
  tint40: string;
  tint50: string;
  tint60: string;
};

/**
 * All the global shared colors and their shade/tint variants
 */
export type GlobalSharedColors = {
  darkRed: ColorVariants;
  burgundy: ColorVariants;
  cranberry: ColorVariants;
  red: ColorVariants;
  darkOrange: ColorVariants;
  bronze: ColorVariants;
  pumpkin: ColorVariants;
  orange: ColorVariants;
  peach: ColorVariants;
  marigold: ColorVariants;
  yellow: ColorVariants;
  gold: ColorVariants;
  brass: ColorVariants;
  brown: ColorVariants;
  darkBrown: ColorVariants;
  lime: ColorVariants;
  forrest: ColorVariants;
  seafoam: ColorVariants;
  lightGreen: ColorVariants;
  green: ColorVariants;
  darkGreen: ColorVariants;
  lightTeal: ColorVariants;
  darkTeal: ColorVariants;
  cyan: ColorVariants;
  steel: ColorVariants;
  lightBlue: ColorVariants;
  blue: ColorVariants;
  royalBlue: ColorVariants;
  darkBlue: ColorVariants;
  cornflower: ColorVariants;
  navy: ColorVariants;
  lavender: ColorVariants;
  purple: ColorVariants;
  darkPurple: ColorVariants;
  orchid: ColorVariants;
  grape: ColorVariants;
  berry: ColorVariants;
  lilac: ColorVariants;
  pink: ColorVariants;
  hotPink: ColorVariants;
  magenta: ColorVariants;
  plum: ColorVariants;
  beige: ColorVariants;
  mink: ColorVariants;
  silver: ColorVariants;
  platinum: ColorVariants;
  anchor: ColorVariants;
  charcoal: ColorVariants;
};

/**
 * Brand color variants by product
 */
export type ProductBrandColors = {
  teams: ColorVariants;
  web: ColorVariants;
};

export type FontSizes = {
  base: {
    100: number;
    200: number;
    300: number;
    400: number;
    500: number;
    600: number;
  };
  hero: {
    700: number;
    800: number;
    900: number;
    1000: number;
  };
};

export type LineHeights = FontSizes;

export type FontWeights = {
  regular: number;
  medium: number;
  semibold: number;
};

export type FontFamilies = {
  base: string;
  monospace: string;
  numeric: string;
};

export type BorderRadius = {
  none: number;
  small: number;
  medium: number;
  large: number;
  xLarge: number;
  circular: string;
};

export type StrokeWidths = {
  thin: number;
  thick: number;
  thicker: number;
  thickest: number;
};

/**
 * Each shadow level has an ambient and key variant
 */
type ShadowTokenValue = {
  ambient: string;
  key: string;
};

/**
 * Design tokens for shadow levels
 */
export type ShadowLevelTokens = {
  shadow2: ShadowTokenValue;
  shadow4: ShadowTokenValue;
  shadow8: ShadowTokenValue;
  shadow16: ShadowTokenValue;
  shadow28: ShadowTokenValue;
  shadow64: ShadowTokenValue;
};

/**
 * Theme object
 */
export type Theme = {
  sharedColors: GlobalSharedColors;
  sharedColorTokens: Record<keyof GlobalSharedColors, SharedColorTokens>;
  fontSizes: FontSizes;
  fontWeights: FontWeights;
  fontFamilies: FontFamilies;
  lineHeights: LineHeights;
  brandColors: ColorVariants;
  neutralColorTokens: NeutralColorTokens;
  shadowLevels?: ShadowLevelTokens;
};

export type PartialTheme = {
  sharedColors?: RecursivePartial<Theme['sharedColors']>;
  sharedColorTokens?: RecursivePartial<Theme['sharedColorTokens']>;
  fontSizes?: RecursivePartial<Theme['fontSizes']>;
  fontWeights?: RecursivePartial<Theme['fontWeights']>;
  fontFamilies?: RecursivePartial<Theme['fontFamilies']>;
  lineHeights?: RecursivePartial<Theme['lineHeights']>;
  brandColors?: RecursivePartial<Theme['brandColors']>;
  neutralColorTokens?: RecursivePartial<Theme['neutralColorTokens']>;
  shadowLevels?: RecursivePartial<Theme['shadowLevels']>;
};
