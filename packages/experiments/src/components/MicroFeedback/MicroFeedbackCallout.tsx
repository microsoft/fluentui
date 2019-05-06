import { styled } from '../../Utilities';
import { MicroFeedbackCalloutBase } from './MicroFeedback.base';
import { getStyles } from './MicroFeedback.styles';
import { IMicroFeedbackProps, IMicroFeedbackStyleProps, IMicroFeedbackStyles } from './MicroFeedback.types';

export const MicroFeedbackCallout: React.StatelessComponent<IMicroFeedbackProps> = styled<
  IMicroFeedbackProps,
  IMicroFeedbackStyleProps,
  IMicroFeedbackStyles
>(MicroFeedbackCalloutBase, getStyles, undefined, { scope: 'MicroFeedback' });
