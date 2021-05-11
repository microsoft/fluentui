import { keyboardKey } from '../../keyboard-key';
import { Accessibility } from '../../types';

/**
 * @specification
 * Adds attribute 'role=presentation' to 'root' slot.
 * Triggers 'moveNext' action with 'ArrowDown' on 'root'.
 * Triggers 'movePrevious' action with 'ArrowUp' on 'root'.
 * Triggers 'moveFirst' action with 'Home' on 'root'.
 * Triggers 'moveLast' action with 'End' on 'root'.
 */
export const accordionBehavior: Accessibility<AccordionBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'presentation',
    },
  },
  keyActions: {
    root: {
      moveNext: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
      },
      movePrevious: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowUp }],
      },
      moveFirst: {
        keyCombinations: [{ keyCode: keyboardKey.Home }],
      },
      moveLast: {
        keyCombinations: [{ keyCode: keyboardKey.End }],
      },
    },
  },
});

export type AccordionBehaviorProps = never;
