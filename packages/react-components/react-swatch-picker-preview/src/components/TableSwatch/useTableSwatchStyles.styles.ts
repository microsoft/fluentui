import { makeStyles, makeResetStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableSwatchSlots, TableSwatchState } from './TableSwatch.types';

export const tableSwatchClassNames: SlotClassNames<TableSwatchSlots> = {
  root: 'fui-TableSwatch',
  button: 'fui-TableSwatch__button',
};

export const tdCSSVars = {
  cellColor: `--fui-SwatchPicker--color`,
};

const { cellColor } = tdCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  boxSizing: 'border-box',
  ...shorthands.border('none'),
  width: '28px',
  height: '28px',
  background: `var(${cellColor})`,
  ...shorthands.transition('all', '0.1s', 'ease-in-out'),
  '&:hover': {
    cursor: 'pointer',
    boxShadow: `inset 0 0 0 2px var(${cellColor}), inset 0 0 0 4px #fff`,
  },
});

const usebuttonStyles = makeResetStyles({});

const useStylesSelected = makeStyles({
  selected: {
    boxShadow: `inset 0 0 0 4px var(${cellColor}), inset 0 0 0 6px #fff`,
  },
});

/**
 * Apply styling to the TableSwatch slots based on the state
 */
export const useTableSwatchStyles_unstable = (state: TableSwatchState): TableSwatchState => {
  const styles = useStyles();
  const selectedStyles = useStylesSelected();
  const buttonStyles = usebuttonStyles();

  state.root.className = mergeClasses(tableSwatchClassNames.root, styles, state.root.className);

  if (state.button) {
    state.button.className = mergeClasses(tableSwatchClassNames.button, buttonStyles, state.button.className);
  }

  if (state.selected) {
    state.root.className = mergeClasses(state.root.className, selectedStyles.selected);
  }
  return state;

  return state;
};
