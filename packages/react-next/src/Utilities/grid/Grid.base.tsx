import * as React from 'react';
import {
  getId,
  toMatrix,
  classNamesFunction,
  getNativeProps,
  htmlElementProperties,
  initializeComponentRef,
} from '../../Utilities';
import { FocusZone } from '../../FocusZone';
import { IGrid, IGridProps, IGridStyleProps, IGridStyles } from './Grid.types';

const getClassNames = classNamesFunction<IGridStyleProps, IGridStyles>();

export class GridBase extends React.Component<IGridProps, {}> implements IGrid {
  private _id: string;

  constructor(props: IGridProps) {
    super(props);

    initializeComponentRef(this);
    this._id = props.id || getId();
  }

  public render(): JSX.Element {
    const props = this.props;
    const {
      items,
      columnCount,
      onRenderItem,
      // eslint-disable-next-line deprecation/deprecation
      ariaPosInSet = props.positionInSet,
      // eslint-disable-next-line deprecation/deprecation
      ariaSetSize = props.setSize,
      styles,
      doNotContainWithinFocusZone,
    } = props;

    const htmlProps = getNativeProps<React.HTMLAttributes<HTMLTableElement>>(
      this.props,
      htmlElementProperties,
      // avoid applying onBlur on the table if it's being used in the FocusZone
      doNotContainWithinFocusZone ? [] : ['onBlur'],
    );

    const classNames = getClassNames(styles!, { theme: this.props.theme! });

    // Array to store the cells in the correct row index
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rowsOfItems: any[][] = toMatrix(items, columnCount);

    const content = (
      <table
        aria-posinset={ariaPosInSet}
        aria-setsize={ariaSetSize}
        id={this._id}
        role="grid"
        {...htmlProps}
        className={classNames.root}
      >
        <tbody>
          {rowsOfItems.map((rows: [], rowIndex: number) => {
            return (
              <tr role={'row'} key={this._id + '-' + rowIndex + '-row'}>
                {rows.map((cell, cellIndex: number) => {
                  return (
                    <td
                      role={'presentation'}
                      key={this._id + '-' + cellIndex + '-cell'}
                      className={classNames.tableCell}
                    >
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
    return doNotContainWithinFocusZone ? (
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
