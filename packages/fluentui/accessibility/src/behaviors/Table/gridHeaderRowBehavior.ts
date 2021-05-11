import { Accessibility } from '../../types';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { FocusZoneDirection } from '../../focusZone/types';
import { keyboardKey } from '../../keyboard-key';
import { gridHeaderCellBehavior } from './gridHeaderCellBehavior';
import { GridRowBehaviorProps } from './gridRowBehavior';

/**
 * @specification
 * Adds role='row'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 * Provides arrow key navigation in horizontal direction.
 * Focused active element of the component is reset when TAB from the component.
 * When component's container element receives focus, focus will be set to the default focusable child element of the component.
 * Triggers 'unsetRowTabbable' action using 'shiftKey' + 'Tab' key on 'root'.
 * Applies 'gridHeaderCellBehavior' for 'cell' child component.
 */
export const gridHeaderRowBehavior: Accessibility<GridRowBehaviorProps> = props => ({
  attributes: {
    root: {
      [IS_FOCUSABLE_ATTRIBUTE]: true,
      role: 'row',
    },
  },
  focusZone: {
    props: {
      direction: FocusZoneDirection.horizontal,
      shouldFocusInnerElementWhenReceivedFocus: true,
      shouldResetActiveElementWhenTabFromZone: true,
    },
  },
  keyActions: {
    root: {
      unsetRowTabbable: {
        keyCombinations: [{ keyCode: keyboardKey.Tab, shiftKey: true }],
      },
    },
  },
  childBehaviors: {
    cell: gridHeaderCellBehavior,
  },
});
