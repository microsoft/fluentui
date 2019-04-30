import { getFocusStyle, HighContrastSelector } from '../../../Styling';
import { ISplitButtonComponent, ISplitButtonStylesReturnType, ISplitButtonTokenReturnType } from './SplitButton.types';

const baseTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackground,
    borderColor: semanticColors.buttonBorder,
    borderWidth: 1,
    color: semanticColors.buttonText,
    contentPadding: '0px 10px',
    minWidth: 0
  };
};

const primaryTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackground,
    borderColor: semanticColors.primaryButtonBorder,
    borderColorHovered: semanticColors.buttonBorder,
    borderColorPressed: semanticColors.buttonBorder,
    color: semanticColors.primaryButtonText,
    highContrastColor: 'Window'
  };
};

const disabledTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackgroundDisabled,
    borderColor: semanticColors.buttonBorderDisabled,
    borderColorHovered: semanticColors.buttonBorderDisabled,
    borderColorPressed: semanticColors.buttonBorderDisabled,
    color: semanticColors.disabledText,
    highContrastColor: 'GrayText'
  };
};

const primaryActionDisabledTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    borderColorHovered: semanticColors.buttonBorder,
    borderColorPressed: semanticColors.buttonBorder
  };
};

export const SplitButtonTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => [
  baseTokens,
  props.primary && primaryTokens,
  (props.primaryActionDisabled || props.disabled) && disabledTokens,
  props.primaryActionDisabled && primaryActionDisabledTokens
];

export const SplitButtonStyles: ISplitButtonComponent['styles'] = (props, theme, tokens): ISplitButtonStylesReturnType => {
  return {
    root: [
      {
        borderColor: tokens.borderColor,
        borderStyle: 'solid',
        borderWidth: tokens.borderWidth,
        boxSizing: 'border-box',

        selectors: {
          ':hover': {
            borderColor: props.primaryActionDisabled ? 'transparent' : tokens.borderColorHovered
          },
          ':active': {
            borderColor: props.primaryActionDisabled ? 'transparent' : tokens.borderColorPressed
          },
          [HighContrastSelector]: {
            borderColor: 'transparent'
          }
        }
      },
      getFocusStyle(theme),
      {
        backgroundColor: tokens.backgroundColor
      }
    ],
    button: {
      borderColor: 'transparent',
      minWidth: tokens.minWidth,

      selectors: {
        '> *': {
          padding: tokens.contentPadding
        },
        ':hover': {
          borderColor: 'transparent'
        },
        ':active': {
          borderColor: 'transparent'
        }
      }
    },
    splitDivider: {
      backgroundColor: tokens.color,
      boxSizing: 'border-box',
      height: 'calc(100% - 14px)',
      margin: '7px 0px',
      width: 1,

      selectors: {
        [HighContrastSelector]: {
          borderColor: tokens.highContrastColor
        }
      }
    },
    menuButton: {
      borderColor: 'transparent',

      selectors: {
        '> *': {
          padding: tokens.contentPadding
        },
        ':hover': {
          borderColor: props.primaryActionDisabled ? tokens.borderColorHovered : 'transparent'
        },
        ':active': {
          borderColor: props.primaryActionDisabled ? tokens.borderColorPressed : 'transparent'
        }
      }
    }
  };
};
