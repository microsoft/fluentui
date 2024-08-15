import {
  statusSharedColorNames,
  personaSharedColorNames,
  unusedSharedColorNames,
  mappedStatusColorNames,
} from './sharedColorNames';

/**
 * Design tokens for alias colors
 */
export type ColorTokens = {
  colorNeutralForeground1: string;
  colorNeutralForeground1Hover: string;
  colorNeutralForeground1Pressed: string;
  colorNeutralForeground1Selected: string;
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
  colorNeutralForegroundInvertedDisabled: string;
  colorBrandForegroundLink: string;
  colorBrandForegroundLinkHover: string;
  colorBrandForegroundLinkPressed: string;
  colorBrandForegroundLinkSelected: string;
  colorNeutralForeground2Link: string;
  colorNeutralForeground2LinkHover: string;
  colorNeutralForeground2LinkPressed: string;
  colorNeutralForeground2LinkSelected: string;
  colorCompoundBrandForeground1: string;
  colorCompoundBrandForeground1Hover: string;
  colorCompoundBrandForeground1Pressed: string;
  colorBrandForeground1: string;
  colorBrandForeground2: string;
  colorBrandForeground2Hover: string;
  colorBrandForeground2Pressed: string;
  colorNeutralForeground1Static: string;
  colorNeutralForegroundInverted: string;
  colorNeutralForegroundInvertedHover: string;
  colorNeutralForegroundInvertedPressed: string;
  colorNeutralForegroundInvertedSelected: string;
  colorNeutralForegroundInverted2: string;
  colorNeutralForegroundOnBrand: string;
  colorNeutralForegroundStaticInverted: string;
  colorNeutralForegroundInvertedLink: string;
  colorNeutralForegroundInvertedLinkHover: string;
  colorNeutralForegroundInvertedLinkPressed: string;
  colorNeutralForegroundInvertedLinkSelected: string;
  colorBrandForegroundInverted: string;
  colorBrandForegroundInvertedHover: string;
  colorBrandForegroundInvertedPressed: string;
  colorBrandForegroundOnLight: string;
  colorBrandForegroundOnLightHover: string;
  colorBrandForegroundOnLightPressed: string;
  colorBrandForegroundOnLightSelected: string;
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
  colorNeutralBackgroundStatic: string;
  colorNeutralBackgroundAlpha: string;
  colorNeutralBackgroundAlpha2: string;
  colorSubtleBackground: string;
  colorSubtleBackgroundHover: string;
  colorSubtleBackgroundPressed: string;
  colorSubtleBackgroundSelected: string;
  colorSubtleBackgroundLightAlphaHover: string;
  colorSubtleBackgroundLightAlphaPressed: string;
  colorSubtleBackgroundLightAlphaSelected: string;
  colorSubtleBackgroundInverted: string;
  colorSubtleBackgroundInvertedHover: string;
  colorSubtleBackgroundInvertedPressed: string;
  colorSubtleBackgroundInvertedSelected: string;
  colorTransparentBackground: string;
  colorTransparentBackgroundHover: string;
  colorTransparentBackgroundPressed: string;
  colorTransparentBackgroundSelected: string;
  colorNeutralBackgroundDisabled: string;
  colorNeutralBackgroundInvertedDisabled: string;
  colorNeutralStencil1: string;
  colorNeutralStencil2: string;
  colorNeutralStencil1Alpha: string;
  colorNeutralStencil2Alpha: string;
  colorBackgroundOverlay: string;
  colorScrollbarOverlay: string;
  colorBrandBackground: string;
  colorBrandBackgroundHover: string;
  colorBrandBackgroundPressed: string;
  colorBrandBackgroundSelected: string;
  colorCompoundBrandBackground: string;
  colorCompoundBrandBackgroundHover: string;
  colorCompoundBrandBackgroundPressed: string;
  colorBrandBackgroundStatic: string;
  colorBrandBackground2: string;
  colorBrandBackground2Hover: string;
  colorBrandBackground2Pressed: string;
  colorBrandBackground3Static: string;
  colorBrandBackground4Static: string;
  colorBrandBackgroundInverted: string;
  colorBrandBackgroundInvertedHover: string;
  colorBrandBackgroundInvertedPressed: string;
  colorBrandBackgroundInvertedSelected: string;
  colorNeutralCardBackground: string;
  colorNeutralCardBackgroundHover: string;
  colorNeutralCardBackgroundPressed: string;
  colorNeutralCardBackgroundSelected: string;
  colorNeutralCardBackgroundDisabled: string;
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
  colorNeutralStrokeSubtle: string;
  colorNeutralStrokeOnBrand: string;
  colorNeutralStrokeOnBrand2: string;
  colorNeutralStrokeOnBrand2Hover: string;
  colorNeutralStrokeOnBrand2Pressed: string;
  colorNeutralStrokeOnBrand2Selected: string;
  colorBrandStroke1: string;
  colorBrandStroke2: string;
  colorBrandStroke2Hover: string;
  colorBrandStroke2Pressed: string;
  colorBrandStroke2Contrast: string;
  colorCompoundBrandStroke: string;
  colorCompoundBrandStrokeHover: string;
  colorCompoundBrandStrokePressed: string;
  colorNeutralStrokeDisabled: string;
  colorNeutralStrokeInvertedDisabled: string;
  colorTransparentStroke: string;
  colorTransparentStrokeInteractive: string;
  colorTransparentStrokeDisabled: string;
  colorNeutralStrokeAlpha: string;
  colorNeutralStrokeAlpha2: string;
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

export type ColorStatusSuccess =
  | 'colorStatusSuccessBackground1'
  | 'colorStatusSuccessBackground2'
  | 'colorStatusSuccessBackground3'
  | 'colorStatusSuccessForeground1'
  | 'colorStatusSuccessForeground2'
  | 'colorStatusSuccessForeground3'
  | 'colorStatusSuccessForegroundInverted'
  | 'colorStatusSuccessBorderActive'
  | 'colorStatusSuccessBorder1'
  | 'colorStatusSuccessBorder2';

export type ColorStatusWarning =
  | 'colorStatusWarningBackground1'
  | 'colorStatusWarningBackground2'
  | 'colorStatusWarningBackground3'
  | 'colorStatusWarningForeground1'
  | 'colorStatusWarningForeground2'
  | 'colorStatusWarningForeground3'
  | 'colorStatusWarningForegroundInverted'
  | 'colorStatusWarningBorderActive'
  | 'colorStatusWarningBorder1'
  | 'colorStatusWarningBorder2';

export type ColorStatusDanger =
  | 'colorStatusDangerBackground1'
  | 'colorStatusDangerBackground2'
  | 'colorStatusDangerBackground3'
  | 'colorStatusDangerBackground3Hover'
  | 'colorStatusDangerBackground3Pressed'
  | 'colorStatusDangerForeground1'
  | 'colorStatusDangerForeground2'
  | 'colorStatusDangerForeground3'
  | 'colorStatusDangerForegroundInverted'
  | 'colorStatusDangerBorderActive'
  | 'colorStatusDangerBorder1'
  | 'colorStatusDangerBorder2';

export type ColorPaletteRed =
  | 'colorPaletteRedBackground1'
  | 'colorPaletteRedBackground2'
  | 'colorPaletteRedBackground3'
  | 'colorPaletteRedForeground1'
  | 'colorPaletteRedForeground2'
  | 'colorPaletteRedForeground3'
  | 'colorPaletteRedForegroundInverted'
  | 'colorPaletteRedBorderActive'
  | 'colorPaletteRedBorder1'
  | 'colorPaletteRedBorder2';

export type ColorPaletteGreen =
  | 'colorPaletteGreenBackground1'
  | 'colorPaletteGreenBackground2'
  | 'colorPaletteGreenBackground3'
  | 'colorPaletteGreenForeground1'
  | 'colorPaletteGreenForeground2'
  | 'colorPaletteGreenForeground3'
  | 'colorPaletteGreenForegroundInverted'
  | 'colorPaletteGreenBorderActive'
  | 'colorPaletteGreenBorder1'
  | 'colorPaletteGreenBorder2';

export type ColorPaletteDarkOrange =
  | 'colorPaletteDarkOrangeBackground1'
  | 'colorPaletteDarkOrangeBackground2'
  | 'colorPaletteDarkOrangeBackground3'
  | 'colorPaletteDarkOrangeForeground1'
  | 'colorPaletteDarkOrangeForeground2'
  | 'colorPaletteDarkOrangeForeground3'
  | 'colorPaletteDarkOrangeBorderActive'
  | 'colorPaletteDarkOrangeBorder1'
  | 'colorPaletteDarkOrangeBorder2';

export type ColorPaletteYellow =
  | 'colorPaletteYellowBackground1'
  | 'colorPaletteYellowBackground2'
  | 'colorPaletteYellowBackground3'
  | 'colorPaletteYellowForeground1'
  | 'colorPaletteYellowForeground2'
  | 'colorPaletteYellowForeground3'
  | 'colorPaletteYellowForegroundInverted'
  | 'colorPaletteYellowBorderActive'
  | 'colorPaletteYellowBorder1'
  | 'colorPaletteYellowBorder2';

export type ColorPaletteBerry =
  | 'colorPaletteBerryBackground1'
  | 'colorPaletteBerryBackground2'
  | 'colorPaletteBerryBackground3'
  | 'colorPaletteBerryForeground1'
  | 'colorPaletteBerryForeground2'
  | 'colorPaletteBerryForeground3'
  | 'colorPaletteBerryBorderActive'
  | 'colorPaletteBerryBorder1'
  | 'colorPaletteBerryBorder2';

export type ColorPaletteMarigold =
  | 'colorPaletteMarigoldBackground1'
  | 'colorPaletteMarigoldBackground2'
  | 'colorPaletteMarigoldBackground3'
  | 'colorPaletteMarigoldForeground1'
  | 'colorPaletteMarigoldForeground2'
  | 'colorPaletteMarigoldForeground3'
  | 'colorPaletteMarigoldBorderActive'
  | 'colorPaletteMarigoldBorder1'
  | 'colorPaletteMarigoldBorder2';

export type ColorPaletteLightGreen =
  | 'colorPaletteLightGreenBackground1'
  | 'colorPaletteLightGreenBackground2'
  | 'colorPaletteLightGreenBackground3'
  | 'colorPaletteLightGreenForeground1'
  | 'colorPaletteLightGreenForeground2'
  | 'colorPaletteLightGreenForeground3'
  | 'colorPaletteLightGreenBorderActive'
  | 'colorPaletteLightGreenBorder1'
  | 'colorPaletteLightGreenBorder2';

export type ColorPaletteDarkRed =
  | 'colorPaletteDarkRedBackground2'
  | 'colorPaletteDarkRedForeground2'
  | 'colorPaletteDarkRedBorderActive';

export type ColorPaletteCranberry =
  | 'colorPaletteCranberryBackground2'
  | 'colorPaletteCranberryForeground2'
  | 'colorPaletteCranberryBorderActive';

export type ColorPalettePumpkin =
  | 'colorPalettePumpkinBackground2'
  | 'colorPalettePumpkinForeground2'
  | 'colorPalettePumpkinBorderActive';

export type ColorPalettePeach =
  | 'colorPalettePeachBackground2'
  | 'colorPalettePeachForeground2'
  | 'colorPalettePeachBorderActive';

export type ColorPaletteGold =
  | 'colorPaletteGoldBackground2'
  | 'colorPaletteGoldForeground2'
  | 'colorPaletteGoldBorderActive';

export type ColorPaletteBrass =
  | 'colorPaletteBrassBackground2'
  | 'colorPaletteBrassForeground2'
  | 'colorPaletteBrassBorderActive';

export type ColorPaletteBrown =
  | 'colorPaletteBrownBackground2'
  | 'colorPaletteBrownForeground2'
  | 'colorPaletteBrownBorderActive';

export type ColorPaletteForest =
  | 'colorPaletteForestBackground2'
  | 'colorPaletteForestForeground2'
  | 'colorPaletteForestBorderActive';

export type ColorPaletteSeafoam =
  | 'colorPaletteSeafoamBackground2'
  | 'colorPaletteSeafoamForeground2'
  | 'colorPaletteSeafoamBorderActive';

export type ColorPaletteDarkGreen =
  | 'colorPaletteDarkGreenBackground2'
  | 'colorPaletteDarkGreenForeground2'
  | 'colorPaletteDarkGreenBorderActive';

export type ColorPaletteLightTeal =
  | 'colorPaletteLightTealBackground2'
  | 'colorPaletteLightTealForeground2'
  | 'colorPaletteLightTealBorderActive';

export type ColorPaletteTeal =
  | 'colorPaletteTealBackground2'
  | 'colorPaletteTealForeground2'
  | 'colorPaletteTealBorderActive';

export type ColorPaletteSteel =
  | 'colorPaletteSteelBackground2'
  | 'colorPaletteSteelForeground2'
  | 'colorPaletteSteelBorderActive';

export type ColorPaletteBlue =
  | 'colorPaletteBlueBackground2'
  | 'colorPaletteBlueForeground2'
  | 'colorPaletteBlueBorderActive';

export type ColorPaletteRoyalBlue =
  | 'colorPaletteRoyalBlueBackground2'
  | 'colorPaletteRoyalBlueForeground2'
  | 'colorPaletteRoyalBlueBorderActive';

export type ColorPaletteCornflower =
  | 'colorPaletteCornflowerBackground2'
  | 'colorPaletteCornflowerForeground2'
  | 'colorPaletteCornflowerBorderActive';

export type ColorPaletteNavy =
  | 'colorPaletteNavyBackground2'
  | 'colorPaletteNavyForeground2'
  | 'colorPaletteNavyBorderActive';

export type ColorPaletteLavender =
  | 'colorPaletteLavenderBackground2'
  | 'colorPaletteLavenderForeground2'
  | 'colorPaletteLavenderBorderActive';

export type ColorPalettePurple =
  | 'colorPalettePurpleBackground2'
  | 'colorPalettePurpleForeground2'
  | 'colorPalettePurpleBorderActive';

export type ColorPaletteGrape =
  | 'colorPaletteGrapeBackground2'
  | 'colorPaletteGrapeForeground2'
  | 'colorPaletteGrapeBorderActive';

export type ColorPaletteLilac =
  | 'colorPaletteLilacBackground2'
  | 'colorPaletteLilacForeground2'
  | 'colorPaletteLilacBorderActive';

export type ColorPalettePink =
  | 'colorPalettePinkBackground2'
  | 'colorPalettePinkForeground2'
  | 'colorPalettePinkBorderActive';

export type ColorPaletteMagenta =
  | 'colorPaletteMagentaBackground2'
  | 'colorPaletteMagentaForeground2'
  | 'colorPaletteMagentaBorderActive';

export type ColorPalettePlum =
  | 'colorPalettePlumBackground2'
  | 'colorPalettePlumForeground2'
  | 'colorPalettePlumBorderActive';

export type ColorPaletteBeige =
  | 'colorPaletteBeigeBackground2'
  | 'colorPaletteBeigeForeground2'
  | 'colorPaletteBeigeBorderActive';

export type ColorPaletteMink =
  | 'colorPaletteMinkBackground2'
  | 'colorPaletteMinkForeground2'
  | 'colorPaletteMinkBorderActive';

export type ColorPalettePlatinum =
  | 'colorPalettePlatinumBackground2'
  | 'colorPalettePlatinumForeground2'
  | 'colorPalettePlatinumBorderActive';

export type ColorPaletteAnchor =
  | 'colorPaletteAnchorBackground2'
  | 'colorPaletteAnchorForeground2'
  | 'colorPaletteAnchorBorderActive';

export type ColorStatusTokens = Record<ColorStatusSuccess | ColorStatusWarning | ColorStatusDanger, string>;

export type StatusColorPaletteTokens = Record<
  | ColorPaletteRed
  | ColorPaletteGreen
  | ColorPaletteDarkOrange
  | ColorPaletteYellow
  | ColorPaletteBerry
  | ColorPaletteMarigold
  | ColorPaletteLightGreen,
  string
>;

export type PersonaColorPaletteTokens = Record<
  | ColorPaletteDarkRed
  | ColorPaletteCranberry
  | ColorPalettePumpkin
  | ColorPalettePeach
  | ColorPaletteGold
  | ColorPaletteBrass
  | ColorPaletteBrown
  | ColorPaletteForest
  | ColorPaletteSeafoam
  | ColorPaletteDarkGreen
  | ColorPaletteLightTeal
  | ColorPaletteTeal
  | ColorPaletteSteel
  | ColorPaletteBlue
  | ColorPaletteRoyalBlue
  | ColorPaletteCornflower
  | ColorPaletteNavy
  | ColorPaletteLavender
  | ColorPalettePurple
  | ColorPaletteGrape
  | ColorPaletteLilac
  | ColorPalettePink
  | ColorPaletteMagenta
  | ColorPalettePlum
  | ColorPaletteBeige
  | ColorPaletteMink
  | ColorPalettePlatinum
  | ColorPaletteAnchor,
  string
>;

export type ColorPaletteTokens = StatusColorPaletteTokens & PersonaColorPaletteTokens;

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

export type Brands = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 | 110 | 120 | 130 | 140 | 150 | 160;

export type BrandVariants = Record<Brands, string>;

type StatusSharedColorNames = (typeof statusSharedColorNames)[number];
type PersonaSharedColorNames = (typeof personaSharedColorNames)[number];
export type MappedStatusColorNames = (typeof mappedStatusColorNames)[number];
type UnusedSharedColorNames = (typeof unusedSharedColorNames)[number];

export type StatusSharedColors = Record<StatusSharedColorNames, ColorVariants>;
export type PersonaSharedColors = Record<PersonaSharedColorNames, ColorVariants>;
export type MappedStatusColors = Record<MappedStatusColorNames, ColorVariants>;
export type UnusedSharedColors = Record<UnusedSharedColorNames, ColorVariants>;

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
  fontWeightBold: number;
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

export type TypographyStyle = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
};

export type TypographyStyles = {
  body1: TypographyStyle;
  body1Strong: TypographyStyle;
  body1Stronger: TypographyStyle;
  body2: TypographyStyle;
  caption1: TypographyStyle;
  caption1Strong: TypographyStyle;
  caption1Stronger: TypographyStyle;
  caption2: TypographyStyle;
  caption2Strong: TypographyStyle;
  subtitle1: TypographyStyle;
  subtitle2: TypographyStyle;
  subtitle2Stronger: TypographyStyle;
  title1: TypographyStyle;
  title2: TypographyStyle;
  title3: TypographyStyle;
  largeTitle: TypographyStyle;
  display: TypographyStyle;
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

export type SpacingTokens = {
  none: string;
  xxs: string;
  xs: string;
  sNudge: string;
  s: string;
  mNudge: string;
  m: string;
  l: string;
  xl: string;
  xxl: string;
  xxxl: string;
};

export type HorizontalSpacingTokens = {
  spacingHorizontalNone: string;
  spacingHorizontalXXS: string;
  spacingHorizontalXS: string;
  spacingHorizontalSNudge: string;
  spacingHorizontalS: string;
  spacingHorizontalMNudge: string;
  spacingHorizontalM: string;
  spacingHorizontalL: string;
  spacingHorizontalXL: string;
  spacingHorizontalXXL: string;
  spacingHorizontalXXXL: string;
};

export type VerticalSpacingTokens = {
  spacingVerticalNone: string;
  spacingVerticalXXS: string;
  spacingVerticalXS: string;
  spacingVerticalSNudge: string;
  spacingVerticalS: string;
  spacingVerticalMNudge: string;
  spacingVerticalM: string;
  spacingVerticalL: string;
  spacingVerticalXL: string;
  spacingVerticalXXL: string;
  spacingVerticalXXXL: string;
};

export type DurationTokens = {
  durationUltraFast: string;
  durationFaster: string;
  durationFast: string;
  durationNormal: string;
  durationGentle: string;
  durationSlow: string;
  durationSlower: string;
  durationUltraSlow: string;
};

export type CurveTokens = {
  curveAccelerateMax: string;
  curveAccelerateMid: string;
  curveAccelerateMin: string;
  curveDecelerateMax: string;
  curveDecelerateMid: string;
  curveDecelerateMin: string;
  curveEasyEaseMax: string;
  curveEasyEase: string;
  curveLinear: string;
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

export type ShadowBrandTokens = {
  shadow2Brand: string;
  shadow4Brand: string;
  shadow8Brand: string;
  shadow16Brand: string;
  shadow28Brand: string;
  shadow64Brand: string;
};

export type Greys =
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
  | 98;

export type AlphaColors = 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;

// TODO: do we want to split theme for better tree shaking? (MUI)
// But will this end up in the bundle at all? It should be used only in makeStyles and should be removed during build
export type Theme = FontSizeTokens &
  LineHeightTokens &
  BorderRadiusTokens &
  StrokeWidthTokens &
  HorizontalSpacingTokens &
  VerticalSpacingTokens &
  DurationTokens &
  CurveTokens &
  ShadowTokens &
  ShadowBrandTokens &
  FontFamilyTokens &
  FontWeightTokens &
  ColorPaletteTokens &
  ColorStatusTokens &
  ColorTokens;

export type PartialTheme = Partial<Theme>;
