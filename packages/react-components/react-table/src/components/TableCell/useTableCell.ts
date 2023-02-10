import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
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
    root: getNativeElementProps(rootComponent, {
      ref,
      role: rootComponent === 'div' ? 'cell' : undefined,
      ...props,
    }),
    noNativeElements,
    size,
  };
};
