import * as React from 'react';
import { BaseComponent, getId } from '../../Utilities';
import { IGridProps } from './Grid.Props';

export class Grid extends BaseComponent<IGridProps, {}> {

  // Used to track the index of item we are on while building grid
  private _gridIndex;

  private _id;

  private _items: any[][];

  constructor(props: IGridProps) {
    super(props);
    this._items = [];
    this._id = getId();
  }

  public render() {
    let {
      items,
      columnCount,
      onRenderItem,
      positionInSet,
      setSize
    } = this.props;

    // Reset the items array so we will start fresh
    this._items = [];

    items.map((item, index) => {

      // Get the row index to place cells into
      let rowIndex = Math.floor(index / columnCount);

      // Create a new array at rowIndex if one
      // does not exist yet
      if (!this._items[rowIndex]) {
        this._items[rowIndex] = [];
      }

      this._items[rowIndex].push(item);
    });

    // Create the table/grid
    return (
      <table
        id={ this._id }
        role={ 'grid' }
        aria-posinset={ positionInSet }
        aria-setsize={ setSize }
        style={ { padding: '2px', outline: 'none' } }>
        <tbody>
          {
            this._items.map((rows: any[], rowIndex) => {
              return (
                <tr
                  role={ 'row' }
                  key={ this._id + '-' + rowIndex + '-row' }>
                  { rows.map((cell) => {
                    return (
                      <td
                        role={ 'presentation' }
                        key={ this._id + '-' + cell.index + '-cell' }
                        style={ { padding: '0px' } }>
                        { onRenderItem(cell, cell.index) }
                      </td>
                    );
                  }) }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}