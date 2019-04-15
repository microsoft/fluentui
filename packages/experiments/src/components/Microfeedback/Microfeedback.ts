import { styled } from '../../Utilities';
import { MicrofeedbackBase } from './Microfeedback.base';
import { getStyles } from './Microfeedback.styles';
import { IMicrofeedbackProps, IMicrofeedbackStyleProps, IMicrofeedbackStyles } from './Microfeedback.types';

export const Microfeedback: React.StatelessComponent<IMicrofeedbackProps> = styled<
  IMicrofeedbackProps,
  IMicrofeedbackStyleProps,
  IMicrofeedbackStyles
>(MicrofeedbackBase, getStyles, undefined, { scope: 'Microfeedback' });
