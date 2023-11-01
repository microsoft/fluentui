import { SelectionHookParams, useEventCallback, useSelection } from '@fluentui/react-utilities';
import * as React from 'react';
import { ListFeaturesState, ListSelectionState, UseListSelectionOptions } from './types';

export const defaultListSelectionState: ListSelectionState = {
  isSelected: () => false,
  toggleItem: () => undefined,
  selectItem: () => undefined,
  deselectItem: () => undefined,
  clearSelection: () => undefined,
};

export function useListSelection<TItem>(options: SelectionHookParams = { selectionMode: 'multiselect' }) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (listState: ListFeaturesState<TItem>) => useListSelectionState(listState, options);
}

export function useListSelectionState<TItem>(listState: ListFeaturesState<TItem>, options: SelectionHookParams) {
  const { selectionMode, defaultSelectedItems } = options;
  const [selectedItems, setSelectedItems] = React.useState(() => new Set<string | number>(defaultSelectedItems || []));

  const [selected, selectionMethods] = useSelection({
    selectionMode,
    defaultSelectedItems,
    selectedItems,
    onSelectionChange: (e, data) => setSelectedItems(data.selectedItems),
  });

  const toggleItem: ListSelectionState['toggleItem'] = useEventCallback((e, itemId) =>
    selectionMethods.toggleItem(e, itemId),
  );

  const deselectItem: ListSelectionState['deselectItem'] = useEventCallback((e, itemId: string | number) =>
    selectionMethods.deselectItem(e, itemId),
  );

  const selectItem: ListSelectionState['selectItem'] = useEventCallback((e, itemId: string | number) =>
    selectionMethods.selectItem(e, itemId),
  );

  const clearSelection: ListSelectionState['clearSelection'] = useEventCallback(e => selectionMethods.clearItems(e));

  return {
    ...listState,
    selection: {
      selectedItems: selected,
      toggleItem,
      deselectItem,
      selectItem,
      setSelectedItems,
      isSelected: (id: string | number) => selectionMethods.isSelected(id),
      clearSelection,
    },
  };
}
