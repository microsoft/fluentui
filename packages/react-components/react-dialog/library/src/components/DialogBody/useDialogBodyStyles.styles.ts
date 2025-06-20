import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { DialogBodySlots, DialogBodyState } from './DialogBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { DIALOG_GAP, MEDIA_QUERY_BREAKPOINT_SELECTOR, MEDIA_QUERY_SHORT_SCREEN, SURFACE_PADDING } from '../../contexts';

export const dialogBodyClassNames: SlotClassNames<DialogBodySlots> = {
  root: 'fui-DialogBody',
};

/**
 * Styles for the root slot
 */
const useResetStyles = makeResetStyles({
  overflow: 'unset',
  gap: DIALOG_GAP,
  display: 'grid',
  maxHeight: `calc(100vh - 2 * ${SURFACE_PADDING})`,
  boxSizing: 'border-box',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: '1fr 1fr auto',

  [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
    maxWidth: '100vw',
    gridTemplateRows: 'auto 1fr auto',
  },

  [MEDIA_QUERY_SHORT_SCREEN]: {
    maxHeight: 'unset',
  },
});

const useStyles = makeStyles({
  dynamicViewportRoot: {
    maxHeight: `calc(100dvh - 2 * ${SURFACE_PADDING})`,
  },
});

/**
 * Apply styling to the DialogBody slots based on the state
 */
export const useDialogBodyStyles_unstable = (state: DialogBodyState): DialogBodyState => {
  'use no memo';

  const resetStyles = useResetStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    dialogBodyClassNames.root,
    resetStyles,
    // This will ensure that if dynamic viewport is supported, the dialog will be sized correctly.
    // If not, it will be a no-op and fallback to normal viewport.
    styles.dynamicViewportRoot,
    state.root.className,
  );

  return state;
};
