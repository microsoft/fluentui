import { makeStyles, mergeClasses } from '@griffel/react';
import { tableCellActionsClassNames, type TableCellActionsState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    backgroundColor: 'inherit',
    position: 'absolute',
    right: '0px',
    top: '50%',
    transform: 'translateY(-50%)',
    opacity: 0,
    marginLeft: 'auto',
  },

  visible: {
    opacity: 1,
  },
});

/**
 * Apply styling to the TableCellActions slots based on the state
 */
export const useSemanticTableCellActionsStyles = (_state: unknown): TableCellActionsState => {
  'use no memo';

  const state = _state as TableCellActionsState;

  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    tableCellActionsClassNames.root,
    styles.root,
    state.visible && styles.visible,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
