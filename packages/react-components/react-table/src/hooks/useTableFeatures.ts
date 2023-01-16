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

const defaultRowEnhancer: RowEnhancer<unknown, TableRowData<unknown>> = row => row;

export const defaultTableState: TableFeaturesState<unknown> = {
  selection: defaultTableSelectionState,
  sort: defaultTableSortState,
  getRows: () => [],
  getRowId: () => '',
  items: [],
  columns: [],
};

export function useTableFeatures<TItem>(
  options: UseTableFeaturesOptions<TItem>,
  plugins: TableFeaturePlugin[] = [],
): TableFeaturesState<TItem> {
  const { items, getRowId, columns } = options;

  const getRows = <TRowState extends TableRowData<TItem>>(
    rowEnhancer = defaultRowEnhancer as RowEnhancer<TItem, TRowState>,
  ) => items.map((item, i) => rowEnhancer({ item, rowId: getRowId?.(item) ?? i }));

  const initialState: TableFeaturesState<TItem> = {
    getRowId,
    items,
    columns,
    getRows,
    selection: defaultTableSelectionState,
    sort: defaultTableSortState as TableSortState<TItem>,
  };

  return plugins.reduce((state, plugin) => plugin(state), initialState);
}
