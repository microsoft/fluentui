import * as React from 'react';
import { useDataGrid_unstable } from './useDataGrid';
import { renderDataGrid_unstable } from './renderDataGrid';
import { useDataGridStyles_unstable } from './useDataGridStyles.styles';
import type { DataGridProps } from './DataGrid.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDataGridContextValues_unstable } from './useDataGridContextValues';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * DataGrid component
 */
export const DataGrid: ForwardRefComponent<DataGridProps> = React.forwardRef((props, ref) => {
  const state = useDataGrid_unstable(props, ref);

  useDataGridStyles_unstable(state);

  useCustomStyleHook_unstable('useDataGridStyles_unstable')(state);

  return renderDataGrid_unstable(state, useDataGridContextValues_unstable(state));
});

DataGrid.displayName = 'DataGrid';
