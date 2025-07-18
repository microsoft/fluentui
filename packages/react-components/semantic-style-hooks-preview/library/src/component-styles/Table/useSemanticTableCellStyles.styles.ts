import { makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tableCellClassNames, type TableCellState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

const useTableLayoutStyles = makeStyles({
  root: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },

  medium: {
    height: '44px',
  },

  small: {
    height: '34px',
  },

  'extra-small': {
    height: '24px',
  },
});

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    minWidth: '0px',
    alignItems: 'center',
    flex: '1 1 0px',
  },

  medium: {
    minHeight: '44px',
  },

  small: {
    minHeight: '34px',
  },

  'extra-small': {
    minHeight: '24px',
  },
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'relative',
    padding: `0px ${semanticTokens.ctrlChoicePaddingHorizontal}`,

    ...createCustomFocusIndicatorStyle(
      {
        outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens.ctrlFocusInnerStroke}`,
        borderRadius: semanticTokens.cornerCtrlRest,
      },
      { selector: 'focus' },
    ),
  },
});

/**
 * Apply styling to the TableCell slots based on the state
 */
export const useSemanticTableCellStyles = (_state: unknown): TableCellState => {
  'use no memo';

  const state = _state as TableCellState;

  const styles = useStyles();
  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    state.root.className,
    tableCellClassNames.root,
    styles.root,
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    state.noNativeElements ? layoutStyles.flex[state.size] : layoutStyles.table[state.size],
    getSlotClassNameProp_unstable(state.root),
  );
  return state;
};
