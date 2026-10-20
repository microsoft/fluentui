import type { DataGridHeaderCellBaseProps, DataGridHeaderCellBaseState } from '@fluentui/react-table';

export type { DataGridHeaderCellSlots } from '@fluentui/react-table';

/**
 * Focus modes of the cell. The `group` focus mode of the styled cell relies on Tabster and is not supported.
 * - `cell`: the cell is part of the grid keyboard navigation
 * - `none`: the cell is not focusable
 */
export type DataGridHeaderCellFocusMode = 'cell' | 'none';

export type DataGridHeaderCellProps = Omit<DataGridHeaderCellBaseProps, 'focusMode'> & {
  /**
   * @default cell
   */
  focusMode?: DataGridHeaderCellFocusMode;
};

export type DataGridHeaderCellState = DataGridHeaderCellBaseState & {
  root: {
    /**
     * Data attribute set when the column is sortable.
     */
    'data-sortable'?: string;
    /**
     * Sort direction of the column: `ascending` or `descending`. Absent when the column is not sorted.
     */
    'data-sort-direction'?: string;
    /**
     * Opts the cell out of the row `focusgroup` in the `row_unstable` focus mode.
     */
    focusgroup?: string;
  };
};
