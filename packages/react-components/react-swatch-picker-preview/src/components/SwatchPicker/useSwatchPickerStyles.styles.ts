import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchPickerSlots, SwatchPickerState } from './SwatchPicker.types';
import { tokens } from '@fluentui/react-theme';
export const swatchPickerClassNames: SlotClassNames<SwatchPickerSlots> = {
  root: 'fui-SwatchPicker',
};

export const swatchPickerCSSVars = {
  gridGap: `--fui-SwatchPicker--gridGap`,
};

const { gridGap } = swatchPickerCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.padding(tokens.spacingHorizontalNone, tokens.spacingVerticalNone),
    display: 'flex',
  },
  row: {
    flexDirection: 'row',
    columnGap: `var(${gridGap})`,
  },
  grid: {
    flexDirection: 'column',
    rowGap: `var(${gridGap})`,
  },
});

/**
 * Apply styling to the SwatchPicker slots based on the state
 */
export const useSwatchPickerStyles_unstable = (state: SwatchPickerState): SwatchPickerState => {
  const styles = useStyles();
  const layoutStyle = state.grid ? styles.grid : styles.row;
  state.root.className = mergeClasses(swatchPickerClassNames.root, styles.root, layoutStyle, state.root.className);

  return state;
};
