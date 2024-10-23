import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchPickerSlots, SwatchPickerState } from './SwatchPicker.types';
import { tokens } from '@fluentui/react-theme';
export const swatchPickerClassNames: SlotClassNames<SwatchPickerSlots> = {
  root: 'fui-SwatchPicker',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    padding: `${tokens.spacingHorizontalNone} ${tokens.spacingVerticalNone}`,
    display: 'flex',
  },
  row: {
    flexDirection: 'row',
  },
  grid: {
    flexDirection: 'column',
  },
  spacingSmall: { gap: '2px' },
  spacingMedium: { gap: '4px' },
});

/**
 * Apply styling to the SwatchPicker slots based on the state
 */
export const useSwatchPickerStyles_unstable = (state: SwatchPickerState): SwatchPickerState => {
  'use no memo';

  const styles = useStyles();
  const layoutStyle = state.isGrid ? styles.grid : styles.row;

  const spacingStyle = state.spacing === 'small' ? styles.spacingSmall : styles.spacingMedium;
  state.root.className = mergeClasses(
    swatchPickerClassNames.root,
    styles.root,
    layoutStyle,
    spacingStyle,
    state.root.className,
  );

  return state;
};
