import type { TableState, TableSortState } from '../hooks';
import { defaultTableSelectionState, defaultTableSortState } from '../hooks';

export const mockTableState = <TItem = unknown>(options: Partial<TableState<TItem>> = {}) => {
  const mockState: TableState<TItem> = {
    columns: [],
    getRows: () => [],
    items: [],
    selection: defaultTableSelectionState,
    sort: defaultTableSortState as TableSortState<TItem>,
    ...options,
  };

  return mockState;
};
