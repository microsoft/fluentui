import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { treeClassNames, type TreeState } from '@fluentui/react-tree';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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

export const useSemanticTreeStyles = (_state: unknown): TreeState => {
  'use no memo';

  const state = _state as TreeState;
  const baseStyles = useBaseStyles();
  const styles = useStyles();
  const isSubTree = state.level > 1;

  state.root.className = mergeClasses(
    treeClassNames.root,
    baseStyles,
    isSubTree && styles.subtree,
    state.root.className,
    getSlotClassNameProp_unstable(state.root),
  );
  return state;
};
