import ISelectionLayout from './ISelectionLayout';

export enum SelectionDirection {
  horizontal = 0,
  vertical = 1
}

export default class SelectionLayout implements ISelectionLayout {
  private _items: any[];
  private _direction: SelectionDirection;

  constructor(items: any[], direction: SelectionDirection) {
    this._items = items;
    this._direction = direction;
  }

  public getItemIndexAbove(focusIndex: number): number {
    return (this._direction === SelectionDirection.vertical) ? Math.max(0, focusIndex - 1) : focusIndex;
  }

  public getItemIndexBelow(focusIndex: number): number {
    return (this._direction === SelectionDirection.vertical) ? Math.min(this._items.length - 1, focusIndex + 1) : focusIndex;
  }

  public getItemIndexLeft(focusIndex: number): number {
    return (this._direction === SelectionDirection.vertical) ? focusIndex : Math.max(0, focusIndex - 1);
  }

  public getItemIndexRight(focusIndex: number): number {
    return (this._direction === SelectionDirection.vertical) ? focusIndex : Math.min(this._items.length - 1, focusIndex + 1);
  }
}
