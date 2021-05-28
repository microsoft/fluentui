import { GlobalSharedColors, NeutralColorTokens, SharedColorTokens } from '../../types';

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
  neutralShadowAmbient: 'rgba (0,0,0,0.24)', // rgba (0,0,0,0.24) undefined
  neutralShadowKey: 'rgba (0,0,0,0.28)', // rgba (0,0,0,0.28) undefined
  neutralShadowAmbientLighter: 'rgba (0,0,0,0.12)', // rgba (0,0,0,0.12) undefined
  neutralShadowKeyLighter: 'rgba (0,0,0,0.14)', // rgba (0,0,0,0.14) undefined
  neutralShadowAmbientDarker: 'rgba (0,0,0,0.40)', // rgba (0,0,0,0.40) undefined
  neutralShadowKeyDarker: 'rgba (0,0,0,0.48)', // rgba (0,0,0,0.48) undefined
  brandShadowAmbient: 'rgba (0,0,0,0.30)', // rgba (0,0,0,0.30) undefined
  brandShadowKey: 'rgba (0,0,0,0.25)', // rgba (0,0,0,0.25) undefined
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

export const sharedColorTokens: Record<keyof GlobalSharedColors, SharedColorTokens> = {
  darkRed: {
    background1: 'var(--global-palette-darkRed-shade40)', // #230308 Global.Color.DarkRed.Shade40
    background2: 'var(--global-palette-darkRed-shade30)', // #420610 Global.Color.DarkRed.Shade30
    background3: 'var(--global-palette-darkRed-primary)', // #750b1c Global.Color.DarkRed.Primary
    foreground1: 'var(--global-palette-darkRed-tint30)', // #ac4f5e Global.Color.DarkRed.Tint30
    foreground2: 'var(--global-palette-darkRed-tint40)', // #d69ca5 Global.Color.DarkRed.Tint40
    foreground3: 'var(--global-palette-darkRed-tint20)', // #962f3f Global.Color.DarkRed.Tint20
    borderActive: 'var(--global-palette-darkRed-tint30)', // #ac4f5e Global.Color.DarkRed.Tint30
    border2: 'var(--global-palette-darkRed-tint20)', // #962f3f Global.Color.DarkRed.Tint20
  },
  burgundy: {
    background1: 'var(--global-palette-burgundy-shade40)', // #310b0d Global.Color.Burgundy.Shade40
    background2: 'var(--global-palette-burgundy-shade30)', // #5c1519 Global.Color.Burgundy.Shade30
    background3: 'var(--global-palette-burgundy-primary)', // #a4262c Global.Color.Burgundy.Primary
    foreground1: 'var(--global-palette-burgundy-tint30)', // #c86c70 Global.Color.Burgundy.Tint30
    foreground2: 'var(--global-palette-burgundy-tint40)', // #e4afb2 Global.Color.Burgundy.Tint40
    foreground3: 'var(--global-palette-burgundy-tint20)', // #ba4d52 Global.Color.Burgundy.Tint20
    borderActive: 'var(--global-palette-burgundy-tint30)', // #c86c70 Global.Color.Burgundy.Tint30
    border2: 'var(--global-palette-burgundy-tint20)', // #ba4d52 Global.Color.Burgundy.Tint20
  },
  cranberry: {
    background1: 'var(--global-palette-cranberry-shade40)', // #3b0509 Global.Color.Cranberry.Shade40
    background2: 'var(--global-palette-cranberry-shade30)', // #6e0811 Global.Color.Cranberry.Shade30
    background3: 'var(--global-palette-cranberry-primary)', // #c50f1f Global.Color.Cranberry.Primary
    foreground1: 'var(--global-palette-cranberry-tint30)', // #dc626d Global.Color.Cranberry.Tint30
    foreground2: 'var(--global-palette-cranberry-tint40)', // #eeacb2 Global.Color.Cranberry.Tint40
    foreground3: 'var(--global-palette-cranberry-tint20)', // #d33f4c Global.Color.Cranberry.Tint20
    borderActive: 'var(--global-palette-cranberry-tint30)', // #dc626d Global.Color.Cranberry.Tint30
    border2: 'var(--global-palette-cranberry-tint20)', // #d33f4c Global.Color.Cranberry.Tint20
  },
  red: {
    background1: 'var(--global-palette-red-shade40)', // #3f1011 Global.Color.Red.Shade40
    background2: 'var(--global-palette-red-shade30)', // #751d1f Global.Color.Red.Shade30
    background3: 'var(--global-palette-red-primary)', // #d13438 Global.Color.Red.Primary
    foreground1: 'var(--global-palette-red-tint30)', // #e37d80 Global.Color.Red.Tint30
    foreground2: 'var(--global-palette-red-tint40)', // #f1bbbc Global.Color.Red.Tint40
    foreground3: 'var(--global-palette-red-tint20)', // #dc5e62 Global.Color.Red.Tint20
    borderActive: 'var(--global-palette-red-tint30)', // #e37d80 Global.Color.Red.Tint30
    border2: 'var(--global-palette-red-tint20)', // #dc5e62 Global.Color.Red.Tint20
  },
  darkOrange: {
    background1: 'var(--global-palette-darkOrange-shade40)', // #411200 Global.Color.DarkOrange.Shade40
    background2: 'var(--global-palette-darkOrange-shade30)', // #7a2101 Global.Color.DarkOrange.Shade30
    background3: 'var(--global-palette-darkOrange-primary)', // #da3b01 Global.Color.DarkOrange.Primary
    foreground1: 'var(--global-palette-darkOrange-tint30)', // #e9835e Global.Color.DarkOrange.Tint30
    foreground2: 'var(--global-palette-darkOrange-tint40)', // #f4bfab Global.Color.DarkOrange.Tint40
    foreground3: 'var(--global-palette-darkOrange-tint20)', // #e36537 Global.Color.DarkOrange.Tint20
    borderActive: 'var(--global-palette-darkOrange-tint30)', // #e9835e Global.Color.DarkOrange.Tint30
    border2: 'var(--global-palette-darkOrange-tint20)', // #e36537 Global.Color.DarkOrange.Tint20
  },
  bronze: {
    background1: 'var(--global-palette-bronze-shade40)', // #321303 Global.Color.Bronze.Shade40
    background2: 'var(--global-palette-bronze-shade30)', // #5e2405 Global.Color.Bronze.Shade30
    background3: 'var(--global-palette-bronze-primary)', // #a74109 Global.Color.Bronze.Primary
    foreground1: 'var(--global-palette-bronze-tint30)', // #ca8057 Global.Color.Bronze.Tint30
    foreground2: 'var(--global-palette-bronze-tint40)', // #e5bba4 Global.Color.Bronze.Tint40
    foreground3: 'var(--global-palette-bronze-tint20)', // #bc6535 Global.Color.Bronze.Tint20
    borderActive: 'var(--global-palette-bronze-tint30)', // #ca8057 Global.Color.Bronze.Tint30
    border2: 'var(--global-palette-bronze-tint20)', // #bc6535 Global.Color.Bronze.Tint20
  },
  pumpkin: {
    background1: 'var(--global-palette-pumpkin-shade40)', // #3d1805 Global.Color.Pumpkin.Shade40
    background2: 'var(--global-palette-pumpkin-shade30)', // #712d09 Global.Color.Pumpkin.Shade30
    background3: 'var(--global-palette-pumpkin-primary)', // #ca5010 Global.Color.Pumpkin.Primary
    foreground1: 'var(--global-palette-pumpkin-tint30)', // #df8e64 Global.Color.Pumpkin.Tint30
    foreground2: 'var(--global-palette-pumpkin-tint40)', // #efc4ad Global.Color.Pumpkin.Tint40
    foreground3: 'var(--global-palette-pumpkin-tint20)', // #d77440 Global.Color.Pumpkin.Tint20
    borderActive: 'var(--global-palette-pumpkin-tint30)', // #df8e64 Global.Color.Pumpkin.Tint30
    border2: 'var(--global-palette-pumpkin-tint20)', // #d77440 Global.Color.Pumpkin.Tint20
  },
  orange: {
    background1: 'var(--global-palette-orange-shade40)', // #4a1e04 Global.Color.Orange.Shade40
    background2: 'var(--global-palette-orange-shade30)', // #8a3707 Global.Color.Orange.Shade30
    background3: 'var(--global-palette-orange-primary)', // #f7630c Global.Color.Orange.Primary
    foreground1: 'var(--global-palette-orange-tint30)', // #faa06b Global.Color.Orange.Tint30
    foreground2: 'var(--global-palette-orange-tint40)', // #fdcfb4 Global.Color.Orange.Tint40
    foreground3: 'var(--global-palette-orange-tint20)', // #f98845 Global.Color.Orange.Tint20
    borderActive: 'var(--global-palette-orange-tint30)', // #faa06b Global.Color.Orange.Tint30
    border2: 'var(--global-palette-orange-tint20)', // #f98845 Global.Color.Orange.Tint20
  },
  peach: {
    background1: 'var(--global-palette-peach-shade40)', // #4d2a00 Global.Color.Peach.Shade40
    background2: 'var(--global-palette-peach-shade30)', // #8f4e00 Global.Color.Peach.Shade30
    background3: 'var(--global-palette-peach-primary)', // #ff8c00 Global.Color.Peach.Primary
    foreground1: 'var(--global-palette-peach-tint30)', // #ffba66 Global.Color.Peach.Tint30
    foreground2: 'var(--global-palette-peach-tint40)', // #ffddb3 Global.Color.Peach.Tint40
    foreground3: 'var(--global-palette-peach-tint20)', // #ffa83d Global.Color.Peach.Tint20
    borderActive: 'var(--global-palette-peach-tint30)', // #ffba66 Global.Color.Peach.Tint30
    border2: 'var(--global-palette-peach-tint20)', // #ffa83d Global.Color.Peach.Tint20
  },
  marigold: {
    background1: 'var(--global-palette-marigold-shade40)', // #463100 Global.Color.Marigold.Shade40
    background2: 'var(--global-palette-marigold-shade30)', // #835b00 Global.Color.Marigold.Shade30
    background3: 'var(--global-palette-marigold-primary)', // #eaa300 Global.Color.Marigold.Primary
    foreground1: 'var(--global-palette-marigold-tint30)', // #f2c661 Global.Color.Marigold.Tint30
    foreground2: 'var(--global-palette-marigold-tint40)', // #f9e2ae Global.Color.Marigold.Tint40
    foreground3: 'var(--global-palette-marigold-tint20)', // #efb839 Global.Color.Marigold.Tint20
    borderActive: 'var(--global-palette-marigold-tint30)', // #f2c661 Global.Color.Marigold.Tint30
    border2: 'var(--global-palette-marigold-tint20)', // #efb839 Global.Color.Marigold.Tint20
  },
  yellow: {
    background1: 'var(--global-palette-yellow-shade40)', // #4c4400 Global.Color.Yellow.Shade40
    background2: 'var(--global-palette-yellow-shade30)', // #8e7f00 Global.Color.Yellow.Shade30
    background3: 'var(--global-palette-yellow-primary)', // #fde300 Global.Color.Yellow.Primary
    foreground1: 'var(--global-palette-yellow-tint30)', // #feee66 Global.Color.Yellow.Tint30
    foreground2: 'var(--global-palette-yellow-tint40)', // #fef7b2 Global.Color.Yellow.Tint40
    foreground3: 'var(--global-palette-yellow-tint20)', // #fdea3d Global.Color.Yellow.Tint20
    borderActive: 'var(--global-palette-yellow-tint30)', // #feee66 Global.Color.Yellow.Tint30
    border2: 'var(--global-palette-yellow-tint20)', // #fdea3d Global.Color.Yellow.Tint20
  },
  gold: {
    background1: 'var(--global-palette-gold-shade40)', // #3a2f00 Global.Color.Gold.Shade40
    background2: 'var(--global-palette-gold-shade30)', // #6c5700 Global.Color.Gold.Shade30
    background3: 'var(--global-palette-gold-primary)', // #c19c00 Global.Color.Gold.Primary
    foreground1: 'var(--global-palette-gold-tint30)', // #dac157 Global.Color.Gold.Tint30
    foreground2: 'var(--global-palette-gold-tint40)', // #ecdfa5 Global.Color.Gold.Tint40
    foreground3: 'var(--global-palette-gold-tint20)', // #d0b232 Global.Color.Gold.Tint20
    borderActive: 'var(--global-palette-gold-tint30)', // #dac157 Global.Color.Gold.Tint30
    border2: 'var(--global-palette-gold-tint20)', // #d0b232 Global.Color.Gold.Tint20
  },
  brass: {
    background1: 'var(--global-palette-brass-shade40)', // #2e2103 Global.Color.Brass.Shade40
    background2: 'var(--global-palette-brass-shade30)', // #553e06 Global.Color.Brass.Shade30
    background3: 'var(--global-palette-brass-primary)', // #986f0b Global.Color.Brass.Primary
    foreground1: 'var(--global-palette-brass-tint30)', // #c1a256 Global.Color.Brass.Tint30
    foreground2: 'var(--global-palette-brass-tint40)', // #e0cea2 Global.Color.Brass.Tint40
    foreground3: 'var(--global-palette-brass-tint20)', // #b18c34 Global.Color.Brass.Tint20
    borderActive: 'var(--global-palette-brass-tint30)', // #c1a256 Global.Color.Brass.Tint30
    border2: 'var(--global-palette-brass-tint20)', // #b18c34 Global.Color.Brass.Tint20
  },
  brown: {
    background1: 'var(--global-palette-brown-shade40)', // #2b1a0e Global.Color.Brown.Shade40
    background2: 'var(--global-palette-brown-shade30)', // #50301a Global.Color.Brown.Shade30
    background3: 'var(--global-palette-brown-primary)', // #8e562e Global.Color.Brown.Primary
    foreground1: 'var(--global-palette-brown-tint30)', // #bb8f6f Global.Color.Brown.Tint30
    foreground2: 'var(--global-palette-brown-tint40)', // #ddc3b0 Global.Color.Brown.Tint40
    foreground3: 'var(--global-palette-brown-tint20)', // #a97652 Global.Color.Brown.Tint20
    borderActive: 'var(--global-palette-brown-tint30)', // #bb8f6f Global.Color.Brown.Tint30
    border2: 'var(--global-palette-brown-tint20)', // #a97652 Global.Color.Brown.Tint20
  },
  darkBrown: {
    background1: 'var(--global-palette-darkBrown-shade40)', // #170c08 Global.Color.DarkBrown.Shade40
    background2: 'var(--global-palette-darkBrown-shade30)', // #2b1710 Global.Color.DarkBrown.Shade30
    background3: 'var(--global-palette-darkBrown-primary)', // #4d291c Global.Color.DarkBrown.Primary
    foreground1: 'var(--global-palette-darkBrown-tint30)', // #946b5c Global.Color.DarkBrown.Tint30
    foreground2: 'var(--global-palette-darkBrown-tint40)', // #caada3 Global.Color.DarkBrown.Tint40
    foreground3: 'var(--global-palette-darkBrown-tint20)', // #784d3e Global.Color.DarkBrown.Tint20
    borderActive: 'var(--global-palette-darkBrown-tint30)', // #946b5c Global.Color.DarkBrown.Tint30
    border2: 'var(--global-palette-darkBrown-tint20)', // #784d3e Global.Color.DarkBrown.Tint20
  },
  lime: {
    background1: 'var(--global-palette-lime-shade40)', // #23330b Global.Color.Lime.Shade40
    background2: 'var(--global-palette-lime-shade30)', // #405f14 Global.Color.Lime.Shade30
    background3: 'var(--global-palette-lime-primary)', // #73aa24 Global.Color.Lime.Primary
    foreground1: 'var(--global-palette-lime-tint30)', // #a4cc6c Global.Color.Lime.Tint30
    foreground2: 'var(--global-palette-lime-tint40)', // #cfe5af Global.Color.Lime.Tint40
    foreground3: 'var(--global-palette-lime-tint20)', // #90be4c Global.Color.Lime.Tint20
    borderActive: 'var(--global-palette-lime-tint30)', // #a4cc6c Global.Color.Lime.Tint30
    border2: 'var(--global-palette-lime-tint20)', // #90be4c Global.Color.Lime.Tint20
  },
  forest: {
    background1: 'var(--global-palette-forest-shade40)', // #162702 Global.Color.Forest.Shade40
    background2: 'var(--global-palette-forest-shade30)', // #294903 Global.Color.Forest.Shade30
    background3: 'var(--global-palette-forest-primary)', // #498205 Global.Color.Forest.Primary
    foreground1: 'var(--global-palette-forest-tint30)', // #85b44c Global.Color.Forest.Tint30
    foreground2: 'var(--global-palette-forest-tint40)', // #bdd99b Global.Color.Forest.Tint40
    foreground3: 'var(--global-palette-forest-tint20)', // #6ba02b Global.Color.Forest.Tint20
    borderActive: 'var(--global-palette-forest-tint30)', // #85b44c Global.Color.Forest.Tint30
    border2: 'var(--global-palette-forest-tint20)', // #6ba02b Global.Color.Forest.Tint20
  },
  seafoam: {
    background1: 'var(--global-palette-seafoam-shade40)', // #003d20 Global.Color.Seafoam.Shade40
    background2: 'var(--global-palette-seafoam-shade30)', // #00723b Global.Color.Seafoam.Shade30
    background3: 'var(--global-palette-seafoam-primary)', // #00cc6a Global.Color.Seafoam.Primary
    foreground1: 'var(--global-palette-seafoam-tint30)', // #5ae0a0 Global.Color.Seafoam.Tint30
    foreground2: 'var(--global-palette-seafoam-tint40)', // #a8f0cd Global.Color.Seafoam.Tint40
    foreground3: 'var(--global-palette-seafoam-tint20)', // #34d889 Global.Color.Seafoam.Tint20
    borderActive: 'var(--global-palette-seafoam-tint30)', // #5ae0a0 Global.Color.Seafoam.Tint30
    border2: 'var(--global-palette-seafoam-tint20)', // #34d889 Global.Color.Seafoam.Tint20
  },
  lightGreen: {
    background1: 'var(--global-palette-lightGreen-shade40)', // #063004 Global.Color.LightGreen.Shade40
    background2: 'var(--global-palette-lightGreen-shade30)', // #0b5a08 Global.Color.LightGreen.Shade30
    background3: 'var(--global-palette-lightGreen-primary)', // #13a10e Global.Color.LightGreen.Primary
    foreground1: 'var(--global-palette-lightGreen-tint30)', // #5ec75a Global.Color.LightGreen.Tint30
    foreground2: 'var(--global-palette-lightGreen-tint40)', // #a7e3a5 Global.Color.LightGreen.Tint40
    foreground3: 'var(--global-palette-lightGreen-tint20)', // #3db838 Global.Color.LightGreen.Tint20
    borderActive: 'var(--global-palette-lightGreen-tint30)', // #5ec75a Global.Color.LightGreen.Tint30
    border2: 'var(--global-palette-lightGreen-tint20)', // #3db838 Global.Color.LightGreen.Tint20
  },
  green: {
    background1: 'var(--global-palette-green-shade40)', // #052505 Global.Color.Green.Shade40
    background2: 'var(--global-palette-green-shade30)', // #094509 Global.Color.Green.Shade30
    background3: 'var(--global-palette-green-primary)', // #107c10 Global.Color.Green.Primary
    foreground1: 'var(--global-palette-green-tint30)', // #54b054 Global.Color.Green.Tint30
    foreground2: 'var(--global-palette-green-tint40)', // #9fd89f Global.Color.Green.Tint40
    foreground3: 'var(--global-palette-green-tint20)', // #359b35 Global.Color.Green.Tint20
    borderActive: 'var(--global-palette-green-tint30)', // #54b054 Global.Color.Green.Tint30
    border2: 'var(--global-palette-green-tint20)', // #359b35 Global.Color.Green.Tint20
  },
  darkGreen: {
    background1: 'var(--global-palette-darkGreen-shade40)', // #032003 Global.Color.DarkGreen.Shade40
    background2: 'var(--global-palette-darkGreen-shade30)', // #063b06 Global.Color.DarkGreen.Shade30
    background3: 'var(--global-palette-darkGreen-primary)', // #0b6a0b Global.Color.DarkGreen.Primary
    foreground1: 'var(--global-palette-darkGreen-tint30)', // #4da64d Global.Color.DarkGreen.Tint30
    foreground2: 'var(--global-palette-darkGreen-tint40)', // #9ad29a Global.Color.DarkGreen.Tint40
    foreground3: 'var(--global-palette-darkGreen-tint20)', // #2d8e2d Global.Color.DarkGreen.Tint20
    borderActive: 'var(--global-palette-darkGreen-tint30)', // #4da64d Global.Color.DarkGreen.Tint30
    border2: 'var(--global-palette-darkGreen-tint20)', // #2d8e2d Global.Color.DarkGreen.Tint20
  },
  lightTeal: {
    background1: 'var(--global-palette-lightTeal-shade40)', // #00373a Global.Color.LightTeal.Shade40
    background2: 'var(--global-palette-lightTeal-shade30)', // #00666d Global.Color.LightTeal.Shade30
    background3: 'var(--global-palette-lightTeal-primary)', // #00b7c3 Global.Color.LightTeal.Primary
    foreground1: 'var(--global-palette-lightTeal-tint30)', // #58d3db Global.Color.LightTeal.Tint30
    foreground2: 'var(--global-palette-lightTeal-tint40)', // #a6e9ed Global.Color.LightTeal.Tint40
    foreground3: 'var(--global-palette-lightTeal-tint20)', // #32c8d1 Global.Color.LightTeal.Tint20
    borderActive: 'var(--global-palette-lightTeal-tint30)', // #58d3db Global.Color.LightTeal.Tint30
    border2: 'var(--global-palette-lightTeal-tint20)', // #32c8d1 Global.Color.LightTeal.Tint20
  },
  teal: {
    background1: 'var(--global-palette-teal-shade40)', // #012728 Global.Color.Teal.Shade40
    background2: 'var(--global-palette-teal-shade30)', // #02494c Global.Color.Teal.Shade30
    background3: 'var(--global-palette-teal-primary)', // #038387 Global.Color.Teal.Primary
    foreground1: 'var(--global-palette-teal-tint30)', // #4cb4b7 Global.Color.Teal.Tint30
    foreground2: 'var(--global-palette-teal-tint40)', // #9bd9db Global.Color.Teal.Tint40
    foreground3: 'var(--global-palette-teal-tint20)', // #2aa0a4 Global.Color.Teal.Tint20
    borderActive: 'var(--global-palette-teal-tint30)', // #4cb4b7 Global.Color.Teal.Tint30
    border2: 'var(--global-palette-teal-tint20)', // #2aa0a4 Global.Color.Teal.Tint20
  },
  darkTeal: {
    background1: 'var(--global-palette-darkTeal-shade40)', // #001f1f Global.Color.DarkTeal.Shade40
    background2: 'var(--global-palette-darkTeal-shade30)', // #003939 Global.Color.DarkTeal.Shade30
    background3: 'var(--global-palette-darkTeal-primary)', // #006666 Global.Color.DarkTeal.Primary
    foreground1: 'var(--global-palette-darkTeal-tint30)', // #41a3a3 Global.Color.DarkTeal.Tint30
    foreground2: 'var(--global-palette-darkTeal-tint40)', // #92d1d1 Global.Color.DarkTeal.Tint40
    foreground3: 'var(--global-palette-darkTeal-tint20)', // #218b8b Global.Color.DarkTeal.Tint20
    borderActive: 'var(--global-palette-darkTeal-tint30)', // #41a3a3 Global.Color.DarkTeal.Tint30
    border2: 'var(--global-palette-darkTeal-tint20)', // #218b8b Global.Color.DarkTeal.Tint20
  },
  cyan: {
    background1: 'var(--global-palette-cyan-shade40)', // #002e38 Global.Color.Cyan.Shade40
    background2: 'var(--global-palette-cyan-shade30)', // #005669 Global.Color.Cyan.Shade30
    background3: 'var(--global-palette-cyan-primary)', // #0099bc Global.Color.Cyan.Primary
    foreground1: 'var(--global-palette-cyan-tint30)', // #56bfd7 Global.Color.Cyan.Tint30
    foreground2: 'var(--global-palette-cyan-tint40)', // #a4deeb Global.Color.Cyan.Tint40
    foreground3: 'var(--global-palette-cyan-tint20)', // #31afcc Global.Color.Cyan.Tint20
    borderActive: 'var(--global-palette-cyan-tint30)', // #56bfd7 Global.Color.Cyan.Tint30
    border2: 'var(--global-palette-cyan-tint20)', // #31afcc Global.Color.Cyan.Tint20
  },
  steel: {
    background1: 'var(--global-palette-steel-shade40)', // #001b22 Global.Color.Steel.Shade40
    background2: 'var(--global-palette-steel-shade30)', // #00333f Global.Color.Steel.Shade30
    background3: 'var(--global-palette-steel-primary)', // #005b70 Global.Color.Steel.Primary
    foreground1: 'var(--global-palette-steel-tint30)', // #4496a9 Global.Color.Steel.Tint30
    foreground2: 'var(--global-palette-steel-tint40)', // #94c8d4 Global.Color.Steel.Tint40
    foreground3: 'var(--global-palette-steel-tint20)', // #237d92 Global.Color.Steel.Tint20
    borderActive: 'var(--global-palette-steel-tint30)', // #4496a9 Global.Color.Steel.Tint30
    border2: 'var(--global-palette-steel-tint20)', // #237d92 Global.Color.Steel.Tint20
  },
  lightBlue: {
    background1: 'var(--global-palette-lightBlue-shade40)', // #112d42 Global.Color.LightBlue.Shade40
    background2: 'var(--global-palette-lightBlue-shade30)', // #20547c Global.Color.LightBlue.Shade30
    background3: 'var(--global-palette-lightBlue-primary)', // #3a96dd Global.Color.LightBlue.Primary
    foreground1: 'var(--global-palette-lightBlue-tint30)', // #83bdeb Global.Color.LightBlue.Tint30
    foreground2: 'var(--global-palette-lightBlue-tint40)', // #bfddf5 Global.Color.LightBlue.Tint40
    foreground3: 'var(--global-palette-lightBlue-tint20)', // #65ade5 Global.Color.LightBlue.Tint20
    borderActive: 'var(--global-palette-lightBlue-tint30)', // #83bdeb Global.Color.LightBlue.Tint30
    border2: 'var(--global-palette-lightBlue-tint20)', // #65ade5 Global.Color.LightBlue.Tint20
  },
  blue: {
    background1: 'var(--global-palette-blue-shade40)', // #002440 Global.Color.Blue.Shade40
    background2: 'var(--global-palette-blue-shade30)', // #004377 Global.Color.Blue.Shade30
    background3: 'var(--global-palette-blue-primary)', // #0078d4 Global.Color.Blue.Primary
    foreground1: 'var(--global-palette-blue-tint30)', // #5caae5 Global.Color.Blue.Tint30
    foreground2: 'var(--global-palette-blue-tint40)', // #a9d3f2 Global.Color.Blue.Tint40
    foreground3: 'var(--global-palette-blue-tint20)', // #3595de Global.Color.Blue.Tint20
    borderActive: 'var(--global-palette-blue-tint30)', // #5caae5 Global.Color.Blue.Tint30
    border2: 'var(--global-palette-blue-tint20)', // #3595de Global.Color.Blue.Tint20
  },
  royalBlue: {
    background1: 'var(--global-palette-royalBlue-shade40)', // #00172a Global.Color.RoyalBlue.Shade40
    background2: 'var(--global-palette-royalBlue-shade30)', // #002c4e Global.Color.RoyalBlue.Shade30
    background3: 'var(--global-palette-royalBlue-primary)', // #004e8c Global.Color.RoyalBlue.Primary
    foreground1: 'var(--global-palette-royalBlue-tint30)', // #4a89ba Global.Color.RoyalBlue.Tint30
    foreground2: 'var(--global-palette-royalBlue-tint40)', // #9abfdc Global.Color.RoyalBlue.Tint40
    foreground3: 'var(--global-palette-royalBlue-tint20)', // #286fa8 Global.Color.RoyalBlue.Tint20
    borderActive: 'var(--global-palette-royalBlue-tint30)', // #4a89ba Global.Color.RoyalBlue.Tint30
    border2: 'var(--global-palette-royalBlue-tint20)', // #286fa8 Global.Color.RoyalBlue.Tint20
  },
  darkBlue: {
    background1: 'var(--global-palette-darkBlue-shade40)', // #00111f Global.Color.DarkBlue.Shade40
    background2: 'var(--global-palette-darkBlue-shade30)', // #002039 Global.Color.DarkBlue.Shade30
    background3: 'var(--global-palette-darkBlue-primary)', // #003966 Global.Color.DarkBlue.Primary
    foreground1: 'var(--global-palette-darkBlue-tint30)', // #4178a3 Global.Color.DarkBlue.Tint30
    foreground2: 'var(--global-palette-darkBlue-tint40)', // #92b5d1 Global.Color.DarkBlue.Tint40
    foreground3: 'var(--global-palette-darkBlue-tint20)', // #215c8b Global.Color.DarkBlue.Tint20
    borderActive: 'var(--global-palette-darkBlue-tint30)', // #4178a3 Global.Color.DarkBlue.Tint30
    border2: 'var(--global-palette-darkBlue-tint20)', // #215c8b Global.Color.DarkBlue.Tint20
  },
  cornflower: {
    background1: 'var(--global-palette-cornflower-shade40)', // #182047 Global.Color.Cornflower.Shade40
    background2: 'var(--global-palette-cornflower-shade30)', // #2c3c85 Global.Color.Cornflower.Shade30
    background3: 'var(--global-palette-cornflower-primary)', // #4f6bed Global.Color.Cornflower.Primary
    foreground1: 'var(--global-palette-cornflower-tint30)', // #93a4f4 Global.Color.Cornflower.Tint30
    foreground2: 'var(--global-palette-cornflower-tint40)', // #c8d1fa Global.Color.Cornflower.Tint40
    foreground3: 'var(--global-palette-cornflower-tint20)', // #778df1 Global.Color.Cornflower.Tint20
    borderActive: 'var(--global-palette-cornflower-tint30)', // #93a4f4 Global.Color.Cornflower.Tint30
    border2: 'var(--global-palette-cornflower-tint20)', // #778df1 Global.Color.Cornflower.Tint20
  },
  navy: {
    background1: 'var(--global-palette-navy-shade40)', // #000c36 Global.Color.Navy.Shade40
    background2: 'var(--global-palette-navy-shade30)', // #001665 Global.Color.Navy.Shade30
    background3: 'var(--global-palette-navy-primary)', // #0027b4 Global.Color.Navy.Primary
    foreground1: 'var(--global-palette-navy-tint30)', // #546fd2 Global.Color.Navy.Tint30
    foreground2: 'var(--global-palette-navy-tint40)', // #a3b2e8 Global.Color.Navy.Tint40
    foreground3: 'var(--global-palette-navy-tint20)', // #3050c6 Global.Color.Navy.Tint20
    borderActive: 'var(--global-palette-navy-tint30)', // #546fd2 Global.Color.Navy.Tint30
    border2: 'var(--global-palette-navy-tint20)', // #3050c6 Global.Color.Navy.Tint20
  },
  lavender: {
    background1: 'var(--global-palette-lavender-shade40)', // #221d46 Global.Color.Lavender.Shade40
    background2: 'var(--global-palette-lavender-shade30)', // #3f3682 Global.Color.Lavender.Shade30
    background3: 'var(--global-palette-lavender-primary)', // #7160e8 Global.Color.Lavender.Primary
    foreground1: 'var(--global-palette-lavender-tint30)', // #a79cf1 Global.Color.Lavender.Tint30
    foreground2: 'var(--global-palette-lavender-tint40)', // #d2ccf8 Global.Color.Lavender.Tint40
    foreground3: 'var(--global-palette-lavender-tint20)', // #9184ee Global.Color.Lavender.Tint20
    borderActive: 'var(--global-palette-lavender-tint30)', // #a79cf1 Global.Color.Lavender.Tint30
    border2: 'var(--global-palette-lavender-tint20)', // #9184ee Global.Color.Lavender.Tint20
  },
  purple: {
    background1: 'var(--global-palette-purple-shade40)', // #1c0e2b Global.Color.Purple.Shade40
    background2: 'var(--global-palette-purple-shade30)', // #341a51 Global.Color.Purple.Shade30
    background3: 'var(--global-palette-purple-primary)', // #5c2e91 Global.Color.Purple.Primary
    foreground1: 'var(--global-palette-purple-tint30)', // #9470bd Global.Color.Purple.Tint30
    foreground2: 'var(--global-palette-purple-tint40)', // #c6b1de Global.Color.Purple.Tint40
    foreground3: 'var(--global-palette-purple-tint20)', // #7c52ab Global.Color.Purple.Tint20
    borderActive: 'var(--global-palette-purple-tint30)', // #9470bd Global.Color.Purple.Tint30
    border2: 'var(--global-palette-purple-tint20)', // #7c52ab Global.Color.Purple.Tint20
  },
  darkPurple: {
    background1: 'var(--global-palette-darkPurple-shade40)', // #130820 Global.Color.DarkPurple.Shade40
    background2: 'var(--global-palette-darkPurple-shade30)', // #240f3c Global.Color.DarkPurple.Shade30
    background3: 'var(--global-palette-darkPurple-primary)', // #401b6c Global.Color.DarkPurple.Primary
    foreground1: 'var(--global-palette-darkPurple-tint30)', // #7e5ca7 Global.Color.DarkPurple.Tint30
    foreground2: 'var(--global-palette-darkPurple-tint40)', // #b9a3d3 Global.Color.DarkPurple.Tint40
    foreground3: 'var(--global-palette-darkPurple-tint20)', // #633e8f Global.Color.DarkPurple.Tint20
    borderActive: 'var(--global-palette-darkPurple-tint30)', // #7e5ca7 Global.Color.DarkPurple.Tint30
    border2: 'var(--global-palette-darkPurple-tint20)', // #633e8f Global.Color.DarkPurple.Tint20
  },
  orchid: {
    background1: 'var(--global-palette-orchid-shade40)', // #281e37 Global.Color.Orchid.Shade40
    background2: 'var(--global-palette-orchid-shade30)', // #4c3867 Global.Color.Orchid.Shade30
    background3: 'var(--global-palette-orchid-primary)', // #8764b8 Global.Color.Orchid.Primary
    foreground1: 'var(--global-palette-orchid-tint30)', // #b29ad4 Global.Color.Orchid.Tint30
    foreground2: 'var(--global-palette-orchid-tint40)', // #d7caea Global.Color.Orchid.Tint40
    foreground3: 'var(--global-palette-orchid-tint20)', // #a083c9 Global.Color.Orchid.Tint20
    borderActive: 'var(--global-palette-orchid-tint30)', // #b29ad4 Global.Color.Orchid.Tint30
    border2: 'var(--global-palette-orchid-tint20)', // #a083c9 Global.Color.Orchid.Tint20
  },
  grape: {
    background1: 'var(--global-palette-grape-shade40)', // #29072e Global.Color.Grape.Shade40
    background2: 'var(--global-palette-grape-shade30)', // #4c0d55 Global.Color.Grape.Shade30
    background3: 'var(--global-palette-grape-primary)', // #881798 Global.Color.Grape.Primary
    foreground1: 'var(--global-palette-grape-tint30)', // #b55fc1 Global.Color.Grape.Tint30
    foreground2: 'var(--global-palette-grape-tint40)', // #d9a7e0 Global.Color.Grape.Tint40
    foreground3: 'var(--global-palette-grape-tint20)', // #a33fb1 Global.Color.Grape.Tint20
    borderActive: 'var(--global-palette-grape-tint30)', // #b55fc1 Global.Color.Grape.Tint30
    border2: 'var(--global-palette-grape-tint20)', // #a33fb1 Global.Color.Grape.Tint20
  },
  berry: {
    background1: 'var(--global-palette-berry-shade40)', // #3a1136 Global.Color.Berry.Shade40
    background2: 'var(--global-palette-berry-shade30)', // #6d2064 Global.Color.Berry.Shade30
    background3: 'var(--global-palette-berry-primary)', // #c239b3 Global.Color.Berry.Primary
    foreground1: 'var(--global-palette-berry-tint30)', // #da7ed0 Global.Color.Berry.Tint30
    foreground2: 'var(--global-palette-berry-tint40)', // #edbbe7 Global.Color.Berry.Tint40
    foreground3: 'var(--global-palette-berry-tint20)', // #d161c4 Global.Color.Berry.Tint20
    borderActive: 'var(--global-palette-berry-tint30)', // #da7ed0 Global.Color.Berry.Tint30
    border2: 'var(--global-palette-berry-tint20)', // #d161c4 Global.Color.Berry.Tint20
  },
  lilac: {
    background1: 'var(--global-palette-lilac-shade40)', // #35153a Global.Color.Lilac.Shade40
    background2: 'var(--global-palette-lilac-shade30)', // #63276d Global.Color.Lilac.Shade30
    background3: 'var(--global-palette-lilac-primary)', // #b146c2 Global.Color.Lilac.Primary
    foreground1: 'var(--global-palette-lilac-tint30)', // #cf87da Global.Color.Lilac.Tint30
    foreground2: 'var(--global-palette-lilac-tint40)', // #e6bfed Global.Color.Lilac.Tint40
    foreground3: 'var(--global-palette-lilac-tint20)', // #c36bd1 Global.Color.Lilac.Tint20
    borderActive: 'var(--global-palette-lilac-tint30)', // #cf87da Global.Color.Lilac.Tint30
    border2: 'var(--global-palette-lilac-tint20)', // #c36bd1 Global.Color.Lilac.Tint20
  },
  pink: {
    background1: 'var(--global-palette-pink-shade40)', // #441232 Global.Color.Pink.Shade40
    background2: 'var(--global-palette-pink-shade30)', // #80215d Global.Color.Pink.Shade30
    background3: 'var(--global-palette-pink-primary)', // #e43ba6 Global.Color.Pink.Primary
    foreground1: 'var(--global-palette-pink-tint30)', // #ef85c8 Global.Color.Pink.Tint30
    foreground2: 'var(--global-palette-pink-tint40)', // #f7c0e3 Global.Color.Pink.Tint40
    foreground3: 'var(--global-palette-pink-tint20)', // #ea66ba Global.Color.Pink.Tint20
    borderActive: 'var(--global-palette-pink-tint30)', // #ef85c8 Global.Color.Pink.Tint30
    border2: 'var(--global-palette-pink-tint20)', // #ea66ba Global.Color.Pink.Tint20
  },
  hotPink: {
    background1: 'var(--global-palette-hotPink-shade40)', // #44002a Global.Color.HotPink.Shade40
    background2: 'var(--global-palette-hotPink-shade30)', // #7f004e Global.Color.HotPink.Shade30
    background3: 'var(--global-palette-hotPink-primary)', // #e3008c Global.Color.HotPink.Primary
    foreground1: 'var(--global-palette-hotPink-tint30)', // #ee5fb7 Global.Color.HotPink.Tint30
    foreground2: 'var(--global-palette-hotPink-tint40)', // #f7adda Global.Color.HotPink.Tint40
    foreground3: 'var(--global-palette-hotPink-tint20)', // #ea38a6 Global.Color.HotPink.Tint20
    borderActive: 'var(--global-palette-hotPink-tint30)', // #ee5fb7 Global.Color.HotPink.Tint30
    border2: 'var(--global-palette-hotPink-tint20)', // #ea38a6 Global.Color.HotPink.Tint20
  },
  magenta: {
    background1: 'var(--global-palette-magenta-shade40)', // #390024 Global.Color.Magenta.Shade40
    background2: 'var(--global-palette-magenta-shade30)', // #6b0043 Global.Color.Magenta.Shade30
    background3: 'var(--global-palette-magenta-primary)', // #bf0077 Global.Color.Magenta.Primary
    foreground1: 'var(--global-palette-magenta-tint30)', // #d957a8 Global.Color.Magenta.Tint30
    foreground2: 'var(--global-palette-magenta-tint40)', // #eca5d1 Global.Color.Magenta.Tint40
    foreground3: 'var(--global-palette-magenta-tint20)', // #ce3293 Global.Color.Magenta.Tint20
    borderActive: 'var(--global-palette-magenta-tint30)', // #d957a8 Global.Color.Magenta.Tint30
    border2: 'var(--global-palette-magenta-tint20)', // #ce3293 Global.Color.Magenta.Tint20
  },
  plum: {
    background1: 'var(--global-palette-plum-shade40)', // #240017 Global.Color.Plum.Shade40
    background2: 'var(--global-palette-plum-shade30)', // #43002b Global.Color.Plum.Shade30
    background3: 'var(--global-palette-plum-primary)', // #77004d Global.Color.Plum.Primary
    foreground1: 'var(--global-palette-plum-tint30)', // #ad4589 Global.Color.Plum.Tint30
    foreground2: 'var(--global-palette-plum-tint40)', // #d696c0 Global.Color.Plum.Tint40
    foreground3: 'var(--global-palette-plum-tint20)', // #98246f Global.Color.Plum.Tint20
    borderActive: 'var(--global-palette-plum-tint30)', // #ad4589 Global.Color.Plum.Tint30
    border2: 'var(--global-palette-plum-tint20)', // #98246f Global.Color.Plum.Tint20
  },
  beige: {
    background1: 'var(--global-palette-beige-shade40)', // #252323 Global.Color.Beige.Shade40
    background2: 'var(--global-palette-beige-shade30)', // #444241 Global.Color.Beige.Shade30
    background3: 'var(--global-palette-beige-primary)', // #7a7574 Global.Color.Beige.Primary
    foreground1: 'var(--global-palette-beige-tint30)', // #afabaa Global.Color.Beige.Tint30
    foreground2: 'var(--global-palette-beige-tint40)', // #d7d4d4 Global.Color.Beige.Tint40
    foreground3: 'var(--global-palette-beige-tint20)', // #9a9594 Global.Color.Beige.Tint20
    borderActive: 'var(--global-palette-beige-tint30)', // #afabaa Global.Color.Beige.Tint30
    border2: 'var(--global-palette-beige-tint20)', // #9a9594 Global.Color.Beige.Tint20
  },
  mink: {
    background1: 'var(--global-palette-mink-shade40)', // #1c1b1a Global.Color.Mink.Shade40
    background2: 'var(--global-palette-mink-shade30)', // #343231 Global.Color.Mink.Shade30
    background3: 'var(--global-palette-mink-primary)', // #5d5a58 Global.Color.Mink.Primary
    foreground1: 'var(--global-palette-mink-tint30)', // #9e9b99 Global.Color.Mink.Tint30
    foreground2: 'var(--global-palette-mink-tint40)', // #cecccb Global.Color.Mink.Tint40
    foreground3: 'var(--global-palette-mink-tint20)', // #84817e Global.Color.Mink.Tint20
    borderActive: 'var(--global-palette-mink-tint30)', // #9e9b99 Global.Color.Mink.Tint30
    border2: 'var(--global-palette-mink-tint20)', // #84817e Global.Color.Mink.Tint20
  },
  silver: {
    background1: 'var(--global-palette-silver-shade40)', // #282d2e Global.Color.Silver.Shade40
    background2: 'var(--global-palette-silver-shade30)', // #4a5356 Global.Color.Silver.Shade30
    background3: 'var(--global-palette-silver-primary)', // #859599 Global.Color.Silver.Primary
    foreground1: 'var(--global-palette-silver-tint30)', // #b3bfc2 Global.Color.Silver.Tint30
    foreground2: 'var(--global-palette-silver-tint40)', // #d8dfe0 Global.Color.Silver.Tint40
    foreground3: 'var(--global-palette-silver-tint20)', // #a0aeb1 Global.Color.Silver.Tint20
    borderActive: 'var(--global-palette-silver-tint30)', // #b3bfc2 Global.Color.Silver.Tint30
    border2: 'var(--global-palette-silver-tint20)', // #a0aeb1 Global.Color.Silver.Tint20
  },
  platinum: {
    background1: 'var(--global-palette-platinum-shade40)', // #1f2426 Global.Color.Platinum.Shade40
    background2: 'var(--global-palette-platinum-shade30)', // #3b4447 Global.Color.Platinum.Shade30
    background3: 'var(--global-palette-platinum-primary)', // #69797e Global.Color.Platinum.Primary
    foreground1: 'var(--global-palette-platinum-tint30)', // #a0adb2 Global.Color.Platinum.Tint30
    foreground2: 'var(--global-palette-platinum-tint40)', // #cdd6d8 Global.Color.Platinum.Tint40
    foreground3: 'var(--global-palette-platinum-tint20)', // #89989d Global.Color.Platinum.Tint20
    borderActive: 'var(--global-palette-platinum-tint30)', // #a0adb2 Global.Color.Platinum.Tint30
    border2: 'var(--global-palette-platinum-tint20)', // #89989d Global.Color.Platinum.Tint20
  },
  anchor: {
    background1: 'var(--global-palette-anchor-shade40)', // #111315 Global.Color.Anchor.Shade40
    background2: 'var(--global-palette-anchor-shade30)', // #202427 Global.Color.Anchor.Shade30
    background3: 'var(--global-palette-anchor-primary)', // #394146 Global.Color.Anchor.Primary
    foreground1: 'var(--global-palette-anchor-tint30)', // #808a90 Global.Color.Anchor.Tint30
    foreground2: 'var(--global-palette-anchor-tint40)', // #bcc3c7 Global.Color.Anchor.Tint40
    foreground3: 'var(--global-palette-anchor-tint20)', // #626c72 Global.Color.Anchor.Tint20
    borderActive: 'var(--global-palette-anchor-tint30)', // #808a90 Global.Color.Anchor.Tint30
    border2: 'var(--global-palette-anchor-tint20)', // #626c72 Global.Color.Anchor.Tint20
  },
  charcoal: {
    background1: 'var(--global-palette-charcoal-shade40)', // #230308 Global.Color.Charcoal.Shade40
    background2: 'var(--global-palette-charcoal-shade30)', // #420610 Global.Color.Charcoal.Shade30
    background3: 'var(--global-palette-charcoal-primary)', // #750b1c Global.Color.Charcoal.Primary
    foreground1: 'var(--global-palette-charcoal-tint30)', // #ac4f5e Global.Color.Charcoal.Tint30
    foreground2: 'var(--global-palette-charcoal-tint40)', // #d69ca5 Global.Color.Charcoal.Tint40
    foreground3: 'var(--global-palette-charcoal-tint20)', // #962f3f Global.Color.Charcoal.Tint20
    borderActive: 'var(--global-palette-charcoal-tint30)', // #ac4f5e Global.Color.Charcoal.Tint30
    border2: 'var(--global-palette-charcoal-tint20)', // #962f3f Global.Color.Charcoal.Tint20
  },
};
