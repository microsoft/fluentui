import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { TableColumnDefinition } from '../../hooks';
import type { DataGridBaseContextValue, DataGridContextValue } from '../DataGrid/DataGrid.types';
import type {
  TableRowBaseProps,
  TableRowBaseState,
  TableRowProps,
  TableRowSlots,
  TableRowState,
} from '../TableRow/TableRow.types';
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

/**
 * Cell render function of `useDataGridRowBase_unstable`. It receives the context without the design state.
 */
export type CellRenderBaseFunction<TItem = unknown> = (
  column: TableColumnDefinition<TItem>,
  dataGridContextValue: DataGridBaseContextValue,
) => React.ReactNode;

/**
 * DataGridRow props accepted by `useDataGridRowBase_unstable`, without design props.
 * The selection cell is rendered by the caller of the base hook, because it depends on the selection cell
 * component that is used. `selectable` tells whether to render it.
 */
export type DataGridRowBaseProps<TItem = unknown> = Omit<TableRowBaseProps, 'children'> &
  Omit<ComponentProps<DataGridRowBaseSlots>, 'children'> & {
    children: CellRenderBaseFunction<TItem>;
  };

export type DataGridRowBaseSlots = TableRowSlots;

/**
 * State returned by `useDataGridRowBase_unstable`.
 */
export type DataGridRowBaseState = TableRowBaseState &
  ComponentState<DataGridRowBaseSlots> & {
    renderCell: CellRenderBaseFunction;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columnDefs: TableColumnDefinition<any>[];
    dataGridContextValue: DataGridBaseContextValue;
    /**
     * Whether row selection is enabled on the DataGrid
     */
    selectable: boolean;
    /**
     * Whether the row is selected
     */
    selected: boolean;
  };
