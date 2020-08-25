import * as React from 'react';
import { toMatrix, classNamesFunction, getNativeProps, htmlElementProperties } from '../../Utilities';
import { FocusZone } from '../../FocusZone';
import { IGridProps, IGridStyleProps, IGridStyles } from './Grid.types';
import { useId } from '@uifabric/react-hooks';
const getClassNames = classNamesFunction<IGridStyleProps, IGridStyles>();

export const GridBase = React.forwardRef<HTMLElement, IGridProps>((props, ref) => {
  const id = useId(undefined, props.id);

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
    props,
    htmlElementProperties,
    // avoid applying onBlur on the table if it's being used in the FocusZone
    doNotContainWithinFocusZone ? [] : ['onBlur'],
  );

  const classNames = getClassNames(styles!, { theme: props.theme! });

  // Array to store the cells in the correct row index

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowsOfItems: any[][] = toMatrix(items, columnCount);

  const content = (
    <table
      aria-posinset={ariaPosInSet}
      aria-setsize={ariaSetSize}
      id={id}
      role="grid"
      {...htmlProps}
      className={classNames.root}
    >
      <tbody>
        {rowsOfItems.map((rows: [], rowIndex: number) => {
          return (
            <tr role={'row'} key={rowIndex + '-row'}>
              {rows.map((cell, cellIndex: number) => {
                return (
                  <td role={'presentation'} key={cellIndex + '-cell'} className={classNames.tableCell}>
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
      elementRef={ref}
      isCircularNavigation={props.shouldFocusCircularNavigate}
      className={classNames.focusedContainer}
      onBlur={props.onBlur}
    >
      {content}
    </FocusZone>
  );
});
