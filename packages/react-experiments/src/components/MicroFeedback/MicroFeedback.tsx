import * as React from 'react';
import { createComponent } from '@fluentui/foundation-legacy';
import { useMicroFeedbackState as state } from './MicroFeedback.state';
import { MicroFeedbackStyles as styles, MicroFeedbackTokens as tokens } from './MicroFeedback.styles';
import { IMicroFeedbackProps } from './MicroFeedback.types';
import { MicroFeedbackView } from './MicroFeedback.view';

export const MicroFeedback: React.FunctionComponent<IMicroFeedbackProps> = createComponent(MicroFeedbackView, {
  displayName: 'MicroFeedback',
  state,
  styles,
  tokens,
});

export default MicroFeedback;
