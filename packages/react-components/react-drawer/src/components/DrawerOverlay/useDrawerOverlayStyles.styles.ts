import { makeStyles, mergeClasses } from '@griffel/react';
import type { DrawerOverlaySlots, DrawerOverlayState } from './DrawerOverlay.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useDrawerBaseStyles } from '../../util/useDrawerBaseStyles.styles';
import * as React from 'react';

export const drawerOverlayClassNames: SlotClassNames<DrawerOverlaySlots> = {
  root: 'fui-DrawerOverlay',
  backdrop: 'fui-DrawerOverlay__backdrop',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    bottom: 0,
  },
});

/**
 * Apply styling to the DrawerOverlay slots based on the state
 */
export const useDrawerOverlayStyles_unstable = (state: DrawerOverlayState): DrawerOverlayState => {
  const baseStyles = useDrawerBaseStyles();
  const styles = useStyles();

  const backdrop = state.root.backdrop as React.HTMLAttributes<HTMLDivElement>;

  state.root.className = mergeClasses(
    drawerOverlayClassNames.root,
    baseStyles.root,
    styles.root,
    state.size && baseStyles[state.size],
    state.position && baseStyles[state.position],
    state.root.className,
  );

  if (backdrop) {
    backdrop.className = mergeClasses(drawerOverlayClassNames.backdrop, backdrop.className);
  }

  return state;
};
