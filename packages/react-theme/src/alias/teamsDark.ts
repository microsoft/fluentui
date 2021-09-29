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
  colorAliasNeutralForeground1: white, // #ffffff Global.Color.White
  colorAliasNeutralForeground2: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorAliasNeutralForeground2Hover: white, // #ffffff Global.Color.White
  colorAliasNeutralForeground2Pressed: white, // #ffffff Global.Color.White
  colorAliasNeutralForeground2Selected: white, // #ffffff Global.Color.White
  colorAliasNeutralForeground2BrandHover: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorAliasNeutralForeground2BrandPressed: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorAliasNeutralForeground2BrandSelected: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorAliasNeutralForeground3: grey[68], // #adadad Global.Color.Grey.68
  colorAliasNeutralForeground3Hover: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorAliasNeutralForeground3Pressed: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorAliasNeutralForeground3Selected: grey[84], // #d6d6d6 Global.Color.Grey.84
  colorAliasNeutralForeground3BrandHover: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorAliasNeutralForeground3BrandPressed: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorAliasNeutralForeground3BrandSelected: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorAliasNeutralForeground4: grey[60], // #999999 Global.Color.Grey.60
  colorAliasNeutralForegroundDisabled: grey[36], // #5c5c5c Global.Color.Grey.36
  colorAliasBrandForegroundLink: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorAliasBrandForegroundLinkHover: brand.tint30, // #6cb8f6 Global.Color.Brand.Tint.30
  colorAliasBrandForegroundLinkPressed: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorAliasBrandForegroundLinkSelected: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorAliasCompoundBrandForeground1: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorAliasCompoundBrandForeground1Hover: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorAliasCompoundBrandForeground1Pressed: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasBrandForeground1: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorAliasBrandForeground2: brand.tint30, // #6cb8f6 Global.Color.Brand.Tint.30
  colorAliasNeutralForegroundInverted: white, // #ffffff Global.Color.White
  colorAliasNeutralForegroundOnBrand: white, // #ffffff Global.Color.White
  colorAliasNeutralForegroundInvertedLink: white, // #ffffff Global.Color.White
  colorAliasNeutralForegroundInvertedLinkHover: white, // #ffffff Global.Color.White
  colorAliasNeutralForegroundInvertedLinkPressed: white, // #ffffff Global.Color.White
  colorAliasNeutralForegroundInvertedLinkSelected: white, // #ffffff Global.Color.White
  colorAliasNeutralBackground1: grey[16], // #292929 Global.Color.Grey.16
  colorAliasNeutralBackground1Hover: grey[24], // #3d3d3d Global.Color.Grey.24
  colorAliasNeutralBackground1Pressed: grey[12], // #1f1f1f Global.Color.Grey.12
  colorAliasNeutralBackground1Selected: grey[22], // #383838 Global.Color.Grey.22
  colorAliasNeutralBackground2: grey[14], // #242424 Global.Color.Grey.14
  colorAliasNeutralBackground2Hover: grey[22], // #383838 Global.Color.Grey.22
  colorAliasNeutralBackground2Pressed: grey[10], // #1a1a1a Global.Color.Grey.10
  colorAliasNeutralBackground2Selected: grey[20], // #333333 Global.Color.Grey.20
  colorAliasNeutralBackground3: grey[12], // #1f1f1f Global.Color.Grey.12
  colorAliasNeutralBackground3Hover: grey[20], // #333333 Global.Color.Grey.20
  colorAliasNeutralBackground3Pressed: grey[8], // #141414 Global.Color.Grey.8
  colorAliasNeutralBackground3Selected: grey[18], // #2e2e2e Global.Color.Grey.18
  colorAliasNeutralBackground4: grey[8], // #141414 Global.Color.Grey.8
  colorAliasNeutralBackground4Hover: grey[16], // #292929 Global.Color.Grey.16
  colorAliasNeutralBackground4Pressed: grey[4], // #0a0a0a Global.Color.Grey.4
  colorAliasNeutralBackground4Selected: grey[14], // #242424 Global.Color.Grey.14
  colorAliasNeutralBackground5: grey[4], // #0a0a0a Global.Color.Grey.4
  colorAliasNeutralBackground5Hover: grey[12], // #1f1f1f Global.Color.Grey.12
  colorAliasNeutralBackground5Pressed: black, // #000000 Global.Color.Black
  colorAliasNeutralBackground5Selected: grey[10], // #1a1a1a Global.Color.Grey.10
  colorAliasNeutralBackground6: grey[20], // #333333 Global.Color.Grey.20
  colorAliasNeutralBackgroundInverted: white, // #ffffff Global.Color.White
  colorAliasSubtleBackground: 'transparent', // transparent undefined
  colorAliasSubtleBackgroundHover: grey[22], // #383838 Global.Color.Grey.22
  colorAliasSubtleBackgroundPressed: grey[18], // #2e2e2e Global.Color.Grey.18
  colorAliasSubtleBackgroundSelected: grey[20], // #333333 Global.Color.Grey.20
  colorAliasTransparentBackground: 'transparent', // transparent undefined
  colorAliasTransparentBackgroundHover: 'transparent', // transparent undefined
  colorAliasTransparentBackgroundPressed: 'transparent', // transparent undefined
  colorAliasTransparentBackgroundSelected: 'transparent', // transparent undefined
  colorAliasNeutralBackgroundDisabled: grey[8], // #141414 Global.Color.Grey.8
  colorAliasNeutralStencil1: grey[20], // #333333 Global.Color.Grey.20
  colorAliasNeutralStencil2: grey[34], // #575757 Global.Color.Grey.34
  colorAliasBrandBackground: brand.shade10, // #106ebe Global.Color.Brand.Shade.10
  colorAliasBrandBackgroundHover: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasBrandBackgroundPressed: brand.shade40, // #004578 Global.Color.Brand.Shade.40
  colorAliasBrandBackgroundSelected: brand.shade20, // #005a9e Global.Color.Brand.Shade.20
  colorAliasCompoundBrandBackground: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorAliasCompoundBrandBackgroundHover: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorAliasCompoundBrandBackgroundPressed: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasBrandBackgroundStatic: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasBrandBackground2: brand.shade40, // #004578 Global.Color.Brand.Shade.40
  colorAliasNeutralStrokeAccessible: grey[68], // #adadad Global.Color.Grey.68
  colorAliasNeutralStrokeAccessibleHover: grey[74], // #bdbdbd Global.Color.Grey.74
  colorAliasNeutralStrokeAccessiblePressed: grey[70], // #b3b3b3 Global.Color.Grey.70
  colorAliasNeutralStrokeAccessibleSelected: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorAliasNeutralStroke1: grey[40], // #666666 Global.Color.Grey.40
  colorAliasNeutralStroke1Hover: grey[46], // #757575 Global.Color.Grey.46
  colorAliasNeutralStroke1Pressed: grey[42], // #6b6b6b Global.Color.Grey.42
  colorAliasNeutralStroke1Selected: grey[44], // #707070 Global.Color.Grey.44
  colorAliasNeutralStroke2: grey[32], // #525252 Global.Color.Grey.32
  colorAliasNeutralStroke3: grey[24], // #3d3d3d Global.Color.Grey.24
  colorAliasBrandStroke1: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorAliasBrandStroke2: brand.shade30, // #004c87 Global.Color.Brand.Shade.30
  colorAliasCompoundBrandStroke: brand.tint10, // #2899f5 Global.Color.Brand.Tint.10
  colorAliasCompoundBrandStrokeHover: brand.tint20, // #3aa0f3 Global.Color.Brand.Tint.20
  colorAliasCompoundBrandStrokePressed: brand.primary, // #106ebe Global.Color.Brand.Primary
  colorAliasNeutralStrokeDisabled: grey[26], // #424242 Global.Color.Grey.26
  colorAliasTransparentStroke: 'transparent', // transparent undefined
  colorAliasTransparentStrokeInteractive: 'transparent', // transparent undefined
  colorAliasTransparentStrokeDisabled: 'transparent', // transparent undefined
  colorAliasStrokeFocus1: black, // #000000 Global.Color.Black
  colorAliasStrokeFocus2: white, // #ffffff Global.Color.White
  colorAliasNeutralShadowAmbient: 'rgba(0,0,0,0.24)', // rgba(0,0,0,0.24) undefined
  colorAliasNeutralShadowKey: 'rgba(0,0,0,0.28)', // rgba(0,0,0,0.28) undefined
  colorAliasNeutralShadowAmbientLighter: 'rgba(0,0,0,0.12)', // rgba(0,0,0,0.12) undefined
  colorAliasNeutralShadowKeyLighter: 'rgba(0,0,0,0.14)', // rgba(0,0,0,0.14) undefined
  colorAliasNeutralShadowAmbientDarker: 'rgba(0,0,0,0.40)', // rgba(0,0,0,0.40) undefined
  colorAliasNeutralShadowKeyDarker: 'rgba(0,0,0,0.48)', // rgba(0,0,0,0.48) undefined
  colorAliasBrandShadowAmbient: 'rgba(0,0,0,0.30)', // rgba(0,0,0,0.30) undefined
  colorAliasBrandShadowKey: 'rgba(0,0,0,0.25)', // rgba(0,0,0,0.25) undefined
});

export const sharedColorTokens: SharedColorTokens = (Object.keys(sharedColors) as Array<
  keyof GlobalSharedColors
>).reduce((acc, sharedColor) => {
  const color: GlobalSharedColorsT = (sharedColor.slice(0, 1).toUpperCase() +
    sharedColor.slice(1)) as GlobalSharedColorsT;
  const sharedColorTokens: Partial<Record<SharedColorT<GlobalSharedColorsT>, string>> = {
    [`color${color}Background1`]: sharedColors[sharedColor].shade40,
    [`color${color}Background2`]: sharedColors[sharedColor].shade30,
    [`color${color}Background3`]: sharedColors[sharedColor].primary,
    [`color${color}Foreground1`]: sharedColors[sharedColor].tint30,
    [`color${color}Foreground2`]: sharedColors[sharedColor].tint40,
    [`color${color}Foreground3`]: sharedColors[sharedColor].tint20,
    [`color${color}BorderActive`]: sharedColors[sharedColor].tint30,
    [`color${color}Border2`]: sharedColors[sharedColor].tint20,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as SharedColorTokens);
