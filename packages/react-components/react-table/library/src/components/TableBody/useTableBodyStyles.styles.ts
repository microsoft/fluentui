import { mergeClasses, makeStyles } from '@griffel/react';
import type { TableBodySlots, TableBodyState } from './TableBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

const useTableLayoutStyles = makeStyles({
  root: {
    display: 'table-row-group',
  },
});

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'block',
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
  'use no memo';

  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    tableBodyClassName,
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    state.root.className,
  );

  return state;
};
