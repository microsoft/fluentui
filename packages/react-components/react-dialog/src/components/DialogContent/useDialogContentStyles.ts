import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogContentSlots, DialogContentState } from './DialogContent.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { MEDIA_QUERY_BREAKPOINT_SELECTOR } from '../../contexts/constants';

export const dialogContentClassNames: SlotClassNames<DialogContentSlots> = {
  root: 'fui-DialogContent',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'fit-content',
    maxWidth: '600px',
    maxHeight: '100vh',
    boxShadow: tokens.shadow64,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
    ...shorthands.borderRadius('8px'),
    ...shorthands.margin('auto'),
    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      maxWidth: '100vw',
      width: '100%',
    },
  },
});

/**
 * Apply styling to the DialogContent slots based on the state
 */
export const useDialogContentStyles_unstable = (state: DialogContentState): DialogContentState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogContentClassNames.root, styles.root, state.root.className);
  return state;
};
