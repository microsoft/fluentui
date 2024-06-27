import { mergeClasses, makeStyles } from '@griffel/react';
import type { TableHeaderSlots, TableHeaderState } from './TableHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableHeaderClassName = 'fui-TableHeader';
export const tableHeaderClassNames: SlotClassNames<TableHeaderSlots> = {
  root: 'fui-TableHeader',
};

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'block',
  },
});

const useTableLayoutStyles = makeStyles({
  root: {
    display: 'table-row-group',
  },
});

/**
 * Apply styling to the TableHeader slots based on the state
 */
export const useTableHeaderStyles_unstable = (state: TableHeaderState): TableHeaderState => {
  'use no memo';

  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    tableHeaderClassName,
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    state.root.className,
  );

  return state;
};
