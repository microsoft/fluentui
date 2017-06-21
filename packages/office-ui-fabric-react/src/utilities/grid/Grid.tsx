import * as React from 'react';
import { FocusZone } from '../../FocusZone';
import { BaseComponent } from '../../Utilities';
import { IGridProps } from './Grid.Props';
// import * as stylesImport from '../../utilities/Grid';
// const styles: any = stylesImport;

export interface IGridState {

}

export class Grid extends BaseComponent<IGridProps, IGridState> {

  // used to track the index while
  private _gridIndex;

  private _id;

  constructor(props: IGridProps) {
    super(props);
    this._gridIndex = 0;
  }

  public render() {
    let {
      items,
      width,
      onRenderItem,
      positionInSet,
      setSize
    } = this.props;

    // reset the index so we will start at the beginning
    this._gridIndex = 0;

    // Create the table/grid
    return (
      <table
        role={ 'grid' }
        aria-posinset={ positionInSet }
        aria-setsize={ setSize }
        /*className={ styles.table }*/
        style={ { padding: '2px', outline: 'none' } }>
        <tbody>
          { this._buildGridContents() }
        </tbody>
      </table>
    );
  }

  /**
   * Builds the contents of the grid
   * @returns {JSX.Element[]} - the array of elements that make up the rows for the grid
   */
  private _buildGridContents(): JSX.Element[] {
    let {
      items,
      width
    } = this.props;
    let elements: JSX.Element[] = [];

    // Walk across the children, creating rows if
    // index % width === zero (e.g. we need to create a new row)
    let previousIndex = this._gridIndex;

    while (this._gridIndex < items.length) {
      if (this._gridIndex % width === 0) {
        elements.push(this._buildRow());
      }

      // Make sure we do not get into an infinite loop
      if (this._gridIndex === previousIndex) {
        break;
      }
    }

    return elements;
  }

  /**
   * Builds a row for the grid
   * @returns {JSX.Element} - the row element that has at most width cells
   */
  private _buildRow(): JSX.Element {
    // build the tr/row contents
    return (
      <tr
        role={ 'row' }
        key={ this._gridIndex + '-row' }>
        { this._buildRowContents() }
      </tr>
    );
  }

  /**
   * builds the contents of the row
   * @returns {JSX.Element[]} - the array of elements that make up the cells for a row of the grid
   */
  private _buildRowContents(): JSX.Element[] {
    let {
      items,
      width
    } = this.props;
    let elements: JSX.Element[] = [];

    // Walk across the children building the cells
    while (this._gridIndex < items.length) {
      elements.push(this._buildCell(items[this._gridIndex]));
      this._gridIndex++;

      // if we are at a row boundry break
      if (this._gridIndex % width === 0) {
        break;
      }
    }

    return elements;
  }

  /**
   * builds a cell
   * NOTE: Make sure your items have role="gridcell"!
   * @returns {JSX.Element} - the cell elements
   */
  private _buildCell(item: any): JSX.Element {
    let {
      onRenderItem
    } = this.props;

    // build the column/td/item
    return (
      <td
        role={ 'presentation' }
        key={ this._gridIndex + '-cell' }
        /*className={ styles.cell }*/
        style={ { padding: '0px' } }>
        { onRenderItem(item, this._gridIndex) }
      </td>
    );
  }
}