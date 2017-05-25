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

const DEFAULT_BUTTON_HEIGHT = '40px';
const DEFAULT_PADDING = '0 4px';

export const getStyles = memoizeFunction((
  theme: ITheme = getTheme(),
  customStyles?: IButtonStyles
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  let commandButtonStyles: IButtonStyles = {
    root: {
      borderWidth: '0',
      padding: DEFAULT_PADDING,
      height: DEFAULT_BUTTON_HEIGHT,
      color: theme.palette.neutralPrimary,
      backgroundColor: 'transparent',

      ':hover': {
        color: theme.palette.themeDarker
      },
      ':active': {
        color: theme.palette.themePrimary
      }
    },

    rootDisabled: {
      color: theme.palette.neutralTertiary,
      backgroundColor: 'transparent'
    },

    rootToggled: {
      backgroundColor: theme.palette.neutralTertiaryAlt,

      ':hover': {
        backgroundColor: theme.palette.neutralLight
      }
    },

    flexContainer: {
      justifyContent: 'flex-start'
    },

    icon: {
      color: theme.palette.themePrimary
    },

    iconDisabled: {
      color: 'inherit'
    },

    menuIcon: {
      color: theme.palette.neutralSecondary
    }

  };

  return mergeStyleSets(baseButtonStyles, commandButtonStyles, customStyles);
});
