import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorPickerSlots, ColorPickerState } from './ColorPicker.types';

export const colorPickerClassNames: SlotClassNames<ColorPickerSlots> = {
  root: 'fui-ColorPicker',
  // TODO: add class names for all slots on ColorPickerSlots.
  // Should be of the form `<slotName>: 'fui-ColorPicker__<slotName>`
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
 * Apply styling to the ColorPicker slots based on the state
 */
export const useColorPickerStyles_unstable = (state: ColorPickerState): ColorPickerState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(colorPickerClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
