import { FocusZoneDirection } from '../../focusZone/types';
import { Accessibility } from '../../types';
import { ListBehaviorProps } from './listBehavior';

/**
 * @specification
 * Adds role='menu'.
 * Provides arrow key navigation in bidirectionalDomOrder direction.
 */
export const navigableListBehavior: Accessibility<ListBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'menu',
    },
  },
  focusZone: {
    props: {
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: FocusZoneDirection.bidirectionalDomOrder,
    },
  },
});
