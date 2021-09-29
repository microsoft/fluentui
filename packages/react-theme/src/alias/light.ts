import { black, grey, white, sharedColors } from '../global';
import type {
  BrandVariants,
  GlobalSharedColors,
  ColorAliasTokens,
  SharedColorTokens,
  SharedColorT,
  GlobalSharedColorsT,
} from '../types';

export const generateColorAliasTokens = (brand: BrandVariants): ColorAliasTokens => ({
  colorAliasNeutralForeground1: grey[14], // global.palette.grey[14], // #242424 Global.Color.Grey.14
  colorAliasNeutralForeground2: grey[26], // #424242 Global.Color.Grey.26
  colorAliasNeutralForeground2Hover: grey[14], // #242424 Global.Color.Grey.14
  colorAliasNeutralForeground2Pressed: grey[14], // #242424 Global.Color.Grey.14
  colorAliasNeutralForeground2Selected: grey[14], // #242424 Global.Color.Grey.14
  colorAliasNeutralForeground2BrandHover: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasNeutralForeground2BrandPressed: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorAliasNeutralForeground2BrandSelected: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasNeutralForeground3: grey[38], // #616161 Global.Color.Grey.38
  colorAliasNeutralForeground3Hover: grey[26], // #424242 Global.Color.Grey.26
  colorAliasNeutralForeground3Pressed: grey[26], // #424242 Global.Color.Grey.26
  colorAliasNeutralForeground3Selected: grey[26], // #424242 Global.Color.Grey.26
  colorAliasNeutralForeground3BrandHover: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasNeutralForeground3BrandPressed: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorAliasNeutralForeground3BrandSelected: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasNeutralForeground4: grey[44], // #707070 Global.Color.Grey.44
  colorAliasNeutralForegroundDisabled: grey[74], // #bdbdbd Global.Color.Grey.74
  colorAliasBrandForegroundLink: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorAliasBrandForegroundLinkHover: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorAliasBrandForegroundLinkPressed: brand.shade40, // #004578 Global.Color.Brand.Shade.40
  colorAliasBrandForegroundLinkSelected: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorAliasCompoundBrandForeground1: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasCompoundBrandForeground1Hover: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorAliasCompoundBrandForeground1Pressed: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorAliasBrandForeground1: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasBrandForeground2: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorAliasNeutralForegroundInverted: white, // #ffffff Global.Color.White
  colorAliasNeutralForegroundOnBrand: white, // #ffffff Global.Color.White
  colorAliasNeutralForegroundInvertedLink: white, // #ffffff Global.Color.White
  colorAliasNeutralForegroundInvertedLinkHover: white, // #ffffff Global.Color.White
  colorAliasNeutralForegroundInvertedLinkPressed: white, // #ffffff Global.Color.White
  colorAliasNeutralForegroundInvertedLinkSelected: white, // #ffffff Global.Color.White
  colorAliasNeutralBackground1: white, // #ffffff Global.Color.White
  colorAliasNeutralBackground1Hover: grey[96], // #f5f5f5 Global.Color.Grey.96
  colorAliasNeutralBackground1Pressed: grey[88], // #e0e0e0 Global.Color.Grey.88
  colorAliasNeutralBackground1Selected: grey[92], // #ebebeb Global.Color.Grey.92
  colorAliasNeutralBackground2: grey[98], // #fafafa Global.Color.Grey.98
  colorAliasNeutralBackground2Hover: grey[94], // #f0f0f0 Global.Color.Grey.94
  colorAliasNeutralBackground2Pressed: grey[86], // #dbdbdb Global.Color.Grey.86
  colorAliasNeutralBackground2Selected: grey[90], // #e6e6e6 Global.Color.Grey.90
  colorAliasNeutralBackground3: grey[96], // #f5f5f5 Global.Color.Grey.96
  colorAliasNeutralBackground3Hover: grey[92], // #ebebeb Global.Color.Grey.92
  colorAliasNeutralBackground3Pressed: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorAliasNeutralBackground3Selected: grey[88], // #e0e0e0 Global.Color.Grey.88
  colorAliasNeutralBackground4: grey[94], // #f0f0f0 Global.Color.Grey.94
  colorAliasNeutralBackground4Hover: grey[98], // #fafafa Global.Color.Grey.98
  colorAliasNeutralBackground4Pressed: grey[96], // #f5f5f5 Global.Color.Grey.96
  colorAliasNeutralBackground4Selected: white, // #ffffff Global.Color.White
  colorAliasNeutralBackground5: grey[92], // #ebebeb Global.Color.Grey.92
  colorAliasNeutralBackground5Hover: grey[96], // #f5f5f5 Global.Color.Grey.96
  colorAliasNeutralBackground5Pressed: grey[94], // #f0f0f0 Global.Color.Grey.94
  colorAliasNeutralBackground5Selected: grey[98], // #fafafa Global.Color.Grey.98
  colorAliasNeutralBackground6: grey[90], // #e6e6e6 Global.Color.Grey.90
  colorAliasNeutralBackgroundInverted: grey[38], // #616161 Global.Color.Grey.38
  colorAliasSubtleBackground: 'transparent', // transparent undefined
  colorAliasSubtleBackgroundHover: grey[96], // #f5f5f5 Global.Color.Grey.96
  colorAliasSubtleBackgroundPressed: grey[88], // #e0e0e0 Global.Color.Grey.88
  colorAliasSubtleBackgroundSelected: grey[92], // #ebebeb Global.Color.Grey.92
  colorAliasTransparentBackground: 'transparent', // transparent undefined
  colorAliasTransparentBackgroundHover: 'transparent', // transparent undefined
  colorAliasTransparentBackgroundPressed: 'transparent', // transparent undefined
  colorAliasTransparentBackgroundSelected: 'transparent', // transparent undefined
  colorAliasNeutralBackgroundDisabled: grey[94], // #f0f0f0 Global.Color.Grey.94
  colorAliasNeutralStencil1: grey[90], // #e6e6e6 Global.Color.Grey.90
  colorAliasNeutralStencil2: grey[98], // #fafafa Global.Color.Grey.98
  colorAliasBrandBackground: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasBrandBackgroundHover: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorAliasBrandBackgroundPressed: brand.shade40, // #004578 Global.Color.Brand.Shade.40
  colorAliasBrandBackgroundSelected: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorAliasCompoundBrandBackground: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasCompoundBrandBackgroundHover: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorAliasCompoundBrandBackgroundPressed: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorAliasBrandBackgroundStatic: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasBrandBackground2: brand.tint60, // #eff6fc Global.Color.Brand.Tint.60
  colorAliasNeutralStrokeAccessible: grey[38], // #616161 Global.Color.Grey.38
  colorAliasNeutralStrokeAccessibleHover: grey[34], // #575757 Global.Color.Grey.34
  colorAliasNeutralStrokeAccessiblePressed: grey[30], // #4d4d4d Global.Color.Grey.30
  colorAliasNeutralStrokeAccessibleSelected: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasNeutralStroke1: grey[82], // #d1d1d1 Global.Color.Grey.82
  colorAliasNeutralStroke1Hover: grey[78], // #c7c7c7 Global.Color.Grey.78
  colorAliasNeutralStroke1Pressed: grey[70], // #b3b3b3 Global.Color.Grey.70
  colorAliasNeutralStroke1Selected: grey[74], // #bdbdbd Global.Color.Grey.74
  colorAliasNeutralStroke2: grey[88], // #e0e0e0 Global.Color.Grey.88
  colorAliasNeutralStroke3: grey[94], // #f0f0f0 Global.Color.Grey.94
  colorAliasBrandStroke1: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasBrandStroke2: brand.tint40, // #c7e0f4 Global.Color.Brand.Tint.40
  colorAliasCompoundBrandStroke: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasCompoundBrandStrokeHover: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorAliasCompoundBrandStrokePressed: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorAliasNeutralStrokeDisabled: grey[88], // #e0e0e0 Global.Color.Grey.88
  colorAliasTransparentStroke: 'transparent', // transparent undefined
  colorAliasTransparentStrokeInteractive: 'transparent', // transparent undefined
  colorAliasTransparentStrokeDisabled: 'transparent', // transparent undefined
  colorAliasStrokeFocus1: white, // #ffffff Global.Color.White
  colorAliasStrokeFocus2: black, // #000000 Global.Color.Black
  colorAliasNeutralShadowAmbient: 'rgba(0,0,0,0.12)', // rgba(0,0,0,0.12) undefined
  colorAliasNeutralShadowKey: 'rgba(0,0,0,0.14)', // rgba(0,0,0,0.14) undefined
  colorAliasNeutralShadowAmbientLighter: 'rgba(0,0,0,0.06)', // rgba(0,0,0,0.06) undefined
  colorAliasNeutralShadowKeyLighter: 'rgba(0,0,0,0.07)', // rgba(0,0,0,0.07) undefined
  colorAliasNeutralShadowAmbientDarker: 'rgba(0,0,0,0.20)', // rgba(0,0,0,0.20) undefined
  colorAliasNeutralShadowKeyDarker: 'rgba(0,0,0,0.24)', // rgba(0,0,0,0.24) undefined
  colorAliasBrandShadowAmbient: 'rgba(0,0,0,0.30)', // rgba(0,0,0,0.30) undefined
  colorAliasBrandShadowKey: 'rgba(0,0,0,0.25)', // rgba(0,0,0,0.25) undefined
});

export const sharedColorTokens: SharedColorTokens = (Object.keys(sharedColors) as Array<
  keyof GlobalSharedColors
>).reduce((acc, sharedColor) => {
  const color: GlobalSharedColorsT = (sharedColor.slice(0, 1).toUpperCase() +
    sharedColor.slice(1)) as GlobalSharedColorsT;
  const sharedColorTokens: Partial<Record<SharedColorT<GlobalSharedColorsT>, string>> = {
    [`color${color}Background1`]: sharedColors[sharedColor].tint60,
    [`color${color}Background2`]: sharedColors[sharedColor].tint40,
    [`color${color}Background3`]: sharedColors[sharedColor].primary,
    [`color${color}Foreground1`]: sharedColors[sharedColor].shade10,
    [`color${color}Foreground2`]: sharedColors[sharedColor].shade30,
    [`color${color}Foreground3`]: sharedColors[sharedColor].primary,
    [`color${color}BorderActive`]: sharedColors[sharedColor].primary,
    [`color${color}Border2`]: sharedColors[sharedColor].primary,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as SharedColorTokens);
