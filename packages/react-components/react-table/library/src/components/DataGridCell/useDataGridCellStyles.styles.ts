import { mergeClasses } from '@griffel/react';
import type { DataGridCellSlots, DataGridCellState } from './DataGridCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTableCellStyles_unstable } from '../TableCell/useTableCellStyles.styles';

export const dataGridCellClassNames: SlotClassNames<DataGridCellSlots> = {
  root: 'fui-DataGridCell',
};

/**
 * Apply styling to the DataGridCell slots based on the state
 */
export const useDataGridCellStyles_unstable = (state: DataGridCellState): DataGridCellState => {
  'use no memo';

  useTableCellStyles_unstable(state);
  state.root.className = mergeClasses(dataGridCellClassNames.root, state.root.className);

  return state;
};
