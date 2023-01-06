import * as React from 'react';
import type { RowState } from '../../hooks';
import type { TableBodySlots, TableBodyProps, TableBodyState } from '../TableBody/TableBody.types';

export type DataGridBodySlots = TableBodySlots;

// Use unknown here since we can't know the user types
// The user is responsible for narrowing the type downstream
export type RowRenderFunction<TItem = unknown> = (row: RowState<TItem>) => React.ReactNode;

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
export type DataGridBodyState = TableBodyState & {
  rows: RowState<unknown>[];

  renderRow: RowRenderFunction;
};
