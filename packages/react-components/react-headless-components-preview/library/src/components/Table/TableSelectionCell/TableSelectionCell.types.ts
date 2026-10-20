import type { TableSelectionCellBaseState } from '@fluentui/react-table';

export type {
  TableSelectionCellBaseSlots as TableSelectionCellSlots,
  TableSelectionCellBaseProps as TableSelectionCellProps,
} from '@fluentui/react-table';

export type TableSelectionCellState = TableSelectionCellBaseState & {
  root: {
    /**
     * Data attribute set when the row is selected: `''` when checked, `mixed` when only some rows are selected.
     */
    'data-checked'?: string;
    /**
     * Type of the selection indicator: `checkbox` or `radio`.
     */
    'data-selection-type'?: string;
    /**
     * Data attribute set when the cell is hidden visually but still takes up space.
     */
    'data-invisible'?: string;
  };
};
