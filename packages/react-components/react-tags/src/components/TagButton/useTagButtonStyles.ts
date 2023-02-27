import { makeStyles, mergeClasses } from '@griffel/react';
import type { TagButtonSlots, TagButtonState } from './TagButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tagButtonClassNames: SlotClassNames<TagButtonSlots> = {
  root: 'fui-TagButton',
  // TODO: add class names for all slots on TagButtonSlots.
  // Should be of the form `<slotName>: 'fui-TagButton__<slotName>`
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
 * Apply styling to the TagButton slots based on the state
 */
export const useTagButtonStyles_unstable = (state: TagButtonState): TagButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tagButtonClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
