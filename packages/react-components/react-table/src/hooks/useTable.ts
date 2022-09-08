import type {
  UseTableOptions,
  TableState,
  RowState,
  TableSelectionStateInternal,
  TableSortStateInternal,
  RowEnhancer,
} from './types';

const noop: () => void = () => undefined;
const defaultRowEnhancer: RowEnhancer<unknown, RowState<unknown>> = row => row;
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
  sort: (rows: RowState<unknown>[]) => [...rows],
  sortColumn: undefined,
  sortDirection: 'ascending',
  toggleColumnSort: noop,
};

export function useTable<TItem>(options: UseTableOptions<TItem>): TableState<TItem> {
  const { items, getRowId, columns } = options;

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
  } = defaultSelectionState;

  const { sort, getSortDirection, setColumnSort, sortColumn, sortDirection, toggleColumnSort } = defaultSortState;

  const rows = <TRowState extends RowState<TItem>>(rowEnhancer = defaultRowEnhancer as RowEnhancer<TItem, TRowState>) =>
    items.map((item, i) => rowEnhancer({ item, rowId: getRowId?.(item) ?? i }));

  return {
    getRowId,
    items,
    columns,
    rows,
    selection: {
      isRowSelected,
      toggleRow,
      toggleAllRows,
      clearRows,
      selectedRows: Array.from(selectedRows),
      allRowsSelected,
      someRowsSelected,
      selectRow,
      deselectRow,
    },
    sort: {
      sort: sort as (rows: RowState<TItem>[]) => RowState<TItem>[],
      getSortDirection,
      setColumnSort,
      sortColumn,
      sortDirection,
      toggleColumnSort,
    },
  };
}
