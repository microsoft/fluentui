import { AliasColorTokens } from './types';
import { grey, brand, white, black } from './global-color';

export const webDark: AliasColorTokens = {
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
};
