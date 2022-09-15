import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableCellActionsSlots, TableCellActionsState } from './TableCellActions.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const tableCellActionsClassNames: SlotClassNames<TableCellActionsSlots> = {
  root: 'fui-TableCellActions',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'absolute',
    right: '0px',
    top: '50%',
    transform: 'translateY(-50%)',
    opacity: 0,
    marginLeft: 'auto',
    backgroundColor: tokens.colorNeutralBackground1Hover,

    ...createCustomFocusIndicatorStyle(
      {
        opacity: 1,
      },
      { selector: 'focus-within' },
    ),
  },
});

/**
 * Apply styling to the TableCellActions slots based on the state
 */
export const useTableCellActionsStyles_unstable = (state: TableCellActionsState): TableCellActionsState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableCellActionsClassNames.root, styles.root, state.root.className);

  return state;
};
