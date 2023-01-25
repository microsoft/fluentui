import { createRef } from 'react';
import { TableFeaturesState, TableSortState, defaultColumnSizingState } from '../hooks';
import { defaultTableSelectionState, defaultTableSortState } from '../hooks';

export const mockTableState = <TItem = unknown>(options: Partial<TableFeaturesState<TItem>> = {}) => {
  const mockState: TableFeaturesState<TItem> = {
    columns: [],
    getRows: () => [],
    items: [],
    selection: defaultTableSelectionState,
    sort: defaultTableSortState as TableSortState<TItem>,
    columnSizing: defaultColumnSizingState,
    tableRef: createRef(),
    ...options,
  };

  return mockState;
};
