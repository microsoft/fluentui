import { Accessibility, AriaRole } from '../../types';
import { keyboardKey } from '../../keyboard-key';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';

export const pillBehavior: Accessibility<PillBehaviorProps> = p => ({
  attributes: {
    root: {
      role: p.actionable ? 'button' : 'none',
      tabIndex: p.actionable ? 0 : -1,
      [IS_FOCUSABLE_ATTRIBUTE]: p.actionable || p.role === 'option',
    },
  },
  keyActions: {
    root: {
      ...(p.actionable && {
        performDismiss: {
          keyCombinations: [{ keyCode: keyboardKey.Delete }, { keyCode: keyboardKey.Backspace }],
        },
        performClick: {
          keyCombinations: [{ keyCode: keyboardKey.Enter }],
        },
      }),
    },
  },
});

export type PillBehaviorProps = {
  actionable: boolean;
  role: AriaRole;
};
