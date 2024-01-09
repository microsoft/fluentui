import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchPickerSlots, SwatchPickerState } from './SwatchPicker.types';
import { tokens } from '@fluentui/react-components';
export const swatchPickerClassNames: SlotClassNames<SwatchPickerSlots> = {
  root: 'fui-SwatchPicker',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    ...shorthands.padding(tokens.spacingVerticalMNudge),
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the SwatchPicker slots based on the state
 */
export const useSwatchPickerStyles_unstable = (state: SwatchPickerState): SwatchPickerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(swatchPickerClassNames.root, styles.root, state.root.className);

  return state;
};
