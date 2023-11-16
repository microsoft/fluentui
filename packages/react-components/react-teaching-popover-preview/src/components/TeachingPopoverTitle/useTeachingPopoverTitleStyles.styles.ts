import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverTitleSlots, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';

export const teachingPopoverTitleClassNames: SlotClassNames<TeachingPopoverTitleSlots> = {
  root: 'fui-TeachingPopoverTitle',
  // TODO: add class names for all slots on TeachingPopoverTitleSlots.
  // Should be of the form `<slotName>: 'fui-TeachingPopoverTitle__<slotName>`
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
 * Apply styling to the TeachingPopoverTitle slots based on the state
 */
export const useTeachingPopoverTitleStyles_unstable = (state: TeachingPopoverTitleState): TeachingPopoverTitleState => {
  const styles = useStyles();
  state.root.className = mergeClasses(teachingPopoverTitleClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
