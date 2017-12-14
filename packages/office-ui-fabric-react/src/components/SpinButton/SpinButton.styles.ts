import {
  FontSizes,
  IRawStyle,
  ITheme,
  concatStyleSets,
  HighContrastSelector
} from '../../Styling';

import { IButtonBaseStyleProps, IButtonBaseStyles } from '../../Button';
import { ISpinButtonStyles } from './SpinButton.types';
import { memoizeFunction } from '../../Utilities';

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

export const getArrowButtonStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => {

  const { theme, expanded, disabled, checked } = props;

  const { palette } = theme;

  const ArrowButtonTextColor = palette.neutralPrimary;
  const ArrowButtonTextColorPressed = palette.white;
  const ArrowButtonBackgroundHovered = palette.neutralLight;
  const ArrowButtonBackgroundPressed = palette.themePrimary;

  const defaultArrowButtonStyles: IButtonBaseStyles = {
    button: [{
      height: '50%',
      width: '14px',
      outline: 'none',
      padding: 0,
      backgroundColor: 'transparent',
      textAlign: 'center',
      cursor: 'default',
      color: ArrowButtonTextColor,
      selectors: {
        ':hover': {
          backgroundColor: ArrowButtonBackgroundHovered
        },
        ':active': {
          backgroundColor: ArrowButtonBackgroundPressed,
          color: ArrowButtonTextColorPressed,
          selectors: {
            [HighContrastSelector]: {
              backgroundColor: 'Highlight',
              color: 'HighlightText'
            }
          }
        }
      }
    },
    checked && {
      backgroundColor: ArrowButtonBackgroundPressed,
      color: ArrowButtonTextColorPressed,
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'Highlight',
          color: 'HighlightText'
        }
      }
    },
    disabled && {
      opacity: 0.5,
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          opacity: 1,
        }
      }
    }
    ],
    icon: {
      lineHeight: '100%',
      height: '100%',
      fontSize: '6px',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0'
    }
  };

  return concatStyleSets(
    defaultArrowButtonStyles,

  );
};

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: Partial<ISpinButtonStyles>
): ISpinButtonStyles => {
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
      margin: 0,
      fontSize: FontSizes.medium,
      color: SpinButtonInputTextColor,
      paddingTop: '3px',
      paddingRight: '3px',
      paddingBottom: '4px',
      paddingLeft: '4px',
      outline: '0',
      textOverflow: 'ellipsis',
      flexGrow: 1,
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
      cursor: 'default',
      display: 'flex',
      flexDirection: 'column'
    },
    arrowButtonsContainerDisabled: _getDisabledStyles(theme),
  };
  return concatStyleSets(defaultStyles, customStyles) as ISpinButtonStyles;
});