import { GlobalSharedColors, NeutralColorTokens, SharedColorTokens } from '../types';

export const neutralColorTokens: NeutralColorTokens = {
  neutralForeground1: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForeground2: 'var(--global-palette-grey-84)', // #d6d6d6 Global.Color.Grey.84
  neutralForeground2Hover: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForeground2Pressed: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForeground2Selected: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForeground2BrandHover: 'var(--global-palette-brand-tint20)', // #3aa0f3 Global.Color.Brand.Tint.20
  neutralForeground2BrandPressed: 'var(--global-palette-brand-tint10)', // #2899f5 Global.Color.Brand.Tint.10
  neutralForeground2BrandSelected: 'var(--global-palette-brand-tint20)', // #3aa0f3 Global.Color.Brand.Tint.20
  neutralForeground3: 'var(--global-palette-grey-68)', // #adadad Global.Color.Grey.68
  neutralForeground3Hover: 'var(--global-palette-grey-84)', // #d6d6d6 Global.Color.Grey.84
  neutralForeground3Pressed: 'var(--global-palette-grey-84)', // #d6d6d6 Global.Color.Grey.84
  neutralForeground3Selected: 'var(--global-palette-grey-84)', // #d6d6d6 Global.Color.Grey.84
  neutralForeground3BrandHover: 'var(--global-palette-brand-tint20)', // #3aa0f3 Global.Color.Brand.Tint.20
  neutralForeground3BrandPressed: 'var(--global-palette-brand-tint10)', // #2899f5 Global.Color.Brand.Tint.10
  neutralForeground3BrandSelected: 'var(--global-palette-brand-tint20)', // #3aa0f3 Global.Color.Brand.Tint.20
  neutralForeground4: 'var(--global-palette-grey-52)', // #858585 Global.Color.Grey.52
  neutralForegroundDisabled: 'var(--global-palette-grey-36)', // #5c5c5c Global.Color.Grey.36
  brandForegroundLink: 'var(--global-palette-brand-tint10)', // #2899f5 Global.Color.Brand.Tint.10
  brandForegroundLinkHover: 'var(--global-palette-brand-tint30)', // #6cb8f6 Global.Color.Brand.Tint.30
  brandForegroundLinkPressed: 'var(--global-palette-brand-tint20)', // #3aa0f3 Global.Color.Brand.Tint.20
  brandForegroundLinkSelected: 'var(--global-palette-brand-tint10)', // #2899f5 Global.Color.Brand.Tint.10
  compoundBrandForeground1: 'var(--global-palette-brand-tint10)', // #2899f5 Global.Color.Brand.Tint.10
  compoundBrandForeground1Hover: 'var(--global-palette-brand-tint20)', // #3aa0f3 Global.Color.Brand.Tint.20
  compoundBrandForeground1Pressed: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  brandForeground1: 'var(--global-palette-brand-tint20)', // #3aa0f3 Global.Color.Brand.Tint.20
  brandForeground2: 'var(--global-palette-brand-tint30)', // #6cb8f6 Global.Color.Brand.Tint.30
  neutralForegroundInverted: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForegroundInvertedAccessible: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForegroundInvertedLink: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForegroundInvertedLinkHover: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForegroundInvertedLinkPressed: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralForegroundInvertedLinkSelected: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralBackground1: 'var(--global-palette-grey-16)', // #292929 Global.Color.Grey.16
  neutralBackground1Hover: 'var(--global-palette-grey-24)', // #3d3d3d Global.Color.Grey.24
  neutralBackground1Pressed: 'var(--global-palette-grey-12)', // #1f1f1f Global.Color.Grey.12
  neutralBackground1Selected: 'var(--global-palette-grey-22)', // #383838 Global.Color.Grey.22
  neutralBackground2: 'var(--global-palette-grey-14)', // #242424 Global.Color.Grey.14
  neutralBackground2Hover: 'var(--global-palette-grey-22)', // #383838 Global.Color.Grey.22
  neutralBackground2Pressed: 'var(--global-palette-grey-10)', // #1a1a1a Global.Color.Grey.10
  neutralBackground2Selected: 'var(--global-palette-grey-20)', // #333333 Global.Color.Grey.20
  neutralBackground3: 'var(--global-palette-grey-12)', // #1f1f1f Global.Color.Grey.12
  neutralBackground3Hover: 'var(--global-palette-grey-20)', // #333333 Global.Color.Grey.20
  neutralBackground3Pressed: 'var(--global-palette-grey-8)', // #141414 Global.Color.Grey.8
  neutralBackground3Selected: 'var(--global-palette-grey-18)', // #2e2e2e Global.Color.Grey.18
  neutralBackground4: 'var(--global-palette-grey-8)', // #141414 Global.Color.Grey.8
  neutralBackground4Hover: 'var(--global-palette-grey-16)', // #292929 Global.Color.Grey.16
  neutralBackground4Pressed: 'var(--global-palette-grey-4)', // #0a0a0a Global.Color.Grey.4
  neutralBackground4Selected: 'var(--global-palette-grey-14)', // #242424 Global.Color.Grey.14
  neutralBackground5: 'var(--global-palette-grey-4)', // #0a0a0a Global.Color.Grey.4
  neutralBackground5Hover: 'var(--global-palette-grey-12)', // #1f1f1f Global.Color.Grey.12
  neutralBackground5Pressed: 'var(--global-color-black)', // #000000 Global.Color.Black
  neutralBackground5Selected: 'var(--global-palette-grey-10)', // #1a1a1a Global.Color.Grey.10
  neutralBackground6: 'var(--global-palette-grey-20)', // #333333 Global.Color.Grey.20
  subtleBackground: 'transparent', // transparent undefined
  subtleBackgroundHover: 'var(--global-palette-grey-22)', // #383838 Global.Color.Grey.22
  subtleBackgroundPressed: 'var(--global-palette-grey-18)', // #2e2e2e Global.Color.Grey.18
  subtleBackgroundSelected: 'var(--global-palette-grey-20)', // #333333 Global.Color.Grey.20
  transparentBackground: 'transparent', // transparent undefined
  transparentBackgroundHover: 'transparent', // transparent undefined
  transparentBackgroundPressed: 'transparent', // transparent undefined
  transparentBackgroundSelected: 'transparent', // transparent undefined
  neutralBackgroundDisabled: 'var(--global-palette-grey-8)', // #141414 Global.Color.Grey.8
  brandBackground: 'var(--global-palette-brand-shade10)', // #106ebe Global.Color.Brand.Shade.10
  brandBackgroundHover: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  brandBackgroundPressed: 'var(--global-palette-brand-shade40)', // #004578 Global.Color.Brand.Shade.40
  brandBackgroundSelected: 'var(--global-palette-brand-shade20)', // #005a9e Global.Color.Brand.Shade.20
  compoundBrandBackground: 'var(--global-palette-brand-tint10)', // #2899f5 Global.Color.Brand.Tint.10
  compoundBrandBackgroundHover: 'var(--global-palette-brand-tint20)', // #3aa0f3 Global.Color.Brand.Tint.20
  compoundBrandBackgroundPressed: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  brandBackgroundStatic: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  brandBackground2: 'var(--global-palette-brand-shade40)', // #004578 Global.Color.Brand.Shade.40
  neutralStrokeAccessible: 'var(--global-palette-grey-68)', // #adadad Global.Color.Grey.68
  neutralStrokeAccessibleHover: 'var(--global-palette-grey-74)', // #bdbdbd Global.Color.Grey.74
  neutralStrokeAccessiblePressed: 'var(--global-palette-grey-70)', // #b3b3b3 Global.Color.Grey.70
  neutralStrokeAccessibleSelected: 'var(--global-palette-brand-tint20)', // #3aa0f3 Global.Color.Brand.Tint.20
  neutralStroke1: 'var(--global-palette-grey-40)', // #666666 Global.Color.Grey.40
  neutralStroke1Hover: 'var(--global-palette-grey-46)', // #757575 Global.Color.Grey.46
  neutralStroke1Pressed: 'var(--global-palette-grey-42)', // #6b6b6b Global.Color.Grey.42
  neutralStroke1Selected: 'var(--global-palette-grey-44)', // #707070 Global.Color.Grey.44
  neutralStroke2: 'var(--global-palette-grey-32)', // #525252 Global.Color.Grey.32
  neutralStroke3: 'var(--global-palette-grey-24)', // #3d3d3d Global.Color.Grey.24
  brandStroke1: 'var(--global-palette-brand-tint10)', // #2899f5 Global.Color.Brand.Tint.10
  brandStroke2: 'var(--global-palette-brand-shade30)', // #004c87 Global.Color.Brand.Shade.30
  compoundBrandStroke: 'var(--global-palette-brand-tint10)', // #2899f5 Global.Color.Brand.Tint.10
  compoundBrandStrokeHover: 'var(--global-palette-brand-tint20)', // #3aa0f3 Global.Color.Brand.Tint.20
  compoundBrandStrokePressed: 'var(--global-palette-brand-primary)', // #106ebe Global.Color.Brand.Primary
  neutralStrokeDisabled: 'var(--global-palette-grey-26)', // #424242 Global.Color.Grey.26
  strokeAccessible: 'transparent', // transparent undefined
  strokeAccessibleInteractive: 'transparent', // transparent undefined
  strokeAccessibleDisabled: 'transparent', // transparent undefined
  strokeFocus1: 'var(--global-color-black)', // #000000 Global.Color.Black
  strokeFocus2: 'var(--global-color-white)', // #ffffff Global.Color.White
  neutralShadowAmbient: 'rgba(0,0,0,0.24)', // rgba(0,0,0,0.24) undefined
  neutralShadowKey: 'rgba(0,0,0,0.28)', // rgba(0,0,0,0.28) undefined
  neutralShadowAmbientLighter: 'rgba(0,0,0,0.12)', // rgba(0,0,0,0.12) undefined
  neutralShadowKeyLighter: 'rgba(0,0,0,0.14)', // rgba(0,0,0,0.14) undefined
  neutralShadowAmbientDarker: 'rgba(0,0,0,0.40)', // rgba(0,0,0,0.40) undefined
  neutralShadowKeyDarker: 'rgba(0,0,0,0.48)', // rgba(0,0,0,0.48) undefined
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
        background1: `var(--global-palette-${sharedColor}-shade40)`,
        background2: `var(--global-palette-${sharedColor}-shade30)`,
        background3: `var(--global-palette-${sharedColor}-primary)`,
        foreground1: `var(--global-palette-${sharedColor}-tint30)`,
        foreground2: `var(--global-palette-${sharedColor}-tint40)`,
        foreground3: `var(--global-palette-${sharedColor}-tint20)`,
        borderActive: `var(--global-palette-${sharedColor}-tint30)`,
        border2: `var(--global-palette-${sharedColor}-tint20)`,
      };
      return acc;
    }, {} as Record<keyof GlobalSharedColors, SharedColorTokens>);
};
