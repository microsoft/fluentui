import { SelectionHookParams, useControllableState, useEventCallback, useSelection } from '@fluentui/react-utilities';
import * as React from 'react';
import type { ListSelectionState } from './types';

export function useListSelection(options: SelectionHookParams = { selectionMode: 'multiselect' }): ListSelectionState {
  const { selectionMode, defaultSelectedItems, onSelectionChange } = options;

  const [selectedItems, setSelectedItems] = useControllableState({
    state: options.selectedItems,
    defaultState: defaultSelectedItems,
    initialState: [],
  });

  const [selected, selectionMethods] = useSelection({
    selectionMode,
    defaultSelectedItems,
    selectedItems,
    onSelectionChange: (e, data) => {
      setSelectedItems(data.selectedItems);
      onSelectionChange?.(e, data);
    },
  });

  const toggleItem: ListSelectionState['toggleItem'] = useEventCallback((e, itemId) =>
    selectionMethods.toggleItem(e, itemId),
  );

  const toggleAllItems: ListSelectionState['toggleAllItems'] = useEventCallback((e, itemIds) => {
    selectionMethods.toggleAllItems(e, itemIds);
  });

  const deselectItem: ListSelectionState['deselectItem'] = useEventCallback((e, itemId: string | number) =>
    selectionMethods.deselectItem(e, itemId),
  );

  const selectItem: ListSelectionState['selectItem'] = useEventCallback((e, itemId: string | number) =>
    selectionMethods.selectItem(e, itemId),
  );

  const clearSelection: ListSelectionState['clearSelection'] = useEventCallback(e => selectionMethods.clearItems(e));

  const selectedArray = React.useMemo(() => Array.from(selected), [selected]);

  return {
    selectedItems: selectedArray,
    toggleItem,
    toggleAllItems,
    deselectItem,
    selectItem,
    setSelectedItems,
    isSelected: (id: string | number) => selectionMethods.isSelected(id),
    clearSelection,
  };
}
