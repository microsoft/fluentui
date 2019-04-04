import { getFocusStyle } from '../../../Styling';
import { ISplitButtonComponent, ISplitButtonStylesReturnType, ISplitButtonTokenReturnType } from './SplitButton.types';

const baseTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackground,
    color: semanticColors.buttonText,
    contentPadding: '8px 10px'
  };
};

const primaryTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackground,
    color: semanticColors.primaryButtonText
  };
};

const disabledTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackgroundDisabled,
    color: semanticColors.disabledText
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
      borderRight: '1px solid',
      borderColor: tokens.color,
      boxSizing: 'border-box',
      height: 'calc(100% - 16px)',
      margin: '8px 0px',
      width: 1
    }
  };
};
