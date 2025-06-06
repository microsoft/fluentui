import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { TreeSlots, TreeState } from './Tree.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const treeClassNames: SlotClassNames<Omit<TreeSlots, 'collapseMotion'>> = {
  root: 'fui-Tree',
};

const useBaseStyles = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: semanticTokens._ctrlTreeGapInsideDefault,
});

const useStyles = makeStyles({
  subtree: {
    paddingTop: semanticTokens._ctrlTreeGapInsideDefault,
  },
});

export const useTreeStyles_unstable = (state: TreeState): TreeState => {
  'use no memo';

  const baseStyles = useBaseStyles();
  const styles = useStyles();
  const isSubTree = state.level > 1;

  state.root.className = mergeClasses(
    treeClassNames.root,
    baseStyles,
    isSubTree && styles.subtree,
    state.root.className,
  );
  return state;
};
