import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';
import { ListBehaviorProps } from './listBehavior';

/**
 * @description
 * The listbox role is used to identify an element that creates a list from which a user may select one or more items.
 *
 * @specification
 * Adds role='listbox'.
 * Adds attribute 'tabIndex=-1' to 'root' slot.
 * Adds attribute 'aria-orientation=horizontal' to 'root' slot if 'horizontal' property is true. Does not set the attribute otherwise.
 * Provides arrow key navigation in bidirectionalDomOrder direction.
 */
export const selectableListBehavior: Accessibility<ListBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'listbox',
      tabIndex: -1,
      ...(props.horizontal && {
        'aria-orientation': 'horizontal',
      }),
    },
  },
  focusZone: {
    props: {
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: FocusZoneDirection.bidirectionalDomOrder,
    },
  },
});
