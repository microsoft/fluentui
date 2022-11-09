import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableHeaderCellSlots, TableHeaderCellState } from './TableHeaderCell.types';

export const tableHeaderCellClassName = 'fui-TableHeaderCell';
export const tableHeaderCellClassNames: SlotClassNames<TableHeaderCellSlots> = {
  root: 'fui-TableHeaderCell',
  button: 'fui-TableHeaderCell__button',
  sortIcon: 'fui-TableHeaderCell__sortIcon',
};

const useTableLayoutStyles = makeStyles({
  root: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
});

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    ...shorthands.flex(1, 1, '0px'),
    minWidth: '0px',
  },
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.padding('0px', tokens.spacingHorizontalS),
  },

  rootInteractive: {
    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
  },

  resetButton: {
    resize: 'horizontal',
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
  button: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    minHeight: '44px',
    ...shorthands.flex(1, 1, '0px'),
  },
  sortable: {
    cursor: 'pointer',
  },

  sortIcon: {
    display: 'flex',
    alignItems: 'center',
  },
});

/**
 * Apply styling to the TableHeaderCell slots based on the state
 */
export const useTableHeaderCellStyles_unstable = (state: TableHeaderCellState): TableHeaderCellState => {
  const styles = useStyles();
  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    tableHeaderCellClassNames.root,
    styles.root,
    state.sortable && styles.rootInteractive,
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    state.root.className,
  );
  state.button.className = mergeClasses(
    tableHeaderCellClassNames.button,
    styles.resetButton,
    styles.button,
    state.sortable && styles.sortable,
    state.button.className,
  );

  if (state.sortIcon) {
    state.sortIcon.className = mergeClasses(
      tableHeaderCellClassNames.sortIcon,
      styles.sortIcon,
      state.sortIcon.className,
    );
  }

  return state;
};
