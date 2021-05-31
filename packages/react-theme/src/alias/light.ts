import { GlobalSharedColors, NeutralColorTokens, SharedColorTokens } from '../types';

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
