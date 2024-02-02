import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchPickerSlots, SwatchPickerState } from './SwatchPicker.types';
import { tokens } from '@fluentui/react-components';
export const swatchPickerClassNames: SlotClassNames<SwatchPickerSlots> = {
  root: 'fui-SwatchPicker',
};

export const swatchPickerCSSVars = {
  columnCountGrid: `--fui-SwatchPicker--columnCount`,
  cellSize: `--fui-SwatchPicker--cellSize`,
  gridGap: `--fui-SwatchPicker--gridGap`,
};

const { columnCountGrid, cellSize } = swatchPickerCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    ...shorthands.padding(tokens.spacingVerticalMNudge),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(var(${columnCountGrid}), var(${cellSize}))`,
    gridGap: 'var(--fui-SwatchPicker--gridGap)',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 'var(--fui-SwatchPicker--gridGap)',
  },
});

/**
 * Apply styling to the SwatchPicker slots based on the state
 */
export const useSwatchPickerStyles_unstable = (state: SwatchPickerState): SwatchPickerState => {
  const styles = useStyles();
  const layout = state.layout ?? 'row';
  state.root.className = mergeClasses(swatchPickerClassNames.root, styles.root, styles[layout], state.root.className);

  return state;
};
