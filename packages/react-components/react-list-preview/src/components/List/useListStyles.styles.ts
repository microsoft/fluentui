import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { ListLayout, ListOrientation, ListSlots, ListState } from './List.types';

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
    // TODO Add default styles for the root element
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
    [ListLayout.Vertical]: styles.root,
    [ListLayout.Horizontal]: styles.rootHorizontal,
    [ListLayout.Grid]: styles.rootGrid,
  };

  state.root.className = mergeClasses(
    listClassNames.root,
    styles.root,
    layoutToStyles[state.layout],
    state.root.className,
  );

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
