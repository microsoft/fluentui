import { Accessibility } from '../../types';

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
