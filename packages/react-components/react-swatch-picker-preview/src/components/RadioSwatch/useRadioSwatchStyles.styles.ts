import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RadioSwatchSlots, RadioSwatchState } from './RadioSwatch.types';

export const radioSwatchClassNames: SlotClassNames<RadioSwatchSlots> = {
  root: 'fui-RadioSwatch',
  // TODO: add class names for all slots on RadioSwatchSlots.
  // Should be of the form `<slotName>: 'fui-RadioSwatch__<slotName>`
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
 * Apply styling to the RadioSwatch slots based on the state
 */
export const useRadioSwatchStyles_unstable = (state: RadioSwatchState): RadioSwatchState => {
  const styles = useStyles();
  state.root.className = mergeClasses(radioSwatchClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
