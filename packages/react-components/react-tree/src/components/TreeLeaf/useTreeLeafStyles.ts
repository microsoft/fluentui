import { makeStyles, mergeClasses } from '@griffel/react';
import type { TreeLeafSlots, TreeLeafState } from './TreeLeaf.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const treeLeafClassNames: SlotClassNames<TreeLeafSlots> = {
  root: 'fui-TreeLeaf',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
});

export const useTreeLeafStyles_unstable = (state: TreeLeafState): TreeLeafState => {
  const styles = useStyles();
  state.root.className = mergeClasses(treeLeafClassNames.root, styles.root, state.root.className);

  return state;
};
