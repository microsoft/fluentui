import { IMicrofeedbackStyleProps, IMicrofeedbackStyles } from './Microfeedback.types';

export const getStyles = (props: IMicrofeedbackStyleProps): IMicrofeedbackStyles => {
  return {
    root: { margin: 8, float: 'right' },
    followUpQuestion: { margin: '10px', fontWeight: 'bold' },
    followUpOptionContainer: { border: '0px', width: '100%' }
  };
};
