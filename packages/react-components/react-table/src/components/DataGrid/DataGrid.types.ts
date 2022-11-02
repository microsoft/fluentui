import { TableContextValues, TableProps, TableSlots, TableState } from '../Table/Table.types';
import { TableState as HeadlessTableState } from '../../hooks';

export type DataGridSlots = TableSlots;

export type DataGridContextValues = TableContextValues & {
  dataGrid: DataGridContextValue;
};

// Use any here since we can't know the user types
// The user is responsible for narrowing the type downstream
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataGridContextValue = HeadlessTableState<any>;

/**
 * DataGrid Props
 */
export type DataGridProps = TableProps & Pick<DataGridContextValue, 'items' | 'columns'>;

/**
 * State used in rendering DataGrid
 */
export type DataGridState = TableState & { tableState: HeadlessTableState<unknown> };
