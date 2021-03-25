import { Accessibility } from '../../types';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';

export const pillBehavior: Accessibility<PillBehaviorProps> = p => ({
  attributes: {
    root: {
      role: p.actionable ? 'button' : 'none',
      tabIndex: p.actionable ? 0 : -1,
      [IS_FOCUSABLE_ATTRIBUTE]: p.actionable,
    },
  },
});

export type PillBehaviorProps = {
  actionable: boolean;
};
