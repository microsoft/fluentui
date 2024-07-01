import { makeStyles, mergeClasses } from '@griffel/react';
import type { TableSelectionCellSlots, TableSelectionCellState } from './TableSelectionCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';

export const CELL_WIDTH = 44;

export const tableSelectionCellClassNames: SlotClassNames<TableSelectionCellSlots> = {
  root: 'fui-TableSelectionCell',
  checkboxIndicator: 'fui-TableSelectionCell__checkboxIndicator',
  radioIndicator: 'fui-TableSelectionCell__radioIndicator',
};

const useTableLayoutStyles = makeStyles({
  root: {
    display: 'table-cell',
    width: `${CELL_WIDTH}px`,
  },
});

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    flex: '1 1 0px',
    minWidth: `${CELL_WIDTH}px`,
    maxWidth: `${CELL_WIDTH}px`,
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
    padding: '0',
    ...createCustomFocusIndicatorStyle(
      { outline: `2px solid ${tokens.colorStrokeFocus2}`, borderRadius: tokens.borderRadiusMedium },
      { selector: 'focus' },
    ),
  },

  radioIndicator: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    opacity: 0,
  },
});

/**
 * Apply styling to the TableSelectionCell slots based on the state
 */
export const useTableSelectionCellStyles_unstable = (state: TableSelectionCellState): TableSelectionCellState => {
  'use no memo';

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
