import { Accessibility } from '../../types';
import { AlertBehaviorProps } from './alertBehavior';

/**
 * @description
 * Use attribute 'aria-describedby' for dismiss action.
 */

const alertBaseBehavior: Accessibility<AlertBehaviorProps> = props => ({
  attributes: {
    dismissAction: {
      'aria-describedby': props.bodyId,
    },
  },
});

export default alertBaseBehavior;
