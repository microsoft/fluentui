import { mergeClasses } from '@griffel/react';
import type { DataGridHeaderSlots, DataGridHeaderState } from './DataGridHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTableHeaderStyles_unstable } from '../TableHeader/useTableHeaderStyles';

export const dataGridHeaderClassNames: SlotClassNames<DataGridHeaderSlots> = {
  root: 'fui-DataGridHeader',
};

/**
 * Apply styling to the DataGridHeader slots based on the state
 */
export const useDataGridHeaderStyles_unstable = (state: DataGridHeaderState): DataGridHeaderState => {
  useTableHeaderStyles_unstable(state);
  state.root.className = mergeClasses(dataGridHeaderClassNames.root, state.root.className);

  return state;
};
