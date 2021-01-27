import { AliasColorTokens } from './types';
import { grey, brand, white } from './global-color';

export const webLight: AliasColorTokens = {
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
  brandForegroundPressed: brand.shade30,
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

  neutralShadowAmbient: 'rgba (0,0,0,0.12)',
  neutralShadowKey: 'rgba (0,0,0,0.14)',
  neutralShadowAmbientLighter: 'rgba (0,0,0,0.06)',
  neutralShadowKeyLighter: 'rgba (0,0,0,0.07)',
  neutralShadowAmbientDarker: 'rgba (0,0,0,0.20)',
  neutralShadowKeyDarker: 'rgba (0,0,0,0.24)',
};
