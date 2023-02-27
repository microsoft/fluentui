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
    50: '#e8ebfa',
    100: '#dcdffa',
    200: '#c5cbfa',
    300: '#acb3fa',
    400: '#9399f5',
    450: '#9499f5',
    500: '#7a80eb',
    600: '#5b5fc7',
    700: '#444691',
    800: '#3d3e78',
    900: '#383966',
    1000: '#2f2f4a',
  },
};

export const naturalColors: TeamsNaturalColors = {
  grey: {
    0: '#FFFFFF',
    25: '#FCFCFB',
    50: '#FAF9F8',
    100: '#F3F2F1',
    150: '#EDEBE9',
    200: '#E1DFDD',
    250: '#C8C6C4',
    300: '#B3B0AD',
    340: '#999',
    350: '#979593',
    400: '#8A8886',
    430: '#707070',
    440: '#666666',
    450: '#605E5C',
    500: '#484644',
    550: '#3B3A39',
    600: '#323131',
    650: '#2D2C2C',
    700: '#292828',
    750: '#252423',
    800: '#201F1F',
    850: '#1B1A1A',
    900: '#11100F',
    1000: '#000000',
  },
  orange: {
    50: '#F9ECEA',
    100: '#EFDBD3',
    200: '#EDC2A7',
    300: '#E97548',
    400: '#CC4A31',
    500: '#BD432C',
    600: '#A33D2A',
    700: '#833122',
    800: '#664134',
    900: '#51332C',
  },
  pink: {
    50: '#FDF5FC',
    100: '#F5D9F2',
    150: '#EDBAE7',
    200: '#DA7DCF',
    300: '#D060C3',
    400: '#C94BBA',
    500: '#C239B3',
    600: '#AE33A0',
    650: '#932B87',
    700: '#6D1F64',
    800: '#3A1135',
    900: '#1F091C',
  },
  red: {
    50: '#FCF4F6',
    100: '#F3D6D8',
    200: '#F75E75',
    300: '#E73550',
    400: '#C4314B',
    500: '#A72037',
    600: '#8E192E',
    700: '#4F222B',
    800: '#3E1F25',
    900: '#1E040A',
  },
  green: {
    50: '#E7F2DA',
    100: '#BDDA9B',
    200: '#92C353',
    300: '#6BB700',
    400: '#13A40E',
    500: undefined,
    600: '#237B4B',
    700: undefined,
    800: '#0D2E0D',
    900: '#032003',
  },
  yellow: {
    50: undefined,
    100: '#FBF6D9',
    200: '#F2E384',
    300: '#F9EC02',
    400: '#F8D22A',
    500: '#FFB900',
    600: '#FFAA44',
    700: '#835C00',
    800: '#463100',
    900: '#261A00',
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
    100: 'rgba(255,255,255,0.85)',
    200: 'rgba(255,255,255,0.75)',
    300: 'rgba(255,255,255,0.65)',
    400: 'rgba(255,255,255,0.5)',
    500: 'rgba(255,255,255,0.4)',
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
    600: 'rgba(0,0,0,0.05)',
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
    foreground7: colors.grey[750],
    foreground8: colors.grey[750],
    foreground9: colors.grey[430],

    background: colors.white,
    background1: colors.grey[50],
    background2: colors.grey[100],
    background3: colors.grey[150],
    background4: colors.grey[100],
    background5: colors.grey[350],
    background6: colors.grey[550],

    border: colors.grey[200],
    border1: colors.grey[150],
    border2: colors.grey[200],
    border3: colors.grey[150],
    borderTransparent: 'transparent',
    borderTransparentActive: 'transparent',

    shadow: colors.black,
    shadowHover: colors.black,

    foregroundHover: colors.grey[750],
    foregroundHover1: colors.white,
    foregroundHover2: colors.white,

    backgroundHover: colors.grey[100],
    backgroundHover1: colors.grey[150],
    backgroundHover2: 'transparent',
    backgroundHover3: colors.grey[150],
    backgroundHover4: colors.grey[50],

    borderHover: colors.grey[250],

    foregroundPressed: colors.grey[750],
    backgroundPressed: colors.grey[200],
    backgroundPressed3: colors.grey[150],
    borderPressed: colors.grey[250],

    foregroundActive: colors.grey[750],
    foregroundActive1: colors.white,

    backgroundActive: colors.grey[100],
    backgroundActive1: colors.grey[150],
    backgroundActive2: colors.grey[150],

    borderActive: colors.grey[200],
    borderActive1: colors.grey[150],
    borderActive2: colors.grey[200],
    borderActive3: colors.grey[150],
    borderActive4: colors.grey[400],

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
    foreground5: colors.white,

    background: colors.brand[600],
    background1: colors.brand[100],
    background2: colors.brand[900],
    background3: colors.brand[1000],
    background4: colors.brand[800],
    background5: colors.brand[100],
    background6: colors.brand[600],

    border: colors.grey[200],
    border1: colors.brand[200],
    border2: colors.brand[300],

    shadow: colors.black,
    shadowHover: colors.black,

    foregroundHover: colors.brand[600],
    foregroundHover1: colors.white,
    foregroundHover2: colors.brand[200],

    borderHover: colors.brand[300],

    backgroundHover: colors.brand[700],
    backgroundHover1: colors.brand[50],
    backgroundHover2: colors.brand[100],
    backgroundHover3: colors.brand[100],

    foregroundPressed: colors.brand[800],
    foregroundPressed1: colors.white,
    backgroundPressed: colors.brand[800],
    backgroundPressed1: colors.brand[100],
    backgroundPressed2: colors.brand[100],
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
    borderFocus1: colors.brand[600],

    foregroundDisabled: colors.grey[250],
    foregroundDisabled1: colors.grey[250],

    backgroundDisabled: colors.grey[150],
    backgroundDisabled1: colors.grey[150],

    borderDisabled: colors.grey[150],
  }),
  black: {
    foreground: colors.black,
    foreground1: colors.white,
    background: colors.white,
    background1: colors.grey[750],
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
    foreground1: colors.grey[750],
    background: colors.black,
    background1: colors.white,
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
    foreground3: colors.white,
    background: colors.green[300],
    background1: colors.green[600],
    background2: colors.green[50],
    border: colors.green[100],
    border1: colors.green[600],
  }),
  orange: createColorScheme({
    foreground: colors.orange[400],
    foreground1: colors.orange[300],
    foreground2: colors.white,
    background: colors.orange[400],
    background1: colors.orange[400],
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
    border1: colors.red[300],

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
    foreground3: colors.grey[750],
    foreground4: colors.yellow[700],
    background: colors.yellow[600],
    background1: colors.yellow[100],
    background2: colors.yellow[500],
    background3: colors.yellow[100],
    border: colors.yellow[200],
    border1: colors.yellow[700],
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
    background3: colors.onyx[400],
    backgroundHover: colors.onyx[500],
    backgroundPressed: colors.onyx[800],
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
