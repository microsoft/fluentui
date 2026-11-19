import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TreeState, TreeSlots } from './Tree.types';
import styles from './Tree.module.css';

export const treeClassNames: SlotClassNames<Omit<TreeSlots, 'collapseMotion'>> = {
  root: 'fui-Tree',
};

export const useTreeStyles_unstable = (state: TreeState): TreeState => {
  state.root.className = clsx(
    treeClassNames.root,
    styles.root,
    state.level > 1 && styles.subtree,
    state.root.className,
  );
  return state;
};
