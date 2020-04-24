import { Accessibility } from '../../types';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { FocusZoneDirection } from '../../focusZone/types';
import * as keyboardKey from 'keyboard-key';
import gridCellBehavior from './gridCellBehavior';
import { GridRowBehaviorProps } from './gridRowBehavior';

/**
 * @specification
 * Adds role='row'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 * Adds attribute 'aria-selected=true' based on the property 'selected'. Based on this screen readers will recognize the selected state of the item.
 * Focus can be moved inside a child component with embeded inner FocusZone by pressing a specified key.
 * Provides arrow key navigation in horizontal direction.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Triggers 'unsetRowTabbable' action using 'shiftKey' + 'Tab' key on 'root'.
 * Applies 'gridCellBehavior' for 'cell' child component.
 */
const gridRowNestedBehavior: Accessibility<GridRowBehaviorProps> = props => ({
  attributes: {
    root: {
      [IS_FOCUSABLE_ATTRIBUTE]: true,
      role: 'row',
      'aria-selected': props.selected,
    },
  },
  focusZone: {
    props: {
      shouldEnterInnerZone: event => keyboardKey.getCode(event) === keyboardKey.Enter,
      direction: FocusZoneDirection.horizontal,
    },
  },
  keyActions: {
    root: {
      unsetRowTabbable: {
        keyCombinations: [{ keyCode: keyboardKey.Tab, shiftKey: true }],
      },
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
  childBehaviors: {
    cell: gridCellBehavior,
  },
});

export default gridRowNestedBehavior;
