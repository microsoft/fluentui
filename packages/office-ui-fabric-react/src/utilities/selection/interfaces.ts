export interface IObjectWithKey {
  key?: string;
}

export const SELECTION_CHANGE = 'change';

export enum SelectionMode {
  none = 0,
  single = 1,
  multiple = 2
}

export interface ISelection {
  count: number;
  canSelectItem?: (item: IObjectWithKey) => boolean;

  // Obesrvable methods.
  setChangeEvents(isEnabled: boolean, suppressChange?: boolean): void;

  // Initialization methods.

  setItems(items: IObjectWithKey[], shouldClear: boolean): void;
  getItems(): IObjectWithKey[];

  // Read selection methods.

  getSelection(): IObjectWithKey[];
  getSelectedCount(): number;
  isRangeSelected(fromIndex: number, count: number): boolean;

  isAllSelected(): boolean;
  isKeySelected(key: string): boolean;
  isIndexSelected(index: number): boolean;

  // Write selection methods.

  setAllSelected(isAllSelected: boolean): void;
  setKeySelected(key: string, isSelected: boolean, shouldAnchor: boolean): void;
  setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void;

  // Write range selection methods.

  selectToKey(key: string, clearSelection?: boolean): void;
  selectToIndex(index: number, clearSelection?: boolean): void;

  // Toggle helpers.

  toggleAllSelected(): void;
  toggleKeySelected(key: string): void;
  toggleIndexSelected(index: number): void;
  toggleRangeSelected(fromIndex: number, count: number): void;
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
