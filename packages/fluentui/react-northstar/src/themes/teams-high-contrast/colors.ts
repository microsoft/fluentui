import { colors } from '../teams/siteVariables';
import { TeamsCategoryColorSchemeMapping } from '../teams/types';
import { ColorSchemeMapping } from '../../themes/types';
import { createColorScheme as createEmptyColorScheme } from '../teams/colors';

export const accessibleYellow = '#ffff00';
export const accessibleGreen = '#3ff23f'; // always disabled color in high contrast
export const accessibleCyan = '#1aebff';
export const red = '#f00';

// COLOR SCHEME
const createColorScheme = (customValues = {}) => {
  return {
    foreground: colors.white,
    foreground1: colors.black,
    background: colors.black,
    background1: colors.white,
    border: colors.white,
    shadow: colors.white,

    foregroundHover: accessibleYellow,
    backgroundHover: colors.black,
    borderHover: accessibleCyan,
    shadowHover: accessibleCyan,

    foregroundActive: accessibleCyan,
    backgroundActive: colors.black,
    borderActive: accessibleCyan,
    shadowActive: accessibleCyan,

    foregroundFocus: colors.black,
    backgroundFocus: accessibleCyan,
    borderFocus: colors.white,
    shadowFocus: colors.white,

    foregroundPressed: colors.black,
    backgroundPressed: accessibleCyan,
    borderPressed: colors.white,
    shadowPressed: colors.white,

    foregroundDisabled: colors.black,
    backgroundDisabled: accessibleGreen,
    borderDisabled: colors.black,
    shadowDisabled: colors.black,
    ...customValues,
  };
};

export const colorScheme: ColorSchemeMapping = {
  default: createEmptyColorScheme({
    foreground: colors.white,
    foreground1: colors.white,
    foreground2: colors.white,
    foreground3: colors.white,
    foreground4: colors.black,
    foreground5: colors.grey[600],
    foreground6: colors.grey[750],
    foreground7: colors.black,
    foreground8: colors.black,
    foreground9: colors.white,

    background: colors.black,
    background1: colors.black,
    background2: colors.black,
    background3: colors.black,
    background4: colors.black,
    background5: accessibleYellow,
    background6: colors.black,

    border: colors.white,
    border1: colors.white,
    border2: colors.white,
    border3: colors.white,
    borderTransparent: colors.white,
    borderTransparentActive: accessibleCyan,

    shadow: colors.black, // opacity 25%
    shadowHover: colors.black, // opacity 25%

    foregroundHover: colors.black,
    foregroundHover1: colors.black,
    foregroundHover2: accessibleCyan,

    backgroundHover: accessibleCyan,
    backgroundHover1: accessibleCyan,
    backgroundHover2: accessibleCyan,
    backgroundHover3: colors.black,
    backgroundHover4: accessibleCyan,

    borderHover: accessibleCyan,

    foregroundPressed: colors.black,
    backgroundPressed: accessibleCyan,
    backgroundPressed3: accessibleCyan,
    borderPressed: accessibleCyan,
    foregroundActive: accessibleCyan,
    foregroundActive1: colors.black,

    backgroundActive: colors.black,
    backgroundActive1: accessibleCyan,
    backgroundActive2: accessibleCyan,

    borderActive: accessibleCyan, // buttons
    borderActive1: accessibleCyan,
    borderActive2: accessibleCyan,
    borderActive3: accessibleCyan,
    borderActive4: accessibleCyan,

    foregroundFocus: colors.black,
    foregroundFocus1: colors.black,
    foregroundFocus2: colors.black,
    foregroundFocus3: colors.black,

    backgroundFocus: accessibleCyan,
    backgroundFocus1: accessibleCyan,
    backgroundFocus2: accessibleCyan,
    backgroundFocus3: accessibleCyan,

    borderFocusWithin: colors.black,
    borderFocus: accessibleCyan,

    foregroundDisabled1: accessibleGreen,
    foregroundDisabled: colors.black,

    backgroundDisabled: accessibleGreen,
    backgroundDisabled1: colors.black,
    backgroundDisabled2: accessibleGreen,
    backgroundDisabled3: accessibleGreen,

    borderDisabled: accessibleGreen,
  }),
  brand: createEmptyColorScheme({
    foreground: colors.white,
    foreground1: accessibleYellow,
    foreground2: accessibleYellow,
    foreground3: accessibleYellow,
    foreground4: colors.black,
    foreground5: colors.black,

    background: colors.white,
    background1: colors.black,
    background2: colors.black,
    background3: colors.black,
    background4: colors.black,
    background5: colors.white,
    background6: colors.white,

    border: colors.white, // buttons
    border1: colors.white,
    border2: colors.white,

    shadow: colors.black, // opacity 25%
    shadowHover: colors.black,

    foregroundHover: colors.black,
    foregroundHover1: colors.black,
    foregroundHover2: colors.black,

    borderHover: accessibleCyan,

    backgroundHover: accessibleCyan,
    backgroundHover1: accessibleCyan,
    backgroundHover2: accessibleYellow,
    backgroundHover3: colors.black,

    foregroundPressed: colors.black,
    foregroundPressed1: colors.black,
    backgroundPressed: accessibleCyan,
    backgroundPressed1: accessibleCyan,
    backgroundPressed2: colors.black,
    borderPressed: accessibleCyan,

    foregroundActive: accessibleCyan,
    foregroundActive1: colors.black,
    foregroundActive2: accessibleCyan,

    backgroundActive: colors.black,
    backgroundActive1: accessibleCyan,

    borderActive: accessibleCyan, // buttons
    borderActive1: accessibleCyan,
    borderActive2: accessibleCyan,

    foregroundFocus: colors.black,
    foregroundFocus1: colors.black,
    foregroundFocus2: colors.black,
    foregroundFocus3: colors.black,
    foregroundFocus4: colors.black,

    backgroundFocus: accessibleCyan,
    backgroundFocus1: accessibleCyan,
    backgroundFocus2: accessibleCyan,
    backgroundFocus3: accessibleCyan,

    borderFocus: accessibleCyan,
    borderFocusWithin: colors.black,
    borderFocus1: accessibleCyan,

    foregroundDisabled: colors.black,
    foregroundDisabled1: accessibleGreen,

    backgroundDisabled: accessibleGreen,
    backgroundDisabled1: colors.black,

    borderDisabled: accessibleGreen,
  }),
  black: createColorScheme(),
  white: createColorScheme(),
  grey: createColorScheme(),
  green: createEmptyColorScheme({
    foreground: colors.white,
    foreground1: colors.black,
    foreground2: colors.white,
    foreground3: colors.black,
    background: colors.white,
    background1: colors.white,
    background2: colors.black,
    border: colors.white,
    border1: colors.white,
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
    foreground2: colors.black,
    background: accessibleYellow,
    background1: colors.white,
    border: accessibleCyan,
  }),
  pink: createEmptyColorScheme({
    foreground: colors.white,
    foreground1: colors.white,
    background: colors.black,
    border: colors.white,
  }),
  red: createEmptyColorScheme({
    foreground: colors.white,
    foreground1: colors.black,
    foreground2: colors.black,

    background: colors.white,
    background1: colors.black,
    background2: colors.black,
    background3: accessibleYellow,

    border: colors.white,
    border1: colors.white,

    foregroundHover: colors.black,
    backgroundHover: accessibleCyan,
    backgroundHover1: accessibleCyan,

    foregroundPressed: colors.black,
    backgroundPressed: accessibleCyan,
  }),
  yellow: createEmptyColorScheme({
    foreground: colors.white,
    foreground1: colors.black,
    foreground2: colors.black,
    foreground3: colors.black,
    foreground4: colors.white,
    background: colors.white,
    background1: 'transparent',
    background2: colors.white,
    background3: colors.black,
    border: colors.white,
    border1: colors.white,
  }),
  silver: createEmptyColorScheme({
    foreground: colors.white,
    foreground1: colors.white,
    foregroundHover: colors.black,
    foregroundPressed: colors.black,
    background: colors.black,
    border: colors.white,
    backgroundHover: accessibleCyan,
    borderHover: colors.white,
    backgroundPressed: accessibleCyan,
    borderPressed: colors.white,
    foregroundDisabled: accessibleGreen,
    backgroundDisabled: colors.black,
    borderDisabled: accessibleGreen,
  }),
  onyx: createEmptyColorScheme({
    background: colors.black,
    background1: colors.black,
    background2: colors.white,
    background3: colors.white,
    backgroundHover: accessibleCyan,
    backgroundPressed: accessibleCyan,
    border: colors.white,
    border1: colors.white,
    border2: colors.white,
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
    foreground: colors.black,
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
