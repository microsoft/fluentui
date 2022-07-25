import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { TableCellProps, TableCellState } from './TableCell.types';

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
  return {
    components: {
      root: 'td',
      media: 'span',
    },
    media: resolveShorthand(props.media),
    root: getNativeElementProps(props.as ?? 'td', {
      ref,
      ...props,
    }),
  };
};
