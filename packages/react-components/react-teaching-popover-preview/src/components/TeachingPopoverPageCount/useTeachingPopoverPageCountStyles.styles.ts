import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverPageCountSlots, TeachingPopoverPageCountState } from './TeachingPopoverPageCount.types';

export const teachingPopoverPageCountClassNames: SlotClassNames<TeachingPopoverPageCountSlots> = {
  root: 'fui-TeachingPopoverPageCount',
  // TODO: add class names for all slots on TeachingPopoverPageCountSlots.
  // Should be of the form `<slotName>: 'fui-TeachingPopoverPageCount__<slotName>`
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
 * Apply styling to the TeachingPopoverPageCount slots based on the state
 */
export const useTeachingPopoverPageCountStyles_unstable = (
  state: TeachingPopoverPageCountState,
): TeachingPopoverPageCountState => {
  const styles = useStyles();
  state.root.className = mergeClasses(teachingPopoverPageCountClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
