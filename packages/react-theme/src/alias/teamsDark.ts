import { black, blackAlpha, grey, grey14Alpha, white, whiteAlpha, sharedColors } from '../global/colors';
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
  colorNeutralForeground2BrandHover: brand[100], // #2899f5 Global.Color.Brand.100
  colorNeutralForeground2BrandPressed: brand[90], // #1890f1 Global.Color.Brand.90
  colorNeutralForeground2BrandSelected: brand[100], // #2899f5 Global.Color.Brand.100
  colorNeutralForeground3: grey[68], // #adadad Global.Color.Grey.68
  colorNeutralForeground3Hover: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorNeutralForeground3Pressed: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorNeutralForeground3Selected: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorNeutralForeground3BrandHover: brand[100], // #2899f5 Global.Color.Brand.100
  colorNeutralForeground3BrandPressed: brand[90], // #1890f1 Global.Color.Brand.90
  colorNeutralForeground3BrandSelected: brand[100], // #2899f5 Global.Color.Brand.100
  colorNeutralForeground4: grey[60], // #999999 Global.Color.Grey.60
  colorNeutralForegroundDisabled: grey[36], // #5c5c5c Global.Color.Grey.36
  colorNeutralForegroundInvertedDisabled: whiteAlpha[40], // rgba(255, 255, 255, 0.4) Global.Color.WhiteAlpha.40
  colorBrandForegroundLink: brand[90], // #1890f1 Global.Color.Brand.90
  colorBrandForegroundLinkHover: brand[110], // #3aa0f3 Global.Color.Brand.110
  colorBrandForegroundLinkPressed: brand[100], // #2899f5 Global.Color.Brand.100
  colorBrandForegroundLinkSelected: brand[90], // #1890f1 Global.Color.Brand.90
  colorCompoundBrandForeground1: brand[90], // #1890f1 Global.Color.Brand.90
  colorCompoundBrandForeground1Hover: brand[100], // #2899f5 Global.Color.Brand.100
  colorCompoundBrandForeground1Pressed: brand[80], // #0078d4 Global.Color.Brand.80
  colorBrandForeground1: brand[100], // #2899f5 Global.Color.Brand.100
  colorBrandForeground2: brand[110], // #3aa0f3 Global.Color.Brand.110
  colorNeutralForeground1Static: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForegroundInverted: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedHover: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedPressed: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedSelected: white, // #ffffff Global.Color.White
  colorNeutralForegroundOnBrand: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedLink: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedLinkHover: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedLinkPressed: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedLinkSelected: white, // #ffffff Global.Color.White
  colorBrandForegroundInverted: brand[100], // #2899f5 Global.Color.Brand.100
  colorBrandForegroundInvertedHover: brand[110], // #3aa0f3 Global.Color.Brand.110
  colorBrandForegroundInvertedPressed: brand[100], // #2899f5 Global.Color.Brand.100
  colorBrandForegroundOnLight: brand[80], // #0078d4 Global.Color.Brand.80
  colorBrandForegroundOnLightHover: brand[70], // #106ebe Global.Color.Brand.70
  colorBrandForegroundOnLightPressed: brand[50], // #004c87 Global.Color.Brand.50
  colorBrandForegroundOnLightSelected: brand[60], // #005a9e Global.Color.Brand.60
  colorNeutralBackground1: grey[16], // #292929 Global.Color.Grey.16
  colorNeutralBackground1Hover: grey[24], // #3d3d3d Global.Color.Grey.24
  colorNeutralBackground1Pressed: grey[12], // #1f1f1f Global.Color.Grey.12
  colorNeutralBackground1Selected: grey[22], // #383838 Global.Color.Grey.22
  colorNeutralBackground2: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralBackground2Hover: grey[22], // #383838 Global.Color.Grey.22
  colorNeutralBackground2Pressed: grey[10], // #1a1a1a Global.Color.Grey.10
  colorNeutralBackground2Selected: grey[20], // #333333 Global.Color.Grey.20
  colorNeutralBackground3: grey[12], // #1f1f1f Global.Color.Grey.12
  colorNeutralBackground3Hover: grey[20], // #333333 Global.Color.Grey.20
  colorNeutralBackground3Pressed: grey[8], // #141414 Global.Color.Grey.8
  colorNeutralBackground3Selected: grey[18], // #2e2e2e Global.Color.Grey.18
  colorNeutralBackground4: grey[8], // #141414 Global.Color.Grey.8
  colorNeutralBackground4Hover: grey[16], // #292929 Global.Color.Grey.16
  colorNeutralBackground4Pressed: grey[4], // #0a0a0a Global.Color.Grey.4
  colorNeutralBackground4Selected: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralBackground5: grey[4], // #0a0a0a Global.Color.Grey.4
  colorNeutralBackground5Hover: grey[12], // #1f1f1f Global.Color.Grey.12
  colorNeutralBackground5Pressed: black, // #000000 Global.Color.Black
  colorNeutralBackground5Selected: grey[10], // #1a1a1a Global.Color.Grey.10
  colorNeutralBackground6: grey[20], // #333333 Global.Color.Grey.20
  colorNeutralBackgroundInverted: grey[24], // #3d3d3d Global.Color.Grey.24
  colorSubtleBackground: 'transparent', // transparent undefined
  colorSubtleBackgroundHover: grey[22], // #383838 Global.Color.Grey.22
  colorSubtleBackgroundPressed: grey[18], // #2e2e2e Global.Color.Grey.18
  colorSubtleBackgroundSelected: grey[20], // #333333 Global.Color.Grey.20
  colorSubtleBackgroundLightAlphaHover: grey14Alpha[80], // rgba(36, 36, 36, 0.8) Global.Color.Grey14Alpha.80
  colorSubtleBackgroundLightAlphaPressed: grey14Alpha[50], // rgba(36, 36, 36, 0.5) Global.Color.Grey14Alpha.50
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
  colorNeutralStencil1: grey[34], // #575757 Global.Color.Grey.34
  colorNeutralStencil2: grey[20], // #333333 Global.Color.Grey.20
  colorBackgroundOverlay: blackAlpha[50], // rgba(0, 0, 0, 0.5) Global.Color.BlackAlpha.50
  colorScrollbarOverlay: whiteAlpha[60], // rgba(255, 255, 255, 0.6) Global.Color.WhiteAlpha.60
  colorBrandBackground: brand[70], // #106ebe Global.Color.Brand.70
  colorBrandBackgroundHover: brand[80], // #0078d4 Global.Color.Brand.80
  colorBrandBackgroundPressed: brand[40], // #004578 Global.Color.Brand.40
  colorBrandBackgroundSelected: brand[60], // #005a9e Global.Color.Brand.60
  colorCompoundBrandBackground: brand[90], // #1890f1 Global.Color.Brand.90
  colorCompoundBrandBackgroundHover: brand[100], // #2899f5 Global.Color.Brand.100
  colorCompoundBrandBackgroundPressed: brand[80], // #0078d4 Global.Color.Brand.80
  colorBrandBackgroundStatic: brand[80], // #0078d4 Global.Color.Brand.80
  colorBrandBackground2: brand[40], // #004578 Global.Color.Brand.40
  colorBrandBackgroundInverted: white, // #ffffff Global.Color.White
  colorBrandBackgroundInvertedHover: brand[160], // #eff6fc Global.Color.Brand.160
  colorBrandBackgroundInvertedPressed: brand[140], // #c7e0f4 Global.Color.Brand.140
  colorBrandBackgroundInvertedSelected: brand[150], // #deecf9 Global.Color.Brand.150
  colorNeutralStrokeAccessible: grey[68], // #adadad Global.Color.Grey.68
  colorNeutralStrokeAccessibleHover: grey[74], // #bdbdbd Global.Color.Grey.74
  colorNeutralStrokeAccessiblePressed: grey[70], // #b3b3b3 Global.Color.Grey.70
  colorNeutralStrokeAccessibleSelected: brand[100], // #2899f5 Global.Color.Brand.100
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
  colorBrandStroke1: brand[90], // #1890f1 Global.Color.Brand.90
  colorBrandStroke2: brand[50], // #004c87 Global.Color.Brand.50
  colorCompoundBrandStroke: brand[90], // #1890f1 Global.Color.Brand.90
  colorCompoundBrandStrokeHover: brand[100], // #2899f5 Global.Color.Brand.100
  colorCompoundBrandStrokePressed: brand[80], // #0078d4 Global.Color.Brand.80
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
    [`colorPalette${color}Border1`]: sharedColors[sharedColor].primary,
    [`colorPalette${color}Border2`]: sharedColors[sharedColor].tint20,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as ColorPaletteTokens);
