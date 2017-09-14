import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';

const DEFAULT_BUTTON_HEIGHT = '40px';
const DEFAULT_PADDING = '0 4px';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles,
  focusInset?: string,
  focusColor?: string
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  let actionButtonStyles: IButtonStyles = {
    root: {
      borderWidth: '0',
      padding: DEFAULT_PADDING,
      height: DEFAULT_BUTTON_HEIGHT,
      color: theme.palette.neutralPrimary,
      backgroundColor: 'transparent'
    },

    rootHovered: {
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

    rootExpanded: {
      color: theme.palette.themePrimary
    },

    iconPressed: {
      color: theme.palette.themeDarker
    },

    rootDisabled: {
      color: theme.palette.neutralTertiary,
      backgroundColor: 'transparent'
    },

    rootChecked: {
      color: theme.palette.black,
    },

    iconChecked: {
      color: theme.palette.themeDarker
    },

    flexContainer: {
      justifyContent: 'flex-start'
    },

    icon: {
      color: theme.palette.themeDarkAlt
    },

    iconDisabled: {
      color: 'inherit'
    },

    menuIcon: {
      color: theme.palette.neutralSecondary
    }

  };

  return mergeStyleSets(baseButtonStyles, actionButtonStyles, customStyles)!;
});