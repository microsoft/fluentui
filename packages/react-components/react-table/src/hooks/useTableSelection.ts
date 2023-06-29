import { useEventCallback, useSelection } from '@fluentui/react-utilities';
import type { TableRowId, TableSelectionState, TableFeaturesState, TableSelectionHookParams } from './types';

const noop = () => undefined;

export const defaultTableSelectionState: TableSelectionState = {
  allRowsSelected: false,
  clearRows: noop,
  deselectRow: noop,
  isRowSelected: () => false,
  selectRow: noop,
  selectedRows: new Set(),
  someRowsSelected: false,
  toggleAllRows: noop,
  toggleRow: noop,
  selectionMode: 'multiselect',
};

export function useTableSelection<TItem>(options: TableSelectionHookParams) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableFeaturesState<TItem>) => useTableSelectionState(tableState, options);
}

export function useTableSelectionState<TItem>(
  tableState: TableFeaturesState<TItem>,
  options: TableSelectionHookParams,
): TableFeaturesState<TItem> {
  const { items, getRowId } = tableState;
  const { selectionMode: selectionMode, defaultSelectedItems, selectedItems } = options;

  const [selected, selectionMethods] = useSelection({
    selectionMode,
    defaultSelectedItems,
    selectedItems,
  });

  const toggleAllRows: TableSelectionState['toggleAllRows'] = useEventCallback(e => {
    const nextSelectedItems = selectionMethods.toggleAllItems(items.map((item, i) => getRowId?.(item) ?? i));
    options.onSelectionChange?.(e, { selectedItems: nextSelectedItems });
  });

  const toggleRow: TableSelectionState['toggleRow'] = useEventCallback((e, rowId: TableRowId) => {
    const nextSelectedItems = selectionMethods.toggleItem(rowId);
    options.onSelectionChange?.(e, { selectedItems: nextSelectedItems });
  });

  const deselectRow: TableSelectionState['deselectRow'] = useEventCallback((e, rowId: TableRowId) => {
    const nextSelectedItems = selectionMethods.deselectItem(rowId);
    options.onSelectionChange?.(e, { selectedItems: nextSelectedItems });
  });

  const selectRow: TableSelectionState['selectRow'] = useEventCallback((e, rowId: TableRowId) => {
    const nextSelectedItems = selectionMethods.selectItem(rowId);
    options.onSelectionChange?.(e, { selectedItems: nextSelectedItems });
  });

  const isRowSelected: TableSelectionState['isRowSelected'] = (rowId: TableRowId) => selectionMethods.isSelected(rowId);

  const clearRows: TableSelectionState['clearRows'] = useEventCallback(e => {
    const nextSelectedItems = selectionMethods.clearItems();
    options.onSelectionChange?.(e, { selectedItems: nextSelectedItems });
  });

  return {
    ...tableState,
    selection: {
      selectionMode,
      someRowsSelected: selected.size > 0,
      allRowsSelected: selectionMode === 'single' ? selected.size > 0 : selected.size === items.length,
      selectedRows: selected,
      toggleRow,
      toggleAllRows,
      clearRows,
      deselectRow,
      selectRow,
      isRowSelected,
    },
  };
}
