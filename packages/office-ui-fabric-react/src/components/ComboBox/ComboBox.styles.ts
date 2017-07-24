import { IComboBoxStyles } from './ComboBox.Props';
import {
  ITheme,
  IStyle,
  mergeStyleSets,
  FontSizes,
  FontWeights,
  getFocusStyle
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';

const MS_HIGHCONTRAST_ACTIVE = '@media screen and (-ms-high-contrast: active)';
const MS_HIGHCONTRAST_BLACK_ON_WHITE = '@media screen and (-ms-high-contrast: black-on-white)';

const ComboBoxHeight = '32px';
const ComboBoxLineHeight = '30px';
const ComboxBoxCaretDownWidth = '32px';
const ComboBoxOptionHeight = '36px';

const getDisabledStyles = (theme: ITheme): IStyle => {
  const { semanticColors, palette } = theme;
  return {
    backgroundColor: semanticColors.disabledBackground,
    borderColor: semanticColors.disabledBackground,
    color: semanticColors.disabledText,
    cursor: 'default',
    [MS_HIGHCONTRAST_ACTIVE]: {
      borderColor: 'GrayText',
      color: 'GrayText'
    },

    [MS_HIGHCONTRAST_BLACK_ON_WHITE]: {
      borderColor: 'GrayText',
      color: 'GrayText'
    },
  };
};

const getListOptionHighContrastStyles = (theme: ITheme): IStyle => {
  const { semanticColors, palette } = theme;
  return {
    [MS_HIGHCONTRAST_ACTIVE]: {
      backgroundColor: 'Highlight',
      borderColor: 'Highlight',
      color: 'HighlightText',
    },
  };
};

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: Partial<IComboBoxStyles>,
): IComboBoxStyles => {

  const { semanticColors, fonts, palette } = theme;

  const ComboBoxoptionBackgroundSelected = semanticColors.menuItemBackgroundChecked;
  const ComboBoxoptionBackgroundHovered = semanticColors.menuItemBackgroundHovered;

  const styles: IComboBoxStyles = {
    container: {

    },
    label: {

    },
    root: {
      boxShadow: 'none',
      margin: '0 0 10px 0',
      padding: '0',
      paddingRight: ComboxBoxCaretDownWidth,
      font: fonts.medium,
      color: semanticColors.bodyText,
      position: 'relative',
      outline: '0',
      userSelect: 'none',
      background: semanticColors.bodyBackground,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: palette.neutralTertiaryAlt,
      cursor: 'text',
      display: 'block',
      height: ComboBoxHeight,
      lineHeight: ComboBoxLineHeight,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      boxSizing: 'content-box',
      ' .ms-Label': {
        display: 'inline-block',
        marginBottom: '8px',
      }
    },
    rootHoveredOrFocused: {
      borderColor: semanticColors.inputFocusBorderAlt,
      [MS_HIGHCONTRAST_ACTIVE]: {
        color: 'HighlightText',
        borderColor: 'Highlight'
      },
    },
    rootDisabled: getDisabledStyles(theme),
    rootError: {
      borderColor: semanticColors.errorText
    },
    rootDisallowFreeForm: {

    },
    input: {
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      border: 'none',
      outline: 'none',
      font: 'inherit',
      textOverflow: 'ellipsis',
      paddingLeft: '12px'
    },
    inputDisabled: getDisabledStyles(theme),
    caretDown: {
      color: palette.neutralDark,
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
      }
    },
    caretDownHovered: {
      backgroundColor: palette.neutralQuaternaryAlt,
    },
    caretDownActive: {
      backgroundColor: palette.neutralTertiaryAlt,
    },
    caretDownDisallowFreeForm: {
      backgroundColor: 'inherit',
    },
    caretDownDisabled: getDisabledStyles(theme),
    errorMessage: {
      color: semanticColors.errorText,
      ':before': {
        content: '* ',
      }
    },
    callout: {
      boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.4)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: palette.neutralLight,
    },
    optionsContainer: {
      display: 'block'
    },
    header: {
      fontSize: fonts.medium,
      fontWeight: FontWeights.semibold,
      color: semanticColors.menuHeader,
      background: 'none',
      border: 'none',
      height: ComboBoxOptionHeight,
      lineHeight: ComboBoxOptionHeight,
      cursor: 'default',
      padding: '0px 16px',
      userSelect: 'none',
      textAlign: 'left'
    },
    divider: {
      height: '1px',
      backgroundColor: semanticColors.bodyDivider
    },
    option: [
      {
        background: 'transparent',
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        height: 'auto',
        minHeight: ComboBoxOptionHeight,
        lineHeight: '20px',
        padding: '5px 16px',
        position: 'relative',
        border: '1px solid transparent',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        textAlign: 'left',

        [MS_HIGHCONTRAST_ACTIVE]: {
          borderColor: 'Background'
        }
      },
      getFocusStyle(theme),
    ],
    optionHovered: {
      backgroundColor: ComboBoxoptionBackgroundHovered,
      color: palette.black,
      ...getListOptionHighContrastStyles(theme)
    },
    optionFocused: {
      backgroundColor: ComboBoxoptionBackgroundHovered
    },
    optionActive: {
      backgroundColor: ComboBoxoptionBackgroundHovered,
      color: palette.black
    },
    optionSelected: [
      {
        backgroundColor: ComboBoxoptionBackgroundSelected,
        color: palette.black,
      },
      getFocusStyle(theme),
      getListOptionHighContrastStyles(theme)
    ],
    optionSelectedHovered: {
      backgroundColor: ComboBoxoptionBackgroundSelected
    },
    optionDisabled: {
      backgroundColor: palette.white,
      color: palette.neutralTertiary,
      cursor: 'default',
      ' .ms-Button-flexContainer': {
        justifyContent: 'flex-start'
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
      margin: '1px'
    }
  };

  return mergeStyleSets(styles, customStyles) as IComboBoxStyles;
});