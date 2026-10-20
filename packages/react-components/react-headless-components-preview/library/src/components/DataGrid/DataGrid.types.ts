import type { DataGridBaseProps, DataGridBaseState } from '@fluentui/react-table';

export type { DataGridSlots, DataGridContextValues } from '@fluentui/react-table';

/**
 * Focus modes supported by the headless DataGrid.
 * - `cell`: a single tab stop for the whole grid, the cells are navigated with the arrow keys
 * - `row_unstable`: the rows are navigated with the up and down arrow keys, the content of the cells is part of the tab order
 * - `none`: no keyboard navigation is added
 *
 * The `composite` mode of the styled DataGrid relies on Tabster and is not supported.
 */
export type DataGridFocusMode = 'none' | 'cell' | 'row_unstable';

export type DataGridProps = Omit<DataGridBaseProps, 'focusMode'> & {
  /**
   * How focus navigation will work in the datagrid
   * @default cell
   */
  focusMode?: DataGridFocusMode;
};

export type DataGridState = Omit<DataGridBaseState, 'focusMode'> & {
  focusMode: DataGridFocusMode;
  root: {
    /**
     * The `focusgroup` attribute that provides the arrow key navigation: `toolbar inline` in the `cell` focus mode
     * and `toolbar block` in the `row_unstable` focus mode. Not set in the `none` focus mode.
     */
    focusgroup?: string;
    /**
     * Data attribute set when the grid is sortable.
     */
    'data-sortable'?: string;
    /**
     * Data attribute with the focus mode of the grid: `none`, `cell` or `row_unstable`.
     */
    'data-focus-mode'?: DataGridFocusMode;
    /**
     * Data attribute with the selection mode of the grid: `single` or `multiselect`. Not set when rows are not selectable.
     */
    'data-selection-mode'?: 'single' | 'multiselect';
  };
};
