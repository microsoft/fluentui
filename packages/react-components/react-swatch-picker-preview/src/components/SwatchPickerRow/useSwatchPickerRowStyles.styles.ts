import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchPickerRowSlots, SwatchPickerRowState } from './SwatchPickerRow.types';

export const swatchPickerCSSVars = {
  rowGap: `--fui-SwatchPicker--rowGap`,
};

const { rowGap } = swatchPickerCSSVars;

export const swatchPickerRowClassNames: SlotClassNames<SwatchPickerRowSlots> = {
  root: 'fui-SwatchPickerRow',
  // TODO: add class names for all slots on SwatchPickerRowSlots.
  // Should be of the form `<slotName>: 'fui-SwatchPickerRow__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: `var(${rowGap})`,
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the SwatchPickerRow slots based on the state
 */
export const useSwatchPickerRowStyles_unstable = (state: SwatchPickerRowState): SwatchPickerRowState => {
  const styles = useStyles();
  state.root.className = mergeClasses(swatchPickerRowClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
