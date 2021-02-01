import { Accessibility } from '../../types';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { FocusZoneDirection } from '../../focusZone/types';
import { keyboardKey } from '../../keyboard-key';

/**
 * @specification
 * Adds role='gridcell'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 * Provides arrow key navigation in bidirectional direction.
 * Triggers 'focusCell' action with 'Escape' on 'root'.
 */
export const gridCellMultipleFocusableBehavior: Accessibility<GridCellMultipleFocusableBehavior> = () => ({
  attributes: {
    root: {
      role: 'gridcell',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  focusZone: {
    props: {
      direction: FocusZoneDirection.bidirectional,
    },
  },
  keyActions: {
    root: {
      focusCell: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
});

type GridCellMultipleFocusableBehavior = never;
