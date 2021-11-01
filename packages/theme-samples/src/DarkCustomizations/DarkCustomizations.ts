import { createTheme } from '@fluentui/react';
import { DatePickerStyles } from './styles/DatePickerStyles';
import { PeoplePickerItemStyles } from './styles/PeoplePickerStyles';
import { addVariants } from '@fluentui/scheme-utilities';
import type { ICustomizations, IPalette, Theme, IPersonaCoinStyleProps, IPersonaCoinStyles } from '@fluentui/react';

const DarkDefaultPalette: Partial<IPalette> = {
  themeDarker: '#82c7ff',
  themeDark: '#6cb8f6',
  themeDarkAlt: '#3aa0f3',
  themePrimary: '#2899f5',
  themeSecondary: '#0078d4',
  themeTertiary: '#235a85',
  themeLight: '#004c87',
  themeLighter: '#043862',
  themeLighterAlt: '#092c47',
  black: '#ffffff',
  neutralDark: '#faf9f8',
  neutralPrimary: '#f3f2f1',
  neutralPrimaryAlt: '#c8c6c4',
  neutralSecondary: '#a19f9d',
  neutralSecondaryAlt: '#979693',
  neutralTertiary: '#797775',
  neutralTertiaryAlt: '#484644',
  neutralQuaternary: '#3b3a39',
  neutralQuaternaryAlt: '#323130',
  neutralLight: '#292827',
  neutralLighter: '#252423',
  neutralLighterAlt: '#201f1e',
  white: '#1b1a19',
  redDark: '#F1707B',
};

export const PersonaCoinStyles = (props: IPersonaCoinStyleProps): Partial<IPersonaCoinStyles> => {
  return {
    initials: {
      color: props.showUnknownPersonaCoin ? DarkTheme.palette.redDark : DarkTheme.palette.black,
    },
  };
};

export const DarkTheme: Theme = createTheme({
  palette: DarkDefaultPalette,
  semanticColors: {
    buttonText: DarkDefaultPalette.black,
    buttonTextPressed: DarkDefaultPalette.neutralDark,
    buttonTextHovered: DarkDefaultPalette.neutralPrimary,
    disabledBackground: DarkDefaultPalette.neutralQuaternaryAlt,
    inputBackgroundChecked: DarkDefaultPalette.themePrimary,
    menuBackground: DarkDefaultPalette.neutralLighter,
    menuItemBackgroundHovered: DarkDefaultPalette.neutralQuaternaryAlt,
    menuItemBackgroundPressed: DarkDefaultPalette.neutralQuaternary,
    menuDivider: DarkDefaultPalette.neutralTertiaryAlt,
    menuIcon: DarkDefaultPalette.themeDarkAlt,
    menuHeader: DarkDefaultPalette.black,
    menuItemText: DarkDefaultPalette.neutralPrimary,
    menuItemTextHovered: DarkDefaultPalette.neutralDark,
  },
  isInverted: true,
});

const componentStyles = {
  Card: {
    styles: {
      root: {
        background: DarkTheme.palette.neutralLighter,
      },
    },
  },
  DatePicker: {
    styles: DatePickerStyles,
  },
  DetailsList: {
    styles: {
      headerWrapper: {
        selectors: {
          '.ms-DetailsHeader': {
            borderColor: DarkTheme.palette.neutralQuaternary,
          },
        },
      },
    },
  },
  ActionButton: {
    styles: {
      root: {
        backgroundColor: DarkTheme.palette.white,
      },
      rootDisabled: {
        backgroundColor: DarkTheme.palette.neutralLighter,
      },
      rootHovered: {
        backgroundColor: DarkTheme.palette.neutralLight,
      },
      rootPressed: {
        backgroundColor: DarkTheme.palette.neutralQuaternaryAlt,
      },
    },
  },
  DetailsRow: {
    styles: {
      root: {
        selectors: {
          ':hover': {
            background: DarkTheme.palette.neutralLighter,
          },
        },
        borderColor: DarkTheme.palette.neutralQuaternaryAlt,
      },
    },
  },
  Modal: {
    styles: {
      main: {
        backgroundColor: DarkTheme.palette.neutralLighter,
      },
    },
  },
  Overlay: {
    styles: {
      root: {
        background: DarkTheme.palette.blackTranslucent40,
      },
    },
  },
  VerticalDivider: {
    styles: {
      divider: {
        backgroundColor: DarkTheme.palette.neutralQuaternaryAlt,
      },
      wrapper: {
        Backgroundcolor: DarkTheme.palette.green,
      },
    },
  },
  DocumentCard: {
    styles: {
      root: {
        border: `1px solid ${DarkTheme.palette.neutralQuaternaryAlt}`,
        selectors: {
          '.ms-DocumentCardPreview': {
            borderRight: `1px solid ${DarkTheme.palette.neutralQuaternaryAlt}`,
          },
        },
      },
    },
  },
  DocumentCardPreview: {
    styles: {
      root: {
        borderBottom: `1px solid ${DarkTheme.palette.neutralQuaternaryAlt}`,
        borderRight: `1px solid ${DarkTheme.palette.neutralQuaternaryAlt}`,
      },
    },
  },
  Panel: {
    styles: {
      main: {
        backgroundColor: DarkTheme.palette.neutralLighter,
      },
      closeButton: {
        color: DarkTheme.palette.neutralSecondary,
        selectors: {
          ':hover': {
            color: DarkTheme.palette.neutralPrimary,
          },
        },
      },
    },
  },
  PeoplePickerItem: {
    styles: PeoplePickerItemStyles,
  },
  PersonaCoin: {
    styles: PersonaCoinStyles,
  },
  Separator: {
    styles: {
      root: {
        selectors: {
          ':before': {
            backgroundColor: DarkTheme.palette.neutralQuaternaryAlt,
          },
          ':after': {
            backgroundColor: DarkTheme.palette.neutralQuaternaryAlt,
          },
        },
      },
    },
  },
  SpinButton: {
    styles: {
      inputTextSelected: {
        color: DarkTheme.palette.black,
        background: DarkTheme.palette.themePrimary,
      },
    },
  },
};

DarkTheme.components = componentStyles;
addVariants(DarkTheme);

export const DarkCustomizations: ICustomizations = {
  settings: {
    theme: DarkTheme,
  },
  scopedSettings: componentStyles,
};
