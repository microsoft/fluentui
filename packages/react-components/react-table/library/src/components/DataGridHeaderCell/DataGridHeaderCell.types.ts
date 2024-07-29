import { DistributiveOmit } from '@fluentui/react-utilities';
import {
  TableHeaderCellProps,
  TableHeaderCellSlots,
  TableHeaderCellState,
} from '../TableHeaderCell/TableHeaderCell.types';

export type DataGridHeaderCellSlots = TableHeaderCellSlots;

/**
 * DataGridHeaderCell Props
 */
export type DataGridHeaderCellProps = DistributiveOmit<TableHeaderCellProps, 'sortable'>;

/**
 * State used in rendering DataGridHeaderCell
 */
export type DataGridHeaderCellState = TableHeaderCellState;
