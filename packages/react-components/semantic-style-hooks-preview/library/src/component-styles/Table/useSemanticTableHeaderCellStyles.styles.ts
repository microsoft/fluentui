import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tableHeaderCellClassNames, type TableHeaderCellState } from '@fluentui/react-table';
import * as semanticTokens from '@fluentui/semantic-tokens';

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
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    padding: `0px ${semanticTokens.ctrlChoicePaddingHorizontal}`,
    ...createCustomFocusIndicatorStyle(
      {
        outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens.ctrlFocusInnerStroke}`,
        borderRadius: semanticTokens.cornerCtrlRest,
      },
      { selector: 'focus-within' },
    ),
    position: 'relative',
  },

  rootInteractive: {
    ':hover': {
      color: semanticTokens.foregroundCtrlNeutralPrimaryHover,
      backgroundColor: semanticTokens.backgroundCtrlSubtleHover,
    },
    ':active': {
      color: semanticTokens.foregroundCtrlNeutralPrimaryPressed,
      backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
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
    gap: semanticTokens.gapInsideCtrlSmDefault,
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
    paddingTop: semanticTokens.gapBetweenContentXSmall,
  },

  resizeHandle: {},
});

/**
 * Apply styling to the TableHeaderCell slots based on the state
 */
export const useSemanticTableHeaderCellStyles = (_state: unknown): TableHeaderCellState => {
  'use no memo';

  const state = _state as TableHeaderCellState;

  const styles = useStyles();
  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    state.root.className,
    tableHeaderCellClassNames.root,
    styles.root,
    state.sortable && styles.rootInteractive,
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    getSlotClassNameProp_unstable(state.root),
  );

  state.button.className = mergeClasses(
    state.button.className,
    tableHeaderCellClassNames.button,
    styles.resetButton,
    styles.button,
    state.sortable && styles.sortable,
    getSlotClassNameProp_unstable(state.button),
  );

  if (state.sortIcon) {
    state.sortIcon.className = mergeClasses(
      state.sortIcon.className,
      tableHeaderCellClassNames.sortIcon,
      styles.sortIcon,
      getSlotClassNameProp_unstable(state.sortIcon),
    );
  }

  if (state.aside) {
    state.aside.className = mergeClasses(
      state.aside.className,
      tableHeaderCellClassNames.aside,
      styles.resizeHandle,
      getSlotClassNameProp_unstable(state.aside),
    );
  }

  return state;
};
