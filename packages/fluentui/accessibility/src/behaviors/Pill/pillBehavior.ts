import { Accessibility, AriaRole } from '../../types';
import { keyboardKey } from '../../keyboard-key';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';

export const pillBehavior: Accessibility<PillBehaviorProps> = p => ({
  attributes: {
    root: {
      role: p.actionable ? 'button' : p.role,
      tabIndex: p.actionable ? 0 : -1,
      [IS_FOCUSABLE_ATTRIBUTE]: p.actionable || p.role === 'option',
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
  role: AriaRole;
};
