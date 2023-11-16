import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverBodySlots, TeachingPopoverBodyState } from './TeachingPopoverBody.types';

export const teachingPopoverBodyClassNames: SlotClassNames<TeachingPopoverBodySlots> = {
  root: 'fui-TeachingPopoverBody',
  // TODO: add class names for all slots on TeachingPopoverBodySlots.
  // Should be of the form `<slotName>: 'fui-TeachingPopoverBody__<slotName>`
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
 * Apply styling to the TeachingPopoverBody slots based on the state
 */
export const useTeachingPopoverBodyStyles_unstable = (state: TeachingPopoverBodyState): TeachingPopoverBodyState => {
  const styles = useStyles();
  state.root.className = mergeClasses(teachingPopoverBodyClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
