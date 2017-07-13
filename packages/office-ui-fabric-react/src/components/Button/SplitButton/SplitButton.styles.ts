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
  let splitButtonCommonStyles: ISplitButtonStyles = {
    splitButtonMenuButton: {
      padding: '6px',
      height: 'auto',
      color: theme.palette.white,
      boxSizing: 'border-box',
      border: '1px solid transparent',
      userSelect: 'none',
      display: 'inline-block',
      textDecoration: 'none',
      textAlign: 'center',
      cursor: 'pointer',
      verticalAlign: 'top',
      width: '32px',
    }
  }
  let splitButtonStyles: ISplitButtonStyles = {
    splitButtonContainer: {
      position: 'relative',
      display: 'inline-block',
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

    splitButtonMenuButton: mergeStyleSets(splitButtonCommonStyles.splitButtonMenuButton, {
      backgroundColor: theme.palette.neutralLighter,
      ':hover': {
        backgroundColor: theme.palette.neutralLight
      },
    }),

    splitButtonMenuButtonDisabled: mergeStyleSets(splitButtonCommonStyles.splitButtonMenuButton, {
      backgroundColor: theme.palette.neutralLighter,
    }),

    splitButtonMenuButtonChecked: mergeStyleSets(splitButtonCommonStyles.splitButtonMenuButton, {
      backgroundColor: theme.palette.themePrimary,
    }),

    splitButtonMenuIcon: {
      color: theme.palette.neutralPrimary
    },

    splitButtonMenuIconDisabled: {
      color: theme.palette.neutralTertiary
    },

    splitButtonFlexContainer: {
      display: 'flex',
      height: '100%',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  return mergeStyleSets(splitButtonStyles, customStyles);
});
