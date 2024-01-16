import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TablePickerSlots, TablePickerState } from './TablePicker.types';

export const tablePickerClassNames: SlotClassNames<TablePickerSlots> = {
  root: 'fui-TablePicker',
  tbody: 'fui-TablePicker__tbody',
  // TODO: add class names for all slots on TablePickerSlots.
  // Should be of the form `<slotName>: 'fui-TablePicker__<slotName>`
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
 * Apply styling to the TablePicker slots based on the state
 */
export const useTablePickerStyles_unstable = (state: TablePickerState): TablePickerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tablePickerClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
