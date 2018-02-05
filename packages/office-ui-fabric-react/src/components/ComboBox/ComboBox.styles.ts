import {
  FontSizes,
  FontWeights,
  IRawStyle,
  IStyle,
  ITheme,
  concatStyleSets,
  getFocusStyle,
  HighContrastSelector
} from '../../Styling';
import {
  IComboBoxOptionStyles,
  IComboBoxStyles,
  IComboBoxStyleProps,
  IComboBoxCaretStyleProps,
  IComboBoxOptionStyleProps
} from './ComboBox.types';

import { IButtonStyles } from '../../Button';
import { memoizeFunction } from '../../Utilities';

const ComboBoxHeight = '32px';
const ComboBoxLineHeight = '30px';
const ComboxBoxCaretDownWidth = '32px';
const ComboBoxOptionHeight = '32px';

const getDisabledStyles = memoizeFunction((theme: ITheme): IRawStyle => {
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
    },
  };
});

const getListOptionHighContrastStyles = memoizeFunction((theme: ITheme): IRawStyle => {
  return {
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight',
        borderColor: 'Highlight',
        color: 'HighlightText',
        MsHighContrastAdjust: 'none'
      }
    },
  };
});

export const getOptionStyles = memoizeFunction((
  props: IComboBoxOptionStyleProps
): Partial<IComboBoxOptionStyles> => {

  const {
    theme,
    customStylesForAllOptions,
    customStylesForCurrentOption
  } = props;

  const { semanticColors, palette } = theme;

  const ComboBoxOptionBackgroundHovered = semanticColors.menuItemBackgroundHovered;
  const ComboBoxOptionTextColorHovered = semanticColors.bodyText;
  const ComboBoxOptionTextColorSelected = palette.black;
  const ComboBoxOptionTextColorDisabled = semanticColors.disabledText;
  const ComboBoxOptionBackgroundDisabled = semanticColors.bodyBackground;
  const ComboBoxOptionBorderColorFocused = palette.neutralSecondary;

  const optionStyles: IComboBoxOptionStyles = {
    root: [
      {
        backgroundColor: 'transparent',
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
      },
      getFocusStyle(theme),
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
      getFocusStyle(theme),
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
    }
  };

  return concatStyleSets(optionStyles, customStylesForAllOptions, customStylesForCurrentOption);
});

export const getCaretDownButtonStyles = memoizeFunction((
  props: IComboBoxCaretStyleProps
): IButtonStyles => {
  const { theme, customCaretDownButtonStyles: customStyles } = props;
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
    rootDisabled: getDisabledStyles(theme),
  };
  return concatStyleSets(styles, customStyles);
});

export const getStyles = memoizeFunction((
  props: IComboBoxStyleProps
): Partial<IComboBoxStyles> => {
  const {
    theme,
    comboBoxOptionWidth,
    isOpen,
    disabled,
    required,
    focused,
    allowFreeform,
    hasErrorMessage,
    customStyles
  } = props;

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
    selectors: {
      '.ms-ComboBox-Input': {
        // ComboBoxHeight is 32, 28 accounts for the 2px borders
        height: '28px'
      },
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
      fonts.medium,
      {
        boxShadow: 'none',
        marginBottom: '10px',
        marginLeft: '0',
        paddingTop: '0',
        paddingRight: ComboxBoxCaretDownWidth,
        paddingBottom: '0',
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
            marginBottom: '8px',
          },
          'input': {
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
            },
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
      },
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
      },
    },

    rootDisabled: getDisabledStyles(theme),

    rootError: {
      borderColor: ComboBoxRootColorErrored,
      marginBottom: '5px'
    },

    rootDisallowFreeForm: {},

    input: {
      boxSizing: 'border-box',
      width: '100%',
      height: '30px',
      borderStyle: 'none',
      outline: 'none',
      font: 'inherit',
      textOverflow: 'ellipsis',
      padding: '0',
    },

    inputDisabled: getDisabledStyles(theme),
    errorMessage: {
      color: ComboBoxRootColorErrored
    },

    callout: {
      boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.4)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: ComboBoxCalloutBorderColor,
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

  let mergedStyles: Partial<IComboBoxStyles> = concatStyleSets(styles, customStyles);

  return {
    container: [
      'ms-ComboBox-container',
      mergedStyles.container
    ],
    label: [
      mergedStyles.label,
      disabled && mergedStyles.labelDisabled
    ],
    root: [
      'ms-ComboBox',
      hasErrorMessage ? mergedStyles.rootError : isOpen && 'is-open',
      required && 'is-required',
      mergedStyles.root,
      !allowFreeform && mergedStyles.rootDisallowFreeForm,
      hasErrorMessage ? mergedStyles.rootError : !disabled && focused && mergedStyles.rootFocused,
      !disabled && {
        selectors: {
          ':hover': hasErrorMessage ? mergedStyles.rootError : !isOpen && !focused && mergedStyles.rootHovered,
          ':active': hasErrorMessage ? mergedStyles.rootError : mergedStyles.rootPressed,
          ':focus': hasErrorMessage ? mergedStyles.rootError : mergedStyles.rootFocused
        }
      },
      disabled && [
        'is-disabled', mergedStyles.rootDisabled
      ],
    ],
    input: [
      'ms-ComboBox-Input',
      mergedStyles.input,
      disabled && mergedStyles.inputDisabled
    ],
    errorMessage: mergedStyles.errorMessage,
    callout: [
      'ms-ComboBox-callout',
      mergedStyles.callout
    ],
    optionsContainerWrapper: [
      'ms-ComboBox-optionsContainerWrapper',
      mergedStyles.optionsContainerWrapper
    ],
    optionsContainer: [
      'ms-ComboBox-optionsContainer',
      mergedStyles.optionsContainer
    ],
    header: [
      'ms-ComboBox-header',
      mergedStyles.header
    ],
    divider: [
      'ms-ComboBox-divider',
      mergedStyles.divider
    ]
  };
});
