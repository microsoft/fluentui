import type { DataGridSelectionCellBaseState } from '@fluentui/react-table';

export type {
  DataGridSelectionCellBaseSlots as DataGridSelectionCellSlots,
  DataGridSelectionCellBaseProps as DataGridSelectionCellProps,
} from '@fluentui/react-table';

export type DataGridSelectionCellState = DataGridSelectionCellBaseState & {
  root: {
    /**
     * Data attribute set when the row is selected: `''` when checked, `mixed` when only some rows are selected.
     */
    'data-checked'?: string;
    /**
     * Data attribute with the type of the selection indicator: `checkbox` or `radio`.
     */
    'data-selection-type'?: 'checkbox' | 'radio';
    /**
     * Data attribute set when the cell is hidden visually but still takes up space.
     */
    'data-invisible'?: string;
    /**
     * Opts the cell out of the row `focusgroup` in the `row_unstable` focus mode.
     */
    focusgroup?: string;
  };
};
