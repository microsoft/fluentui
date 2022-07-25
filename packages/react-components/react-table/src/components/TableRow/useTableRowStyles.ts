import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableRowSlots, TableRowState } from './TableRow.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableRowClassName = 'fui-TableRow';
export const tableRowClassNames: SlotClassNames<TableRowSlots> = {
  root: tableRowClassName,
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '44px',
    color: tokens.colorNeutralForeground1,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
});

/**
 * Apply styling to the TableRow slots based on the state
 */
export const useTableRowStyles_unstable = (state: TableRowState): TableRowState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableRowClassNames.root, styles.root, state.root.className);

  return state;
};
