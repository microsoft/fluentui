/**
 * {@docCategory Selection}
 */
export interface IObjectWithKey {
  key?: string | number;
}

export const SELECTION_CHANGE = 'change';

/**
 * {@docCategory Selection}
 */
export enum SelectionMode {
  none = 0,
  single = 1,
  multiple = 2
}

/**
 * {@docCategory Selection}
 */
export interface ISelection {
  count: number;
  mode: SelectionMode;

  canSelectItem: (item: IObjectWithKey, index?: number) => boolean;

  // Obesrvable methods.
  setChangeEvents(isEnabled: boolean, suppressChange?: boolean): void;

  // Initialization methods.

  setItems(items: IObjectWithKey[], shouldClear: boolean): void;
  getItems(): IObjectWithKey[];

  // Read selection methods.

  getSelection(): IObjectWithKey[];
  getSelectedIndices(): number[];
  getSelectedCount(): number;
  isRangeSelected(fromIndex: number, count: number): boolean;

  isAllSelected(): boolean;
  isKeySelected(key: string): boolean;
  isIndexSelected(index: number): boolean;

  isModal?(): boolean;

  // Write selection methods.

  setAllSelected(isAllSelected: boolean): void;
  setKeySelected(key: string, isSelected: boolean, shouldAnchor: boolean): void;
  setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void;

  setModal?(isModal: boolean): void; // TODO make non-optional on next breaking change

  // Write range selection methods.

  selectToKey(key: string, clearSelection?: boolean): void;
  selectToIndex(index: number, clearSelection?: boolean): void;

  // Toggle helpers.

  toggleAllSelected(): void;
  toggleKeySelected(key: string): void;
  toggleIndexSelected(index: number): void;
  toggleRangeSelected(fromIndex: number, count: number): void;
}

/**
 * {@docCategory Selection}
 */
export enum SelectionDirection {
  horizontal = 0,
  vertical = 1
}
