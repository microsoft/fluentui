import { concatStyleSets, HighContrastSelector } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles';
import type { IButtonStyles } from '../Button.types';
import type { ITheme } from '../../../Styling';

const DEFAULT_BUTTON_HEIGHT = '40px';
const DEFAULT_PADDING = '0 4px';

export const getStyles = memoizeFunction((theme: ITheme, customStyles?: IButtonStyles): IButtonStyles => {
  const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  const actionButtonStyles: IButtonStyles = {
    root: {
      padding: DEFAULT_PADDING,
      height: DEFAULT_BUTTON_HEIGHT,
      color: theme.palette.neutralPrimary,
      backgroundColor: 'transparent',
      border: '1px solid transparent',
      [HighContrastSelector]: {
        borderColor: 'Window',
      },
    },

    rootHovered: {
      color: theme.palette.themePrimary,
      [HighContrastSelector]: {
        color: 'Highlight',
      },
    },

    iconHovered: {
      color: theme.palette.themePrimary,
    },

    rootPressed: {
      color: theme.palette.black,
    },

    rootExpanded: {
      color: theme.palette.themePrimary,
    },

    iconPressed: {
      color: theme.palette.themeDarker,
    },

    rootDisabled: {
      color: theme.palette.neutralTertiary,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      [HighContrastSelector]: {
        color: 'GrayText',
      },
    },

    rootChecked: {
      color: theme.palette.black,
    },

    iconChecked: {
      color: theme.palette.themeDarker,
    },

    flexContainer: {
      justifyContent: 'flex-start',
    },

    icon: {
      color: theme.palette.themeDarkAlt,
    },

    iconDisabled: {
      color: 'inherit',
    },

    menuIcon: {
      color: theme.palette.neutralSecondary,
    },

    textContainer: {
      flexGrow: 0,
    },
  };

  return concatStyleSets(baseButtonStyles, actionButtonStyles, customStyles)!;
});
