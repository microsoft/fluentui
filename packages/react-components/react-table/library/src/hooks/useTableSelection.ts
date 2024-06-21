import * as React from 'react';
import { SelectionHookParams, useEventCallback, useSelection } from '@fluentui/react-utilities';
import type { TableRowId, TableSelectionState, TableFeaturesState } from './types';

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

export function useTableSelection<TItem>(options: SelectionHookParams) {
  'use no memo';

  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableFeaturesState<TItem>) => useTableSelectionState(tableState, options);
}

export function useTableSelectionState<TItem>(
  tableState: TableFeaturesState<TItem>,
  options: SelectionHookParams,
): TableFeaturesState<TItem> {
  const { items, getRowId } = tableState;
  const { selectionMode: selectionMode, defaultSelectedItems, selectedItems, onSelectionChange } = options;

  const [selected, selectionMethods] = useSelection({
    selectionMode,
    defaultSelectedItems,
    selectedItems,
    onSelectionChange,
  });

  // Selection state can contain obselete items (i.e. rows that are removed)
  const selectableRowIds = React.useMemo(() => {
    const rowIds = new Set<TableRowId>();
    for (let i = 0; i < items.length; i++) {
      rowIds.add(getRowId?.(items[i]) ?? i);
    }

    return rowIds;
  }, [items, getRowId]);

  const allRowsSelected = React.useMemo(() => {
    if (selectionMode === 'single') {
      const selectedRow = Array.from(selected)[0];
      return selectableRowIds.has(selectedRow);
    }

    // multiselect case
    if (selected.size < selectableRowIds.size) {
      return false;
    }

    if (selectableRowIds.size === 0) {
      return false;
    }

    let res = true;
    selectableRowIds.forEach(selectableRowId => {
      if (!selected.has(selectableRowId)) {
        res = false;
      }
    });

    return res;
  }, [selectableRowIds, selected, selectionMode]);

  const someRowsSelected = React.useMemo(() => {
    if (selected.size <= 0) {
      return false;
    }

    let res = false;
    selectableRowIds.forEach(selectableRowId => {
      if (selected.has(selectableRowId)) {
        res = true;
      }
    });

    return res;
  }, [selectableRowIds, selected]);

  const toggleAllRows: TableSelectionState['toggleAllRows'] = useEventCallback(e => {
    selectionMethods.toggleAllItems(
      e,
      items.map((item, i) => getRowId?.(item) ?? i),
    );
  });

  const toggleRow: TableSelectionState['toggleRow'] = useEventCallback((e, rowId: TableRowId) =>
    selectionMethods.toggleItem(e, rowId),
  );

  const deselectRow: TableSelectionState['deselectRow'] = useEventCallback((e, rowId: TableRowId) =>
    selectionMethods.deselectItem(e, rowId),
  );

  const selectRow: TableSelectionState['selectRow'] = useEventCallback((e, rowId: TableRowId) =>
    selectionMethods.selectItem(e, rowId),
  );

  const isRowSelected: TableSelectionState['isRowSelected'] = (rowId: TableRowId) => selectionMethods.isSelected(rowId);

  const clearRows: TableSelectionState['clearRows'] = useEventCallback(e => selectionMethods.clearItems(e));

  return {
    ...tableState,
    selection: {
      selectionMode,
      someRowsSelected,
      allRowsSelected,
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
