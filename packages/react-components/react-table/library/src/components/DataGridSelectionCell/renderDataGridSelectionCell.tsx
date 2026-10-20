import type { JSXElement } from '@fluentui/react-utilities';
import type { DataGridSelectionCellBaseState, DataGridSelectionCellState } from './DataGridSelectionCell.types';
import { renderTableSelectionCell_unstable } from '../TableSelectionCell/renderTableSelectionCell';

/**
 * Render the final JSX of DataGridSelectionCell
 */
export const renderDataGridSelectionCell_unstable = (
  state: DataGridSelectionCellState | DataGridSelectionCellBaseState,
): JSXElement => {
  return renderTableSelectionCell_unstable(state);
};
