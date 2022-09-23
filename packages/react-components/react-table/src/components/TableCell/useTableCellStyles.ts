import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableCellSlots, TableCellState } from './TableCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableCellClassName = 'fui-TableCell';
export const tableCellClassNames: SlotClassNames<TableCellSlots> = {
  root: tableCellClassName,
};

const useNativeLayoutStyles = makeStyles({
  root: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
});

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    minWidth: '0px',
    alignItems: 'center',
    ...shorthands.flex(1, 1, '0px'),
  },
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'relative',
    ...shorthands.padding('0px', tokens.spacingHorizontalS),
  },
});

/**
 * Apply styling to the TableCell slots based on the state
 */
export const useTableCellStyles_unstable = (state: TableCellState): TableCellState => {
  const styles = useStyles();
  const layoutStyles = {
    native: useNativeLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    tableCellClassNames.root,
    styles.root,
    layoutStyles[state.layoutType].root,
    state.root.className,
  );
  return state;
};
