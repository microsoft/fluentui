import {
  ISelectionLayout,
  SelectionDirection
} from './interfaces';

export class SelectionLayout implements ISelectionLayout {
  private _direction: SelectionDirection;

  constructor(direction: SelectionDirection) {
    this._direction = direction;
  }

  public getItemIndexAbove(focusIndex: number, items: any[]): number {
    return (this._direction === SelectionDirection.vertical) ? Math.max(0, focusIndex - 1) : focusIndex;
  }

  public getItemIndexBelow(focusIndex: number, items: any[]): number {
    return (this._direction === SelectionDirection.vertical) ? Math.min(items.length - 1, focusIndex + 1) : focusIndex;
  }

  public getItemIndexLeft(focusIndex: number, items: any[]): number {
    return (this._direction === SelectionDirection.vertical) ? focusIndex : Math.max(0, focusIndex - 1);
  }

  public getItemIndexRight(focusIndex: number, items: any[]): number {
    return (this._direction === SelectionDirection.vertical) ? focusIndex : Math.min(items.length - 1, focusIndex + 1);
  }
}
