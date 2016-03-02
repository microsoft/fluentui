import { IObjectWithKey, ISelection, SELECTION_CHANGE } from './ISelection';
import EventGroup from '../eventGroup/EventGroup';

export class Selection implements ISelection {
  public count: number;

  private _items: IObjectWithKey[];
  private _isAllSelected: boolean;
  private _exemptedKeys: { [ key: string ]: boolean };
  private _exemptedCount: number;
  private _keyToIndexMap: { [ key: string ]: number };
  private _selectedItems: IObjectWithKey[];
  private _anchoredIndex: number;
  private _focusedIndex: number;
  private _onSelectionChanged: () => void;
  private _areChangeEventsEnabled: boolean;
  private _hasChanged: boolean;

  constructor(onSelectionChanged?: () => void) {
    this._exemptedCount = 0;
    this._anchoredIndex = 0;
    this._focusedIndex = 0;
    this.setItems([], true);

    this._areChangeEventsEnabled = true;
    this._onSelectionChanged = onSelectionChanged;
  }

  public setChangeEvents(isEnabled: boolean, suppressChange?: boolean) {
    this._areChangeEventsEnabled = isEnabled;

    if (isEnabled && this._areChangeEventsEnabled && this._hasChanged) {
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
    let newKeyToIndexMap: { [ key: string ]: number } = {};

    // Build lookup table for quick selection evaluation.
    items.forEach((item, index) => {
      if (item) {
        newKeyToIndexMap[item.key] = index;
      }
    });

    if (shouldClear) {
      this.setAllSelected(false);
      this._focusedIndex = 0;
    } else {
      if (this._focusedIndex >= 0 && this._items) {
        let lastFocusedItem = this._items[this._focusedIndex];
        let lastFocusedKey = lastFocusedItem ? lastFocusedItem.key : '';

        if (lastFocusedKey) {
          this._focusedIndex = newKeyToIndexMap[lastFocusedKey];
        } else {
          this._focusedIndex = 0;
        }
      }
      // TODO: re-evaluate selection
    }

    this._keyToIndexMap = newKeyToIndexMap;
    this._items = items || [];

    this._change();
  }

  public getItems(): IObjectWithKey[] {
    return this._items;
  }

  public getSelection(): IObjectWithKey[] {
    if (!this._selectedItems) {
      this._selectedItems = [];

      this._items.forEach((item, index) => {
        let key = item ? item.key : null;
        let isExempt = !!this._exemptedKeys[key];

        if ((!key && this._isAllSelected) ||
          (key && this._isAllSelected && !isExempt) ||
          (key && !this._isAllSelected && isExempt)) {
            this._selectedItems.push(item);
          }
      });
    }

    return this._selectedItems;
  }

  public getSelectedCount(): number {
    return this._isAllSelected ? ( this._items.length - this._exemptedCount) : (this._exemptedCount);
  }

  public getFocusedIndex(): number {
    return (this._items && this._items.length) ? (this._focusedIndex || 0) : -1;
  }

  public getFocusedKey(): string {
    let focusedItem = this._items[this.getFocusedIndex()];

    return focusedItem ? focusedItem.key : null;
  }

  public isAllSelected(): boolean {
    return (
      (this.count > 0) &&
      (this._isAllSelected && this._exemptedCount === 0) ||
      (!this._isAllSelected && this._exemptedCount === this._items.length));
  }

  public isKeySelected(key: string): boolean {
    return !!(
      (this.count > 0) &&
      (this._isAllSelected && !this._exemptedKeys[key]) ||
      (!this._isAllSelected && this._exemptedKeys[key]));
  }

  public isIndexSelected(index: number): boolean {
    let item = this._items[index];

    return this.isKeySelected(item ? item.key : null);
  }

  public setAllSelected(isAllSelected: boolean) {
    this._exemptedKeys = {};
    this._exemptedCount = 0;
    this._isAllSelected = isAllSelected;
    this._updateCount();
  }

  public setKeySelected(key: string, isSelected: boolean, shouldFocus: boolean, shouldAnchor: boolean) {
    let isExempt = this._exemptedKeys[key];
    let index = this._keyToIndexMap[key];

    // Determine if we need to remove the exemption.
    if (isExempt && (
      (isSelected && this._isAllSelected) ||
      (!isSelected && !this._isAllSelected)
    )) {
      delete this._exemptedKeys[key];
      this._exemptedCount--;
    }

    // Determine if we need to add the exemption.
    if (!isExempt && (
      (isSelected && !this._isAllSelected) ||
      (!isSelected && this._isAllSelected)
    )) {
      this._exemptedKeys[key] = true;
      this._exemptedCount++;
    }

    if (shouldFocus) {
      this._focusedIndex = index;
    }

    if (shouldAnchor) {
      this._anchoredIndex = index;
    }

    this._updateCount();
  }

  public setIndexSelected(index: number, isSelected: boolean, shouldFocus: boolean, shouldAnchor: boolean) {
    // Clamp the index.
    index = Math.min(Math.max(0, index), this._items.length - 1);

    let item = this._items[index];
    let key = item ? item.key : null;

    this.setKeySelected(key, isSelected, shouldFocus, shouldAnchor);
  }

  public setKeyFocused(key: string) {
    this.setIndexFocused(this._keyToIndexMap[key]);
  }

  public setIndexFocused(index: number) {
    if (index !== undefined && index >= 0 && index < this._items.length) {
      this._focusedIndex = index;
      this._updateCount();
    }
  }

  public selectToKey(key: string) {
    this.selectToIndex(this._keyToIndexMap[key]);
  }

  public selectToIndex(index: number) {
    let anchorIndex = this._anchoredIndex || 0;
    let startIndex = Math.min(index, anchorIndex);
    let endIndex = Math.max(index, anchorIndex);
    let areChangeEventsEnabled = this._areChangeEventsEnabled;

    this.setChangeEvents(false);

    for (; startIndex <= endIndex; startIndex++) {
      this.setIndexSelected(startIndex, true, index === startIndex, false);
    }

    this.setChangeEvents(areChangeEventsEnabled);
  }

  public toggleAllSelected() {
    this.setAllSelected(!this.isAllSelected());
  }

  public toggleKeySelected(key: string) {
    this.setKeySelected(key, !this.isKeySelected(key), true, true);
  }

  public toggleIndexSelected(index: number) {
    this.setIndexSelected(index, !this.isIndexSelected(index), true, true);
  }

  private _updateCount() {
    this.count = this.getSelectedCount();
    this._change();
  }

  private _change() {
    if (this._areChangeEventsEnabled) {

      EventGroup.raise(this, SELECTION_CHANGE);

      if (this._onSelectionChanged) {
        this._onSelectionChanged();
      }
    } else {
      this._hasChanged = true;
    }
  }

}

export default Selection;