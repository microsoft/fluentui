import { mergeClasses } from '@griffel/react';
import { dataGridRowClassNames, type DataGridRowState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useSemanticTableRowStyles } from './useSemanticTableRowStyles.styles';

/**
 * Apply styling to the DataGridRow slots based on the state
 */
export const useSemanticDataGridRowStyles = (_state: unknown): DataGridRowState => {
  'use no memo';

  const state = _state as DataGridRowState;

  useSemanticTableRowStyles(state);
  state.root.className = mergeClasses(
    state.root.className,
    dataGridRowClassNames.root,
    getSlotClassNameProp_unstable(state.root),
  );
  if (state.selectionCell) {
    state.selectionCell.className = mergeClasses(
      state.selectionCell.className,
      dataGridRowClassNames.selectionCell,
      getSlotClassNameProp_unstable(state.selectionCell),
    );
  }

  return state;
};
