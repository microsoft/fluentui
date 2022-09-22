import * as React from 'react';
import type {
  UseTableOptions,
  TableState,
  RowState,
  TableSelectionStateInternal,
  TableSortStateInternal,
  RowEnhancer,
  TablePaginationState,
  TableColumnSizingState,
  TableStatePlugin,
} from './types';
import { defaultPaginationState } from './usePagination';

const noop: () => void = () => undefined;
const defaultRowEnhancer: RowEnhancer<unknown, RowState<unknown>> = row => row;
export const defaultSelectionState: TableSelectionStateInternal = {
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

export const defaultSortState: TableSortStateInternal<unknown> = {
  getSortDirection: () => 'ascending',
  setColumnSort: noop,
  sort: (rows: RowState<unknown>[]) => [...rows],
  sortColumn: undefined,
  sortDirection: 'ascending',
  toggleColumnSort: noop,
};

export const defaultColumnSizingState: TableColumnSizingState = {
  getColumnWidth: () => 0,
  getColumnWidths: () => [],
  getOnMouseDown: () => () => null,
  getTotalWidth: () => 0,
  setColumnWidth: () => null,
};

export function useTable<TItem>(options: UseTableOptions<TItem>, plugins: TableStatePlugin[]): TableState<TItem> {
  const { items, getRowId, columns } = options;
  const tableRef = React.useRef<HTMLDivElement>(null);

  const getRows = <TRowState extends RowState<TItem>>(
    rowEnhancer = defaultRowEnhancer as RowEnhancer<TItem, TRowState>,
  ) => items.map((item, i) => rowEnhancer({ item, rowId: getRowId?.(item) ?? i }));

  const initialState = {
    getRowId,
    items,
    columns,
    getRows,
    pagination: defaultPaginationState as TablePaginationState<TItem>,
    selection: defaultSelectionState,
    sort: defaultSortState,
    columnSizing: defaultColumnSizingState,
    tableRef,
  };

  return plugins.reduce((state, plugin) => plugin(state), initialState);
}
