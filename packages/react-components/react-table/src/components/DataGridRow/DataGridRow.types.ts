import * as React from 'react';
import type { Slot, ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { TableColumnDefinition } from '../../hooks';
import type { TableRowProps, TableRowSlots, TableRowState } from '../TableRow/TableRow.types';
import type { TableSelectionCell } from '../TableSelectionCell/TableSelectionCell';

export type DataGridRowSlots = TableRowSlots & {
  /**
   * When selection is enabled on the @see DataGrid, all rows
   * will render the selection cell.
   */
  selectionCell?: Slot<typeof TableSelectionCell>;
};

export type CellRenderFunction<TItem = unknown> = (column: TableColumnDefinition<TItem>) => React.ReactNode;

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
  };
