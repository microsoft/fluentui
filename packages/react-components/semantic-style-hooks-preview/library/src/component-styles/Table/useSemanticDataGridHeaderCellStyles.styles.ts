import { mergeClasses } from '@griffel/react';
import { dataGridHeaderCellClassNames, type DataGridHeaderCellState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useSemanticTableHeaderCellStyles } from './useSemanticTableHeaderCellStyles.styles';

/**
 * Apply styling to the DataGridHeaderCell slots based on the state
 */
export const useSemanticDataGridHeaderCellStyles = (_state: unknown): DataGridHeaderCellState => {
  'use no memo';

  const state = _state as DataGridHeaderCellState;

  useSemanticTableHeaderCellStyles(state);
  state.root.className = mergeClasses(
    state.root.className,
    dataGridHeaderCellClassNames.root,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.button) {
    state.button.className = mergeClasses(
      state.button.className,
      dataGridHeaderCellClassNames.button,
      getSlotClassNameProp_unstable(state.button),
    );
  }

  if (state.sortIcon) {
    state.sortIcon.className = mergeClasses(
      state.sortIcon.className,
      dataGridHeaderCellClassNames.sortIcon,
      getSlotClassNameProp_unstable(state.sortIcon),
    );
  }

  if (state.aside) {
    state.aside.className = mergeClasses(
      state.aside.className,
      dataGridHeaderCellClassNames.aside,
      getSlotClassNameProp_unstable(state.aside),
    );
  }

  return state;
};
