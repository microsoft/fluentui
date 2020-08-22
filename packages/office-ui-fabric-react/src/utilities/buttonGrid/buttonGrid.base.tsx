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
import { IButtonGrid, IButtonGridProps, IButtonGridStyleProps, IButtonGridStyles } from './buttonGrid.types';

const getClassNames = classNamesFunction<IButtonGridStyleProps, IButtonGridStyles>();

export class ButtonGridBase extends React.Component<IButtonGridProps, {}> implements IButtonGrid {
  private _id: string;

  constructor(props: IButtonGridProps) {
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

      /* eslint-disable deprecation/deprecation */
      ariaPosInSet = props.positionInSet,
      ariaSetSize = props.setSize,
      /* eslint-enable deprecation/deprecation */

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
          {rowsOfItems.map((rows: any[], rowIndex: number) => {
            return (
              <tr role={'row'} key={this._id + '-' + rowIndex + '-row'}>
                {rows.map((cell: any, cellIndex: number) => {
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

/**
 * @deprecated - use ButtonGridBase instead
 */
export const GridBase = ButtonGridBase;
