import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
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
 * Styles for the root slot
 */
const useStyles = makeStyles({
  rootHorizontal: {
    display: 'flex',
  },

  rootGrid: {
    display: 'grid',
  },
});

/**
 * Apply styling to the List slots based on the state
 */
export const useListStyles_unstable = (state: ListState): ListState => {
  'use no memo';

  const rootStyles = useRootBaseStyles();
  const styles = useStyles();

  const layoutToStyles = {
    ['horizontal']: styles.rootHorizontal,
    ['grid']: styles.rootGrid,
    ['vertical']: undefined, // no extra styles needed, keep it in for completeness and type safety
  };

  state.root.className = mergeClasses(
    listClassNames.root,
    rootStyles,
    layoutToStyles[state.layout],
    state.root.className,
  );

  return state;
};
