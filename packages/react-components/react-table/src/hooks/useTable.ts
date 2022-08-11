import * as React from 'react';
import type { UseTableOptions, TableState, RowState, SelectionState, SortState } from './types';
import { useSelection } from './useSelection';
import { useSort } from './useSort';

export function useTable<TItem, TRowState extends RowState<TItem> = RowState<TItem>>(
  options: UseTableOptions<TItem, TRowState>,
): TableState<TItem, TRowState> {
  const {
    items: baseItems,
    columns,
    getRowId: getUserRowId = () => undefined,
    selectionMode = 'multiselect',
    rowEnhancer = (row: RowState<TItem>) => row as TRowState,
  } = options;

  const getRowId = React.useCallback((item: TItem, index: number) => getUserRowId(item) ?? index, [getUserRowId]);
  const { sortColumn, sortDirection, toggleColumnSort, setColumnSort, getSortDirection, sort } = useSort(columns);
  const sortState: SortState = React.useMemo(
    () => ({
      sortColumn,
      sortDirection,
      setColumnSort,
      toggleColumnSort,
      getSortDirection,
    }),
    [sortColumn, sortDirection, setColumnSort, toggleColumnSort, getSortDirection],
  );

  const {
    isRowSelected,
    toggleRowSelect,
    toggleSelectAllRows,
    selectedRows,
    allRowsSelected,
    someRowsSelected,
    clearSelection,
    selectRow,
    deSelectRow,
  } = useSelection(selectionMode, baseItems, getRowId);

  const selectionState: SelectionState = React.useMemo(
    () => ({
      isRowSelected,
      clearSelection,
      deSelectRow,
      selectRow,
      toggleSelectAllRows,
      toggleRowSelect,
      selectedRows: Array.from(selectedRows),
      allRowsSelected,
      someRowsSelected,
    }),
    [
      isRowSelected,
      clearSelection,
      deSelectRow,
      selectRow,
      toggleSelectAllRows,
      toggleRowSelect,
      selectedRows,
      allRowsSelected,
      someRowsSelected,
    ],
  );

  const rows = React.useMemo(
    () =>
      sort(baseItems).map((item, i) => {
        return rowEnhancer(
          {
            item,
            rowId: getRowId(item, i),
          },
          { selection: selectionState, sort: sortState },
        );
      }),
    [baseItems, getRowId, sort, rowEnhancer, selectionState, sortState],
  );

  return {
    rows,
    selection: selectionState,
    sort: sortState,
  };
}
