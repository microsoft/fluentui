import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableCellSlots, TableCellState } from './TableCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableCellClassName = 'fui-TableCell';
export const tableCellClassNames: SlotClassNames<TableCellSlots> = {
  root: tableCellClassName,
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'relative',
    verticalAlign: 'middle',
    display: 'table-cell',
    ...shorthands.padding('0px', tokens.spacingHorizontalS),
  },
});

/**
 * Apply styling to the TableCell slots based on the state
 */
export const useTableCellStyles_unstable = (state: TableCellState): TableCellState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableCellClassNames.root, styles.root, state.root.className);
  return state;
};
