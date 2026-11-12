'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DataGridRowSlots, DataGridRowState } from './DataGridRow.types';
import { useTableRowStyles_unstable } from '../TableRow/useTableRowStyles.styles.css';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';
import styles from './DataGridRow.module.css';

export const dataGridRowClassNames: SlotClassNames<DataGridRowSlots> = {
  root: 'fui-DataGridRow',
  selectionCell: 'fui-DataGridRow__selectionCell',
};

export const useDataGridRowStyles_unstable = (state: DataGridRowState): DataGridRowState => {
  const isSubtle = useDataGridContext_unstable(ctx => ctx.subtleSelection);
  useTableRowStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(dataGridRowClassNames.root, isSubtle && styles.subtleSelection, state.root.className);
  if (state.selectionCell) {
    // eslint-disable-next-line react-hooks/immutability
    state.selectionCell.className = clsx(dataGridRowClassNames.selectionCell, state.selectionCell.className);
  }
  return state;
};
