'use client';
import { useTableCellLayout_unstable, useTableCellLayoutContextValues_unstable } from '@fluentui/react-table';
import type { TableCellLayoutState, TableCellLayoutContextValues } from './TableCellLayout.types';
export const useTableCellLayout = useTableCellLayout_unstable;
export const useTableCellLayoutContextValues = useTableCellLayoutContextValues_unstable as (
  state: TableCellLayoutState,
) => TableCellLayoutContextValues;
