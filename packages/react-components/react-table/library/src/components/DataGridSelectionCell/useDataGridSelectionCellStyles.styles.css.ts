'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DataGridSelectionCellSlots, DataGridSelectionCellState } from './DataGridSelectionCell.types';
import { useTableSelectionCellStyles_unstable } from '../TableSelectionCell/useTableSelectionCellStyles.styles.css';
import './DataGridSelectionCell.module.css';

export const dataGridSelectionCellClassNames: SlotClassNames<DataGridSelectionCellSlots> = {
  root: 'fui-DataGridSelectionCell',
  checkboxIndicator: 'fui-DataGridSelectionCell__checkboxIndicator',
  radioIndicator: 'fui-DataGridSelectionCell__radioIndicator',
};

export const useDataGridSelectionCellStyles_unstable = (
  state: DataGridSelectionCellState,
): DataGridSelectionCellState => {
  useTableSelectionCellStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(dataGridSelectionCellClassNames.root, state.root.className);
  if (state.checkboxIndicator) {
    // eslint-disable-next-line react-hooks/immutability
    state.checkboxIndicator.className = clsx(
      dataGridSelectionCellClassNames.checkboxIndicator,
      state.checkboxIndicator.className,
    );
  }
  if (state.radioIndicator) {
    // eslint-disable-next-line react-hooks/immutability
    state.radioIndicator.className = clsx(
      dataGridSelectionCellClassNames.radioIndicator,
      state.radioIndicator.className,
    );
  }
  return state;
};
