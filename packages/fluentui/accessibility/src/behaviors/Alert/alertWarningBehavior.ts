import { Accessibility } from '../../types';
import { AlertBehaviorProps } from './alertBehavior';

/**
 * @specification
 * Adds role 'alert' to 'body' slot.
 * Adds attribute 'aria-live=polite' to 'body' slot.
 */
export const alertWarningBehavior: Accessibility<AlertBehaviorProps> = props => ({
  attributes: {
    body: {
      role: 'alert',
      'aria-live': 'polite',
    },
    dismissAction: {
      'aria-describedby': props.bodyId,
    },
  },
});
