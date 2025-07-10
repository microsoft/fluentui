import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import {
  dialogSurfaceClassNames,
  DialogSurfaceState,
  FULLSCREEN_DIALOG_SCROLLBAR_OFFSET,
  MEDIA_QUERY_BREAKPOINT_SELECTOR,
  MEDIA_QUERY_SHORT_SCREEN,
} from '@fluentui/react-dialog';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
  boxShadow: semanticTokens.ctrlDialogBaseShadow,

  '@supports (height: 1dvh)': {
    maxHeight: '100dvh',
  },

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

const useStyles = makeStyles({
  nestedDialogBackdrop: {
    backgroundColor: semanticTokens.nullColor,
  },
});

/**
 * Apply styling to the DialogSurface slots based on the state
 */
export const useSemanticDialogSurfaceStyles = (_state: unknown): DialogSurfaceState => {
  'use no memo';

  const state = _state as DialogSurfaceState;
  const { isNestedDialog, root, backdrop } = state;

  const rootBaseStyle = useRootBaseStyle();

  const backdropBaseStyle = useBackdropBaseStyle();
  const styles = useStyles();

  root.className = mergeClasses(
    root.className,
    dialogSurfaceClassNames.root,
    rootBaseStyle,
    getSlotClassNameProp_unstable(root),
  );

  if (backdrop) {
    backdrop.className = mergeClasses(
      backdrop.className,
      dialogSurfaceClassNames.backdrop,
      backdropBaseStyle,
      isNestedDialog && styles.nestedDialogBackdrop,
      getSlotClassNameProp_unstable(backdrop),
    );
  }

  return state;
};
