import { makeResetStyles, mergeClasses, makeStyles } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchPickerRowSlots, SwatchPickerRowState } from './SwatchPickerRow.types';

export const swatchPickerRowClassNames: SlotClassNames<SwatchPickerRowSlots> = {
  root: 'fui-SwatchPickerRow',
};

/**
 * Styles for the root slot
 */
const useResetStyles = makeResetStyles({
  display: 'flex',
  flexDirection: 'row',
});

const useStyles = makeStyles({
  spacingSmall: {
    columnGap: '2px',
  },
  spacingMedium: {
    columnGap: '4px',
  },
});

/**
 * Apply styling to the SwatchPickerRow slots based on the state
 */
export const useSwatchPickerRowStyles_unstable = (state: SwatchPickerRowState): SwatchPickerRowState => {
  'use no memo';

  const resetStyles = useResetStyles();
  const styles = useStyles();
  const spacingStyle = state.spacing === 'small' ? styles.spacingSmall : styles.spacingMedium;

  state.root.className = mergeClasses(swatchPickerRowClassNames.root, resetStyles, spacingStyle, state.root.className);

  return state;
};
