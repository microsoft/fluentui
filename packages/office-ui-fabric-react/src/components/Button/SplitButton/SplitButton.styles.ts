import { IButtonStyles } from '../Button.types';
import { HighContrastSelector, ITheme, concatStyleSets, getFocusStyle, IStyle } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles): IButtonStyles => {
    const { effects, palette } = theme;

    const buttonHighContrastFocus = {
      left: -2,
      top: -2,
      bottom: -2,
      right: -2,
      border: 'none'
    };

    const splitButtonDividerBaseStyles: IStyle = {
      position: 'absolute',
      width: 1,
      right: 31,
      top: 8,
      bottom: 8
    };

    const splitButtonStyles: IButtonStyles = {
      splitButtonContainer: [
        getFocusStyle(theme, { highContrastStyle: buttonHighContrastFocus, inset: 2 }),
        {
          display: 'inline-flex',
          selectors: {
            '.ms-Button--default': {
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
              borderRight: 'none'
            },
            '.ms-Button--primary': {
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
              border: 'none',

              selectors: {
                [HighContrastSelector]: {
                  color: 'Window',
                  backgroundColor: 'WindowText',
                  MsHighContrastAdjust: 'none'
                }
              }
            },
            '.ms-Button--primary + .ms-Button': {
              border: 'none'
            }
          }
        }
      ],
      splitButtonContainerHovered: {
        selectors: {
          '.ms-Button--primary': {
            selectors: {
              [HighContrastSelector]: {
                color: 'Window',
                backgroundColor: 'Highlight'
              }
            }
          },
          '.ms-Button.is-disabled': {
            selectors: {
              [HighContrastSelector]: {
                color: 'GrayText',
                borderColor: 'GrayText',
                backgroundColor: 'Window'
              }
            }
          }
        }
      },
      splitButtonContainerChecked: {
        selectors: {
          '.ms-Button--primary': {
            selectors: {
              [HighContrastSelector]: {
                color: 'Window',
                backgroundColor: 'WindowText',
                MsHighContrastAdjust: 'none'
              }
            }
          }
        }
      },
      splitButtonContainerCheckedHovered: {
        selectors: {
          '.ms-Button--primary': {
            selectors: {
              [HighContrastSelector]: {
                color: 'Window',
                backgroundColor: 'WindowText',
                MsHighContrastAdjust: 'none'
              }
            }
          }
        }
      },
      splitButtonContainerFocused: {
        outline: 'none!important'
      },
      splitButtonMenuButton: {
        padding: 6,
        height: 'auto',
        boxSizing: 'border-box',
        borderRadius: 0,
        borderTopRightRadius: effects.roundedCorner2,
        borderBottomRightRadius: effects.roundedCorner2,
        border: `1px solid ${palette.neutralSecondaryAlt}`,
        borderLeft: 'none',
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
      splitButtonDivider: {
        ...splitButtonDividerBaseStyles,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText'
          }
        }
      },
      splitButtonDividerDisabled: {
        ...splitButtonDividerBaseStyles,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'GrayText'
          }
        }
      },
      splitButtonMenuButtonDisabled: {
        pointerEvents: 'none',
        border: 'none',
        selectors: {
          ':hover': {
            cursor: 'default'
          },

          '.ms-Button--primary': {
            selectors: {
              [HighContrastSelector]: {
                color: 'GrayText',
                borderColor: 'GrayText',
                backgroundColor: 'Window'
              }
            }
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
        border: 'none',
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
            borderColor: 'GrayText',
            backgroundColor: 'Window'
          }
        }
      }
    };

    return concatStyleSets(splitButtonStyles, customStyles)!;
  }
);
