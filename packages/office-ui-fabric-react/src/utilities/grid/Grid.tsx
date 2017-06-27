import * as React from 'react';
import { BaseComponent, getId } from '../../Utilities';
import { IGridProps } from './Grid.Props';

export class Grid extends BaseComponent<IGridProps, {}> {

  private _id;

  constructor(props: IGridProps) {
    super(props);
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

    // Array to store the cells in the correct row index
    let rowsOfItems: any[][] = [];

    items.map((item, index) => {

      // Get the row index to place cells into
      let rowIndex = Math.floor(index / columnCount);

      // Create a new array at rowIndex if one
      // does not exist yet
      if (!rowsOfItems[rowIndex]) {
        rowsOfItems[rowIndex] = [];
      }

      rowsOfItems[rowIndex].push(item);
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
            rowsOfItems.map((rows: any[], rowIndex) => {
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