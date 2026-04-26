'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DataGridProps } from './DataGrid.types';
import { useDataGrid, useDataGridContextValues } from './useDataGrid';
import { renderDataGrid } from './renderDataGrid';

export const DataGrid: ForwardRefComponent<DataGridProps> = React.forwardRef((props, ref) => {
  const state = useDataGrid(props, ref);
  const contextValues = useDataGridContextValues(state);
  return renderDataGrid(state, contextValues);
});
DataGrid.displayName = 'DataGrid';
