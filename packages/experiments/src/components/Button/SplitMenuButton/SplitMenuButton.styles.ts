import { getFocusStyle } from '../../../Styling';
import { ISplitMenuButtonComponent, ISplitMenuButtonStylesReturnType, ISplitMenuButtonTokenReturnType } from './SplitMenuButton.types';

const baseTokens: ISplitMenuButtonComponent['tokens'] = (props, theme): ISplitMenuButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackground,
    color: semanticColors.buttonText,
    contentPadding: '8px 10px'
  };
};

const primaryTokens: ISplitMenuButtonComponent['tokens'] = (props, theme): ISplitMenuButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackground,
    color: semanticColors.primaryButtonText
  };
};

const disabledTokens: ISplitMenuButtonComponent['tokens'] = (props, theme): ISplitMenuButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackgroundDisabled,
    color: semanticColors.disabledText
  };
};

export const SplitMenuButtonTokens: ISplitMenuButtonComponent['tokens'] = (props, theme): ISplitMenuButtonTokenReturnType => [
  baseTokens,
  props.primary && primaryTokens,
  (props.primaryActionDisabled || props.disabled) && disabledTokens
];

export const SplitMenuButtonStyles: ISplitMenuButtonComponent['styles'] = (props, theme, tokens): ISplitMenuButtonStylesReturnType => {
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
