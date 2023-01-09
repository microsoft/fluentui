import * as React from 'react';
import { useDataGrid_unstable } from './useDataGrid';
import { renderDataGrid_unstable } from './renderDataGrid';
import { useDataGridStyles_unstable } from './useDataGridStyles';
import type { DataGridProps } from './DataGrid.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDataGridContextValues_unstable } from './useDataGridContextValues';

/**
 * DataGrid component
 */
export const DataGrid: ForwardRefComponent<DataGridProps> = React.forwardRef((props, ref) => {
  const state = useDataGrid_unstable(props, ref);

  useDataGridStyles_unstable(state);
  return renderDataGrid_unstable(state, useDataGridContextValues_unstable(state));
});

DataGrid.displayName = 'DataGrid';
