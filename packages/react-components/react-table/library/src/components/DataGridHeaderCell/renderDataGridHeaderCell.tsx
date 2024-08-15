import type { DataGridHeaderCellState } from './DataGridHeaderCell.types';
import { renderTableHeaderCell_unstable } from '../TableHeaderCell/renderTableHeaderCell';

/**
 * Render the final JSX of DataGridHeaderCell
 */
export const renderDataGridHeaderCell_unstable = (state: DataGridHeaderCellState) => {
  return renderTableHeaderCell_unstable(state);
};
