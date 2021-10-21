import { colors } from '../teams/siteVariables';
import { TeamsCategoryColorSchemeMapping } from '../teams/types';
import { ColorSchemeMapping } from '../../themes/types';
import { createColorScheme as createEmptyColorScheme } from '../teams/colors';

export const accessibleYellow = 'LinkText';
export const accessibleGreen = 'GrayText'; // always disabled color in high contrast
export const accessibleCyan = 'Highlight';
export const red = '#f00';

// COLOR SCHEME
const createColorScheme = (customValues = {}) => {
  return {
    foreground: 'CanvasText',
    foreground1: 'Canvas',
    background: 'Canvas',
    background1: 'CanvasText',
    border: 'CanvasText',
    shadow: 'CanvasText',

    foregroundHover: accessibleYellow,
    backgroundHover: 'Canvas',
    borderHover: accessibleCyan,
    shadowHover: accessibleCyan,

    foregroundActive: accessibleCyan,
    backgroundActive: 'Canvas',
    borderActive: accessibleCyan,
    shadowActive: accessibleCyan,

    foregroundFocus: 'Canvas',
    backgroundFocus: accessibleCyan,
    borderFocus: 'CanvasText',
    shadowFocus: 'CanvasText',

    foregroundPressed: 'Canvas',
    backgroundPressed: accessibleCyan,
    borderPressed: 'CanvasText',
    shadowPressed: 'CanvasText',

    foregroundDisabled: 'Canvas',
    backgroundDisabled: accessibleGreen,
    borderDisabled: 'Canvas',
    shadowDisabled: 'Canvas',
    ...customValues,
  };
};

export const colorScheme: ColorSchemeMapping = {
  default: createEmptyColorScheme({
    foreground: 'CanvasText',
    foreground1: 'CanvasText',
    foreground2: 'CanvasText',
    foreground3: 'CanvasText',
    foreground4: 'Canvas',
    foreground5: colors.grey[600],
    foreground6: colors.grey[750],
    foreground7: 'Canvas',
    foreground8: 'Canvas',
    foreground9: 'CanvasText',

    background: 'Canvas',
    background1: 'Canvas',
    background2: 'Canvas',
    background3: 'Canvas',
    background4: 'Canvas',
    background5: accessibleYellow,
    background6: 'Canvas',

    border: 'CanvasText',
    border1: 'CanvasText',
    border2: 'CanvasText',
    border3: 'CanvasText',
    borderTransparent: 'CanvasText',
    borderTransparentActive: accessibleCyan,

    shadow: 'Canvas', // opacity 25%
    shadowHover: 'Canvas', // opacity 25%

    foregroundHover: 'Canvas',
    foregroundHover1: 'Canvas',
    foregroundHover2: accessibleCyan,

    backgroundHover: accessibleCyan,
    backgroundHover1: accessibleCyan,
    backgroundHover2: accessibleCyan,
    backgroundHover3: 'Canvas',
    backgroundHover4: 'Canvas',

    borderHover: accessibleCyan,

    foregroundPressed: 'Canvas',
    backgroundPressed: accessibleCyan,
    backgroundPressed3: accessibleCyan,
    borderPressed: accessibleCyan,
    foregroundActive: accessibleCyan,
    foregroundActive1: 'Canvas',

    backgroundActive: 'Canvas',
    backgroundActive1: accessibleCyan,
    backgroundActive2: accessibleCyan,

    borderActive: accessibleCyan, // buttons
    borderActive1: accessibleCyan,
    borderActive2: accessibleCyan,
    borderActive3: accessibleCyan,
    borderActive4: accessibleCyan,

    foregroundFocus: 'Canvas',
    foregroundFocus1: 'Canvas',
    foregroundFocus2: 'Canvas',
    foregroundFocus3: 'Canvas',

    backgroundFocus: accessibleCyan,
    backgroundFocus1: accessibleCyan,
    backgroundFocus2: accessibleCyan,
    backgroundFocus3: accessibleCyan,

    borderFocusWithin: 'Canvas',
    borderFocus: accessibleCyan,

    foregroundDisabled1: accessibleGreen,
    foregroundDisabled: 'Canvas',

    backgroundDisabled: accessibleGreen,
    backgroundDisabled1: 'Canvas',
    backgroundDisabled2: accessibleGreen,
    backgroundDisabled3: accessibleGreen,

    borderDisabled: accessibleGreen,
  }),
  brand: createEmptyColorScheme({
    foreground: 'CanvasText',
    foreground1: accessibleYellow,
    foreground2: accessibleYellow,
    foreground3: accessibleYellow,
    foreground4: 'Canvas',
    foreground5: 'Canvas',

    background: 'CanvasText',
    background1: 'Canvas',
    background2: 'Canvas',
    background3: 'Canvas',
    background4: 'Canvas',
    background5: 'CanvasText',
    background6: 'CanvasText',

    border: 'CanvasText', // buttons
    border1: 'CanvasText',
    border2: 'CanvasText',

    shadow: 'Canvas', // opacity 25%
    shadowHover: 'Canvas',

    foregroundHover: 'Canvas',
    foregroundHover1: 'Canvas',
    foregroundHover2: 'Canvas',

    borderHover: accessibleCyan,

    backgroundHover: accessibleCyan,
    backgroundHover1: accessibleCyan,
    backgroundHover2: accessibleYellow,
    backgroundHover3: 'Canvas',

    foregroundPressed: 'Canvas',
    foregroundPressed1: 'Canvas',
    backgroundPressed: accessibleCyan,
    backgroundPressed1: accessibleCyan,
    backgroundPressed2: 'Canvas',
    borderPressed: accessibleCyan,

    foregroundActive: accessibleCyan,
    foregroundActive1: 'Canvas',
    foregroundActive2: accessibleCyan,

    backgroundActive: 'Canvas',
    backgroundActive1: accessibleCyan,

    borderActive: accessibleCyan, // buttons
    borderActive1: accessibleCyan,
    borderActive2: accessibleCyan,

    foregroundFocus: 'Canvas',
    foregroundFocus1: 'Canvas',
    foregroundFocus2: 'Canvas',
    foregroundFocus3: 'Canvas',
    foregroundFocus4: 'Canvas',

    backgroundFocus: accessibleCyan,
    backgroundFocus1: accessibleCyan,
    backgroundFocus2: accessibleCyan,
    backgroundFocus3: accessibleCyan,

    borderFocus: accessibleCyan,
    borderFocusWithin: 'Canvas',
    borderFocus1: accessibleCyan,

    foregroundDisabled: 'Canvas',
    foregroundDisabled1: accessibleGreen,

    backgroundDisabled: accessibleGreen,
    backgroundDisabled1: 'Canvas',

    borderDisabled: accessibleGreen,
  }),
  black: createColorScheme(),
  white: createColorScheme(),
  grey: createColorScheme(),
  green: createEmptyColorScheme({
    foreground: 'CanvasText',
    foreground1: 'Canvas',
    foreground2: 'CanvasText',
    foreground3: 'Canvas',
    background: 'CanvasText',
    background1: 'CanvasText',
    background2: 'Canvas',
    border: 'CanvasText',
    border1: 'CanvasText',
    shadow: undefined,
    foregroundHover: undefined,
    backgroundHover: undefined,
    borderHover: undefined,
    shadowHover: undefined,
    foregroundActive: undefined,
    backgroundActive: undefined,
    borderActive: undefined,
    shadowActive: undefined,
    foregroundFocus: undefined,
    backgroundFocus: undefined,
    borderFocus: undefined,
    shadowFocus: undefined,
    foregroundPressed: undefined,
    backgroundPressed: undefined,
    borderPressed: undefined,
    shadowPressed: undefined,
    foregroundDisabled: undefined,
    backgroundDisabled: undefined,
    borderDisabled: undefined,
    shadowDisabled: undefined,
  }),
  orange: createEmptyColorScheme({
    foreground: accessibleYellow,
    foreground1: accessibleYellow,
    foreground2: 'Canvas',
    background: accessibleYellow,
    background1: 'CanvasText',
    border: accessibleCyan,
  }),
  pink: createEmptyColorScheme({
    foreground: 'CanvasText',
    foreground1: 'CanvasText',
    background: 'Canvas',
    border: 'CanvasText',
  }),
  red: createEmptyColorScheme({
    foreground: 'CanvasText',
    foreground1: 'Canvas',
    foreground2: 'Canvas',

    background: 'CanvasText',
    background1: 'Canvas',
    background2: 'Canvas',
    background3: accessibleYellow,

    border: 'CanvasText',
    border1: 'CanvasText',

    foregroundHover: 'Canvas',
    backgroundHover: accessibleCyan,
    backgroundHover1: accessibleCyan,

    foregroundPressed: 'Canvas',
    backgroundPressed: accessibleCyan,
  }),
  yellow: createEmptyColorScheme({
    foreground: 'CanvasText',
    foreground1: 'Canvas',
    foreground2: 'Canvas',
    foreground3: 'Canvas',
    foreground4: 'CanvasText',
    background: 'CanvasText',
    background1: 'transparent',
    background2: 'CanvasText',
    background3: 'Canvas',
    border: 'CanvasText',
    border1: 'CanvasText',
  }),
  silver: createEmptyColorScheme({
    foreground: 'CanvasText',
    foreground1: 'CanvasText',
    foregroundHover: 'Canvas',
    foregroundPressed: 'Canvas',
    background: 'Canvas',
    border: 'CanvasText',
    backgroundHover: accessibleCyan,
    borderHover: 'CanvasText',
    backgroundPressed: accessibleCyan,
    borderPressed: 'CanvasText',
    foregroundDisabled: accessibleGreen,
    backgroundDisabled: 'Canvas',
    borderDisabled: accessibleGreen,
  }),
  onyx: createEmptyColorScheme({
    background: 'Canvas',
    background1: 'Canvas',
    background2: 'CanvasText',
    background3: 'CanvasText',
    backgroundHover: accessibleCyan,
    backgroundPressed: accessibleCyan,
    border: 'CanvasText',
    border1: 'CanvasText',
    border2: 'CanvasText',
  }),
  amethyst: createEmptyColorScheme({
    background: colors.silver[900],
    backgroundHover: accessibleCyan,
    backgroundHover1: accessibleCyan,
    backgroundActive: accessibleCyan,
  }),
};

const createCategoryColorScheme = (customValues = {}) => {
  return {
    foreground: 'Canvas',
    foreground1: accessibleYellow,
    background: accessibleYellow,
    borderActive: accessibleCyan,
    ...customValues,
  };
};

export const categoryColorScheme: TeamsCategoryColorSchemeMapping = {
  redDark: createCategoryColorScheme(),
  red: createCategoryColorScheme(),
  orangeDark: createCategoryColorScheme(),
  orange: createCategoryColorScheme(),
  orangeLight: createCategoryColorScheme(),
  yellowDark: createCategoryColorScheme(),
  yellow: createCategoryColorScheme(),
  brown: createCategoryColorScheme(),
  oliveDark: createCategoryColorScheme(),
  olive: createCategoryColorScheme(),
  greenDark: createCategoryColorScheme(),
  green: createCategoryColorScheme(),
  tealDark: createCategoryColorScheme(),
  teal: createCategoryColorScheme(),
  tealLight: createCategoryColorScheme(),
  blueDark: createCategoryColorScheme(),
  blue: createCategoryColorScheme(),
  purpleDark: createCategoryColorScheme(),
  purple: createCategoryColorScheme(),
  maroon: createCategoryColorScheme(),
  pink: createCategoryColorScheme(),
  smokeDark: createCategoryColorScheme(),
  smokeLight: createCategoryColorScheme(),
  steelDark: createCategoryColorScheme(),
  steelLight: createCategoryColorScheme(),
  neon: createCategoryColorScheme(),
  formatting: {
    foreground1: undefined,
    background1: undefined,
    foreground2: undefined,
    background2: undefined,
    foreground3: undefined,
    background3: undefined,
    foreground4: undefined,
    background4: undefined,
    foreground5: undefined,
    background5: undefined,
    foreground6: undefined,
    background6: undefined,
    foreground7: undefined,
    background7: undefined,
    foreground8: undefined,
    background8: undefined,
  },
};
