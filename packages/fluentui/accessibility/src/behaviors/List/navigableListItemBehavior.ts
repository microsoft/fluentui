import { keyboardKey, SpacebarKey } from '../../keyboard-key';

import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { Accessibility } from '../../types';
import { ListItemBehaviorProps } from './listItemBehavior';

/**
 * @specification
 * Adds role='menuitem'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
export const navigableListItemBehavior: Accessibility<ListItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'menuitem',
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
