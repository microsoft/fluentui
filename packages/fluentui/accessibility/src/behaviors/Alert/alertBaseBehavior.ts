import { Accessibility } from '../../types';
import { AlertProps } from './alertWarningBehavior';

/**
 * @description
 * Use attribute 'aria-describedby' for dismiss action.
 */

const alertBaseBehavior: Accessibility<AlertProps> = props => ({
  attributes: {
    dismissAction: {
      'aria-describedby': props.bodyId,
    },
  },
});

export default alertBaseBehavior;
