import * as React from 'react';
import { ColumnResize } from './ColumnResize';
import { ColumnId, TableState } from './types';

// why are there 2 layout components for cells ? -> try to consolidate to one
// column collapse priority -> verify DetailsList
// window resizing
// click + drag resize
// change requirements without users changing code

export function useColumnSizing<TItem>(tableState: TableState<TItem>): TableState<TItem> {
  const { columns, tableRef } = tableState;

  const forceUpdate = React.useReducer(() => ({}), {})[1];
  const manager = React.useState(
    () =>
      new ColumnResize(
        columns.map(({ columnId }) => ({ columnId })),
        forceUpdate,
      ),
  )[0];

  React.useEffect(() => {
    if (tableRef.current) {
      manager.init(tableRef.current);
    }
  }, [manager, tableRef]);

  return {
    ...tableState,
    columnSizing: {
      getOnMouseDown: (columnId: ColumnId) => manager.getOnMouseDown(columnId),
      getColumnWidth: (columnId: ColumnId) => manager.getColumnWidth(columnId),
      getTotalWidth: () => manager.totalWidth,
      setColumnWidth: (columnId: ColumnId, newSize: number) => manager.setColumnWidth(columnId, newSize),
      getColumnWidths: () => manager.columns,
    },
  };
}
