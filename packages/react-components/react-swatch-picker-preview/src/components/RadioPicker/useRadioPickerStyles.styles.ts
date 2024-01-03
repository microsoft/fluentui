import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RadioPickerSlots, RadioPickerState } from './RadioPicker.types';

export const radioPickerClassNames: SlotClassNames<RadioPickerSlots> = {
  root: 'fui-RadioPicker',
};

export const radioPickerCSSVars = {
  columnCountGrid: `--fui-SwatchPicker--columnCount`,
  cellSize: `--fui-SwatchPicker--cellSize`,
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
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
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
