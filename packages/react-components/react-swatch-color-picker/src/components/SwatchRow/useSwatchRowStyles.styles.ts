import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchRowSlots, SwatchRowState } from './SwatchRow.types';

export const swatchRowClassNames: SlotClassNames<SwatchRowSlots> = {
  root: 'fui-SwatchRow',
  // TODO: add class names for all slots on SwatchRowSlots.
  // Should be of the form `<slotName>: 'fui-SwatchRow__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the SwatchRow slots based on the state
 */
export const useSwatchRowStyles_unstable = (state: SwatchRowState): SwatchRowState => {
  const styles = useStyles();
  state.root.className = mergeClasses(swatchRowClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
