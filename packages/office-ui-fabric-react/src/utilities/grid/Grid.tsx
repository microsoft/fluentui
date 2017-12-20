import * as React from 'react';
import {
  BaseComponent,
  getId,
  toMatrix,
  customizable,
  classNamesFunction
} from '../../Utilities';
import { FocusZone } from '../../FocusZone';
import { IGrid, IGridProps, IGridStyleProps, IGridStyles } from './Grid.types';
import { getStyles as getBaseStyles } from './Grid.styles';

const getClassNames = classNamesFunction<IGridStyleProps, IGridStyles>();

export class Grid extends BaseComponent<IGridProps, {}> implements IGrid {

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
      setSize,
    } = this.props;

    let getStyles = this.props.getStyles || getBaseStyles;
    const classNames = getClassNames(getStyles!, { theme: this.props.theme! });

    // Array to store the cells in the correct row index
    let rowsOfItems: any[][] = toMatrix(items, columnCount);

    let content = (
      <table
        id={ this._id }
        role={ 'grid' }
        aria-posinset={ positionInSet }
        aria-setsize={ setSize }
        className={ classNames.root }
      >
        <tbody>
          {
            rowsOfItems.map((rows: any[], rowIndex) => {
              return (
                <tr
                  role={ 'row' }
                  key={ this._id + '-' + rowIndex + '-row' }
                >
                  { rows.map((cell, cellIndex) => {
                    return (
                      <td
                        role={ 'presentation' }
                        key={ this._id + '-' + cellIndex + '-cell' }
                        className={ classNames.tableCell }
                      >
                        { onRenderItem(cell, cellIndex) }
                      </td>
                    );
                  }) }
                </tr>
              );
            })
          }
        </tbody>
      </table >
    );

    // Create the table/grid
    return (
      this.props.doNotContainWithinFocusZone ? content : (
        <FocusZone
          isCircularNavigation={ this.props.shouldFocusCircularNavigate }
          className={ classNames.focusedContainer }
          onBlur={ this.props.onBlur }
        >
          { content }
        </FocusZone>
      ));
  }
}