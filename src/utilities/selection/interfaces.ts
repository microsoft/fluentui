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
  canSelectItem?: (item: IObjectWithKey) => boolean;

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

  // Write selection methods.

  setAllSelected(isAllSelected: boolean);
  setKeySelected(key: string, isSelected: boolean, shouldAnchor: boolean);
  setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean);

  // Write range selection methods.

  selectToKey(key: string, clearSelection?: boolean);
  selectToIndex(index: number, clearSelection?: boolean);

  // Toggle helpers.

  toggleAllSelected();
  toggleKeySelected(key: string);
  toggleIndexSelected(index: number);
}

export interface ISelectionLayout {
  getItemIndexAbove(index: number, items: any[]): number;
  getItemIndexBelow(index: number, items: any[]): number;
  getItemIndexLeft(index: number, items: any[]): number;
  getItemIndexRight(index: number, items: any[]): number;
}

export enum SelectionDirection {
  horizontal = 0,
  vertical = 1
}
