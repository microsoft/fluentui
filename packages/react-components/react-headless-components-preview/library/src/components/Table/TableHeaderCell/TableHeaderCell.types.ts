import type { TableHeaderCellBaseState } from '@fluentui/react-table';

export type { TableHeaderCellSlots, TableHeaderCellProps } from '@fluentui/react-table';

export type TableHeaderCellState = TableHeaderCellBaseState & {
  root: {
    /**
     * Data attribute set when the column is sortable.
     */
    'data-sortable'?: string;
    /**
     * Sort direction of the column: `ascending` or `descending`. Absent when the column is not sorted.
     */
    'data-sort-direction'?: string;
  };
};
