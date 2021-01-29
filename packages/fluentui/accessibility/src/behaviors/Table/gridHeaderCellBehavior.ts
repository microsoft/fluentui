import { Accessibility } from '../../types';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { keyboardKey, SpacebarKey } from '../../keyboard-key';

/**
 * @specification
 * Adds role='columnheader'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 */
export const gridHeaderCellBehavior: Accessibility<GridHeaderCellBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'columnheader',
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

type GridHeaderCellBehaviorProps = never;
