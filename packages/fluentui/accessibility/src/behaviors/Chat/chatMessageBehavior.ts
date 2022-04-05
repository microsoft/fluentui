import { keyboardKey } from '../../keyboard-key';

import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { Accessibility } from '../../types';
import { FocusZoneTabbableElements, FocusZoneDirection } from '../../focusZone/types';

/**
 * @description
 * Sets the message to be a focusable element.
 * Adds a vertical circular focus zone navigation where a user navigates using a Tab key.
 * Adds a key action which prevents up and down arrow keys from navigating in FocusZone, we only want a Tab key to navigate.
 * Adds an escape key action which focuses the chat message, i.e., moves key handling from inside a message back to the chat list.
 *
 * @specification
 * Provides arrow key navigation in vertical direction.
 * Keyboard navigation is circular.
 * Focus is moved within the focusable children of the component using TAB key.
 * Does not handle PageDown and PageUp.
 */
export const chatMessageBehavior: Accessibility<ChatMessageBehaviorProps> = props => ({
  attributes: {
    root: {
      [IS_FOCUSABLE_ATTRIBUTE]: true,
      tabIndex: -1,
      ...(props.hasActionMenu &&
        !props.inlineActionMenu && {
          'aria-owns': props.actionMenuId,
        }),
    },
  },
  focusZone: {
    props: {
      handleTabKey: FocusZoneTabbableElements.all,
      isCircularNavigation: true,
      direction: FocusZoneDirection.vertical,
      pagingSupportDisabled: true,
    },
  },
  keyActions: {
    root: {
      // prevents default FocusZone behavior, in this case, prevents using arrow keys as navigation (we only want a Tab key to navigate)
      preventDefault: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowUp }, { keyCode: keyboardKey.ArrowDown }],
      },
      focus: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
});

export type ChatMessageBehaviorProps = {
  hasActionMenu?: boolean;
  inlineActionMenu?: boolean;
  actionMenuId?: string;
};
