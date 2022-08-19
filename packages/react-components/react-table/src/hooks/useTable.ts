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
    toggleRow,
    toggleAllRows,
    clearRows,
    selectedRows,
    allRowsSelected,
    someRowsSelected,
    selectRow,
    deselectRow,
  } = useSelection(selectionMode, baseItems, getRowId);

  const selectionState: SelectionState = React.useMemo(
    () => ({
      isRowSelected,
      clearRows,
      deselectRow,
      selectRow,
      toggleAllRows,
      toggleRow,
      selectedRows: Array.from(selectedRows),
      allRowsSelected,
      someRowsSelected,
    }),
    [
      isRowSelected,
      clearRows,
      deselectRow,
      selectRow,
      toggleAllRows,
      toggleRow,
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
