import { makeStyles, mergeClasses } from '@griffel/react';
import type { AlertSlots, AlertState } from './Alert.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const alertClassName = 'fui-Alert';
export const alertClassNames: SlotClassNames<AlertSlots> = {
  root: 'fui-Alert',
  // TODO: add class names for all slots on AlertSlots.
  // Should be of the form `<slotName>: 'fui-Alert__<slotName>`
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
 * Apply styling to the Alert slots based on the state
 */
export const useAlertStyles_unstable = (state: AlertState): AlertState => {
  const styles = useStyles();
  state.root.className = mergeClasses(alertClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
