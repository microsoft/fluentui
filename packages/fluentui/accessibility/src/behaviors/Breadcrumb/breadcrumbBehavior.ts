import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';

/**
 * @description
 * Implements ARIA grid layout for breadcrumb
 * @specification
 * Provides arrow key navigation in bidirectional direction.
 * When component's container element receives focus, focus will be set to the default focusable child element of the component.
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
