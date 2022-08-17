import * as React from 'react';
import { useEventCallback, usePrevious } from '@fluentui/react-utilities';
import { createSelectionManager } from './selectionManager';
import { GetRowIdInternal, RowId, SelectionMode, SelectionStateInternal } from './types';

export function useSelection<TItem>(
  selectionMode: SelectionMode,
  items: TItem[],
  getRowId: GetRowIdInternal<TItem>,
): SelectionStateInternal {
  const prevSelectionMode = usePrevious(selectionMode);
  const [selected, setSelected] = React.useState(() => new Set<RowId>());
  const [selectionManager, setSelectionManager] = React.useState(() =>
    createSelectionManager(selectionMode, setSelected),
  );

  React.useEffect(() => {
    if (prevSelectionMode !== selectionMode) {
      setSelectionManager(createSelectionManager(selectionMode, setSelected));
    }
  }, [selectionMode, prevSelectionMode]);

  const toggleAllRows: SelectionStateInternal['toggleAllRows'] = useEventCallback(() => {
    selectionManager.toggleAllItems(items.map((item, i) => getRowId(item, i)));
  });

  return {
    someRowsSelected: selected.size > 0,
    allRowsSelected: selectionMode === 'single' ? selected.size > 0 : selected.size === items.length,
    selectedRows: selected,
    toggleRow: selectionManager.toggleItem,
    toggleAllRows,
    clearRows: selectionManager.clearItems,
    deselectRow: selectionManager.deselectItem,
    selectRow: selectionManager.selectItem,
    isRowSelected: selectionManager.isSelected,
  };
}
