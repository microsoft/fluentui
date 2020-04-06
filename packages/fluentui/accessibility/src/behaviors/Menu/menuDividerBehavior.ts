import { Accessibility } from '../../types';

/**
 * @description
 * Behavior for menu divider
 *
 * @specification
 * Adds role 'presentation' to 'root' slot.
 */

const menuDividerBehavior: Accessibility = () => ({
  attributes: {
    root: {
      role: 'presentation',
    },
  },
});

export default menuDividerBehavior;
