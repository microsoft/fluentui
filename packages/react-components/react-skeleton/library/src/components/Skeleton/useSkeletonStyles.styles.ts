import { mergeClasses } from '@griffel/react';
import type { SkeletonSlots, SkeletonState } from './Skeleton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
export const skeletonClassNames: SlotClassNames<SkeletonSlots> = {
  root: 'fui-Skeleton',
};

/**
 * Apply styling to the Skeleton slots based on the state
 */
export const useSkeletonStyles_unstable = (state: SkeletonState): SkeletonState => {
  'use no memo';

  state.root.className = mergeClasses(skeletonClassNames.root, state.root.className);

  return state;
};
