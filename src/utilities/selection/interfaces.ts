export interface IObjectWithKey {
  key?: string;
}

export const SELECTION_CHANGE = 'change';

export enum SelectionMode {
  none,
  single,
  multiple
}

export interface ISelection {
  count: number;

  // Obesrvable methods.
  setChangeEvents(isEnabled: boolean, suppressChange?: boolean);

  // Initialization methods.

  setItems(items: IObjectWithKey[], shouldClear: boolean);
  getItems(): IObjectWithKey[];

  // Read selection methods.

  getSelection(): IObjectWithKey[];
  getSelectedCount(): number;

  isAllSelected(): boolean;
  isKeySelected(key: string): boolean;
  isIndexSelected(index: number): boolean;

  getIsFocusActive(): boolean;
  getFocusedKey(): string;
  getFocusedIndex(): number;

  // Write selection methods.

  setAllSelected(isAllSelected: boolean);
  setKeySelected(key: string, isSelected: boolean, shouldFocus: boolean, shouldAnchor: boolean);
  setIndexSelected(index: number, isSelected: boolean, shouldFocus: boolean, shouldAnchor: boolean);

  setIsFocusActive(isFocusActive: boolean);
  setKeyFocused(key: string);
  setIndexFocused(index: number);

  // Write range selection methods.

  selectToKey(key: string);
  selectToIndex(index: number);

  // Toggle helpers.

  toggleAllSelected();
  toggleKeySelected(key: string);
  toggleIndexSelected(index: number);
}

export interface ISelectionLayout {
  getItemIndexAbove(focusIndex: number, items: any[]): number;
  getItemIndexBelow(focusIndex: number, items: any[]): number;
  getItemIndexLeft(focusIndex: number, items: any[]): number;
  getItemIndexRight(focusIndex: number, items: any[]): number;
}

export enum SelectionDirection {
  horizontal = 0,
  vertical = 1
}
