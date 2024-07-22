import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { FlatTreeSlots, FlatTreeState } from './FlatTree.types';

export const flatTreeClassNames: SlotClassNames<FlatTreeSlots> = {
  root: 'fui-FlatTree',
};

const useBaseStyles = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: tokens.spacingVerticalXXS,
});

export const useFlatTreeStyles_unstable = (state: FlatTreeState): FlatTreeState => {
  'use no memo';

  const baseStyles = useBaseStyles();
  state.root.className = mergeClasses(flatTreeClassNames.root, baseStyles, state.root.className);
  return state;
};
