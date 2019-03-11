import { MicrofeedbackView } from './Microfeedback.view';
import { MicrofeedbackStyles, MicrofeedbackTokens } from './Microfeedback.styles';
import { MicrofeedbackState } from './Microfeedback.state';
import { IMicrofeedbackProps } from './Microfeedback.types';
import { createComponent } from '../../Foundation';

export const Microfeedback: React.StatelessComponent<IMicrofeedbackProps> = createComponent({
  displayName: 'Microfeedback',
  view: MicrofeedbackView,
  state: MicrofeedbackState,
  styles: MicrofeedbackStyles,
  tokens: MicrofeedbackTokens
});
