import { IButtonStyles } from '../Button.types';
import { ITheme, concatStyleSets, getFocusStyle } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles): IButtonStyles => {
    const buttonHighContrastFocus = {
      left: -2,
      top: -2,
      bottom: -2,
      right: -2,
      border: 'none'
    };

    const splitButtonStyles: IButtonStyles = {
      splitButtonContainer: [
        getFocusStyle(theme, 0, 'relative', buttonHighContrastFocus),
        {
          display: 'inline-flex'
        }
      ],
      splitButtonContainerFocused: {
        outline: 'none!important'
      },
      splitButtonMenuButton: {
        padding: 6,
        height: 'auto',
        boxSizing: 'border-box',
        border: 0,
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
      },

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

      splitButtonContainerDisabled: {
        outline: 'none',
        border: 'none'
      }
    };

    return concatStyleSets(splitButtonStyles, customStyles)!;
  }
);
