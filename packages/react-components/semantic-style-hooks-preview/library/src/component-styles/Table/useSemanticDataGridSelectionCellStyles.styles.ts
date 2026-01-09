import { mergeClasses } from '@griffel/react';
import { dataGridSelectionCellClassNames, type DataGridSelectionCellState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useSemanticTableSelectionCellStyles } from './useSemanticTableSelectionCellStyles.styles';

/**
 * Apply styling to the DataGridSelectionCell slots based on the state
 */
export const useSemanticDataGridSelectionCellStyles = (_state: unknown): DataGridSelectionCellState => {
  'use no memo';

  const state = _state as DataGridSelectionCellState;

  useSemanticTableSelectionCellStyles(state);
  state.root.className = mergeClasses(
    state.root.className,
    dataGridSelectionCellClassNames.root,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.checkboxIndicator) {
    state.checkboxIndicator.className = mergeClasses(
      state.checkboxIndicator.className,
      dataGridSelectionCellClassNames.checkboxIndicator,
      getSlotClassNameProp_unstable(state.checkboxIndicator),
    );
  }

  if (state.radioIndicator) {
    state.radioIndicator.className = mergeClasses(
      state.radioIndicator.className,
      dataGridSelectionCellClassNames.radioIndicator,
      getSlotClassNameProp_unstable(state.radioIndicator),
    );
  }

  return state;
};
