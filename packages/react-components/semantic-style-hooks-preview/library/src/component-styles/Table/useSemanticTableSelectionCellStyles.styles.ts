import { makeStyles, mergeClasses } from '@griffel/react';
import { tableSelectionCellClassNames, type TableSelectionCellState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const CELL_WIDTH = 44;

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
      {
        outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens.ctrlFocusInnerStroke}`,
        borderRadius: semanticTokens.cornerCtrlRest,
      },
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
export const useSemanticTableSelectionCellStyles = (_state: unknown): TableSelectionCellState => {
  'use no memo';

  const state = _state as TableSelectionCellState;

  const styles = useStyles();
  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    state.root.className,
    tableSelectionCellClassNames.root,
    styles.root,
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    state.subtle && state.checked === false && styles.subtle,
    state.hidden && styles.hidden,
    getSlotClassNameProp_unstable(state.root),
  );
  if (state.checkboxIndicator) {
    state.checkboxIndicator.className = mergeClasses(
      state.checkboxIndicator.className,
      tableSelectionCellClassNames.checkboxIndicator,
      getSlotClassNameProp_unstable(state.checkboxIndicator),
    );
  }

  if (state.radioIndicator) {
    state.radioIndicator.className = mergeClasses(
      state.radioIndicator.className,
      tableSelectionCellClassNames.radioIndicator,
      styles.radioIndicator,
      getSlotClassNameProp_unstable(state.radioIndicator),
    );
  }

  return state;
};
