import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { DialogSurfaceState } from '@fluentui/react-dialog';

import type { OverlayDrawerSurfaceSlots } from './OverlayDrawerSurface.types';

export const OverlayDrawerSurfaceClassNames: SlotClassNames<OverlayDrawerSurfaceSlots> = {
  root: 'fui-OverlayDrawerSurface',
  backdrop: 'fui-OverlayDrawerSurface__backdrop',
};

/**
 * Styles for the backdrop slot
 */
const useBackdropResetStyles = makeResetStyles({
  inset: '0px',
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
export const useOverlayDrawerSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  'use no memo';

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
