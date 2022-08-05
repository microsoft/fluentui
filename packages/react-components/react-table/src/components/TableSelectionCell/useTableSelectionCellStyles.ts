import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
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
    ...shorthands.padding('0px', tokens.spacingHorizontalS),
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    ...shorthands.flex(0, 1, '0px'),
  },

  radioIndicator: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.padding('0px', tokens.spacingHorizontalS),
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
