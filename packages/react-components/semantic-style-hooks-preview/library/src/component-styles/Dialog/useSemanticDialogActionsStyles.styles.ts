import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import * as semanticTokens from '@fluentui/semantic-tokens';
import {
  type DialogActionsState,
  dialogActionsClassNames,
  MEDIA_QUERY_BREAKPOINT_SELECTOR,
} from '@fluentui/react-dialog';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

/**
 * Styles for the root slot
 */
const useResetStyles = makeResetStyles({
  gap: semanticTokens.gapBetweenCtrlDefault,
  height: 'fit-content',
  boxSizing: 'border-box',
  display: 'flex',
  gridRowStart: 3,
  gridRowEnd: 3,
  [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
    flexDirection: 'column',
    justifySelf: 'stretch',
  },
});

const useStyles = makeStyles({
  gridPositionEnd: {
    justifySelf: 'end',
    gridColumnStart: 2,
    gridColumnEnd: 4,
    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      gridColumnStart: 1,
      gridRowStart: 4,
      gridRowEnd: 'auto',
    },
  },
  gridPositionStart: {
    justifySelf: 'start',
    gridColumnStart: 1,
    gridColumnEnd: 2,
    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      gridColumnEnd: 4,
      gridRowStart: 3,
      gridRowEnd: 'auto',
    },
  },
  fluidStart: {
    gridColumnEnd: 4,
  },
  fluidEnd: {
    gridColumnStart: 1,
  },
});

/**
 * Apply styling to the DialogActions slots based on the state
 */
export const useSemanticDialogActionsStyles = (_state: unknown): DialogActionsState => {
  'use no memo';

  const state = _state as DialogActionsState;
  const resetStyles = useResetStyles();
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    dialogActionsClassNames.root,
    resetStyles,
    state.position === 'start' && styles.gridPositionStart,
    state.position === 'end' && styles.gridPositionEnd,
    state.fluid && state.position === 'start' && styles.fluidStart,
    state.fluid && state.position === 'end' && styles.fluidEnd,
    getSlotClassNameProp_unstable(state.root),
  );
  return state;
};
