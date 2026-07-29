'use client';

import { mergeClasses } from '@griffel/react';
import type { DataGridSelectionCellSlots, DataGridSelectionCellState } from './DataGridSelectionCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTableSelectionCellStyles_unstable } from '../TableSelectionCell/useTableSelectionCellStyles.styles';

export const dataGridSelectionCellClassNames: SlotClassNames<DataGridSelectionCellSlots> = {
  root: 'fui-DataGridSelectionCell',
  checkboxIndicator: 'fui-DataGridSelectionCell__checkboxIndicator',
  radioIndicator: 'fui-DataGridSelectionCell__radioIndicator',
};

/**
 * Apply styling to the DataGridSelectionCell slots based on the state
 */
export const useDataGridSelectionCellStyles_unstable = (
  state: DataGridSelectionCellState,
): DataGridSelectionCellState => {
  useTableSelectionCellStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(dataGridSelectionCellClassNames.root, state.root.className);

  if (state.checkboxIndicator) {
    // eslint-disable-next-line react-hooks/immutability
    state.checkboxIndicator.className = mergeClasses(
      dataGridSelectionCellClassNames.checkboxIndicator,
      state.checkboxIndicator.className,
    );
  }

  if (state.radioIndicator) {
    // eslint-disable-next-line react-hooks/immutability
    state.radioIndicator.className = mergeClasses(
      dataGridSelectionCellClassNames.radioIndicator,
      state.radioIndicator.className,
    );
  }

  return state;
};
