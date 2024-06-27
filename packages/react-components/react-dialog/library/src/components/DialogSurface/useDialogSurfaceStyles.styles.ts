import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import {
  FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
  MEDIA_QUERY_BREAKPOINT_SELECTOR,
  MEDIA_QUERY_SHORT_SCREEN,
  SURFACE_BORDER_WIDTH,
  SURFACE_PADDING,
} from '../../contexts';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';

export const dialogSurfaceClassNames: SlotClassNames<DialogSurfaceSlots> = {
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
  maxHeight: '100vh',
  boxSizing: 'border-box',
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,

  [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
    maxWidth: '100vw',
  },

  [MEDIA_QUERY_SHORT_SCREEN]: {
    overflowY: 'auto',
    // We need to offset the scrollbar by adding transparent borders otherwise
    // it conflicts with the border radius.
    paddingRight: `calc(${SURFACE_PADDING} - ${FULLSCREEN_DIALOG_SCROLLBAR_OFFSET})`,
    borderRightWidth: FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
    borderTopWidth: FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
    borderBottomWidth: FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
  },
});

const useBackdropBaseStyle = makeResetStyles({
  inset: '0px',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  position: 'fixed',
});

const useBackdropStyles = makeStyles({
  nestedDialogBackdrop: {
    backgroundColor: tokens.colorTransparentBackground,
  },
});

/**
 * Apply styling to the DialogSurface slots based on the state
 */
export const useDialogSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  'use no memo';

  const { isNestedDialog, root, backdrop } = state;

  const rootBaseStyle = useRootBaseStyle();

  const backdropBaseStyle = useBackdropBaseStyle();
  const backdropStyles = useBackdropStyles();

  root.className = mergeClasses(dialogSurfaceClassNames.root, rootBaseStyle, root.className);

  if (backdrop) {
    backdrop.className = mergeClasses(
      dialogSurfaceClassNames.backdrop,
      backdropBaseStyle,
      isNestedDialog && backdropStyles.nestedDialogBackdrop,
      backdrop.className,
    );
  }

  return state;
};
