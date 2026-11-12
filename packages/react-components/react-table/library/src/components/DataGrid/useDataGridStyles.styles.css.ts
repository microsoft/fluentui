'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DataGridSlots, DataGridState } from './DataGrid.types';
import { useTableStyles_unstable } from '../Table/useTableStyles.styles.css';
import './DataGrid.module.css';

export const dataGridClassNames: SlotClassNames<DataGridSlots> = {
  root: 'fui-DataGrid',
};

export const useDataGridStyles_unstable = (state: DataGridState): DataGridState => {
  useTableStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(dataGridClassNames.root, state.root.className);
  return state;
};
