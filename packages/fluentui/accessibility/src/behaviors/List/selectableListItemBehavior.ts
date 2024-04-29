import { keyboardKey, SpacebarKey } from '../../keyboard-key';

import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { Accessibility } from '../../types';
import { ListItemBehaviorProps } from './listItemBehavior';

/**
 * @specification
 * Adds role='option'. This role is used for a selectable item in a list.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 * Adds attribute 'aria-selected=true' based on the property 'selected'. Based on this screen readers will recognize the selected state of the item.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
export const selectableListItemBehavior: Accessibility<ListItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'option',
      'aria-selected': !!props.selected,
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
      },
    },
  },
});
