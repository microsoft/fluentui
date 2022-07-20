import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogContentSlots, DialogContentState } from './DialogContent.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import {
  DIALOG_BORDER_RADIUS,
  DIALOG_BORDER_WIDTH,
  DIALOG_CONTENT_PADDING,
  DIALOG_GAP,
  MEDIA_QUERY_BREAKPOINT_SELECTOR,
} from '../../contexts/constants';

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
    width: '100%',
    height: 'fit-content',
    maxWidth: '600px',
    maxHeight: '100vh',
    boxSizing: 'border-box',
    boxShadow: tokens.shadow64,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.gap(DIALOG_GAP),
    ...shorthands.border(DIALOG_BORDER_WIDTH, 'solid', tokens.colorTransparentStroke),
    ...shorthands.borderRadius(DIALOG_BORDER_RADIUS),
    ...shorthands.margin('auto'),
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: '1fr 1fr auto',
    gridTemplateAreas: `
    "title        title         close-button"
    "body         body          body"
    "actions-left actions-right actions-right"
    `,
    ...shorthands.padding(DIALOG_CONTENT_PADDING),
    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      maxWidth: '100vw',
      gridTemplateRows: 'auto 1fr auto auto',
      gridTemplateAreas: `
        "title         title         close-button"
        "body          body          body"
        "actions-left  actions-left  actions-left"
        "actions-right actions-right actions-right"
      `,
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
