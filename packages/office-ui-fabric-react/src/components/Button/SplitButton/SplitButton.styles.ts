import { IButtonStyles } from '../Button.types';
import { HighContrastSelector, ITheme, concatStyleSets, getFocusStyle, IStyle } from '../../../Styling';
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

    const splitButtonDivider: IStyle = {
      position: 'absolute',
      width: 1,
      right: 31,
      top: 8,
      bottom: 8
    };

    const splitButtonDividerDisabled: IStyle = {
      position: 'absolute',
      width: 1,
      right: 31,
      top: 8,
      bottom: 8,
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'GrayText'
        }
      }
    };

    const splitButtonStyles: IButtonStyles = {
      splitButtonContainer: [
        getFocusStyle(theme, { highContrastStyle: buttonHighContrastFocus }),
        {
          display: 'inline-flex',
          selectors: {
            '.ms-Button--default, .ms-Button--primary': {
              borderRight: 'none'
            }
          }
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
        marginLeft: -1,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0
      },

      splitButtonDivider: splitButtonDivider,
      splitButtonDividerDisabled: splitButtonDividerDisabled,
      splitButtonMenuButtonDisabled: {
        pointerEvents: 'none',
        selectors: {
          ':hover': {
            cursor: 'default'
          },
          [HighContrastSelector]: {
            border: `1px solid GrayText`,
            color: 'GrayText',
            backgroundColor: 'Window'
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
