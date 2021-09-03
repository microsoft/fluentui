import { pxToRem } from '../../utils';
import { colors } from './colors';

//
// COLORS
//
export { categoryColors, categoryColorScheme } from './categoryColors';
export { colors, contextualColors, naturalColors, primitiveColors, colorScheme, transparentColors } from './colors';

//
// BORDER STYLES
//
export const borderWidth = '1px';
export const borderRadiusSmall = '2px'; // input focus states
export const borderRadiusMedium = '4px'; // default border radius
export const borderRadiusXLarge = '8px'; // X Large Border Radius
export const focusInnerBorderColor = colors.white;
export const focusOuterBorderColor = colors.black;

//
// SHADOW LEVELS
//
export const shadowLevel1 = '0 .2rem .4rem -.075rem rgba(0, 0, 0, .1)';
export const shadowLevel2 = '0 .4rem .7rem -.1rem rgba(0, 0, 0, .1)';
export const shadowLevel3 = '0 .8rem 1rem -.2rem rgba(0, 0, 0, .1)';
export const shadowLevel4 = '0 1.6rem 1.8rem -.4rem rgba(0, 0, 0, .1)';
export const shadowLevel1Dark = '0 .2rem .4rem -.075rem rgba(0, 0, 0, .25)';

export const shadow2 = '0 0 2px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .14)';
export const shadow4 = '0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .14)';
export const shadow8 = '0 0 2px rgba(0, 0, 0, .12), 0 4px 8px rgba(0, 0, 0, .14)';
export const shadow16 = '0 0 2px rgba(0, 0, 0, .12), 0 8px 16px rgba(0, 0, 0, .14)';
export const shadow28 = '0 0 8px rgba(0, 0, 0, .20), 0 14px 28px rgba(0, 0, 0, .24)';
export const shadow64 = '0 0 8px rgba(0, 0, 0, .20), 0 32px 64px rgba(0, 0, 0, .24)';

//
// FONT SIZES
//
export const fontSizes = {
  smaller: pxToRem(10),
  small: pxToRem(12),
  medium: pxToRem(14),
  large: pxToRem(18),
  larger: pxToRem(24),
  largest: pxToRem(28),
};

//
// FONT WEIGHTS
//
export const fontWeightLight = 200;
export const fontWeightSemilight = 300;
export const fontWeightRegular = 400;
export const fontWeightSemibold = 600;
export const fontWeightBold = 700;

//
// LINE HEIGHTS
//
export const lineHeightDefault = 1;
export const lineHeightSmaller = 1.2;
export const lineHeightSmall = 1.3333;
export const lineHeightMedium = 1.4286;
export const lineHeightLarge = 1.3333;
export const lineHeightLarger = 1.3333;
export const lineHeightLargest = 1.3333;

//
// Z-INDEX
// Used to maintain proper stack order of components
//
export const zIndexes: Record<string, number> = {
  background: 0, // Default value
  foreground: 1, // Put a component in front
  menuItem: 2, // Currently used only for menu item beak element
  overlay: 1000, // Dialog/popup/menu overlays
  overlayPriority: 1001, // for nested overlays, like tooltip in dialog.
  debug: 999999999, // for debug purposes
};

//
// SEMANTIC ASSIGNMENTS
//
export const bodyPadding = 0;
export const bodyMargin = 0;
export const bodyFontFamily = '"Segoe UI", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
export const bodyFontSize = fontSizes.medium;
export const bodyBackground = colors.white;
export const bodyColor = colors.grey[750];
export const bodyLineHeight = lineHeightMedium;
