import { IButtonStyles } from '../Button.types';
import {
  ITheme,
  concatStyleSets,
  getFocusStyle
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles
): IButtonStyles => {
  const buttonHighContrastFocus = {
    left: -2,
    top: -2,
    bottom: -2,
    right: -2,
    border: 'none'
  };

  const splitButtonStyles: IButtonStyles = {
    splitButtonContainer: {
      position: 'relative',
      display: 'inline-block',
      border: '1px solid transparent'
    },
    splitButtonContainerFocused: {
      outline: 'none!important',
      border: '1px solid'
    },
    splitButtonMenuButton: [
      getFocusStyle(theme, -1, 'relative', buttonHighContrastFocus),
      {
        padding: 6,
        height: 'auto',
        boxSizing: 'border-box',
        border: '1px solid transparent',
        borderRadius: 0,
        outline: 'transparent',
        userSelect: 'none',
        display: 'inline-block',
        textDecoration: 'none',
        textAlign: 'center',
        cursor: 'pointer',
        verticalAlign: 'top',
        width: 32,
        marginLeft: -1
      }
    ],

    splitButtonDivider: {
      position: 'absolute',
      width: 1,
      right: 31,
      top: 8,
      bottom: 8
    },

    splitButtonMenuButtonDisabled: {
      pointerEvents: 'none',
      selectors: {
        ':hover': {
          cursor: 'default'
        }
      }
    },

    splitButtonFlexContainer: {
      display: 'flex',
      height: '100%',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
  };

  return concatStyleSets(splitButtonStyles, customStyles)!;
});
