import { AliasColorTokens } from './types';
import { black, disabled, hyperlink, selected, white } from './global-color';

export const webHighContrast: AliasColorTokens = {
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

  neutralShadowAmbient: 'rgba (0,0,0,0.24)',
  neutralShadowKey: 'rgba (0,0,0,0.28)',
  neutralShadowAmbientLighter: 'rgba (0,0,0,0.12)',
  neutralShadowKeyLighter: 'rgba (0,0,0,0.14)',
  neutralShadowAmbientDarker: 'rgba (0,0,0,0.40)',
  neutralShadowKeyDarker: 'rgba (0,0,0,0.48)',
};
