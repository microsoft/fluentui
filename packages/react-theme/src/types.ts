/**
 * Design tokens for alias colors
 */
export type ColorTokens = {
  // https://www.figma.com/file/KB9oUjMKen2cKnyPG7RgdS/Design-tokens-superset?node-id=1963%3A17486
  colorNeutralForeground1: string;
  colorNeutralForeground2: string;
  colorNeutralForeground2Hover: string;
  colorNeutralForeground2Pressed: string;
  colorNeutralForeground2Selected: string;
  colorNeutralForeground2BrandHover: string;
  colorNeutralForeground2BrandPressed: string;
  colorNeutralForeground2BrandSelected: string;
  colorNeutralForeground3: string;
  colorNeutralForeground3Hover: string;
  colorNeutralForeground3Pressed: string;
  colorNeutralForeground3Selected: string;
  colorNeutralForeground3BrandHover: string;
  colorNeutralForeground3BrandPressed: string;
  colorNeutralForeground3BrandSelected: string;
  colorNeutralForeground4: string;
  colorNeutralForegroundDisabled: string;
  colorBrandForegroundLink: string;
  colorBrandForegroundLinkHover: string;
  colorBrandForegroundLinkPressed: string;
  colorBrandForegroundLinkSelected: string;
  colorCompoundBrandForeground1: string;
  colorCompoundBrandForeground1Hover: string;
  colorCompoundBrandForeground1Pressed: string;
  colorBrandForeground1: string;
  colorBrandForeground2: string;
  colorNeutralForegroundInverted: string;
  colorNeutralForegroundOnBrand: string;
  colorNeutralForegroundInvertedLink: string;
  colorNeutralForegroundInvertedLinkHover: string;
  colorNeutralForegroundInvertedLinkPressed: string;
  colorNeutralForegroundInvertedLinkSelected: string;
  colorNeutralBackground1: string;
  colorNeutralBackground1Hover: string;
  colorNeutralBackground1Pressed: string;
  colorNeutralBackground1Selected: string;
  colorNeutralBackground2: string;
  colorNeutralBackground2Hover: string;
  colorNeutralBackground2Pressed: string;
  colorNeutralBackground2Selected: string;
  colorNeutralBackground3: string;
  colorNeutralBackground3Hover: string;
  colorNeutralBackground3Pressed: string;
  colorNeutralBackground3Selected: string;
  colorNeutralBackground4: string;
  colorNeutralBackground4Hover: string;
  colorNeutralBackground4Pressed: string;
  colorNeutralBackground4Selected: string;
  colorNeutralBackground5: string;
  colorNeutralBackground5Hover: string;
  colorNeutralBackground5Pressed: string;
  colorNeutralBackground5Selected: string;
  colorNeutralBackground6: string;
  colorNeutralBackgroundInverted: string;
  colorSubtleBackground: string;
  colorSubtleBackgroundHover: string;
  colorSubtleBackgroundPressed: string;
  colorSubtleBackgroundSelected: string;
  colorTransparentBackground: string;
  colorTransparentBackgroundHover: string;
  colorTransparentBackgroundPressed: string;
  colorTransparentBackgroundSelected: string;
  colorNeutralBackgroundDisabled: string;
  colorNeutralStencil1: string;
  colorNeutralStencil2: string;
  colorBrandBackground: string;
  colorBrandBackgroundHover: string;
  colorBrandBackgroundPressed: string;
  colorBrandBackgroundSelected: string;
  colorCompoundBrandBackground: string;
  colorCompoundBrandBackgroundHover: string;
  colorCompoundBrandBackgroundPressed: string;
  colorBrandBackgroundStatic: string;
  colorBrandBackground2: string;
  colorNeutralStrokeAccessible: string;
  colorNeutralStrokeAccessibleHover: string;
  colorNeutralStrokeAccessiblePressed: string;
  colorNeutralStrokeAccessibleSelected: string;
  colorNeutralStroke1: string;
  colorNeutralStroke1Hover: string;
  colorNeutralStroke1Pressed: string;
  colorNeutralStroke1Selected: string;
  colorNeutralStroke2: string;
  colorNeutralStroke3: string;
  colorBrandStroke1: string;
  colorBrandStroke2: string;
  colorCompoundBrandStroke: string;
  colorCompoundBrandStrokeHover: string;
  colorCompoundBrandStrokePressed: string;
  colorNeutralStrokeDisabled: string;
  colorTransparentStroke: string;
  colorTransparentStrokeInteractive: string;
  colorTransparentStrokeDisabled: string;
  colorStrokeFocus1: string;
  colorStrokeFocus2: string;
  colorNeutralShadowAmbient: string;
  colorNeutralShadowKey: string;
  colorNeutralShadowAmbientLighter: string;
  colorNeutralShadowKeyLighter: string;
  colorNeutralShadowAmbientDarker: string;
  colorNeutralShadowKeyDarker: string;
  colorBrandShadowAmbient: string;
  colorBrandShadowKey: string;
};

// TODO: better name for this
export type ColorPaletteT<Color extends string> =
  | `colorPalette${Color}Background1`
  | `colorPalette${Color}Background2`
  | `colorPalette${Color}Background3`
  | `colorPalette${Color}Foreground1`
  | `colorPalette${Color}Foreground2`
  | `colorPalette${Color}Foreground3`
  | `colorPalette${Color}BorderActive`
  | `colorPalette${Color}Border2`;

/**
 * Design tokens available for shared colors
 */
export type ColorPaletteTokens = Record<ColorPaletteT<GlobalSharedColorsT>, string>;

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

// TODO: Better name
export type GlobalSharedColorsT =
  | 'DarkRed'
  | 'Burgundy'
  | 'Cranberry'
  | 'Red'
  | 'DarkOrange'
  | 'Bronze'
  | 'Pumpkin'
  | 'Orange'
  | 'Peach'
  | 'Marigold'
  | 'Yellow'
  | 'Gold'
  | 'Brass'
  | 'Brown'
  | 'DarkBrown'
  | 'Lime'
  | 'Forest'
  | 'Seafoam'
  | 'LightGreen'
  | 'Green'
  | 'DarkGreen'
  | 'LightTeal'
  | 'Teal'
  | 'DarkTeal'
  | 'Cyan'
  | 'Steel'
  | 'LightBlue'
  | 'Blue'
  | 'RoyalBlue'
  | 'DarkBlue'
  | 'Cornflower'
  | 'Navy'
  | 'Lavender'
  | 'Purple'
  | 'DarkPurple'
  | 'Orchid'
  | 'Grape'
  | 'Berry'
  | 'Lilac'
  | 'Pink'
  | 'HotPink'
  | 'Magenta'
  | 'Plum'
  | 'Beige'
  | 'Mink'
  | 'Silver'
  | 'Platinum'
  | 'Anchor'
  | 'Charcoal';

export type FontSizeTokens = {
  fontSizeBase100: string;
  fontSizeBase200: string;
  fontSizeBase300: string;
  fontSizeBase400: string;
  fontSizeBase500: string;
  fontSizeBase600: string;

  fontSizeHero700: string;
  fontSizeHero800: string;
  fontSizeHero900: string;
  fontSizeHero1000: string;
};

export type LineHeightTokens = {
  lineHeightBase100: string;
  lineHeightBase200: string;
  lineHeightBase300: string;
  lineHeightBase400: string;
  lineHeightBase500: string;
  lineHeightBase600: string;

  lineHeightHero700: string;
  lineHeightHero800: string;
  lineHeightHero900: string;
  lineHeightHero1000: string;
};

export type FontWeightTokens = {
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightSemibold: number;
};

export type FontFamilyTokens = {
  fontFamilyBase: string;
  fontFamilyMonospace: string;
  fontFamilyNumeric: string;
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

export type BorderRadiusTokens = {
  borderRadiusNone: string;
  borderRadiusSmall: string;
  borderRadiusMedium: string;
  borderRadiusLarge: string;
  borderRadiusXLarge: string;
  borderRadiusCircular: string;
};

export type StrokeWidthTokens = {
  strokeWidthThin: string;
  strokeWidthThick: string;
  strokeWidthThicker: string;
  strokeWidthThickest: string;
};

/**
 * Design tokens for shadow levels
 */
export type ShadowTokens = {
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

export type AlphaColors = 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;

// TODO: do we want to split theme for better tree shaking? (MUI)
// But will this end up in the bundle at all? It should be used only in makeStyles and should be removed during build
export type Theme = FontSizeTokens &
  LineHeightTokens &
  BorderRadiusTokens &
  StrokeWidthTokens &
  ShadowTokens &
  FontFamilyTokens &
  FontWeightTokens &
  ColorPaletteTokens &
  ColorTokens;

export type PartialTheme = Partial<Theme>;
