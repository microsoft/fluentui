import { Accessibility } from '../../types';

/**
 * @specification
 * Adds attribute 'aria-hidden=true' to 'root' slot.
 */
const hiddenComponentBehavior: Accessibility<never> = () => ({
  attributes: {
    root: {
      'aria-hidden': true,
    },
  },
});

export default hiddenComponentBehavior;
