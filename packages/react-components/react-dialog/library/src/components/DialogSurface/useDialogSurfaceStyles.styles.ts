import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import {
  FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
  MEDIA_QUERY_BREAKPOINT_SELECTOR,
  MEDIA_QUERY_SHORT_SCREEN,
} from '../../contexts';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';
import * as semanticTokens from '@fluentui/semantic-tokens';

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
  padding: semanticTokens.paddingContentLarge,
  margin: 'auto',
  borderStyle: 'none',
  overflow: 'unset',
  border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.ctrlDialogStroke}`,
  borderRadius: semanticTokens.ctrlDialogBaseCorner,

  display: 'block',
  userSelect: 'unset',
  visibility: 'unset',
  position: 'fixed',
  height: 'fit-content',
  maxWidth: '600px',
  maxHeight: '100vh',
  boxSizing: 'border-box',
  backgroundColor: semanticTokens.ctrlDialogLayerBackground,
  color: semanticTokens.foregroundContentNeutralPrimary,
  // Same styles as DialogSurfaceMotion last keyframe,
  // to ensure dialog will be properly styled when surfaceMotion is opted-out
  boxShadow: `${semanticTokens.ctrlDialogBaseShadowKey} ${semanticTokens.ctrlDialogBaseShadowAmbient}`,

  [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
    maxWidth: '100vw',
  },

  [MEDIA_QUERY_SHORT_SCREEN]: {
    overflowY: 'auto',
    // We need to offset the scrollbar by adding transparent borders otherwise
    // it conflicts with the border radius.
    paddingRight: `calc(${semanticTokens.paddingContentLarge} - ${FULLSCREEN_DIALOG_SCROLLBAR_OFFSET})`,
    borderRightWidth: FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
    borderTopWidth: FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
    borderBottomWidth: FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
  },
});

const useBackdropBaseStyle = makeResetStyles({
  inset: '0px',
  backgroundColor: semanticTokens.backgroundSmoke,
  position: 'fixed',
});

const useBackdropStyles = makeStyles({
  nestedDialogBackdrop: {
    backgroundColor: semanticTokens.nullColor,
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
