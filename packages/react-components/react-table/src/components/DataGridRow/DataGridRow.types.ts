import * as React from 'react';
import type { Slot, ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { ColumnDefinition } from '../../hooks';
import type { TableRowProps, TableRowSlots, TableRowState } from '../TableRow/TableRow.types';
import type { TableSelectionCell } from '../TableSelectionCell/TableSelectionCell';

export type DataGridRowSlots = TableRowSlots & {
  /**
   * When selection is enabled on the @see DataGrid, all rows
   * will render the selection cell.
   */
  selectionCell?: Slot<typeof TableSelectionCell>;
};

// Use unknown here since we can't know the user types
// The user is responsible for narrowing the type downstream
export type CellRenderFunction = (column: ColumnDefinition<unknown>) => React.ReactNode;

/**
 * DataGridRow Props
 */
export type DataGridRowProps = Omit<TableRowProps, 'children'> &
  Omit<ComponentProps<DataGridRowSlots>, 'children'> & {
    children: CellRenderFunction;
  };

/**
 * State used in rendering DataGridRow
 */
export type DataGridRowState = TableRowState &
  ComponentState<DataGridRowSlots> & {
    renderCell: CellRenderFunction;
    columnDefs: ColumnDefinition<unknown>[];
  };
