/**
 * Design tokens for alias colors
 */
export type ColorAliasTokens = {
  // https://www.figma.com/file/KB9oUjMKen2cKnyPG7RgdS/Design-tokens-superset?node-id=1963%3A17486
  colorAliasNeutralForeground1: string;
  colorAliasNeutralForeground2: string;
  colorAliasNeutralForeground2Hover: string;
  colorAliasNeutralForeground2Pressed: string;
  colorAliasNeutralForeground2Selected: string;
  colorAliasNeutralForeground2BrandHover: string;
  colorAliasNeutralForeground2BrandPressed: string;
  colorAliasNeutralForeground2BrandSelected: string;
  colorAliasNeutralForeground3: string;
  colorAliasNeutralForeground3Hover: string;
  colorAliasNeutralForeground3Pressed: string;
  colorAliasNeutralForeground3Selected: string;
  colorAliasNeutralForeground3BrandHover: string;
  colorAliasNeutralForeground3BrandPressed: string;
  colorAliasNeutralForeground3BrandSelected: string;
  colorAliasNeutralForeground4: string;
  colorAliasNeutralForegroundDisabled: string;
  colorAliasBrandForegroundLink: string;
  colorAliasBrandForegroundLinkHover: string;
  colorAliasBrandForegroundLinkPressed: string;
  colorAliasBrandForegroundLinkSelected: string;
  colorAliasCompoundBrandForeground1: string;
  colorAliasCompoundBrandForeground1Hover: string;
  colorAliasCompoundBrandForeground1Pressed: string;
  colorAliasBrandForeground1: string;
  colorAliasBrandForeground2: string;
  colorAliasNeutralForegroundInverted: string;
  colorAliasNeutralForegroundOnBrand: string;
  colorAliasNeutralForegroundInvertedLink: string;
  colorAliasNeutralForegroundInvertedLinkHover: string;
  colorAliasNeutralForegroundInvertedLinkPressed: string;
  colorAliasNeutralForegroundInvertedLinkSelected: string;
  colorAliasNeutralBackground1: string;
  colorAliasNeutralBackground1Hover: string;
  colorAliasNeutralBackground1Pressed: string;
  colorAliasNeutralBackground1Selected: string;
  colorAliasNeutralBackground2: string;
  colorAliasNeutralBackground2Hover: string;
  colorAliasNeutralBackground2Pressed: string;
  colorAliasNeutralBackground2Selected: string;
  colorAliasNeutralBackground3: string;
  colorAliasNeutralBackground3Hover: string;
  colorAliasNeutralBackground3Pressed: string;
  colorAliasNeutralBackground3Selected: string;
  colorAliasNeutralBackground4: string;
  colorAliasNeutralBackground4Hover: string;
  colorAliasNeutralBackground4Pressed: string;
  colorAliasNeutralBackground4Selected: string;
  colorAliasNeutralBackground5: string;
  colorAliasNeutralBackground5Hover: string;
  colorAliasNeutralBackground5Pressed: string;
  colorAliasNeutralBackground5Selected: string;
  colorAliasNeutralBackground6: string;
  colorAliasNeutralBackgroundInverted: string;
  colorAliasSubtleBackground: string;
  colorAliasSubtleBackgroundHover: string;
  colorAliasSubtleBackgroundPressed: string;
  colorAliasSubtleBackgroundSelected: string;
  colorAliasTransparentBackground: string;
  colorAliasTransparentBackgroundHover: string;
  colorAliasTransparentBackgroundPressed: string;
  colorAliasTransparentBackgroundSelected: string;
  colorAliasNeutralBackgroundDisabled: string;
  colorAliasNeutralStencil1: string;
  colorAliasNeutralStencil2: string;
  colorAliasBrandBackground: string;
  colorAliasBrandBackgroundHover: string;
  colorAliasBrandBackgroundPressed: string;
  colorAliasBrandBackgroundSelected: string;
  colorAliasCompoundBrandBackground: string;
  colorAliasCompoundBrandBackgroundHover: string;
  colorAliasCompoundBrandBackgroundPressed: string;
  colorAliasBrandBackgroundStatic: string;
  colorAliasBrandBackground2: string;
  colorAliasNeutralStrokeAccessible: string;
  colorAliasNeutralStrokeAccessibleHover: string;
  colorAliasNeutralStrokeAccessiblePressed: string;
  colorAliasNeutralStrokeAccessibleSelected: string;
  colorAliasNeutralStroke1: string;
  colorAliasNeutralStroke1Hover: string;
  colorAliasNeutralStroke1Pressed: string;
  colorAliasNeutralStroke1Selected: string;
  colorAliasNeutralStroke2: string;
  colorAliasNeutralStroke3: string;
  colorAliasBrandStroke1: string;
  colorAliasBrandStroke2: string;
  colorAliasCompoundBrandStroke: string;
  colorAliasCompoundBrandStrokeHover: string;
  colorAliasCompoundBrandStrokePressed: string;
  colorAliasNeutralStrokeDisabled: string;
  colorAliasTransparentStroke: string;
  colorAliasTransparentStrokeInteractive: string;
  colorAliasTransparentStrokeDisabled: string;
  colorAliasStrokeFocus1: string;
  colorAliasStrokeFocus2: string;
  colorAliasNeutralShadowAmbient: string;
  colorAliasNeutralShadowKey: string;
  colorAliasNeutralShadowAmbientLighter: string;
  colorAliasNeutralShadowKeyLighter: string;
  colorAliasNeutralShadowAmbientDarker: string;
  colorAliasNeutralShadowKeyDarker: string;
  colorAliasBrandShadowAmbient: string;
  colorAliasBrandShadowKey: string;
};

// TODO: better name for this
export type SharedColorT<Color extends string> =
  | `color${Color}Background1`
  | `color${Color}Background2`
  | `color${Color}Background3`
  | `color${Color}Foreground1`
  | `color${Color}Foreground2`
  | `color${Color}Foreground3`
  | `color${Color}BorderActive`
  | `color${Color}Border2`;

/**
 * Design tokens available for shared colors
 */
export type SharedColorTokens = Record<SharedColorT<GlobalSharedColorsT>, string>;

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
export type ShadowLevelTokens = {
  shadowLevelShadow2: string;
  shadowLevelShadow4: string;
  shadowLevelShadow8: string;
  shadowLevelShadow16: string;
  shadowLevelShadow28: string;
  shadowLevelShadow64: string;
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
  ShadowLevelTokens &
  FontFamilyTokens &
  SharedColorTokens &
  ColorAliasTokens;

export type PartialTheme = Partial<Theme>;
