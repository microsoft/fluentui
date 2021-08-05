import { Accessibility } from '../../types';
import { getCode, keyboardKey } from '../../keyboard-key';
import { FocusZoneDirection } from '../../focusZone/types';
import { gridRowBehavior } from './gridRowBehavior';

/**
 * @specification
 * Adds role='grid'.
 * Focus can be moved inside a child component with embeded inner FocusZone by pressing a specified key.
 * Provides arrow key navigation in vertical direction.
 * Focused active element of the component is reset when TAB from the component.
 * Triggers 'focus' action with 'Escape' on 'root'.
 * Applies 'gridRowBehavior' for 'row' child component.
 */
export const gridNestedBehavior: Accessibility<GridNestedBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'grid',
    },
  },
  focusZone: {
    props: {
      shouldEnterInnerZone: event => getCode(event) === keyboardKey.ArrowRight,
      direction: FocusZoneDirection.vertical,
      shouldResetActiveElementWhenTabFromZone: true,
    },
  },
  keyActions: {
    root: {
      focus: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
  childBehaviors: {
    row: gridRowBehavior,
  },
});

type GridNestedBehaviorProps = never;
