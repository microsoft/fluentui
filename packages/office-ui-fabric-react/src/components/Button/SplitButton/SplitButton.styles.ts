import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles
): IButtonStyles => {
  let splitButtonStyles: IButtonStyles = {
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
    },

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
      backgroundColor: theme.palette.neutralLighter,
      ':hover': {
        backgroundColor: theme.palette.neutralLight
      },
    },

    splitButtonMenuButtonDisabled: {
      backgroundColor: theme.palette.neutralLighter,
      ':hover': {
        backgroundColor: theme.palette.neutralLighter,
        cursor: 'default'
      }
    },

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
    },
    splitButtonMenuButtonChecked: {
      backgroundColor: theme.palette.themePrimary,
    },

    splitButtonMenuButtonExpanded: {
      backgroundColor: theme.palette.neutralLight,
    },
  };

  return mergeStyleSets(splitButtonStyles, customStyles)!;
});
