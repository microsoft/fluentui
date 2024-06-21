import { makeStyles, mergeClasses } from '@griffel/react';
import type { TableCellActionsSlots, TableCellActionsState } from './TableCellActions.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableCellActionsClassNames: SlotClassNames<TableCellActionsSlots> = {
  root: 'fui-TableCellActions',
};

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
export const useTableCellActionsStyles_unstable = (state: TableCellActionsState): TableCellActionsState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(
    tableCellActionsClassNames.root,
    styles.root,
    state.visible && styles.visible,
    state.root.className,
  );

  return state;
};
