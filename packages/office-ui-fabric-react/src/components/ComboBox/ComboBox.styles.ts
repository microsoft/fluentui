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

  const _getOptionalCustomStyles = <T extends keyof IComboBoxStyles>(id: T): IStyle => {
    return customStyles && customStyles[id];
  };

  const rootHovered = {
    borderColor: ComboBoxRootBorderColorHovered,
    selectors: {
      [HighContrastSelector]: {
        color: 'HighlightText',
        borderColor: 'Highlight',
        MsHighContrastAdjust: 'none'
      }
    },
  };

  const rootPressed = {
    borderColor: ComboBoxRootBorderColorFocused
  };

  const rootFocused = {
    borderColor: ComboBoxRootBorderColorFocused,
    selectors: {
      [HighContrastSelector]: {
        color: 'HighlightText',
        borderColor: 'Highlight',
        MsHighContrastAdjust: 'none'
      }
    },
  };

  const rootError = [
    {
      borderColor: ComboBoxRootColorErrored,
      marginBottom: '5px'
    },
  ];

  const rootDisallowFreeForm = {};

  return {
    container: [
      'ms-ComboBox-container',
      _getOptionalCustomStyles('container')
    ],
    label: [
      _getOptionalCustomStyles('label'),
      disabled && _getOptionalCustomStyles('labelDisabled')
    ],
    root: [
      'ms-ComboBox',
      hasErrorMessage ? [rootError, _getOptionalCustomStyles('rootError')] : isOpen && 'is-open',
      required && 'is-required',
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
        lineHeight: ComboBoxLineHeight,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        boxSizing: 'content-box',
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
            borderColor: ComboBoxRootBorderColorFocused
          }
        }
      },
      _getOptionalCustomStyles('root'),
      !allowFreeform && _getOptionalCustomStyles('rootDisallowFreeForm'),
      hasErrorMessage ? [rootError, _getOptionalCustomStyles('rootError')] : !disabled && focused &&
        [rootFocused, _getOptionalCustomStyles('rootFocused')],
      !disabled && {
        selectors: {
          ':hover': hasErrorMessage ? [rootError, _getOptionalCustomStyles('rootError')] : !isOpen && !focused &&
            [rootHovered, _getOptionalCustomStyles('rootHovered')],
          ':active': hasErrorMessage ? [rootError, _getOptionalCustomStyles('rootError')] :
            [rootPressed, _getOptionalCustomStyles('rootPressed')],
          ':focus': hasErrorMessage ? [rootError, _getOptionalCustomStyles('rootError')] :
            [rootFocused, _getOptionalCustomStyles('rootFocused')]
        }
      },
      disabled && [
        'is-disabled', getDisabledStyles(theme), _getOptionalCustomStyles('rootDisabled')
      ],
    ],
    input: [
      'ms-ComboBox-Input',
      {
        boxSizing: 'border-box',
        width: '100%',
        height: '30px',
        borderStyle: 'none',
        outline: 'none',
        font: 'inherit',
        textOverflow: 'ellipsis',
        padding: '0',
        margin: '1px 0px'
      },
      _getOptionalCustomStyles('input'),
      disabled && [getDisabledStyles(theme), _getOptionalCustomStyles('inputDisabled')]
    ],
    errorMessage: [
      {
        color: ComboBoxRootColorErrored
      },
      _getOptionalCustomStyles('errorMessage')
    ],
    callout: [
      'ms-ComboBox-callout',
      {
        boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.4)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: ComboBoxCalloutBorderColor,
      },
      _getOptionalCustomStyles('callout'),
    ],
    optionsContainerWrapper: [
      'ms-ComboBox-optionsContainerWrapper',
      {
        width: comboBoxOptionWidth
      },
      _getOptionalCustomStyles('optionsContainerWrapper')
    ],
    optionsContainer: [
      'ms-ComboBox-optionsContainer',
      {
        display: 'block'
      },
      _getOptionalCustomStyles('optionsContainer')
    ],
    header: [
      'ms-ComboBox-header',
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
      },
      _getOptionalCustomStyles('header')
    ],
    divider: [
      'ms-ComboBox-divider',
      {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: ComboBoxOptionDividerBorderColor
      },
      _getOptionalCustomStyles('divider')
    ]
  };
});
