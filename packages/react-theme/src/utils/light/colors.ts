import {
  NeutralColorTokens,
  SharedColorTokens,
  ColorVariants,
  GlobalSharedColors,
  BackgroundColorTokens,
  BrandVariants,
  BrandColorTokens,
} from '../../types';
import { grey, white, sharedColors } from '../../global/index';

export const ghostColorTokens: BackgroundColorTokens = {
  background: 'transparent',
  backgroundHover: grey[96],
  backgroundPressed: grey[88],
  backgroundSelected: grey[92],
};

export const transparentColorTokens: BackgroundColorTokens = {
  background: 'transparent',
  backgroundHover: 'transparent',
  backgroundPressed: 'transparent',
  backgroundSelected: 'transparent',
};

export function createBrandColorTokens(brand: BrandVariants): BrandColorTokens {
  return {
    brandBackground: brand.primary,
    brandBackgroundHover: brand.shade10,
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
    neutralForeground1: grey[14],

    neutralForeground2: grey[26],
    neutralForeground2Hover: grey[14],
    neutralForeground2Pressed: grey[14],
    neutralForeground2Selected: grey[14],
    brandForeground2Hover: brand.primary,
    brandForeground2Pressed: brand.shade10,
    brandForeground2Selected: brand.primary,

    neutralForeground3: grey[38],
    neutralForeground3Hover: grey[26],
    neutralForeground3Pressed: grey[26],
    neutralForeground3Selected: grey[26],
    brandForeground3Hover: brand.primary,
    brandForeground3Pressed: brand.shade10,
    brandForeground3Selected: brand.primary,

    neutralForeground4: grey[50],

    neutralForegroundDisabled: grey[74],

    brandForeground: brand.shade10,
    brandForegroundHover: brand.shade20,
    brandForegroundPressed: brand.shade40,
    brandForegroundSelected: brand.shade10,

    neutralForegroundInverted: white,

    neutralForegroundInvertedAccessible: white,

    neutralBackground1: white,
    neutralBackground1Hover: grey[96],
    neutralBackground1Pressed: grey[88],
    neutralBackground1Selected: grey[92],

    neutralBackground2: grey[98],
    neutralBackground2Hover: grey[94],
    neutralBackground2Pressed: grey[86],
    neutralBackground2Selected: grey[90],

    neutralBackground3: grey[96],
    neutralBackground3Hover: grey[92],
    neutralBackground3Pressed: grey[84],
    neutralBackground3Selected: grey[88],

    neutralBackground4: grey[94],
    neutralBackground4Hover: grey[98],
    neutralBackground4Pressed: grey[96],
    neutralBackground4Selected: white,

    neutralBackground5: grey[92],
    neutralBackground5Hover: grey[96],
    neutralBackground5Pressed: grey[94],
    neutralBackground5Selected: grey[98],

    neutralBackground6: grey[90],

    neutralBackgroundDisabled: grey[94],

    neutralStrokeAccessible: grey[38],
    neutralStrokeAccessibleHover: grey[34],
    neutralStrokeAccessiblePressed: grey[30],
    neutralStrokeAccessibleSelected: brand.primary,

    neutralStroke1: grey[82],
    neutralStroke1Hover: grey[78],
    neutralStroke1Pressed: grey[70],
    neutralStroke1Selected: grey[74],

    neutralStroke2: grey[88],

    neutralStroke3: grey[94],

    neutralStrokeDisabled: grey[88],

    strokeAccessible: 'transparent',
    strokeAccessibleInteractive: 'transparent',
    strokeAccessibleDisabled: 'transparent',

    neutralShadowAmbient: 'rgba(0,0,0,0.12)',
    neutralShadowKey: 'rgba(0,0,0,0.14)',
    neutralShadowAmbientLighter: 'rgba(0,0,0,0.06)',
    neutralShadowKeyLighter: 'rgba(0,0,0,0.07)',
    neutralShadowAmbientDarker: 'rgba(0,0,0,0.20)',
    neutralShadowKeyDarker: 'rgba(0,0,0,0.24)',
    ...customValues,
  };
}

function createSharedColorTokens(color: ColorVariants, customValues: Record<string, string> = {}): SharedColorTokens {
  return {
    background1: color.tint60,
    background2: color.tint40,
    background3: color.primary,
    foreground1: color.primary,
    foreground2: color.shade30,
    foreground3: color.primary,
    borderActive: color.primary,
    border2: color.primary,
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
