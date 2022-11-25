import { makeStyles, mergeClasses } from '@griffel/react';
import type { TreeItemSlots, TreeItemState } from './TreeItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const treeItemClassNames: SlotClassNames<TreeItemSlots> = {
  root: 'fui-TreeItem',
  afterIcon: 'fui-TreeItem__afterIcon',
  beforeIcon: 'fui-TreeItem__beforeIcon',
  expandIcon: 'fui-TreeItem__expandIcon',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
});

/**
 * Apply styling to the TreeItem slots based on the state
 */
export const useTreeItemStyles_unstable = (state: TreeItemState): TreeItemState => {
  const styles = useStyles();
  state.root.className = mergeClasses(treeItemClassNames.root, styles.root, state.root.className);

  return state;
};
