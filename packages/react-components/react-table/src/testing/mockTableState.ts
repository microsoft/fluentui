import type { TableFeaturesState, TableSortState } from '../hooks';
import { defaultTableSelectionState, defaultTableSortState } from '../hooks';

export const mockTableState = <TItem = unknown>(options: Partial<TableFeaturesState<TItem>> = {}) => {
  const mockState: TableFeaturesState<TItem> = {
    columns: [],
    getRows: () => [],
    items: [],
    selection: defaultTableSelectionState,
    sort: defaultTableSortState as TableSortState<TItem>,
    ...options,
  };

  return mockState;
};
