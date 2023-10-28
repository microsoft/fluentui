import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

import type { OverlayDrawerSurfaceSlots, OverlayDrawerSurfaceState } from './OverlayDrawerSurface.types';

export const OverlayDrawerSurfaceClassNames: SlotClassNames<OverlayDrawerSurfaceSlots> = {
  root: 'fui-OverlayDrawerSurface',
  backdrop: 'fui-OverlayDrawerSurface__backdrop',
};

/**
 * Styles for the backdrop slot
 */
const useBackdropResetStyles = makeResetStyles({
  ...shorthands.inset('0px'),
  position: 'fixed',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
});

const useBackdropStyles = makeStyles({
  nested: {
    backgroundColor: tokens.colorTransparentBackground,
  },
});

/**
 * Apply styling to the OverlayDrawerSurface slots based on the state
 */
export const useOverlayDrawerSurfaceStyles_unstable = (state: OverlayDrawerSurfaceState): OverlayDrawerSurfaceState => {
  const backdropResetStyles = useBackdropResetStyles();
  const backdropStyles = useBackdropStyles();

  if (state.backdrop) {
    state.backdrop.className = mergeClasses(
      backdropResetStyles,
      state.isNestedDialog && backdropStyles.nested,
      state.backdrop.className,
    );
  }

  return state;
};
