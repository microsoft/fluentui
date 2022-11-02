import * as React from 'react';
import type { RowState } from '../../hooks';
import type { TableBodySlots, TableBodyProps, TableBodyState } from '../TableBody/TableBody.types';

export type DataGridBodySlots = TableBodySlots;

// Use any here since we can't know the user types
// The user is responsible for narrowing the type downstream
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RowRenderFunction<TItem = any> = (row: RowState<TItem>) => React.ReactNode;

/**
 * DataGridBody Props
 */
export type DataGridBodyProps = Omit<TableBodyProps, 'children'> & {
  /**
   * Render function for rows
   */
  children: RowRenderFunction;
};

/**
 * State used in rendering DataGridBody
 */
export type DataGridBodyState = TableBodyState;
