import { transparentColors } from '../teams/colors';

export const colors = {
  black: '#000',
  white: '#fff',
  grey: {
    25: '#fafafa',
    50: '#f5f5f5',
    100: '#f0f0f0',
    150: '#ebebeb',
    200: '#e0e0e0',
    220: '#d6d6d6',
    230: '#d1d1d1',
    250: '#c7c7c7',
    270: '#bdbdbd',
    300: '#b3b3b3',
    310: '#adadad',
    350: '#949494',
    400: '#8a8a8a',
    430: '#707070',
    440: '#666',
    450: '#616161',
    460: '#5c5c5c',
    500: '#424242',
    550: '#3d3d3d',
    600: '#333',
    650: '#2e2e2e',
    700: '#292929',
    750: '#242424',
    800: '#1f1f1f',
    850: '#1a1a1a',
    870: '#141414',
    900: '#0f0f0f',
    910: '#0a0a0a',
  },
  brand: {
    50: '#e8ebfa',
    100: '#dcdffa',
    200: '#c5cbfa',
    300: '#acb3fa',
    400: '#9399f5',
    450: '#9399f5',
    500: '#7a80eb',
    600: '#5b5fc7',
    700: '#444791',
    800: '#3d3e78',
    900: '#383966',
    1000: '#2f2f4a',
  },
};

export const colorScheme = {
  default: {
    foreground: colors.grey['750'],
    foreground1: colors.grey['500'],
    foreground2: colors.grey['450'],
    foreground3: colors.white,
    foreground4: colors.white,
    foreground5: colors.grey['100'],
    foreground6: colors.grey['200'],
    foreground7: colors.grey['450'],

    background: colors.white,
    background1: colors.grey['25'],
    background2: colors.grey['50'],
    background3: colors.grey['100'],
    background4: colors.grey['150'],
    background5: colors.grey['200'],
    background6: colors.grey['150'],
    background7: colors.grey['50'],

    border: colors.grey['230'],
    border1: colors.grey['100'],
    border2: colors.grey['200'],
    border3: colors.grey['100'],

    foregroundHover: colors.grey['750'],
    foregroundHover1: colors.white,
    foregroundHover2: colors.white,

    backgroundHover: colors.grey['50'],
    backgroundHover1: colors.grey['25'],
    backgroundHover2: 'transparent',
    backgroundHover3: colors.grey['150'],
    backgroundHover4: colors.grey['25'],

    borderHover: colors.grey['250'],

    foregroundPressed: colors.grey['750'],
    backgroundPressed: colors.grey['200'],
    backgroundPressed2: colors.grey['50'],

    foregroundActive: colors.grey['750'],
    foregroundActive1: colors.white,

    backgroundActive: colors.grey['150'],
    backgroundActive1: colors.white,

    borderActive: colors.grey['270'],

    // foregroundFocus: not specified,
    // backgroundFocus: not specified,

    borderFocus: colors.black,
    borderFocusWithin: colors.white,

    foregroundDisabled: colors.grey['250'],
    foregroundDisabled1: colors.grey['250'],

    borderDisabled: colors.grey['200'],

    backgroundDisabled: colors.grey['100'],
    backgroundDisabled1: colors.grey['100'],
  },
  brand: {
    background: colors.brand['600'],
    background1: colors.brand['50'],
    background2: colors.brand['900'],
    background3: colors.brand['1000'],
    background4: colors.brand['800'],
    background5: colors.brand['100'],

    foreground: colors.brand['600'],
    foreground1: colors.brand['600'],
    foreground2: colors.brand['700'],
    foreground3: colors.brand['200'],
    foreground4: colors.white,

    border: colors.grey['200'],
    border1: colors.brand['300'],
    border2: colors.brand['200'],

    foregroundHover: colors.brand['600'],
    foregroundHover1: colors.white,
    foregroundHover2: colors.brand['200'],

    borderHover: colors.brand['300'],

    backgroundHover: colors.brand['700'],
    backgroundHover1: colors.brand['50'],
    backgroundHover3: colors.brand['600'],

    foregroundPressed: colors.brand['700'],
    foregroundPressed1: colors.white,

    backgroundPressed: colors.brand['800'],

    borderPressed: transparentColors.onyx['700'],

    foregroundActive: colors.brand['600'],
    foregroundActive1: colors.brand['600'],
    foregroundActive2: colors.brand['50'],

    backgroundActive: colors.brand['600'],
    backgroundActive1: colors.brand['600'],

    borderActive: colors.grey['200'],
    borderActive1: colors.brand['50'],
    borderActive2: colors.brand['300'],

    foregroundFocus: colors.brand['600'],
    foregroundFocus1: colors.brand['600'],
    foregroundFocus2: colors.brand['700'],
    foregroundFocus3: colors.brand['50'],
    foregroundFocus4: colors.white,

    backgroundFocus: colors.brand['600'],
    backgroundFocus1: colors.brand['50'],
    backgroundFocus2: colors.brand['900'],
    backgroundFocus3: colors.brand['1000'],

    borderFocus: colors.black,
    borderFocus1: colors.brand['600'],

    borderFocusWithin: colors.white,

    foregroundDisabled: colors.grey['250'],
    foregroundDisabled1: colors.grey['250'],

    borderDisabled: colors.grey['550'],

    backgroundDisabled: colors.grey['100'],
    backgroundDisabled1: colors.grey['100'],
  },
};
