'use client';

import { mergeClasses } from '@griffel/react';
import type { DataGridHeaderCellSlots, DataGridHeaderCellState } from './DataGridHeaderCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTableHeaderCellStyles_unstable } from '../TableHeaderCell/useTableHeaderCellStyles.styles';

export const dataGridHeaderCellClassNames: SlotClassNames<DataGridHeaderCellSlots> = {
  root: 'fui-DataGridHeaderCell',
  button: 'fui-DataGridHeaderCell__button',
  sortIcon: 'fui-DataGridHeaderCell__sortIcon',
  aside: 'fui-DataGridHeaderCell__aside',
};

/**
 * Apply styling to the DataGridHeaderCell slots based on the state
 */
export const useDataGridHeaderCellStyles_unstable = (state: DataGridHeaderCellState): DataGridHeaderCellState => {
  useTableHeaderCellStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(dataGridHeaderCellClassNames.root, state.root.className);

  if (state.button) {
    // eslint-disable-next-line react-hooks/immutability
    state.button.className = mergeClasses(dataGridHeaderCellClassNames.button, state.button.className);
  }

  if (state.sortIcon) {
    // eslint-disable-next-line react-hooks/immutability
    state.sortIcon.className = mergeClasses(dataGridHeaderCellClassNames.sortIcon, state.sortIcon.className);
  }

  if (state.aside) {
    // eslint-disable-next-line react-hooks/immutability
    state.aside.className = mergeClasses(dataGridHeaderCellClassNames.aside, state.aside.className);
  }

  return state;
};
