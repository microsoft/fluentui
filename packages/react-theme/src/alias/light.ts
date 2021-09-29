import type { GlobalSharedColors, NeutralColorTokens, SharedColorTokens, Theme } from '../types';

export const generateNeutralColorTokens: (global: Theme['global']) => NeutralColorTokens = global => ({
  neutralForeground1: global.palette.grey[14], // global.palette.grey[14], // #242424 Global.Color.Grey.14
  neutralForeground2: global.palette.grey[26], // #424242 Global.Color.Grey.26
  neutralForeground2Hover: global.palette.grey[14], // #242424 Global.Color.Grey.14
  neutralForeground2Pressed: global.palette.grey[14], // #242424 Global.Color.Grey.14
  neutralForeground2Selected: global.palette.grey[14], // #242424 Global.Color.Grey.14
  neutralForeground2BrandHover: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  neutralForeground2BrandPressed: global.palette.brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  neutralForeground2BrandSelected: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  neutralForeground3: global.palette.grey[38], // #616161 Global.Color.Grey.38
  neutralForeground3Hover: global.palette.grey[26], // #424242 Global.Color.Grey.26
  neutralForeground3Pressed: global.palette.grey[26], // #424242 Global.Color.Grey.26
  neutralForeground3Selected: global.palette.grey[26], // #424242 Global.Color.Grey.26
  neutralForeground3BrandHover: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  neutralForeground3BrandPressed: global.palette.brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  neutralForeground3BrandSelected: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  neutralForeground4: global.palette.grey[44], // #707070 Global.Color.Grey.44
  neutralForegroundDisabled: global.palette.grey[74], // #bdbdbd Global.Color.Grey.74
  brandForegroundLink: global.palette.brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  brandForegroundLinkHover: global.palette.brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  brandForegroundLinkPressed: global.palette.brand.shade40, // #004578 Global.Color.Brand.Shade.40
  brandForegroundLinkSelected: global.palette.brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  compoundBrandForeground1: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  compoundBrandForeground1Hover: global.palette.brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  compoundBrandForeground1Pressed: global.palette.brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  brandForeground1: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  brandForeground2: global.palette.brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  neutralForegroundInverted: global.color.white, // #ffffff Global.Color.White
  neutralForegroundOnBrand: global.color.white, // #ffffff Global.Color.White
  neutralForegroundInvertedLink: global.color.white, // #ffffff Global.Color.White
  neutralForegroundInvertedLinkHover: global.color.white, // #ffffff Global.Color.White
  neutralForegroundInvertedLinkPressed: global.color.white, // #ffffff Global.Color.White
  neutralForegroundInvertedLinkSelected: global.color.white, // #ffffff Global.Color.White
  neutralBackground1: global.color.white, // #ffffff Global.Color.White
  neutralBackground1Hover: global.palette.grey[96], // #f5f5f5 Global.Color.Grey.96
  neutralBackground1Pressed: global.palette.grey[88], // #e0e0e0 Global.Color.Grey.88
  neutralBackground1Selected: global.palette.grey[92], // #ebebeb Global.Color.Grey.92
  neutralBackground2: global.palette.grey[98], // #fafafa Global.Color.Grey.98
  neutralBackground2Hover: global.palette.grey[94], // #f0f0f0 Global.Color.Grey.94
  neutralBackground2Pressed: global.palette.grey[86], // #dbdbdb Global.Color.Grey.86
  neutralBackground2Selected: global.palette.grey[90], // #e6e6e6 Global.Color.Grey.90
  neutralBackground3: global.palette.grey[96], // #f5f5f5 Global.Color.Grey.96
  neutralBackground3Hover: global.palette.grey[92], // #ebebeb Global.Color.Grey.92
  neutralBackground3Pressed: global.palette.grey[84], // #d6d6d6 Global.Color.Grey.84
  neutralBackground3Selected: global.palette.grey[88], // #e0e0e0 Global.Color.Grey.88
  neutralBackground4: global.palette.grey[94], // #f0f0f0 Global.Color.Grey.94
  neutralBackground4Hover: global.palette.grey[98], // #fafafa Global.Color.Grey.98
  neutralBackground4Pressed: global.palette.grey[96], // #f5f5f5 Global.Color.Grey.96
  neutralBackground4Selected: global.color.white, // #ffffff Global.Color.White
  neutralBackground5: global.palette.grey[92], // #ebebeb Global.Color.Grey.92
  neutralBackground5Hover: global.palette.grey[96], // #f5f5f5 Global.Color.Grey.96
  neutralBackground5Pressed: global.palette.grey[94], // #f0f0f0 Global.Color.Grey.94
  neutralBackground5Selected: global.palette.grey[98], // #fafafa Global.Color.Grey.98
  neutralBackground6: global.palette.grey[90], // #e6e6e6 Global.Color.Grey.90
  neutralBackgroundInverted: global.palette.grey[38], // #616161 Global.Color.Grey.38
  subtleBackground: 'transparent', // transparent undefined
  subtleBackgroundHover: global.palette.grey[96], // #f5f5f5 Global.Color.Grey.96
  subtleBackgroundPressed: global.palette.grey[88], // #e0e0e0 Global.Color.Grey.88
  subtleBackgroundSelected: global.palette.grey[92], // #ebebeb Global.Color.Grey.92
  transparentBackground: 'transparent', // transparent undefined
  transparentBackgroundHover: 'transparent', // transparent undefined
  transparentBackgroundPressed: 'transparent', // transparent undefined
  transparentBackgroundSelected: 'transparent', // transparent undefined
  neutralBackgroundDisabled: global.palette.grey[94], // #f0f0f0 Global.Color.Grey.94
  neutralStencil1: global.palette.grey[90], // #e6e6e6 Global.Color.Grey.90
  neutralStencil2: global.palette.grey[98], // #fafafa Global.Color.Grey.98
  brandBackground: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  brandBackgroundHover: global.palette.brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  brandBackgroundPressed: global.palette.brand.shade40, // #004578 Global.Color.Brand.Shade.40
  brandBackgroundSelected: global.palette.brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  compoundBrandBackground: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  compoundBrandBackgroundHover: global.palette.brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  compoundBrandBackgroundPressed: global.palette.brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  brandBackgroundStatic: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  brandBackground2: global.palette.brand.tint60, // #eff6fc Global.Color.Brand.Tint.60
  neutralStrokeAccessible: global.palette.grey[38], // #616161 Global.Color.Grey.38
  neutralStrokeAccessibleHover: global.palette.grey[34], // #575757 Global.Color.Grey.34
  neutralStrokeAccessiblePressed: global.palette.grey[30], // #4d4d4d Global.Color.Grey.30
  neutralStrokeAccessibleSelected: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  neutralStroke1: global.palette.grey[82], // #d1d1d1 Global.Color.Grey.82
  neutralStroke1Hover: global.palette.grey[78], // #c7c7c7 Global.Color.Grey.78
  neutralStroke1Pressed: global.palette.grey[70], // #b3b3b3 Global.Color.Grey.70
  neutralStroke1Selected: global.palette.grey[74], // #bdbdbd Global.Color.Grey.74
  neutralStroke2: global.palette.grey[88], // #e0e0e0 Global.Color.Grey.88
  neutralStroke3: global.palette.grey[94], // #f0f0f0 Global.Color.Grey.94
  brandStroke1: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  brandStroke2: global.palette.brand.tint40, // #c7e0f4 Global.Color.Brand.Tint.40
  compoundBrandStroke: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  compoundBrandStrokeHover: global.palette.brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  compoundBrandStrokePressed: global.palette.brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  neutralStrokeDisabled: global.palette.grey[88], // #e0e0e0 Global.Color.Grey.88
  transparentStroke: 'transparent', // transparent undefined
  transparentStrokeInteractive: 'transparent', // transparent undefined
  transparentStrokeDisabled: 'transparent', // transparent undefined
  strokeFocus1: global.color.white, // #ffffff Global.Color.White
  strokeFocus2: global.color.black, // #000000 Global.Color.Black
  neutralShadowAmbient: 'rgba(0,0,0,0.12)', // rgba(0,0,0,0.12) undefined
  neutralShadowKey: 'rgba(0,0,0,0.14)', // rgba(0,0,0,0.14) undefined
  neutralShadowAmbientLighter: 'rgba(0,0,0,0.06)', // rgba(0,0,0,0.06) undefined
  neutralShadowKeyLighter: 'rgba(0,0,0,0.07)', // rgba(0,0,0,0.07) undefined
  neutralShadowAmbientDarker: 'rgba(0,0,0,0.20)', // rgba(0,0,0,0.20) undefined
  neutralShadowKeyDarker: 'rgba(0,0,0,0.24)', // rgba(0,0,0,0.24) undefined
  brandShadowAmbient: 'rgba(0,0,0,0.30)', // rgba(0,0,0,0.30) undefined
  brandShadowKey: 'rgba(0,0,0,0.25)', // rgba(0,0,0,0.25) undefined
});

export const generateSharedColorTokens: (
  globalSharedTokens: GlobalSharedColors,
) => Record<keyof GlobalSharedColors, SharedColorTokens> = globalSharedTokens => {
  return (Object.keys(globalSharedTokens) as Array<keyof GlobalSharedColors>).reduce((acc, sharedColor) => {
    acc[sharedColor] = {
      background1: globalSharedTokens[sharedColor].tint60,
      background2: globalSharedTokens[sharedColor].tint40,
      background3: globalSharedTokens[sharedColor].primary,
      foreground1: globalSharedTokens[sharedColor].shade10,
      foreground2: globalSharedTokens[sharedColor].shade30,
      foreground3: globalSharedTokens[sharedColor].primary,
      borderActive: globalSharedTokens[sharedColor].primary,
      border2: globalSharedTokens[sharedColor].primary,
    };
    return acc;
  }, {} as Record<keyof GlobalSharedColors, SharedColorTokens>);
};
