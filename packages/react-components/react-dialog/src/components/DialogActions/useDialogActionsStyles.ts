import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogActionsSlots, DialogActionsState } from './DialogActions.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import {
  DIALOG_GAP,
  ACTIONS_END_GRID_AREA,
  ACTIONS_START_GRID_AREA,
  MEDIA_QUERY_BREAKPOINT_SELECTOR,
} from '../../contexts/constants';

export const dialogActionsClassNames: SlotClassNames<DialogActionsSlots> = {
  root: 'fui-DialogActions',
};

const useStyles = makeStyles({
  root: {
    height: 'fit-content',
    boxSizing: 'border-box',
    display: 'flex',
    ...shorthands.gap(DIALOG_GAP),
    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      flexDirection: 'column',
      justifySelf: 'stretch',
    },
  },
  gridPositionEnd: {
    justifySelf: 'end',
    ...shorthands.gridArea(ACTIONS_END_GRID_AREA),
  },
  gridPositionStart: {
    justifySelf: 'start',
    ...shorthands.gridArea(ACTIONS_START_GRID_AREA),
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
    state.root.className,
  );
  return state;
};
