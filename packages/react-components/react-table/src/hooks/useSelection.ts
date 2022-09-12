import * as React from 'react';
import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { createSelectionManager } from './selectionManager';
import type {
  GetRowIdInternal,
  OnSelectionChangeCallback,
  RowId,
  SelectionMode,
  TableSelectionStateInternal,
} from './types';

interface UseSelectionOptions<TItem> {
  selectionMode: SelectionMode;
  items: TItem[];
  getRowId: GetRowIdInternal<TItem>;
  defaultSelectedItems?: Set<RowId>;
  selectedItems?: Set<RowId>;
  onSelectionChange?: OnSelectionChangeCallback;
}

export function useSelection<TItem>(options: UseSelectionOptions<TItem>): TableSelectionStateInternal {
  const { selectionMode, items, getRowId, defaultSelectedItems, selectedItems, onSelectionChange } = options;

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
      items.map((item, i) => getRowId(item, i)),
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
    someRowsSelected: selected.size > 0,
    allRowsSelected: selectionMode === 'single' ? selected.size > 0 : selected.size === items.length,
    selectedRows: selected,
    toggleRow,
    toggleAllRows,
    clearRows: selectionManager.clearItems,
    deselectRow,
    selectRow,
    isRowSelected,
  };
}
