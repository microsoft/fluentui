import {
  NeutralColorTokens,
  ColorVariants,
  SharedColorTokens,
  GlobalSharedColors,
  BackgroundColorTokens,
  BrandVariants,
  BrandColorTokens,
} from '../../types';
import { grey, white, black, sharedColors } from '../../global/index';

export const ghostColorTokens: BackgroundColorTokens = {
  background: 'red',
  backgroundHover: 'red',
  backgroundPressed: 'red',
  backgroundSelected: 'red',
};

export const transparentColorTokens: BackgroundColorTokens = {
  background: 'rgba(255, 0, 0, 0.2)',
  backgroundHover: 'rgba(255, 0, 0, 0.2)',
  backgroundPressed: 'rgba(255, 0, 0, 0.2)',
  backgroundSelected: 'rgba(255, 0, 0, 0.2)',
};

export function createBrandColorTokens(brand: BrandVariants): BrandColorTokens {
  return {
    brandBackground: brand.shade10,
    brandBackgroundHover: brand.primary,
    brandBackgroundPressed: brand.shade40,
    brandBackgroundSelected: brand.shade20,
    brandBackgroundStatic: brand.primary,
  };
}

export function createNeutralColorTokens(
  brand: ColorVariants,
  customValues: { [P in keyof NeutralColorTokens]?: string } = {},
): NeutralColorTokens {
  return {
    neutralForeground1: white,

    neutralForeground2: grey[84],
    neutralForeground2Hover: white,
    neutralForeground2Pressed: white,
    neutralForeground2Selected: white,
    brandForeground2Hover: brand.tint20,
    brandForeground2Pressed: brand.tint10,
    brandForeground2Selected: brand.tint10,

    neutralForeground3: grey[68],
    neutralForeground3Hover: grey[84],
    neutralForeground3Pressed: grey[84],
    neutralForeground3Selected: grey[84],
    brandForeground3Hover: brand.tint20,
    brandForeground3Pressed: brand.tint10,
    brandForeground3Selected: brand.tint20,

    neutralForeground4: grey[52],

    neutralForegroundDisabled: grey[36],

    brandForeground: brand.tint10,
    brandForegroundHover: brand.tint30,
    brandForegroundPressed: brand.tint20,
    brandForegroundSelected: brand.tint10,

    neutralForegroundInverted: white,

    neutralForegroundInvertedAccessible: white,

    neutralBackground1: grey[16],
    neutralBackground1Hover: grey[22],
    neutralBackground1Pressed: grey[18],
    neutralBackground1Selected: grey[20],

    neutralBackground2: grey[12],
    neutralBackground2Hover: grey[18],
    neutralBackground2Pressed: grey[14],
    neutralBackground2Selected: grey[16],

    neutralBackground3: grey[8],
    neutralBackground3Hover: grey[14],
    neutralBackground3Pressed: grey[10],
    neutralBackground3Selected: grey[12],

    neutralBackground4: grey[4],
    neutralBackground4Hover: grey[10],
    neutralBackground4Pressed: grey[6],
    neutralBackground4Selected: grey[8],

    neutralBackground5: black,
    neutralBackground5Hover: grey[14],
    neutralBackground5Pressed: grey[10],
    neutralBackground5Selected: grey[12],

    neutralBackground6: grey[20],

    neutralBackgroundDisabled: grey[8],

    neutralStrokeAccessible: grey[68],
    neutralStrokeAccessibleHover: grey[74],
    neutralStrokeAccessiblePressed: grey[70],
    neutralStrokeAccessibleSelected: brand.tint20,

    neutralStroke1: grey[40],
    neutralStroke1Hover: grey[46],
    neutralStroke1Pressed: grey[42],
    neutralStroke1Selected: grey[44],

    neutralStroke2: grey[32],

    neutralStroke3: grey[24],

    neutralStrokeDisabled: grey[26],

    strokeAccessible: 'transparent',
    strokeAccessibleInteractive: 'transparent',
    strokeAccessibleDisabled: 'transparent',

    neutralShadowAmbient: 'rgba(0,0,0,0.24)',
    neutralShadowKey: 'rgba(0,0,0,0.28)',
    neutralShadowAmbientLighter: 'rgba(0,0,0,0.12)',
    neutralShadowKeyLighter: 'rgba(0,0,0,0.14)',
    neutralShadowAmbientDarker: 'rgba(0,0,0,0.40)',
    neutralShadowKeyDarker: 'rgba(0,0,0,0.48)',
    ...customValues,
  };
}

function createSharedColorTokens(color: ColorVariants, customValues: Record<string, string> = {}): SharedColorTokens {
  return {
    background1: color.shade30,
    background2: color.shade30,
    background3: color.primary,
    foreground1: color.tint40,
    foreground2: color.tint40,
    foreground3: color.tint20,
    borderActive: color.tint30,
    border2: color.tint20,
    ...customValues,
  };
}

export const sharedColorTokens: Record<keyof GlobalSharedColors, SharedColorTokens> = {
  darkRed: createSharedColorTokens(sharedColors.darkRed),
  burgundy: createSharedColorTokens(sharedColors.burgundy),
  cranberry: createSharedColorTokens(sharedColors.cranberry),
  red: createSharedColorTokens(sharedColors.red),
  darkOrange: createSharedColorTokens(sharedColors.darkOrange),
  bronze: createSharedColorTokens(sharedColors.bronze),
  pumpkin: createSharedColorTokens(sharedColors.pumpkin),
  orange: createSharedColorTokens(sharedColors.orange),
  peach: createSharedColorTokens(sharedColors.peach),
  marigold: createSharedColorTokens(sharedColors.marigold),
  yellow: createSharedColorTokens(sharedColors.yellow),
  gold: createSharedColorTokens(sharedColors.gold),
  brass: createSharedColorTokens(sharedColors.brass),
  brown: createSharedColorTokens(sharedColors.brown),
  darkBrown: createSharedColorTokens(sharedColors.darkBrown),
  lime: createSharedColorTokens(sharedColors.lime),
  forest: createSharedColorTokens(sharedColors.forest),
  seafoam: createSharedColorTokens(sharedColors.seafoam),
  lightGreen: createSharedColorTokens(sharedColors.lightGreen),
  green: createSharedColorTokens(sharedColors.green),
  darkGreen: createSharedColorTokens(sharedColors.darkGreen),
  lightTeal: createSharedColorTokens(sharedColors.lightTeal),
  teal: createSharedColorTokens(sharedColors.teal),
  darkTeal: createSharedColorTokens(sharedColors.darkTeal),
  cyan: createSharedColorTokens(sharedColors.cyan),
  steel: createSharedColorTokens(sharedColors.steel),
  lightBlue: createSharedColorTokens(sharedColors.lightBlue),
  blue: createSharedColorTokens(sharedColors.blue),
  royalBlue: createSharedColorTokens(sharedColors.royalBlue),
  darkBlue: createSharedColorTokens(sharedColors.darkBlue),
  cornflower: createSharedColorTokens(sharedColors.cornflower),
  navy: createSharedColorTokens(sharedColors.navy),
  lavender: createSharedColorTokens(sharedColors.lavender),
  purple: createSharedColorTokens(sharedColors.purple),
  darkPurple: createSharedColorTokens(sharedColors.darkPurple),
  orchid: createSharedColorTokens(sharedColors.orchid),
  grape: createSharedColorTokens(sharedColors.grape),
  berry: createSharedColorTokens(sharedColors.berry),
  lilac: createSharedColorTokens(sharedColors.lilac),
  pink: createSharedColorTokens(sharedColors.pink),
  hotPink: createSharedColorTokens(sharedColors.hotPink),
  magenta: createSharedColorTokens(sharedColors.magenta),
  plum: createSharedColorTokens(sharedColors.plum),
  beige: createSharedColorTokens(sharedColors.beige),
  mink: createSharedColorTokens(sharedColors.mink), // TODO naming iteration -> clashing with grey
  silver: createSharedColorTokens(sharedColors.silver),
  platinum: createSharedColorTokens(sharedColors.platinum),
  anchor: createSharedColorTokens(sharedColors.anchor),
  charcoal: createSharedColorTokens(sharedColors.charcoal),
};
