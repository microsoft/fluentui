import * as React from 'react';
import {
  BaseComponent,
  getId,
  toMatrix
} from '../../Utilities';
import { FocusZone } from '../../FocusZone';
import { IGridProps } from './Grid.Props';

export class Grid extends BaseComponent<IGridProps, {}> {

  private _id: string;

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
    let rowsOfItems: any[][] = toMatrix(items, columnCount);

    // Create the table/grid
    return (
      <FocusZone
        isCircularNavigation={ this.props.shouldFocusCircularNavigate }
        className={ this.props.containerClassName }
        onBlur={ this.props.onBlur }
      >
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
      </FocusZone>
    );
  }
}