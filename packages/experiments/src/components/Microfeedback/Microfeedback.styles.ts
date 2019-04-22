import { IMicrofeedbackStyleProps, IMicrofeedbackStyles } from './Microfeedback.types';

export const getStyles = (props: IMicrofeedbackStyleProps): IMicrofeedbackStyles => {
  return {
    root: {
      margin: 8,
      float: 'right'
    },
    followUpQuestion: {
      fontFamily: "'Segoe UI Semibold'",
      margin: '10px',
      fontSize: '12px'
    },
    followUpOptionText: {
      fontFamily: "'Segoe UI'",
      margin: '10px',
      fontSize: '12px'
    },
    followUpOptionContainer: {
      background: 'white',
      border: '0px',
      width: '100%'
    }
  };
};
