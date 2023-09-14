import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogActionsSlots, DialogActionsState } from './DialogActions.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { DIALOG_GAP, MEDIA_QUERY_BREAKPOINT_SELECTOR } from '../../contexts/constants';

export const dialogActionsClassNames: SlotClassNames<DialogActionsSlots> = {
  root: 'fui-DialogActions',
};

const useStyles = makeStyles({
  root: {
    height: 'fit-content',
    boxSizing: 'border-box',
    display: 'flex',
    gridRowStart: 3,
    gridRowEnd: 3,
    ...shorthands.gap(DIALOG_GAP),
    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      flexDirection: 'column',
      justifySelf: 'stretch',
    },
  },
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
export const useDialogActionsStyles_unstable = (state: DialogActionsState): DialogActionsState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    dialogActionsClassNames.root,
    styles.root,
    state.position === 'start' && styles.gridPositionStart,
    state.position === 'end' && styles.gridPositionEnd,
    state.fluid && state.position === 'start' && styles.fluidStart,
    state.fluid && state.position === 'end' && styles.fluidEnd,
    state.root.className,
  );
  return state;
};
