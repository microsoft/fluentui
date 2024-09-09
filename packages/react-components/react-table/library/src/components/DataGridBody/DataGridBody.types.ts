import * as React from 'react';
import type { TableRowData } from '../../hooks';
import type { TableBodySlots, TableBodyProps, TableBodyState } from '../TableBody/TableBody.types';

export type DataGridBodySlots = TableBodySlots;

export type RowRenderFunction<TItem = unknown> = (row: TableRowData<TItem>, ...rest: unknown[]) => React.ReactNode;

/**
 * DataGridBody Props
 */
export type DataGridBodyProps<TItem = unknown> = Omit<TableBodyProps, 'children'> & {
  /**
   * Render function for rows
   */
  children: RowRenderFunction<TItem>;
};

/**
 * State used in rendering DataGridBody
 */
export type DataGridBodyState = TableBodyState & {
  rows: TableRowData<unknown>[];

  renderRow: RowRenderFunction;
};
