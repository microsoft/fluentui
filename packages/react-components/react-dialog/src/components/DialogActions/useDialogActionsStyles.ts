import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogActionsSlots, DialogActionsState } from './DialogActions.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { DIALOG_GAP, MEDIA_QUERY_BREAKPOINT_SELECTOR } from '../../contexts/constants';
import * as localShorthands from '../../utils/localShorthands';

export const dialogActionsClassNames: SlotClassNames<DialogActionsSlots> = {
  root: 'fui-DialogActions',
};

const useStyles = makeStyles({
  root: {
    height: 'fit-content',
    boxSizing: 'border-box',
    display: 'flex',
    ...shorthands.gap(DIALOG_GAP),
    '> .fui-Button': {
      maxWidth: '100%',
    },
    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      flexDirection: 'column',
      justifySelf: 'stretch',
    },
  },
  gridPositionRight: {
    justifySelf: 'end',
    ...localShorthands.gridArea('actions-right'),
  },
  gridPositionLeft: {
    justifySelf: 'start',
    ...localShorthands.gridArea('actions-left'),
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
    state.position === 'left' && styles.gridPositionLeft,
    state.position === 'right' && styles.gridPositionRight,
    state.root.className,
  );
  return state;
};
