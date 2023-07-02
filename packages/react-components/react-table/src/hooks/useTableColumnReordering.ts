import { TableColumnId, TableColumnReorderingState, TableFeaturesState, UseTableColumnReorderingParams } from './types';
import { useTableColumnReorderingDNDState } from './useTableColumnReorderingDNDState';

export const defaultColumnReorderingState: TableColumnReorderingState = {
  getTableHeaderCellProps: () => ({}),
};

export function useTableColumnReordering_unstable<TItem>(params: UseTableColumnReorderingParams<TItem>) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableFeaturesState<TItem>) => useTableColumnReorderingState(tableState, params);
}

function useTableColumnReorderingState<TItem>(
  tableState: TableFeaturesState<TItem>,
  params: UseTableColumnReorderingParams<TItem>,
): TableFeaturesState<TItem> {
  const state = useTableColumnReorderingDNDState(tableState.columns, params.onColumnOrderChange, params.preview);

  return {
    ...tableState,
    columns: state.columns,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    columnReordering_unstable: {
      getTableHeaderCellProps: (columnId: TableColumnId) => ({
        draggable: true,
        onDragStart: state.onDragStart(columnId),
        onDrop: state.onDrop(columnId),
        onDragEnter: state.onDragEnter(columnId),
        onDragOver: state.onDragOver(columnId),
      }),
    },
  };
}
