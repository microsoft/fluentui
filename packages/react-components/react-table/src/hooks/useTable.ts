import * as React from 'react';
import type {
  UseTableOptions,
  TableState,
  RowState,
  TableSelectionState,
  TableSortState,
  GetRowIdInternal,
  TableSelectionStateInternal,
  TableSortStateInternal,
} from './types';

const noop: () => void = () => undefined;
const defaultSelectionState: TableSelectionStateInternal = {
  allRowsSelected: false,
  clearRows: noop,
  deselectRow: noop,
  isRowSelected: () => false,
  selectRow: noop,
  selectedRows: new Set(),
  someRowsSelected: false,
  toggleAllRows: noop,
  toggleRow: noop,
};

const defaultSortState: TableSortStateInternal<unknown> = {
  getSortDirection: () => 'ascending',
  setColumnSort: noop,
  sort: (items: unknown[]) => items,
  sortColumn: undefined,
  sortDirection: 'ascending',
  toggleColumnSort: noop,
};

export function useTable<TItem, TRowState extends RowState<TItem> = RowState<TItem>>(
  options: UseTableOptions<TItem, TRowState>,
): TableState<TItem, TRowState> {
  const {
    selection = defaultSelectionState,
    sort: baseSort = defaultSortState as TableSortStateInternal<TItem>,
    items: baseItems,
    getRowId: getUserRowId = () => undefined,
    rowEnhancer = (row: RowState<TItem>) => row as TRowState,
  } = options;

  const getRowId: GetRowIdInternal<TItem> = React.useCallback(
    (item: TItem, index: number) => getUserRowId(item) ?? index,
    [getUserRowId],
  );

  const { sortColumn, sortDirection, toggleColumnSort, setColumnSort, getSortDirection, sort } = baseSort;
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
  } = selection;

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
