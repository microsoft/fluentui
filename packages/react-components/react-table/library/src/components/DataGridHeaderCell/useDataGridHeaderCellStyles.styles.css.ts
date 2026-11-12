'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DataGridHeaderCellSlots, DataGridHeaderCellState } from './DataGridHeaderCell.types';
import { useTableHeaderCellStyles_unstable } from '../TableHeaderCell/useTableHeaderCellStyles.styles.css';
import './DataGridHeaderCell.module.css';

export const dataGridHeaderCellClassNames: SlotClassNames<DataGridHeaderCellSlots> = {
  root: 'fui-DataGridHeaderCell',
  button: 'fui-DataGridHeaderCell__button',
  sortIcon: 'fui-DataGridHeaderCell__sortIcon',
  aside: 'fui-DataGridHeaderCell__aside',
};

export const useDataGridHeaderCellStyles_unstable = (state: DataGridHeaderCellState): DataGridHeaderCellState => {
  useTableHeaderCellStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(dataGridHeaderCellClassNames.root, state.root.className);
  if (state.button) {
    // eslint-disable-next-line react-hooks/immutability
    state.button.className = clsx(dataGridHeaderCellClassNames.button, state.button.className);
  }
  if (state.sortIcon) {
    // eslint-disable-next-line react-hooks/immutability
    state.sortIcon.className = clsx(dataGridHeaderCellClassNames.sortIcon, state.sortIcon.className);
  }
  if (state.aside) {
    // eslint-disable-next-line react-hooks/immutability
    state.aside.className = clsx(dataGridHeaderCellClassNames.aside, state.aside.className);
  }
  return state;
};
