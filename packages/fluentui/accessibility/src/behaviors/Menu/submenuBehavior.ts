import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';
import { menuItemBehavior } from './menuItemBehavior';

/**
 * @description
 * The 'menu' role is used to identify an element that creates a list of common actions or functions that a user can invoke.
 *
 * @specification
 * Adds role='menu'.
 * Provides arrow key navigation in vertical direction.
 * Keyboard navigation is circular.
 * Component will get focus when mounted.
 */
export const submenuBehavior: Accessibility<SubmenuBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'menu',
    },
  },
  focusZone: {
    props: {
      isCircularNavigation: true,
      shouldFocusOnMount: true,
      direction: FocusZoneDirection.vertical,
    },
  },
  childBehaviors: { item: menuItemBehavior },
});

export type SubmenuBehaviorProps = never;
