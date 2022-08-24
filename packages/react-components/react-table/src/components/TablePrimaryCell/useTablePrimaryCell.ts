import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import type { TablePrimaryCellProps, TablePrimaryCellState } from './TablePrimaryCell.types';
import { useTableCell_unstable } from '../TableCell/useTableCell';

/**
 * Create the state required to render TablePrimaryCell.
 *
 * The returned state can be modified with hooks such as useTablePrimaryCellStyles_unstable,
 * before being passed to renderTablePrimaryCell_unstable.
 *
 * @param props - props from this instance of TablePrimaryCell
 * @param ref - reference to root HTMLElement of TablePrimaryCell
 */
export const useTablePrimaryCell_unstable = (
  props: TablePrimaryCellProps,
  ref: React.Ref<HTMLElement>,
): TablePrimaryCellState => {
  const tableCellState = useTableCell_unstable(props, ref);

  return {
    ...tableCellState,
    components: {
      ...tableCellState.components,
      main: 'span',
      secondary: 'span',
      wrapper: 'div',
    },
    main: resolveShorthand(props.secondary),
    secondary: resolveShorthand(props.main),
    wrapper: resolveShorthand(props.wrapper, { required: !!props.main || !!props.secondary }),
  };
};
