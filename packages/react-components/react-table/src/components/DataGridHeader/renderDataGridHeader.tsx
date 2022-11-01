import { renderTableHeader_unstable } from '../TableHeader/renderTableHeader';
import type { DataGridHeaderState } from './DataGridHeader.types';

/**
 * Render the final JSX of DataGridHeader
 */
export const renderDataGridHeader_unstable = (state: DataGridHeaderState) => {
  return renderTableHeader_unstable(state);
};
