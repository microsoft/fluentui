import { categoryColors, colors } from '../teams/siteVariables';
import { TeamsCategoryColorSchemeMapping } from '../teams/types';
import { ColorSchemeMapping } from '../../themes/types';
import { createColorScheme } from '../teams/colors';

export const colorScheme: ColorSchemeMapping = {
  default: createColorScheme({
    foreground: colors.white,
    foreground1: colors.grey[250],
    foreground2: colors.grey[300],
    foreground3: colors.white,
    foreground4: colors.white,
    foreground5: colors.grey[450],
    foreground6: colors.grey[550],
    foreground7: colors.white,
    foreground8: colors.grey[200],
    foreground9: colors.grey[340],

    background: colors.grey[650],
    background1: colors.grey[700],
    background2: colors.grey[800],
    background3: colors.grey[550],
    background4: colors.grey[600],
    background5: colors.grey[250],
    background6: colors.grey[500],

    border: colors.grey[450], // buttons
    border1: colors.grey[850],
    border2: colors.grey[900],
    border3: colors.grey[650],
    borderTransparent: 'transparent',
    borderTransparentActive: 'transparent',

    shadow: colors.black, // opacity 25%
    shadowHover: colors.black, // opacity 25%

    foregroundHover: colors.white,
    foregroundHover1: colors.white,
    foregroundHover2: colors.white,

    backgroundHover: colors.grey[550],
    backgroundHover1: colors.grey[550],
    backgroundHover2: 'transparent',
    backgroundHover3: colors.grey[850],
    backgroundHover4: colors.grey[600],

    borderHover: colors.grey[400],

    foregroundPressed: colors.white,
    backgroundPressed: colors.grey[500],
    backgroundPressed3: colors.grey[450],
    borderPressed: colors.grey[400],

    foregroundActive: colors.white,
    foregroundActive1: colors.white,

    backgroundActive: colors.grey[800],
    backgroundActive1: colors.grey[500],
    backgroundActive2: colors.grey[600],

    borderActive: colors.grey[450], // buttons
    borderActive1: colors.grey[850],
    borderActive2: colors.grey[900],
    borderActive3: colors.grey[650],
    borderActive4: colors.grey[440],

    foregroundFocus: colors.white,
    foregroundFocus1: colors.grey[250],
    foregroundFocus2: colors.grey[300],
    foregroundFocus3: colors.white,

    backgroundFocus: colors.grey[650],
    backgroundFocus1: colors.grey[700],
    backgroundFocus2: colors.grey[800],
    backgroundFocus3: colors.grey[550],

    borderFocusWithin: colors.black,
    borderFocus: colors.white,

    foregroundDisabled1: colors.grey[450],
    foregroundDisabled: colors.grey[450],

    backgroundDisabled: colors.grey[550],
    backgroundDisabled1: colors.grey[550],
    backgroundDisabled2: colors.grey[650],
    backgroundDisabled3: colors.grey[850],

    borderDisabled: colors.grey[550],
  }),
  brand: createColorScheme({
    foreground: colors.brand[400],
    foreground1: colors.brand[400],
    foreground2: colors.brand[400],
    foreground3: colors.brand[200],
    foreground4: colors.white,
    foreground5: colors.grey[750],

    background: colors.brand[600],
    background1: colors.brand[900],
    background2: colors.brand[900],
    background3: colors.brand[1000],
    background4: colors.grey[650],
    background5: colors.brand[900],
    background6: colors.brand[450],

    border: colors.grey[450],
    border1: colors.brand[800],
    border2: colors.brand[800],

    shadow: colors.black, // opacity 25%
    shadowHover: colors.black,

    foregroundHover: colors.brand[400],
    foregroundHover1: colors.white,
    foregroundHover2: colors.brand[200],

    borderHover: colors.brand[600],

    backgroundHover: colors.brand[500],
    backgroundHover1: colors.brand[900],
    backgroundHover2: colors.brand[900],
    backgroundHover3: colors.brand[900],

    foregroundPressed: colors.brand[200],
    foregroundPressed1: colors.white,
    backgroundPressed: colors.brand[700],
    backgroundPressed1: colors.brand[800],
    backgroundPressed2: colors.brand[800],
    borderPressed: colors.brand[800],

    foregroundActive: colors.brand[400],
    foregroundActive1: colors.brand[400],
    foregroundActive2: colors.brand[200],

    backgroundActive: colors.brand[400],
    backgroundActive1: colors.brand[400],

    // active border no change (just copied)
    borderActive: colors.grey[450], // buttons
    borderActive1: colors.brand[800],
    borderActive2: colors.brand[800],

    foregroundFocus: colors.brand[400],
    foregroundFocus1: colors.brand[400],
    foregroundFocus2: colors.brand[400],
    foregroundFocus3: colors.brand[200],
    foregroundFocus4: colors.white,

    backgroundFocus: colors.brand[600],
    backgroundFocus1: colors.brand[900],
    backgroundFocus2: colors.brand[900],
    backgroundFocus3: colors.brand[1000],

    borderFocus: colors.white,
    borderFocusWithin: colors.black,
    borderFocus1: colors.brand[400], // only input

    foregroundDisabled1: colors.grey[450],
    foregroundDisabled: colors.grey[450],

    backgroundDisabled1: colors.grey[550],
    backgroundDisabled: colors.grey[550],
    backgroundDisabled2: colors.grey[650],

    borderDisabled: colors.grey[550],
  }),
  black: {
    foreground: colors.black,
    foreground1: colors.grey[750],
    background: colors.white,
    background1: colors.white,
    border: colors.black,
    shadow: colors.black,

    foregroundHover: colors.white,
    backgroundHover: colors.black,
    borderHover: colors.black,
    shadowHover: colors.black,

    foregroundActive: colors.white,
    backgroundActive: colors.black,
    borderActive: colors.black,
    shadowActive: colors.black,

    foregroundFocus: colors.white,
    backgroundFocus: colors.black,
    borderFocus: colors.black,
    shadowFocus: colors.black,

    foregroundPressed: colors.white,
    backgroundPressed: colors.black,
    borderPressed: colors.black,
    shadowPressed: colors.black,

    foregroundDisabled: colors.white,
    backgroundDisabled: colors.black,
    borderDisabled: colors.black,
    shadowDisabled: colors.black,
  },
  white: {
    foreground: colors.white,
    foreground1: colors.white,
    background: colors.black,
    background1: colors.grey[700],
    border: colors.white,
    shadow: colors.white,

    foregroundHover: colors.black,
    backgroundHover: colors.white,
    borderHover: colors.white,
    shadowHover: colors.white,

    foregroundActive: colors.black,
    backgroundActive: colors.white,
    borderActive: colors.white,
    shadowActive: colors.white,

    foregroundFocus: colors.black,
    backgroundFocus: colors.white,
    borderFocus: colors.white,
    shadowFocus: colors.white,

    foregroundPressed: colors.black,
    backgroundPressed: colors.white,
    borderPressed: colors.white,
    shadowPressed: colors.white,

    foregroundDisabled: colors.black,
    backgroundDisabled: colors.white,
    borderDisabled: colors.white,
    shadowDisabled: colors.white,
  },
  green: createColorScheme({
    foreground: colors.green[200],
    foreground1: colors.grey[800],
    foreground2: colors.green[200],
    foreground3: colors.green[750],
    background: colors.green[200],
    background1: colors.green[200],
    background2: colors.green[800],
    border: colors.green[900],
    border1: colors.green[200],
  }),
  orange: createColorScheme({
    foreground: colors.orange[300],
    foreground1: colors.orange[300],
    foreground2: colors.grey[750],
    background: colors.orange[300],
    background1: colors.orange[300],
    border: colors.grey[400],
  }),
  pink: createColorScheme({
    foreground: colors.pink[200],
    foreground1: colors.pink[400],
    background: colors.pink[800],
    border: colors.pink[900],
  }),
  red: createColorScheme({
    foreground: colors.red[200],
    foreground1: colors.white,
    foreground2: colors.grey[800],

    background: colors.red[300],
    background1: colors.red[800],
    background2: colors.ruby[500],
    background3: colors.red[400],

    border: colors.red[900],
    border1: colors.red[200],

    foregroundHover: colors.white,
    backgroundHover: colors.ruby[600],
    backgroundHover1: colors.red[400],

    foregroundPressed: colors.white,
    backgroundPressed: colors.ruby[700],
  }),
  yellow: createColorScheme({
    foreground: colors.yellow[300],
    foreground1: colors.grey[800],
    foreground2: colors.grey[800],
    foreground3: colors.grey[750],
    foreground4: colors.yellow[200],
    background: colors.yellow[400],
    background1: colors.grey[450],
    background2: colors.yellow[500],
    background3: colors.yellow[800],
    border: colors.yellow[900],
    border1: colors.yellow[200],
  }),
  silver: createColorScheme({
    foreground: colors.white,
    foreground1: colors.silver[200],
    foregroundHover: colors.white,
    foregroundPressed: colors.white,
    border: colors.silver[600],
    background: 'transparent',
    backgroundHover: colors.silver[800],
    borderHover: colors.silver[600],
    backgroundPressed: colors.silver[700],
    borderPressed: colors.silver[600],
    foregroundDisabled: colors.silver[600],
    backgroundDisabled: colors.silver[900],
  }),
  onyx: createColorScheme({
    background: colors.onyx[500],
    background1: colors.onyx[100],
    background2: colors.onyx[500],
    background3: colors.onyx[700],
    backgroundHover: colors.onyx[900],
    backgroundPressed: colors.onyx[900],
    border: colors.onyx[800],
    border1: 'transparent',
    border2: colors.silver[400],
  }),
  amethyst: createColorScheme({
    background: colors.onyx[200],
    backgroundHover: colors.amethyst[700],
    backgroundHover1: colors.grey[750],
    backgroundActive: colors.amethyst[700],
  }),
};

colorScheme.grey = colorScheme.default;

const createCategoryColorScheme = (color: string, customValues = {}) => {
  return {
    foreground: categoryColors[color][250],
    foreground1: categoryColors[color][550],
    background: categoryColors[color][800],
    borderActive: categoryColors[color][350],
    ...customValues,
  };
};

export const categoryColorScheme: TeamsCategoryColorSchemeMapping = {
  redDark: createCategoryColorScheme('redDark'),
  red: createCategoryColorScheme('red'),
  orangeDark: createCategoryColorScheme('orangeDark'),
  orange: createCategoryColorScheme('orange'),
  orangeLight: createCategoryColorScheme('orangeLight'),
  yellowDark: createCategoryColorScheme('yellowDark'),
  yellow: createCategoryColorScheme('yellow'),
  brown: createCategoryColorScheme('brown'),
  oliveDark: createCategoryColorScheme('oliveDark'),
  olive: createCategoryColorScheme('olive'),
  greenDark: createCategoryColorScheme('greenDark'),
  green: createCategoryColorScheme('green'),
  tealDark: createCategoryColorScheme('tealDark'),
  teal: createCategoryColorScheme('teal'),
  tealLight: createCategoryColorScheme('tealLight'),
  blueDark: createCategoryColorScheme('blueDark'),
  blue: createCategoryColorScheme('blue'),
  purpleDark: createCategoryColorScheme('purpleDark'),
  purple: createCategoryColorScheme('purple'),
  maroon: createCategoryColorScheme('maroon'),
  pink: createCategoryColorScheme('pink'),
  smokeDark: createCategoryColorScheme('smokeDark'),
  smokeLight: createCategoryColorScheme('smokeLight'),
  steelDark: createCategoryColorScheme('steelDark'),
  steelLight: createCategoryColorScheme('steelLight'),
  neon: createCategoryColorScheme('neon'),
  formatting: {
    foreground1: categoryColors.red[250],
    background1: categoryColors.red[700],
    foreground2: categoryColors.orangeDark[350],
    background2: categoryColors.orange[700],
    foreground3: categoryColors.yellow[250],
    background3: categoryColors.yellow[800],
    foreground4: categoryColors.neon[150],
    background4: categoryColors.neon[800],
    foreground5: categoryColors.green[250],
    background5: categoryColors.green[700],
    foreground6: categoryColors.tealLight[250],
    background6: categoryColors.tealLight[700],
    foreground7: categoryColors.blueDark[250],
    background7: categoryColors.blueDark[450],
    foreground8: categoryColors.maroon[350],
    background8: categoryColors.maroon[800],
  },
};
