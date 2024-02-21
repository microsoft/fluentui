import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchPickerSlots, SwatchPickerState } from './SwatchPicker.types';
import { tokens } from '@fluentui/react-theme';
export const swatchPickerClassNames: SlotClassNames<SwatchPickerSlots> = {
  root: 'fui-SwatchPicker',
};

export const swatchPickerCSSVars = {
  columnCountGrid: `--fui-SwatchPicker--columnCount`,
  cellSize: `--fui-SwatchPicker--cellSize`,
  gridGap: `--fui-SwatchPicker--gridGap`,
};

const { columnCountGrid, cellSize, gridGap } = swatchPickerCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.padding(tokens.spacingHorizontalNone, tokens.spacingVerticalNone),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(var(${columnCountGrid}), var(${cellSize}))`,
    gridGap: `var(${gridGap})`,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: `var(${gridGap})`,
  },
  responsive: {
    flexWrap: 'wrap',
    rowGap: `var(${gridGap})`,
  },
});

/**
 * Apply styling to the SwatchPicker slots based on the state
 */
export const useSwatchPickerStyles_unstable = (state: SwatchPickerState): SwatchPickerState => {
  const styles = useStyles();
  const layout = state.layout ?? 'row';
  const responsive = state.responsive ? styles.responsive : '';
  state.root.className = mergeClasses(
    swatchPickerClassNames.root,
    styles.root,
    styles[layout],
    responsive,
    state.root.className,
  );

  return state;
};
