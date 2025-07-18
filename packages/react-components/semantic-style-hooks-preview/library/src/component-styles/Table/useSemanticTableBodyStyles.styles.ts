import { mergeClasses, makeStyles } from '@griffel/react';
import { tableBodyClassName, type TableBodyState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useTableLayoutStyles = makeStyles({
  root: {
    display: 'table-row-group',
  },
});

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'block',
  },
});

/**
 * Apply styling to the TableBody slots based on the state
 */
export const useSemanticTableBodyStyles = (_state: unknown): TableBodyState => {
  'use no memo';

  const state = _state as TableBodyState;

  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    state.root.className,
    tableBodyClassName,
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
