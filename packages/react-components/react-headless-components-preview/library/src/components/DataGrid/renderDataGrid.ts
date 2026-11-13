import type { JSXElement } from '@fluentui/react-utilities';
import { renderDataGrid_unstable } from '@fluentui/react-table';
import type { DataGridContextValues, DataGridState } from './DataGrid.types';

/**
 * Renders the final JSX of the DataGrid component, given the state and the context values.
 */
export const renderDataGrid = renderDataGrid_unstable as (
  state: DataGridState,
  contextValues: DataGridContextValues,
) => JSXElement;
