import * as React from 'react';
import type { DataGridCellProps, DataGridCellState } from './DataGridCell.types';
import { useTableCell_unstable } from '../TableCell/useTableCell';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';

/**
 * Create the state required to render DataGridCell.
 *
 * The returned state can be modified with hooks such as useDataGridCellStyles_unstable,
 * before being passed to renderDataGridCell_unstable.
 *
 * @param props - props from this instance of DataGridCell
 * @param ref - reference to root HTMLElement of DataGridCell
 */
export const useDataGridCell_unstable = (props: DataGridCellProps, ref: React.Ref<HTMLElement>): DataGridCellState => {
  const tabbable = useDataGridContext_unstable(ctx => ctx.focusMode === 'cell');
  return useTableCell_unstable({ as: 'div', role: 'gridcell', tabIndex: tabbable ? 0 : undefined, ...props }, ref);
};
