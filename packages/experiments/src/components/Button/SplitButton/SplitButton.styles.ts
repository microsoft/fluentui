import { HighContrastSelector } from '../../../Styling';
import { ISplitButtonComponent, ISplitButtonStylesReturnType, ISplitButtonTokenReturnType } from './SplitButton.types';

const baseTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { effects, palette, semanticColors } = theme;
  return {
    backgroundColor: palette.white,
    backgroundColorHovered: palette.neutralLighter,
    borderColor: semanticColors.buttonBorder,
    borderColorHovered: semanticColors.buttonBorder,
    borderColorPressed: semanticColors.buttonBorder,
    borderRadius: effects.roundedCorner2,
    borderWidth: 1,
    color: semanticColors.buttonText,
    contentPadding: '0px 19px',
    dividerColor: semanticColors.menuDivider,
    minHeight: 35,
    minWidth: 0,
    secondaryPadding: '0px 10px'
  };
};

const primaryTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackground,
    backgroundColorHovered: semanticColors.primaryButtonBackgroundHovered,
    backgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,
    borderWidth: 0,
    color: semanticColors.primaryButtonText,
    highContrastBackgroundColor: 'WindowText',
    highContrastBackgroundColorHovered: 'Highlight',
    highContrastBackgroundColorPressed: 'Highlight',
    highContrastColor: 'Window'
  };
};

const disabledTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackgroundDisabled,
    backgroundColorHovered: semanticColors.buttonBackgroundDisabled,
    backgroundColorPressed: semanticColors.buttonBackgroundDisabled,
    borderColor: semanticColors.buttonBorderDisabled,
    borderColorHovered: semanticColors.buttonBorderDisabled,
    borderColorPressed: semanticColors.buttonBorderDisabled,
    color: semanticColors.disabledText,
    highContrastColor: 'GrayText'
  };
};

export const SplitButtonTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => [
  baseTokens,
  props.primary && primaryTokens,
  props.disabled && disabledTokens
];

export const SplitButtonStyles: ISplitButtonComponent['styles'] = (props, theme, tokens): ISplitButtonStylesReturnType => {
  return {
    root: {
      backgroundColor: tokens.backgroundColor,
      borderRadius: tokens.borderRadius,
      boxSizing: 'border-box',

      selectors: {
        [HighContrastSelector]: {
          backgroundColor: tokens.highContrastBackgroundColor,
          borderColor: 'transparent'
        },
        ':hover': {
          backgroundColor: tokens.backgroundColorHovered,
          borderColor: props.primaryActionDisabled ? 'transparent' : tokens.borderColorHovered,

          selectors: {
            [HighContrastSelector]: {
              backgroundColor: tokens.highContrastBackgroundColorHovered
            }
          }
        },
        ':active': {
          backgroundColor: tokens.backgroundColorPressed,
          borderColor: props.primaryActionDisabled ? 'transparent' : tokens.borderColorPressed,

          selectors: {
            [HighContrastSelector]: {
              backgroundColor: tokens.highContrastBackgroundColorPressed
            }
          }
        }
      }
    },
    button: {
      borderBottomLeftRadius: tokens.borderRadius,
      borderBottomRightRadius: '0px',
      borderTopLeftRadius: tokens.borderRadius,
      borderTopRightRadius: '0px',
      borderBottomWidth: tokens.borderWidth,
      borderLeftWidth: tokens.borderWidth,
      borderRightWidth: 0,
      borderTopWidth: tokens.borderWidth,
      minHeight: tokens.minHeight,
      minWidth: tokens.minWidth,

      selectors: {
        ':hover': {
          borderColor: props.primaryActionDisabled ? 'transparent' : tokens.borderColorHovered
        },
        ':active': {
          borderColor: props.primaryActionDisabled ? 'transparent' : tokens.borderColorPressed
        }
      }
    },
    splitDivider: {
      backgroundClip: 'content-box',
      backgroundColor: tokens.dividerColor,
      borderBottomColor: tokens.borderColor,
      borderTopColor: tokens.borderColor,
      borderStyle: 'solid',
      borderBottomWidth: tokens.borderWidth,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: tokens.borderWidth,
      boxSizing: 'border-box',
      height: '100%',
      padding: '7px 0px',
      width: 1,

      selectors: {
        [HighContrastSelector]: {
          borderColor: tokens.highContrastColor
        },
        ':hover': {
          borderColor: tokens.borderColorHovered
        },
        ':active': {
          borderColor: tokens.borderColorPressed
        }
      }
    },
    menuButton: {
      borderBottomLeftRadius: '0px',
      borderBottomRightRadius: tokens.borderRadius,
      borderTopLeftRadius: '0px',
      borderTopRightRadius: tokens.borderRadius,
      borderStyle: 'solid',
      borderBottomWidth: tokens.borderWidth,
      borderLeftWidth: 0,
      borderRightWidth: tokens.borderWidth,
      borderTopWidth: tokens.borderWidth,
      boxSizing: 'border-box',
      height: '100%'
    }
  };
};
