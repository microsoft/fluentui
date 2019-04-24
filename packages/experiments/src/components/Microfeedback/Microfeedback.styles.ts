import { IMicrofeedbackStyleProps, IMicrofeedbackStyles } from './Microfeedback.types';

export const getStyles = (props: IMicrofeedbackStyleProps): IMicrofeedbackStyles => {
  return {
    root: {
      margin: '4px 8px 4px 8px',
      float: 'right'
    },
    followUpQuestion: {
      fontFamily: "'Segoe UI Semibold'",
      margin: '20px 12px 6px 12px',
      fontSize: '12px',
      letterSpacing: '0.1px',
      border: '0px'
    },
    followUpOptionText: {
      fontFamily: "'Segoe UI'",
      margin: '4px 0px 4px 0px',
      fontSize: '12px',
      letterSpacing: '0.11px',
      textAlign: 'left',
      border: '0px',
      width: '100%'
    },
    followUpOptionContainer: {
      paddingLeft: '12px',
      paddingRight: '12px',
      background: 'transparent',
      border: '0px',
      width: '100%'
    },
    followUpContainer: {
      paddingLeft: '0px'
    }
  };
};
