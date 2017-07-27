import { memoizeFunction } from '../../Utilities';
import { ISpinButtonStyles, ISpinButtonArrowButtonStyles } from './SpinButton.Props';
import {
  ITheme,
  IStyle,
  mergeStyleSets,
} from '../../Styling';

const MS_HIGHCONTRAST_ACTIVE = '@media screen and (-ms-high-contrast: active)';
const MS_HIGHCONTRAST_BLACK_ON_WHITE = '@media screen and (-ms-high-contrast: black-on-white)';

export const getArrowButtonStyles = memoizeFunction((
  theme: ITheme,
  isUpArrow: boolean,
  customCommonArrowStyles?: Partial<ISpinButtonArrowButtonStyles>,
  customSpecificArrowStyles?: Partial<ISpinButtonArrowButtonStyles>,
): ISpinButtonArrowButtonStyles => {

  const { semanticColors, fonts, palette } = theme;

  const ArrowButtonTextColor = palette.neutralPrimary;
  const ArrowButtonTextColorPressed = palette.white;
  const ArrowButtonBackgroundHovered = palette.neutralLight;
  const ArrowButtonBackgroundPressed = palette.themePrimary;

  const defaultArrowButtonStyles: ISpinButtonArrowButtonStyles = {
    root: {
      outline: 'none',
      display: 'block',
      height: '50%',
      width: '14px',
      // padding: '0',
      paddingTop: '0',
      paddingRight: '0',
      paddingBottom: '0',
      paddingLeft: '0',
      backgroundColor: 'transparent',
      textAlign: 'center',
      cursor: 'default',
      color: ArrowButtonTextColor
    },
    rootHovered: {
      backgroundColor: ArrowButtonBackgroundHovered
    },
    rootChecked: {
      backgroundColor: ArrowButtonBackgroundPressed,
      color: ArrowButtonTextColorPressed,
      [MS_HIGHCONTRAST_ACTIVE]: {
        backgroundColor: 'Highlight',
        color: 'HighlightText'
      }
    },
    rootPressed: {
      backgroundColor: ArrowButtonBackgroundPressed,
      color: ArrowButtonTextColorPressed,
      [MS_HIGHCONTRAST_ACTIVE]: {
        backgroundColor: 'Highlight',
        color: 'HighlightText'
      }
    },
    rootDisabled: {
      opacity: '0',
      [MS_HIGHCONTRAST_ACTIVE]: {
        color: 'GrayText'
      }
    },
    icon: {
      fontSize: '6px',

      // margin: '0',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0'
    }
  };

  // No specific styles needed as of now.
  const defaultUpArrowButtonStyles: Partial<ISpinButtonArrowButtonStyles> = {

  };

  const defaultDownArrowButtonStyles: Partial<ISpinButtonArrowButtonStyles> = {

  };

  return mergeStyleSets(
    defaultArrowButtonStyles,
    isUpArrow ? defaultUpArrowButtonStyles : defaultDownArrowButtonStyles,
    customCommonArrowStyles,
    customSpecificArrowStyles
  ) as ISpinButtonArrowButtonStyles;
});

const getDisabledStyles = memoizeFunction((theme: ITheme): IStyle => {
  const { semanticColors, palette } = theme;

  const SpinButtonTextColorDisabled = palette.neutralTertiaryAlt;
  const SpinButtonBackgroundColorDisabled = palette.neutralLighter;
  const SpinButtonBorderColorDisabled = palette.neutralLighter;

  return {
    backgroundColor: SpinButtonBackgroundColorDisabled,
    borderColor: SpinButtonBorderColorDisabled,
    pointerEvents: 'none',
    cursor: 'default',
    color: SpinButtonTextColorDisabled,
    [MS_HIGHCONTRAST_ACTIVE]: {
      color: 'GrayText'
    }
  };
});

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles: Partial<ISpinButtonStyles>
): ISpinButtonStyles => {
  const { semanticColors, fonts, palette } = theme;

  const SpinButtonRootBorderColor = palette.neutralTertiaryAlt;
  const SpinButtonRootBorderColorHovered = palette.neutralSecondaryAlt;
  const SpinButtonRootBorderColorFocused = palette.themePrimary;

  const SpinButtonInputTextColor = palette.neutralPrimary;
  const SpinButtonInputTextColorSelected = palette.white;
  const SpinButtonInputBackgroundColorSelected = palette.themePrimary;

  const defaultStyles: ISpinButtonStyles = {
    container: {
      outline: 'none',
      fontSize: '12px',
      width: '100%',
      minWidth: '86px',
      paddingTop: '2px',
      paddingRight: '2px',
      paddingBottom: '2px',
      paddingLeft: '2px',
    },
    labelWrapper: {
      display: 'inline-flex'
    },
    labelWrapperStart: {
      float: 'left',
      marginRight: '10px'
    },
    labelWrapperEnd: {
      float: 'right',
      marginLeft: '10px'
    },
    labelWrapperTop: {
      marginBottom: '10px'
    },
    labelWrapperBottom: {
      marginTop: '10px'
    },
    icon: {
      paddingTop: '2px',
      paddingRight: '5px',
      paddingBottom: '2px',
      paddingLeft: '5px',

      fontSize: '20px'
    },
    label: {
      pointerEvents: 'none',
      paddingTop: '2px',
      paddingRight: '0',
      paddingBottom: '2px',
      paddingLeft: '0',
    },
    root: {
      display: 'flex',
      height: '26px',
      minWidth: '86px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: SpinButtonRootBorderColor,
    },
    rootTopBottom: {
      width: '100%'
    },
    rootHovered: {
      borderColor: SpinButtonRootBorderColorHovered,
      outline: '2px dashed transparent',
      [MS_HIGHCONTRAST_ACTIVE]: {
        borderColor: 'Highlight'
      }
    },
    rootFocused: {
      borderColor: SpinButtonRootBorderColorFocused,
      outline: '2px dashed transparent',
      [MS_HIGHCONTRAST_ACTIVE]: {
        borderColor: 'Highlight'
      }
    },
    rootDisabled: {

    },
    input: {
      boxSizing: 'border-box',
      boxShadow: 'none',
      borderStyle: 'none',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
      fontSize: fonts.medium,
      color: SpinButtonInputTextColor,
      height: '100%',
      paddingTop: '3px',
      paddingRight: '3px',
      paddingBottom: '4px',
      paddingLeft: '4px',
      outline: '0',
      textOverflow: 'ellipsis',
      display: 'block',
      float: 'left',
      width: 'calc(100% - 14px)',
      minWidth: '72px',
      overflow: 'hidden',
      cursor: 'text',
      userSelect: 'text'
    },
    inputTextSelected: {
      backgroundColor: SpinButtonInputBackgroundColorSelected,
      color: SpinButtonInputTextColorSelected,
      [MS_HIGHCONTRAST_ACTIVE]: {
        backgroundColor: 'Highlight',
        borderColor: 'Highlight',
        color: 'HighlightText',
      }
    },
    inputDisabled: getDisabledStyles(theme),
    arrowButtonsContainer: {
      outline: 'none',
      fontSize: '12px',
      display: 'block',
      float: 'left',
      height: '100%',
      cursor: 'default',
      paddingTop: '0',
      paddingRight: '0',
      paddingBottom: '0',
      paddingLeft: '0',

      boxSizing: 'border-box'
    },
    arrowButtonsContainerDisabled: getDisabledStyles(theme),
    arrowButtonStyles: null,
    upArrowButtonStyles: null,
    downArrowButtonStyles: null
  };
  return mergeStyleSets(defaultStyles, customStyles) as ISpinButtonStyles;
});