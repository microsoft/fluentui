import * as React from 'react';
import { SelectionMode } from './types';

type OnSelectionChangeCallback = (e: React.SyntheticEvent, selectedItems: Set<SelectionItemId>) => void;

export interface SelectionManager {
  toggleItem(e: React.SyntheticEvent, id: SelectionItemId, selectedItems: Set<SelectionItemId>): void;
  selectItem(e: React.SyntheticEvent, id: SelectionItemId, selectedItems: Set<SelectionItemId>): void;
  deselectItem(e: React.SyntheticEvent, id: SelectionItemId, selectedItems: Set<SelectionItemId>): void;
  clearItems(e: React.SyntheticEvent): void;
  isSelected(id: SelectionItemId, selectedItems: Set<SelectionItemId>): boolean;
  toggleAllItems(e: React.SyntheticEvent, itemIds: SelectionItemId[], selectedItems: Set<SelectionItemId>): void;
}

export type SelectionItemId = string | number;

export function createSelectionManager(
  mode: SelectionMode,
  onSelectionChange: OnSelectionChangeCallback = () => undefined,
): SelectionManager {
  const managerFactory = mode === 'multiselect' ? createMultipleSelectionManager : createSingleSelectionManager;

  return managerFactory(onSelectionChange);
}

function createMultipleSelectionManager(onSelectionChange: OnSelectionChangeCallback): SelectionManager {
  const toggleAllItems: SelectionManager['toggleAllItems'] = (e, itemIds, selectedItems) => {
    const allItemsSelected = itemIds.every(itemId => selectedItems.has(itemId));

    if (allItemsSelected) {
      selectedItems.clear();
    } else {
      itemIds.forEach(itemId => selectedItems.add(itemId));
    }

    onSelectionChange(e, new Set(selectedItems));
  };

  const toggleItem: SelectionManager['toggleItem'] = (e, itemId, selectedItems) => {
    if (selectedItems.has(itemId)) {
      selectedItems.delete(itemId);
    } else {
      selectedItems.add(itemId);
    }

    onSelectionChange(e, new Set(selectedItems));
  };

  const selectItem: SelectionManager['selectItem'] = (e, itemId, selectedItems) => {
    selectedItems.add(itemId);
    onSelectionChange(e, new Set(selectedItems));
  };

  const deselectItem: SelectionManager['deselectItem'] = (e, itemId, selectedItems) => {
    selectedItems.delete(itemId);
    onSelectionChange(e, new Set(selectedItems));
  };

  const clearItems: SelectionManager['clearItems'] = e => {
    onSelectionChange(e, new Set());
  };

  const isSelected = (itemId: SelectionItemId, selectedItems: Set<SelectionItemId>) => {
    return selectedItems.has(itemId);
  };

  return {
    toggleItem,
    selectItem,
    deselectItem,
    clearItems,
    isSelected,
    toggleAllItems,
  };
}

function createSingleSelectionManager(onSelectionChange: OnSelectionChangeCallback): SelectionManager {
  const toggleItem: SelectionManager['toggleItem'] = (e, itemId) => {
    onSelectionChange(e, new Set([itemId]));
  };

  const clearItems: SelectionManager['clearItems'] = e => {
    onSelectionChange(e, new Set<SelectionItemId>());
  };

  const isSelected = (itemId: SelectionItemId, selectedItems: Set<SelectionItemId>) => {
    return selectedItems.has(itemId);
  };

  const selectItem: SelectionManager['selectItem'] = (e, itemId) => {
    onSelectionChange(e, new Set([itemId]));
  };

  return {
    deselectItem: clearItems,
    selectItem,
    toggleAllItems: () => {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('[react-table]: `toggleAllItems` should not be used in single selection mode');
      }

      return undefined;
    },
    toggleItem,
    clearItems,
    isSelected,
  };
}
