import { makeStyles, mergeClasses } from '@griffel/react';
import type { TreeSlots, TreeState } from './Tree.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const treeClassNames: SlotClassNames<TreeSlots> = {
  root: 'fui-Tree',
};

const useRootStyles = makeStyles({
  root: {
    display: 'block',
    alignItems: 'center',
    position: 'relative',
  },
});

export const useTreeStyles_unstable = (state: TreeState): TreeState => {
  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(treeClassNames.root, rootStyles.root, state.root.className);

  return state;
};
