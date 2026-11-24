import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TreeItemState, TreeItemSlots } from './TreeItem.types';
import { treeItemLevelToken } from '../../utils/tokens';
import styles from './TreeItem.module.css';

export const treeItemClassNames: SlotClassNames<TreeItemSlots> = {
  root: 'fui-TreeItem',
};

export const useTreeItemStyles_unstable = (state: TreeItemState): TreeItemState => {
  const staticLevel = state.level >= 1 && state.level <= 10;
  state.root.className = clsx(
    treeItemClassNames.root,
    styles.root,
    staticLevel && styles[`level${state.level}`],
    state.root.className,
  );
  if (!staticLevel) {
    state.root.style = { [treeItemLevelToken]: state.level, ...state.root.style };
  }
  return state;
};
