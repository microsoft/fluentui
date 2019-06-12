import * as React from 'react';
import { createComponent } from '../../Foundation';
import { useMicroFeedbackState as state } from './MicroFeedback.state';
import { MicroFeedbackStyles as styles, MicroFeedbackTokens as tokens } from './MicroFeedback.styles';
import { IMicroFeedbackProps } from './MicroFeedback.types';
import { MicroFeedbackView } from './MicroFeedback.view';

export const MicroFeedback: React.StatelessComponent<IMicroFeedbackProps> = createComponent(MicroFeedbackView, {
  displayName: 'MicroFeedback',
  state,
  styles,
  tokens
});

export default MicroFeedback;
