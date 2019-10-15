import * as React from 'react';
import { createComponent } from '../../Foundation';
import { MicroFeedbackState as state } from './MicroFeedback.state';
import { MicroFeedbackStyles as styles, MicroFeedbackTokens as tokens } from './MicroFeedback.styles';
import { IMicroFeedbackProps } from './MicroFeedback.types';
import { MicroFeedbackView as view } from './MicroFeedback.view';

export const MicroFeedback: React.StatelessComponent<IMicroFeedbackProps> = createComponent({
  displayName: 'MicroFeedback',
  state,
  styles,
  tokens,
  view
});

export default MicroFeedback;
