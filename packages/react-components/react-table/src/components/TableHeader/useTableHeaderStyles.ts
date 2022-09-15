import { mergeClasses, makeStyles } from '@griffel/react';
import type { TableHeaderSlots, TableHeaderState } from './TableHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableHeaderClassName = 'fui-TableHeader';
export const tableHeaderClassNames: SlotClassNames<TableHeaderSlots> = {
  root: 'fui-TableHeader',
};

const useStyles = makeStyles({
  root: {
    display: 'table-row-group',
  },
});

/**
 * Apply styling to the TableHeader slots based on the state
 */
export const useTableHeaderStyles_unstable = (state: TableHeaderState): TableHeaderState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableHeaderClassName, styles.root, state.root.className);

  return state;
};
