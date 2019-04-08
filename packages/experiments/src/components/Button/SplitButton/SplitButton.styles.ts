import { getFocusStyle, HighContrastSelector } from '../../../Styling';
import { ISplitButtonComponent, ISplitButtonStylesReturnType, ISplitButtonTokenReturnType } from './SplitButton.types';

const baseTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackground,
    color: semanticColors.buttonText,
    contentPadding: '0px 10px'
  };
};

const primaryTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackground,
    color: semanticColors.primaryButtonText,
    highContrastColor: 'Window'
  };
};

const disabledTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackgroundDisabled,
    color: semanticColors.disabledText,
    highContrastColor: 'GrayText'
  };
};

export const SplitButtonTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => [
  baseTokens,
  props.primary && primaryTokens,
  (props.primaryActionDisabled || props.disabled) && disabledTokens
];

export const SplitButtonStyles: ISplitButtonComponent['styles'] = (props, theme, tokens): ISplitButtonStylesReturnType => {
  return {
    root: [
      getFocusStyle(theme),
      {
        backgroundColor: tokens.backgroundColor
      }
    ],
    button: {
      selectors: {
        '> *': {
          padding: tokens.contentPadding
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
    }
  };
};
