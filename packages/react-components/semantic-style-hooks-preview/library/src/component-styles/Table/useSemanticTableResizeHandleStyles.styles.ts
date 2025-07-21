import { makeStyles, mergeClasses } from '@griffel/react';
import { tableResizeHandleClassNames, type TableResizeHandleState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '16px',
    margin: '0 -8px',
    cursor: 'col-resize',
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '.2s',
    zIndex: 1,

    // If mouse users focus on the resize handle through a context menu, we want the handle
    // to be visible because the mouse might not be hovering over the handle
    ':focus': {
      opacity: 1,
      outlineStyle: 'none',
    },

    ':hover': {
      opacity: 1,
    },

    '::after': {
      content: '" "',
      display: 'block',
      width: semanticTokens.strokeWidthDividerDefault,
      position: 'absolute',
      left: '50%',
      top: 0,
      bottom: 0,
      backgroundColor: semanticTokens.strokeDividerStrong,
    },
  },
});

/**
 * Apply styling to the TableResizeHandle slots based on the state
 */
export const useSemanticTableResizeHandleStyles = (_state: unknown): TableResizeHandleState => {
  'use no memo';

  const state = _state as TableResizeHandleState;

  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    tableResizeHandleClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root),
  );
  return state;
};
