
import { IObjectWithKey, ISelection, SELECTION_CHANGE, SelectionMode } from './interfaces';
import { EventGroup } from '../../Utilities';

export interface ISelectionOptions {
  onSelectionChanged?: () => void;
  getKey?: (item: IObjectWithKey, index?: number) => string | number;
  canSelectItem?: (item: IObjectWithKey) => boolean;
  selectionMode?: SelectionMode;
}

export class Selection implements ISelection {
  public count: number;
  public readonly mode: SelectionMode;

  private _getKey: (item: IObjectWithKey, index?: number) => string | number;
  private _canSelectItem: (item: IObjectWithKey) => boolean;

  private _changeEventSuppressionCount: number;
  private _items: IObjectWithKey[];
  private _selectedItems: IObjectWithKey[] | null;
  private _isAllSelected: boolean;
  private _exemptedIndices: { [index: string]: boolean };
  private _exemptedCount: number;
  private _keyToIndexMap: { [key: string]: number };
  private _anchoredIndex: number;
  private _onSelectionChanged: (() => void) | undefined;
  private _hasChanged: boolean;
  private _unselectableIndices: { [index: string]: boolean };
  private _unselectableCount: number;

  constructor(options: ISelectionOptions = {}) {
    const {
      onSelectionChanged,
      getKey,
      canSelectItem = (item: IObjectWithKey) => true,
      selectionMode = SelectionMode.multiple
    } = options;

    this.mode = selectionMode;

    this._getKey = getKey || defaultGetKey;

    this._changeEventSuppressionCount = 0;
    this._exemptedCount = 0;
    this._anchoredIndex = 0;
    this._unselectableCount = 0;

    this._onSelectionChanged = onSelectionChanged;
    this._canSelectItem = canSelectItem;

    this.setItems([], true);
  }

  public canSelectItem(item: IObjectWithKey): boolean {
    return this._canSelectItem(item);
  }

  public getKey(item: IObjectWithKey, index?: number): string {
    const key = this._getKey(item, index);

    return (typeof key === 'number' || key) ?
      `${key}` :
      '';
  }

  public setChangeEvents(isEnabled: boolean, suppressChange?: boolean) {
    this._changeEventSuppressionCount += isEnabled ? -1 : 1;

    if (this._changeEventSuppressionCount === 0 && this._hasChanged) {
      this._hasChanged = false;

      if (!suppressChange) {
        this._change();
      }
    }
  }

  /**
   * Selection needs the items, call this method to set them. If the set
   * of items is the same, this will re-evaluate selection and index maps.
   * Otherwise, shouldClear should be set to true, so that selection is
   * cleared.
   */
  public setItems(items: IObjectWithKey[], shouldClear = true) {
    let newKeyToIndexMap: { [key: string]: number } = {};
    let newUnselectableIndices: { [key: string]: boolean } = {};
    let hasSelectionChanged = false;

    this.setChangeEvents(false);

    // Reset the unselectable count.
    this._unselectableCount = 0;

    // Build lookup table for quick selection evaluation.
    for (let i = 0; i < items.length; i++) {
      let item = items[i];

      if (item) {
        const key = this.getKey(item, i);

        if (key) {
          newKeyToIndexMap[key] = i;
        }
      }

      newUnselectableIndices[i] = item && !this.canSelectItem(item);
      if (newUnselectableIndices[i]) {
        this._unselectableCount++;
      }
    }

    if (shouldClear) {
      this.setAllSelected(false);
    }

    // Check the exemption list for discrepencies.
    let newExemptedIndicies: { [key: string]: boolean } = {};

    for (let indexProperty in this._exemptedIndices) {
      if (this._exemptedIndices.hasOwnProperty(indexProperty)) {
        let index = Number(indexProperty);
        let item = this._items[index];
        let exemptKey = item ? this.getKey(item, Number(index)) : undefined;
        let newIndex = exemptKey ? newKeyToIndexMap[exemptKey] : index;

        if (newIndex === undefined) {
          // We don't know the index of the item any more so it's either moved or removed.
          // In this case we reset the entire selection.
          this.setAllSelected(false);
          break;
        } else {
          // We know the new index of the item. update the existing exemption table.
          newExemptedIndicies[newIndex] = true;
          hasSelectionChanged = hasSelectionChanged || (newIndex !== index);
        }
      }
    }

    this._exemptedIndices = newExemptedIndicies;
    this._keyToIndexMap = newKeyToIndexMap;
    this._unselectableIndices = newUnselectableIndices;
    this._items = items || [];

    if (hasSelectionChanged) {
      this._change();
    }

    this.setChangeEvents(true);
  }

  public getItems(): IObjectWithKey[] {
    return this._items;
  }

  public getSelection(): IObjectWithKey[] {
    if (!this._selectedItems) {
      this._selectedItems = [];

      for (let i = 0; i < this._items.length; i++) {
        if (this.isIndexSelected(i)) {
          this._selectedItems.push(this._items[i]);
        }
      }
    }

    return this._selectedItems;
  }

  public getSelectedCount(): number {
    return this._isAllSelected ? (this._items.length - this._exemptedCount - this._unselectableCount) : (this._exemptedCount);
  }

  public isRangeSelected(fromIndex: number, count: number): boolean {
    let endIndex = fromIndex + count;

    for (let i = fromIndex; i < endIndex; i++) {
      if (!this.isIndexSelected(i)) {
        return false;
      }
    }

    return true;
  }

  public isAllSelected(): boolean {
    let selectableCount = this._items.length - this._unselectableCount;

    // In single mode, we can only have a max of 1 item.
    if (this.mode === SelectionMode.single) {
      selectableCount = Math.min(selectableCount, 1);
    }

    return (
      (this.count > 0) &&
      (this._isAllSelected && this._exemptedCount === 0) ||
      (!this._isAllSelected && (this._exemptedCount === selectableCount) && selectableCount > 0));
  }

  public isKeySelected(key: string): boolean {
    let index = this._keyToIndexMap[key];

    return this.isIndexSelected(index);
  }

  public isIndexSelected(index: number): boolean {
    return !!(
      (this.count > 0) &&
      (this._isAllSelected && !this._exemptedIndices[index] && !this._unselectableIndices[index]) ||
      (!this._isAllSelected && this._exemptedIndices[index]));
  }

  public setAllSelected(isAllSelected: boolean): void {
    if (isAllSelected && this.mode !== SelectionMode.multiple) {
      return;
    }

    let selectableCount = this._items ? (this._items.length - this._unselectableCount) : 0;

    if (selectableCount > 0 && (this._exemptedCount > 0 || isAllSelected !== this._isAllSelected)) {
      this._exemptedIndices = {};
      this._exemptedCount = 0;
      this._isAllSelected = isAllSelected;
      this._updateCount();
    }
  }

  public setKeySelected(key: string, isSelected: boolean, shouldAnchor: boolean): void {
    let index = this._keyToIndexMap[key];

    if (index >= 0) {
      this.setIndexSelected(index, isSelected, shouldAnchor);
    }
  }

  public setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void {
    if (this.mode === SelectionMode.none) {
      return;
    }

    // Clamp the index.
    index = Math.min(Math.max(0, index), this._items.length - 1);

    // No-op on out of bounds selections.
    if (index < 0 || index >= this._items.length) {
      return;
    }

    this.setChangeEvents(false);

    let isExempt = this._exemptedIndices[index];
    let hasChanged = false;
    let canSelect = !this._unselectableIndices[index];

    if (canSelect) {
      if (isSelected && this.mode === SelectionMode.single) {
        // If this is single-select, the previous selection should be removed.
        this.setAllSelected(false);
      }

      // Determine if we need to remove the exemption.
      if (isExempt && (
        (isSelected && this._isAllSelected) ||
        (!isSelected && !this._isAllSelected)
      )) {
        hasChanged = true;
        delete this._exemptedIndices[index];
        this._exemptedCount--;
      }

      // Determine if we need to add the exemption.
      if (!isExempt && (
        (isSelected && !this._isAllSelected) ||
        (!isSelected && this._isAllSelected)
      )) {
        hasChanged = true;
        this._exemptedIndices[index] = true;
        this._exemptedCount++;
      }

      if (shouldAnchor) {
        this._anchoredIndex = index;
      }
    }

    if (hasChanged) {
      this._updateCount();
    }

    this.setChangeEvents(true);
  }

  public selectToKey(key: string, clearSelection?: boolean): void {
    this.selectToIndex(this._keyToIndexMap[key], clearSelection);
  }

  public selectToIndex(index: number, clearSelection?: boolean): void {
    if (this.mode === SelectionMode.none) {
      return;
    }

    if (this.mode === SelectionMode.single) {
      this.setIndexSelected(index, true, true);
      return;
    }

    let anchorIndex = this._anchoredIndex || 0;
    let startIndex = Math.min(index, anchorIndex);
    let endIndex = Math.max(index, anchorIndex);

    this.setChangeEvents(false);

    if (clearSelection) {
      this.setAllSelected(false);
    }

    for (; startIndex <= endIndex; startIndex++) {
      this.setIndexSelected(startIndex, true, false);
    }

    this.setChangeEvents(true);
  }

  public toggleAllSelected(): void {
    this.setAllSelected(!this.isAllSelected());
  }

  public toggleKeySelected(key: string): void {
    this.setKeySelected(key, !this.isKeySelected(key), true);
  }

  public toggleIndexSelected(index: number): void {
    this.setIndexSelected(index, !this.isIndexSelected(index), true);
  }

  public toggleRangeSelected(fromIndex: number, count: number): void {
    if (this.mode === SelectionMode.none) {
      return;
    }

    let isRangeSelected = this.isRangeSelected(fromIndex, count);
    let endIndex = fromIndex + count;

    if (this.mode === SelectionMode.single && count > 1) {
      return;
    }

    this.setChangeEvents(false);
    for (let i = fromIndex; i < endIndex; i++) {
      this.setIndexSelected(i, !isRangeSelected, false);
    }
    this.setChangeEvents(true);
  }

  private _updateCount(): void {
    this.count = this.getSelectedCount();
    this._change();
  }

  private _change(): void {
    if (this._changeEventSuppressionCount === 0) {
      this._selectedItems = null;

      EventGroup.raise(this, SELECTION_CHANGE);

      if (this._onSelectionChanged) {
        this._onSelectionChanged();
      }
    } else {
      this._hasChanged = true;
    }
  }
}

function defaultGetKey(item: IObjectWithKey, index?: number): string | number {
  return item && item.key ?
    item.key :
    `${index}`;
}
