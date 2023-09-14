import type { DataGridCellState } from './DataGridCell.types';
import { renderTableCell_unstable } from '../TableCell/renderTableCell';

/**
 * Render the final JSX of DataGridCell
 */
export const renderDataGridCell_unstable = (state: DataGridCellState) => {
  return renderTableCell_unstable(state);
};
