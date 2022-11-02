import * as React from 'react';
import { ColumnDefinitionRender } from '../../hooks/types';
import { TableRowProps, TableRowSlots, TableRowState } from '../TableRow/TableRow.types';

export type DataGridRowSlots = TableRowSlots;

// Use any here since we can't know the user types
// The user is responsible for narrowing the type downstream
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CellRenderFunction = (column: ColumnDefinitionRender<any>) => React.ReactNode;

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
