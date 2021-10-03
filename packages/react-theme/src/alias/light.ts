import { black, grey, white, sharedColors } from '../global/colors';
import type {
  BrandVariants,
  GlobalSharedColors,
  ColorTokens,
  ColorPaletteTokens,
  ColorPaletteT,
  GlobalSharedColorsT,
} from '../types';

export const generateColorTokens = (brand: BrandVariants): ColorTokens => ({
  colorNeutralForeground1: grey[14], // global.palette.grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground2: grey[26], // #424242 Global.Color.Grey.26
  colorNeutralForeground2Hover: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground2Pressed: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground2Selected: grey[14], // #242424 Global.Color.Grey.14
  colorNeutralForeground2BrandHover: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorNeutralForeground2BrandPressed: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorNeutralForeground2BrandSelected: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorNeutralForeground3: grey[38], // #616161 Global.Color.Grey.38
  colorNeutralForeground3Hover: grey[26], // #424242 Global.Color.Grey.26
  colorNeutralForeground3Pressed: grey[26], // #424242 Global.Color.Grey.26
  colorNeutralForeground3Selected: grey[26], // #424242 Global.Color.Grey.26
  colorNeutralForeground3BrandHover: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorNeutralForeground3BrandPressed: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorNeutralForeground3BrandSelected: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorNeutralForeground4: grey[44], // #707070 Global.Color.Grey.44
  colorNeutralForegroundDisabled: grey[74], // #bdbdbd Global.Color.Grey.74
  colorBrandForegroundLink: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorBrandForegroundLinkHover: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorBrandForegroundLinkPressed: brand.shade40, // #004578 Global.Color.Brand.Shade.40
  colorBrandForegroundLinkSelected: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorCompoundBrandForeground1: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorCompoundBrandForeground1Hover: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorCompoundBrandForeground1Pressed: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorBrandForeground1: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorBrandForeground2: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorNeutralForegroundInverted: white, // #ffffff Global.Color.White
  colorNeutralForegroundOnBrand: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedLink: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedLinkHover: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedLinkPressed: white, // #ffffff Global.Color.White
  colorNeutralForegroundInvertedLinkSelected: white, // #ffffff Global.Color.White
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
  colorTransparentBackground: 'transparent', // transparent undefined
  colorTransparentBackgroundHover: 'transparent', // transparent undefined
  colorTransparentBackgroundPressed: 'transparent', // transparent undefined
  colorTransparentBackgroundSelected: 'transparent', // transparent undefined
  colorNeutralBackgroundDisabled: grey[94], // #f0f0f0 Global.Color.Grey.94
  colorNeutralStencil1: grey[90], // #e6e6e6 Global.Color.Grey.90
  colorNeutralStencil2: grey[98], // #fafafa Global.Color.Grey.98
  colorBrandBackground: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorBrandBackgroundHover: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorBrandBackgroundPressed: brand.shade40, // #004578 Global.Color.Brand.Shade.40
  colorBrandBackgroundSelected: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorCompoundBrandBackground: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorCompoundBrandBackgroundHover: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorCompoundBrandBackgroundPressed: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorBrandBackgroundStatic: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorBrandBackground2: brand.tint60, // #eff6fc Global.Color.Brand.Tint.60
  colorNeutralStrokeAccessible: grey[38], // #616161 Global.Color.Grey.38
  colorNeutralStrokeAccessibleHover: grey[34], // #575757 Global.Color.Grey.34
  colorNeutralStrokeAccessiblePressed: grey[30], // #4d4d4d Global.Color.Grey.30
  colorNeutralStrokeAccessibleSelected: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorNeutralStroke1: grey[82], // #d1d1d1 Global.Color.Grey.82
  colorNeutralStroke1Hover: grey[78], // #c7c7c7 Global.Color.Grey.78
  colorNeutralStroke1Pressed: grey[70], // #b3b3b3 Global.Color.Grey.70
  colorNeutralStroke1Selected: grey[74], // #bdbdbd Global.Color.Grey.74
  colorNeutralStroke2: grey[88], // #e0e0e0 Global.Color.Grey.88
  colorNeutralStroke3: grey[94], // #f0f0f0 Global.Color.Grey.94
  colorBrandStroke1: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorBrandStroke2: brand.tint40, // #c7e0f4 Global.Color.Brand.Tint.40
  colorCompoundBrandStroke: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorCompoundBrandStrokeHover: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorCompoundBrandStrokePressed: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorNeutralStrokeDisabled: grey[88], // #e0e0e0 Global.Color.Grey.88
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

export const colorPaletteTokens: ColorPaletteTokens = (Object.keys(sharedColors) as Array<
  keyof GlobalSharedColors
>).reduce((acc, sharedColor) => {
  const color: GlobalSharedColorsT = (sharedColor.slice(0, 1).toUpperCase() +
    sharedColor.slice(1)) as GlobalSharedColorsT;
  const sharedColorTokens: Partial<Record<ColorPaletteT<GlobalSharedColorsT>, string>> = {
    [`colorPalette${color}Background1`]: sharedColors[sharedColor].tint60,
    [`colorPalette${color}Background2`]: sharedColors[sharedColor].tint40,
    [`colorPalette${color}Background3`]: sharedColors[sharedColor].primary,
    [`colorPalette${color}Foreground1`]: sharedColors[sharedColor].shade10,
    [`colorPalette${color}Foreground2`]: sharedColors[sharedColor].shade30,
    [`colorPalette${color}Foreground3`]: sharedColors[sharedColor].primary,
    [`colorPalette${color}BorderActive`]: sharedColors[sharedColor].primary,
    [`colorPalette${color}Border2`]: sharedColors[sharedColor].primary,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as ColorPaletteTokens);
