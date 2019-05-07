import { styled } from '../../Utilities';
import { MicroFeedbackStackBase } from './MicroFeedback.base';
import { getStyles } from './MicroFeedback.styles';
import { IMicroFeedbackProps, IMicroFeedbackStyleProps, IMicroFeedbackStyles } from './MicroFeedback.types';

export const MicroFeedbackStack: React.StatelessComponent<IMicroFeedbackProps> = styled<
  IMicroFeedbackProps,
  IMicroFeedbackStyleProps,
  IMicroFeedbackStyles
>(MicroFeedbackStackBase, getStyles, undefined, { scope: 'MicroFeedback' });
