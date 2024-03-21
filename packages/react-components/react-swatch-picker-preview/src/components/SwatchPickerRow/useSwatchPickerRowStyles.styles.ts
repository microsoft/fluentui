import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchPickerRowSlots, SwatchPickerRowState } from './SwatchPickerRow.types';

export const swatchPickerCSSVars = {
  rowGap: `--fui-SwatchPicker--rowGap`,
};

const { rowGap } = swatchPickerCSSVars;

export const swatchPickerRowClassNames: SlotClassNames<SwatchPickerRowSlots> = {
  root: 'fui-SwatchPickerRow',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  display: 'flex',
  flexDirection: 'row',
  columnGap: `var(${rowGap})`,
});

/**
 * Apply styling to the SwatchPickerRow slots based on the state
 */
export const useSwatchPickerRowStyles_unstable = (state: SwatchPickerRowState): SwatchPickerRowState => {
  const styles = useStyles();
  state.root.className = mergeClasses(swatchPickerRowClassNames.root, styles, state.root.className);

  return state;
};
