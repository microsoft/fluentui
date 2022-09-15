import { mergeClasses, makeStyles } from '@griffel/react';
import type { TableBodySlots, TableBodyState } from './TableBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    display: 'table-row-group',
  },
});

export const tableBodyClassName = 'fui-TableBody';
export const tableBodyClassNames: SlotClassNames<TableBodySlots> = {
  root: 'fui-TableBody',
};

/**
 * Apply styling to the TableBody slots based on the state
 */
export const useTableBodyStyles_unstable = (state: TableBodyState): TableBodyState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableBodyClassName, styles.root, state.root.className);

  return state;
};
