import { makeStyles, mergeClasses } from '@griffel/react';
import type { SearchBoxSlots, SearchBoxState } from './SearchBox.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const searchBoxClassNames: SlotClassNames<SearchBoxSlots> = {
  root: 'fui-SearchBox',
  // TODO: add class names for all slots on SearchBoxSlots.
  // Should be of the form `<slotName>: 'fui-SearchBox__<slotName>`
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
 * Apply styling to the SearchBox slots based on the state
 */
export const useSearchBoxStyles_unstable = (state: SearchBoxState): SearchBoxState => {
  const styles = useStyles();
  state.root.className = mergeClasses(searchBoxClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
