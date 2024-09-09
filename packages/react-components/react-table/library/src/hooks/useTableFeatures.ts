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

export const defaultTableState: TableFeaturesState<unknown> = {
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

export function useTableFeatures<TItem>(
  options: UseTableFeaturesOptions<TItem>,
  plugins: TableFeaturePlugin[] = [],
): TableFeaturesState<TItem> {
  const { items, getRowId, columns } = options;

  const getRows = React.useCallback(
    <TRowState extends TableRowData<TItem>>(rowEnhancer = defaultRowEnhancer as RowEnhancer<TItem, TRowState>) => {
      return items.map((item, i) => rowEnhancer({ item, rowId: getRowId?.(item) ?? i }));
    },
    [items, getRowId],
  );

  const initialState: TableFeaturesState<TItem> = {
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
