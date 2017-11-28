import {
  FontSizes,
  FontWeights,
  IRawStyle,
  ITheme,
  concatStyleSets,
  getFocusStyle,
  HighContrastSelector
} from '../../Styling';
import {
  IComboBoxOptionStyles,
  IComboBoxStyles,
} from './ComboBox.types';

import { IButtonStyles } from '../../Button';
import { memoizeFunction } from '../../Utilities';

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
  theme: ITheme,
  customStylesForAllOptions?: Partial<IComboBoxOptionStyles>,
  customOptionStylesForCurrentOption?: Partial<IComboBoxOptionStyles>
): Partial<IComboBoxOptionStyles> => {

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

  return concatStyleSets(optionStyles, customStylesForAllOptions, customOptionStylesForCurrentOption);
});

export const getCaretDownButtonStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: Partial<IButtonStyles>,
): IButtonStyles => {
  const { palette } = theme;

  const caretButtonTextColor = palette.neutralSecondary;
  const caretButtonTextColorHoveredActive = palette.neutralDark;
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
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'ButtonFace',
          borderColor: 'ButtonText',
          color: 'ButtonText',
          MsHighContrastAdjust: 'none'
        },
        '.ms-Icon': {
          fontSize: FontSizes.small
        }
      }
    },
    rootHovered: {
      backgroundColor: caretButtonBackgroundHovered,
      color: caretButtonTextColorHoveredActive,
      cursor: 'pointer'
    },
    rootPressed: {
      backgroundColor: caretButtonBackgroundActive,
      color: caretButtonTextColorHoveredActive
    },
    rootDisabled: getDisabledStyles(theme),
  };
  return concatStyleSets(styles, customStyles);
});

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: Partial<IComboBoxStyles>,
  comboBoxOptionWidth?: string,
): Partial<IComboBoxStyles> => {

  const { semanticColors, fonts, palette } = theme;

  const ComboBoxRootBackground = semanticColors.bodyBackground;
  const ComboBoxRootTextColor = semanticColors.bodyText;
  const ComboBoxRootBorderColor = semanticColors.inputBorder;
  const ComboBoxRootBorderColorHovered = semanticColors.inputBorderHovered;
  const ComboBoxRootBorderColorActive = palette.themeDark;
  const ComboBoxRootBorderColorFocused = semanticColors.inputFocusBorderAlt;
  const ComboBoxRootColorErrored = semanticColors.errorText;
  const ComboBoxCalloutBorderColor = palette.neutralLight;
  const ComboBoxOptionHeaderTextColor = semanticColors.menuHeader;
  const ComboBoxOptionDividerBorderColor = semanticColors.bodyDivider;

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
          MsHighContrastAdjust: 'none'
        }
      },
    },

    rootPressed: {
      borderColor: ComboBoxRootBorderColorActive
    },

    rootFocused: {
      borderColor: ComboBoxRootBorderColorFocused,
      selectors: {
        [HighContrastSelector]: {
          color: 'HighlightText',
          borderColor: 'Highlight',
          MsHighContrastAdjust: 'none'
        }
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
      margin: '1px 0px'
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

  return concatStyleSets(styles, customStyles);
});
