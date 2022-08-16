import { SelectionMode } from './types';

type OnSelectionChangeCallback = (selectedItems: Set<SelectionItemId>) => void;

export interface SelectionManager {
  toggleSelect(id: SelectionItemId): void;
  select(id: SelectionItemId): void;
  deSelect(id: SelectionItemId): void;
  clearSelection(): void;
  isSelected(id: SelectionItemId): boolean;
  toggleSelectAll(itemIds: SelectionItemId[]): void;
}

export type SelectionItemId = string | number;

export function createSelectionManager(
  mode: SelectionMode,
  onSelectionChange: OnSelectionChangeCallback = () => undefined,
): SelectionManager {
  const selectedItems = new Set<SelectionItemId>();
  return mode === 'multiselect'
    ? createMultipleSelectionManager(selectedItems, onSelectionChange)
    : createSingleSelectionManager(selectedItems, onSelectionChange);
}

function createMultipleSelectionManager(
  set: Set<SelectionItemId>,
  onSelectionChange: OnSelectionChangeCallback,
): SelectionManager {
  const toggleSelectAll = (itemIds: SelectionItemId[]) => {
    if (set.size === itemIds.length) {
      set.clear();
    } else {
      itemIds.forEach(itemId => set.add(itemId));
    }

    onSelectionChange(new Set(set));
  };

  const toggleSelect = (itemId: SelectionItemId) => {
    if (set.has(itemId)) {
      set.delete(itemId);
    } else {
      set.add(itemId);
    }

    onSelectionChange(new Set(set));
  };

  const select = (itemId: SelectionItemId) => {
    set.add(itemId);
    onSelectionChange(new Set(set));
  };

  const deSelect = (itemId: SelectionItemId) => {
    set.delete(itemId);
    onSelectionChange(new Set(set));
  };

  const clearSelection = () => {
    set.clear();
    onSelectionChange(new Set(set));
  };

  const isSelected = (itemId: SelectionItemId) => {
    return set.has(itemId);
  };

  return {
    toggleSelect,
    select,
    deSelect,
    clearSelection,
    isSelected,
    toggleSelectAll,
  };
}

function createSingleSelectionManager(
  set: Set<SelectionItemId>,
  onSelectionChange: OnSelectionChangeCallback,
): SelectionManager {
  const toggleSelect = (itemId: SelectionItemId) => {
    set.clear();
    set.add(itemId);
    onSelectionChange(new Set(set));
  };

  const clearSelection = () => {
    set.clear();
    onSelectionChange(new Set(set));
  };

  const isSelected = (itemId: SelectionItemId) => {
    return set.has(itemId);
  };

  const select = (itemId: SelectionItemId) => {
    set.clear();
    set.add(itemId);
    onSelectionChange(new Set(set));
  };

  return {
    deSelect: clearSelection,
    select,
    toggleSelectAll: () => undefined,
    toggleSelect,
    clearSelection,
    isSelected,
  };
}
