import { IButtonStyles } from '../Button.Props';
import { ISplitButtonStyles } from '../SplitButton/SplitButton.Props';
import {
  ITheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';
import {
  getStyles as getSplitButtonStyles
} from '../SplitButton/SplitButton.styles';

const COMMAND_BUTTON_HEIGHT = '40px';
const COMMAND_BUTTON_MINWIDTH = '40px';
const COMMAND_PADDING = '0 4px';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles,
  focusInset?: string,
  focusColor?: string
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  let baseSplitButtonStyles: ISplitButtonStyles = getSplitButtonStyles(theme);
  let commandButtonStyles: IButtonStyles = {
    root: {
      minWidth: COMMAND_BUTTON_MINWIDTH,
      height: COMMAND_BUTTON_HEIGHT,
      backgroundColor: theme.palette.neutralLighter,
      color: theme.palette.neutralPrimary,
<<<<<<< HEAD
      padding: COMMAND_PADDING,
      ':focus': {
        backgroundColor: theme.palette.neutralLight,
        color: theme.palette.neutralDark
      }
=======
      padding: COMMAND_PADDING
>>>>>>> commandbutton-to-actionbutton
    },

    rootHovered: {
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.neutralDark,
      icon: {
        color: theme.palette.themeDark
      }
    },

    rootPressed: {
      backgroundColor: theme.palette.neutralQuaternaryAlt,
      color: theme.palette.black,
      icon: {
        color: theme.palette.themeDark
      }
    },

    rootChecked: {
      backgroundColor: theme.palette.neutralQuaternaryAlt,
      color: theme.palette.black,
      icon: {
        color: theme.palette.themeDarker
      }
    },

    rootCheckedHovered: {
      backgroundColor: theme.palette.neutralQuaternary,
      color: theme.palette.black,
    },

    label: {
      fontWeight: 'normal' // theme.fontWeights.semibold,
    },

    icon: {
      color: theme.palette.themeDarkAlt
<<<<<<< HEAD
=======
    },

    menuIcon: {
      color: theme.palette.neutralSecondary
>>>>>>> commandbutton-to-actionbutton
    }

  };

  return mergeStyleSets(baseButtonStyles, commandButtonStyles, baseSplitButtonStyles, customStyles);
});
