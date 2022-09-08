import { SelectionMode } from './types';

type OnSelectionChangeCallback = (selectedItems: Set<SelectionItemId>) => void;

export interface SelectionManager {
  toggleItem(id: SelectionItemId, selectedItems: Set<SelectionItemId>): void;
  selectItem(id: SelectionItemId, selectedItems: Set<SelectionItemId>): void;
  deselectItem(id: SelectionItemId, selectedItems: Set<SelectionItemId>): void;
  clearItems(): void;
  isSelected(id: SelectionItemId, selectedItems: Set<SelectionItemId>): boolean;
  toggleAllItems(itemIds: SelectionItemId[], selectedItems: Set<SelectionItemId>): void;
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
  const toggleAllItems = (itemIds: SelectionItemId[], selectedItems: Set<SelectionItemId>) => {
    const allItemsSelected = itemIds.every(itemId => selectedItems.has(itemId));

    if (allItemsSelected) {
      selectedItems.clear();
    } else {
      itemIds.forEach(itemId => selectedItems.add(itemId));
    }

    onSelectionChange(new Set(selectedItems));
  };

  const toggleItem = (itemId: SelectionItemId, selectedItems: Set<SelectionItemId>) => {
    if (selectedItems.has(itemId)) {
      selectedItems.delete(itemId);
    } else {
      selectedItems.add(itemId);
    }

    onSelectionChange(new Set(selectedItems));
  };

  const selectItem = (itemId: SelectionItemId, selectedItems: Set<SelectionItemId>) => {
    selectedItems.add(itemId);
    onSelectionChange(new Set(selectedItems));
  };

  const deselectItem = (itemId: SelectionItemId, selectedItems: Set<SelectionItemId>) => {
    selectedItems.delete(itemId);
    onSelectionChange(new Set(selectedItems));
  };

  const clearItems = () => {
    onSelectionChange(new Set());
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
  const toggleItem = (itemId: SelectionItemId) => {
    onSelectionChange(new Set([itemId]));
  };

  const clearItems = () => {
    onSelectionChange(new Set<SelectionItemId>());
  };

  const isSelected = (itemId: SelectionItemId, selectedItems: Set<SelectionItemId>) => {
    return selectedItems.has(itemId);
  };

  const selectItem = (itemId: SelectionItemId) => {
    onSelectionChange(new Set([itemId]));
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
