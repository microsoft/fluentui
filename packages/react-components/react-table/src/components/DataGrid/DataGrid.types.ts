import * as React from 'react';
import type { TableContextValues, TableProps, TableSlots, TableState } from '../Table/Table.types';
import type { SortState, TableState as HeadlessTableState, UseSortOptions } from '../../hooks';

export type DataGridSlots = TableSlots;

export type FocusMode = 'none' | 'cell';

export type DataGridContextValues = TableContextValues & {
  dataGrid: DataGridContextValue;
};

// Use any here since we can't know the user types
// The user is responsible for narrowing the type downstream
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataGridContextValue = HeadlessTableState<any> & {
  /**
   * How focus navigation will work in the datagrid
   * @default none
   */
  focusMode: FocusMode;
};

/**
 * DataGrid Props
 */
export type DataGridProps = TableProps &
  Pick<DataGridContextValue, 'items' | 'columns'> &
  Pick<Partial<DataGridContextValue>, 'focusMode'> &
  Pick<UseSortOptions, 'sortState' | 'defaultSortState'> & {
    onSortChange?: (e: React.MouseEvent, sortState: SortState) => void;
  };

/**
 * State used in rendering DataGrid
 */
export type DataGridState = TableState & { tableState: HeadlessTableState<unknown> } & Pick<
    DataGridContextValue,
    'focusMode'
  >;
