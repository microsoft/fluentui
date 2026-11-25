import type {
  TableHeaderCellBaseState,
  TableHeaderCellProps,
  TableHeaderCellSlots,
  TableHeaderCellState,
} from '../TableHeaderCell/TableHeaderCell.types';

import type { DataGridCellProps } from '../DataGridCell/DataGridCell.types';

export type DataGridHeaderCellSlots = TableHeaderCellSlots;

/**
 * DataGridHeaderCell Props
 */
export type DataGridHeaderCellProps = Omit<TableHeaderCellProps, 'sortable'> & Pick<DataGridCellProps, 'focusMode'>;

/**
 * State used in rendering DataGridHeaderCell
 */
export type DataGridHeaderCellState = TableHeaderCellState;

/**
 * DataGridHeaderCell props accepted by `useDataGridHeaderCellBase_unstable`.
 * The `group` focus mode relies on Tabster and is handled like `cell` by the base hook.
 */
export type DataGridHeaderCellBaseProps = DataGridHeaderCellProps;

/**
 * State returned by `useDataGridHeaderCellBase_unstable`.
 */
export type DataGridHeaderCellBaseState = TableHeaderCellBaseState;
