import { IRawStyle, ITheme, concatStyleSets, HighContrastSelector, IconFontSizes } from '../../Styling';
import { IButtonStyles } from '../../Button';
import { ISpinButtonStyles } from './SpinButton.types';
import { memoizeFunction } from '../../Utilities';

const ARROW_BUTTON_WIDTH = 23;
const ARROW_BUTTON_ICON_SIZE = 8;
const DEFAULT_HEIGHT = 32;
const LABEL_MARGIN = 10;

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
    const { palette, effects } = theme;

    // TODO: after updating the semanticColor slots all this need to be reevaluated.
    const ArrowButtonTextColor = palette.neutralSecondary;
    const ArrowButtonTextColorHovered = palette.neutralPrimary;
    const ArrowButtonTextColorPressed = palette.neutralPrimary;

    const ArrowButtonBackgroundHovered = palette.neutralLighter;
    const ArrowButtonBackgroundPressed = palette.neutralLight;

    const defaultArrowButtonStyles: IButtonStyles = {
      root: {
        outline: 'none',
        display: 'block',
        height: '50%',
        width: ARROW_BUTTON_WIDTH,
        padding: 0,
        backgroundColor: 'transparent',
        textAlign: 'center',
        cursor: 'default',
        color: ArrowButtonTextColor,
        selectors: {
          '&.ms-DownButton': {
            borderRadius: `0 0 ${effects.roundedCorner2} 0`
          },
          '&.ms-UpButton': {
            borderRadius: `0 ${effects.roundedCorner2} 0 0`
          }
        }
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
        fontSize: ARROW_BUTTON_ICON_SIZE,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0
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
    const { palette, semanticColors, effects, fonts } = theme;

    const SpinButtonRootBorderColor = semanticColors.inputBorder;
    const SpinButtonRootBorderColorHovered = semanticColors.inputBorderHovered;
    const SpinButtonRootBorderColorFocused = semanticColors.inputFocusBorderAlt;

    const SpinButtonInputTextColor = semanticColors.bodyText;
    const SpinButtonInputTextColorSelected = palette.white;
    const SpinButtonInputBackgroundColorSelected = palette.themePrimary;

    const SpinButtonIconDisabledColor = semanticColors.disabledText;

    const defaultStyles: ISpinButtonStyles = {
      root: {
        outline: 'none',
        fontSize: fonts.medium.fontSize,
        width: '100%',
        minWidth: 86
      },
      labelWrapper: {
        display: 'inline-flex'
      },
      labelWrapperStart: {
        height: DEFAULT_HEIGHT,
        alignItems: 'center',
        float: 'left',
        marginRight: LABEL_MARGIN
      },
      labelWrapperEnd: {
        height: DEFAULT_HEIGHT,
        alignItems: 'center',
        float: 'right',
        marginLeft: LABEL_MARGIN
      },
      labelWrapperTop: {},
      labelWrapperBottom: {},
      icon: {
        padding: '0 5px',
        fontSize: IconFontSizes.large
      },
      iconDisabled: {
        color: SpinButtonIconDisabledColor
      },
      label: {
        pointerEvents: 'none',
        // centering the label with the icon by forcing the exact same height as the icon.
        lineHeight: IconFontSizes.large
      },
      labelDisabled: {},
      spinButtonWrapper: {
        display: 'flex',
        boxSizing: 'border-box',
        height: DEFAULT_HEIGHT,
        minWidth: 86,
        border: `1px solid ${SpinButtonRootBorderColor}`,
        borderRadius: effects.roundedCorner2
      },
      spinButtonWrapperTopBottom: {
        width: '100%'
      },
      spinButtonWrapperHovered: {
        borderColor: SpinButtonRootBorderColorHovered,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Highlight'
          }
        }
      },
      spinButtonWrapperFocused: {
        borderColor: SpinButtonRootBorderColorFocused,
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
        flex: 1,
        margin: 0,
        fontSize: fonts.medium.fontSize,
        color: SpinButtonInputTextColor,
        height: '100%',
        padding: '0 8px',
        outline: 0,
        display: 'block',
        minWidth: 72,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        cursor: 'text',
        userSelect: 'text',
        borderRadius: `${effects.roundedCorner2} 0 0 ${effects.roundedCorner2}`
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
        display: 'block',
        height: '100%',
        cursor: 'default'
      },
      arrowButtonsContainerDisabled: _getDisabledStyles(theme)
    };
    return concatStyleSets(defaultStyles, customStyles) as ISpinButtonStyles;
  }
);
