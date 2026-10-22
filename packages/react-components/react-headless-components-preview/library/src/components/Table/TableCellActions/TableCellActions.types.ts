import type { TableCellActionsState as TableCellActionsBaseState } from '@fluentui/react-table';

export type { TableCellActionsSlots, TableCellActionsProps } from '@fluentui/react-table';

export type TableCellActionsState = TableCellActionsBaseState & {
  root: {
    /**
     * Data attribute set when the actions are forced visible with the `visible` prop.
     */
    'data-visible'?: string;
  };
};
