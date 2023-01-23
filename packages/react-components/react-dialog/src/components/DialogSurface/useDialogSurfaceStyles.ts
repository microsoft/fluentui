import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import {
  MEDIA_QUERY_BREAKPOINT_SELECTOR,
  SURFACE_BORDER_RADIUS,
  SURFACE_BORDER_WIDTH,
  SURFACE_PADDING,
  useDialogContext_unstable,
} from '../../contexts';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';

export const dialogSurfaceClassNames: SlotClassNames<DialogSurfaceSlots> = {
  root: 'fui-DialogSurface',
  backdrop: 'fui-DialogSurface__backdrop',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  focusOutline: createFocusOutlineStyle(),
  root: {
    display: 'block',
    userSelect: 'unset',
    visibility: 'unset',
    ...shorthands.inset(0),
    ...shorthands.padding(0),
    ...shorthands.padding(SURFACE_PADDING),
    ...shorthands.margin('auto'),
    ...shorthands.borderStyle('none'),
    ...shorthands.overflow('unset'),
    '&::backdrop': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    position: 'fixed',
    width: '100%',
    height: 'fit-content',
    maxWidth: '600px',
    maxHeight: '100vh',
    boxSizing: 'border-box',
    boxShadow: tokens.shadow64,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    ...shorthands.border(SURFACE_BORDER_WIDTH, 'solid', tokens.colorTransparentStroke),
    ...shorthands.borderRadius(SURFACE_BORDER_RADIUS),
    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      maxWidth: '100vw',
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
    styles.root,
    styles.focusOutline,
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
