import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DataGridBaseState, DataGridContextValues } from './DataGrid.types';
import { renderTable_unstable } from '../Table/renderTable';
import { DataGridContextProvider } from '../../contexts/dataGridContext';

/**
 * Render the final JSX of DataGrid
 */

export const renderDataGrid_unstable = (state: DataGridBaseState, contextValues: DataGridContextValues): JSXElement => {
  return (
    <DataGridContextProvider value={contextValues.dataGrid}>
      {renderTable_unstable(state, contextValues)}
    </DataGridContextProvider>
  );
};
