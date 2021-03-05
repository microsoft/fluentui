import { Accessibility } from '../../types';

/**
 * @description
 * Behavior for menu divider
 *
 * @specification
 * Adds role 'presentation' to 'root' slot.
 */
export const menuDividerBehavior: Accessibility<MenuDividerBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'presentation',
    },
  },
});

export type MenuDividerBehaviorProps = never;
