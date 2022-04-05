import { Accessibility } from '../../types';

export const pillImageBehavior: Accessibility<PillImageBehaviorProps> = () => ({
  attributes: {
    root: {
      'aria-hidden': true,
    },
  },
});

export type PillImageBehaviorProps = never;
