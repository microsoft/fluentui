import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { ListSlots, ListState } from './List.types';

export const listClassNames: SlotClassNames<ListSlots> = {
  root: 'fui-List',
  // TODO: add class names for all slots on ListSlots.
  // Should be of the form `<slotName>: 'fui-List__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.padding(0),
    ...shorthands.margin(0),
    textIndent: 0,
    listStyleType: 'none',
  },

  rootHorizontal: {
    display: 'flex',
  },

  rootGrid: {
    display: 'grid',
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the List slots based on the state
 */
export const useListStyles_unstable = (state: ListState): ListState => {
  const styles = useStyles();

  const layoutToStyles = {
    ['vertical']: styles.root,
    ['horizontal']: styles.rootHorizontal,
    ['grid']: styles.rootGrid,
  };

  state.root.className = mergeClasses(
    listClassNames.root,
    styles.root,
    layoutToStyles[state.layout],
    state.root.className,
  );

  return state;
};
