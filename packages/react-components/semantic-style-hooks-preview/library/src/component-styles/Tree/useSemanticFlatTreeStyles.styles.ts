import { makeResetStyles, mergeClasses } from '@griffel/react';
import { flatTreeClassNames, type FlatTreeState } from '@fluentui/react-tree';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useBaseStyles = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: semanticTokens.gapBetweenListItem,
});

export const useSemanticFlatTreeStyles = (_state: unknown): FlatTreeState => {
  'use no memo';

  const state = _state as FlatTreeState;

  const baseStyles = useBaseStyles();
  state.root.className = mergeClasses(
    flatTreeClassNames.root,
    baseStyles,
    state.root.className,
    getSlotClassNameProp_unstable(state.root),
  );
  return state;
};
