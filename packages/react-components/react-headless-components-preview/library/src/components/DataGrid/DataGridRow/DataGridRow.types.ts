import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type { DataGridRowBaseProps, DataGridRowBaseSlots, DataGridRowBaseState } from '@fluentui/react-table';
import type { DataGridSelectionCell } from '../DataGridSelectionCell';

export type { CellRenderBaseFunction as CellRenderFunction } from '@fluentui/react-table';

export type DataGridRowSlots = DataGridRowBaseSlots & {
  /**
   * When selection is enabled on the DataGrid, all rows render the selection cell.
   */
  selectionCell?: Slot<typeof DataGridSelectionCell>;
};

export type DataGridRowProps<TItem = unknown> = Omit<DataGridRowBaseProps<TItem>, 'selectionCell'> & {
  /**
   * When selection is enabled on the DataGrid, all rows render the selection cell.
   */
  selectionCell?: Slot<typeof DataGridSelectionCell>;
};

export type DataGridRowState = DataGridRowBaseState &
  Pick<ComponentState<DataGridRowSlots>, 'selectionCell'> & {
    components: { selectionCell: typeof DataGridSelectionCell };
    root: {
      /**
       * Data attribute set when the row is selected.
       */
      'data-selected'?: string;
      /**
       * Data attribute set when the row is inside the DataGrid header.
       */
      'data-header-row'?: string;
    };
  };
