import * as React from 'react';
import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { createSelectionManager } from './selectionManager';
import type { OnSelectionChangeCallback, RowId, SelectionMode, TableSelectionStateInternal, TableState } from './types';

interface UseSelectionOptions<TItem> {
  /**
   * Can be multi or single select
   */
  selectionMode: SelectionMode;
  /**
   * Used in uncontrolled mode to set initial selected rows on mount
   */
  defaultSelectedItems?: Set<RowId>;
  /**
   * Used to control row selection
   */
  selectedItems?: Set<RowId>;
  /**
   * Called when selection changes
   */
  onSelectionChange?: OnSelectionChangeCallback;
}

export function useSelection<TItem>(
  tableState: TableState<TItem>,
  options: UseSelectionOptions<TItem>,
): TableState<TItem> {
  const { items, getRowId } = tableState;
  const { selectionMode, defaultSelectedItems, selectedItems, onSelectionChange } = options;

  const [selected, setSelected] = useControllableState({
    initialState: new Set<RowId>(),
    defaultState: defaultSelectedItems,
    state: selectedItems,
  });

  const selectionManager = React.useMemo(() => {
    return createSelectionManager(selectionMode, newSelectedItems => {
      setSelected(() => {
        onSelectionChange?.(newSelectedItems);
        return newSelectedItems;
      });
    });
  }, [onSelectionChange, selectionMode, setSelected]);

  const toggleAllRows: TableSelectionStateInternal['toggleAllRows'] = useEventCallback(() => {
    selectionManager.toggleAllItems(
      items.map((item, i) => getRowId?.(item) ?? i),
      selected,
    );
  });

  const toggleRow: TableSelectionStateInternal['toggleRow'] = useEventCallback((rowId: RowId) =>
    selectionManager.toggleItem(rowId, selected),
  );

  const deselectRow: TableSelectionStateInternal['deselectRow'] = useEventCallback((rowId: RowId) =>
    selectionManager.deselectItem(rowId, selected),
  );

  const selectRow: TableSelectionStateInternal['selectRow'] = useEventCallback((rowId: RowId) =>
    selectionManager.selectItem(rowId, selected),
  );

  const isRowSelected: TableSelectionStateInternal['isRowSelected'] = (rowId: RowId) =>
    selectionManager.isSelected(rowId, selected);

  return {
    ...tableState,
    selection: {
      someRowsSelected: selected.size > 0,
      allRowsSelected: selectionMode === 'single' ? selected.size > 0 : selected.size === items.length,
      selectedRows: Array.from(selected),
      toggleRow,
      toggleAllRows,
      clearRows: selectionManager.clearItems,
      deselectRow,
      selectRow,
      isRowSelected,
    },
  };
}
