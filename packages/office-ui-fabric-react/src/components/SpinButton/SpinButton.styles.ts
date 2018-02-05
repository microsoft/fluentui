import {
  FontSizes,
  IRawStyle,
  ITheme,
  concatStyleSets,
  HighContrastSelector,
  IStyle
} from '../../Styling';
import { IButtonStyles } from '../../Button';
import { ISpinButtonStyles, ISpinButtonStyleProps, ISpinButtonArrowStyleProps } from './SpinButton.types';
import { memoizeFunction } from '../../Utilities';
import { Position } from '../../utilities/positioning';

const _getDisabledStyles = memoizeFunction((theme: ITheme): IRawStyle => {
  const { semanticColors } = theme;

  const SpinButtonTextColorDisabled = semanticColors.disabledText;
  const SpinButtonBackgroundColorDisabled = semanticColors.disabledBackground;

  return {
    backgroundColor: SpinButtonBackgroundColorDisabled,
    borderColor: 'transparent',
    pointerEvents: 'none',
    cursor: 'default',
    color: SpinButtonTextColorDisabled,
    selectors: {
      [HighContrastSelector]: {
        color: 'GrayText'
      }
    }
  };
});

const getArrowButtonStyles = memoizeFunction((
  props: ISpinButtonArrowStyleProps,
  isUpArrow: boolean
): IButtonStyles => {
  const { theme, upArrowButtonStyles, downArrowButtonStyles } = props;
  const { palette } = theme;
  const customStyles = isUpArrow ? upArrowButtonStyles : downArrowButtonStyles;

  const ArrowButtonTextColor = palette.neutralPrimary;
  const ArrowButtonTextColorPressed = palette.white;
  const ArrowButtonBackgroundHovered = palette.neutralLight;
  const ArrowButtonBackgroundPressed = palette.themePrimary;

  const defaultArrowButtonStyles: IButtonStyles = {
    root: {
      outline: 'none',
      display: 'block',
      height: '50%',
      width: '14px',
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
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'Highlight',
          color: 'HighlightText'
        }
      }
    },
    rootPressed: {
      backgroundColor: ArrowButtonBackgroundPressed,
      color: ArrowButtonTextColorPressed,
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'Highlight',
          color: 'HighlightText'
        }
      }
    },
    rootDisabled: {
      opacity: 0.5,
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          opacity: 1,
        }
      }
    },
    icon: {
      fontSize: '6px',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0'
    }
  };

  // No specific styles needed as of now.
  const defaultUpArrowButtonStyles: Partial<IButtonStyles> = {

  };

  const defaultDownArrowButtonStyles: Partial<IButtonStyles> = {

  };

  return concatStyleSets(
    defaultArrowButtonStyles,
    isUpArrow ? defaultUpArrowButtonStyles : defaultDownArrowButtonStyles,
    customStyles
  ) as IButtonStyles;
});

export const getUpArrowButtonStyles = memoizeFunction((
  props: ISpinButtonArrowStyleProps,
): IButtonStyles => {
  return getArrowButtonStyles(props, true);
});

export const getDownArrowButtonStyles = memoizeFunction((
  props: ISpinButtonArrowStyleProps,
): IButtonStyles => {
  return getArrowButtonStyles(props, false);
});

const _getStyleForLabelBasedOnPosition = (
  styles: ISpinButtonStyles, labelPosition?: Position
): IStyle => {
  switch (labelPosition) {
    case Position.start:
      return styles.labelWrapperStart;
    case Position.end:
      return styles.labelWrapperEnd;
    case Position.top:
      return styles.labelWrapperTop;
    case Position.bottom:
      return styles.labelWrapperBottom;
    default: return {};
  }
};

const _getStyleForRootBasedOnPosition = (styles: ISpinButtonStyles, labelPosition?: Position): IStyle => {
  switch (labelPosition) {
    case Position.top:
    case Position.bottom:
      return styles.spinButtonWrapperTopBottom;
    default: return {};
  }
};

export const getStyles = memoizeFunction((
  props: ISpinButtonStyleProps
): Partial<ISpinButtonStyles> => {
  const {
    disabled,
    isFocused,
    keyboardSpinDirection,
    labelPosition,
    customStyles,
    theme
  } = props;

  const { fonts, palette, semanticColors } = theme;

  const SpinButtonRootBorderColor = palette.neutralTertiaryAlt;
  const SpinButtonRootBorderColorHovered = palette.neutralSecondary;
  const SpinButtonRootBorderColorFocused = palette.themePrimary;
  const SpinButtonTextColorDisabled = palette.neutralTertiaryAlt;
  const SpinButtonInputTextColor = palette.neutralPrimary;
  const SpinButtonInputTextColorSelected = palette.white;
  const SpinButtonInputBackgroundColorSelected = palette.themePrimary;
  const SpinButtonIconDisabledColor = semanticColors.disabledText;

  const defaultStyles: ISpinButtonStyles = {
    root: {
      outline: 'none',
      fontSize: FontSizes.medium,
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
    iconDisabled: {
      color: SpinButtonIconDisabledColor
    },
    label: {
      pointerEvents: 'none',
      paddingTop: '2px',
      paddingRight: '0',
      paddingBottom: '2px',
      paddingLeft: '0',
    },
    labelDisabled: {
      cursor: 'default',
      color: SpinButtonTextColorDisabled,
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText'
        }
      }
    },
    spinButtonWrapper: {
      display: 'flex',
      height: '26px',
      minWidth: '86px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: SpinButtonRootBorderColor,
    },
    spinButtonWrapperTopBottom: {
      width: '100%'
    },
    spinButtonWrapperHovered: {
      borderColor: SpinButtonRootBorderColorHovered,
      outline: '2px dashed transparent',
      selectors: {
        [HighContrastSelector]: {
          borderColor: 'Highlight'
        }
      }
    },
    spinButtonWrapperFocused: {
      borderColor: SpinButtonRootBorderColorFocused,
      outline: '2px dashed transparent',
      selectors: {
        [HighContrastSelector]: {
          borderColor: 'Highlight'
        }
      }
    },
    spinButtonWrapperDisabled: _getDisabledStyles(theme),
    input: {
      boxSizing: 'border-box',
      boxShadow: 'none',
      borderStyle: 'none',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
      fontSize: FontSizes.medium,
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
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'Highlight',
          borderColor: 'Highlight',
          color: 'HighlightText',
        }
      }
    },
    inputDisabled: _getDisabledStyles(theme),
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
    arrowButtonsContainerDisabled: _getDisabledStyles(theme),
  };

  let mergedStyles: Partial<ISpinButtonStyles> = concatStyleSets(defaultStyles, customStyles);

  return {
    root: mergedStyles.root,
    labelWrapper: [
      mergedStyles.labelWrapper,
      _getStyleForLabelBasedOnPosition(defaultStyles, labelPosition),
    ],
    icon: [
      mergedStyles.icon,
      disabled && mergedStyles.iconDisabled
    ],
    label: [
      mergedStyles.label,
      disabled && mergedStyles.labelDisabled
    ],
    spinButtonWrapper: [
      mergedStyles.spinButtonWrapper,
      _getStyleForRootBasedOnPosition(defaultStyles, labelPosition),
      !disabled && [
        {
          selectors: {
            ':hover': mergedStyles.spinButtonWrapperHovered
          }
        },
        isFocused && {
          selectors: {
            '&&': mergedStyles.spinButtonWrapperFocused
          }
        }
      ],
      disabled && mergedStyles.spinButtonWrapperDisabled
    ],
    input: [
      'ms-spinButton-input',
      mergedStyles.input,
      !disabled && {
        selectors: {
          '::selection': mergedStyles.inputTextSelected
        }
      },
      disabled && mergedStyles.inputDisabled
    ],
    arrowButtonsContainer: [
      mergedStyles.arrowButtonsContainer,
      disabled && mergedStyles.arrowButtonsContainerDisabled
    ]
  };
});