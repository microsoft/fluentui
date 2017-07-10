import { ISplitButtonStyles } from '../SplitButton/SplitButton.Props';
import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_PADDING = '0 4px';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: ISplitButtonStyles
): ISplitButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  let splitButtonStyles: ISplitButtonStyles = {
    splitButtonContainer: {
      position: 'absolute',
      border: '1px solid transparent',
      ':hover': {
        border: '1px solid',
        borderColor: theme.palette.neutralLight
      },
      ':focus': {
        outline: 'none!important',
        border: '1px solid',
        borderColor: theme.palette.neutralDark
      }
    },

    splitButtonContainerDisabled: {
      position: 'absolute',
    },

    splitButtonMenuButton: {
      ':hover': {
        backgroundColor: theme.palette.neutralLight
      },
      minWidth: 0
    },

    splitButtonMenuButtonDisabled: {
      backgroundColor: theme.palette.neutralLighter,
      minWidth: 0
    },

    splitButtonMenuIcon: {
      color: theme.palette.neutralPrimary
    },

    splitButtonMenuIconDisabled: {
      color: theme.palette.neutralTertiary
    },

    splitButtonMenuButtonChecked: {
      backgroundColor: theme.palette.themePrimary,
    },
  };

  return mergeStyleSets(baseButtonStyles, splitButtonStyles, customStyles);
});
