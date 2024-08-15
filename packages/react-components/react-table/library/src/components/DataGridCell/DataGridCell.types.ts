import { TableCellProps, TableCellSlots, TableCellState } from '../TableCell/TableCell.types';

export type DataGridCellSlots = TableCellSlots;

/**
 * Used when there are nested focusble elements inside a focusable cell
 * - `group`: Enter keypress moves focus inside the cell, focus is trapped inside the cell until Escape keypress
 * - `cell`: The cell is focusable - if there are focusable elements in the cell use `group`
 * - `none`: The cell is not focusable
 */
export type DataGridCellFocusMode = 'group' | 'none' | 'cell';

/**
 * DataGridCell Props
 */
export type DataGridCellProps = TableCellProps & {
  /**
   * Used when there are nested focusble elements inside a focusable cell
   * - `group`: Enter keypress moves focus inside the cell, focus is trapped inside the cell until Escape keypress
   * - `cell`: The cell is focusable - if there are focusable elements in the cell use `group`
   * - `none`: The cell is not focusable
   * @default cell
   */
  focusMode?: DataGridCellFocusMode;
};

/**
 * State used in rendering DataGridCell
 */
export type DataGridCellState = TableCellState;
