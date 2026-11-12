'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DataGridHeaderSlots, DataGridHeaderState } from './DataGridHeader.types';
import { useTableHeaderStyles_unstable } from '../TableHeader/useTableHeaderStyles.styles.css';
import './DataGridHeader.module.css';

export const dataGridHeaderClassNames: SlotClassNames<DataGridHeaderSlots> = {
  root: 'fui-DataGridHeader',
};

export const useDataGridHeaderStyles_unstable = (state: DataGridHeaderState): DataGridHeaderState => {
  useTableHeaderStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(dataGridHeaderClassNames.root, state.root.className);
  return state;
};
