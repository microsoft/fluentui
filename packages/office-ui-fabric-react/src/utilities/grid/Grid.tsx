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
    let rowsOfItems: any[][] = this._toMatrix(items, columnCount);

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

  /**
   * Convert the given array to a matrix with columnCount number
   * of columns
   * @param items - The array to convert
   * @param columnCount - The number of columns for the resulting matrix
   * @returns {any[][]} - A matrix of items
   */
  private _toMatrix<T>(items: T[], columnCount: number): T[][] {
    return items.reduce((rows, currentValue, index) => {
      if (index % columnCount === 0) {
        rows.push([currentValue]);
      } else {
        rows[rows.length - 1].push(currentValue);
      }
      return rows;
    }, [] as T[][]);
  }
}