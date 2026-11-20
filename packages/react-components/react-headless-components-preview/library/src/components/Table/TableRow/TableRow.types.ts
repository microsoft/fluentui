import type { TableRowBaseState } from '@fluentui/react-table';

export type { TableRowSlots, TableRowBaseProps as TableRowProps } from '@fluentui/react-table';

export type TableRowState = TableRowBaseState & {
  root: {
    /**
     * Data attribute set when the row is inside the table header.
     */
    'data-header-row'?: string;
  };
};
