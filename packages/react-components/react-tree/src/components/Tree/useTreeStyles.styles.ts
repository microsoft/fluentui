import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TreeSlots, TreeState } from './Tree.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const treeClassNames: SlotClassNames<TreeSlots> = {
  root: 'fui-Tree',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS,
  },
  subtree: {
    ...shorthands.flex(1, 1, '100%'),
    ...shorthands.gridArea('subtree'),
    paddingTop: tokens.spacingVerticalXXS,
  },
});

export const useTreeStyles_unstable = (state: TreeState): TreeState => {
  const styles = useStyles();
  const isSubTree = state.level > 1;

  state.root.className = mergeClasses(
    treeClassNames.root,
    styles.root,
    isSubTree && styles.subtree,
    state.root.className,
  );
  return state;
};
