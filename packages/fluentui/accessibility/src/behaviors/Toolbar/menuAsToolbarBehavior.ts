import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';
import { menuItemAsToolbarButtonBehavior } from './menuItemAsToolbarButtonBehavior';

/**
 * @description
 * Implements ARIA Toolbar design pattern.
 * Child item components need to have menuItemAsToolbarButtonBehavior assigned.
 * @specification
 * Adds role 'toolbar' to 'root' slot.
 * Provides arrow key navigation in bidirectionalDomOrder direction.
 * When component's container element receives focus, focus will be set to the default focusable child element of the component.
 */
export const menuAsToolbarBehavior: Accessibility<MenuAsToolbarBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'toolbar',
    },
  },
  focusZone: {
    props: {
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: FocusZoneDirection.bidirectionalDomOrder,
    },
  },
  childBehaviors: {
    item: menuItemAsToolbarButtonBehavior,
  },
});

export type MenuAsToolbarBehaviorProps = never;
