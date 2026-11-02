import type { JSXElement } from '@fluentui/react-utilities';
import type { DataGridHeaderCellState } from './DataGridHeaderCell.types';
import { renderTableHeaderCell_unstable } from '../TableHeaderCell/renderTableHeaderCell';

/**
 * Render the final JSX of DataGridHeaderCell
 */
export const renderDataGridHeaderCell_unstable = (state: DataGridHeaderCellState): JSXElement => {
  return renderTableHeaderCell_unstable(state);
};
