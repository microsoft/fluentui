import * as React from 'react';
import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { createSelectionManager } from './selectionManager';
import type { TableRowId, TableSelectionState, TableFeaturesState, UseTableSelectionOptions } from './types';

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

export function useTableSelection<TItem>(options: UseTableSelectionOptions) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableFeaturesState<TItem>) => useTableSelectionState(tableState, options);
}

export function useTableSelectionState<TItem>(
  tableState: TableFeaturesState<TItem>,
  options: UseTableSelectionOptions,
): TableFeaturesState<TItem> {
  const { items, getRowId } = tableState;
  const { selectionMode, defaultSelectedItems, selectedItems, onSelectionChange } = options;

  const [selected, setSelected] = useControllableState({
    initialState: new Set<TableRowId>(),
    defaultState: defaultSelectedItems,
    state: selectedItems,
  });

  const selectionManager = React.useMemo(() => {
    return createSelectionManager(selectionMode, (e, newSelectedItems) => {
      setSelected(() => {
        onSelectionChange?.(e as React.SyntheticEvent, { selectedItems: newSelectedItems });
        return newSelectedItems;
      });
    });
  }, [onSelectionChange, selectionMode, setSelected]);

  const toggleAllRows: TableSelectionState['toggleAllRows'] = useEventCallback(e => {
    selectionManager.toggleAllItems(
      e,
      items.map((item, i) => getRowId?.(item) ?? i),
      selected,
    );
  });

  const toggleRow: TableSelectionState['toggleRow'] = useEventCallback((e, rowId: TableRowId) =>
    selectionManager.toggleItem(e, rowId, selected),
  );

  const deselectRow: TableSelectionState['deselectRow'] = useEventCallback((e, rowId: TableRowId) =>
    selectionManager.deselectItem(e, rowId, selected),
  );

  const selectRow: TableSelectionState['selectRow'] = useEventCallback((e, rowId: TableRowId) =>
    selectionManager.selectItem(e, rowId, selected),
  );

  const isRowSelected: TableSelectionState['isRowSelected'] = (rowId: TableRowId) =>
    selectionManager.isSelected(rowId, selected);

  return {
    ...tableState,
    selection: {
      selectionMode,
      someRowsSelected: selected.size > 0,
      allRowsSelected: selectionMode === 'single' ? selected.size > 0 : selected.size === items.length,
      selectedRows: selected,
      toggleRow,
      toggleAllRows,
      clearRows: selectionManager.clearItems,
      deselectRow,
      selectRow,
      isRowSelected,
    },
  };
}
