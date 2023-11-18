import type { DataGridSelectionCellState } from './DataGridSelectionCell.types';
import { renderTableSelectionCell_unstable } from '../TableSelectionCell/renderTableSelectionCell';

/**
 * Render the final JSX of DataGridSelectionCell
 */
export const renderDataGridSelectionCell_unstable = (state: DataGridSelectionCellState) => {
  return renderTableSelectionCell_unstable(state);
};
