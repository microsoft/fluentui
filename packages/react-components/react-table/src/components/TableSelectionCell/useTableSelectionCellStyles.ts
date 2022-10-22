import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TableSelectionCellSlots, TableSelectionCellState } from './TableSelectionCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const tableSelectionCellClassNames: SlotClassNames<TableSelectionCellSlots> = {
  root: 'fui-TableSelectionCell',
  checkboxIndicator: 'fui-TableSelectionCell__checkboxIndicator',
  radioIndicator: 'fui-TableSelectionCell__radioIndicator',
};

const useTableLayoutStyles = makeStyles({
  root: {
    display: 'table-cell',
    width: '44px',
  },
});

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    ...shorthands.flex(1, 1, '0px'),
    minWidth: '44px',
    maxWidth: '44px',
    justifyContent: 'center',
  },
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    ...shorthands.padding(0),
  },

  radioIndicator: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      width: '16px',
      height: '16px',
    },
  },

  subtle: {
    opacity: 0,
    ...createCustomFocusIndicatorStyle(
      {
        opacity: 1,
      },
      { selector: 'focus-within' },
    ),
  },

  hidden: {
    visibility: 'hidden',
  },
});

/**
 * Apply styling to the TableSelectionCell slots based on the state
 */
export const useTableSelectionCellStyles_unstable = (state: TableSelectionCellState): TableSelectionCellState => {
  const styles = useStyles();
  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    tableSelectionCellClassNames.root,
    styles.root,
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    state.subtle && state.checked === false && styles.subtle,
    state.hidden && styles.hidden,
    state.root.className,
  );
  if (state.checkboxIndicator) {
    state.checkboxIndicator.className = mergeClasses(
      tableSelectionCellClassNames.checkboxIndicator,
      state.checkboxIndicator.className,
    );
  }

  if (state.radioIndicator) {
    state.radioIndicator.className = mergeClasses(
      tableSelectionCellClassNames.radioIndicator,
      styles.radioIndicator,
      state.radioIndicator.className,
    );
  }

  return state;
};
