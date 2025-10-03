import { mergeClasses } from '@griffel/react';
import { dataGridCellClassNames, type DataGridCellState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useSemanticTableCellStyles } from './useSemanticTableCellStyles.styles';

/**
 * Apply styling to the DataGridCell slots based on the state
 */
export const useSemanticDataGridCellStyles = (_state: unknown): DataGridCellState => {
  'use no memo';

  const state = _state as DataGridCellState;

  useSemanticTableCellStyles(state);
  state.root.className = mergeClasses(
    state.root.className,
    dataGridCellClassNames.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
