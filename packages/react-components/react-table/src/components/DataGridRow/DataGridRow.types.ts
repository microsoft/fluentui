import * as React from 'react';
import { ColumnDefinition } from '../../hooks';
import { TableRowProps, TableRowSlots, TableRowState } from '../TableRow/TableRow.types';

export type DataGridRowSlots = TableRowSlots;

// Use any here since we can't know the user types
// The user is responsible for narrowing the type downstream
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CellRenderFunction = (column: ColumnDefinition<any>) => React.ReactNode;

/**
 * DataGridRow Props
 */
export type DataGridRowProps = Omit<TableRowProps, 'children'> & {
  children: CellRenderFunction;
};

/**
 * State used in rendering DataGridRow
 */
export type DataGridRowState = TableRowState;
