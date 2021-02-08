import {
  NeutralColorTokens,
  SharedColorTokens,
  GlobalSharedColors,
  BackgroundColorTokens,
  BrandColorTokens,
} from '../../types';
import { black, disabled, hyperlink, selected, white } from '../../global/index';

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

export function createBrandColorTokens(): BrandColorTokens {
  return {
    brandBackground: white,
    brandBackgroundHover: selected,
    brandBackgroundPressed: selected,
    brandBackgroundSelected: selected,
    brandBackgroundStatic: black,
  };
}

export function createNeutralColorTokens(customValues: Record<string, string> = {}): NeutralColorTokens {
  return {
    neutralForeground1: white,

    neutralForeground2: white,
    neutralForeground2Hover: black,
    neutralForeground2Pressed: black,
    neutralForeground2Selected: black,
    brandForeground2Hover: black,
    brandForeground2Pressed: black,
    brandForeground2Selected: black,

    neutralForeground3: white,
    neutralForeground3Hover: black,
    neutralForeground3Pressed: black,
    neutralForeground3Selected: black,
    brandForeground3Hover: black,
    brandForeground3Pressed: black,
    brandForeground3Selected: black,

    neutralForeground4: white,

    neutralForegroundDisabled: disabled,

    brandForeground: hyperlink,
    brandForegroundHover: hyperlink,
    brandForegroundPressed: hyperlink,
    brandForegroundSelected: hyperlink,

    neutralForegroundInverted: white,

    neutralForegroundInvertedAccessible: black,

    neutralBackground1: black,
    neutralBackground1Hover: selected,
    neutralBackground1Pressed: selected,
    neutralBackground1Selected: selected,

    neutralBackground2: black,
    neutralBackground2Hover: selected,
    neutralBackground2Pressed: selected,
    neutralBackground2Selected: selected,

    neutralBackground3: black,
    neutralBackground3Hover: selected,
    neutralBackground3Pressed: selected,
    neutralBackground3Selected: selected,

    neutralBackground4: black,
    neutralBackground4Hover: selected,
    neutralBackground4Pressed: selected,
    neutralBackground4Selected: selected,

    neutralBackground5: black,
    neutralBackground5Hover: selected,
    neutralBackground5Pressed: selected,
    neutralBackground5Selected: selected,

    neutralBackground6: black,

    neutralBackgroundDisabled: black,

    neutralStrokeAccessible: white,
    neutralStrokeAccessibleHover: selected,
    neutralStrokeAccessiblePressed: selected,
    neutralStrokeAccessibleSelected: selected,

    neutralStroke1: black,
    neutralStroke1Hover: selected,
    neutralStroke1Pressed: selected,
    neutralStroke1Selected: selected,

    neutralStroke2: white,

    neutralStroke3: white,

    neutralStrokeDisabled: disabled,

    strokeAccessible: white,
    strokeAccessibleInteractive: selected,
    strokeAccessibleDisabled: disabled,

    neutralShadowAmbient: 'rgba(0,0,0,0.24)',
    neutralShadowKey: 'rgba(0,0,0,0.28)',
    neutralShadowAmbientLighter: 'rgba(0,0,0,0.12)',
    neutralShadowKeyLighter: 'rgba(0,0,0,0.14)',
    neutralShadowAmbientDarker: 'rgba(0,0,0,0.40)',
    neutralShadowKeyDarker: 'rgba(0,0,0,0.48)',

    ...customValues,
  };
}

function createSharedColorTokens(customValues: { [P in keyof NeutralColorTokens]?: string } = {}): SharedColorTokens {
  return {
    background1: white,
    background2: black,
    background3: white,
    foreground1: black,
    foreground2: white,
    foreground3: white,
    borderActive: selected,
    border2: white,
    ...customValues,
  };
}

export const sharedColorTokens: Record<keyof GlobalSharedColors, SharedColorTokens> = {
  darkRed: createSharedColorTokens(),
  burgundy: createSharedColorTokens(),
  cranberry: createSharedColorTokens(),
  red: createSharedColorTokens(),
  darkOrange: createSharedColorTokens(),
  bronze: createSharedColorTokens(),
  pumpkin: createSharedColorTokens(),
  orange: createSharedColorTokens(),
  peach: createSharedColorTokens(),
  marigold: createSharedColorTokens(),
  yellow: createSharedColorTokens(),
  gold: createSharedColorTokens(),
  brass: createSharedColorTokens(),
  brown: createSharedColorTokens(),
  darkBrown: createSharedColorTokens(),
  lime: createSharedColorTokens(),
  forest: createSharedColorTokens(),
  seafoam: createSharedColorTokens(),
  lightGreen: createSharedColorTokens(),
  green: createSharedColorTokens(),
  darkGreen: createSharedColorTokens(),
  lightTeal: createSharedColorTokens(),
  teal: createSharedColorTokens(),
  darkTeal: createSharedColorTokens(),
  cyan: createSharedColorTokens(),
  steel: createSharedColorTokens(),
  lightBlue: createSharedColorTokens(),
  blue: createSharedColorTokens(),
  royalBlue: createSharedColorTokens(),
  darkBlue: createSharedColorTokens(),
  cornflower: createSharedColorTokens(),
  navy: createSharedColorTokens(),
  lavender: createSharedColorTokens(),
  purple: createSharedColorTokens(),
  darkPurple: createSharedColorTokens(),
  orchid: createSharedColorTokens(),
  grape: createSharedColorTokens(),
  berry: createSharedColorTokens(),
  lilac: createSharedColorTokens(),
  pink: createSharedColorTokens(),
  hotPink: createSharedColorTokens(),
  magenta: createSharedColorTokens(),
  plum: createSharedColorTokens(),
  beige: createSharedColorTokens(),
  mink: createSharedColorTokens(), // TODO naming iteration -> clashing with grey
  silver: createSharedColorTokens(),
  platinum: createSharedColorTokens(),
  anchor: createSharedColorTokens(),
  charcoal: createSharedColorTokens(),
};
