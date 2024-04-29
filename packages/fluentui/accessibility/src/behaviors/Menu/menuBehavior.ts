import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';
import { menuItemBehavior } from './menuItemBehavior';
import { menuDividerBehavior } from './menuDividerBehavior';

/**
 * @description
 * Implements ARIA Menu design pattern.
 * The 'menu' role is used to identify an element that creates a list of common actions or functions that a user can invoke.
 *
 * @specification
 * Adds role='menu'.
 * Provides arrow key navigation in horizontal direction.
 * When 'vertical' prop is used, provides keyboard navigation in vertical direction.
 * Keyboard navigation is circular.
 */
export const menuBehavior: Accessibility<MenuBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'menu',
    },
  },
  focusZone: {
    props: {
      isCircularNavigation: true,
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: props.vertical ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal,
    },
  },
  childBehaviors: {
    item: menuItemBehavior,
    divider: menuDividerBehavior,
  },
});

export type MenuBehaviorProps = {
  /** Indicates if menu has its items displayed vertically. */
  vertical?: boolean;
};
