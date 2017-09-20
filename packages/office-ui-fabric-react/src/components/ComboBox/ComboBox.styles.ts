import {
  IComboBoxStyles,
  IComboBoxOptionStyles,
} from './ComboBox.Props';
import {
  ITheme,
  IRawStyle,
  mergeStyleSets,
  FontSizes,
  FontWeights,
  getFocusStyle
} from '../../Styling';
import { IButtonStyles } from '../../Button';
import { memoizeFunction } from '../../Utilities';

const MS_HIGHCONTRAST_ACTIVE = '@media screen and (-ms-high-contrast: active) &';

const ComboBoxHeight = '32px';
const ComboBoxLineHeight = '30px';
const ComboxBoxCaretDownWidth = '32px';
const ComboBoxOptionHeight = '36px';

const getDisabledStyles = memoizeFunction((theme: ITheme): IRawStyle => {
  const { semanticColors } = theme;

  return {
    backgroundColor: semanticColors.disabledBackground,
    borderColor: semanticColors.disabledBackground,
    color: semanticColors.disabledText,
    cursor: 'default',
    [MS_HIGHCONTRAST_ACTIVE]: {
      borderColor: 'GrayText',
      color: 'GrayText'
    },
  };
});

const getListOptionHighContrastStyles = memoizeFunction((theme: ITheme): IRawStyle => {
  return {
    selectors: {
      [MS_HIGHCONTRAST_ACTIVE]: {
        backgroundColor: 'Highlight',
        borderColor: 'Highlight',
        color: 'HighlightText',
        MsHighConstrastAdjust: 'none'
      }
    },
  };
});

export const getOptionStyles = memoizeFunction((
  theme: ITheme,
  customStylesForAllOptions?: Partial<IComboBoxOptionStyles>,
  customOptionStylesForCurrentOption?: Partial<IComboBoxOptionStyles>,
): IComboBoxOptionStyles => {

  const { semanticColors, palette } = theme;

  const ComboBoxOptionBackgroundSelected = semanticColors.menuItemBackgroundChecked;
  const ComboBoxOptionBackgroundHovered = semanticColors.menuItemBackgroundHovered;
  const ComboBoxOptionTextColorHovered = palette.black;
  const ComboBoxOptionTextColorSelected = palette.black;
  const ComboBoxOptionTextColorDisabled = semanticColors.disabledText;
  const ComboBoxOptionBackgroundDisabled = semanticColors.disabledBackground;

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
          [MS_HIGHCONTRAST_ACTIVE]: {
            borderColor: 'Background'
          }
        }
      },
      getFocusStyle(theme),
    ],
    rootHovered: {
      backgroundColor: ComboBoxOptionBackgroundHovered,
      color: ComboBoxOptionTextColorHovered,
      ...getListOptionHighContrastStyles(theme)
    },
    rootFocused: {
      backgroundColor: ComboBoxOptionBackgroundHovered
    },
    rootPressed: {
      backgroundColor: ComboBoxOptionBackgroundHovered,
      color: ComboBoxOptionTextColorHovered
    },
    rootChecked: [
      {
        backgroundColor: ComboBoxOptionBackgroundSelected,
        color: ComboBoxOptionTextColorSelected
      },
      getFocusStyle(theme),
      getListOptionHighContrastStyles(theme)
    ],
    rootCheckedHovered: {
      backgroundColor: ComboBoxOptionBackgroundSelected
    },
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
    },
  };

  return mergeStyleSets(optionStyles, customStylesForAllOptions, customOptionStylesForCurrentOption) as IComboBoxOptionStyles;
});

export const getCaretDownButtonStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: Partial<IButtonStyles>,
): IButtonStyles => {
  const { palette } = theme;

  const caretButtonTextColor = palette.neutralDark;
  const caretButtonBackgroundHovered = palette.neutralQuaternaryAlt;
  const caretButtonBackgroundActive = palette.neutralTertiaryAlt;

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
      [MS_HIGHCONTRAST_ACTIVE]: {
        backgroundColor: 'ButtonFace',
        borderColor: 'ButtonText',
        color: 'ButtonText',
        '-ms-high-contrast-adjust': 'none'
      }
    },
    rootHovered: {
      backgroundColor: caretButtonBackgroundHovered
    },
    rootPressed: {
      backgroundColor: caretButtonBackgroundActive
    },
    rootDisabled: getDisabledStyles(theme),
  };
  return mergeStyleSets(styles, customStyles) as IButtonStyles;
});

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: Partial<IComboBoxStyles>,
): IComboBoxStyles => {

  const { semanticColors, fonts, palette } = theme;

  const ComboBoxRootBackground = semanticColors.bodyBackground;
  const ComboBoxRootTextColor = semanticColors.bodyText;
  const ComboBoxRootBorderColor = palette.neutralTertiaryAlt;
  const ComboBoxRootBorderColorHovered = semanticColors.inputFocusBorderAlt;
  const ComboBoxRootColorErrored = semanticColors.errorText;
  const ComboBoxCalloutBorderColor = palette.neutralLight;
  const ComboBoxOptionHeaderTextColor = semanticColors.menuHeader;
  const ComboBoxOptionDividerBorderColor = semanticColors.bodyDivider;

  const styles: IComboBoxStyles = {
    container: {},
    label: {},
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
        lineHeight: ComboBoxLineHeight,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        boxSizing: 'content-box',
        selectors: {
          ' .ms-Label': {
            display: 'inline-block',
            marginBottom: '8px',
          }
        }
      }
    ],

    rootHovered: {
      borderColor: ComboBoxRootBorderColorHovered,

      selectors: {
        [MS_HIGHCONTRAST_ACTIVE]: {
          color: 'HighlightText',
          borderColor: 'Highlight',
          MsHighContrastAdjust: 'none'
        } as IRawStyle
      },
    },

    rootFocused: {
      borderColor: ComboBoxRootBorderColorHovered,
      selectors: {
        [MS_HIGHCONTRAST_ACTIVE]: {
          color: 'HighlightText',
          borderColor: 'Highlight',
          MsHighConstrastAdjust: 'none'
        } as IRawStyle
      }
    },

    rootDisabled: getDisabledStyles(theme),

    rootError: {
      borderColor: ComboBoxRootColorErrored
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
      margin: '1px 0px'
    },

    inputDisabled: getDisabledStyles(theme),
    errorMessage: {
      color: ComboBoxRootColorErrored,
      selectors: {
        ':before': {
          content: '* ',
        }
      }
    },

    callout: {
      boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.4)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: ComboBoxCalloutBorderColor,
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

  return mergeStyleSets(styles, customStyles) as IComboBoxStyles;
});