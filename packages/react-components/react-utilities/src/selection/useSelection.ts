import * as React from 'react';
import { SelectionHookParams, SelectionItemId, SelectionMethods } from './types';
import { useControllableState } from '../hooks/useControllableState';
import { createSetFromIterable } from '../utils/createSetFromIterable';

function useSelectionState(params: Omit<SelectionHookParams, 'selectionMode'>) {
  const [selected, setSelected] = useControllableState<Set<SelectionItemId>>({
    initialState: new Set(),
    defaultState: React.useMemo(
      () => params.defaultSelectedItems && createSetFromIterable(params.defaultSelectedItems),
      [params.defaultSelectedItems],
    ),
    state: React.useMemo(
      () => params.selectedItems && createSetFromIterable(params.selectedItems),
      [params.selectedItems],
    ),
  });
  const changeSelection = (event: React.SyntheticEvent, nextSelectedItems: Set<SelectionItemId>) => {
    params.onSelectionChange?.(event, { selectedItems: nextSelectedItems });
    setSelected(nextSelectedItems);
  };
  return [selected, changeSelection] as const;
}

function useSingleSelection(params: Omit<SelectionHookParams, 'selectionMode'>) {
  const [selected, changeSelection] = useSelectionState(params);
  const methods: SelectionMethods = {
    deselectItem: event => changeSelection(event, new Set()),
    selectItem: (event, itemId) => changeSelection(event, new Set([itemId])),
    toggleAllItems: () => {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('[react-utilities]: `toggleAllItems` should not be used in single selection mode');
      }
    },
    toggleItem: (event, itemId) => changeSelection(event, new Set([itemId])),
    clearItems: event => changeSelection(event, new Set()),
    isSelected: itemId => selected.has(itemId) ?? false,
  };
  return [selected, methods] as const;
}

function useMultipleSelection(params: Omit<SelectionHookParams, 'selectionMode'>) {
  const [selected, changeSelection] = useSelectionState(params);
  const methods: SelectionMethods = {
    toggleItem: (event, itemId) => {
      const nextSelectedItems = new Set(selected);
      if (selected.has(itemId)) {
        nextSelectedItems.delete(itemId);
      } else {
        nextSelectedItems.add(itemId);
      }
      changeSelection(event, nextSelectedItems);
    },
    selectItem: (event, itemId) => {
      const nextSelectedItems = new Set(selected);
      nextSelectedItems.add(itemId);
      changeSelection(event, nextSelectedItems);
    },
    deselectItem: (event, itemId) => {
      const nextSelectedItems = new Set(selected);
      nextSelectedItems.delete(itemId);
      changeSelection(event, nextSelectedItems);
    },
    clearItems: event => {
      changeSelection(event, new Set());
    },
    isSelected: itemId => selected.has(itemId),
    toggleAllItems: (event, itemIds) => {
      const allItemsSelected = itemIds.every(itemId => selected.has(itemId));
      const nextSelectedItems = new Set(selected);
      if (allItemsSelected) {
        nextSelectedItems.clear();
      } else {
        itemIds.forEach(itemId => nextSelectedItems.add(itemId));
      }
      changeSelection(event, nextSelectedItems);
    },
  };
  return [selected, methods] as const;
}

export function useSelection(params: SelectionHookParams) {
  'use no memo';

  if (params.selectionMode === 'multiselect') {
    // selectionMode is a static value, so we can safely ignore rules-of-hooks
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMultipleSelection(params);
  }
  // selectionMode is a static value, so we can safely ignore rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSingleSelection(params);
}
