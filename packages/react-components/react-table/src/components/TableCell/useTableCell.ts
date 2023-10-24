import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TableCellProps, TableCellState } from './TableCell.types';
import { useTableContext } from '../../contexts/tableContext';

/**
 * Create the state required to render TableCell.
 *
 * The returned state can be modified with hooks such as useTableCellStyles_unstable,
 * before being passed to renderTableCell_unstable.
 *
 * @param props - props from this instance of TableCell
 * @param ref - reference to root HTMLElement of TableCell
 */
export const useTableCell_unstable = (props: TableCellProps, ref: React.Ref<HTMLElement>): TableCellState => {
  const { noNativeElements, size } = useTableContext();

  const rootComponent = props.as ?? noNativeElements ? 'div' : 'td';

  return {
    components: {
      root: rootComponent,
    },
    root: slot.always(
      getIntrinsicElementProps(rootComponent, {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        role: rootComponent === 'div' ? 'cell' : undefined,
        ...props,
      }),
      { elementType: rootComponent },
    ),
    noNativeElements,
    size,
  };
};
