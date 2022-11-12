import type { DataGridBodyState } from './DataGridBody.types';
import { renderTableBody_unstable } from '../TableBody/renderTableBody';

/**
 * Render the final JSX of DataGridBody
 */
export const renderDataGridBody_unstable = (state: DataGridBodyState) => {
  return renderTableBody_unstable(state);
};
