import * as React from 'react';
import type {
  UseTableFeaturesOptions,
  TableFeaturesState,
  TableRowData,
  RowEnhancer,
  TableFeaturePlugin,
  TableSortState,
} from './types';
import { defaultTableSelectionState } from './useTableSelection';
import { defaultTableSortState } from './useTableSort';
import { defaultColumnSizingState } from './useTableColumnSizing';

const defaultRowEnhancer: RowEnhancer<unknown, TableRowData<unknown>> = row => row;

export const defaultTableState: TableFeaturesState<unknown, unknown> = {
  selection: defaultTableSelectionState,
  sort: defaultTableSortState,
  getRows: () => [],
  getRowId: () => '',
  items: [],
  columns: [],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  columnSizing_unstable: defaultColumnSizingState,
  tableRef: React.createRef<HTMLDivElement>(),
};

export function useTableFeatures<TItem, UItem>(
  options: UseTableFeaturesOptions<TItem, UItem>,
  plugins: TableFeaturePlugin[] = [],
): TableFeaturesState<TItem, UItem> {
  const { items, getRowId, columns } = options;

  const getRows = <TRowState extends TableRowData<TItem>>(
    rowEnhancer = defaultRowEnhancer as RowEnhancer<TItem, TRowState>,
  ) => items.map((item, i) => rowEnhancer({ item, rowId: getRowId?.(item) ?? i }));

  const initialState: TableFeaturesState<TItem, UItem> = {
    getRowId,
    items,
    columns,
    getRows,
    selection: defaultTableSelectionState,
    sort: defaultTableSortState as TableSortState<TItem>,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    columnSizing_unstable: defaultColumnSizingState,
    tableRef: React.createRef(),
  };

  return plugins.reduce((state, plugin) => plugin(state), initialState);
}
