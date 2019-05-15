import { IMicroFeedbackComponent, IMicroFeedbackStylesReturnType } from './MicroFeedback.types';

export const MicroFeedbackTokens: IMicroFeedbackComponent['tokens'] = {};

export const MicroFeedbackStyles: IMicroFeedbackComponent['styles'] = (props, theme, tokens): IMicroFeedbackStylesReturnType => {
  return {
    root: {
      margin: '4px 8px 4px 8px'
    },
    iconContainer: {
      float: 'right'
    },
    followUpQuestion: {
      fontFamily: "'Segoe UI Semibold'",
      margin: '20px 12px 6px 12px',
      fontSize: '12px',
      letterSpacing: '0.1px',
      border: '0px'
    },
    followUpContainer: {
      paddingLeft: '0px'
    },
    followUpOption: {
      paddingLeft: '12px',
      paddingRight: '12px',
      background: 'transparent',
      border: '0px',
      width: '100%'
    },
    followUpOptionText: {
      fontFamily: "'Segoe UI'",
      margin: '4px 0px 4px 0px',
      fontSize: '12px',
      letterSpacing: '0.11px',
      textAlign: 'left',
      border: '0px',
      width: '100%'
    }
  };
};
