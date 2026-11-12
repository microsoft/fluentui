import type { JSXElement } from '@fluentui/react-utilities';
import type { DataGridCellBaseState } from './DataGridCell.types';
import { renderTableCell_unstable } from '../TableCell/renderTableCell';

/**
 * Render the final JSX of DataGridCell
 */
export const renderDataGridCell_unstable = (state: DataGridCellBaseState): JSXElement => {
  return renderTableCell_unstable(state);
};
