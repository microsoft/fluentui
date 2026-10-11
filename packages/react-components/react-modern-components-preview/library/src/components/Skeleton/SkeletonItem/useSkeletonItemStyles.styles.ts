import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SkeletonItemSlots, SkeletonItemState } from './SkeletonItem.types';
import styles from './SkeletonItem.module.css';

export const skeletonItemClassNames: SlotClassNames<SkeletonItemSlots> = {
  root: 'fui-SkeletonItem',
};

/**
 * Apply styling to the SkeletonItem slots based on the state.
 */
export const useSkeletonItemStyles = (state: SkeletonItemState): SkeletonItemState => {
  state.root.className = clsx(
    skeletonItemClassNames.root,
    styles.root,
    state.root.as === 'span' && styles.block,
    state.root.className,
  );

  return state;
};
