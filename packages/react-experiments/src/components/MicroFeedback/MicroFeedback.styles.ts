import type {
  IMicroFeedbackComponent,
  IMicroFeedbackStylesReturnType,
  IMicroFeedbackTokenReturnType,
} from './MicroFeedback.types';

const baseTokens: IMicroFeedbackComponent['tokens'] = {
  questionMargin: '20px 12px 6px',
};

const inlineTokens: IMicroFeedbackComponent['tokens'] = (props, theme) => {
  return {
    followUpBackgroundColor: theme.palette.white,
    questionMargin: '12px 12px 6px',
    width: '100%',
  };
};

export const MicroFeedbackTokens: IMicroFeedbackComponent['tokens'] = (props, theme): IMicroFeedbackTokenReturnType => [
  baseTokens,
  props.inline && inlineTokens,
];

export const MicroFeedbackStyles: IMicroFeedbackComponent['styles'] = (
  props,
  theme,
  tokens,
): IMicroFeedbackStylesReturnType => {
  return {
    root: {
      margin: '4px 8px 4px 8px',
      width: tokens.width,
    },
    iconContainer: {
      float: 'right',
    },
    followUpQuestion: {
      fontFamily: "'Segoe UI Semibold'",
      margin: tokens.questionMargin,
      fontSize: '12px',
      letterSpacing: '0.1px',
      border: '0px',
    },
    followUpContainer: {
      backgroundColor: tokens.followUpBackgroundColor,
      paddingBottom: '6px',
    },
    thanksContainer: {
      backgroundColor: theme.palette.white,
      padding: '6px',
    },
    followUpOption: {
      paddingLeft: '12px',
      paddingRight: '12px',
      background: 'transparent',
      border: '0px',
      minHeight: 0,
      width: '100%',
    },
    followUpOptionText: {
      fontFamily: "'Segoe UI'",
      fontSize: '12px',
      letterSpacing: '0.11px',
      textAlign: 'left',
      border: '0px',
      width: '100%',
    },
  };
};
