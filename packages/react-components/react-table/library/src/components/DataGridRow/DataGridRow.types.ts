import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { TableColumnDefinition } from '../../hooks';
import { DataGridContextValue } from '../DataGrid/DataGrid.types';
import type { TableRowProps, TableRowSlots, TableRowState } from '../TableRow/TableRow.types';
import type { TableSelectionCell } from '../TableSelectionCell/TableSelectionCell';

export type DataGridRowSlots = TableRowSlots & {
  /**
   * When selection is enabled on the @see DataGrid, all rows
   * will render the selection cell.
   */
  selectionCell?: Slot<typeof TableSelectionCell>;
};

export type CellRenderFunction<TItem = unknown> = (
  column: TableColumnDefinition<TItem>,
  dataGridContextValue: DataGridContextValue,
) => React.ReactNode;

/**
 * DataGridRow Props
 */
export type DataGridRowProps<TItem = unknown> = Omit<TableRowProps, 'children'> &
  Omit<ComponentProps<DataGridRowSlots>, 'children'> & {
    children: CellRenderFunction<TItem>;
  };

/**
 * State used in rendering DataGridRow
 */
export type DataGridRowState = TableRowState &
  ComponentState<DataGridRowSlots> & {
    renderCell: CellRenderFunction;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columnDefs: TableColumnDefinition<any>[];
    dataGridContextValue: DataGridContextValue;
  };
