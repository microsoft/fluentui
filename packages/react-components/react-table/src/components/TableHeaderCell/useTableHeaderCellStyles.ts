import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableHeaderCellSlots, TableHeaderCellState } from './TableHeaderCell.types';

export const tableHeaderCellClassName = 'fui-TableHeaderCell';
export const tableHeaderCellClassNames: SlotClassNames<TableHeaderCellSlots> = {
  root: 'fui-TableHeaderCell',
  button: 'fui-TableHeaderCell__button',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    minHeight: '44px',
    ...shorthands.padding('0px', tokens.spacingHorizontalS),
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    ...shorthands.flex(1, 1, '0px'),
  },

  resetButton: {
    boxSizing: 'content-box',
    backgroundColor: 'inherit',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'normal',
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    ...shorthands.borderStyle('none'),
    WebkitAppearance: 'button',
    textAlign: 'unset',
  },
});

/**
 * Apply styling to the TableHeaderCell slots based on the state
 */
export const useTableHeaderCellStyles_unstable = (state: TableHeaderCellState): TableHeaderCellState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableHeaderCellClassNames.root, styles.root, state.root.className);
  state.button.className = mergeClasses(tableHeaderCellClassNames.button, styles.resetButton, state.button.className);

  return state;
};
