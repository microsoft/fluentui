import { mergeClasses } from '@griffel/react';
import { dataGridBodyClassNames, type DataGridBodyState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useSemanticTableBodyStyles } from './useSemanticTableBodyStyles.styles';

/**
 * Apply styling to the DataGridBody slots based on the state
 */
export const useSemanticDataGridBodyStyles = (_state: unknown): DataGridBodyState => {
  'use no memo';

  const state = _state as DataGridBodyState;

  useSemanticTableBodyStyles(state);
  state.root.className = mergeClasses(
    state.root.className,
    dataGridBodyClassNames.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
