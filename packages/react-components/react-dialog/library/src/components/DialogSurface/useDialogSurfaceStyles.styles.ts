'use client';

import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import {
  DIALOG_FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
  DIALOG_MEDIA_QUERY_BREAKPOINT_SELECTOR,
  DIALOG_MEDIA_QUERY_SHORT_SCREEN,
  SURFACE_BORDER_WIDTH,
  SURFACE_PADDING,
} from '../../contexts';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const dialogSurfaceClassNames: SlotClassNames<Omit<DialogSurfaceSlots, 'backdropMotion'>> = {
  root: 'fui-DialogSurface',
  backdrop: 'fui-DialogSurface__backdrop',
};

/**
 * Styles for the root slot
 */
const useRootBaseStyle = makeResetStyles({
  ...createFocusOutlineStyle(),
  inset: 0,
  padding: SURFACE_PADDING,
  margin: 'auto',
  borderStyle: 'none',
  overflow: 'unset',
  border: `${SURFACE_BORDER_WIDTH} solid ${tokens.colorTransparentStroke}`,
  borderRadius: tokens.borderRadiusXLarge,

  display: 'block',
  userSelect: 'unset',
  visibility: 'unset',
  position: 'fixed',
  height: 'fit-content',
  maxWidth: '600px',
  maxHeight: ['100vh', '100dvh'],
  boxSizing: 'border-box',
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
  // Same styles as DialogSurfaceMotion last keyframe,
  // to ensure dialog will be properly styled when surfaceMotion is opted-out
  boxShadow: tokens.shadow64,

  [DIALOG_MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
    maxWidth: '100vw',
  },

  [DIALOG_MEDIA_QUERY_SHORT_SCREEN]: {
    overflowY: 'auto',
    // We need to offset the scrollbar by adding transparent borders otherwise
    // it conflicts with the border radius.
    paddingRight: `calc(${SURFACE_PADDING} - ${DIALOG_FULLSCREEN_DIALOG_SCROLLBAR_OFFSET})`,
    borderRightWidth: DIALOG_FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
    borderTopWidth: DIALOG_FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
    borderBottomWidth: DIALOG_FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
  },
});

const useBackdropBaseStyle = makeResetStyles({
  inset: '0px',
  backgroundColor: tokens.colorBackgroundOverlay,
  position: 'fixed',
});

const useStyles = makeStyles({
  nestedDialogBackdrop: {
    backgroundColor: tokens.colorTransparentBackground,
  },

  dialogHidden: {
    pointerEvents: 'none',
  },
});

/**
 * Apply styling to the DialogSurface slots based on the state
 */
export const useDialogSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  'use no memo';

  const { root, backdrop, open, unmountOnClose, treatBackdropAsNested, backdropAppearance } = state;

  const rootBaseStyle = useRootBaseStyle();
  const backdropBaseStyle = useBackdropBaseStyle();
  const styles = useStyles();
  const isBackdropTransparent = backdropAppearance ? backdropAppearance === 'transparent' : treatBackdropAsNested;

  const mountedAndClosed = !unmountOnClose && !open;

  root.className = mergeClasses(
    dialogSurfaceClassNames.root,
    rootBaseStyle,
    mountedAndClosed && styles.dialogHidden,
    root.className,
  );

  if (backdrop) {
    backdrop.className = mergeClasses(
      dialogSurfaceClassNames.backdrop,
      backdropBaseStyle,
      mountedAndClosed && styles.dialogHidden,
      isBackdropTransparent && styles.nestedDialogBackdrop,
      backdrop.className,
    );
  }

  return state;
};
