import { Accessibility } from '../../types';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import * as keyboardKey from 'keyboard-key';

/**
 * @specification
 * Adds role='columnheader'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 */
const gridHeaderCellBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'columnheader',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
});

export default gridHeaderCellBehavior;
