import { Accessibility, AriaRole } from '../../types';
import { keyboardKey } from '../../keyboard-key';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';

export const pillOptionBehavior: Accessibility<PillBehaviorProps> = p => ({
  attributes: {
    root: {
      role: 'option',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  keyActions: {
    root: {
      performDismiss: {
        keyCombinations: [{ keyCode: keyboardKey.Delete }, { keyCode: keyboardKey.Backspace }],
      },
    },
  },
});

export type PillBehaviorProps = {
  actionable: boolean;
  role: AriaRole;
};
