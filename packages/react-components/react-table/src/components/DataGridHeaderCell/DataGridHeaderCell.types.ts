import {
  TableHeaderCellProps,
  TableHeaderCellSlots,
  TableHeaderCellState,
} from '../TableHeaderCell/TableHeaderCell.types';

export type DataGridHeaderCellSlots = TableHeaderCellSlots;

/**
 * DataGridHeaderCell Props
 */
export type DataGridHeaderCellProps = Omit<TableHeaderCellProps, 'sortable'>;

/**
 * State used in rendering DataGridHeaderCell
 */
export type DataGridHeaderCellState = TableHeaderCellState;
