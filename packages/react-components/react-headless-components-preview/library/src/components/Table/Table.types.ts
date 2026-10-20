import type { TableBaseState } from '@fluentui/react-table';

export type { TableSlots, TableBaseProps as TableProps, TableContextValues } from '@fluentui/react-table';

export type TableState = TableBaseState & {
  root: {
    /**
     * Data attribute set when the table is sortable.
     */
    'data-sortable'?: string;
  };
};
