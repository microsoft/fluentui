import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { TableHeaderCellSlots, TableHeaderCellState } from './TableHeaderCell.types';

export const tableHeaderCellClassName = 'fui-TableHeaderCell';
export const tableHeaderCellClassNames: SlotClassNames<TableHeaderCellSlots> = {
  root: 'fui-TableHeaderCell',
  button: 'fui-TableHeaderCell__button',
  sortIcon: 'fui-TableHeaderCell__sortIcon',
  aside: 'fui-TableHeaderCell__aside',
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
    flex: '1 1 0px',
    minWidth: '0px',
  },
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    fontWeight: `var(--ctrl-token-TableHeaderCell-1963, var(--semantic-token-TableHeaderCell-1964, ${tokens.fontWeightRegular}))`,
    padding: `0px ${tokens.spacingHorizontalS}`,
    ...createCustomFocusIndicatorStyle(
      {
        outline: `2px solid ${tokens.colorStrokeFocus2}`,
        borderRadius: `var(--ctrl-token-TableHeaderCell-1965, var(--semantic-token-TableHeaderCell-1966, ${tokens.borderRadiusMedium}))`,
      },
      { selector: 'focus-within' },
    ),
    position: 'relative',
  },

  rootInteractive: {
    ':hover': {
      backgroundColor: `var(--ctrl-token-TableHeaderCell-1967, var(--semantic-token-TableHeaderCell-1968, ${tokens.colorSubtleBackgroundHover}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-TableHeaderCell-1969, var(--semantic-token-TableHeaderCell-1970, ${tokens.colorSubtleBackgroundPressed}))`,
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
    overflow: 'visible',
    padding: '0',
    border: 'none',
    textAlign: 'unset',
  },

  button: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    alignItems: 'center',
    gap: `var(--ctrl-token-TableHeaderCell-1971, var(--semantic-token-TableHeaderCell-1972, ${tokens.spacingHorizontalXS}))`,
    minHeight: '32px',
    flex: '1 1 0px',
    outlineStyle: 'none',
  },

  sortable: {
    cursor: 'pointer',
  },

  sortIcon: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: `var(--ctrl-token-TableHeaderCell-1973, var(--semantic-token-TableHeaderCell-1974, ${tokens.spacingVerticalXXS}))`,
  },

  resizeHandle: {},
});

/**
 * Apply styling to the TableHeaderCell slots based on the state
 */
export const useTableHeaderCellStyles_unstable = (state: TableHeaderCellState): TableHeaderCellState => {
  'use no memo';

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

  if (state.aside) {
    state.aside.className = mergeClasses(tableHeaderCellClassNames.aside, styles.resizeHandle, state.aside.className);
  }

  return state;
};
