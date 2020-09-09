import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';

/**
 * @description
 * Implements ARIA grid layout for breadcrumb
 * @specification
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
