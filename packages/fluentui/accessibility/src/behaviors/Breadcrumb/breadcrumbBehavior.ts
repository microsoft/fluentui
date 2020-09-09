import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';

/**
 * @description
 * Implements ARIA Toolbar design pattern.
 * Child item components need to have toolbarItemBehavior assigned.
 * @specification
 * Adds role 'toolbar' to 'root' slot.
 */
export const breadcrumbBehavior: Accessibility<BreadcrumbBehaviorProps> = () => ({
  focusZone: {
    props: {
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: FocusZoneDirection.bidirectional,
      isCircularNavigation: false,
    },
  },
});

export type BreadcrumbBehaviorProps = never;
