import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { ListSlots, ListState } from './List.types';

export const listClassNames: SlotClassNames<ListSlots> = {
  root: 'fui-List',
};

const useRootBaseStyles = makeResetStyles({
  padding: 0,
  margin: 0,
  textIndent: 0,
  listStyleType: 'none',
});

/**
 * Apply styling to the List slots based on the state
 */
export const useListStyles_unstable = (state: ListState): ListState => {
  'use no memo';

  const rootStyles = useRootBaseStyles();

  state.root.className = mergeClasses(listClassNames.root, rootStyles, state.root.className);

  return state;
};
