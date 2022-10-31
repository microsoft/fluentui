import type { DataGridRowState } from './DataGridRow.types';
import { renderTableRow_unstable } from '../TableRow/renderTableRow';

/**
 * Render the final JSX of DataGridRow
 */
export const renderDataGridRow_unstable = (state: DataGridRowState) => {
  return renderTableRow_unstable(state);
};
