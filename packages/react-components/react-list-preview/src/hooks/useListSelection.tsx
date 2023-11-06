import { Checkmark16Filled } from '@fluentui/react-icons';
import { SelectionHookParams, useEventCallback, useSelection } from '@fluentui/react-utilities';
import * as React from 'react';
import { ListFeaturesState, ListSelectionState } from './types';

export const defaultListSelectionState: ListSelectionState = {
  isSelected: () => false,
  toggleItem: () => undefined,
  selectItem: () => undefined,
  deselectItem: () => undefined,
  clearSelection: () => undefined,
  toggleAllItems: () => undefined,
  getListProps: () => ({}),
  getListItemProps: () => ({}),
  selectedItems: new Set(),
};

export function useListSelection<TItem extends { id: string | number }>(
  options: SelectionHookParams = { selectionMode: 'multiselect' },
) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (listState: ListFeaturesState<TItem>) => useListSelectionState(listState, options);
}

export function useListSelectionState<TItem extends { id: string | number }>(
  listState: ListFeaturesState<TItem>,
  options: SelectionHookParams,
) {
  const { selectionMode, defaultSelectedItems, onSelectionChange } = options;
  const [selectedItems, setSelectedItems] = React.useState(() => new Set<string | number>(defaultSelectedItems || []));

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

  const toggleAllItems: ListSelectionState['toggleAllItems'] = useEventCallback(e => {
    selectionMethods.toggleAllItems(
      e,
      listState.items.map(item => item.id),
    );
  });

  const deselectItem: ListSelectionState['deselectItem'] = useEventCallback((e, itemId: string | number) =>
    selectionMethods.deselectItem(e, itemId),
  );

  const selectItem: ListSelectionState['selectItem'] = useEventCallback((e, itemId: string | number) =>
    selectionMethods.selectItem(e, itemId),
  );

  const clearSelection: ListSelectionState['clearSelection'] = useEventCallback(e => selectionMethods.clearItems(e));

  const getListProps: ListSelectionState['getListProps'] = () => {
    return {
      role: 'listbox',
      'aria-multiselectable': selectionMode === 'multiselect' ? true : undefined,
    };
  };

  const listPropsForSelected = React.useMemo(() => {
    return {
      tabIndex: 0,
      role: 'option',
      'aria-selected': true,
      checkmark: {
        children: <Checkmark16Filled />,
      },
    };
  }, []);

  const listPropsForNotSelected = React.useMemo(() => {
    return {
      tabIndex: 0,
      role: 'option',
      'aria-selected': false,
      checkmark: {
        children: null,
      },
    };
  }, []);

  const getListItemProps: ListSelectionState['getListItemProps'] = React.useCallback(
    value => (selectionMethods.isSelected(value) ? listPropsForSelected : listPropsForNotSelected),
    [listPropsForNotSelected, listPropsForSelected, selectionMethods],
  );

  return {
    ...listState,
    selection: {
      selectedItems: selected,
      toggleItem,
      toggleAllItems,
      deselectItem,
      selectItem,
      setSelectedItems,
      isSelected: (id: string | number) => selectionMethods.isSelected(id),
      clearSelection,
      getListProps,
      getListItemProps,
    },
  };
}
