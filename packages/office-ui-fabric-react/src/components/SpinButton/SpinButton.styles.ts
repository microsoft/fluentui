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

const _getStyleForLabelBasedOnPosition = memoizeFunction((
  labelPosition?: Position
): IRawStyle => {
  switch (labelPosition) {
    case Position.start:
      return {
        float: 'left',
        marginRight: '10px',
      };
    case Position.end:
      return {
        float: 'right',
        marginLeft: '10px'
      };
    case Position.top:
      return {
        marginBottom: '10px'
      };
    case Position.bottom:
      return {
        marginTop: '10px'
      };
    default: return {};
  }
});

const _getStyleForRootBasedOnPosition = memoizeFunction((labelPosition?: Position): IRawStyle => {
  switch (labelPosition) {
    case Position.top:
    case Position.bottom:
      return {
        width: '100%'
      };
    default: return {};
  }
});

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

  const _getOptionalCustomStyles = <T extends keyof ISpinButtonStyles>(id: T): IStyle => {
    return customStyles && customStyles[id];
  };

  const _getOptionalCustomLabelStyles = (): IStyle => {
    switch (labelPosition) {
      case Position.start:
        return _getOptionalCustomStyles('labelWrapperStart');
      case Position.end:
        return _getOptionalCustomStyles('labelWrapperEnd');
      case Position.top:
        return _getOptionalCustomStyles('labelWrapperTop');
      case Position.bottom:
        return _getOptionalCustomStyles('labelWrapperBottom');
      default: return {};
    }
  };

  const _getOptionalCustomStyleForRoot = (): IStyle => {
    switch (labelPosition) {
      case Position.top:
      case Position.bottom:
        return _getOptionalCustomStyles('spinButtonWrapperTopBottom');
      default: return {};
    }
  };

  return {
    root: [
      {
        outline: 'none',
        fontSize: FontSizes.medium,
        width: '100%',
        minWidth: '86px',
        paddingTop: '2px',
        paddingRight: '2px',
        paddingBottom: '2px',
        paddingLeft: '2px',
      },
      _getOptionalCustomStyles('root'),
    ],
    labelWrapper: [
      {
        display: 'inline-flex'
      },
      _getOptionalCustomStyles('labelWrapper'),
      _getStyleForLabelBasedOnPosition(labelPosition),
      _getOptionalCustomLabelStyles()
    ],
    icon: [
      {
        paddingTop: '2px',
        paddingRight: '5px',
        paddingBottom: '2px',
        paddingLeft: '5px',
        fontSize: '20px'
      },
      _getOptionalCustomStyles('icon'),
      disabled && [
        {
          color: SpinButtonIconDisabledColor
        },
        _getOptionalCustomStyles('iconDisabled')
      ]
    ],
    label: [
      {
        pointerEvents: 'none',
        paddingTop: '2px',
        paddingRight: '0',
        paddingBottom: '2px',
        paddingLeft: '0',
      },
      _getOptionalCustomStyles('label'),
      disabled && [
        {
          cursor: 'default',
          color: SpinButtonTextColorDisabled,
          selectors: {
            [HighContrastSelector]: {
              color: 'GrayText'
            }
          }
        }, _getOptionalCustomStyles('labelDisabled')
      ]
    ],
    spinButtonWrapper: [
      {
        display: 'flex',
        height: '26px',
        minWidth: '86px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: SpinButtonRootBorderColor,
      },
      _getOptionalCustomStyles('spinButtonWrapper'),
      _getStyleForRootBasedOnPosition(labelPosition),
      _getOptionalCustomStyleForRoot(),
      !disabled && [
        {
          selectors: {
            ':hover': [
              {
                borderColor: SpinButtonRootBorderColorHovered,
                outline: '2px dashed transparent',
                selectors: {
                  [HighContrastSelector]: {
                    borderColor: 'Highlight'
                  }
                }
              }, _getOptionalCustomStyles('spinButtonWrapperHovered')
            ]
          }
        },
        isFocused && {
          selectors: {
            '&&': [
              {
                borderColor: SpinButtonRootBorderColorFocused,
                outline: '2px dashed transparent',
                selectors: {
                  [HighContrastSelector]: {
                    borderColor: 'Highlight'
                  }
                }
              }, _getOptionalCustomStyles('spinButtonWrapperFocused')
            ]
          }
        }
      ],
      disabled && [
        _getDisabledStyles(theme),
        _getOptionalCustomStyles('spinButtonWrapperDisabled')
      ]
    ],
    input: [
      'ms-spinButton-input',
      {
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
      _getOptionalCustomStyles('input'),
      !disabled && {
        selectors: {
          '::selection': [
            {
              backgroundColor: SpinButtonInputBackgroundColorSelected,
              color: SpinButtonInputTextColorSelected,
              selectors: {
                [HighContrastSelector]: {
                  backgroundColor: 'Highlight',
                  borderColor: 'Highlight',
                  color: 'HighlightText',
                }
              }
            }, _getOptionalCustomStyles('inputTextSelected')
          ]
        }
      },
      disabled && [
        _getDisabledStyles(theme),
        _getOptionalCustomStyles('inputDisabled')
      ]
    ],
    arrowButtonsContainer: [
      {
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
      _getOptionalCustomStyles('arrowButtonsContainer'),
      disabled && [
        _getDisabledStyles(theme),
        _getOptionalCustomStyles('arrowButtonsContainerDisabled')
      ]
    ]
  };
});