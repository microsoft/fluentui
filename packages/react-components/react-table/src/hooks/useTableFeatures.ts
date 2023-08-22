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
  getSortableColumns: () => [],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  columnSizing_unstable: defaultColumnSizingState,
  tableRef: React.createRef<HTMLDivElement>(),
};

export function useTableFeatures<TItem>(
  options: UseTableFeaturesOptions<TItem>,
  plugins: TableFeaturePlugin[] = [],
): TableFeaturesState<TItem> {
  const { items, getRowId, columns } = options;

  const getSortableColumns = () => columns.filter(c => c.compare.length !== 0);

  const getRows = <TRowState extends TableRowData<TItem>>(
    rowEnhancer = defaultRowEnhancer as RowEnhancer<TItem, TRowState>,
  ) => items.map((item, i) => rowEnhancer({ item, rowId: getRowId?.(item) ?? i }));

  const initialState: TableFeaturesState<TItem> = {
    getRowId,
    items,
    columns,
    getRows,
    getSortableColumns,
    selection: defaultTableSelectionState,
    sort: defaultTableSortState as TableSortState<TItem>,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    columnSizing_unstable: defaultColumnSizingState,
    tableRef: React.createRef(),
  };

  return plugins.reduce((state, plugin) => plugin(state), initialState);
}
