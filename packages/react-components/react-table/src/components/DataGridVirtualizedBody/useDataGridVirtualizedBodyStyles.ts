import type { DataGridVirtualizedBodySlots, DataGridVirtualizedBodyState } from './DataGridVirtualizedBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useDataGridBodyStyles_unstable } from '../DataGridBody/useDataGridBodyStyles';

export const dataGridVirtualizedBodyClassNames: SlotClassNames<DataGridVirtualizedBodySlots> = {
  root: 'fui-DataGridVirtualizedBody',
};

/**
 * Apply styling to the DataGridVirtualizedBody slots based on the state
 */
export const useDataGridVirtualizedBodyStyles_unstable = (
  state: DataGridVirtualizedBodyState,
): DataGridVirtualizedBodyState => {
  return useDataGridBodyStyles_unstable(state);
};
