import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RadioPickerSlots, RadioPickerState } from './RadioPicker.types';

export const radioPickerClassNames: SlotClassNames<RadioPickerSlots> = {
  root: 'fui-RadioPicker',
};

export const radioPickerCSSVars = {
  columnCountGrid: `--fui-SwatchPicker--columnCount`,
  cellSize: `--fui-SwatchPicker--cellSize`,
  gridGap: `--fui-SwatchPicker--gridGap`,
};

const { columnCountGrid, cellSize } = radioPickerCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
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
 * Apply styling to the RadioPicker slots based on the state
 */
export const useRadioPickerStyles_unstable = (state: RadioPickerState): RadioPickerState => {
  const styles = useStyles();
  const layout = state.layout ?? 'grid';
  state.root.className = mergeClasses(radioPickerClassNames.root, styles.root, styles[layout], state.root.className);

  return state;
};
