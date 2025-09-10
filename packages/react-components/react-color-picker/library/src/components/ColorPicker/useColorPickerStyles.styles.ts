import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorPickerSlots, ColorPickerState } from './ColorPicker.types';
import { tokens } from '@fluentui/react-theme';

export const colorPickerClassNames: SlotClassNames<ColorPickerSlots> = {
  root: 'fui-ColorPicker',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
});

/**
 * Apply styling to the ColorPicker slots based on the state
 */
export const useColorPickerStyles_unstable = (state: ColorPickerState): ColorPickerState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(colorPickerClassNames.root, styles.root, state.root.className);

  return state;
};
