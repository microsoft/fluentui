import { Accessibility, AriaRole } from '../../types';
import { keyboardKey, SpacebarKey } from '../../keyboard-key';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';

export const pillBehavior: Accessibility<PillBehaviorProps> = p => ({
  attributes: {
    root: {
      role: p.actionable || p.selectable ? 'button' : 'none',
      tabIndex: p.actionable || p.selectable ? 0 : -1,
      [IS_FOCUSABLE_ATTRIBUTE]: p.actionable || p.selectable || p.role === 'option',
      ...(p.selectable && {
        'aria-selected': p.selected,
      }),
    },
  },
  keyActions: {
    root: {
      ...(p.dismissible && {
        performDismiss: {
          keyCombinations: [{ keyCode: keyboardKey.Delete }, { keyCode: keyboardKey.Backspace }],
        },
      }),
      ...((p.selectable || p.actionable) && {
        performClick: {
          keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
        },
      }),
    },
  },
});

export type PillBehaviorProps = {
  actionable: boolean;
  selectable: boolean;
  selected: boolean;
  role: AriaRole;
  dismissible: boolean;
};
