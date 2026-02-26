'use client';

import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { DialogSurfaceState } from '@fluentui/react-dialog';

/**
 * Styles for the backdrop slot
 */
const useBackdropResetStyles = makeResetStyles({
  inset: '0px',
  position: 'fixed',
  backgroundColor: tokens.colorBackgroundOverlay,
});

const useBackdropStyles = makeStyles({
  nested: {
    backgroundColor: tokens.colorTransparentBackground,
  },

  drawerHidden: {
    pointerEvents: 'none',
  },
});

/**
 * Apply styling to the OverlayDrawerSurface slots based on the state
 */
export const useOverlayDrawerSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  'use no memo';

  const { treatBackdropAsNested, backdrop, open, unmountOnClose } = state;

  const backdropResetStyles = useBackdropResetStyles();
  const backdropStyles = useBackdropStyles();

  const mountedAndClosed = !unmountOnClose && !open;

  if (backdrop) {
    backdrop.className = mergeClasses(
      backdropResetStyles,
      treatBackdropAsNested && backdropStyles.nested,
      mountedAndClosed && backdropStyles.drawerHidden,
      backdrop.className,
    );
  }

  return state;
};
