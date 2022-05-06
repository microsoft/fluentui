import { makeStyles, mergeClasses } from '@griffel/react';
import type { ComboboxBaseSlots, ComboboxBaseState } from './ComboboxBase.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const comboboxBaseClassName = 'fui-ComboboxBase';
export const comboboxBaseClassNames: SlotClassNames<ComboboxBaseSlots> = {
  root: 'fui-ComboboxBase',
  // TODO: add class names for all slots on ComboboxBaseSlots.
  // Should be of the form `<slotName>: 'fui-ComboboxBase__<slotName>`
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
 * Apply styling to the ComboboxBase slots based on the state
 */
export const useComboboxBaseStyles_unstable = (state: ComboboxBaseState): ComboboxBaseState => {
  const styles = useStyles();
  state.root.className = mergeClasses(comboboxBaseClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
