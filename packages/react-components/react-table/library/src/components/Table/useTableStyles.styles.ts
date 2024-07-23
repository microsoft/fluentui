import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableSlots, TableState } from './Table.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableClassName = 'fui-Table';
export const tableClassNames: SlotClassNames<TableSlots> = {
  root: 'fui-Table',
};

const useTableLayoutStyles = makeStyles({
  root: {
    display: 'table',
    verticalAlign: 'middle',
    width: '100%',
    tableLayout: 'fixed',
  },
});

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'block',
  },
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    borderCollapse: 'collapse',
    backgroundColor: tokens.colorSubtleBackground,
  },
});

/**
 * Apply styling to the Table slots based on the state
 */
export const useTableStyles_unstable = (state: TableState): TableState => {
  'use no memo';

  const styles = useStyles();
  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    tableClassName,
    styles.root,
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    state.root.className,
  );

  return state;
};
