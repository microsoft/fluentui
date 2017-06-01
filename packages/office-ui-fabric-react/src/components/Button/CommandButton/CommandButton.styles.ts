import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  getTheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';

const COMMAND_BUTTON_HEIGHT = '40px';
const COMMAND_BUTTON_MINWIDTH = '80px';
const COMMAND_PADDING = '0 8px';

export const getStyles = memoizeFunction((
  theme: ITheme = getTheme(),
  customStyles?: IButtonStyles,
  focusInset?: string,
  focusColor?: string
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme, focusInset, focusColor);
  let commandButtonStyles: IButtonStyles = {
    root: {
      minWidth: COMMAND_BUTTON_MINWIDTH,
      height: COMMAND_BUTTON_HEIGHT,
      backgroundColor: theme.palette.neutralLighter,
      color: theme.palette.neutralPrimary,
      padding: COMMAND_PADDING,
      ':focus': {
        backgroundColor: theme.palette.neutralLight,
        color: theme.palette.neutralDark
      }
    },

    rootHovered: {
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.neutralDark,
      icon: {
        color: theme.palette.themeDark
      }
    },

    rootPressed: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
      color: theme.palette.black,
      icon: {
        color: theme.palette.themeDark
      }
    },

    rootChecked: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
      color: theme.palette.black,
      icon: {
        color: theme.palette.themeDarker
      }
    },

    rootCheckedHovered: {
      backgroundColor: theme.palette.neutralTertiary,
      color: theme.palette.black,
    },

    label: {
      fontWeight: 'bold' // theme.fontWeights.semibold,
    },

    icon: {
      color: theme.palette.themePrimary
    }

  };

  return mergeStyleSets(baseButtonStyles, commandButtonStyles, customStyles);
});
