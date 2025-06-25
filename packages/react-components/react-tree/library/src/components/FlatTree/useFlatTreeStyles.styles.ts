import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { FlatTreeSlots, FlatTreeState } from './FlatTree.types';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const flatTreeClassNames: SlotClassNames<Omit<FlatTreeSlots, 'collapseMotion'>> = {
  root: 'fui-FlatTree',
};

const useBaseStyles = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: semanticTokens.gapBetweenListItem,
});

export const useFlatTreeStyles_unstable = (state: FlatTreeState): FlatTreeState => {
  'use no memo';

  const baseStyles = useBaseStyles();
  state.root.className = mergeClasses(flatTreeClassNames.root, baseStyles, state.root.className);
  return state;
};
