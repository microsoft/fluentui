import { Accessibility } from '../../types';

/**
 * @description
 * Adds attribute 'role=alert'.
 * Adds attribute 'aria-busy=true'.
 * Adds attribute 'aria-live=polite'.
 */
export const skeletonBehavior: Accessibility<SkeletonBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'alert',
      'aria-busy': true,
      'aria-live': 'polite',
    },
  },
});

export type SkeletonBehaviorProps = never;
