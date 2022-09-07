import * as React from 'react';
import type {
  UseTableOptions,
  TableState,
  RowState,
  TableSelectionState,
  TableSortState,
  GetRowIdInternal,
} from './types';
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
    defaultSelectedRows,
    selectedRows: userSelectedRows,
    onSelectionChange,
    sortState: userSortState,
    defaultSortState,
    onSortChange,
  } = options;

  const getRowId: GetRowIdInternal<TItem> = React.useCallback(
    (item: TItem, index: number) => getUserRowId(item) ?? index,
    [getUserRowId],
  );
  const { sortColumn, sortDirection, toggleColumnSort, setColumnSort, getSortDirection, sort } = useSort({
    columns,
    sortState: userSortState,
    defaultSortState,
    onSortChange,
  });
  const sortState: TableSortState = React.useMemo(
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
  } = useSelection({
    selectionMode,
    items: baseItems,
    getRowId,
    defaultSelectedItems: defaultSelectedRows,
    selectedItems: userSelectedRows,
    onSelectionChange,
  });

  const selectionState: TableSelectionState = React.useMemo(
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
