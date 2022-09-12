import { makeStyles, mergeClasses } from '@griffel/react';
import type { TableSlots, TableState } from './Table.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableClassName = 'fui-Table';
export const tableClassNames: SlotClassNames<TableSlots> = {
  root: 'fui-Table',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    verticalAlign: 'middle',
    borderCollapse: 'collapse',
    width: '100%',
    display: 'table',
    tableLayout: 'fixed',
  },
});

/**
 * Apply styling to the Table slots based on the state
 */
export const useTableStyles_unstable = (state: TableState): TableState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableClassName, styles.root, state.root.className);

  return state;
};
