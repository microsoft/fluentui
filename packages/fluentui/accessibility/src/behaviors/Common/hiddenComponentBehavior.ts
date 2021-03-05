import { Accessibility } from '../../types';

/**
 * @specification
 * Adds attribute 'aria-hidden=true' to 'root' slot.
 */
export const hiddenComponentBehavior: Accessibility<never> = () => ({
  attributes: {
    root: {
      'aria-hidden': true,
    },
  },
});
