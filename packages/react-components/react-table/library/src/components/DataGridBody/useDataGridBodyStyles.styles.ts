import { mergeClasses } from '@griffel/react';
import type { DataGridBodySlots, DataGridBodyState } from './DataGridBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTableBodyStyles_unstable } from '../TableBody/useTableBodyStyles.styles';

export const dataGridBodyClassNames: SlotClassNames<DataGridBodySlots> = {
  root: 'fui-DataGridBody',
};

/**
 * Apply styling to the DataGridBody slots based on the state
 */
export const useDataGridBodyStyles_unstable = (state: DataGridBodyState): DataGridBodyState => {
  'use no memo';

  useTableBodyStyles_unstable(state);
  state.root.className = mergeClasses(dataGridBodyClassNames.root, state.root.className);

  return state;
};
