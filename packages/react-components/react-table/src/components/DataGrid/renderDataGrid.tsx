import type { DataGridContextValues, DataGridState } from './DataGrid.types';
import { renderTable_unstable } from '../Table/renderTable';

/**
 * Render the final JSX of DataGrid
 */
export const renderDataGrid_unstable = (state: DataGridState, contextValues: DataGridContextValues) => {
  return renderTable_unstable(state, contextValues);
};
