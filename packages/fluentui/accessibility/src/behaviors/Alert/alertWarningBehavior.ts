import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role 'alert' to 'body' slot.
 * Adds attribute 'aria-live=polite' to 'body' slot.
 */

const alertWarningBehavior: Accessibility<AlertProps> = props => ({
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

export default alertWarningBehavior;

export type AlertProps = {
  /** An alert may be formatted to display a danger message. */
  danger?: boolean;
  /** An alert may be formatted to display a warning message. */
  warning?: boolean;
  /** Id of the alert body element. */
  bodyId?: string;
};
