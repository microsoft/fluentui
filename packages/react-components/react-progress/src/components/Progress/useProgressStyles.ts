import { makeStyles, mergeClasses } from '@griffel/react';
import type { ProgressSlots, ProgressState } from './Progress.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const progressClassNames: SlotClassNames<ProgressSlots> = {
  root: 'fui-Progress',
  // TODO: add class names for all slots on ProgressSlots.
  // Should be of the form `<slotName>: 'fui-Progress__<slotName>`
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
 * Apply styling to the Progress slots based on the state
 */
export const useProgressStyles_unstable = (state: ProgressState): ProgressState => {
  const styles = useStyles();
  state.root.className = mergeClasses(progressClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
