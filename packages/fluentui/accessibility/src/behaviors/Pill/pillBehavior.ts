import { Accessibility } from '../../types';
import { keyboardKey } from '../../keyboard-key';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';

export const pillBehavior: Accessibility<PillBehaviorProps> = p => ({
  attributes: {
    root: {
      role: p.actionable ? 'button' : 'none',
      tabIndex: p.actionable ? 0 : -1,
      [IS_FOCUSABLE_ATTRIBUTE]: p.actionable,
    },
  },
  keyActions: {
    root: {
      performDismiss: {
        keyCombinations: [
          { keyCode: keyboardKey.Escape },
          { keyCode: keyboardKey.Delete },
          { keyCode: keyboardKey.Backspace },
        ],
      },
    },
  },
});

export type PillBehaviorProps = {
  actionable: boolean;
};
