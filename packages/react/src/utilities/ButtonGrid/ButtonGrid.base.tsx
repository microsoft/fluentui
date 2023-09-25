import * as React from 'react';
import { toMatrix, classNamesFunction, getNativeProps, htmlElementProperties } from '../../Utilities';
import { FocusZone } from '../../FocusZone';
import { useId } from '@fluentui/react-hooks';
import type { IButtonGridProps, IButtonGridStyleProps, IButtonGridStyles } from './ButtonGrid.types';

const getClassNames = classNamesFunction<IButtonGridStyleProps, IButtonGridStyles>();

export const ButtonGridBase: React.FunctionComponent<IButtonGridProps> = React.forwardRef<
  HTMLElement,
  IButtonGridProps
>((props, forwardedRef) => {
  const id = useId(undefined, props.id);

  const {
    items,
    columnCount,
    onRenderItem,
    isSemanticRadio,
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
  const rowsOfItems: any[][] = toMatrix(items, columnCount);

  const content = (
    <table
      aria-posinset={ariaPosInSet}
      aria-setsize={ariaSetSize}
      id={id}
      role={isSemanticRadio ? 'radiogroup' : 'grid'}
      {...htmlProps}
      className={classNames.root}
    >
      <tbody role={isSemanticRadio ? 'presentation' : 'rowgroup'}>
        {rowsOfItems.map((rows, rowIndex) => {
          return (
            <tr role={isSemanticRadio ? 'presentation' : 'row'} key={rowIndex}>
              {rows.map((cell, cellIndex: number) => {
                return (
                  <td role="presentation" key={cellIndex + '-cell'} className={classNames.tableCell}>
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

  return doNotContainWithinFocusZone ? (
    content
  ) : (
    <FocusZone
      elementRef={forwardedRef}
      isCircularNavigation={props.shouldFocusCircularNavigate}
      className={classNames.focusedContainer}
      onBlur={props.onBlur}
    >
      {content}
    </FocusZone>
  );
});
