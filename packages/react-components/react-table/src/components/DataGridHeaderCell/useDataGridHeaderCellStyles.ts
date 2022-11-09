import { mergeClasses } from '@griffel/react';
import type { DataGridHeaderCellSlots, DataGridHeaderCellState } from './DataGridHeaderCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTableHeaderCellStyles_unstable } from '../TableHeaderCell/useTableHeaderCellStyles';

export const dataGridHeaderCellClassNames: SlotClassNames<DataGridHeaderCellSlots> = {
  root: 'fui-DataGridHeaderCell',
  button: 'fui-DataGridHeaderCell__button',
  sortIcon: 'fui-DataGridHeaderCell__sortIcon',
};

/**
 * Apply styling to the DataGridHeaderCell slots based on the state
 */
export const useDataGridHeaderCellStyles_unstable = (state: DataGridHeaderCellState): DataGridHeaderCellState => {
  useTableHeaderCellStyles_unstable(state);
  state.root.className = mergeClasses(dataGridHeaderCellClassNames.root, state.root.className);

  if (state.button) {
    state.button.className = mergeClasses(dataGridHeaderCellClassNames.button, state.button.className);
  }

  if (state.sortIcon) {
    state.sortIcon.className = mergeClasses(dataGridHeaderCellClassNames.sortIcon, state.sortIcon.className);
  }

  return state;
};
