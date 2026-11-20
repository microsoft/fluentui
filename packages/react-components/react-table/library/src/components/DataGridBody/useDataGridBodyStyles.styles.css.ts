'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DataGridBodySlots, DataGridBodyState } from './DataGridBody.types';
import { useTableBodyStyles_unstable } from '../TableBody/useTableBodyStyles.styles.css';
import './DataGridBody.module.css';

export const dataGridBodyClassNames: SlotClassNames<DataGridBodySlots> = {
  root: 'fui-DataGridBody',
};

export const useDataGridBodyStyles_unstable = (state: DataGridBodyState): DataGridBodyState => {
  useTableBodyStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(dataGridBodyClassNames.root, state.root.className);
  return state;
};
