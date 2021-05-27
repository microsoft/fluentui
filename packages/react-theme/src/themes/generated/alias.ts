import { GlobalSharedColors, NeutralColorTokens, SharedColorTokens } from '../../types';

export const neutralColorTokens: NeutralColorTokens = {
  neutralForeground1: 'var(--global-palette-grey-14)', // #242424 Global.Color.Grey.14
  neutralForeground2: 'var(--global-palette-grey-26)', // #424242 Global.Color.Grey.26
  neutralForeground2Hover: 'var(--global-palette-grey-14)', // #242424 Global.Color.Grey.14
  neutralForeground2Pressed: 'var(--global-palette-grey-14)', // #242424 Global.Color.Grey.14
  neutralForeground2Selected: 'var(--global-palette-grey-14)', // #242424 Global.Color.Grey.14
  neutralForeground2BrandHover: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  neutralForeground2BrandPressed: 'var(--global-palette-brand-shade10)', // #106ebe Global.Color.Brand.Shade.10
  neutralForeground2BrandSelected: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  neutralForeground3: 'var(--global-palette-grey-38)', // #616161 Global.Color.Grey.38
  neutralForeground3Hover: 'var(--global-palette-grey-26)', // #424242 Global.Color.Grey.26
  neutralForeground3Pressed: 'var(--global-palette-grey-26)', // #424242 Global.Color.Grey.26
  neutralForeground3Selected: 'var(--global-palette-grey-26)', // #424242 Global.Color.Grey.26
  neutralForeground3BrandHover: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  neutralForeground3BrandPressed: 'var(--global-palette-brand-shade10)', // #106ebe Global.Color.Brand.Shade.10
  neutralForeground3BrandSelected: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  neutralForeground4: 'var(--global-palette-grey-50)', // #808080 Global.Color.Grey.50
  neutralForegroundDisabled: 'var(--global-palette-grey-74)', // #bdbdbd Global.Color.Grey.74
  brandForegroundLink: 'var(--global-palette-brand-shade10)', // #106ebe Global.Color.Brand.Shade.10
  brandForegroundLinkHover: 'var(--global-palette-brand-shade20)', // #005a9e Global.Color.Brand.Shade.20
  brandForegroundLinkPressed: 'var(--global-palette-brand-shade40)', // #004578 Global.Color.Brand.Shade.40
  brandForegroundLinkSelected: 'var(--global-palette-brand-shade10)', // #106ebe Global.Color.Brand.Shade.10
  compoundBrandForeground1: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  compoundBrandForeground1Hover: 'var(--global-palette-brand-shade10)', // #106ebe Global.Color.Brand.Shade.10
  compoundBrandForeground1Pressed: 'var(--global-palette-brand-shade20)', // #005a9e Global.Color.Brand.Shade.20
  brandForeground1: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  brandForeground2: 'var(--global-palette-brand-shade10)', // #106ebe Global.Color.Brand.Shade.10
  neutralForegroundInverted: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForegroundInvertedAccessible: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForegroundInvertedLink: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForegroundInvertedLinkHover: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForegroundInvertedLinkPressed: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForegroundInvertedLinkSelected: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralBackground1: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralBackground1Hover: 'var(--global-palette-grey-96)', // #f5f5f5 Global.Color.Grey.96
  neutralBackground1Pressed: 'var(--global-palette-grey-88)', // #e0e0e0 Global.Color.Grey.88
  neutralBackground1Selected: 'var(--global-palette-grey-92)', // #ebebeb Global.Color.Grey.92
  neutralBackground2: 'var(--global-palette-grey-98)', // #fafafa Global.Color.Grey.98
  neutralBackground2Hover: 'var(--global-palette-grey-94)', // #f0f0f0 Global.Color.Grey.94
  neutralBackground2Pressed: 'var(--global-palette-grey-86)', // #dbdbdb Global.Color.Grey.86
  neutralBackground2Selected: 'var(--global-palette-grey-90)', // #e6e6e6 Global.Color.Grey.90
  neutralBackground3: 'var(--global-palette-grey-96)', // #f5f5f5 Global.Color.Grey.96
  neutralBackground3Hover: 'var(--global-palette-grey-92)', // #ebebeb Global.Color.Grey.92
  neutralBackground3Pressed: 'var(--global-palette-grey-84)', // #d6d6d6 Global.Color.Grey.84
  neutralBackground3Selected: 'var(--global-palette-grey-88)', // #e0e0e0 Global.Color.Grey.88
  neutralBackground4: 'var(--global-palette-grey-94)', // #f0f0f0 Global.Color.Grey.94
  neutralBackground4Hover: 'var(--global-palette-grey-98)', // #fafafa Global.Color.Grey.98
  neutralBackground4Pressed: 'var(--global-palette-grey-96)', // #f5f5f5 Global.Color.Grey.96
  neutralBackground4Selected: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralBackground5: 'var(--global-palette-grey-92)', // #ebebeb Global.Color.Grey.92
  neutralBackground5Hover: 'var(--global-palette-grey-96)', // #f5f5f5 Global.Color.Grey.96
  neutralBackground5Pressed: 'var(--global-palette-grey-94)', // #f0f0f0 Global.Color.Grey.94
  neutralBackground5Selected: 'var(--global-palette-grey-98)', // #fafafa Global.Color.Grey.98
  neutralBackground6: 'var(--global-palette-grey-90)', // #e6e6e6 Global.Color.Grey.90
  subtleBackground: 'transparent', // transparent undefined
  subtleBackgroundHover: 'var(--global-palette-grey-96)', // #f5f5f5 Global.Color.Grey.96
  subtleBackgroundPressed: 'var(--global-palette-grey-88)', // #e0e0e0 Global.Color.Grey.88
  subtleBackgroundSelected: 'var(--global-palette-grey-92)', // #ebebeb Global.Color.Grey.92
  transparentBackground: 'transparent', // transparent undefined
  transparentBackgroundHover: 'transparent', // transparent undefined
  transparentBackgroundPressed: 'transparent', // transparent undefined
  transparentBackgroundSelected: 'transparent', // transparent undefined
  neutralBackgroundDisabled: 'var(--global-palette-grey-94)', // #f0f0f0 Global.Color.Grey.94
  brandBackground: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  brandBackgroundHover: 'var(--global-palette-brand-shade10)', // #106ebe Global.Color.Brand.Shade.10
  brandBackgroundPressed: 'var(--global-palette-brand-shade40)', // #004578 Global.Color.Brand.Shade.40
  brandBackgroundSelected: 'var(--global-palette-brand-shade20)', // #005a9e Global.Color.Brand.Shade.20
  compoundBrandBackground: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  compoundBrandBackgroundHover: 'var(--global-palette-brand-shade10)', // #106ebe Global.Color.Brand.Shade.10
  compoundBrandBackgroundPressed: 'var(--global-palette-brand-shade20)', // #005a9e Global.Color.Brand.Shade.20
  brandBackgroundStatic: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  brandBackground2: 'var(--global-palette-brand-tint60)', // #eff6fc Global.Color.Brand.Tint.60
  neutralStrokeAccessible: 'var(--global-palette-grey-38)', // #616161 Global.Color.Grey.38
  neutralStrokeAccessibleHover: 'var(--global-palette-grey-34)', // #575757 Global.Color.Grey.34
  neutralStrokeAccessiblePressed: 'var(--global-palette-grey-30)', // #4d4d4d Global.Color.Grey.30
  neutralStrokeAccessibleSelected: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  neutralStroke1: 'var(--global-palette-grey-82)', // #d1d1d1 Global.Color.Grey.82
  neutralStroke1Hover: 'var(--global-palette-grey-78)', // #c7c7c7 Global.Color.Grey.78
  neutralStroke1Pressed: 'var(--global-palette-grey-70)', // #b3b3b3 Global.Color.Grey.70
  neutralStroke1Selected: 'var(--global-palette-grey-74)', // #bdbdbd Global.Color.Grey.74
  neutralStroke2: 'var(--global-palette-grey-88)', // #e0e0e0 Global.Color.Grey.88
  neutralStroke3: 'var(--global-palette-grey-94)', // #f0f0f0 Global.Color.Grey.94
  brandStroke1: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  brandStroke2: 'var(--global-palette-brand-tint40)', // #c7e0f4 Global.Color.Brand.Tint.40
  compoundBrandStroke: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  compoundBrandStrokeHover: 'var(--global-palette-brand-shade10)', // #106ebe Global.Color.Brand.Shade.10
  compoundBrandStrokePressed: 'var(--global-palette-brand-shade20)', // #005a9e Global.Color.Brand.Shade.20
  neutralStrokeDisabled: 'var(--global-palette-grey-88)', // #e0e0e0 Global.Color.Grey.88
  strokeAccessible: 'transparent', // transparent undefined
  strokeAccessibleInteractive: 'transparent', // transparent undefined
  strokeAccessibleDisabled: 'transparent', // transparent undefined
  strokeFocus1: 'var(--global-color-white)', // #ffffff Global.Color.White
  strokeFocus2: 'var(--global-color-black)', // #000000 Global.Color.Black
  neutralShadowAmbient: 'rgba(0,0,0,0.12)', // rgba(0,0,0,0.12) undefined
  neutralShadowKey: 'rgba(0,0,0,0.14)', // rgba(0,0,0,0.14) undefined
  neutralShadowAmbientLighter: 'rgba(0,0,0,0.06)', // rgba(0,0,0,0.06) undefined
  neutralShadowKeyLighter: 'rgba(0,0,0,0.07)', // rgba(0,0,0,0.07) undefined
  neutralShadowAmbientDarker: 'rgba(0,0,0,0.20)', // rgba(0,0,0,0.20) undefined
  neutralShadowKeyDarker: 'rgba(0,0,0,0.24)', // rgba(0,0,0,0.24) undefined
  brandShadowAmbient: 'rgba(0,0,0,0.30)', // rgba(0,0,0,0.30) undefined
  brandShadowKey: 'rgba(0,0,0,0.25)', // rgba(0,0,0,0.25) undefined
};

export const generateSharedColorTokens: (
  globalSharedTokens: GlobalSharedColors,
) => Record<keyof GlobalSharedColors, SharedColorTokens> = globalSharedTokens => {
  return Object.keys(globalSharedTokens)
    .filter(sharedColor => sharedColor !== 'brand' && sharedColor !== 'grey')
    .reduce((acc, sharedColor) => {
      acc[sharedColor as keyof GlobalSharedColors] = {
        background1: `var(--global-palette-${sharedColor}-tint60)`,
        background2: `var(--global-palette-${sharedColor}-tint40)`,
        background3: `var(--global-palette-${sharedColor}-primary)`,
        foreground1: `var(--global-palette-${sharedColor}-shade10)`,
        foreground2: `var(--global-palette-${sharedColor}-shade30)`,
        foreground3: `var(--global-palette-${sharedColor}-primary)`,
        borderActive: `var(--global-palette-${sharedColor}-primary)`,
        border2: `var(--global-palette-${sharedColor}-primary)`,
      };
      return acc;
    }, {} as Record<keyof GlobalSharedColors, SharedColorTokens>);
};

export const sharedColorTokens: Record<keyof GlobalSharedColors, SharedColorTokens> = {
  darkRed: {
    background1: 'var(--global-palette-darkRed-tint60)', // #f9f0f2 Global.Color.DarkRed.Tint60
    background2: 'var(--global-palette-darkRed-tint40)', // #d69ca5 Global.Color.DarkRed.Tint40
    background3: 'var(--global-palette-darkRed-primary)', // #750b1c Global.Color.DarkRed.Primary
    foreground1: 'var(--global-palette-darkRed-shade10)', // #690a19 Global.Color.DarkRed.Shade10
    foreground2: 'var(--global-palette-darkRed-shade30)', // #420610 Global.Color.DarkRed.Shade30
    foreground3: 'var(--global-palette-darkRed-primary)', // #750b1c Global.Color.DarkRed.Primary
    borderActive: 'var(--global-palette-darkRed-primary)', // #750b1c Global.Color.DarkRed.Primary
    border2: 'var(--global-palette-darkRed-primary)', // #750b1c Global.Color.DarkRed.Primary
  },
  burgundy: {
    background1: 'var(--global-palette-burgundy-tint60)', // #fbf4f4 Global.Color.Burgundy.Tint60
    background2: 'var(--global-palette-burgundy-tint40)', // #e4afb2 Global.Color.Burgundy.Tint40
    background3: 'var(--global-palette-burgundy-primary)', // #a4262c Global.Color.Burgundy.Primary
    foreground1: 'var(--global-palette-burgundy-shade10)', // #942228 Global.Color.Burgundy.Shade10
    foreground2: 'var(--global-palette-burgundy-shade30)', // #5c1519 Global.Color.Burgundy.Shade30
    foreground3: 'var(--global-palette-burgundy-primary)', // #a4262c Global.Color.Burgundy.Primary
    borderActive: 'var(--global-palette-burgundy-primary)', // #a4262c Global.Color.Burgundy.Primary
    border2: 'var(--global-palette-burgundy-primary)', // #a4262c Global.Color.Burgundy.Primary
  },
  cranberry: {
    background1: 'var(--global-palette-cranberry-tint60)', // #fdf3f4 Global.Color.Cranberry.Tint60
    background2: 'var(--global-palette-cranberry-tint40)', // #eeacb2 Global.Color.Cranberry.Tint40
    background3: 'var(--global-palette-cranberry-primary)', // #c50f1f Global.Color.Cranberry.Primary
    foreground1: 'var(--global-palette-cranberry-shade10)', // #b10e1c Global.Color.Cranberry.Shade10
    foreground2: 'var(--global-palette-cranberry-shade30)', // #6e0811 Global.Color.Cranberry.Shade30
    foreground3: 'var(--global-palette-cranberry-primary)', // #c50f1f Global.Color.Cranberry.Primary
    borderActive: 'var(--global-palette-cranberry-primary)', // #c50f1f Global.Color.Cranberry.Primary
    border2: 'var(--global-palette-cranberry-primary)', // #c50f1f Global.Color.Cranberry.Primary
  },
  red: {
    background1: 'var(--global-palette-red-tint60)', // #fdf6f6 Global.Color.Red.Tint60
    background2: 'var(--global-palette-red-tint40)', // #f1bbbc Global.Color.Red.Tint40
    background3: 'var(--global-palette-red-primary)', // #d13438 Global.Color.Red.Primary
    foreground1: 'var(--global-palette-red-shade10)', // #bc2f32 Global.Color.Red.Shade10
    foreground2: 'var(--global-palette-red-shade30)', // #751d1f Global.Color.Red.Shade30
    foreground3: 'var(--global-palette-red-primary)', // #d13438 Global.Color.Red.Primary
    borderActive: 'var(--global-palette-red-primary)', // #d13438 Global.Color.Red.Primary
    border2: 'var(--global-palette-red-primary)', // #d13438 Global.Color.Red.Primary
  },
  darkOrange: {
    background1: 'var(--global-palette-darkOrange-tint60)', // #fdf6f3 Global.Color.DarkOrange.Tint60
    background2: 'var(--global-palette-darkOrange-tint40)', // #f4bfab Global.Color.DarkOrange.Tint40
    background3: 'var(--global-palette-darkOrange-primary)', // #da3b01 Global.Color.DarkOrange.Primary
    foreground1: 'var(--global-palette-darkOrange-shade10)', // #c43501 Global.Color.DarkOrange.Shade10
    foreground2: 'var(--global-palette-darkOrange-shade30)', // #7a2101 Global.Color.DarkOrange.Shade30
    foreground3: 'var(--global-palette-darkOrange-primary)', // #da3b01 Global.Color.DarkOrange.Primary
    borderActive: 'var(--global-palette-darkOrange-primary)', // #da3b01 Global.Color.DarkOrange.Primary
    border2: 'var(--global-palette-darkOrange-primary)', // #da3b01 Global.Color.DarkOrange.Primary
  },
  bronze: {
    background1: 'var(--global-palette-bronze-tint60)', // #fbf5f2 Global.Color.Bronze.Tint60
    background2: 'var(--global-palette-bronze-tint40)', // #e5bba4 Global.Color.Bronze.Tint40
    background3: 'var(--global-palette-bronze-primary)', // #a74109 Global.Color.Bronze.Primary
    foreground1: 'var(--global-palette-bronze-shade10)', // #963a08 Global.Color.Bronze.Shade10
    foreground2: 'var(--global-palette-bronze-shade30)', // #5e2405 Global.Color.Bronze.Shade30
    foreground3: 'var(--global-palette-bronze-primary)', // #a74109 Global.Color.Bronze.Primary
    borderActive: 'var(--global-palette-bronze-primary)', // #a74109 Global.Color.Bronze.Primary
    border2: 'var(--global-palette-bronze-primary)', // #a74109 Global.Color.Bronze.Primary
  },
  pumpkin: {
    background1: 'var(--global-palette-pumpkin-tint60)', // #fdf7f4 Global.Color.Pumpkin.Tint60
    background2: 'var(--global-palette-pumpkin-tint40)', // #efc4ad Global.Color.Pumpkin.Tint40
    background3: 'var(--global-palette-pumpkin-primary)', // #ca5010 Global.Color.Pumpkin.Primary
    foreground1: 'var(--global-palette-pumpkin-shade10)', // #b6480e Global.Color.Pumpkin.Shade10
    foreground2: 'var(--global-palette-pumpkin-shade30)', // #712d09 Global.Color.Pumpkin.Shade30
    foreground3: 'var(--global-palette-pumpkin-primary)', // #ca5010 Global.Color.Pumpkin.Primary
    borderActive: 'var(--global-palette-pumpkin-primary)', // #ca5010 Global.Color.Pumpkin.Primary
    border2: 'var(--global-palette-pumpkin-primary)', // #ca5010 Global.Color.Pumpkin.Primary
  },
  orange: {
    background1: 'var(--global-palette-orange-tint60)', // #fff9f5 Global.Color.Orange.Tint60
    background2: 'var(--global-palette-orange-tint40)', // #fdcfb4 Global.Color.Orange.Tint40
    background3: 'var(--global-palette-orange-primary)', // #f7630c Global.Color.Orange.Primary
    foreground1: 'var(--global-palette-orange-shade10)', // #de590b Global.Color.Orange.Shade10
    foreground2: 'var(--global-palette-orange-shade30)', // #8a3707 Global.Color.Orange.Shade30
    foreground3: 'var(--global-palette-orange-primary)', // #f7630c Global.Color.Orange.Primary
    borderActive: 'var(--global-palette-orange-primary)', // #f7630c Global.Color.Orange.Primary
    border2: 'var(--global-palette-orange-primary)', // #f7630c Global.Color.Orange.Primary
  },
  peach: {
    background1: 'var(--global-palette-peach-tint60)', // #fffaf5 Global.Color.Peach.Tint60
    background2: 'var(--global-palette-peach-tint40)', // #ffddb3 Global.Color.Peach.Tint40
    background3: 'var(--global-palette-peach-primary)', // #ff8c00 Global.Color.Peach.Primary
    foreground1: 'var(--global-palette-peach-shade10)', // #e67e00 Global.Color.Peach.Shade10
    foreground2: 'var(--global-palette-peach-shade30)', // #8f4e00 Global.Color.Peach.Shade30
    foreground3: 'var(--global-palette-peach-primary)', // #ff8c00 Global.Color.Peach.Primary
    borderActive: 'var(--global-palette-peach-primary)', // #ff8c00 Global.Color.Peach.Primary
    border2: 'var(--global-palette-peach-primary)', // #ff8c00 Global.Color.Peach.Primary
  },
  marigold: {
    background1: 'var(--global-palette-marigold-tint60)', // #fefbf4 Global.Color.Marigold.Tint60
    background2: 'var(--global-palette-marigold-tint40)', // #f9e2ae Global.Color.Marigold.Tint40
    background3: 'var(--global-palette-marigold-primary)', // #eaa300 Global.Color.Marigold.Primary
    foreground1: 'var(--global-palette-marigold-shade10)', // #d39300 Global.Color.Marigold.Shade10
    foreground2: 'var(--global-palette-marigold-shade30)', // #835b00 Global.Color.Marigold.Shade30
    foreground3: 'var(--global-palette-marigold-primary)', // #eaa300 Global.Color.Marigold.Primary
    borderActive: 'var(--global-palette-marigold-primary)', // #eaa300 Global.Color.Marigold.Primary
    border2: 'var(--global-palette-marigold-primary)', // #eaa300 Global.Color.Marigold.Primary
  },
  yellow: {
    background1: 'var(--global-palette-yellow-tint60)', // #fffef5 Global.Color.Yellow.Tint60
    background2: 'var(--global-palette-yellow-tint40)', // #fef7b2 Global.Color.Yellow.Tint40
    background3: 'var(--global-palette-yellow-primary)', // #fde300 Global.Color.Yellow.Primary
    foreground1: 'var(--global-palette-yellow-shade10)', // #e4cc00 Global.Color.Yellow.Shade10
    foreground2: 'var(--global-palette-yellow-shade30)', // #8e7f00 Global.Color.Yellow.Shade30
    foreground3: 'var(--global-palette-yellow-primary)', // #fde300 Global.Color.Yellow.Primary
    borderActive: 'var(--global-palette-yellow-primary)', // #fde300 Global.Color.Yellow.Primary
    border2: 'var(--global-palette-yellow-primary)', // #fde300 Global.Color.Yellow.Primary
  },
  gold: {
    background1: 'var(--global-palette-gold-tint60)', // #fdfbf2 Global.Color.Gold.Tint60
    background2: 'var(--global-palette-gold-tint40)', // #ecdfa5 Global.Color.Gold.Tint40
    background3: 'var(--global-palette-gold-primary)', // #c19c00 Global.Color.Gold.Primary
    foreground1: 'var(--global-palette-gold-shade10)', // #ae8c00 Global.Color.Gold.Shade10
    foreground2: 'var(--global-palette-gold-shade30)', // #6c5700 Global.Color.Gold.Shade30
    foreground3: 'var(--global-palette-gold-primary)', // #c19c00 Global.Color.Gold.Primary
    borderActive: 'var(--global-palette-gold-primary)', // #c19c00 Global.Color.Gold.Primary
    border2: 'var(--global-palette-gold-primary)', // #c19c00 Global.Color.Gold.Primary
  },
  brass: {
    background1: 'var(--global-palette-brass-tint60)', // #fbf8f2 Global.Color.Brass.Tint60
    background2: 'var(--global-palette-brass-tint40)', // #e0cea2 Global.Color.Brass.Tint40
    background3: 'var(--global-palette-brass-primary)', // #986f0b Global.Color.Brass.Primary
    foreground1: 'var(--global-palette-brass-shade10)', // #89640a Global.Color.Brass.Shade10
    foreground2: 'var(--global-palette-brass-shade30)', // #553e06 Global.Color.Brass.Shade30
    foreground3: 'var(--global-palette-brass-primary)', // #986f0b Global.Color.Brass.Primary
    borderActive: 'var(--global-palette-brass-primary)', // #986f0b Global.Color.Brass.Primary
    border2: 'var(--global-palette-brass-primary)', // #986f0b Global.Color.Brass.Primary
  },
  brown: {
    background1: 'var(--global-palette-brown-tint60)', // #faf7f4 Global.Color.Brown.Tint60
    background2: 'var(--global-palette-brown-tint40)', // #ddc3b0 Global.Color.Brown.Tint40
    background3: 'var(--global-palette-brown-primary)', // #8e562e Global.Color.Brown.Primary
    foreground1: 'var(--global-palette-brown-shade10)', // #804d29 Global.Color.Brown.Shade10
    foreground2: 'var(--global-palette-brown-shade30)', // #50301a Global.Color.Brown.Shade30
    foreground3: 'var(--global-palette-brown-primary)', // #8e562e Global.Color.Brown.Primary
    borderActive: 'var(--global-palette-brown-primary)', // #8e562e Global.Color.Brown.Primary
    border2: 'var(--global-palette-brown-primary)', // #8e562e Global.Color.Brown.Primary
  },
  darkBrown: {
    background1: 'var(--global-palette-darkBrown-tint60)', // #f8f3f2 Global.Color.DarkBrown.Tint60
    background2: 'var(--global-palette-darkBrown-tint40)', // #caada3 Global.Color.DarkBrown.Tint40
    background3: 'var(--global-palette-darkBrown-primary)', // #4d291c Global.Color.DarkBrown.Primary
    foreground1: 'var(--global-palette-darkBrown-shade10)', // #452519 Global.Color.DarkBrown.Shade10
    foreground2: 'var(--global-palette-darkBrown-shade30)', // #2b1710 Global.Color.DarkBrown.Shade30
    foreground3: 'var(--global-palette-darkBrown-primary)', // #4d291c Global.Color.DarkBrown.Primary
    borderActive: 'var(--global-palette-darkBrown-primary)', // #4d291c Global.Color.DarkBrown.Primary
    border2: 'var(--global-palette-darkBrown-primary)', // #4d291c Global.Color.DarkBrown.Primary
  },
  lime: {
    background1: 'var(--global-palette-lime-tint60)', // #f8fcf4 Global.Color.Lime.Tint60
    background2: 'var(--global-palette-lime-tint40)', // #cfe5af Global.Color.Lime.Tint40
    background3: 'var(--global-palette-lime-primary)', // #73aa24 Global.Color.Lime.Primary
    foreground1: 'var(--global-palette-lime-shade10)', // #689920 Global.Color.Lime.Shade10
    foreground2: 'var(--global-palette-lime-shade30)', // #405f14 Global.Color.Lime.Shade30
    foreground3: 'var(--global-palette-lime-primary)', // #73aa24 Global.Color.Lime.Primary
    borderActive: 'var(--global-palette-lime-primary)', // #73aa24 Global.Color.Lime.Primary
    border2: 'var(--global-palette-lime-primary)', // #73aa24 Global.Color.Lime.Primary
  },
  forest: {
    background1: 'var(--global-palette-forest-tint60)', // #f6faf0 Global.Color.Forest.Tint60
    background2: 'var(--global-palette-forest-tint40)', // #bdd99b Global.Color.Forest.Tint40
    background3: 'var(--global-palette-forest-primary)', // #498205 Global.Color.Forest.Primary
    foreground1: 'var(--global-palette-forest-shade10)', // #427505 Global.Color.Forest.Shade10
    foreground2: 'var(--global-palette-forest-shade30)', // #294903 Global.Color.Forest.Shade30
    foreground3: 'var(--global-palette-forest-primary)', // #498205 Global.Color.Forest.Primary
    borderActive: 'var(--global-palette-forest-primary)', // #498205 Global.Color.Forest.Primary
    border2: 'var(--global-palette-forest-primary)', // #498205 Global.Color.Forest.Primary
  },
  seafoam: {
    background1: 'var(--global-palette-seafoam-tint60)', // #f3fdf8 Global.Color.Seafoam.Tint60
    background2: 'var(--global-palette-seafoam-tint40)', // #a8f0cd Global.Color.Seafoam.Tint40
    background3: 'var(--global-palette-seafoam-primary)', // #00cc6a Global.Color.Seafoam.Primary
    foreground1: 'var(--global-palette-seafoam-shade10)', // #00b85f Global.Color.Seafoam.Shade10
    foreground2: 'var(--global-palette-seafoam-shade30)', // #00723b Global.Color.Seafoam.Shade30
    foreground3: 'var(--global-palette-seafoam-primary)', // #00cc6a Global.Color.Seafoam.Primary
    borderActive: 'var(--global-palette-seafoam-primary)', // #00cc6a Global.Color.Seafoam.Primary
    border2: 'var(--global-palette-seafoam-primary)', // #00cc6a Global.Color.Seafoam.Primary
  },
  lightGreen: {
    background1: 'var(--global-palette-lightGreen-tint60)', // #f2fbf2 Global.Color.LightGreen.Tint60
    background2: 'var(--global-palette-lightGreen-tint40)', // #a7e3a5 Global.Color.LightGreen.Tint40
    background3: 'var(--global-palette-lightGreen-primary)', // #13a10e Global.Color.LightGreen.Primary
    foreground1: 'var(--global-palette-lightGreen-shade10)', // #11910d Global.Color.LightGreen.Shade10
    foreground2: 'var(--global-palette-lightGreen-shade30)', // #0b5a08 Global.Color.LightGreen.Shade30
    foreground3: 'var(--global-palette-lightGreen-primary)', // #13a10e Global.Color.LightGreen.Primary
    borderActive: 'var(--global-palette-lightGreen-primary)', // #13a10e Global.Color.LightGreen.Primary
    border2: 'var(--global-palette-lightGreen-primary)', // #13a10e Global.Color.LightGreen.Primary
  },
  green: {
    background1: 'var(--global-palette-green-tint60)', // #f1faf1 Global.Color.Green.Tint60
    background2: 'var(--global-palette-green-tint40)', // #9fd89f Global.Color.Green.Tint40
    background3: 'var(--global-palette-green-primary)', // #107c10 Global.Color.Green.Primary
    foreground1: 'var(--global-palette-green-shade10)', // #0e700e Global.Color.Green.Shade10
    foreground2: 'var(--global-palette-green-shade30)', // #094509 Global.Color.Green.Shade30
    foreground3: 'var(--global-palette-green-primary)', // #107c10 Global.Color.Green.Primary
    borderActive: 'var(--global-palette-green-primary)', // #107c10 Global.Color.Green.Primary
    border2: 'var(--global-palette-green-primary)', // #107c10 Global.Color.Green.Primary
  },
  darkGreen: {
    background1: 'var(--global-palette-darkGreen-tint60)', // #f0f9f0 Global.Color.DarkGreen.Tint60
    background2: 'var(--global-palette-darkGreen-tint40)', // #9ad29a Global.Color.DarkGreen.Tint40
    background3: 'var(--global-palette-darkGreen-primary)', // #0b6a0b Global.Color.DarkGreen.Primary
    foreground1: 'var(--global-palette-darkGreen-shade10)', // #0a5f0a Global.Color.DarkGreen.Shade10
    foreground2: 'var(--global-palette-darkGreen-shade30)', // #063b06 Global.Color.DarkGreen.Shade30
    foreground3: 'var(--global-palette-darkGreen-primary)', // #0b6a0b Global.Color.DarkGreen.Primary
    borderActive: 'var(--global-palette-darkGreen-primary)', // #0b6a0b Global.Color.DarkGreen.Primary
    border2: 'var(--global-palette-darkGreen-primary)', // #0b6a0b Global.Color.DarkGreen.Primary
  },
  lightTeal: {
    background1: 'var(--global-palette-lightTeal-tint60)', // #f2fcfd Global.Color.LightTeal.Tint60
    background2: 'var(--global-palette-lightTeal-tint40)', // #a6e9ed Global.Color.LightTeal.Tint40
    background3: 'var(--global-palette-lightTeal-primary)', // #00b7c3 Global.Color.LightTeal.Primary
    foreground1: 'var(--global-palette-lightTeal-shade10)', // #00a5af Global.Color.LightTeal.Shade10
    foreground2: 'var(--global-palette-lightTeal-shade30)', // #00666d Global.Color.LightTeal.Shade30
    foreground3: 'var(--global-palette-lightTeal-primary)', // #00b7c3 Global.Color.LightTeal.Primary
    borderActive: 'var(--global-palette-lightTeal-primary)', // #00b7c3 Global.Color.LightTeal.Primary
    border2: 'var(--global-palette-lightTeal-primary)', // #00b7c3 Global.Color.LightTeal.Primary
  },
  teal: {
    background1: 'var(--global-palette-teal-tint60)', // #f0fafa Global.Color.Teal.Tint60
    background2: 'var(--global-palette-teal-tint40)', // #9bd9db Global.Color.Teal.Tint40
    background3: 'var(--global-palette-teal-primary)', // #038387 Global.Color.Teal.Primary
    foreground1: 'var(--global-palette-teal-shade10)', // #037679 Global.Color.Teal.Shade10
    foreground2: 'var(--global-palette-teal-shade30)', // #02494c Global.Color.Teal.Shade30
    foreground3: 'var(--global-palette-teal-primary)', // #038387 Global.Color.Teal.Primary
    borderActive: 'var(--global-palette-teal-primary)', // #038387 Global.Color.Teal.Primary
    border2: 'var(--global-palette-teal-primary)', // #038387 Global.Color.Teal.Primary
  },
  darkTeal: {
    background1: 'var(--global-palette-darkTeal-tint60)', // #eff9f9 Global.Color.DarkTeal.Tint60
    background2: 'var(--global-palette-darkTeal-tint40)', // #92d1d1 Global.Color.DarkTeal.Tint40
    background3: 'var(--global-palette-darkTeal-primary)', // #006666 Global.Color.DarkTeal.Primary
    foreground1: 'var(--global-palette-darkTeal-shade10)', // #005c5c Global.Color.DarkTeal.Shade10
    foreground2: 'var(--global-palette-darkTeal-shade30)', // #003939 Global.Color.DarkTeal.Shade30
    foreground3: 'var(--global-palette-darkTeal-primary)', // #006666 Global.Color.DarkTeal.Primary
    borderActive: 'var(--global-palette-darkTeal-primary)', // #006666 Global.Color.DarkTeal.Primary
    border2: 'var(--global-palette-darkTeal-primary)', // #006666 Global.Color.DarkTeal.Primary
  },
  cyan: {
    background1: 'var(--global-palette-cyan-tint60)', // #f2fafc Global.Color.Cyan.Tint60
    background2: 'var(--global-palette-cyan-tint40)', // #a4deeb Global.Color.Cyan.Tint40
    background3: 'var(--global-palette-cyan-primary)', // #0099bc Global.Color.Cyan.Primary
    foreground1: 'var(--global-palette-cyan-shade10)', // #008aa9 Global.Color.Cyan.Shade10
    foreground2: 'var(--global-palette-cyan-shade30)', // #005669 Global.Color.Cyan.Shade30
    foreground3: 'var(--global-palette-cyan-primary)', // #0099bc Global.Color.Cyan.Primary
    borderActive: 'var(--global-palette-cyan-primary)', // #0099bc Global.Color.Cyan.Primary
    border2: 'var(--global-palette-cyan-primary)', // #0099bc Global.Color.Cyan.Primary
  },
  steel: {
    background1: 'var(--global-palette-steel-tint60)', // #eff7f9 Global.Color.Steel.Tint60
    background2: 'var(--global-palette-steel-tint40)', // #94c8d4 Global.Color.Steel.Tint40
    background3: 'var(--global-palette-steel-primary)', // #005b70 Global.Color.Steel.Primary
    foreground1: 'var(--global-palette-steel-shade10)', // #005265 Global.Color.Steel.Shade10
    foreground2: 'var(--global-palette-steel-shade30)', // #00333f Global.Color.Steel.Shade30
    foreground3: 'var(--global-palette-steel-primary)', // #005b70 Global.Color.Steel.Primary
    borderActive: 'var(--global-palette-steel-primary)', // #005b70 Global.Color.Steel.Primary
    border2: 'var(--global-palette-steel-primary)', // #005b70 Global.Color.Steel.Primary
  },
  lightBlue: {
    background1: 'var(--global-palette-lightBlue-tint60)', // #f6fafe Global.Color.LightBlue.Tint60
    background2: 'var(--global-palette-lightBlue-tint40)', // #bfddf5 Global.Color.LightBlue.Tint40
    background3: 'var(--global-palette-lightBlue-primary)', // #3a96dd Global.Color.LightBlue.Primary
    foreground1: 'var(--global-palette-lightBlue-shade10)', // #3487c7 Global.Color.LightBlue.Shade10
    foreground2: 'var(--global-palette-lightBlue-shade30)', // #20547c Global.Color.LightBlue.Shade30
    foreground3: 'var(--global-palette-lightBlue-primary)', // #3a96dd Global.Color.LightBlue.Primary
    borderActive: 'var(--global-palette-lightBlue-primary)', // #3a96dd Global.Color.LightBlue.Primary
    border2: 'var(--global-palette-lightBlue-primary)', // #3a96dd Global.Color.LightBlue.Primary
  },
  blue: {
    background1: 'var(--global-palette-blue-tint60)', // #f3f9fd Global.Color.Blue.Tint60
    background2: 'var(--global-palette-blue-tint40)', // #a9d3f2 Global.Color.Blue.Tint40
    background3: 'var(--global-palette-blue-primary)', // #0078d4 Global.Color.Blue.Primary
    foreground1: 'var(--global-palette-blue-shade10)', // #006cbf Global.Color.Blue.Shade10
    foreground2: 'var(--global-palette-blue-shade30)', // #004377 Global.Color.Blue.Shade30
    foreground3: 'var(--global-palette-blue-primary)', // #0078d4 Global.Color.Blue.Primary
    borderActive: 'var(--global-palette-blue-primary)', // #0078d4 Global.Color.Blue.Primary
    border2: 'var(--global-palette-blue-primary)', // #0078d4 Global.Color.Blue.Primary
  },
  royalBlue: {
    background1: 'var(--global-palette-royalBlue-tint60)', // #f0f6fa Global.Color.RoyalBlue.Tint60
    background2: 'var(--global-palette-royalBlue-tint40)', // #9abfdc Global.Color.RoyalBlue.Tint40
    background3: 'var(--global-palette-royalBlue-primary)', // #004e8c Global.Color.RoyalBlue.Primary
    foreground1: 'var(--global-palette-royalBlue-shade10)', // #00467e Global.Color.RoyalBlue.Shade10
    foreground2: 'var(--global-palette-royalBlue-shade30)', // #002c4e Global.Color.RoyalBlue.Shade30
    foreground3: 'var(--global-palette-royalBlue-primary)', // #004e8c Global.Color.RoyalBlue.Primary
    borderActive: 'var(--global-palette-royalBlue-primary)', // #004e8c Global.Color.RoyalBlue.Primary
    border2: 'var(--global-palette-royalBlue-primary)', // #004e8c Global.Color.RoyalBlue.Primary
  },
  darkBlue: {
    background1: 'var(--global-palette-darkBlue-tint60)', // #eff4f9 Global.Color.DarkBlue.Tint60
    background2: 'var(--global-palette-darkBlue-tint40)', // #92b5d1 Global.Color.DarkBlue.Tint40
    background3: 'var(--global-palette-darkBlue-primary)', // #003966 Global.Color.DarkBlue.Primary
    foreground1: 'var(--global-palette-darkBlue-shade10)', // #00335c Global.Color.DarkBlue.Shade10
    foreground2: 'var(--global-palette-darkBlue-shade30)', // #002039 Global.Color.DarkBlue.Shade30
    foreground3: 'var(--global-palette-darkBlue-primary)', // #003966 Global.Color.DarkBlue.Primary
    borderActive: 'var(--global-palette-darkBlue-primary)', // #003966 Global.Color.DarkBlue.Primary
    border2: 'var(--global-palette-darkBlue-primary)', // #003966 Global.Color.DarkBlue.Primary
  },
  cornflower: {
    background1: 'var(--global-palette-cornflower-tint60)', // #f7f9fe Global.Color.Cornflower.Tint60
    background2: 'var(--global-palette-cornflower-tint40)', // #c8d1fa Global.Color.Cornflower.Tint40
    background3: 'var(--global-palette-cornflower-primary)', // #4f6bed Global.Color.Cornflower.Primary
    foreground1: 'var(--global-palette-cornflower-shade10)', // #4760d5 Global.Color.Cornflower.Shade10
    foreground2: 'var(--global-palette-cornflower-shade30)', // #2c3c85 Global.Color.Cornflower.Shade30
    foreground3: 'var(--global-palette-cornflower-primary)', // #4f6bed Global.Color.Cornflower.Primary
    borderActive: 'var(--global-palette-cornflower-primary)', // #4f6bed Global.Color.Cornflower.Primary
    border2: 'var(--global-palette-cornflower-primary)', // #4f6bed Global.Color.Cornflower.Primary
  },
  navy: {
    background1: 'var(--global-palette-navy-tint60)', // #f2f4fc Global.Color.Navy.Tint60
    background2: 'var(--global-palette-navy-tint40)', // #a3b2e8 Global.Color.Navy.Tint40
    background3: 'var(--global-palette-navy-primary)', // #0027b4 Global.Color.Navy.Primary
    foreground1: 'var(--global-palette-navy-shade10)', // #0023a2 Global.Color.Navy.Shade10
    foreground2: 'var(--global-palette-navy-shade30)', // #001665 Global.Color.Navy.Shade30
    foreground3: 'var(--global-palette-navy-primary)', // #0027b4 Global.Color.Navy.Primary
    borderActive: 'var(--global-palette-navy-primary)', // #0027b4 Global.Color.Navy.Primary
    border2: 'var(--global-palette-navy-primary)', // #0027b4 Global.Color.Navy.Primary
  },
  lavender: {
    background1: 'var(--global-palette-lavender-tint60)', // #f9f8fe Global.Color.Lavender.Tint60
    background2: 'var(--global-palette-lavender-tint40)', // #d2ccf8 Global.Color.Lavender.Tint40
    background3: 'var(--global-palette-lavender-primary)', // #7160e8 Global.Color.Lavender.Primary
    foreground1: 'var(--global-palette-lavender-shade10)', // #6656d1 Global.Color.Lavender.Shade10
    foreground2: 'var(--global-palette-lavender-shade30)', // #3f3682 Global.Color.Lavender.Shade30
    foreground3: 'var(--global-palette-lavender-primary)', // #7160e8 Global.Color.Lavender.Primary
    borderActive: 'var(--global-palette-lavender-primary)', // #7160e8 Global.Color.Lavender.Primary
    border2: 'var(--global-palette-lavender-primary)', // #7160e8 Global.Color.Lavender.Primary
  },
  purple: {
    background1: 'var(--global-palette-purple-tint60)', // #f7f4fb Global.Color.Purple.Tint60
    background2: 'var(--global-palette-purple-tint40)', // #c6b1de Global.Color.Purple.Tint40
    background3: 'var(--global-palette-purple-primary)', // #5c2e91 Global.Color.Purple.Primary
    foreground1: 'var(--global-palette-purple-shade10)', // #532982 Global.Color.Purple.Shade10
    foreground2: 'var(--global-palette-purple-shade30)', // #341a51 Global.Color.Purple.Shade30
    foreground3: 'var(--global-palette-purple-primary)', // #5c2e91 Global.Color.Purple.Primary
    borderActive: 'var(--global-palette-purple-primary)', // #5c2e91 Global.Color.Purple.Primary
    border2: 'var(--global-palette-purple-primary)', // #5c2e91 Global.Color.Purple.Primary
  },
  darkPurple: {
    background1: 'var(--global-palette-darkPurple-tint60)', // #f5f2f9 Global.Color.DarkPurple.Tint60
    background2: 'var(--global-palette-darkPurple-tint40)', // #b9a3d3 Global.Color.DarkPurple.Tint40
    background3: 'var(--global-palette-darkPurple-primary)', // #401b6c Global.Color.DarkPurple.Primary
    foreground1: 'var(--global-palette-darkPurple-shade10)', // #3a1861 Global.Color.DarkPurple.Shade10
    foreground2: 'var(--global-palette-darkPurple-shade30)', // #240f3c Global.Color.DarkPurple.Shade30
    foreground3: 'var(--global-palette-darkPurple-primary)', // #401b6c Global.Color.DarkPurple.Primary
    borderActive: 'var(--global-palette-darkPurple-primary)', // #401b6c Global.Color.DarkPurple.Primary
    border2: 'var(--global-palette-darkPurple-primary)', // #401b6c Global.Color.DarkPurple.Primary
  },
  orchid: {
    background1: 'var(--global-palette-orchid-tint60)', // #f9f8fc Global.Color.Orchid.Tint60
    background2: 'var(--global-palette-orchid-tint40)', // #d7caea Global.Color.Orchid.Tint40
    background3: 'var(--global-palette-orchid-primary)', // #8764b8 Global.Color.Orchid.Primary
    foreground1: 'var(--global-palette-orchid-shade10)', // #795aa6 Global.Color.Orchid.Shade10
    foreground2: 'var(--global-palette-orchid-shade30)', // #4c3867 Global.Color.Orchid.Shade30
    foreground3: 'var(--global-palette-orchid-primary)', // #8764b8 Global.Color.Orchid.Primary
    borderActive: 'var(--global-palette-orchid-primary)', // #8764b8 Global.Color.Orchid.Primary
    border2: 'var(--global-palette-orchid-primary)', // #8764b8 Global.Color.Orchid.Primary
  },
  grape: {
    background1: 'var(--global-palette-grape-tint60)', // #faf2fb Global.Color.Grape.Tint60
    background2: 'var(--global-palette-grape-tint40)', // #d9a7e0 Global.Color.Grape.Tint40
    background3: 'var(--global-palette-grape-primary)', // #881798 Global.Color.Grape.Primary
    foreground1: 'var(--global-palette-grape-shade10)', // #7a1589 Global.Color.Grape.Shade10
    foreground2: 'var(--global-palette-grape-shade30)', // #4c0d55 Global.Color.Grape.Shade30
    foreground3: 'var(--global-palette-grape-primary)', // #881798 Global.Color.Grape.Primary
    borderActive: 'var(--global-palette-grape-primary)', // #881798 Global.Color.Grape.Primary
    border2: 'var(--global-palette-grape-primary)', // #881798 Global.Color.Grape.Primary
  },
  berry: {
    background1: 'var(--global-palette-berry-tint60)', // #fdf5fc Global.Color.Berry.Tint60
    background2: 'var(--global-palette-berry-tint40)', // #edbbe7 Global.Color.Berry.Tint40
    background3: 'var(--global-palette-berry-primary)', // #c239b3 Global.Color.Berry.Primary
    foreground1: 'var(--global-palette-berry-shade10)', // #af33a1 Global.Color.Berry.Shade10
    foreground2: 'var(--global-palette-berry-shade30)', // #6d2064 Global.Color.Berry.Shade30
    foreground3: 'var(--global-palette-berry-primary)', // #c239b3 Global.Color.Berry.Primary
    borderActive: 'var(--global-palette-berry-primary)', // #c239b3 Global.Color.Berry.Primary
    border2: 'var(--global-palette-berry-primary)', // #c239b3 Global.Color.Berry.Primary
  },
  lilac: {
    background1: 'var(--global-palette-lilac-tint60)', // #fcf6fd Global.Color.Lilac.Tint60
    background2: 'var(--global-palette-lilac-tint40)', // #e6bfed Global.Color.Lilac.Tint40
    background3: 'var(--global-palette-lilac-primary)', // #b146c2 Global.Color.Lilac.Primary
    foreground1: 'var(--global-palette-lilac-shade10)', // #9f3faf Global.Color.Lilac.Shade10
    foreground2: 'var(--global-palette-lilac-shade30)', // #63276d Global.Color.Lilac.Shade30
    foreground3: 'var(--global-palette-lilac-primary)', // #b146c2 Global.Color.Lilac.Primary
    borderActive: 'var(--global-palette-lilac-primary)', // #b146c2 Global.Color.Lilac.Primary
    border2: 'var(--global-palette-lilac-primary)', // #b146c2 Global.Color.Lilac.Primary
  },
  pink: {
    background1: 'var(--global-palette-pink-tint60)', // #fef6fb Global.Color.Pink.Tint60
    background2: 'var(--global-palette-pink-tint40)', // #f7c0e3 Global.Color.Pink.Tint40
    background3: 'var(--global-palette-pink-primary)', // #e43ba6 Global.Color.Pink.Primary
    foreground1: 'var(--global-palette-pink-shade10)', // #cd3595 Global.Color.Pink.Shade10
    foreground2: 'var(--global-palette-pink-shade30)', // #80215d Global.Color.Pink.Shade30
    foreground3: 'var(--global-palette-pink-primary)', // #e43ba6 Global.Color.Pink.Primary
    borderActive: 'var(--global-palette-pink-primary)', // #e43ba6 Global.Color.Pink.Primary
    border2: 'var(--global-palette-pink-primary)', // #e43ba6 Global.Color.Pink.Primary
  },
  hotPink: {
    background1: 'var(--global-palette-hotPink-tint60)', // #fef4fa Global.Color.HotPink.Tint60
    background2: 'var(--global-palette-hotPink-tint40)', // #f7adda Global.Color.HotPink.Tint40
    background3: 'var(--global-palette-hotPink-primary)', // #e3008c Global.Color.HotPink.Primary
    foreground1: 'var(--global-palette-hotPink-shade10)', // #cc007e Global.Color.HotPink.Shade10
    foreground2: 'var(--global-palette-hotPink-shade30)', // #7f004e Global.Color.HotPink.Shade30
    foreground3: 'var(--global-palette-hotPink-primary)', // #e3008c Global.Color.HotPink.Primary
    borderActive: 'var(--global-palette-hotPink-primary)', // #e3008c Global.Color.HotPink.Primary
    border2: 'var(--global-palette-hotPink-primary)', // #e3008c Global.Color.HotPink.Primary
  },
  magenta: {
    background1: 'var(--global-palette-magenta-tint60)', // #fcf2f9 Global.Color.Magenta.Tint60
    background2: 'var(--global-palette-magenta-tint40)', // #eca5d1 Global.Color.Magenta.Tint40
    background3: 'var(--global-palette-magenta-primary)', // #bf0077 Global.Color.Magenta.Primary
    foreground1: 'var(--global-palette-magenta-shade10)', // #ac006b Global.Color.Magenta.Shade10
    foreground2: 'var(--global-palette-magenta-shade30)', // #6b0043 Global.Color.Magenta.Shade30
    foreground3: 'var(--global-palette-magenta-primary)', // #bf0077 Global.Color.Magenta.Primary
    borderActive: 'var(--global-palette-magenta-primary)', // #bf0077 Global.Color.Magenta.Primary
    border2: 'var(--global-palette-magenta-primary)', // #bf0077 Global.Color.Magenta.Primary
  },
  plum: {
    background1: 'var(--global-palette-plum-tint60)', // #faf0f6 Global.Color.Plum.Tint60
    background2: 'var(--global-palette-plum-tint40)', // #d696c0 Global.Color.Plum.Tint40
    background3: 'var(--global-palette-plum-primary)', // #77004d Global.Color.Plum.Primary
    foreground1: 'var(--global-palette-plum-shade10)', // #6b0045 Global.Color.Plum.Shade10
    foreground2: 'var(--global-palette-plum-shade30)', // #43002b Global.Color.Plum.Shade30
    foreground3: 'var(--global-palette-plum-primary)', // #77004d Global.Color.Plum.Primary
    borderActive: 'var(--global-palette-plum-primary)', // #77004d Global.Color.Plum.Primary
    border2: 'var(--global-palette-plum-primary)', // #77004d Global.Color.Plum.Primary
  },
  beige: {
    background1: 'var(--global-palette-beige-tint60)', // #faf9f9 Global.Color.Beige.Tint60
    background2: 'var(--global-palette-beige-tint40)', // #d7d4d4 Global.Color.Beige.Tint40
    background3: 'var(--global-palette-beige-primary)', // #7a7574 Global.Color.Beige.Primary
    foreground1: 'var(--global-palette-beige-shade10)', // #6e6968 Global.Color.Beige.Shade10
    foreground2: 'var(--global-palette-beige-shade30)', // #444241 Global.Color.Beige.Shade30
    foreground3: 'var(--global-palette-beige-primary)', // #7a7574 Global.Color.Beige.Primary
    borderActive: 'var(--global-palette-beige-primary)', // #7a7574 Global.Color.Beige.Primary
    border2: 'var(--global-palette-beige-primary)', // #7a7574 Global.Color.Beige.Primary
  },
  mink: {
    background1: 'var(--global-palette-mink-tint60)', // #f8f8f8 Global.Color.Mink.Tint60
    background2: 'var(--global-palette-mink-tint40)', // #cecccb Global.Color.Mink.Tint40
    background3: 'var(--global-palette-mink-primary)', // #5d5a58 Global.Color.Mink.Primary
    foreground1: 'var(--global-palette-mink-shade10)', // #54514f Global.Color.Mink.Shade10
    foreground2: 'var(--global-palette-mink-shade30)', // #343231 Global.Color.Mink.Shade30
    foreground3: 'var(--global-palette-mink-primary)', // #5d5a58 Global.Color.Mink.Primary
    borderActive: 'var(--global-palette-mink-primary)', // #5d5a58 Global.Color.Mink.Primary
    border2: 'var(--global-palette-mink-primary)', // #5d5a58 Global.Color.Mink.Primary
  },
  silver: {
    background1: 'var(--global-palette-silver-tint60)', // #fafbfb Global.Color.Silver.Tint60
    background2: 'var(--global-palette-silver-tint40)', // #d8dfe0 Global.Color.Silver.Tint40
    background3: 'var(--global-palette-silver-primary)', // #859599 Global.Color.Silver.Primary
    foreground1: 'var(--global-palette-silver-shade10)', // #78868a Global.Color.Silver.Shade10
    foreground2: 'var(--global-palette-silver-shade30)', // #4a5356 Global.Color.Silver.Shade30
    foreground3: 'var(--global-palette-silver-primary)', // #859599 Global.Color.Silver.Primary
    borderActive: 'var(--global-palette-silver-primary)', // #859599 Global.Color.Silver.Primary
    border2: 'var(--global-palette-silver-primary)', // #859599 Global.Color.Silver.Primary
  },
  platinum: {
    background1: 'var(--global-palette-platinum-tint60)', // #f8f9fa Global.Color.Platinum.Tint60
    background2: 'var(--global-palette-platinum-tint40)', // #cdd6d8 Global.Color.Platinum.Tint40
    background3: 'var(--global-palette-platinum-primary)', // #69797e Global.Color.Platinum.Primary
    foreground1: 'var(--global-palette-platinum-shade10)', // #5f6d71 Global.Color.Platinum.Shade10
    foreground2: 'var(--global-palette-platinum-shade30)', // #3b4447 Global.Color.Platinum.Shade30
    foreground3: 'var(--global-palette-platinum-primary)', // #69797e Global.Color.Platinum.Primary
    borderActive: 'var(--global-palette-platinum-primary)', // #69797e Global.Color.Platinum.Primary
    border2: 'var(--global-palette-platinum-primary)', // #69797e Global.Color.Platinum.Primary
  },
  anchor: {
    background1: 'var(--global-palette-anchor-tint60)', // #f6f7f8 Global.Color.Anchor.Tint60
    background2: 'var(--global-palette-anchor-tint40)', // #bcc3c7 Global.Color.Anchor.Tint40
    background3: 'var(--global-palette-anchor-primary)', // #394146 Global.Color.Anchor.Primary
    foreground1: 'var(--global-palette-anchor-shade10)', // #333a3f Global.Color.Anchor.Shade10
    foreground2: 'var(--global-palette-anchor-shade30)', // #202427 Global.Color.Anchor.Shade30
    foreground3: 'var(--global-palette-anchor-primary)', // #394146 Global.Color.Anchor.Primary
    borderActive: 'var(--global-palette-anchor-primary)', // #394146 Global.Color.Anchor.Primary
    border2: 'var(--global-palette-anchor-primary)', // #394146 Global.Color.Anchor.Primary
  },
  charcoal: {
    background1: 'var(--global-palette-charcoal-tint60)', // #f9f0f2 Global.Color.Charcoal.Tint60
    background2: 'var(--global-palette-charcoal-tint40)', // #d69ca5 Global.Color.Charcoal.Tint40
    background3: 'var(--global-palette-charcoal-primary)', // #750b1c Global.Color.Charcoal.Primary
    foreground1: 'var(--global-palette-charcoal-shade10)', // #690a19 Global.Color.Charcoal.Shade10
    foreground2: 'var(--global-palette-charcoal-shade30)', // #420610 Global.Color.Charcoal.Shade30
    foreground3: 'var(--global-palette-charcoal-primary)', // #750b1c Global.Color.Charcoal.Primary
    borderActive: 'var(--global-palette-charcoal-primary)', // #750b1c Global.Color.Charcoal.Primary
    border2: 'var(--global-palette-charcoal-primary)', // #750b1c Global.Color.Charcoal.Primary
  },
};
