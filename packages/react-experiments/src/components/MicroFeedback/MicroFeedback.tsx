import * as React from 'react';
import { createComponent } from '@fluentui/foundation-legacy';
import { useMicroFeedbackState as state } from './MicroFeedback.state';
import { MicroFeedbackStyles as styles, MicroFeedbackTokens as tokens } from './MicroFeedback.styles';
import { MicroFeedbackView } from './MicroFeedback.view';
import type { IMicroFeedbackProps } from './MicroFeedback.types';

export const MicroFeedback: React.FunctionComponent<IMicroFeedbackProps> = createComponent(MicroFeedbackView, {
  displayName: 'MicroFeedback',
  state,
  styles,
  tokens,
});

export default MicroFeedback;
