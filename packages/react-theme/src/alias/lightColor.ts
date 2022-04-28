import { black, blackAlpha, grey, white, whiteAlpha } from '../global/colors';
import type { BrandVariants, ColorTokens } from '../types';

export const generateColorTokens = (brand: BrandVariants): ColorTokens => ({
  colorNeutralForeground1: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground1Hover: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground1Pressed: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground1Selected: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground2: grey[26], // #424242 Global.Color.Grey.26
  colorNeutralForeground2Hover: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground2Pressed: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground2Selected: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground2BrandHover: brand[80], // #0078d4 Global.Color.Brand.80
  colorNeutralForeground2BrandPressed: brand[70], // #106ebe Global.Color.Brand.70
  colorNeutralForeground2BrandSelected: brand[80], // #0078d4 Global.Color.Brand.80
  colorNeutralForeground3: grey[38], // #616161 Global.Color.Grey.38
  colorNeutralForeground3Hover: grey[26], // #424242 Global.Color.Grey.26
  colorNeutralForeground3Pressed: grey[26], // #424242 Global.Color.Grey.26
  colorNeutralForeground3Selected: grey[26], // #424242 Global.Color.Grey.26
  colorNeutralForeground3BrandHover: brand[80], // #0078d4 Global.Color.Brand.80
  colorNeutralForeground3BrandPressed: brand[70], // #106ebe Global.Color.Brand.70
  colorNeutralForeground3BrandSelected: brand[80], // #0078d4 Global.Color.Brand.80
  colorNeutralForeground4: grey[44], // #707070 Global.Color.Grey.44
  colorNeutralForegroundDisabled: grey[74], // #bdbdbd Global.Color.Grey.74
  colorNeutralForegroundInvertedDisabled: whiteAlpha[40], // rgba(255, 255, 255, 0.4) Global.Color.WhiteAlpha.40
  colorBrandForegroundLink: brand[70], // #106ebe Global.Color.Brand.70
  colorBrandForegroundLinkHover: brand[60], // #005a9e Global.Color.Brand.60
  colorBrandForegroundLinkPressed: brand[40], // #004578 Global.Color.Brand.40
  colorBrandForegroundLinkSelected: brand[70], // #106ebe Global.Color.Brand.70
  colorNeutralForeground2Link: grey[26], // #424242 Global.Color.Grey.26
  colorNeutralForeground2LinkHover: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground2LinkPressed: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground2LinkSelected: grey[14], // #242424 Global.Color.Grey.14
  colorCompoundBrandForeground1: brand[80], // #0078d4 Global.Color.Brand.80
  colorCompoundBrandForeground1Hover: brand[70], // #106ebe Global.Color.Brand.70
  colorCompoundBrandForeground1Pressed: brand[60], // #005a9e Global.Color.Brand.60
  colorBrandForeground1: brand[80], // #0078d4 Global.Color.Brand.80
  colorBrandForeground2: brand[70], // #106ebe Global.Color.Brand.70
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
  colorNeutralBackground1: white, // #ffffff Global.Color.White
  colorNeutralBackground1Hover: grey[96], // #f5f5f5 Global.Color.Grey.96
  colorNeutralBackground1Pressed: grey[88], // #e0e0e0 Global.Color.Grey.88
  colorNeutralBackground1Selected: grey[92], // #ebebeb Global.Color.Grey.92
  colorNeutralBackground2: grey[98], // #fafafa Global.Color.Grey.98
  colorNeutralBackground2Hover: grey[94], // #f0f0f0 Global.Color.Grey.94
  colorNeutralBackground2Pressed: grey[86], // #dbdbdb Global.Color.Grey.86
  colorNeutralBackground2Selected: grey[90], // #e6e6e6 Global.Color.Grey.90
  colorNeutralBackground3: grey[96], // #f5f5f5 Global.Color.Grey.96
  colorNeutralBackground3Hover: grey[92], // #ebebeb Global.Color.Grey.92
  colorNeutralBackground3Pressed: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorNeutralBackground3Selected: grey[88], // #e0e0e0 Global.Color.Grey.88
  colorNeutralBackground4: grey[94], // #f0f0f0 Global.Color.Grey.94
  colorNeutralBackground4Hover: grey[98], // #fafafa Global.Color.Grey.98
  colorNeutralBackground4Pressed: grey[96], // #f5f5f5 Global.Color.Grey.96
  colorNeutralBackground4Selected: white, // #ffffff Global.Color.White
  colorNeutralBackground5: grey[92], // #ebebeb Global.Color.Grey.92
  colorNeutralBackground5Hover: grey[96], // #f5f5f5 Global.Color.Grey.96
  colorNeutralBackground5Pressed: grey[94], // #f0f0f0 Global.Color.Grey.94
  colorNeutralBackground5Selected: grey[98], // #fafafa Global.Color.Grey.98
  colorNeutralBackground6: grey[90], // #e6e6e6 Global.Color.Grey.90
  colorNeutralBackgroundInverted: grey[38], // #616161 Global.Color.Grey.38
  colorSubtleBackground: 'transparent', // transparent undefined
  colorSubtleBackgroundHover: grey[96], // #f5f5f5 Global.Color.Grey.96
  colorSubtleBackgroundPressed: grey[88], // #e0e0e0 Global.Color.Grey.88
  colorSubtleBackgroundSelected: grey[92], // #ebebeb Global.Color.Grey.92
  colorSubtleBackgroundLightAlphaHover: whiteAlpha[70], // rgba(255, 255, 255, 0.7) Global.Color.WhiteAlpha.70
  colorSubtleBackgroundLightAlphaPressed: whiteAlpha[50], // rgba(255, 255, 255, 0.5) Global.Color.WhiteAlpha.50
  colorSubtleBackgroundLightAlphaSelected: 'transparent', // transparent undefined
  colorSubtleBackgroundInverted: 'transparent', // transparent undefined
  colorSubtleBackgroundInvertedHover: blackAlpha[10], // rgba(0, 0, 0, 0.1) Global.Color.BlackAlpha.10
  colorSubtleBackgroundInvertedPressed: blackAlpha[30], // rgba(0, 0, 0, 0.3) Global.Color.BlackAlpha.30
  colorSubtleBackgroundInvertedSelected: blackAlpha[20], // rgba(0, 0, 0, 0.2) Global.Color.BlackAlpha.20
  colorTransparentBackground: 'transparent', // transparent undefined
  colorTransparentBackgroundHover: 'transparent', // transparent undefined
  colorTransparentBackgroundPressed: 'transparent', // transparent undefined
  colorTransparentBackgroundSelected: 'transparent', // transparent undefined
  colorNeutralBackgroundDisabled: grey[94], // #f0f0f0 Global.Color.Grey.94
  colorNeutralBackgroundInvertedDisabled: whiteAlpha[10], // rgba(255, 255, 255, 0.1) Global.Color.WhiteAlpha.10
  colorNeutralStencil1: grey[90], // #e6e6e6 Global.Color.Grey.90
  colorNeutralStencil2: grey[98], // #fafafa Global.Color.Grey.98
  colorBackgroundOverlay: blackAlpha[10], // rgba(0, 0, 0, 0.1) Global.Color.BlackAlpha.10
  colorScrollbarOverlay: blackAlpha[50], // rgba(0, 0, 0, 0.5) Global.Color.BlackAlpha.50
  colorBrandBackground: brand[80], // #0078d4 Global.Color.Brand.80
  colorBrandBackgroundHover: brand[70], // #106ebe Global.Color.Brand.70
  colorBrandBackgroundPressed: brand[40], // #004578 Global.Color.Brand.40
  colorBrandBackgroundSelected: brand[60], // #005a9e Global.Color.Brand.60
  colorCompoundBrandBackground: brand[80], // #0078d4 Global.Color.Brand.80
  colorCompoundBrandBackgroundHover: brand[70], // #106ebe Global.Color.Brand.70
  colorCompoundBrandBackgroundPressed: brand[60], // #005a9e Global.Color.Brand.60
  colorBrandBackgroundStatic: brand[80], // #0078d4 Global.Color.Brand.80
  colorBrandBackground2: brand[160], // #eff6fc Global.Color.Brand.160
  colorBrandBackgroundInverted: white, // #ffffff Global.Color.White
  colorBrandBackgroundInvertedHover: brand[160], // #eff6fc Global.Color.Brand.160
  colorBrandBackgroundInvertedPressed: brand[140], // #c7e0f4 Global.Color.Brand.140
  colorBrandBackgroundInvertedSelected: brand[150], // #deecf9 Global.Color.Brand.150
  colorNeutralStrokeAccessible: grey[38], // #616161 Global.Color.Grey.38
  colorNeutralStrokeAccessibleHover: grey[34], // #575757 Global.Color.Grey.34
  colorNeutralStrokeAccessiblePressed: grey[30], // #4d4d4d Global.Color.Grey.30
  colorNeutralStrokeAccessibleSelected: brand[80], // #0078d4 Global.Color.Brand.80
  colorNeutralStroke1: grey[82], // #d1d1d1 Global.Color.Grey.82
  colorNeutralStroke1Hover: grey[78], // #c7c7c7 Global.Color.Grey.78
  colorNeutralStroke1Pressed: grey[70], // #b3b3b3 Global.Color.Grey.70
  colorNeutralStroke1Selected: grey[74], // #bdbdbd Global.Color.Grey.74
  colorNeutralStroke2: grey[88], // #e0e0e0 Global.Color.Grey.88
  colorNeutralStroke3: grey[94], // #f0f0f0 Global.Color.Grey.94
  colorNeutralStrokeOnBrand: white, // #ffffff Global.Color.White
  colorNeutralStrokeOnBrand2: white, // #ffffff Global.Color.White
  colorNeutralStrokeOnBrand2Hover: white, // #ffffff Global.Color.White
  colorNeutralStrokeOnBrand2Pressed: white, // #ffffff Global.Color.White
  colorNeutralStrokeOnBrand2Selected: white, // #ffffff Global.Color.White
  colorBrandStroke1: brand[80], // #0078d4 Global.Color.Brand.80
  colorBrandStroke2: brand[140], // #c7e0f4 Global.Color.Brand.140
  colorCompoundBrandStroke: brand[80], // #0078d4 Global.Color.Brand.80
  colorCompoundBrandStrokeHover: brand[70], // #106ebe Global.Color.Brand.70
  colorCompoundBrandStrokePressed: brand[60], // #005a9e Global.Color.Brand.60
  colorNeutralStrokeDisabled: grey[88], // #e0e0e0 Global.Color.Grey.88
  colorNeutralStrokeInvertedDisabled: whiteAlpha[40], // rgba(255, 255, 255, 0.4) Global.Color.WhiteAlpha.40
  colorTransparentStroke: 'transparent', // transparent undefined
  colorTransparentStrokeInteractive: 'transparent', // transparent undefined
  colorTransparentStrokeDisabled: 'transparent', // transparent undefined
  colorStrokeFocus1: white, // #ffffff Global.Color.White
  colorStrokeFocus2: black, // #000000 Global.Color.Black
  colorNeutralShadowAmbient: 'rgba(0,0,0,0.12)', // rgba(0,0,0,0.12) undefined
  colorNeutralShadowKey: 'rgba(0,0,0,0.14)', // rgba(0,0,0,0.14) undefined
  colorNeutralShadowAmbientLighter: 'rgba(0,0,0,0.06)', // rgba(0,0,0,0.06) undefined
  colorNeutralShadowKeyLighter: 'rgba(0,0,0,0.07)', // rgba(0,0,0,0.07) undefined
  colorNeutralShadowAmbientDarker: 'rgba(0,0,0,0.20)', // rgba(0,0,0,0.20) undefined
  colorNeutralShadowKeyDarker: 'rgba(0,0,0,0.24)', // rgba(0,0,0,0.24) undefined
  colorBrandShadowAmbient: 'rgba(0,0,0,0.30)', // rgba(0,0,0,0.30) undefined
  colorBrandShadowKey: 'rgba(0,0,0,0.25)', // rgba(0,0,0,0.25) undefined
});
