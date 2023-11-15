import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverHeaderSlots, TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';

export const teachingPopoverHeaderClassNames: SlotClassNames<TeachingPopoverHeaderSlots> = {
  root: 'fui-TeachingPopoverHeader',
  // TODO: add class names for all slots on TeachingPopoverHeaderSlots.
  // Should be of the form `<slotName>: 'fui-TeachingPopoverHeader__<slotName>`
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
 * Apply styling to the TeachingPopoverHeader slots based on the state
 */
export const useTeachingPopoverHeaderStyles_unstable = (
  state: TeachingPopoverHeaderState,
): TeachingPopoverHeaderState => {
  const styles = useStyles();
  state.root.className = mergeClasses(teachingPopoverHeaderClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
