import { IButtonStyles } from './Button.Props';
import { ITheme } from '../../Styling';

export function standardStyles(theme: ITheme): IButtonStyles {
  return {
    root: {
      backgroundColor: theme.palette.neutralLighter,
      color: theme.palette.neutralPrimary
    },

    rootHovered: {
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.black
    },

    rootPressed: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
      color: theme.palette.neutralDark
    },

    rootExpanded: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
      color: theme.palette.neutralDark
    },

    rootChecked: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
      color: theme.palette.neutralDark
    },

    rootCheckedHovered: {
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.black
    },

    // Split button styles
    splitButtonContainer: {
      selectors: {
        ':focus': {
          borderColor: theme.palette.neutralDark
        }
      }
    },

    splitButtonMenuButton: {
      color: theme.palette.white,
      backgroundColor: theme.palette.neutralLighter,
      selectors: {
        ':hover': {
          backgroundColor: theme.palette.neutralLight
        }
      },
    },

    splitButtonMenuButtonDisabled: {
      backgroundColor: theme.palette.neutralLighter,
      selectors: {
        ':hover': {
          backgroundColor: theme.palette.neutralLighter,
        }
      }
    },

    splitButtonMenuButtonChecked: {
      backgroundColor: theme.palette.themePrimary,
    },

    splitButtonMenuButtonExpanded: {
      backgroundColor: theme.palette.neutralLight,
    },

    splitButtonMenuIcon: {
      color: theme.palette.neutralPrimary
    },

    splitButtonMenuIconDisabled: {
      color: theme.palette.neutralTertiary
    },
  };
}

export function primaryStyles(theme: ITheme): IButtonStyles {
  return {
    root: {
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white
    },

    rootHovered: {
      backgroundColor: theme.palette.themeDark,
      color: theme.palette.white
    },

    rootPressed: {
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white
    },

    rootExpanded: {
      backgroundColor: theme.palette.themeDark,
      color: theme.palette.white
    },

    rootChecked: {
      backgroundColor: theme.palette.themeDark,
      color: theme.palette.white,
    },

    rootCheckedHovered: {
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white
    },

    // Split button styles
    splitButtonContainer: {
      selectors: {
        ':focus': {
          borderColor: theme.palette.neutralDark
        }
      }
    },

    splitButtonMenuButton: {
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white,
      selectors: {
        ':hover': {
          backgroundColor: theme.palette.themeDark
        }
      },
    },

    splitButtonMenuButtonDisabled: {
      backgroundColor: theme.palette.neutralLighter,
      selectors: {
        ':hover': {
          backgroundColor: theme.palette.neutralLighter,
        }
      }
    },

    splitButtonMenuButtonChecked: {
      backgroundColor: theme.palette.themeDark,
    },

    splitButtonMenuButtonExpanded: {
      backgroundColor: theme.palette.themeDark,
    },

    splitButtonMenuIcon: {
      color: theme.palette.white
    },

    splitButtonMenuIconDisabled: {
      color: theme.palette.neutralTertiary
    },

  };
}