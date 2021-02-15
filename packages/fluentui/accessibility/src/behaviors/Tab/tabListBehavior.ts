import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';
import { tabBehavior } from './tabBehavior';

/**
 * @description
 * Implements ARIA Tabs design pattern.
 * Child item components need to have tabBehavior assigned.
 * @specification
 * Adds role 'tablist' to 'root' slot.
 * Provides arrow key navigation in bidirectionalDomOrder direction.
 * When component's container element receives focus, focus will be set to the default focusable child element of the component.
 */
export const tabListBehavior: Accessibility<TabListBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'tablist',
    },
  },
  focusZone: {
    props: {
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: FocusZoneDirection.bidirectionalDomOrder,
    },
  },
  childBehaviors: {
    item: tabBehavior,
  },
});

export type TabListBehaviorProps = never;
