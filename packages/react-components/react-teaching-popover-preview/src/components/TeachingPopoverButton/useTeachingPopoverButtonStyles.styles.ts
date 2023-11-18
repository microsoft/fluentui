import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverButtonSlots, TeachingPopoverButtonState } from './TeachingPopoverButton.types';

export const teachingPopoverButtonClassNames: SlotClassNames<TeachingPopoverButtonSlots> = {
  root: 'fui-TeachingPopoverButton',
  // TODO: add class names for all slots on TeachingPopoverButtonSlots.
  // Should be of the form `<slotName>: 'fui-TeachingPopoverButton__<slotName>`
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
 * Apply styling to the TeachingPopoverButton slots based on the state
 */
export const useTeachingPopoverButtonStyles_unstable = (
  state: TeachingPopoverButtonState,
): TeachingPopoverButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(teachingPopoverButtonClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
