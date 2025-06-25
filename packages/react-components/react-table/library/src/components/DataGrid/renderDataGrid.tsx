import * as React from 'react';
import type { DataGridContextValues, DataGridState } from './DataGrid.types';
import { renderTable_unstable } from '../Table/renderTable';
import { DataGridContextProvider } from '../../contexts/dataGridContext';

/**
 * Render the final JSX of DataGrid
 */

export const renderDataGrid_unstable = (
  state: DataGridState,
  contextValues: DataGridContextValues,
): // eslint-disable-next-line @typescript-eslint/no-deprecated
JSX.Element => {
  return (
    <DataGridContextProvider value={contextValues.dataGrid}>
      {renderTable_unstable(state, contextValues)}
    </DataGridContextProvider>
  );
};
