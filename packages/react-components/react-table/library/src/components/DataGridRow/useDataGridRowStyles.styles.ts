import { mergeClasses } from '@griffel/react';
import type { DataGridRowSlots, DataGridRowState } from './DataGridRow.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTableRowStyles_unstable } from '../TableRow/useTableRowStyles.styles';

export const dataGridRowClassNames: SlotClassNames<DataGridRowSlots> = {
  root: 'fui-DataGridRow',
  selectionCell: 'fui-DataGridRow__selectionCell',
};

/**
 * Apply styling to the DataGridRow slots based on the state
 */
export const useDataGridRowStyles_unstable = (state: DataGridRowState): DataGridRowState => {
  'use no memo';

  useTableRowStyles_unstable(state);
  state.root.className = mergeClasses(dataGridRowClassNames.root, state.root.className);
  if (state.selectionCell) {
    state.selectionCell.className = mergeClasses(dataGridRowClassNames.selectionCell, state.selectionCell.className);
  }

  return state;
};
