import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';

/**
 * @description
 * Implements ARIA Toolbar design pattern.
 * Child item components need to have toolbarItemBehavior assigned.
 * @specification
 * Adds role 'toolbar' to 'root' slot.
 * Provides arrow key navigation in horizontal direction.
 * When component's container element receives focus, focus will be set to the default focusable child element of the component.
 */
export const toolbarBehavior: Accessibility<ToolbarBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'toolbar',
    },
  },
  focusZone: {
    props: {
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: FocusZoneDirection.horizontal,
    },
  },
});

export type ToolbarBehaviorProps = never;
