import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TableSelectionCellSlots, TableSelectionCellState } from './TableSelectionCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableSelectionCellClassNames: SlotClassNames<TableSelectionCellSlots> = {
  root: 'fui-TableSelectionCell',
  checkboxIndicator: 'fui-TableSelectionCell__checkboxIndicator',
  radioIndicator: 'fui-TableSelectionCell__radioIndicator',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    width: '44px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    ...shorthands.padding(0),
    display: 'table-cell',
  },

  radioIndicator: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      width: '16px',
      height: '16px',
    },
  },

  hidden: {
    visibility: 'hidden',
  },
});

/**
 * Apply styling to the TableSelectionCell slots based on the state
 */
export const useTableSelectionCellStyles_unstable = (state: TableSelectionCellState): TableSelectionCellState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableSelectionCellClassNames.root, styles.root, state.root.className);
  if (state.checkboxIndicator) {
    state.checkboxIndicator.className = mergeClasses(
      tableSelectionCellClassNames.checkboxIndicator,
      state.checkboxIndicator.className,
    );
  }

  if (state.radioIndicator) {
    state.radioIndicator.className = mergeClasses(
      tableSelectionCellClassNames.radioIndicator,
      styles.radioIndicator,
      state.checked === false && styles.hidden,
      state.radioIndicator.className,
    );
  }

  return state;
};
