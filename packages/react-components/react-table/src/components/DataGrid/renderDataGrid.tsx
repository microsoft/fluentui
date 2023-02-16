import * as React from 'react';
import type { DataGridContextValues, DataGridState } from './DataGrid.types';
import { renderTable_unstable } from '../Table/renderTable';
import { DataGridContextProvider } from '../../contexts/dataGridContext';
import { KeyboardNavigationContextProvider } from '../../contexts/keyboardNavigationContext';

/**
 * Render the final JSX of DataGrid
 */
export const renderDataGrid_unstable = (state: DataGridState, contextValues: DataGridContextValues) => {
  return (
    <DataGridContextProvider value={contextValues.dataGrid}>
      <KeyboardNavigationContextProvider value={contextValues.keyboardNavigationContext}>
        {renderTable_unstable(state, contextValues)}
      </KeyboardNavigationContextProvider>
    </DataGridContextProvider>
  );
};
