import {
  TableHeaderCellProps,
  TableHeaderCellSlots,
  TableHeaderCellState,
} from '../TableHeaderCell/TableHeaderCell.types';

import { DataGridCellProps } from '../DataGridCell/DataGridCell.types';

export type DataGridHeaderCellSlots = TableHeaderCellSlots;

/**
 * DataGridHeaderCell Props
 */
export type DataGridHeaderCellProps = Omit<TableHeaderCellProps, 'sortable'> & Pick<DataGridCellProps, 'focusMode'>;

/**
 * State used in rendering DataGridHeaderCell
 */
export type DataGridHeaderCellState = TableHeaderCellState;
