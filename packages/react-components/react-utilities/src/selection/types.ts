import * as React from 'react';

export type SelectionMode = 'single' | 'multiselect';

export interface SelectionMethods {
  toggleItem(event: React.SyntheticEvent, id: SelectionItemId): void;
  selectItem(event: React.SyntheticEvent, id: SelectionItemId): void;
  deselectItem(event: React.SyntheticEvent, id: SelectionItemId): void;
  clearItems(event: React.SyntheticEvent): void;
  isSelected(id: SelectionItemId): boolean;
  toggleAllItems(event: React.SyntheticEvent, itemIds: SelectionItemId[]): void;
}

export type SelectionItemId = string | number;

export type OnSelectionChangeCallback = (event: React.SyntheticEvent, selectedItems: Set<SelectionItemId>) => void;

export type OnSelectionChangeData = {
  selectedItems: Set<SelectionItemId>;
};

export type SelectionHookParams = {
  selectionMode: SelectionMode;
  /**
   * Used in uncontrolled mode to set initial selected items on mount
   */
  defaultSelectedItems?: Iterable<SelectionItemId>;
  /**
   * Used to control selected items
   */
  selectedItems?: Iterable<SelectionItemId>;
  /**
   * Called when selection changes
   */
  onSelectionChange?(event: React.SyntheticEvent, data: OnSelectionChangeData): void;
};
