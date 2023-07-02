import * as React from 'react';
import { TableFeaturesState, TableSortState, defaultColumnReorderingState, defaultColumnSizingState } from '../hooks';
import { defaultTableSelectionState, defaultTableSortState } from '../hooks';

export const mockTableState = <TItem = unknown>(options: Partial<TableFeaturesState<TItem>> = {}) => {
  const mockState: TableFeaturesState<TItem> = {
    columns: [],
    getRows: () => [],
    items: [],
    selection: defaultTableSelectionState,
    sort: defaultTableSortState as TableSortState<TItem>,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    columnSizing_unstable: defaultColumnSizingState,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    columnReordering_unstable: defaultColumnReorderingState,
    tableRef: React.createRef(),
    ...options,
  };

  return mockState;
};
