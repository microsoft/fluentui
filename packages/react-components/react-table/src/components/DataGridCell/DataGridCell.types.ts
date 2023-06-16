import { TableCellProps, TableCellSlots, TableCellState } from '../TableCell/TableCell.types';

export type DataGridCellSlots = TableCellSlots;

/**
 * DataGridCell Props
 */
export type DataGridCellProps = TableCellProps & {
  /**
   * Used when there are nested focusble elements inside a focusable cell
   * - `group`: Enter keypress moves focus inside the cell, focus is trapped inside the cell until Escape keypress
   */
  focusMode?: 'group';
};

/**
 * State used in rendering DataGridCell
 */
export type DataGridCellState = TableCellState;
