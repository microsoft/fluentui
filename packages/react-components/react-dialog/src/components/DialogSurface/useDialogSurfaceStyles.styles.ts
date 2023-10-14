import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { MEDIA_QUERY_BREAKPOINT_SELECTOR, SURFACE_BORDER_WIDTH, SURFACE_PADDING } from '../../contexts';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';

export const dialogSurfaceClassNames: SlotClassNames<DialogSurfaceSlots> = {
  root: 'fui-DialogSurface',
  backdrop: 'fui-DialogSurface__backdrop',
};

/**
 * Styles for the root slot
 */
const useRootResetStyles = makeResetStyles({
  ...createFocusOutlineStyle(),
  ...shorthands.inset(0),
  ...shorthands.padding(0),
  ...shorthands.padding(SURFACE_PADDING),
  ...shorthands.margin('auto'),
  ...shorthands.borderStyle('none'),
  ...shorthands.overflow('unset'),
  ...shorthands.border(SURFACE_BORDER_WIDTH, 'solid', tokens.colorTransparentStroke),
  ...shorthands.borderRadius(tokens.borderRadiusXLarge),

  contain: 'content',
  display: 'block',
  userSelect: 'unset',
  visibility: 'unset',
  position: 'fixed',
  height: 'fit-content',
  maxWidth: '600px',
  maxHeight: '100vh',
  boxSizing: 'border-box',
  boxShadow: tokens.shadow64,
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,

  [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
    maxWidth: '100vw',
  },
});

const useBackdropStyles = makeStyles({
  nestedDialogBackdrop: {
    backgroundColor: tokens.colorTransparentBackground,
  },
});

/**
 * Styles for the backdrop slot
 */
const useBackdropResetStyles = makeResetStyles({
  ...shorthands.inset('0px'),
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  position: 'fixed',
});

/**
 * Apply styling to the DialogSurface slots based on the state
 */
export const useDialogSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  const surfaceResetStyles = useRootResetStyles();
  const styles = useBackdropStyles();
  const backdropResetStyles = useBackdropResetStyles();

  state.root.className = mergeClasses(dialogSurfaceClassNames.root, surfaceResetStyles, state.root.className);

  if (state.backdrop) {
    state.backdrop.className = mergeClasses(
      dialogSurfaceClassNames.backdrop,
      backdropResetStyles,
      state.isNestedDialog && styles.nestedDialogBackdrop,
      state.backdrop.className,
    );
  }

  return state;
};
