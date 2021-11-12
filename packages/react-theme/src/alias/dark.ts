import { black, blackAlpha, grey, white, whiteAlpha, sharedColors } from '../global/colors';
import type { BrandVariants, GlobalSharedColors, ColorTokens, ColorPaletteTokens } from '../types';

export const generateColorTokens = (brand: BrandVariants): ColorTokens => ({
  colorNeutralForeground1: white, // #ffffff Global.Color.White
  colorNeutralForeground1Hover: white, // #ffffff Global.Color.White
  colorNeutralForeground1Pressed: white, // #ffffff Global.Color.White
  colorNeutralForeground1Selected: white, // #ffffff Global.Color.White
  colorNeutralForeground2: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorNeutralForeground2Hover: white, // #ffffff Global.Color.White
  colorNeutralForeground2Pressed: white, // #ffffff Global.Color.White
  colorNeutralForeground2Selected: white, // #ffffff Global.Color.White
  colorNeutralForeground2BrandHover: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorNeutralForeground2BrandPressed: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorNeutralForeground2BrandSelected: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorNeutralForeground3: grey[68], // #adadad Global.Color.Grey.68
  colorNeutralForeground3Hover: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorNeutralForeground3Pressed: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorNeutralForeground3Selected: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorNeutralForeground3BrandHover: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorNeutralForeground3BrandPressed: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorNeutralForeground3BrandSelected: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorNeutralForeground4: grey[60], // #999999 Global.Color.Grey.60
  colorNeutralForegroundDisabled: grey[36], // #5c5c5c Global.Color.Grey.36
  colorNeutralForegroundInvertedDisabled: whiteAlpha[40], // rgba(255, 255, 255, 0.4) Global.Color.WhiteAlpha.40
  colorBrandForegroundLink: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorBrandForegroundLinkHover: brand.tint30, // #6cb8f6 Global.Color.Brand.Tint.30
  colorBrandForegroundLinkPressed: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorBrandForegroundLinkSelected: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorCompoundBrandForeground1: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorCompoundBrandForeground1Hover: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorCompoundBrandForeground1Pressed: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorBrandForeground1: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorBrandForeground2: brand.tint30, // #6cb8f6 Global.Color.Brand.Tint.30
  colorNeutralForegroundInverted: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedHover: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedPressed: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedSelected: white, // #ffffff Global.Color.White
  colorNeutralForegroundOnBrand: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedLink: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedLinkHover: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedLinkPressed: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedLinkSelected: white, // #ffffff Global.Color.White
  colorBrandForegroundInverted: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorBrandForegroundInvertedHover: brand.tint30, // #6cb8f6 Global.Color.Brand.Tint.30
  colorBrandForegroundInvertedPressed: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorBrandForegroundOnLight: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorBrandForegroundOnLightHover: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorBrandForegroundOnLightPressed: brand.shade30, // #004c87 Global.Color.Brand.Shade.30
  colorBrandForegroundOnLightSelected: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorNeutralBackground1: grey[16], // #292929 Global.Color.Grey.16
  colorNeutralBackground1Hover: grey[24], // #3d3d3d Global.Color.Grey.24
  colorNeutralBackground1Pressed: grey[12], // #1f1f1f Global.Color.Grey.12
  colorNeutralBackground1Selected: grey[22], // #383838 Global.Color.Grey.22
  colorNeutralBackground2: grey[12], // #1f1f1f Global.Color.Grey.12
  colorNeutralBackground2Hover: grey[20], // #333333 Global.Color.Grey.20
  colorNeutralBackground2Pressed: grey[8], // #141414 Global.Color.Grey.8
  colorNeutralBackground2Selected: grey[18], // #2e2e2e Global.Color.Grey.18
  colorNeutralBackground3: grey[8], // #141414 Global.Color.Grey.8
  colorNeutralBackground3Hover: grey[16], // #292929 Global.Color.Grey.16
  colorNeutralBackground3Pressed: grey[4], // #0a0a0a Global.Color.Grey.4
  colorNeutralBackground3Selected: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralBackground4: grey[4], // #0a0a0a Global.Color.Grey.4
  colorNeutralBackground4Hover: grey[12], // #1f1f1f Global.Color.Grey.12
  colorNeutralBackground4Pressed: black, // #000000 Global.Color.Black
  colorNeutralBackground4Selected: grey[10], // #1a1a1a Global.Color.Grey.10
  colorNeutralBackground5: black, // #000000 Global.Color.Black
  colorNeutralBackground5Hover: grey[8], // #141414 Global.Color.Grey.8
  colorNeutralBackground5Pressed: grey[2], // #050505 Global.Color.Grey.2
  colorNeutralBackground5Selected: grey[6], // #0f0f0f Global.Color.Grey.6
  colorNeutralBackground6: grey[20], // #333333 Global.Color.Grey.20
  colorNeutralBackgroundInverted: grey[24], // #3d3d3d Global.Color.Grey.24
  colorSubtleBackground: 'transparent', // transparent undefined
  colorSubtleBackgroundHover: grey[22], // #383838 Global.Color.Grey.22
  colorSubtleBackgroundPressed: grey[18], // #2e2e2e Global.Color.Grey.18
  colorSubtleBackgroundSelected: grey[20], // #333333 Global.Color.Grey.20
  colorSubtleBackgroundLightAlphaHover: whiteAlpha[10], // rgba(255, 255, 255, 0.1) Global.Color.WhiteAlpha.10
  colorSubtleBackgroundLightAlphaPressed: whiteAlpha[5], // rgba(255, 255, 255, 0.05) Global.Color.WhiteAlpha.5
  colorSubtleBackgroundLightAlphaSelected: 'transparent', // transparent undefined
  colorSubtleBackgroundInverted: 'transparent', // transparent undefined
  colorSubtleBackgroundInvertedHover: blackAlpha[10], // rgba(0, 0, 0, 0.1) Global.Color.BlackAlpha.10
  colorSubtleBackgroundInvertedPressed: blackAlpha[30], // rgba(0, 0, 0, 0.3) Global.Color.BlackAlpha.30
  colorSubtleBackgroundInvertedSelected: blackAlpha[20], // rgba(0, 0, 0, 0.2) Global.Color.BlackAlpha.20
  colorTransparentBackground: 'transparent', // transparent undefined
  colorTransparentBackgroundHover: 'transparent', // transparent undefined
  colorTransparentBackgroundPressed: 'transparent', // transparent undefined
  colorTransparentBackgroundSelected: 'transparent', // transparent undefined
  colorNeutralBackgroundDisabled: grey[8], // #141414 Global.Color.Grey.8
  colorNeutralBackgroundInvertedDisabled: whiteAlpha[10], // rgba(255, 255, 255, 0.1) Global.Color.WhiteAlpha.10
  colorNeutralStencil1: grey[20], // #333333 Global.Color.Grey.20
  colorNeutralStencil2: grey[34], // #575757 Global.Color.Grey.34
  colorBrandBackground: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorBrandBackgroundHover: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorBrandBackgroundPressed: brand.shade40, // #004578 Global.Color.Brand.Shade.40
  colorBrandBackgroundSelected: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorCompoundBrandBackground: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorCompoundBrandBackgroundHover: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorCompoundBrandBackgroundPressed: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorBrandBackgroundStatic: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorBrandBackground2: brand.shade40, // #004578 Global.Color.Brand.Shade.40
  colorBrandBackgroundInverted: white, // #ffffff Global.Color.White
  colorBrandBackgroundInvertedHover: brand.tint60, // #eff6fc Global.Color.Brand.Tint.60
  colorBrandBackgroundInvertedPressed: brand.tint40, // #c7e0f4 Global.Color.Brand.Tint.40
  colorBrandBackgroundInvertedSelected: brand.tint50, // #deecf9 Global.Color.Brand.Tint.50
  colorNeutralStrokeAccessible: grey[68], // #adadad Global.Color.Grey.68
  colorNeutralStrokeAccessibleHover: grey[74], // #bdbdbd Global.Color.Grey.74
  colorNeutralStrokeAccessiblePressed: grey[70], // #b3b3b3 Global.Color.Grey.70
  colorNeutralStrokeAccessibleSelected: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorNeutralStroke1: grey[40], // #666666 Global.Color.Grey.40
  colorNeutralStroke1Hover: grey[46], // #757575 Global.Color.Grey.46
  colorNeutralStroke1Pressed: grey[42], // #6b6b6b Global.Color.Grey.42
  colorNeutralStroke1Selected: grey[44], // #707070 Global.Color.Grey.44
  colorNeutralStroke2: grey[32], // #525252 Global.Color.Grey.32
  colorNeutralStroke3: grey[24], // #3d3d3d Global.Color.Grey.24
  colorNeutralStrokeOnBrand: grey[16], // #292929 Global.Color.Grey.16
  colorNeutralStrokeOnBrand2: white, // #ffffff Global.Color.White
  colorNeutralStrokeOnBrand2Hover: white, // #ffffff Global.Color.White
  colorNeutralStrokeOnBrand2Pressed: white, // #ffffff Global.Color.White
  colorNeutralStrokeOnBrand2Selected: white, // #ffffff Global.Color.White
  colorBrandStroke1: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorBrandStroke2: brand.shade30, // #004c87 Global.Color.Brand.Shade.30
  colorCompoundBrandStroke: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorCompoundBrandStrokeHover: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorCompoundBrandStrokePressed: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorNeutralStrokeDisabled: grey[26], // #424242 Global.Color.Grey.26
  colorNeutralStrokeInvertedDisabled: whiteAlpha[40], // rgba(255, 255, 255, 0.4) Global.Color.WhiteAlpha.40
  colorTransparentStroke: 'transparent', // transparent undefined
  colorTransparentStrokeInteractive: 'transparent', // transparent undefined
  colorTransparentStrokeDisabled: 'transparent', // transparent undefined
  colorStrokeFocus1: black, // #000000 Global.Color.Black
  colorStrokeFocus2: white, // #ffffff Global.Color.White
  colorNeutralShadowAmbient: 'rgba(0,0,0,0.24)', // rgba(0,0,0,0.24) undefined
  colorNeutralShadowKey: 'rgba(0,0,0,0.28)', // rgba(0,0,0,0.28) undefined
  colorNeutralShadowAmbientLighter: 'rgba(0,0,0,0.12)', // rgba(0,0,0,0.12) undefined
  colorNeutralShadowKeyLighter: 'rgba(0,0,0,0.14)', // rgba(0,0,0,0.14) undefined
  colorNeutralShadowAmbientDarker: 'rgba(0,0,0,0.40)', // rgba(0,0,0,0.40) undefined
  colorNeutralShadowKeyDarker: 'rgba(0,0,0,0.48)', // rgba(0,0,0,0.48) undefined
  colorBrandShadowAmbient: 'rgba(0,0,0,0.30)', // rgba(0,0,0,0.30) undefined
  colorBrandShadowKey: 'rgba(0,0,0,0.25)', // rgba(0,0,0,0.25) undefined
});

export const colorPaletteTokens: ColorPaletteTokens = (Object.keys(sharedColors) as Array<
  keyof GlobalSharedColors
>).reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: sharedColors[sharedColor].shade40,
    [`colorPalette${color}Background2`]: sharedColors[sharedColor].shade30,
    [`colorPalette${color}Background3`]: sharedColors[sharedColor].primary,
    [`colorPalette${color}Foreground1`]: sharedColors[sharedColor].tint30,
    [`colorPalette${color}Foreground2`]: sharedColors[sharedColor].tint40,
    [`colorPalette${color}Foreground3`]: sharedColors[sharedColor].tint20,
    [`colorPalette${color}BorderActive`]: sharedColors[sharedColor].tint30,
    [`colorPalette${color}Border2`]: sharedColors[sharedColor].tint20,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as ColorPaletteTokens);
