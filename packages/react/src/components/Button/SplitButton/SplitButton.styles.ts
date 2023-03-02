import { HighContrastSelector, concatStyleSets, getFocusStyle, getHighContrastNoAdjustStyle } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import type { IButtonStyles } from '../Button.types';
import type { ITheme, IStyle } from '../../../Styling';

export const getStyles = memoizeFunction((theme: ITheme, customStyles?: IButtonStyles): IButtonStyles => {
  const { effects, palette, semanticColors } = theme;

  const buttonHighContrastFocus = {
    left: -2,
    top: -2,
    bottom: -2,
    right: -2,
    border: 'none',
  };

  const splitButtonDividerBaseStyles: IStyle = {
    position: 'absolute',
    width: 1,
    right: 31,
    top: 8,
    bottom: 8,
  };

  const splitButtonStyles: IButtonStyles = {
    splitButtonContainer: [
      getFocusStyle(theme, { highContrastStyle: buttonHighContrastFocus, inset: 2, pointerEvents: 'none' }),
      {
        display: 'inline-flex',
        selectors: {
          '.ms-Button--default': {
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
            borderRight: 'none',
            flexGrow: '1',
          },
          '.ms-Button--primary': {
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
            border: 'none',
            flexGrow: '1',

            selectors: {
              [HighContrastSelector]: {
                color: 'WindowText',
                backgroundColor: 'Window',
                border: '1px solid WindowText',
                borderRightWidth: '0',
                ...getHighContrastNoAdjustStyle(),
              },
              ':hover': {
                border: 'none',
              },
              ':active': {
                border: 'none',
              },
            },
          },
          '.ms-Button--primary + .ms-Button': {
            border: 'none',
            selectors: {
              [HighContrastSelector]: {
                border: '1px solid WindowText',
                borderLeftWidth: '0',
              },
            },
          },
        },
      },
    ],
    splitButtonContainerHovered: {
      selectors: {
        '.ms-Button--primary': {
          selectors: {
            [HighContrastSelector]: {
              color: 'Window',
              backgroundColor: 'Highlight',
            },
          },
        },
        '.ms-Button.is-disabled': {
          color: semanticColors.buttonTextDisabled,
          selectors: {
            [HighContrastSelector]: {
              color: 'GrayText',
              borderColor: 'GrayText',
              backgroundColor: 'Window',
            },
          },
        },
      },
    },
    splitButtonContainerChecked: {
      selectors: {
        '.ms-Button--primary': {
          selectors: {
            [HighContrastSelector]: {
              color: 'Window',
              backgroundColor: 'WindowText',
              ...getHighContrastNoAdjustStyle(),
            },
          },
        },
      },
    },
    splitButtonContainerCheckedHovered: {
      selectors: {
        '.ms-Button--primary': {
          selectors: {
            [HighContrastSelector]: {
              color: 'Window',
              backgroundColor: 'WindowText',
              ...getHighContrastNoAdjustStyle(),
            },
          },
        },
      },
    },
    splitButtonContainerFocused: {
      outline: 'none!important',
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
      marginBottom: 0,
      [HighContrastSelector]: {
        '.ms-Button-menuIcon': {
          color: 'WindowText',
        },
      },
    },
    splitButtonDivider: {
      ...splitButtonDividerBaseStyles,
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'WindowText',
        },
      },
    },
    splitButtonDividerDisabled: {
      ...splitButtonDividerBaseStyles,
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'GrayText',
        },
      },
    },
    splitButtonMenuButtonDisabled: {
      pointerEvents: 'none',
      border: 'none',
      selectors: {
        ':hover': {
          cursor: 'default',
        },

        '.ms-Button--primary': {
          selectors: {
            [HighContrastSelector]: {
              color: 'GrayText',
              borderColor: 'GrayText',
              backgroundColor: 'Window',
            },
          },
        },
        '.ms-Button-menuIcon': {
          selectors: {
            [HighContrastSelector]: {
              color: 'GrayText',
            },
          },
        },
        [HighContrastSelector]: {
          color: 'GrayText',
          border: '1px solid GrayText',
          backgroundColor: 'Window',
        },
      },
    },

    splitButtonFlexContainer: {
      display: 'flex',
      height: '100%',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center',
    },

    splitButtonContainerDisabled: {
      outline: 'none',
      border: 'none',
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          borderColor: 'GrayText',
          backgroundColor: 'Window',
          ...getHighContrastNoAdjustStyle(),
        },
      },
    },
    splitButtonMenuFocused: {
      ...getFocusStyle(theme, { highContrastStyle: buttonHighContrastFocus, inset: 2 }),
    },
  };

  return concatStyleSets(splitButtonStyles, customStyles)!;
});
