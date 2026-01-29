import { makeStyles, mergeClasses } from '@griffel/react';
import { tableClassName, type TableState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

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
    backgroundColor: semanticTokens.backgroundCtrlSubtleRest,
  },
});

/**
 * Apply styling to the Table slots based on the state
 */
export const useSemanticTableStyles = (_state: unknown): TableState => {
  'use no memo';

  const state = _state as TableState;

  const styles = useStyles();
  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    state.root.className,
    tableClassName,
    styles.root,
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
