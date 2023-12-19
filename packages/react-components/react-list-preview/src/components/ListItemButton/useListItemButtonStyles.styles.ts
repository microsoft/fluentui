import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ListItemButtonSlots, ListItemButtonState } from './ListItemButton.types';

export const listItemButtonClassNames: SlotClassNames<ListItemButtonSlots> = {
  root: 'fui-ListItemButton',
  // TODO: add class names for all slots on ListItemButtonSlots.
  // Should be of the form `<slotName>: 'fui-ListItemButton__<slotName>`
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
 * Apply styling to the ListItemButton slots based on the state
 */
export const useListItemButtonStyles_unstable = (state: ListItemButtonState): ListItemButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(listItemButtonClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
