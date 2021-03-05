import { keyboardKey } from '../../keyboard-key';
import { Accessibility } from '../../types';

/**
 * @description
 * Implements ARIA Radio Group design pattern.
 * @specification
 *  Adds role='radiogroup'. This allows screen readers to handle the component as a radio group.
 *  Triggers 'nextItem' action with 'ArrowDown' or 'ArrowRight' on 'root'.
 *  Triggers 'prevItem' action with 'ArrowUp' or 'ArrowLeft' on 'root'.
 */
export const radioGroupBehavior: Accessibility<RadioGroupBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'radiogroup',
    },
  },

  keyActions: {
    root: {
      nextItem: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }, { keyCode: keyboardKey.ArrowRight }],
      },
      prevItem: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowUp }, { keyCode: keyboardKey.ArrowLeft }],
      },
    },
  },
});

export type RadioGroupBehaviorProps = never;
