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

const DEFAULT_BUTTON_HEIGHT = '40px';
const DEFAULT_PADDING = '0 4px';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles,
  focusInset?: string,
  focusColor?: string
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  let splitButtonStyles: ISplitButtonStyles = getSplitButtonStyles(theme);
  let actionButtonStyles: IButtonStyles = {
    root: {
      borderWidth: '0',
      padding: DEFAULT_PADDING,
      height: DEFAULT_BUTTON_HEIGHT,
      color: theme.palette.neutralPrimary,
      backgroundColor: 'transparent'
    },

    rootHovered: {
<<<<<<< HEAD
      color: theme.palette.themeDarker
    },

    rootPressed: {
      color: theme.palette.themePrimary
    },

=======
      color: theme.palette.themePrimary,
      icon: {
        color: theme.palette.themePrimary
      }
    },

    iconHovered: {
      color: theme.palette.themePrimary
    },

    rootPressed: {
      color: theme.palette.black,
    },

    iconPressed: {
      color: theme.palette.themeDarker
    },

>>>>>>> commandbutton-to-actionbutton
    rootDisabled: {
      color: theme.palette.neutralTertiary,
      backgroundColor: 'transparent'
    },

    rootChecked: {
<<<<<<< HEAD
      backgroundColor: theme.palette.neutralTertiaryAlt,

      ':hover': {
        backgroundColor: theme.palette.neutralLight
      }
=======
      color: theme.palette.black,
    },

    iconChecked: {
      color: theme.palette.themeDarker
>>>>>>> commandbutton-to-actionbutton
    },

    flexContainer: {
      justifyContent: 'flex-start'
    },

    icon: {
<<<<<<< HEAD
      color: theme.palette.themePrimary
=======
      color: theme.palette.themeDarkAlt
>>>>>>> commandbutton-to-actionbutton
    },

    iconDisabled: {
      color: 'inherit'
    },

    menuIcon: {
      color: theme.palette.neutralSecondary
    }

  };

  return mergeStyleSets(baseButtonStyles, actionButtonStyles, customStyles);
});
