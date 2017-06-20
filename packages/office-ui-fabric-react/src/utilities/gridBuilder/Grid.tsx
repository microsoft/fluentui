import * as React from 'react';
import { FocusZone } from '../../FocusZone'; import {
  BaseComponent
} from '../../Utilities';
import { IGridProps } from './Grid.Props';


export class Grid extends BaseComponent<IGridProps, null> {

  // used to track the index while
  private _gridIndex;

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

    return this.buildGrid(items, width, onRenderItem, positionInSet, setSize);
  }

  /**
   * Builds a transparent grid representation of the items for
   * the given width (e.g. number of columns)
   * @param items - the items to turn into a grid
   * @param width - the width of the grid (e.g. number of columns)
   * @param onRenderItem - custom renderer for the individual items
   * @param positionInSet - the optional position this grid is in the parent set (index in a menu for example)
   * @param setSize - the optional size of the parent set (size of menu for example)
   * @returns {JSX.Element} - the grid element or null if another grid is already in the process of being built
   */
  private buildGrid(
    items: any[],
    width: number,
    onRenderItem: (item: any, index: number) => JSX.Element,
    positionInSet: number = -1,
    setSize: number = -1): JSX.Element {

    // make sure that we are not in the middle of creating another grid
    // if so, bail out
    if (this._gridIndex !== 0) {
      return null;
    }

    // Create the table/grid
    let gridElement =
      React.createElement(
        'table',
        {
          role: 'grid',
          ariaPosinset: positionInSet,
          ariaSetsize: setSize
        },
        React.createElement(
          'tbody',
          this.buildGridContents(items, width, onRenderItem)
        )
      );

    // reset the index so we will start at the beginning next time around
    this._gridIndex = 0;

    return (
      <FocusZone isCircularNavigation={ true }>
        { gridElement }
      </FocusZone>
    );
  }

  /**
   * Builds the contents of the grid
   * @param items - the items to turn into a grid
   * @param width - the width of the grid (e.g. number of columns)
   * @param onRenderItem - custom renderer for the individual items
   * @returns {JSX.Element[]} - the array of elements that make up the rows for the grid
   */
  private buildGridContents(items: any[], width: number, onRenderItem: (item: any, index: number) => JSX.Element): JSX.Element[] {
    let elements: JSX.Element[] = [];

    // Walk across the children, creating rows if
    // index % width === zero (e.g. we need to create a new row)
    let previousIndex = this._gridIndex;

    while (this._gridIndex < items.length) {
      if (this._gridIndex % width === 0) {
        elements.push(this.buildRow(items, width, onRenderItem));
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
   * @param items - the items to turn into a grid
   * @param width - the width of the grid (e.g. number of columns)
   * @param onRenderItem - custom renderer for the individual items
   * @returns {JSX.Element} - the row element that has at most width cells
   */
  private buildRow(items: any[], width: number, onRenderItem: (item: any, index: number) => JSX.Element): JSX.Element {
    // build the tr/row contents
    return React.createElement('tr', { role: 'row' }, this.buildRowContents(items, width, onRenderItem));
  }

  /**
   * @param items - the items to turn into a grid
   * @param width - the width of the grid (e.g. number of columns)
   * @param onRenderItem - custom renderer for the individual items
   * @returns {JSX.Element[]} - the array of elements that make up the cells for a row of the grid
   */
  private buildRowContents(items: any[], width: number, onRenderItem: (item: any, index: number) => JSX.Element): JSX.Element[] {
    let elements: JSX.Element[] = [];

    // Walk across the children building the cells
    while (this._gridIndex < items.length) {
      elements.push(this.buildCell(items[this._gridIndex], onRenderItem));
      this._gridIndex++;

      // if we are at a row boundry break
      if (this._gridIndex % width === 0) {
        break;
      }
    }

    return elements;
  }

  /**
   *
   * @param items - the items to turn into a grid
   * @param onRenderItem - custom renderer for the individual items
   * @returns {JSX.Element} - the cell elements
   */
  private buildCell(item: any[], onRenderItem: (item: any, index: number) => JSX.Element): JSX.Element {

    // build the column/td/item
    return React.createElement('td', { role: 'presentation' }, onRenderItem(item, this._gridIndex));
  }
}