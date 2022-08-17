import * as React from 'react';
import { useEventCallback, usePrevious } from '@fluentui/react-utilities';
import { createSelectionManager } from './selectionManager';
import { GetRowIdInternal, RowId, SelectionMode, SelectionStateInternal, UseTableSelectionOptions } from './types';

interface UseSelectionOptions<TItem> {
  selectionMode: SelectionMode;
  items: TItem[];
  getRowId: GetRowIdInternal<TItem>;
  onRowSelectionChange?: UseTableSelectionOptions['onRowSelectionChange'];
  defaultSelectedRows?: Set<RowId>;
}

export function useSelection<TItem>(options: UseSelectionOptions<TItem>): SelectionStateInternal {
  const { selectionMode, items, getRowId, onRowSelectionChange = () => undefined, defaultSelectedRows } = options;

  const prevSelectionMode = usePrevious(selectionMode);
  const [_, rerender] = React.useReducer(x => x + 1, 0);
  const [selectionManager, setSelectionManager] = React.useState(() =>
    createSelectionManager({
      mode: selectionMode,
      onSelectionChange: selectedItems => {
        onRowSelectionChange(selectedItems);
        rerender();
      },
      defaultSelectedItems: defaultSelectedRows,
    }),
  );

  React.useEffect(() => {
    if (prevSelectionMode !== selectionMode) {
      setSelectionManager(
        createSelectionManager({
          mode: selectionMode,
          onSelectionChange: selectedItems => {
            onRowSelectionChange(selectedItems);
            rerender();
          },
          defaultSelectedItems: defaultSelectedRows,
        }),
      );
    }
  }, [selectionMode, prevSelectionMode, defaultSelectedRows, onRowSelectionChange]);

  const {
    selectItem,
    selectedItems,
    toggleAllItems,
    toggleItem,
    clearItems,
    deselectItem,
    isSelected,
  } = selectionManager;

  const toggleAllRows: SelectionStateInternal['toggleAllRows'] = useEventCallback(() => {
    toggleAllItems(items.map((item, i) => getRowId(item, i)));
  });

  return {
    someRowsSelected: selectedItems().size > 0,
    allRowsSelected: selectionMode === 'single' ? selectedItems().size > 0 : selectedItems().size === items.length,
    selectedRows: selectedItems(),
    toggleRow: toggleItem,
    toggleAllRows,
    clearRows: clearItems,
    deselectRow: deselectItem,
    selectRow: selectItem,
    isRowSelected: isSelected,
  };
}
