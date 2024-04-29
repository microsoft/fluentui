import { Accessibility } from '../../types';
import { AlertBehaviorProps } from './alertBehavior';

/**
 * @description
 * Use attribute 'aria-describedby' for dismiss action.
 */
export const alertBaseBehavior: Accessibility<AlertBehaviorProps> = props => ({
  attributes: {
    dismissAction: {
      'aria-describedby': props.bodyId,
    },
  },
});
