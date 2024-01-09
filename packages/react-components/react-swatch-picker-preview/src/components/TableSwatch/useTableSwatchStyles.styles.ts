import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableSwatchSlots, TableSwatchState } from './TableSwatch.types';

export const tableSwatchClassNames: SlotClassNames<TableSwatchSlots> = {
  root: 'fui-TableSwatch',
  // TODO: add class names for all slots on TableSwatchSlots.
  // Should be of the form `<slotName>: 'fui-TableSwatch__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    // TODO Add default styles for the root element
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the TableSwatch slots based on the state
 */
export const useTableSwatchStyles_unstable = (state: TableSwatchState): TableSwatchState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableSwatchClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
