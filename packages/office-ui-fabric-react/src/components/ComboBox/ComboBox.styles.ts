import { FontSizes, FontWeights, IRawStyle, ITheme, concatStyleSets, getFocusStyle, HighContrastSelector } from '../../Styling';
import { IComboBoxOptionStyles, IComboBoxStyles } from './ComboBox.types';

import { IButtonStyles } from '../../Button';
import { memoizeFunction } from '../../Utilities';

const ComboBoxHeight = '32px';
const ComboBoxLineHeight = '30px';
const ComboxBoxCaretDownWidth = '32px';
const ComboBoxOptionHeight = '32px';

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
    isPending?: boolean
  ): Partial<IComboBoxOptionStyles> => {
    const { semanticColors, palette } = theme;

    const ComboBoxOptionBackgroundHovered = semanticColors.menuItemBackgroundHovered;
    const ComboBoxOptionTextColorHovered = semanticColors.bodyText;
    const ComboBoxOptionTextColorSelected = palette.black;
    const ComboBoxOptionTextColorDisabled = semanticColors.disabledText;
    const ComboBoxOptionBackgroundDisabled = semanticColors.bodyBackground;

    const optionStyles: IComboBoxOptionStyles = {
      root: [
        theme.fonts.medium,
        {
          backgroundColor: isPending ? ComboBoxOptionBackgroundHovered : 'transparent',
          boxSizing: 'border-box',
          cursor: 'pointer',
          display: 'block',
          width: '100%',
          height: 'auto',
          minHeight: ComboBoxOptionHeight,
          lineHeight: '20px',
          padding: '5px 16px',
          position: 'relative',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'transparent',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          textAlign: 'left',
          selectors: {
            [HighContrastSelector]: {
              borderColor: 'Background'
            }
          }
        }
      ],
      rootHovered: {
        backgroundColor: ComboBoxOptionBackgroundHovered,
        color: ComboBoxOptionTextColorHovered
      },
      rootFocused: {
        backgroundColor: ComboBoxOptionBackgroundHovered
      },
      rootChecked: [
        {
          backgroundColor: ComboBoxOptionBackgroundHovered,
          color: ComboBoxOptionTextColorSelected
        },
        getFocusStyle(theme, undefined, undefined, undefined, undefined, undefined, false),
        getListOptionHighContrastStyles(theme)
      ],
      rootDisabled: {
        backgroundColor: ComboBoxOptionBackgroundDisabled,
        color: ComboBoxOptionTextColorDisabled,
        cursor: 'default',
        selectors: {
          '& .ms-Button-flexContainer': {
            justifyContent: 'flex-start'
          }
        }
      },
      optionText: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        minWidth: '0px',
        maxWidth: '100%',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        margin: '1px',
        display: 'inline-block'
      },
      optionTextWrapper: {
        maxWidth: '100%'
      }
    };

    return concatStyleSets(optionStyles, customStylesForAllOptions, customOptionStylesForCurrentOption);
  }
);

export const getCaretDownButtonStyles = memoizeFunction(
  (theme: ITheme, customStyles?: Partial<IButtonStyles>): IButtonStyles => {
    const { semanticColors } = theme;

    const caretButtonTextColor = semanticColors.bodySubtext;
    const caretButtonTextColorHoveredChecked = semanticColors.buttonTextChecked;
    const caretButtonBackgroundHovered = semanticColors.listItemBackgroundHovered;
    const caretButtonBackgroundChecked = semanticColors.listItemBackgroundChecked;
    const caretButtonBackgroundCheckedHovered = semanticColors.listItemBackgroundCheckedHovered;

    const styles: IButtonStyles = {
      root: {
        color: caretButtonTextColor,
        fontSize: FontSizes.small,
        position: 'absolute',
        // The negative positioning accounts for the 1px root border now that box-sizing is border-box
        top: '-1px',
        right: '-1px',
        height: ComboBoxHeight,
        lineHeight: ComboBoxLineHeight,
        width: ComboxBoxCaretDownWidth,
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
        fontSize: FontSizes.small
      },
      rootHovered: {
        backgroundColor: caretButtonBackgroundHovered,
        color: caretButtonTextColorHoveredChecked,
        cursor: 'pointer'
      },
      rootPressed: {
        backgroundColor: caretButtonBackgroundChecked,
        color: caretButtonTextColorHoveredChecked
      },
      rootChecked: {
        backgroundColor: caretButtonBackgroundChecked,
        color: caretButtonTextColorHoveredChecked
      },
      rootCheckedHovered: {
        backgroundColor: caretButtonBackgroundCheckedHovered,
        color: caretButtonTextColorHoveredChecked
      },
      rootDisabled: getDisabledStyles(theme)
    };
    return concatStyleSets(styles, customStyles);
  }
);

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: Partial<IComboBoxStyles>, comboBoxOptionWidth?: string): Partial<IComboBoxStyles> => {
    const { semanticColors, fonts, palette } = theme;
    const ComboBoxRootBackground = semanticColors.bodyBackground;
    const ComboBoxRootTextColor = semanticColors.bodyText;
    const ComboBoxRootBorderColor = semanticColors.inputBorder;
    const ComboBoxRootBorderColorHovered = semanticColors.inputBorderHovered;
    const ComboBoxRootBorderColorFocused = semanticColors.inputFocusBorderAlt;
    const ComboBoxRootColorErrored = semanticColors.errorText;
    const ComboBoxCalloutBorderColor = palette.neutralLight;
    const ComboBoxOptionHeaderTextColor = semanticColors.menuHeader;
    const ComboBoxOptionDividerBorderColor = semanticColors.bodyDivider;
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
          paddingTop: '1px', // The 1px padding centers the input field, avoiding overlap in the browser
          paddingBottom: '1px',
          paddingRight: ComboxBoxCaretDownWidth,
          paddingLeft: '12px',
          color: ComboBoxRootTextColor,
          position: 'relative',
          outline: '0',
          userSelect: 'none',
          backgroundColor: ComboBoxRootBackground,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: ComboBoxRootBorderColor,
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
            input: {
              selectors: {
                '::-ms-clear': {
                  display: 'none'
                }
              }
            },
            '&.is-open': {
              borderColor: ComboBoxRootBorderColorFocused,
              selectors: {
                [HighContrastSelector]: ComboBoxRootHighContrastFocused
              }
            }
          }
        }
      ],

      rootHovered: {
        borderColor: ComboBoxRootBorderColorHovered,
        selectors: {
          [HighContrastSelector]: {
            color: 'HighlightText',
            borderColor: 'Highlight',
            backgroundColor: 'Window',
            MsHighContrastAdjust: 'none'
          }
        }
      },

      rootPressed: {
        borderColor: ComboBoxRootBorderColorFocused,
        selectors: {
          [HighContrastSelector]: ComboBoxRootHighContrastFocused
        }
      },

      rootFocused: {
        borderColor: ComboBoxRootBorderColorFocused,
        selectors: {
          [HighContrastSelector]: ComboBoxRootHighContrastFocused
        }
      },

      rootDisabled: getDisabledStyles(theme),

      rootError: {
        borderColor: ComboBoxRootColorErrored,
        marginBottom: '5px'
      },

      rootDisallowFreeForm: {},

      input: {
        backgroundColor: ComboBoxRootBackground,
        color: ComboBoxRootTextColor,
        boxSizing: 'border-box',
        width: '100%',
        height: '28px',
        borderStyle: 'none',
        outline: 'none',
        font: 'inherit',
        textOverflow: 'ellipsis',
        padding: '0'
      },

      inputDisabled: getDisabledStyles(theme),
      errorMessage: {
        color: ComboBoxRootColorErrored
      },

      callout: {
        boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.4)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: ComboBoxCalloutBorderColor
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
          color: ComboBoxOptionHeaderTextColor,
          backgroundColor: 'none',
          borderStyle: 'none',
          height: ComboBoxOptionHeight,
          lineHeight: ComboBoxOptionHeight,
          cursor: 'default',
          padding: '0px 16px',
          userSelect: 'none',
          textAlign: 'left'
        }
      ],

      divider: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: ComboBoxOptionDividerBorderColor
      }
    };

    return concatStyleSets(styles, customStyles);
  }
);
