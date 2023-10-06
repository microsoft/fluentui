import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

import type { DrawerOverlaySurfaceSlots, DrawerOverlaySurfaceState } from './DrawerOverlaySurface.types';

export const drawerOverlaySurfaceClassNames: SlotClassNames<DrawerOverlaySurfaceSlots> = {
  root: 'fui-DrawerOverlaySurface',
  backdrop: 'fui-DrawerOverlaySurface__backdrop',
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
 * Apply styling to the DrawerOverlaySurface slots based on the state
 */
export const useDrawerOverlaySurfaceStyles_unstable = (state: DrawerOverlaySurfaceState): DrawerOverlaySurfaceState => {
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
