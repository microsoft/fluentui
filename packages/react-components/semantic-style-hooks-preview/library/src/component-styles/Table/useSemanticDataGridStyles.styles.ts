import { mergeClasses } from '@griffel/react';
import { dataGridClassNames, type DataGridState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useSemanticTableStyles } from './useSemanticTableStyles.styles';

/**
 * Apply styling to the DataGrid slots based on the state
 */
export const useSemanticDataGridStyles = (_state: unknown): DataGridState => {
  'use no memo';

  const state = _state as DataGridState;

  useSemanticTableStyles(state);
  state.root.className = mergeClasses(
    state.root.className,
    dataGridClassNames.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
