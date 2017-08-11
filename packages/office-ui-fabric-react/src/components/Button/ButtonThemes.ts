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
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white
    },

    rootChecked: {
      backgroundColor: theme.palette.themeDark,
      color: theme.palette.white,
    },

    rootCheckedHovered: {
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.black
    }
  };
}