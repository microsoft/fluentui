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
    width: '100%',
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
