'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DataGridCellSlots, DataGridCellState } from './DataGridCell.types';
import { useTableCellStyles_unstable } from '../TableCell/useTableCellStyles.styles.css';
import './DataGridCell.module.css';

export const dataGridCellClassNames: SlotClassNames<DataGridCellSlots> = {
  root: 'fui-DataGridCell',
};

export const useDataGridCellStyles_unstable = (state: DataGridCellState): DataGridCellState => {
  useTableCellStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(dataGridCellClassNames.root, state.root.className);
  return state;
};
