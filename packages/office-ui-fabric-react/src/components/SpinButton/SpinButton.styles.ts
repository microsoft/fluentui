import { FontSizes, IRawStyle, ITheme, concatStyleSets, HighContrastSelector } from '../../Styling';

import { IButtonStyles } from '../../Button';
import { ISpinButtonStyles } from './SpinButton.types';
import { memoizeFunction } from '../../Utilities';

const _getDisabledStyles = memoizeFunction(
  (theme: ITheme): IRawStyle => {
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
  }
);

export const getArrowButtonStyles = memoizeFunction(
  (theme: ITheme, isUpArrow: boolean, customSpecificArrowStyles?: Partial<IButtonStyles>): IButtonStyles => {
    const { semanticColors } = theme;

    const ArrowButtonTextColor = semanticColors.buttonText;
    const ArrowButtonTextColorHovered = semanticColors.buttonTextHovered;
    const ArrowButtonTextColorPressed = semanticColors.buttonTextChecked;

    const ArrowButtonBackgroundHovered = semanticColors.buttonBackgroundHovered;
    const ArrowButtonBackgroundPressed = semanticColors.buttonBackgroundChecked;

    const defaultArrowButtonStyles: IButtonStyles = {
      root: {
        outline: 'none',
        display: 'block',
        height: '50%',
        width: '14px',
        padding: '0',
        backgroundColor: 'transparent',
        textAlign: 'center',
        cursor: 'default',
        color: ArrowButtonTextColor
      },
      rootHovered: {
        backgroundColor: ArrowButtonBackgroundHovered,
        color: ArrowButtonTextColorHovered
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
            opacity: 1
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
    const defaultUpArrowButtonStyles: Partial<IButtonStyles> = {};

    const defaultDownArrowButtonStyles: Partial<IButtonStyles> = {};

    return concatStyleSets(
      defaultArrowButtonStyles,
      isUpArrow ? defaultUpArrowButtonStyles : defaultDownArrowButtonStyles,
      customSpecificArrowStyles
    ) as IButtonStyles;
  }
);

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: Partial<ISpinButtonStyles>): ISpinButtonStyles => {
    const { palette, semanticColors } = theme;

    const SpinButtonRootBorderColor = semanticColors.inputBorder;
    const SpinButtonRootBorderColorHovered = semanticColors.inputBorderHovered;
    const SpinButtonRootBorderColorFocused = semanticColors.inputFocusBorderAlt;

    const SpinButtonTextColorDisabled = semanticColors.disabledText;
    const SpinButtonInputTextColor = semanticColors.bodyText;
    const SpinButtonInputTextColorSelected = palette.white;
    const SpinButtonInputBackgroundColorSelected = palette.themePrimary;

    const SpinButtonIconDisabledColor = semanticColors.disabledText;

    const defaultStyles: ISpinButtonStyles = {
      root: {
        outline: 'none',
        fontSize: FontSizes.medium,
        width: '100%',
        minWidth: '86px'
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
        padding: '2px 5px',
        fontSize: '20px'
      },
      iconDisabled: {
        color: SpinButtonIconDisabledColor
      },
      label: {
        pointerEvents: 'none',
        padding: '2px 0'
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
        boxSizing: 'border-box',
        height: '32px',
        minWidth: '86px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: SpinButtonRootBorderColor
      },
      spinButtonWrapperTopBottom: {
        width: '100%'
      },
      spinButtonWrapperHovered: {
        borderColor: SpinButtonRootBorderColorHovered,
        outline: '2px dashed transparent',
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Highlight',
            outline: 'none'
          }
        }
      },
      spinButtonWrapperFocused: {
        borderColor: SpinButtonRootBorderColorFocused,
        outline: '2px dashed transparent',
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Highlight',
            outline: 'none'
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
        padding: '0 12px',
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
            color: 'HighlightText'
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
        padding: '0',
        boxSizing: 'border-box'
      },
      arrowButtonsContainerDisabled: _getDisabledStyles(theme)
    };
    return concatStyleSets(defaultStyles, customStyles) as ISpinButtonStyles;
  }
);
