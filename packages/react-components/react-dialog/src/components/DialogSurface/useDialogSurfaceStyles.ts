import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import {
  TITLE_GRID_AREA,
  ACTIONS_END_GRID_AREA,
  ACTIONS_START_GRID_AREA,
  SURFACE_BORDER_RADIUS,
  SURFACE_BORDER_WIDTH,
  SURFACE_PADDING,
  DIALOG_GAP,
  MEDIA_QUERY_BREAKPOINT_SELECTOR,
  BODY_GRID_AREA,
  TITLE_ACTION_GRID_AREA,
} from '../../contexts/constants';
import { useDialogContext_unstable } from '../../contexts/dialogContext';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';

export const dialogSurfaceClassNames: SlotClassNames<DialogSurfaceSlots> = {
  root: 'fui-DialogSurface',
  backdrop: 'fui-DialogSurface__backdrop',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    width: '100%',
    height: 'fit-content',
    maxWidth: '600px',
    maxHeight: '100vh',
    boxSizing: 'border-box',
    boxShadow: tokens.shadow64,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.gap(DIALOG_GAP),
    ...shorthands.border(SURFACE_BORDER_WIDTH, 'solid', tokens.colorTransparentStroke),
    ...shorthands.borderRadius(SURFACE_BORDER_RADIUS),
    ...shorthands.margin('auto'),
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: '1fr 1fr auto',
    gridTemplateAreas: `
      "${TITLE_GRID_AREA} ${TITLE_GRID_AREA} ${TITLE_ACTION_GRID_AREA}"
      "${BODY_GRID_AREA} ${BODY_GRID_AREA} ${BODY_GRID_AREA}"
      "${ACTIONS_START_GRID_AREA} ${ACTIONS_END_GRID_AREA} ${ACTIONS_END_GRID_AREA}"
    `,
    ...shorthands.padding(SURFACE_PADDING),
    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      maxWidth: '100vw',
      gridTemplateRows: 'auto 1fr auto auto',
      gridTemplateAreas: `
        "${TITLE_GRID_AREA} ${TITLE_GRID_AREA} ${TITLE_ACTION_GRID_AREA}"
        "${BODY_GRID_AREA} ${BODY_GRID_AREA} ${BODY_GRID_AREA}"
        "${ACTIONS_START_GRID_AREA} ${ACTIONS_START_GRID_AREA} ${ACTIONS_START_GRID_AREA}"
        "${ACTIONS_END_GRID_AREA} ${ACTIONS_END_GRID_AREA} ${ACTIONS_END_GRID_AREA}"
      `,
    },
  },
  dialog: {
    display: 'block',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 'fit-content',
    height: 'fit-content',
    backgroundColor: 'unset',
    maxWidth: 'unset',
    maxHeight: 'unset',
    userSelect: 'unset',
    visibility: 'unset',
    ...shorthands.padding(0),
    ...shorthands.margin('auto'),
    ...shorthands.borderStyle('none'),
    ...shorthands.overflow('unset'),
    '&::backdrop': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
  },
  backdrop: {
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    ...shorthands.inset('0px'),
  },
  nestedDialogBackdrop: {
    backgroundColor: 'transparent',
  },
  nestedNativeDialogBackdrop: {
    '&::backdrop': {
      backgroundColor: 'transparent',
    },
  },
});

/**
 * Apply styling to the DialogSurface slots based on the state
 */
export const useDialogSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  const styles = useStyles();
  const isNestedDialog = useDialogContext_unstable(ctx => ctx.isNestedDialog);

  state.root.className = mergeClasses(
    dialogSurfaceClassNames.root,
    styles.dialog,
    styles.root,
    isNestedDialog && styles.nestedNativeDialogBackdrop,
    state.root.className,
  );
  if (state.backdrop) {
    state.backdrop.className = mergeClasses(
      dialogSurfaceClassNames.backdrop,
      styles.backdrop,
      isNestedDialog && styles.nestedDialogBackdrop,
      state.backdrop.className,
    );
  }
  return state;
};
