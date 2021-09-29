import type { GlobalSharedColors, NeutralColorTokens, SharedColorTokens, Theme } from '../types';

export const generateNeutralColorTokens: (global: Theme['global']) => NeutralColorTokens = global => ({
  neutralForeground1: global.color.white, // #ffffff Global.Color.White
  neutralForeground2: global.palette.grey[84], // #d6d6d6 Global.Color.Grey.84
  neutralForeground2Hover: global.color.white, // #ffffff Global.Color.White
  neutralForeground2Pressed: global.color.white, // #ffffff Global.Color.White
  neutralForeground2Selected: global.color.white, // #ffffff Global.Color.White
  neutralForeground2BrandHover: global.palette.brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  neutralForeground2BrandPressed: global.palette.brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  neutralForeground2BrandSelected: global.palette.brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  neutralForeground3: global.palette.grey[68], // #adadad Global.Color.Grey.68
  neutralForeground3Hover: global.palette.grey[84], // #d6d6d6 Global.Color.Grey.84
  neutralForeground3Pressed: global.palette.grey[84], // #d6d6d6 Global.Color.Grey.84
  neutralForeground3Selected: global.palette.grey[84], // #d6d6d6 Global.Color.Grey.84
  neutralForeground3BrandHover: global.palette.brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  neutralForeground3BrandPressed: global.palette.brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  neutralForeground3BrandSelected: global.palette.brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  neutralForeground4: global.palette.grey[60], // #999999 Global.Color.Grey.60
  neutralForegroundDisabled: global.palette.grey[36], // #5c5c5c Global.Color.Grey.36
  brandForegroundLink: global.palette.brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  brandForegroundLinkHover: global.palette.brand.tint30, // #6cb8f6 Global.Color.Brand.Tint.30
  brandForegroundLinkPressed: global.palette.brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  brandForegroundLinkSelected: global.palette.brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  compoundBrandForeground1: global.palette.brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  compoundBrandForeground1Hover: global.palette.brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  compoundBrandForeground1Pressed: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  brandForeground1: global.palette.brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  brandForeground2: global.palette.brand.tint30, // #6cb8f6 Global.Color.Brand.Tint.30
  neutralForegroundInverted: global.color.white, // #ffffff Global.Color.White
  neutralForegroundOnBrand: global.color.white, // #ffffff Global.Color.White
  neutralForegroundInvertedLink: global.color.white, // #ffffff Global.Color.White
  neutralForegroundInvertedLinkHover: global.color.white, // #ffffff Global.Color.White
  neutralForegroundInvertedLinkPressed: global.color.white, // #ffffff Global.Color.White
  neutralForegroundInvertedLinkSelected: global.color.white, // #ffffff Global.Color.White
  neutralBackground1: global.palette.grey[16], // #292929 Global.Color.Grey.16
  neutralBackground1Hover: global.palette.grey[24], // #3d3d3d Global.Color.Grey.24
  neutralBackground1Pressed: global.palette.grey[12], // #1f1f1f Global.Color.Grey.12
  neutralBackground1Selected: global.palette.grey[22], // #383838 Global.Color.Grey.22
  neutralBackground2: global.palette.grey[14], // #242424 Global.Color.Grey.14
  neutralBackground2Hover: global.palette.grey[22], // #383838 Global.Color.Grey.22
  neutralBackground2Pressed: global.palette.grey[10], // #1a1a1a Global.Color.Grey.10
  neutralBackground2Selected: global.palette.grey[20], // #333333 Global.Color.Grey.20
  neutralBackground3: global.palette.grey[12], // #1f1f1f Global.Color.Grey.12
  neutralBackground3Hover: global.palette.grey[20], // #333333 Global.Color.Grey.20
  neutralBackground3Pressed: global.palette.grey[8], // #141414 Global.Color.Grey.8
  neutralBackground3Selected: global.palette.grey[18], // #2e2e2e Global.Color.Grey.18
  neutralBackground4: global.palette.grey[8], // #141414 Global.Color.Grey.8
  neutralBackground4Hover: global.palette.grey[16], // #292929 Global.Color.Grey.16
  neutralBackground4Pressed: global.palette.grey[4], // #0a0a0a Global.Color.Grey.4
  neutralBackground4Selected: global.palette.grey[14], // #242424 Global.Color.Grey.14
  neutralBackground5: global.palette.grey[4], // #0a0a0a Global.Color.Grey.4
  neutralBackground5Hover: global.palette.grey[12], // #1f1f1f Global.Color.Grey.12
  neutralBackground5Pressed: global.color.black, // #000000 Global.Color.Black
  neutralBackground5Selected: global.palette.grey[10], // #1a1a1a Global.Color.Grey.10
  neutralBackground6: global.palette.grey[20], // #333333 Global.Color.Grey.20
  neutralBackgroundInverted: global.color.white, // #ffffff Global.Color.White
  subtleBackground: 'transparent', // transparent undefined
  subtleBackgroundHover: global.palette.grey[22], // #383838 Global.Color.Grey.22
  subtleBackgroundPressed: global.palette.grey[18], // #2e2e2e Global.Color.Grey.18
  subtleBackgroundSelected: global.palette.grey[20], // #333333 Global.Color.Grey.20
  transparentBackground: 'transparent', // transparent undefined
  transparentBackgroundHover: 'transparent', // transparent undefined
  transparentBackgroundPressed: 'transparent', // transparent undefined
  transparentBackgroundSelected: 'transparent', // transparent undefined
  neutralBackgroundDisabled: global.palette.grey[8], // #141414 Global.Color.Grey.8
  neutralStencil1: global.palette.grey[20], // #333333 Global.Color.Grey.20
  neutralStencil2: global.palette.grey[34], // #575757 Global.Color.Grey.34
  brandBackground: global.palette.brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  brandBackgroundHover: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  brandBackgroundPressed: global.palette.brand.shade40, // #004578 Global.Color.Brand.Shade.40
  brandBackgroundSelected: global.palette.brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  compoundBrandBackground: global.palette.brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  compoundBrandBackgroundHover: global.palette.brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  compoundBrandBackgroundPressed: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  brandBackgroundStatic: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  brandBackground2: global.palette.brand.shade40, // #004578 Global.Color.Brand.Shade.40
  neutralStrokeAccessible: global.palette.grey[68], // #adadad Global.Color.Grey.68
  neutralStrokeAccessibleHover: global.palette.grey[74], // #bdbdbd Global.Color.Grey.74
  neutralStrokeAccessiblePressed: global.palette.grey[70], // #b3b3b3 Global.Color.Grey.70
  neutralStrokeAccessibleSelected: global.palette.brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  neutralStroke1: global.palette.grey[40], // #666666 Global.Color.Grey.40
  neutralStroke1Hover: global.palette.grey[46], // #757575 Global.Color.Grey.46
  neutralStroke1Pressed: global.palette.grey[42], // #6b6b6b Global.Color.Grey.42
  neutralStroke1Selected: global.palette.grey[44], // #707070 Global.Color.Grey.44
  neutralStroke2: global.palette.grey[32], // #525252 Global.Color.Grey.32
  neutralStroke3: global.palette.grey[24], // #3d3d3d Global.Color.Grey.24
  brandStroke1: global.palette.brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  brandStroke2: global.palette.brand.shade30, // #004c87 Global.Color.Brand.Shade.30
  compoundBrandStroke: global.palette.brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  compoundBrandStrokeHover: global.palette.brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  compoundBrandStrokePressed: global.palette.brand.primary, // #106ebe Global.Color.Brand.Primary
  neutralStrokeDisabled: global.palette.grey[26], // #424242 Global.Color.Grey.26
  transparentStroke: 'transparent', // transparent undefined
  transparentStrokeInteractive: 'transparent', // transparent undefined
  transparentStrokeDisabled: 'transparent', // transparent undefined
  strokeFocus1: global.color.black, // #000000 Global.Color.Black
  strokeFocus2: global.color.white, // #ffffff Global.Color.White
  neutralShadowAmbient: 'rgba(0,0,0,0.24)', // rgba(0,0,0,0.24) undefined
  neutralShadowKey: 'rgba(0,0,0,0.28)', // rgba(0,0,0,0.28) undefined
  neutralShadowAmbientLighter: 'rgba(0,0,0,0.12)', // rgba(0,0,0,0.12) undefined
  neutralShadowKeyLighter: 'rgba(0,0,0,0.14)', // rgba(0,0,0,0.14) undefined
  neutralShadowAmbientDarker: 'rgba(0,0,0,0.40)', // rgba(0,0,0,0.40) undefined
  neutralShadowKeyDarker: 'rgba(0,0,0,0.48)', // rgba(0,0,0,0.48) undefined
  brandShadowAmbient: 'rgba(0,0,0,0.30)', // rgba(0,0,0,0.30) undefined
  brandShadowKey: 'rgba(0,0,0,0.25)', // rgba(0,0,0,0.25) undefined
});

export const generateSharedColorTokens: (
  globalSharedTokens: GlobalSharedColors,
) => Record<keyof GlobalSharedColors, SharedColorTokens> = globalSharedTokens => {
  return (Object.keys(globalSharedTokens) as Array<keyof GlobalSharedColors>).reduce((acc, sharedColor) => {
    acc[sharedColor] = {
      background1: globalSharedTokens[sharedColor].shade40,
      background2: globalSharedTokens[sharedColor].shade30,
      background3: globalSharedTokens[sharedColor].primary,
      foreground1: globalSharedTokens[sharedColor].tint30,
      foreground2: globalSharedTokens[sharedColor].tint40,
      foreground3: globalSharedTokens[sharedColor].tint20,
      borderActive: globalSharedTokens[sharedColor].tint30,
      border2: globalSharedTokens[sharedColor].tint20,
    };
    return acc;
  }, {} as Record<keyof GlobalSharedColors, SharedColorTokens>);
};
