import type { JSXElement } from '@fluentui/react-utilities';
import type { DataGridHeaderCellBaseState } from './DataGridHeaderCell.types';
import { renderTableHeaderCell_unstable } from '../TableHeaderCell/renderTableHeaderCell';

/**
 * Render the final JSX of DataGridHeaderCell
 */
export const renderDataGridHeaderCell_unstable = (state: DataGridHeaderCellBaseState): JSXElement => {
  return renderTableHeaderCell_unstable(state);
};
