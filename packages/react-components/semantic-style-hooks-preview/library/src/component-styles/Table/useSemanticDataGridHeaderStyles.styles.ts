import { mergeClasses } from '@griffel/react';
import { dataGridHeaderClassNames, type DataGridHeaderState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useSemanticTableHeaderStyles } from './useSemanticTableHeaderStyles.styles';

/**
 * Apply styling to the DataGridHeader slots based on the state
 */
export const useSemanticDataGridHeaderStyles = (_state: unknown): DataGridHeaderState => {
  'use no memo';

  const state = _state as DataGridHeaderState;

  useSemanticTableHeaderStyles(state);
  state.root.className = mergeClasses(
    state.root.className,
    dataGridHeaderClassNames.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
