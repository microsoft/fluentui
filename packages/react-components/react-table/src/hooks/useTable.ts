import type { UseTableOptions, TableState, RowState, RowEnhancer, TableStatePlugin, TableSortState } from './types';
import { defaultTableSelectionState } from './useSelection';
import { defaultTableSortState } from './useSort';

const defaultRowEnhancer: RowEnhancer<unknown, RowState<unknown>> = row => row;

export const defaultTableState: TableState<unknown> = {
  selection: defaultTableSelectionState,
  sort: defaultTableSortState,
  getRows: () => [],
  getRowId: () => '',
  items: [],
  columns: [],
};

export function useTable<TItem>(options: UseTableOptions<TItem>, plugins: TableStatePlugin[] = []): TableState<TItem> {
  const { items, getRowId, columns } = options;

  const getRows = <TRowState extends RowState<TItem>>(
    rowEnhancer = defaultRowEnhancer as RowEnhancer<TItem, TRowState>,
  ) => items.map((item, i) => rowEnhancer({ item, rowId: getRowId?.(item) ?? i }));

  const initialState: TableState<TItem> = {
    getRowId,
    items,
    columns,
    getRows,
    selection: defaultTableSelectionState,
    sort: defaultTableSortState as TableSortState<TItem>,
  };

  return plugins.reduce((state, plugin) => plugin(state), initialState);
}
