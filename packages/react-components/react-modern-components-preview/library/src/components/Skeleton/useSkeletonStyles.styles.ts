import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SkeletonSlots, SkeletonState } from './Skeleton.types';
import styles from './Skeleton.module.css';

export const skeletonClassNames: SlotClassNames<SkeletonSlots> = {
  root: 'fui-Skeleton',
};

/**
 * Apply styling to the Skeleton slots based on the state.
 */
export const useSkeletonStyles = (state: SkeletonState): SkeletonState => {
  state.root.className = clsx(skeletonClassNames.root, state.root.as === 'span' && styles.block, state.root.className);

  return state;
};
