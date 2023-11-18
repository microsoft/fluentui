import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverActionsSlots, TeachingPopoverActionsState } from './TeachingPopoverActions.types';

export const teachingPopoverActionsClassNames: SlotClassNames<TeachingPopoverActionsSlots> = {
  root: 'fui-TeachingPopoverActions',
  // TODO: add class names for all slots on TeachingPopoverActionsSlots.
  // Should be of the form `<slotName>: 'fui-TeachingPopoverActions__<slotName>`
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
 * Apply styling to the TeachingPopoverActions slots based on the state
 */
export const useTeachingPopoverActionsStyles_unstable = (
  state: TeachingPopoverActionsState,
): TeachingPopoverActionsState => {
  const styles = useStyles();
  state.root.className = mergeClasses(teachingPopoverActionsClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
