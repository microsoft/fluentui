import * as React from 'react';
import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { createSelectionManager } from './selectionManager';
import type { RowId, TableSelectionState, TableState, UseSelectionOptions } from './types';

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
};

export function useSelection<TItem>(options: UseSelectionOptions) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableState<TItem>) => useSelectionState(tableState, options);
}

export function useSelectionState<TItem>(
  tableState: TableState<TItem>,
  options: UseSelectionOptions,
): TableState<TItem> {
  const { items, getRowId } = tableState;
  const { selectionMode, defaultSelectedItems, selectedItems, onSelectionChange } = options;

  const [selected, setSelected] = useControllableState({
    initialState: new Set<RowId>(),
    defaultState: defaultSelectedItems,
    state: selectedItems,
  });

  const selectionManager = React.useMemo(() => {
    return createSelectionManager(selectionMode, (e, newSelectedItems) => {
      setSelected(() => {
        onSelectionChange?.(e as React.SyntheticEvent, newSelectedItems);
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

  const toggleRow: TableSelectionState['toggleRow'] = useEventCallback((e, rowId: RowId) =>
    selectionManager.toggleItem(e, rowId, selected),
  );

  const deselectRow: TableSelectionState['deselectRow'] = useEventCallback((e, rowId: RowId) =>
    selectionManager.deselectItem(e, rowId, selected),
  );

  const selectRow: TableSelectionState['selectRow'] = useEventCallback((e, rowId: RowId) =>
    selectionManager.selectItem(e, rowId, selected),
  );

  const isRowSelected: TableSelectionState['isRowSelected'] = (rowId: RowId) =>
    selectionManager.isSelected(rowId, selected);

  return {
    ...tableState,
    selection: {
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
