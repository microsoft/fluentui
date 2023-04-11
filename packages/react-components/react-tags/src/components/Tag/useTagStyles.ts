import { makeStyles, mergeClasses } from '@griffel/react';
import type { TagSlots, TagState } from './Tag.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tagClassNames: SlotClassNames<TagSlots> = {
  root: 'fui-Tag',
  // TODO: add class names for all slots on TagSlots.
  // Should be of the form `<slotName>: 'fui-Tag__<slotName>`
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
 * Apply styling to the Tag slots based on the state
 */
export const useTagStyles_unstable = (state: TagState): TagState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tagClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
