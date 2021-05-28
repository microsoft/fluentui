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
  neutralForeground2BrandHover: string;
  neutralForeground2BrandPressed: string;
  neutralForeground2BrandSelected: string;
  neutralForeground3: string;
  neutralForeground3Hover: string;
  neutralForeground3Pressed: string;
  neutralForeground3Selected: string;
  neutralForeground3BrandHover: string;
  neutralForeground3BrandPressed: string;
  neutralForeground3BrandSelected: string;
  neutralForeground4: string;
  neutralForegroundDisabled: string;
  brandForegroundLink: string;
  brandForegroundLinkHover: string;
  brandForegroundLinkPressed: string;
  brandForegroundLinkSelected: string;
  compoundBrandForeground1: string;
  compoundBrandForeground1Hover: string;
  compoundBrandForeground1Pressed: string;
  brandForeground1: string;
  brandForeground2: string;
  neutralForegroundInverted: string;
  neutralForegroundInvertedAccessible: string;
  neutralForegroundInvertedLink: string;
  neutralForegroundInvertedLinkHover: string;
  neutralForegroundInvertedLinkPressed: string;
  neutralForegroundInvertedLinkSelected: string;
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
  subtleBackground: string;
  subtleBackgroundHover: string;
  subtleBackgroundPressed: string;
  subtleBackgroundSelected: string;
  transparentBackground: string;
  transparentBackgroundHover: string;
  transparentBackgroundPressed: string;
  transparentBackgroundSelected: string;
  neutralBackgroundDisabled: string;
  brandBackground: string;
  brandBackgroundHover: string;
  brandBackgroundPressed: string;
  brandBackgroundSelected: string;
  compoundBrandBackground: string;
  compoundBrandBackgroundHover: string;
  compoundBrandBackgroundPressed: string;
  brandBackgroundStatic: string;
  brandBackground2: string;
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
  brandStroke1: string;
  brandStroke2: string;
  compoundBrandStroke: string;
  compoundBrandStrokeHover: string;
  compoundBrandStrokePressed: string;
  neutralStrokeDisabled: string;
  strokeAccessible: string;
  strokeAccessibleInteractive: string;
  strokeAccessibleDisabled: string;
  strokeFocus1: string;
  strokeFocus2: string;
  neutralShadowAmbient: string;
  neutralShadowKey: string;
  neutralShadowAmbientLighter: string;
  neutralShadowKeyLighter: string;
  neutralShadowAmbientDarker: string;
  neutralShadowKeyDarker: string;
  brandShadowAmbient: string;
  brandShadowKey: string;
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

export type BrandVariants = ColorVariants & { shade60: string };

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
  forest: ColorVariants;
  seafoam: ColorVariants;
  lightGreen: ColorVariants;
  green: ColorVariants;
  darkGreen: ColorVariants;
  lightTeal: ColorVariants;
  teal: ColorVariants;
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
  teams: BrandVariants;
  web: BrandVariants;
};

export type FontSizes = {
  base: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
  };
  hero: {
    700: string;
    800: string;
    900: string;
    1000: string;
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

export type TextAlignment =
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset'
  | 'center'
  | 'end'
  | 'start'
  | 'justify'
  | 'left'
  | 'match-parent'
  | 'right';

export type TextAlignments = {
  start: TextAlignment;
  center: TextAlignment;
  end: TextAlignment;
  justify: TextAlignment;
};

export type BorderRadius = {
  none: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  circular: string;
};

export type StrokeWidths = {
  thin: string;
  thick: string;
  thicker: string;
  thickest: string;
};

/**
 * Design tokens for shadow levels
 */
export type ShadowLevelTokens = {
  shadow2: string;
  shadow4: string;
  shadow8: string;
  shadow16: string;
  shadow28: string;
  shadow64: string;
};

export type GhostColorTokens = {
  ghostBackground: string;
  ghostBackgroundHover: string;
  ghostBackgroundPressed: string;
  ghostBackgroundSelected: string;
};

export type TransparentColorTokens = {
  transparentBackground: string;
  transparentBackgroundHover: string;
  transparentBackgroundPressed: string;
  transparentBackgroundSelected: string;
};

export type BackgroundColorTokens = {
  background: string;
  backgroundHover: string;
  backgroundPressed: string;
  backgroundSelected: string;
};

export type BrandColorTokens = {
  brandBackground: string;
  brandBackgroundHover: string;
  brandBackgroundPressed: string;
  brandBackgroundSelected: string;
  brandBackgroundStatic: string;
  // FIXME: the rest is unclear in the spec
};

export type Greys =
  | 0
  | 2
  | 4
  | 6
  | 8
  | 10
  | 12
  | 14
  | 16
  | 18
  | 20
  | 22
  | 24
  | 26
  | 28
  | 30
  | 32
  | 34
  | 36
  | 38
  | 40
  | 42
  | 44
  | 46
  | 48
  | 50
  | 52
  | 54
  | 56
  | 58
  | 60
  | 62
  | 64
  | 66
  | 68
  | 70
  | 72
  | 74
  | 76
  | 78
  | 80
  | 82
  | 84
  | 86
  | 88
  | 90
  | 92
  | 94
  | 96
  | 98
  | 100;

// TODO: do we want to split theme for better tree shaking? (MUI)
// But will this end up in the bundle at all? It should be used only in makeStyles and should be removed during build
export type Theme = {
  global: {
    // TODO: this means "static", will not change with light/dark/contrast switch. better named static?
    // TODO: Shift: we should move global away from theme, this is not themable
    //   ThemeProvider should not inject these css variables?
    color: {
      black: string;
      white: string;
      hcHyperlink: string;
      hcHighlight: string;
      hcDisabled: string;
      hcCanvas: string;
      hcCanvasText: string;
      hcHighlightText: string;
      hcButtonText: string;
      hcButtonFace: string;
    };
    palette: GlobalSharedColors & {
      brand: BrandVariants; // Only the Theme brand, not all
      grey: Record<Greys, string>;
    };
    type: {
      fontSizes: FontSizes;
      fontWeights: FontWeights;
      fontFamilies: FontFamilies;
      lineHeights: LineHeights;
      alignment: TextAlignments;
    };
    borderRadius: BorderRadius;
    strokeWidth: StrokeWidths;
  };
  alias: {
    color: Record<keyof GlobalSharedColors, SharedColorTokens> & {
      neutral: NeutralColorTokens;
    };
    shadow: ShadowLevelTokens;
  };
};

// TODO: fix shape
export type PartialTheme = RecursivePartial<Theme>;
