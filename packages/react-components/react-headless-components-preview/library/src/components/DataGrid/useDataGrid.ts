'use client';
import { useDataGrid_unstable, useDataGridContextValues_unstable } from '@fluentui/react-table';
import type { DataGridState, DataGridContextValues } from './DataGrid.types';
export const useDataGrid = useDataGrid_unstable;
export const useDataGridContextValues = useDataGridContextValues_unstable as (
  state: DataGridState,
) => DataGridContextValues;
