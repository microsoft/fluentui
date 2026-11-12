import type { TableBaseState, TableContextValue as TableContextValueBase } from '@fluentui/react-table';

export type { TableSlots, TableBaseProps as TableProps } from '@fluentui/react-table';

/**
 * Values of the table context, read by the table subcomponents.
 */
export type TableContextValue = Omit<TableContextValueBase, 'size'>;

export type TableContextValues = {
  table: TableContextValue;
};

export type TableState = TableBaseState & {
  root: {
    /**
     * Data attribute set when the table is sortable.
     */
    'data-sortable'?: string;
  };
};
