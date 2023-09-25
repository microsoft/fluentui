import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { SlotClassNames } from '@fluentui/react-utilities';

import type { DrawerOverlaySurfaceSlots, DrawerOverlaySurfaceState } from './DrawerOverlaySurface.types';

export const drawerOverlaySurfaceClassNames: SlotClassNames<DrawerOverlaySurfaceSlots> = {
  root: 'fui-DrawerOverlaySurface',
  backdrop: 'fui-DrawerOverlaySurface__backdrop',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  focusOutline: createFocusOutlineStyle(),
});

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
    backgroundColor: 'transparent',
  },
});

/**
 * Apply styling to the DrawerOverlaySurface slots based on the state
 */
export const useDrawerOverlaySurfaceStyles_unstable = (state: DrawerOverlaySurfaceState): DrawerOverlaySurfaceState => {
  const rootStyles = useRootStyles();
  const backdropResetStyles = useBackdropResetStyles();
  const backdropStyles = useBackdropStyles();

  state.root.className = mergeClasses(rootStyles.focusOutline, state.root.className);

  if (state.backdrop) {
    state.backdrop.className = mergeClasses(
      backdropResetStyles,
      state.isNestedDrawer && backdropStyles.nested,
      state.backdrop.className,
    );
  }

  return state;
};
