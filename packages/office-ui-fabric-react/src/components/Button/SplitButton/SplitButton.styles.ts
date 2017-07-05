import { ISplitButtonStyles } from '../SplitButton/SplitButton.Props';
import {
  ITheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_PADDING = '0 4px';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: ISplitButtonStyles
): ISplitButtonStyles => {
  let iconButtonStyles: ISplitButtonStyles = {
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
      backgroundColor: theme.palette.neutralLighter,
      padding: '6px',
      ':hover': {
        backgroundColor: theme.palette.neutralLight
      }
    },

    splitButtonMenuButtonDisabled: {
      backgroundColor: theme.palette.neutralLighter,
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

  return mergeStyleSets(iconButtonStyles, customStyles);
});
