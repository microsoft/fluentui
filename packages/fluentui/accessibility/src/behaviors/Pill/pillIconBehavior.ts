import { Accessibility } from '../../types';

export const pillIconBehavior: Accessibility<PillIconBehaviorProps> = () => ({
  attributes: {
    root: {
      'aria-hidden': true,
    },
  },
});

export type PillIconBehaviorProps = never;
