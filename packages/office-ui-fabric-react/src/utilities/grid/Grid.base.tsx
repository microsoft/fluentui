import * as React from 'react';
import { BaseComponent, getId, toMatrix, classNamesFunction, getNativeProps, htmlElementProperties } from '../../Utilities';
import { FocusZone } from '../../FocusZone';
import { IGrid, IGridProps, IGridStyleProps, IGridStyles } from './Grid.types';

const getClassNames = classNamesFunction<IGridStyleProps, IGridStyles>();

export class GridBase extends BaseComponent<IGridProps, {}> implements IGrid {
  private _id: string;

  constructor(props: IGridProps) {
    super(props);
    this._id = props.id || getId();
  }

  public render(): JSX.Element {
    const props = this.props;
    const { items, columnCount, onRenderItem, ariaPosInSet = props.positionInSet, ariaSetSize = props.setSize, styles } = props;

    const htmlProps = getNativeProps<React.HTMLAttributes<HTMLTableElement>>(this.props, htmlElementProperties, ['onBlur']);

    const classNames = getClassNames(styles!, { theme: this.props.theme! });

    // Array to store the cells in the correct row index
    const rowsOfItems: any[][] = toMatrix(items, columnCount);

    const content = (
      <table aria-posinset={ariaPosInSet} aria-setsize={ariaSetSize} id={this._id} role="grid" {...htmlProps} className={classNames.root}>
        <tbody>
          {rowsOfItems.map((rows: any[], rowIndex: number) => {
            return (
              <tr role={'row'} key={this._id + '-' + rowIndex + '-row'}>
                {rows.map((cell: any, cellIndex: number) => {
                  return (
                    <td role={'presentation'} key={this._id + '-' + cellIndex + '-cell'} className={classNames.tableCell}>
                      {onRenderItem(cell, cellIndex)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );

    // Create the table/grid
    return this.props.doNotContainWithinFocusZone ? (
      content
    ) : (
      <FocusZone
        isCircularNavigation={this.props.shouldFocusCircularNavigate}
        className={classNames.focusedContainer}
        onBlur={this.props.onBlur}
      >
        {content}
      </FocusZone>
    );
  }
}
