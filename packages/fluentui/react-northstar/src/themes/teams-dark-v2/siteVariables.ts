import { colors as colorsV2 } from '../teams-v2/siteVariables';
import { transparentColors } from '../teams/colors';

export const colors = colorsV2;

export const colorScheme = {
  default: {
    foreground: colors.white,
    foreground1: colors.grey['220'],
    foreground2: colors.grey['310'],
    foreground3: colors.white,
    foreground4: colors.white,
    foreground5: colors.grey['450'],
    foreground6: colors.grey['550'],
    foreground7: colors.grey['220'],

    background: colors.grey['700'],
    background1: colors.grey['750'],
    background2: colors.grey['800'],
    background3: colors.grey['870'],
    background4: colors.grey['550'],
    background5: colors.grey['600'],
    background6: colors.grey['910'],
    background7: colors.grey['850'],

    border: colors.grey['450'],
    border1: colors.grey['850'],
    border2: colors.grey['900'],
    border3: colors.grey['550'],

    borderPressed: transparentColors.silver['500'],

    foregroundHover: colors.white,
    foregroundHover1: colors.white,
    foregroundHover2: colors.white,

    backgroundHover: colors.grey['550'],
    backgroundHover1: colors.grey['750'],
    backgroundHover2: 'transparent',
    backgroundHover3: colors.grey['650'],
    backgroundHover4: colors.grey['750'],
    backgroundHover6: colors.grey['550'],
    borderHover: colors.grey['430'],

    foregroundPressed: colors.white,
    backgroundPressed: colors.grey['650'],
    backgroundPressed2: colors.grey['850'],

    foregroundActive: colors.white,
    foregroundActive1: colors.white,

    backgroundActive: colors.grey['600'],
    backgroundActive1: colors.grey['800'],

    borderActive: colors.grey['440'],

    // foregroundFocus: not specified,
    // backgroundFocus: not specified,

    borderFocus: colors.white,
    borderFocusWithin: colors.black,

    foregroundDisabled: colors.grey['460'],
    foregroundDisabled1: colors.grey['460'],

    borderDisabled: colors.grey['500'],

    backgroundDisabled: colors.grey['800'],
    backgroundDisabled1: colors.grey['800'],
  },
  brand: {
    background: colors.brand['700'],
    background1: colors.brand['1000'],
    background2: colors.brand['900'],
    background3: colors.brand['1000'],
    background4: colors.grey['910'],
    background5: colors.brand['900'],

    foreground: colors.brand['450'],
    foreground1: colors.brand['450'],
    foreground2: colors.brand['450'],
    foreground3: colors.brand['200'],
    foreground4: colors.white,

    border: colors.grey['450'],
    border1: colors.brand['800'],
    border2: colors.brand['800'],

    foregroundHover: colors.brand['450'],
    foregroundHover1: colors.white,
    foregroundHover2: colors.brand['200'],

    borderHover: colors.brand['600'],

    backgroundHover: colors.brand['600'],
    backgroundHover1: colors.brand['900'],
    backgroundHover3: colors.grey['750'],

    foregroundPressed: colors.brand['200'],
    foregroundPressed1: colors.white,

    backgroundPressed: colors.brand['800'],

    borderPressed: colors.brand['800'],

    foregroundActive: colors.brand['450'],
    foregroundActive1: colors.brand['450'],
    foregroundActive2: colors.brand['50'],

    backgroundActive: colors.brand['450'],
    backgroundActive1: colors.brand['450'],

    borderActive: colors.grey['450'],
    borderActive1: colors.brand['800'],
    borderActive2: colors.brand['800'],

    foregroundFocus: colors.brand['450'],
    foregroundFocus1: colors.brand['450'],
    foregroundFocus2: colors.brand['450'],
    foregroundFocus3: colors.brand['50'],
    foregroundFocus4: colors.white,

    backgroundFocus: colors.brand['450'],
    backgroundFocus1: colors.brand['1000'],
    backgroundFocus2: colors.brand['900'],
    backgroundFocus3: colors.brand['1000'],

    borderFocus: colors.white,
    borderFocus1: colors.brand['450'],

    borderFocusWithin: colors.black,

    foregroundDisabled: colors.grey['460'],
    foregroundDisabled1: colors.grey['460'],

    borderDisabled: colors.grey['500'],

    backgroundDisabled: colors.grey['800'],
    backgroundDisabled1: colors.grey['800'],
  },
};
