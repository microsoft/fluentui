import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SkeletonItemState, SkeletonItemSlots } from './SkeletonItem.types';
import styles from './SkeletonItem.module.css';

export const skeletonItemClassNames: SlotClassNames<SkeletonItemSlots> = {
  root: 'fui-SkeletonItem',
};

export const useSkeletonItemStyles_unstable = (state: SkeletonItemState): SkeletonItemState => {
  state.root.className = clsx(
    skeletonItemClassNames.root,
    styles.root,
    state.root.as === 'span' && styles.block,
    styles[state.animation],
    styles[state.appearance],
    styles[state.shape],
    styles[`size${state.size}`],
    state.root.className,
  );
  return state;
};
