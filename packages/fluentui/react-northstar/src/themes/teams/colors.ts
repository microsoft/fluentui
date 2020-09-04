import {
  ColorPalette,
  PrimitiveColors,
  ColorSchemeMapping,
  ComponentAreaName,
  ColorScheme,
  StrictColorSchemeMapping,
  StrictColorScheme,
} from '../types';
import { TeamsColorNames, TeamsContextualColors, TeamsNaturalColors, TeamsTransparentColors } from './types';

export const contextualColors: TeamsContextualColors = {
  brand: {
    50: '#F4F4FC', // siteVariables.brand16, same as prev
    100: '#E5E5F1', // brand15
    200: '#E2E2F6', // 100, light brand14, dark theme brand02
    300: '#BDBDE6', // 200, light brand12, dark theme brand04
    400: '#A6A7DC', // dark theme brand06 (dark06)
    450: '#9EA2FF',
    500: '#8B8CC7', // light08, dark08
    600: '#6264A7', // 500, siteVariables.brand, siteVariables.brand06, dark theme brand, brand12
    700: '#585A96', // light05
    800: '#464775', // light04, dark14
    900: '#33344A', // siteVariables.brand02, dark theme brand16, same as 900 prev
    1000: '#373644',
  },
};

export const naturalColors: TeamsNaturalColors = {
  grey: {
    0: '#FFFFFF', // white
    25: '#FCFCFB', // old $app-density-message-initial-hover-focus
    50: '#FAF9F8', // light14
    100: '#F3F2F1', // light10, old $app-density-message-background-replay-hover-focus
    150: '#EDEBE9', // light09, old $app-density-border-gray
    200: '#E1DFDD', // light08
    250: '#C8C6C4', // light06, dark02
    300: '#B3B0AD', // dark03
    350: '#979593', // light04
    400: '#8A8886', // dark04
    450: '#605E5C', // light03, dark06, $app-gray-20-theme-agnostic, old $message-highlight-color-darktheme
    500: '#484644', // light02, dark08
    550: '#3B3A39', // dark09
    600: '#323131', // dark10, in call audio only grid slot 4
    650: '#2D2C2C', // in call audio only grid slot 3
    700: '#292828', // dark14, in call audio only grid slot 2, old $app-density-message-background-initial-hover-focus-darktheme
    750: '#252423', // 900 - different [#252424] , old $app-black, in call audio only grid slot 1, old $app-density-message-background-replay-hover-focus-darktheme
    800: '#201F1F', // app black darktheme, in call title bar, in call audio only pip
    850: '#1B1A1A', // in call background behind presented doc, old $app-density-message-border-darktheme
    900: '#11100F', // dark theme borders
    1000: '#000000', // black
  },
  orange: {
    50: '#F9ECEA', // darkOrange[50]
    100: '#EFDBD3', // app orange14
    200: '#EDC2A7', // old message highlight border
    300: '#E97548', // orange[900]
    400: '#CC4A31', // app orange04 darkOrange[400]
    500: '#BD432C', // app orange03
    600: '#A33D2A', // app orange02
    700: '#833122', // app orange01 darkOrange[900]
    800: '#664134', // app orange14 dark
    900: '#51332C', // app orange16 dark
  },
  pink: {
    50: '#FCF2FA', // app orchid opacity, oof message, oof banner bg
    100: '#F1DFEE', // new oof banner border default theme
    200: '#EC6FAE', // new oof text for better contrast in dark theme
    300: '#DE569A', // magenta dark theme
    400: '#E959D9', // oof presence icon dark theme
    500: '#B4009E', // merge oof presence icon, odl $app-magenta
    600: '#943670', // old $app-orchid, use for oof banner text
    700: undefined, //
    800: '#3E2D3B', // old @app orchid opacity, oof message bg, oof banner bg
    900: '#1F191D', // new oof banner border dark theme
  },
  red: {
    50: '#FCF4F6', // app red 10
    100: '#F3D6D8', // postOrange[900] app red 08
    200: '#F9526B', // new, error banner string
    300: '#E73550', // merge old @app-red-dark-theme
    400: '#C4314B', // red[900], app red 06, siteVariables.red
    500: '#A72037', // app red 04
    600: '#8E192E', // app red 02
    700: '#4F222B', // old app red 10 dark
    800: '#3E1F25', // new error banner bg
    900: '#1E040A', // app red08 dark
  },
  green: {
    50: undefined,
    100: undefined,
    200: '#92C353', // lightGreen[900] old $app-green, available presence dark theme, siteVars.green
    300: '#6BB700', // new Available presence
    400: '#13A40E', // dual presence Available
    500: undefined,
    600: '#237B4B', // old $app-green-04, siteVariables.green04, green[900]
    700: undefined,
    800: undefined,
    900: undefined,
  },
  yellow: {
    50: undefined,
    100: '#FBF6D9', // old message highlight color
    200: undefined,
    300: '#F9EC02', // old acc critical ufd icon color
    400: '#F8D22A', // old siteVariables.yellow, $app-yellow, yellow[900]
    500: '#FFB900', // old $bcast pre live color
    600: '#FFAA44', // new away presence
    700: undefined,
    800: undefined,
    900: undefined,
  },
};

const contextualAndNaturalColors: TeamsContextualColors & TeamsNaturalColors = {
  ...contextualColors,
  ...naturalColors,
};

export const primitiveColors: PrimitiveColors = {
  black: '#000',
  white: '#fff',
};

export const transparentColors: TeamsTransparentColors = {
  silver: {
    100: undefined,
    200: 'rgba(255,255,255,0.75)',
    300: 'rgba(255,255,255,0.65)',
    400: 'rgba(255,255,255,0.5)',
    500: undefined,
    600: 'rgba(255,255,255,0.3)',
    700: 'rgba(255,255,255,0.2)',
    800: 'rgba(255,255,255,0.1)',
    900: 'rgba(255,255,255,0.05)',
  },
  ruby: {
    100: undefined,
    200: undefined,
    300: undefined,
    400: undefined,
    500: 'rgba(196,49,75,0.9)',
    600: 'rgba(167,32,55,0.9)',
    700: 'rgba(142,25,46,0.9)',
    800: undefined,
    900: undefined,
  },
  onyx: {
    100: 'rgba(59,58,57,0.9)',
    200: 'rgba(45,44,44,0.4)',
    300: 'rgba(37,36,35,0.2)',
    400: 'rgba(37,36,35,0.65)',
    500: 'rgba(41,40,40,0.9)',
    600: undefined,
    700: 'rgba(0,0,0,0.5)',
    800: 'rgba(27,26,26,0.9)',
    900: 'rgba(0,0,0,0.8)',
  },
  amethyst: {
    100: undefined,
    200: undefined,
    300: undefined,
    400: 'rgba(98,100,167,0.75)',
    500: 'rgba(51,52,74,0.5)',
    600: 'rgba(70,71,117,0.4)',
    700: 'rgba(98,100,167,0.15)',
    800: undefined,
    900: undefined,
  },
};

export const colors: ColorPalette<TeamsTransparentColors> = {
  ...contextualAndNaturalColors,
  ...primitiveColors,
  ...transparentColors,
};

export const createColorScheme = (customValues = {}) => {
  return {
    foreground: undefined,
    background: undefined,
    border: undefined,
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
    ...customValues,
  };
};

export const colorScheme: ColorSchemeMapping<ColorScheme, TeamsColorNames> = {
  default: createColorScheme({
    foreground: colors.grey[750],
    foreground1: colors.grey[500],
    foreground2: colors.grey[450],
    foreground3: colors.white,
    foreground4: colors.white,
    foreground5: colors.grey[100],
    foreground6: colors.grey[200],

    background: colors.white,
    background1: colors.grey[50],
    background2: colors.grey[100],
    background3: colors.grey[150],
    background4: colors.grey[100],
    background5: colors.grey[350],

    border: colors.grey[200], // buttons
    border1: colors.grey[150],
    border2: colors.grey[200],
    border3: colors.grey[150], // divider

    shadow: colors.black, // opacity 10%
    shadowHover: colors.black, // opacity 10%

    foregroundHover: colors.grey[750],
    foregroundHover1: colors.white,
    foregroundHover2: colors.white,

    backgroundHover: colors.grey[100],
    backgroundHover1: colors.grey[150],
    backgroundHover2: 'transparent',
    backgroundHover3: colors.grey[150],
    backgroundHover4: colors.grey[50],

    borderHover: colors.grey[250], // buttons

    foregroundPressed: colors.grey[750],
    backgroundPressed: colors.grey[200],
    backgroundPressed3: colors.grey[150],
    borderPressed: colors.grey[250],

    foregroundActive: colors.grey[750],
    foregroundActive1: colors.white,

    backgroundActive: colors.grey[100],
    backgroundActive1: colors.grey[150],

    borderActive: colors.grey[200], // buttons
    borderActive1: colors.grey[150],
    borderActive2: colors.grey[200],
    borderActive3: colors.grey[150], // divider

    foregroundFocus: colors.grey[750],
    foregroundFocus1: colors.grey[500],
    foregroundFocus2: colors.grey[450],
    foregroundFocus3: colors.white,

    backgroundFocus: colors.white,
    backgroundFocus1: colors.grey[50],
    backgroundFocus2: colors.grey[100],
    backgroundFocus3: colors.grey[150],

    borderFocusWithin: colors.white,
    borderFocus: colors.black,

    foregroundDisabled1: colors.grey[250],
    foregroundDisabled: colors.grey[250],

    backgroundDisabled: colors.grey[150],
    backgroundDisabled1: colors.grey[150],
    backgroundDisabled2: colors.grey[50],
    backgroundDisabled3: colors.grey[50],

    borderDisabled: colors.grey[150],
  }),
  brand: createColorScheme({
    foreground: colors.brand[600],
    foreground1: colors.brand[600],
    foreground2: colors.brand[700],
    foreground3: colors.brand[200],
    foreground4: colors.white,

    background: colors.brand[600],
    background1: colors.brand[100],
    background2: colors.brand[900],
    background3: colors.brand[1000],
    background4: colors.brand[800],

    border: colors.grey[200],
    border1: colors.brand[200],
    border2: colors.brand[300],

    shadow: colors.black, // opacity 25%
    shadowHover: colors.black,

    foregroundHover: colors.brand[600],
    foregroundHover1: colors.white,
    foregroundHover2: colors.brand[200],

    borderHover: colors.brand[300],

    backgroundHover: colors.brand[700],
    backgroundHover1: colors.brand[50],
    backgroundHover2: colors.brand[100],

    foregroundPressed: colors.brand[800],
    foregroundPressed1: colors.white,
    backgroundPressed: colors.brand[800], // it's 900 on the button - 800 is same as hover
    borderPressed: colors.brand[300],

    foregroundActive: colors.brand[600],
    foregroundActive1: colors.brand[600],
    foregroundActive2: colors.brand[200],

    backgroundActive: colors.brand[600],
    backgroundActive1: colors.brand[600],

    borderActive: colors.grey[200],
    borderActive1: colors.brand[200],
    borderActive2: colors.brand[300],

    foregroundFocus: colors.brand[600],
    foregroundFocus1: colors.brand[600],
    foregroundFocus2: colors.brand[700],
    foregroundFocus3: colors.brand[200],
    foregroundFocus4: colors.white,

    backgroundFocus: colors.brand[600],
    backgroundFocus1: colors.brand[100],
    backgroundFocus2: colors.brand[900],
    backgroundFocus3: colors.brand[1000],

    borderFocus: colors.black,
    borderFocusWithin: colors.white,
    borderFocus1: colors.brand[600], // only input

    foregroundDisabled: colors.grey[250],
    foregroundDisabled1: colors.grey[250],

    backgroundDisabled: colors.grey[150],
    backgroundDisabled1: colors.grey[150],

    borderDisabled: colors.grey[150],
  }),
  black: {
    foreground: colors.black,
    background: colors.white,
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
    background: colors.black,
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
    foreground: colors.green[600],
    foreground1: colors.white,
    foreground2: colors.green[400],
    background: colors.green[300],
  }),
  orange: createColorScheme({
    foreground: colors.orange[400],
    foreground1: colors.orange[300],
    background: colors.orange[400],
    border: colors.orange[200],
  }),
  pink: createColorScheme({
    foreground: colors.pink[600],
    foreground1: colors.pink[500],
    background: colors.pink[50],
    border: colors.pink[100],
  }),
  red: createColorScheme({
    foreground: colors.red[400],
    foreground1: colors.white,
    foreground2: colors.white,
    background: colors.red[400],
    background1: colors.red[50],
    background2: colors.ruby[500],
    background3: colors.red[400],
    border: colors.red[100],

    foregroundHover: colors.white,
    backgroundHover: colors.ruby[600],
    backgroundHover1: colors.red[400],

    foregroundPressed: colors.white,
    backgroundPressed: colors.ruby[700],
  }),
  yellow: createColorScheme({
    foreground: colors.yellow[300],
    foreground1: colors.grey[800],
    foreground2: colors.white,
    background: colors.yellow[600],
    background1: colors.yellow[100],
    background2: colors.yellow[500],
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
    border: colors.onyx[800],
    border1: 'transparent',
    border2: colors.onyx[300],
  }),
  amethyst: createColorScheme({
    background: colors.amethyst[600],
    backgroundHover: colors.amethyst[700],
    backgroundHover1: colors.amethyst[500],
    backgroundActive: colors.amethyst[700],
  }),
};

colorScheme.grey = colorScheme.default;

export const availableColors = [
  'default',
  'black',
  'white',
  'brand',
  'grey',
  'red',
  'yellow',
  'green',
  'pink',
  'orange',
];

export const isValidColor = (color: string): boolean => {
  return color && availableColors.indexOf(color) >= 0;
};

export const getColorSchemeKey = (color: string, primary?: boolean): string => {
  return color && isValidColor(color) ? color : primary ? 'brand' : 'default';
};

export const getColorScheme = <T extends ComponentAreaName | string>(
  colorScheme: StrictColorSchemeMapping<StrictColorScheme<T>, TeamsColorNames>,
  color?: string,
  primary?: boolean,
): StrictColorScheme<T> => {
  return colorScheme[getColorSchemeKey(color, primary)];
};
