import { SelectionMode } from './types';

type OnSelectionChangeCallback = (selectedItems: Set<SelectionItemId>) => void;

export interface SelectionManager {
  toggleItem(id: SelectionItemId): void;
  selectItem(id: SelectionItemId): void;
  deselectItem(id: SelectionItemId): void;
  clearItems(): void;
  isSelected(id: SelectionItemId): boolean;
  toggleAllItems(itemIds: SelectionItemId[]): void;
  selectedItems(): Set<SelectionItemId>;
}

export type SelectionItemId = string | number;

interface CreateSelectionManagerOptions {
  mode: SelectionMode;
  onSelectionChange: OnSelectionChangeCallback;
  defaultSelectedItems?: Set<SelectionItemId>;
}

export function createSelectionManager(options: CreateSelectionManagerOptions): SelectionManager {
  const { mode, onSelectionChange = () => undefined, defaultSelectedItems } = options;

  const managerFactory = mode === 'multiselect' ? createMultipleSelectionManager : createSingleSelectionManager;

  return managerFactory(onSelectionChange, defaultSelectedItems);
}

function createMultipleSelectionManager(
  onSelectionChange: OnSelectionChangeCallback,
  defaultSelectedItems?: Set<SelectionItemId>,
): SelectionManager {
  const selectedItems = new Set<SelectionItemId>(defaultSelectedItems);
  const toggleAllItems = (itemIds: SelectionItemId[]) => {
    const allItemsSelected = itemIds.every(itemId => selectedItems.has(itemId));

    if (allItemsSelected) {
      selectedItems.clear();
    } else {
      itemIds.forEach(itemId => selectedItems.add(itemId));
    }

    onSelectionChange(new Set(selectedItems));
  };

  const toggleItem = (itemId: SelectionItemId) => {
    if (selectedItems.has(itemId)) {
      selectedItems.delete(itemId);
    } else {
      selectedItems.add(itemId);
    }

    onSelectionChange(new Set(selectedItems));
  };

  const selectItem = (itemId: SelectionItemId) => {
    selectedItems.add(itemId);
    onSelectionChange(new Set(selectedItems));
  };

  const deselectItem = (itemId: SelectionItemId) => {
    selectedItems.delete(itemId);
    onSelectionChange(new Set(selectedItems));
  };

  const clearItems = () => {
    selectedItems.clear();
    onSelectionChange(new Set(selectedItems));
  };

  const isSelected = (itemId: SelectionItemId) => {
    return selectedItems.has(itemId);
  };

  return {
    toggleItem,
    selectItem,
    deselectItem,
    clearItems,
    isSelected,
    toggleAllItems,
    selectedItems: () => selectedItems,
  };
}

function createSingleSelectionManager(
  onSelectionChange: OnSelectionChangeCallback,
  defaultSelectedItems?: Set<SelectionItemId>,
): SelectionManager {
  let selectedItem: SelectionItemId | undefined = undefined;

  if (defaultSelectedItems && defaultSelectedItems.size) {
    if (process.env.NODE_ENV !== 'production' && defaultSelectedItems.size > 1) {
      throw new Error('[react-table]: `defaultSelectedItems` should not have more than 1 element');
    }

    selectedItem = Array.from(defaultSelectedItems)[0];
  }

  const toggleItem = (itemId: SelectionItemId) => {
    selectedItem = itemId;
    onSelectionChange(new Set([selectedItem]));
  };

  const clearItems = () => {
    selectedItem = undefined;
    onSelectionChange(new Set<SelectionItemId>());
  };

  const isSelected = (itemId: SelectionItemId) => {
    return selectedItem === itemId;
  };

  const selectItem = (itemId: SelectionItemId) => {
    selectedItem = itemId;
    onSelectionChange(new Set([selectedItem]));
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
    selectedItems: () => new Set<SelectionItemId>(selectedItem ? [selectedItem] : []),
  };
}
