import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RadioPickerSlots, RadioPickerState } from './RadioPicker.types';

export const radioPickerClassNames: SlotClassNames<RadioPickerSlots> = {
  root: 'fui-RadioPicker',
};

export const radioPickerCSSVars = {
  columnCountGrid: `--fui-SwatchPicker--columnCount`,
};

const { columnCountGrid } = radioPickerCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(var(${columnCountGrid}), 28px)`,
  },
  row: {
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
