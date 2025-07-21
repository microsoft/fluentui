import { mergeClasses, makeStyles } from '@griffel/react';
import { tableHeaderClassName, type TableHeaderState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'block',
  },
});

const useTableLayoutStyles = makeStyles({
  root: {
    display: 'table-row-group',
  },
});

/**
 * Apply styling to the TableHeader slots based on the state
 */
export const useSemanticTableHeaderStyles = (_state: unknown): TableHeaderState => {
  'use no memo';

  const state = _state as TableHeaderState;

  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    state.root.className,
    tableHeaderClassName,
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
