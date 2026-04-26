'use client';
import { useTable_unstable, useTableContextValues_unstable } from '@fluentui/react-table';
import type { TableState, TableContextValues } from './Table.types';
export const useTable = useTable_unstable;
export const useTableContextValues = useTableContextValues_unstable as (state: TableState) => TableContextValues;
