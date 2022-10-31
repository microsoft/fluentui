import * as React from 'react';
import type { DataGridHeaderCellProps, DataGridHeaderCellState } from './DataGridHeaderCell.types';
import { useTableHeaderCell_unstable } from '../TableHeaderCell/useTableHeaderCell';

/**
 * Create the state required to render DataGridHeaderCell.
 *
 * The returned state can be modified with hooks such as useDataGridHeaderCellStyles_unstable,
 * before being passed to renderDataGridHeaderCell_unstable.
 *
 * @param props - props from this instance of DataGridHeaderCell
 * @param ref - reference to root HTMLElement of DataGridHeaderCell
 */
export const useDataGridHeaderCell_unstable = (
  props: DataGridHeaderCellProps,
  ref: React.Ref<HTMLElement>,
): DataGridHeaderCellState => {
  return useTableHeaderCell_unstable({ ...props, as: 'div' }, ref);
};
