import { makeStyles, mergeClasses } from '@griffel/react';
import type { FieldSlots, FieldState } from './Field.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const fieldClassName = 'fui-Field';
export const fieldClassNames: SlotClassNames<FieldSlots> = {
  root: 'fui-Field',
  // TODO: add class names for all slots on FieldSlots.
  // Should be of the form `<slotName>: 'fui-Field__<slotName>`
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
 * Apply styling to the Field slots based on the state
 */
export const useFieldStyles_unstable = (state: FieldState): FieldState => {
  const styles = useStyles();
  state.root.className = mergeClasses(fieldClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
