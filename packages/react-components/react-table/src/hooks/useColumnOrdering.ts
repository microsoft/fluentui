import * as React from 'react';
import { ColumnId, TableColumnSizingState, TableState } from './types';

// why are there 2 layout components for cells ? -> try to consolidate to one
// column collapse priority -> verify DetailsList
// window resizing
// click + drag resize
// change requirements without users changing code

export const defaultColumnSizingState: TableColumnSizingState = {
  getColumnWidth: () => 0,
  getColumnWidths: () => [],
  getOnMouseDown: () => () => null,
  getTotalWidth: () => 0,
  setColumnWidth: () => null,
};

export function useColumnOrdering<TItem>() {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableState<TItem>) => useColumnOrderingState(tableState);
}

function useColumnOrderingState<TItem>(tableState: TableState<TItem>): TableState<TItem> {
  const { columns: baseColumns } = tableState;
  const [columns, setColumns] = React.useState(baseColumns);

  const moveColumn = (next: number, columnId: ColumnId) => {
    setColumns(oldColumns => {
      const cur = oldColumns.findIndex(col => col.columnId === columnId);
      const newColumns = oldColumns.slice();
      const toReplace = newColumns.splice(cur, 1);
      newColumns.splice(next, 0, toReplace[0]);
      return newColumns;
    });
  };

  return {
    ...tableState,
    columns,
    columnOrdering: {
      moveColumn,
    },
  };
}
