import {
  FontWeights,
  IRawStyle,
  ITheme,
  concatStyleSets,
  getFocusStyle,
  HighContrastSelector,
  IStyle,
  getPlaceholderStyles
} from '../../Styling';
import { IComboBoxOptionStyles, IComboBoxStyles } from './ComboBox.types';

import { IButtonStyles } from '../../Button';
import { memoizeFunction } from '../../Utilities';

const ComboBoxHeight = 32;
const ComboBoxLineHeight = 30;
const ComboBoxCaretDownWidth = 32;
const ComboBoxOptionHeight = 36;

const getDisabledStyles = memoizeFunction(
  (theme: ITheme): IRawStyle => {
    const { semanticColors } = theme;

    return {
      backgroundColor: semanticColors.disabledBackground,
      borderColor: semanticColors.disabledBackground,
      color: semanticColors.disabledText,
      cursor: 'default',
      selectors: {
        [HighContrastSelector]: {
          borderColor: 'GrayText',
          color: 'GrayText'
        }
      }
    };
  }
);

const getListOptionHighContrastStyles = memoizeFunction(
  (theme: ITheme): IRawStyle => {
    return {
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'Highlight',
          borderColor: 'Highlight',
          color: 'HighlightText',
          MsHighContrastAdjust: 'none'
        }
      }
    };
  }
);

export const getOptionStyles = memoizeFunction(
  (
    theme: ITheme,
    customStylesForAllOptions?: Partial<IComboBoxOptionStyles>,
    customOptionStylesForCurrentOption?: Partial<IComboBoxOptionStyles>,
    isPending?: boolean,
    isHidden?: boolean
  ): Partial<IComboBoxOptionStyles> => {
    const { palette, semanticColors } = theme;

    const option = {
      textHoveredColor: semanticColors.menuItemTextHovered,
      textSelectedColor: palette.neutralDark,
      textDisabledColor: semanticColors.disabledText,
      backgroundHoveredColor: semanticColors.menuItemBackgroundHovered,
      backgroundPressedColor: semanticColors.menuItemBackgroundPressed
    };

    const optionStyles: IComboBoxOptionStyles = {
      root: [
        theme.fonts.medium,
        {
          backgroundColor: isPending ? option.backgroundHoveredColor : 'transparent',
          boxSizing: 'border-box',
          cursor: 'pointer',
          display: isHidden ? 'none' : 'block',
          width: '100%',
          height: 'auto',
          minHeight: ComboBoxOptionHeight,
          lineHeight: '20px',
          padding: '0 8px',
          position: 'relative',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderRadius: 0,
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          textAlign: 'left',
          selectors: {
            [HighContrastSelector]: {
              borderColor: 'Background'
            },
            '&.ms-Checkbox': {
              display: 'flex',
              alignItems: 'center'
            },
            '&.ms-Button--command:hover:active': {
              backgroundColor: option.backgroundPressedColor
            }
          }
        }
      ],
      rootHovered: {
        backgroundColor: option.backgroundHoveredColor,
        color: option.textHoveredColor
      },
      rootFocused: {
        backgroundColor: option.backgroundHoveredColor
      },
      rootChecked: [
        {
          backgroundColor: 'transparent',
          color: option.textSelectedColor,
          selectors: {
            ':hover': {
              backgroundColor: option.backgroundHoveredColor
            }
          }
        },
        getFocusStyle(theme, { inset: -1, isFocusedOnly: false }),
        getListOptionHighContrastStyles(theme)
      ],
      rootDisabled: {
        color: option.textDisabledColor,
        cursor: 'default'
      },
      optionText: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        minWidth: '0px',
        maxWidth: '100%',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        display: 'inline-block'
      },
      optionTextWrapper: {
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center'
      }
    };

    return concatStyleSets(optionStyles, customStylesForAllOptions, customOptionStylesForCurrentOption);
  }
);

export const getCaretDownButtonStyles = memoizeFunction(
  (theme: ITheme, customStyles?: Partial<IButtonStyles>): IButtonStyles => {
    const { semanticColors, fonts } = theme;

    const caret = {
      buttonTextColor: semanticColors.bodySubtext,
      buttonTextHoveredCheckedColor: semanticColors.buttonTextChecked,
      buttonBackgroundHoveredColor: semanticColors.listItemBackgroundHovered,
      buttonBackgroundCheckedColor: semanticColors.listItemBackgroundChecked,
      buttonBackgroundCheckedHoveredColor: semanticColors.listItemBackgroundCheckedHovered
    };

    const styles: IButtonStyles = {
      root: {
        color: caret.buttonTextColor,
        fontSize: fonts.small.fontSize,
        position: 'absolute',
        // The negative positioning accounts for the 1px root border now that box-sizing is border-box
        top: '-1px',
        right: '-1px',
        height: ComboBoxHeight,
        lineHeight: ComboBoxLineHeight,
        width: ComboBoxCaretDownWidth,
        textAlign: 'center',
        cursor: 'default',
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'ButtonFace',
            borderColor: 'ButtonText',
            color: 'ButtonText',
            MsHighContrastAdjust: 'none'
          }
        }
      },
      icon: {
        fontSize: fonts.small.fontSize
      },
      rootHovered: {
        backgroundColor: caret.buttonBackgroundHoveredColor,
        color: caret.buttonTextHoveredCheckedColor,
        cursor: 'pointer'
      },
      rootPressed: {
        backgroundColor: caret.buttonBackgroundCheckedColor,
        color: caret.buttonTextHoveredCheckedColor
      },
      rootChecked: {
        backgroundColor: caret.buttonBackgroundCheckedColor,
        color: caret.buttonTextHoveredCheckedColor
      },
      rootCheckedHovered: {
        backgroundColor: caret.buttonBackgroundCheckedHoveredColor,
        color: caret.buttonTextHoveredCheckedColor
      },
      rootDisabled: getDisabledStyles(theme)
    };
    return concatStyleSets(styles, customStyles);
  }
);

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: Partial<IComboBoxStyles>, comboBoxOptionWidth?: string): Partial<IComboBoxStyles> => {
    const { semanticColors, fonts, effects } = theme;

    const root = {
      textColor: semanticColors.bodyText,
      borderColor: semanticColors.inputBorder,
      borderHoveredColor: semanticColors.inputBorderHovered,
      borderPressedColor: semanticColors.inputFocusBorderAlt,
      borderFocusedColor: semanticColors.inputFocusBorderAlt,
      backgroundColor: semanticColors.bodyBackground,
      erroredColor: semanticColors.errorText
    };

    const option = {
      headerTextColor: semanticColors.menuHeader,
      dividerBorderColor: semanticColors.bodyDivider
    };

    // placeholder style variables
    const placeholderStyles: IStyle = {
      color: semanticColors.inputPlaceholderText
    };
    const placeholderStylesHovered: IStyle = {
      color: semanticColors.inputTextHovered
    };
    const disabledPlaceholderStyles: IStyle = {
      color: semanticColors.disabledText
    };

    const ComboBoxRootHighContrastFocused = {
      color: 'HighlightText',
      borderColor: 'Highlight',
      backgroundColor: 'Window',
      borderWidth: '2px',
      MsHighContrastAdjust: 'none',
      paddingLeft: '11px',
      paddingTop: '0',
      paddingBottom: '0',
      selectors: {
        '.ms-ComboBox-CaretDown-button': {
          // Negative positioning to account for the 2px border
          right: '-2px',
          top: '-2px'
        }
      }
    };

    const styles: IComboBoxStyles = {
      container: {},
      label: {},
      labelDisabled: {},
      root: [
        theme.fonts.medium,
        {
          boxShadow: 'none',
          marginLeft: '0',
          paddingTop: 1, // The 1px padding centers the input field, avoiding overlap in the browser
          paddingBottom: 1,
          paddingRight: ComboBoxCaretDownWidth,
          paddingLeft: 8,
          color: root.textColor,
          position: 'relative',
          outline: '0',
          userSelect: 'none',
          backgroundColor: root.backgroundColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: root.borderColor,
          borderRadius: effects.roundedCorner2,
          cursor: 'text',
          display: 'block',
          height: ComboBoxHeight,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          boxSizing: 'border-box', // Border-box matches Dropdown and TextField
          selectors: {
            '.ms-Label': {
              display: 'inline-block',
              marginBottom: '8px'
            },
            '&.is-open': {
              borderColor: root.borderColor,
              selectors: {
                [HighContrastSelector]: ComboBoxRootHighContrastFocused
              }
            }
          }
        }
      ],

      rootHovered: {
        borderColor: root.borderHoveredColor,
        selectors: {
          '.ms-ComboBox-Input': [{ color: semanticColors.inputTextHovered }, getPlaceholderStyles(placeholderStylesHovered)],
          [HighContrastSelector]: {
            color: 'HighlightText',
            borderColor: 'Highlight',
            backgroundColor: 'Window',
            MsHighContrastAdjust: 'none'
          }
        }
      },

      rootPressed: {
        borderColor: root.borderPressedColor,
        selectors: {
          [HighContrastSelector]: ComboBoxRootHighContrastFocused
        }
      },

      rootFocused: {
        borderColor: root.borderFocusedColor,
        selectors: {
          '.ms-ComboBox-Input': {
            color: semanticColors.inputTextHovered
          },
          [HighContrastSelector]: ComboBoxRootHighContrastFocused
        }
      },

      rootDisabled: getDisabledStyles(theme),

      rootError: {
        borderColor: root.erroredColor,
        marginBottom: '5px'
      },

      rootDisallowFreeForm: {},

      input: [
        getPlaceholderStyles(placeholderStyles),
        {
          backgroundColor: root.backgroundColor,
          color: root.textColor,
          boxSizing: 'border-box',
          width: '100%',
          height: '28px',
          borderStyle: 'none',
          outline: 'none',
          font: 'inherit',
          textOverflow: 'ellipsis',
          padding: '0',
          selectors: {
            '::-ms-clear': {
              display: 'none'
            }
          }
        }
      ],

      inputDisabled: [getDisabledStyles(theme), getPlaceholderStyles(disabledPlaceholderStyles)],
      errorMessage: [
        theme.fonts.small,
        {
          color: root.erroredColor
        }
      ],

      callout: {
        boxShadow: effects.elevation8
      },

      optionsContainerWrapper: {
        width: comboBoxOptionWidth
      },

      optionsContainer: {
        display: 'block'
      },

      header: [
        fonts.medium,
        {
          fontWeight: FontWeights.semibold,
          color: option.headerTextColor,
          backgroundColor: 'none',
          borderStyle: 'none',
          height: ComboBoxOptionHeight,
          lineHeight: ComboBoxOptionHeight,
          cursor: 'default',
          padding: '0 8px',
          userSelect: 'none',
          textAlign: 'left'
        }
      ],

      divider: {
        height: 1,
        backgroundColor: option.dividerBorderColor
      }
    };

    return concatStyleSets(styles, customStyles);
  }
);
