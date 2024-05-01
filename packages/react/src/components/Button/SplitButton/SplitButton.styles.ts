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

          ':hover': {
            border: 'none',
          },
          ':active': {
            border: 'none',
          },

          [HighContrastSelector]: {
            color: 'WindowText',
            backgroundColor: 'Window',
            border: '1px solid WindowText',
            borderRightWidth: '0',
            ...getHighContrastNoAdjustStyle(),
            ':hover': {
              backgroundColor: 'Highlight',
              border: '1px solid Highlight',
              borderRightWidth: '0',
              color: 'HighlightText',
            },
            ':active': {
              border: '1px solid Highlight',
            },
          },
        },
        '.ms-Button--default + .ms-Button': {
          [HighContrastSelector]: {
            border: '1px solid WindowText',
            borderLeftWidth: '0',
            ':hover': {
              backgroundColor: 'HighlightText',
              borderColor: 'Highlight',
              color: 'Highlight',
              '.ms-Button-menuIcon': {
                backgroundColor: 'HighlightText',
                color: 'Highlight',
                ...getHighContrastNoAdjustStyle(),
              },
            },
          },
        },
        '.ms-Button--default + .ms-Button[aria-expanded="true"]': {
          [HighContrastSelector]: {
            backgroundColor: 'HighlightText',
            borderColor: 'Highlight',
            color: 'Highlight',
            '.ms-Button-menuIcon': {
              backgroundColor: 'HighlightText',
              color: 'Highlight',
              ...getHighContrastNoAdjustStyle(),
            },
          },
        },
        '.ms-Button--primary + .ms-Button': {
          border: 'none',

          [HighContrastSelector]: {
            border: '1px solid WindowText',
            borderLeftWidth: '0',
            ':hover': {
              borderLeftWidth: '0',
              backgroundColor: 'Highlight',
              borderColor: 'Highlight',
              color: 'HighlightText',
              '.ms-Button-menuIcon': {
                ...getHighContrastNoAdjustStyle(),
                color: 'HighlightText',
              },
            },
          },
        },
        '.ms-Button--primary + .ms-Button[aria-expanded="true"]': {
          backgroundColor: 'Highlight',
          borderColor: 'Highlight',
          color: 'HighlightText',
          ...getHighContrastNoAdjustStyle(),
          '.ms-Button-menuIcon': {
            color: 'HighlightText',
          },
        },
        '.ms-Button.is-disabled': {
          [HighContrastSelector]: {
            color: 'GrayText',
            borderColor: 'GrayText',
            backgroundColor: 'Window',
          },
        },
      },
    ],
    splitButtonContainerHovered: {
      '.ms-Button--default.is-disabled': {
        backgroundColor: semanticColors.buttonBackgroundDisabled,
        color: semanticColors.buttonTextDisabled,
        [HighContrastSelector]: {
          color: 'GrayText',
          borderColor: 'GrayText',
          backgroundColor: 'Window',
        },
      },
      '.ms-Button--primary.is-disabled': {
        backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
        color: semanticColors.primaryButtonTextDisabled,
        [HighContrastSelector]: {
          color: 'GrayText',
          borderColor: 'GrayText',
          backgroundColor: 'Window',
        },
      },
    },
    splitButtonContainerChecked: {
      '.ms-Button--primary': {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'WindowText',
          ...getHighContrastNoAdjustStyle(),
        },
      },
    },
    splitButtonContainerCheckedHovered: {
      '.ms-Button--primary': {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'WindowText',
          ...getHighContrastNoAdjustStyle(),
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

      [HighContrastSelector]: {
        backgroundColor: 'WindowText',
      },
    },
    splitButtonDividerDisabled: {
      ...splitButtonDividerBaseStyles,

      [HighContrastSelector]: {
        backgroundColor: 'GrayText',
      },
    },
    splitButtonMenuButtonDisabled: {
      pointerEvents: 'none',
      border: 'none',

      ':hover': {
        cursor: 'default',
      },

      '.ms-Button--primary': {
        [HighContrastSelector]: {
          color: 'GrayText',
          borderColor: 'GrayText',
          backgroundColor: 'Window',
        },
      },
      '.ms-Button-menuIcon': {
        [HighContrastSelector]: {
          color: 'GrayText',
        },
      },
      [HighContrastSelector]: {
        color: 'GrayText',
        border: '1px solid GrayText',
        backgroundColor: 'Window',
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
      [HighContrastSelector]: {
        color: 'GrayText',
        borderColor: 'GrayText',
        backgroundColor: 'Window',
        ...getHighContrastNoAdjustStyle(),
      },
    },
    splitButtonMenuFocused: {
      ...getFocusStyle(theme, { highContrastStyle: buttonHighContrastFocus, inset: 2 }),
    },
  };

  return concatStyleSets(splitButtonStyles, customStyles)!;
});
