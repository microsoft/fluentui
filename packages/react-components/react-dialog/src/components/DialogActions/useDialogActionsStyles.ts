import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogActionsSlots, DialogActionsState } from './DialogActions.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { DIALOG_CONTENT_PADDING, MEDIA_QUERY_BREAKPOINT_SELECTOR } from '../../contexts/constants';

export const dialogActionsClassName = 'fui-DialogActions';
export const dialogActionsClassNames: SlotClassNames<DialogActionsSlots> = {
  root: 'fui-DialogActions',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
    justifyContent: 'end',
    height: 'fit-content',
    width: '100%',
    boxSizing: 'border-box',
    ...shorthands.gap('8px'),
    ...shorthands.padding('0', DIALOG_CONTENT_PADDING, DIALOG_CONTENT_PADDING, DIALOG_CONTENT_PADDING),
    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      '> .fui-Button': {
        maxWidth: '100%',
      },
    },
  },
});

/**
 * Apply styling to the DialogActions slots based on the state
 */
export const useDialogActionsStyles_unstable = (state: DialogActionsState): DialogActionsState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogActionsClassName, styles.root, state.root.className);
  return state;
};
