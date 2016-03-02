export const SELECTION_CHANGE = 'change';

export enum SelectionMode {
  none,
  single,
  multiple
}
export interface IObjectWithKey {
  key: string;
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

  getFocusedKey(): string;
  getFocusedIndex(): number;

  // Write selection methods.

  setAllSelected(isAllSelected: boolean);
  setKeySelected(key: string, isSelected: boolean, shouldFocus: boolean, shouldAnchor: boolean);
  setIndexSelected(index: number, isSelected: boolean, shouldFocus: boolean, shouldAnchor: boolean);

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

export default ISelection;
