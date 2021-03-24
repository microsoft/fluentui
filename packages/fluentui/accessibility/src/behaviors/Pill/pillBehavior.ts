import { Accessibility } from '../../types';

/**
 * @description
 * Add tabIndex to 0 if actionable and -1 if not.
 * Set role to button if actionable and to none if not.
 */
export const pillBehavior: Accessibility<PillBehaviorProps> = p => ({
  attributes: {
    root: {
      role: p.actionable ? 'button' : 'none',
      tabIndex: p.actionable ? 0 : -1,
    },
  },
});

export type PillBehaviorProps = {
  actionable: boolean;
};
