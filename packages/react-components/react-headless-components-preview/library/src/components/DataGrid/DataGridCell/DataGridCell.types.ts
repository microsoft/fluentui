import type { DataGridCellBaseProps, DataGridCellBaseState } from '@fluentui/react-table';

export type { DataGridCellSlots } from '@fluentui/react-table';

/**
 * Focus modes of the cell. The `group` focus mode of the styled cell relies on Tabster and is not supported.
 * - `cell`: the cell is part of the grid keyboard navigation
 * - `none`: the cell is not focusable
 */
export type DataGridCellFocusMode = 'cell' | 'none';

export type DataGridCellProps = Omit<DataGridCellBaseProps, 'focusMode'> & {
  /**
   * @default cell
   */
  focusMode?: DataGridCellFocusMode;
};

export type DataGridCellState = DataGridCellBaseState & {
  root: {
    /**
     * Opts the cell out of the row `focusgroup` in the `row_unstable` focus mode.
     */
    focusgroup?: string;
  };
};
