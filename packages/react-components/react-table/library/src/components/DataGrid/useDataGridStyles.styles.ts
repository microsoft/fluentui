'use client';

import { mergeClasses } from '@griffel/react';
import type { DataGridSlots, DataGridState } from './DataGrid.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTableStyles_unstable } from '../Table/useTableStyles.styles';

export const dataGridClassNames: SlotClassNames<DataGridSlots> = {
  root: 'fui-DataGrid',
};

/**
 * Apply styling to the DataGrid slots based on the state
 */
export const useDataGridStyles_unstable = (state: DataGridState): DataGridState => {
  useTableStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(dataGridClassNames.root, state.root.className);

  return state;
};
