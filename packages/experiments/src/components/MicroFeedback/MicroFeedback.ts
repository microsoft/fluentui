import { styled } from '../../Utilities';
import { MicroFeedbackBase } from './MicroFeedback.base';
import { getStyles } from './MicroFeedback.styles';
import { IMicroFeedbackProps, IMicroFeedbackStyleProps, IMicroFeedbackStyles } from './MicroFeedback.types';

export const MicroFeedback: React.StatelessComponent<IMicroFeedbackProps> = styled<
  IMicroFeedbackProps,
  IMicroFeedbackStyleProps,
  IMicroFeedbackStyles
>(MicroFeedbackBase, getStyles, undefined, { scope: 'MicroFeedback' });
