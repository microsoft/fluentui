import {
  TableHeaderCellProps,
  TableHeaderCellSlots,
  TableHeaderCellState,
} from '../TableHeaderCell/TableHeaderCell.types';

export type DataGridHeaderCellSlots = TableHeaderCellSlots;

/**
 * DataGridHeaderCell Props
 */
export type DataGridHeaderCellProps = TableHeaderCellProps & {
  /**
   * @default true, user can disable the default header button click trigger column sort by setting this flag false.
   */
  clickTriggerSort?: boolean;
};

/**
 * State used in rendering DataGridHeaderCell
 */
export type DataGridHeaderCellState = TableHeaderCellState;
