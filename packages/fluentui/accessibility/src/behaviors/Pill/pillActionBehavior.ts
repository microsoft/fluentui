import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role='presentation'.
 * Adds attribute 'aria-hidden=true' to 'root' slot.
 */
export const pillActionBehavior: Accessibility<PillActionBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'presentation',
      'aria-hidden': 'true',
      tabIndex: -1,
    },
  },
});

export type PillActionBehaviorProps = never;
