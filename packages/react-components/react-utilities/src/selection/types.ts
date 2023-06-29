export type SelectionMode = 'single' | 'multiselect';

/**
 * @internal
 */
export type SelectionValue = string | number;

export interface SelectionMethods<Value = SelectionValue> {
  toggleItem(value: Value): Set<Value>;
  selectItem(value: Value): Set<Value>;
  deselectItem(value: Value): Set<Value>;
  clearItems(): Set<Value>;
  isSelected(value: Value): boolean;
  toggleAllItems(values: Value[]): Set<Value>;
}

export type SelectionHookParams<Value = SelectionValue> = {
  selectionMode: SelectionMode;
  /**
   * Used in uncontrolled mode to set initial selected items on mount
   */
  defaultSelectedItems?: Iterable<Value>;
  /**
   * Used to control selected items
   */
  selectedItems?: Iterable<Value>;
};
