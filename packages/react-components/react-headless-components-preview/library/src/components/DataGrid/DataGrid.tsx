'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DataGridProps } from './DataGrid.types';
import { useDataGrid, useDataGridContextValues } from './useDataGrid';
import { renderDataGrid } from './renderDataGrid';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A grid of interactive cells with built-in sorting, row selection and keyboard navigation.
 * Compose it with `DataGridHeader`, `DataGridBody`, `DataGridRow` and the cell components.
 */
export const DataGrid: ForwardRefComponent<DataGridProps> = /*#__PURE__*/ composeComponent(
  'DataGrid',
  useDataGrid,
  renderDataGrid,
  useDataGridContextValues,
);
